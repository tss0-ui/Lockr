import { Router } from "express";
import { register, login, verifyOtp, refresh } from "../controllers/authController";
import rateLimiter from "../../../middleware/rateLimiter";
import { validateBody } from "../validators/authValidator";
import {
  RegisterSchema,
  LoginSchema,
  OtpSchema,
  RefreshTokenSchema
} from "../validators/authValidator";

const router = Router();

// Apply rate limiting to sensitive endpoints
router.post("/register", rateLimiter, validateBody(RegisterSchema), register);
router.post("/login", rateLimiter, validateBody(LoginSchema), login);
router.post("/verify-otp", rateLimiter, validateBody(OtpSchema), verifyOtp);
router.post("/refresh-token", validateBody(RefreshTokenSchema), refresh);

export default router;
