import jwt from "jsonwebtoken";
import { AuthTokens, DecodedToken } from "../types";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const ACCESS_EXPIRES_IN = "15m";
const REFRESH_EXPIRES_IN = "7d";

export function generateTokens(userId: string): AuthTokens {
  const accessToken = jwt.sign({ sub: userId }, JWT_ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRES_IN,
  });

  const refreshToken = jwt.sign({ sub: userId }, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRES_IN,
  });

  return { accessToken, refreshToken };
}

export function verifyAccessToken(token: string): DecodedToken {
  return jwt.verify(token, JWT_ACCESS_SECRET) as DecodedToken;
}

export function verifyRefreshToken(token: string): DecodedToken {
  return jwt.verify(token, JWT_REFRESH_SECRET) as DecodedToken;
}
