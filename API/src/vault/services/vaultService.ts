import prisma from "../lib/prisma";
import { encryptVaultItem, decryptVaultItem } from "../utils/encryption";

export const createVaultItem = async (userId: string, data: any) => {
  const encrypted = await encryptVaultItem(data, userId);
  return await prisma.vaultItem.create({
    data: {
      userId,
      ...encrypted,
    },
  });
};

export const getVaultItems = async (userId: string) => {
  const items = await prisma.vaultItem.findMany({ where: { userId } });
  return Promise.all(items.map((item) => decryptVaultItem(item)));
};

export const updateVaultItem = async (userId: string, itemId: string, data: any) => {
  const encrypted = await encryptVaultItem(data, userId);
  return await prisma.vaultItem.update({
    where: { id: itemId, userId },
    data: encrypted,
  });
};

export const deleteVaultItem = async (userId: string, itemId: string) => {
  return await prisma.vaultItem.delete({
    where: { id: itemId, userId },
  });
};
