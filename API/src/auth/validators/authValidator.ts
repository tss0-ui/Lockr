import { z } from "zod";

// Schema Definitions
export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12, "Password must be at least 12 characters long."),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const OtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6, "OTP must be exactly 6 digits."),
});

export const RefreshTokenSchema = z.object({
  refreshToken: z.string().uuid("Refresh token must be a valid UUID."),
});

// Middleware Validator
export const validateBody = (schema: z.ZodSchema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const errors = result.error.issues.map((e) => e.message).join(", ");
    return res.status(400).json({ error: `Validation error: ${errors}` });
  }
  req.body = result.data;
  next();
};
