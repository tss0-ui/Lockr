import { Router } from "express";
import { register, login, verifyOtp, refresh } from "../controllers/authController";
import rateLimiter from "../../../middleware/rateLimiter";

const router = Router();

// Apply rate limiting to sensitive endpoints
router.post("/register", rateLimiter, register);
router.post("/login", rateLimiter, login);
router.post("/verify-otp", rateLimiter, verifyOtp);
router.post("/refresh-token", refresh); // no limiter; refresh tokens are short-lived

export default router;
