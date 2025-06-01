// api/src/kms/kmsService.ts
import { getKeyByUserId } from "./keyManager";
import { encrypt, decrypt } from "./cryptoEngine";

/**
 * Encrypts a user's data using their derived encryption key.
 * @param userId UUID of the user
 * @param plaintext Raw data string
 * @returns Object containing ciphertext, iv, and authTag
 */
export async function encryptForUser(userId: string, plaintext: string) {
  const key = await getKeyByUserId(userId);
  return encrypt(plaintext, key);
}

/**
 * Decrypts a user's data using their derived encryption key.
 * @param userId UUID of the user
 * @param encryptedData Object with ciphertext, iv, authTag
 * @returns Decrypted plaintext string
 */
export async function decryptForUser(
  userId: string,
  encryptedData: {
    ciphertext: string;
    iv: string;
    authTag: string;
  }
): Promise<string> {
  const key = await getKeyByUserId(userId);
  return decrypt(encryptedData.ciphertext, encryptedData.iv, encryptedData.authTag, key);
}
