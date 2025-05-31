import { Request, Response } from "express";
import * as vaultService from "../services/vaultService";
import { z } from "zod";
import { createVaultItemSchema, updateVaultItemSchema } from "../validators/vaultValidator";

export const createItem = async (req: Request, res: Response) => {
  try {
    const parsed = createVaultItemSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });

    const item = await vaultService.createItem(req.user.id, parsed.data);
    return res.status(201).json(item);
  } catch (err) {
    return res.status(500).json({ error: "Failed to create item." });
  }
};

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await vaultService.getItems(req.user.id);
    return res.status(200).json(items);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch items." });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const parsed = updateVaultItemSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });

    const updated = await vaultService.updateItem(req.user.id, req.params.id, parsed.data);
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(500).json({ error: "Failed to update item." });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    await vaultService.deleteItem(req.user.id, req.params.id);
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete item." });
  }
};
