// api/src/controllers/kmsController.ts
import { Request, Response } from "express";
import { rotateKeyForUser, getKeyMetaForUser } from "../services/kmsService";
import logger from "../utils/logger";

export const rotateUserKey = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    if (!userId) return res.status(400).json({ error: "User ID is required" });

    await rotateKeyForUser(userId);

    logger.info(`Key rotation successful for user: ${userId}`);
    return res.status(200).json({ message: "Key rotation successful" });
  } catch (error) {
    logger.error("Key rotation failed", error);
    return res.status(500).json({ error: "Failed to rotate key" });
  }
};

export const getKeyMetadata = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    if (!userId) return res.status(400).json({ error: "User ID is required" });

    const metadata = await getKeyMetaForUser(userId);
    if (!metadata) return res.status(404).json({ error: "No metadata found" });

    return res.status(200).json({ metadata });
  } catch (error) {
    logger.error("Failed to fetch key metadata", error);
    return res.status(500).json({ error: "Failed to retrieve metadata" });
  }
};
