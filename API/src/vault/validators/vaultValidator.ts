import { z } from "zod";

export const vaultItemTypes = ["password", "note", "key", "other"] as const;

export const createVaultItemSchema = z.object({
  type: z.enum(vaultItemTypes),
  encryptedData: z.string().min(1, "Encrypted data is required"),
  encryptedItemKey: z.string().min(1, "Encrypted item key is required"),
  metadata: z
    .object({
      title: z.string().optional(),
      website: z.string().url("Website must be a valid URL").optional(),
    })
    .optional(),
});

export const updateVaultItemSchema = z.object({
  encryptedData: z.string().optional(),
  encryptedItemKey: z.string().optional(),
  metadata: z
    .object({
      title: z.string().optional(),
      website: z.string().url("Website must be a valid URL").optional(),
    })
    .optional(),
});
