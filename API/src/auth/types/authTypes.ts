export interface RegisterInput {
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface OtpInput {
  email: string;
  otp: string;
}

export interface RefreshInput {
  refreshToken: string;
}

export interface JwtPayload {
  sub: string;          // User ID
  email: string;
  iat: number;
  exp: number;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
