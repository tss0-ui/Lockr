import { Router } from "express";
import {
  createVaultItem,
  getVaultItems,
  getVaultItemById,
  updateVaultItem,
  deleteVaultItem,
} from "../controllers/vaultController";
import { validateBody, validateParams } from "../validators/vaultValidator";
import {
  CreateVaultItemSchema,
  UpdateVaultItemSchema,
  VaultItemIdSchema,
} from "../validators/vaultValidator";
import authenticate from "../../../middleware/authenticate";
import rateLimiter from "../../../middleware/rateLimiter";

const router = Router();

// All routes require authentication
router.use(authenticate);

// Create a new vault item (e.g., password, note, etc.)
router.post("/", rateLimiter, validateBody(CreateVaultItemSchema), createVaultItem);

// Get all vault items for the authenticated user
router.get("/", getVaultItems);

// Get a single vault item by ID
router.get("/:id", validateParams(VaultItemIdSchema), getVaultItemById);

// Update a vault item by ID
router.put("/:id", validateParams(VaultItemIdSchema), validateBody(UpdateVaultItemSchema), updateVaultItem);

// Delete a vault item by ID
router.delete("/:id", validateParams(VaultItemIdSchema), deleteVaultItem);

export default router;
