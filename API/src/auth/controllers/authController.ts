import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { TokenService } from "../services/tokenService";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    await AuthService.register(email, password);
    res.status(201).json({ message: "Registration successful. OTP sent to email." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const tokens = await AuthService.login(email, password);
    res.status(200).json(tokens);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required." });
  }

  try {
    const isValid = await AuthService.verifyOtp(email, otp);
    if (!isValid) return res.status(401).json({ error: "Invalid OTP" });

    res.status(200).json({ message: "OTP verified." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token required." });
  }

  try {
    const tokens = await TokenService.refreshToken(refreshToken);
    res.status(200).json(tokens);
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired refresh token." });
  }
};
