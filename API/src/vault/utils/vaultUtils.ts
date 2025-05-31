import crypto from "crypto";

const algorithm = "aes-256-gcm";
const key = Buffer.from(process.env.VAULT_ENCRYPTION_KEY!, "hex");

export const encryptVaultItem = (data: any) => {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const json = JSON.stringify(data);
  let encrypted = cipher.update(json, "utf8", "hex");
  encrypted += cipher.final("hex");
  const tag = cipher.getAuthTag();

  return {
    encryptedData: encrypted,
    iv: iv.toString("hex"),
    tag: tag.toString("hex"),
  };
};

export const decryptVaultItem = (item: any) => {
  const iv = Buffer.from(item.iv, "hex");
  const tag = Buffer.from(item.tag, "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  decipher.setAuthTag(tag);

  let decrypted = decipher.update(item.encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return JSON.parse(decrypted);
};
