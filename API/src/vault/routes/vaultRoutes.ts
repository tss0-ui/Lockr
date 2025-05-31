import { Router } from "express";
import * as VaultController from "./vault.controller";
import authenticate from "../../middleware/authMiddleware";

const router = Router();

router.use(authenticate);

router.post("/", VaultController.createVaultItem);
router.get("/", VaultController.getVaultItems);
router.put("/:itemId", VaultController.updateVaultItem);
router.delete("/:itemId", VaultController.deleteVaultItem);

export default router;
