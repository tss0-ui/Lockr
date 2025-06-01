// api/src/kms/cryptoEngine.ts
import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";

/**
 * Encrypt plaintext data using AES-256-GCM.
 * @param plaintext Buffer | string
 * @param key 32-byte Buffer
 * @returns ciphertext, iv, authTag
 */
export function encrypt(plaintext: Buffer | string, key: Buffer) {
  if (key.length !== 32) {
    throw new Error("Encryption key must be 32 bytes.");
  }

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const data = typeof plaintext === "string" ? Buffer.from(plaintext, "utf8") : plaintext;

  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return {
    ciphertext: encrypted.toString("hex"),
    iv: iv.toString("hex"),
    authTag: authTag.toString("hex")
  };
}

/**
 * Decrypt AES-256-GCM encrypted data.
 * @param ciphertextHex Encrypted data as hex string
 * @param ivHex IV as hex string
 * @param authTagHex Auth tag as hex string
 * @param key 32-byte Buffer
 * @returns Decrypted plaintext as utf-8 string
 */
export function decrypt(ciphertextHex: string, ivHex: string, authTagHex: string, key: Buffer): string {
  if (key.length !== 32) {
    throw new Error("Decryption key must be 32 bytes.");
  }

  const ciphertext = Buffer.from(ciphertextHex, "hex");
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final()
  ]);

  return decrypted.toString("utf8");
}
