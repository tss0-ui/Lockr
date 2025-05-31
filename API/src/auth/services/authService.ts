import { hashPassword, verifyPassword } from "../utils/hash";
import { generateTokens } from "../utils/tokens";
import { generateSecret, generateOTP, verifyOTP } from "../utils/otp";
import { sendEmail } from "../utils/email";
import { db } from "../../../lib/db";
import { User } from "../../../models/userModel";

export class AuthService {
  static async register(email: string, password: string): Promise<void> {
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) throw new Error("User already exists");

    const hashed = await hashPassword(password);
    const otpSecret = generateSecret();

    await db.user.create({
      data: {
        email,
        password: hashed,
        otpSecret,
      },
    });

    const otp = generateOTP(otpSecret);
    await sendEmail(email, "Your Lockr OTP Code", `Your OTP is: ${otp}`);
  }

  static async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await db.user.findUnique({ where: { email } });
    if (!user) throw new Error("Invalid credentials");

    const match = await verifyPassword(password, user.password);
    if (!match) throw new Error("Invalid credentials");

    const otp = generateOTP(user.otpSecret);
    await sendEmail(email, "Your Lockr OTP Code", `Your OTP is: ${otp}`);

    return generateTokens(user.id);
  }

  static async verifyOtp(email: string, otp: string): Promise<boolean> {
    const user = await db.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    return verifyOTP(otp, user.otpSecret);
  }
}
