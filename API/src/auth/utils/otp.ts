import { authenticator } from "otplib";

authenticator.options = {
  step: 30,
  digits: 6,
};

export function generateSecret(): string {
  return authenticator.generateSecret();
}

export function generateOTP(secret: string): string {
  return authenticator.generate(secret);
}

export function verifyOTP(token: string, secret: string): boolean {
  return authenticator.check(token, secret);
}

export function getOTPAuthUrl(email: string, secret: string): string {
  return authenticator.keyuri(email, "Lockr", secret);
}
