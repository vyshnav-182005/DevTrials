import { createHmac, randomInt, randomUUID, timingSafeEqual } from "node:crypto";

interface OtpTokenPayload {
  phone: string;
  exp: number;
  nonce: string;
  otpHash: string;
}

const OTP_TTL_MS = 5 * 60 * 1000;

function getSigningSecret() {
  return process.env.REGISTRATION_OTP_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || "fallback-dev-secret";
}

function base64UrlEncode(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value: string) {
  return createHmac("sha256", getSigningSecret()).update(value).digest("base64url");
}

function hashOtp(otp: string, phone: string, nonce: string) {
  return createHmac("sha256", getSigningSecret())
    .update(`${otp}:${phone}:${nonce}`)
    .digest("hex");
}

function safeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

export function createRegistrationOtpSession(phone: string) {
  const otp = randomInt(100000, 1000000).toString();
  const nonce = randomUUID();
  const payload: OtpTokenPayload = {
    phone,
    exp: Date.now() + OTP_TTL_MS,
    nonce,
    otpHash: hashOtp(otp, phone, nonce),
  };

  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = sign(encodedPayload);
  const sessionId = `${encodedPayload}.${signature}`;

  return {
    sessionId,
    otp,
    ttlSeconds: Math.floor(OTP_TTL_MS / 1000),
  };
}

export function verifyRegistrationOtpSession(sessionId: string, phone: string, otp: string) {
  const [encodedPayload, signature] = sessionId.split(".");
  if (!encodedPayload || !signature) {
    return { ok: false as const, error: "Invalid OTP session. Please request a new OTP." };
  }

  const expectedSignature = sign(encodedPayload);
  if (!safeEqual(signature, expectedSignature)) {
    return { ok: false as const, error: "Invalid OTP session. Please request a new OTP." };
  }

  let payload: OtpTokenPayload;
  try {
    payload = JSON.parse(base64UrlDecode(encodedPayload)) as OtpTokenPayload;
  } catch {
    return { ok: false as const, error: "Invalid OTP session. Please request a new OTP." };
  }

  if (payload.exp <= Date.now()) {
    return { ok: false as const, error: "OTP session expired. Please request a new OTP." };
  }

  if (payload.phone !== phone) {
    return { ok: false as const, error: "Phone number does not match this OTP session." };
  }

  const computedOtpHash = hashOtp(otp, phone, payload.nonce);
  if (!safeEqual(payload.otpHash, computedOtpHash)) {
    return { ok: false as const, error: "Invalid OTP. Please try again." };
  }

  return { ok: true as const };
}
