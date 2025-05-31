// api/src/kms/index.ts
import { getUserKey, rotateUserKey, storeUserKey } from "./keyManager";
import { encryptData, decryptData } from "./cryptoEngine";
import { signData, verifySignature } from "./signatureEngine";

export const KMS = {
  getUserKey,
  rotateUserKey,
  storeUserKey,
  encryptData,
  decryptData,
  signData,
  verifySignature
};
