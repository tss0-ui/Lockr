import { Schema, model, Document } from "mongoose";

interface VaultItem extends Document {
  userId: string;
  encryptedData: string;
  iv: string;
  tag: string;
}

const vaultItemSchema = new Schema<VaultItem>({
  userId: { type: String, required: true },
  encryptedData: { type: String, required: true },
  iv: { type: String, required: true },
  tag: { type: String, required: true },
}, { timestamps: true });

export default model<VaultItem>("VaultItem", vaultItemSchema);
