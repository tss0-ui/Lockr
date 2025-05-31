export interface RegisterPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface DecodedToken {
  sub: string;
  iat: number;
  exp: number;
}

export interface OTPPayload {
  email: string;
  otp: string;
}

export interface MFASetupResponse {
  otpauthUrl: string;
  base32: string;
