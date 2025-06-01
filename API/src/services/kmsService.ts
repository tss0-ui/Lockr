// api/src/services/kmsService.ts
import { prisma } from "../../lib/prisma";
import { generateKeyPair, encryptKey, decryptKey, rotateKeyMaterial } from "../lib/kmsCrypto";
import { storeEncryptedKey, fetchKeyMetadata } from "../utils/kmsStore";
import { VaultClient } from "../lib/vaultClient";
import logger from "../utils/logger";

const vault = new VaultClient();

export const rotateKeyForUser = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  const { publicKey, privateKey } = await generateKeyPair();
  const wrappedPrivateKey = await encryptKey(privateKey, process.env.MASTER_KDF_SECRET!);

  // Store securely using Vault/HSM
  const storedKey = await storeEncryptedKey(userId, wrappedPrivateKey);

  // Update in DB
  await prisma.encryptionKey.updateMany({
    where: { userId },
    data: {
      publicKey,
      wrappedPrivateKey: storedKey,
      rotatedAt: new Date(),
      rotationCount: { increment: 1 },
    },
  });

  logger.info(`Rotated key for user ${userId}`);
};

export const getKeyMetaForUser = async (userId: string) => {
  return await fetchKeyMetadata(userId);
};
