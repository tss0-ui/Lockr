import mongoose, { Schema, Document } from "mongoose";

export interface VaultItemDocument extends Document {
  userId: string;
  type: "password" | "note" | "key" | "other";
  encryptedData: string;            // Encrypted blob (Base64 or hex)
  encryptedItemKey: string;         // Encrypted item-level key (for envelope encryption)
  metadata?: {
    title?: string;                 // Optional encrypted or plain title
    website?: string;               // Optional plain domain (used for UI indexing/search)
    createdAt?: Date;
    updatedAt?: Date;
  };
}

const VaultItemSchema = new Schema<VaultItemDocument>(
  {
    userId: { type: String, required: true, index: true },
    type: { type: String, enum: ["password", "note", "key", "other"], required: true },
    encryptedData: { type: String, required: true },
    encryptedItemKey: { type: String, required: true },
    metadata: {
      title: { type: String },
      website: { type: String },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },
  },
  {
    timestamps: true,
  }
);

const VaultModel = mongoose.model<VaultItemDocument>("VaultItem", VaultItemSchema);

export default VaultModel;
