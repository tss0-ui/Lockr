import { z } from "zod";

export const otpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6, "OTP must be 6 digits."),
});
