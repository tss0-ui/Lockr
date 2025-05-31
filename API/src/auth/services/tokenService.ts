import { generateTokens, verifyRefreshToken } from "../utils/tokens";
import { db } from "../../../lib/db";

export class TokenService {
  static async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const decoded = verifyRefreshToken(refreshToken);
    const user = await db.user.findUnique({ where: { id: decoded.sub } });
    if (!user) throw new Error("User not found");

    return generateTokens(user.id);
  }
}
