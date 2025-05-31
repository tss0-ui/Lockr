import VaultItem from "../models/VaultItem";
import { encryptVaultItem, decryptVaultItem } from "../utils/vaultUtils";

export const createItem = async (userId: string, data: any) => {
  const encrypted = await encryptVaultItem(data);
  const item = new VaultItem({ userId, ...encrypted });
  return await item.save();
};

export const getItems = async (userId: string) => {
  const items = await VaultItem.find({ userId });
  return items.map(item => decryptVaultItem(item));
};

export const updateItem = async (userId: string, id: string, data: any) => {
  const encrypted = await encryptVaultItem(data);
  return await VaultItem.findOneAndUpdate({ _id: id, userId }, encrypted, { new: true });
};

export const deleteItem = async (userId: string, id: string) => {
  return await VaultItem.findOneAndDelete({ _id: id, userId });
};
