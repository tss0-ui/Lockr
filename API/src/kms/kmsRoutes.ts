// api/src/kms/kmsRoutes.ts
import { Router } from "express";
import { rotateUserKey, getKeyMetadata } from "../controllers/kmsController";
import requireAdmin from "../../middleware/requireAdmin";
import requireAuth from "../../middleware/requireAuth";

const router = Router();

// Admin-only endpoint to rotate a user's key manually
router.post("/rotate/:userId", requireAuth, requireAdmin, rotateUserKey);

// Admin/debug endpoint to view metadata (not key material)
router.get("/metadata/:userId", requireAuth, requireAdmin, getKeyMetadata);

export default router;
