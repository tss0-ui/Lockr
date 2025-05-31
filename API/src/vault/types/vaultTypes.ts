export type VaultItemType = "password" | "note" | "key" | "other";

export interface CreateVaultItemDTO {
  type: VaultItemType;
  encryptedData: string;             // Encrypted blob (Base64 or hex)
  encryptedItemKey: string;         // AES-encrypted item key (envelope encryption)
  metadata?: {
    title?: string;
    website?: string;
  };
}

export interface UpdateVaultItemDTO {
  encryptedData?: string;
  encryptedItemKey?: string;
  metadata?: {
    title?: string;
    website?: string;
  };
}

export interface VaultItemResponse {
  _id: string;
  userId: string;
  type: VaultItemType;
  encryptedData: string;
  encryptedItemKey: string;
  metadata?: {
    title?: string;
    website?: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}
