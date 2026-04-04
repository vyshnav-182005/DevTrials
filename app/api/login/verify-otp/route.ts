import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { verifyRegistrationOtpSession } from "@/lib/registration-otp-store";
import type { Platform, Worker } from "@/lib/database.types";

interface LoginVerifyOtpPayload {
  phone?: string;
  platform?: Platform;
  otp?: string;
  otpSessionId?: string;
}

const PHONE_REGEX = /^\d{10}$/;
const OTP_REGEX = /^\d{6}$/;
const PLATFORM_VALUES: Platform[] = ["blinkit", "zepto", "instamart"];

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as LoginVerifyOtpPayload;
    const phone = payload.phone?.trim();
    const platform = payload.platform;
    const otp = payload.otp?.trim();
    const otpSessionId = payload.otpSessionId?.trim();

    if (!phone || !PHONE_REGEX.test(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit phone number" },
        { status: 400 }
      );
    }

    if (!platform || !PLATFORM_VALUES.includes(platform)) {
      return NextResponse.json({ error: "Please select a valid platform" }, { status: 400 });
    }

    if (!otp || !OTP_REGEX.test(otp)) {
      return NextResponse.json({ error: "Please enter a valid 6-digit OTP" }, { status: 400 });
    }

    if (!otpSessionId) {
      return NextResponse.json({ error: "OTP session is required" }, { status: 400 });
    }

    const verification = verifyRegistrationOtpSession(otpSessionId, phone, otp);
    if (!verification.ok) {
      return NextResponse.json({ error: verification.error }, { status: 401 });
    }

    const admin = createAdminClient();
    const { data: worker, error: workerError } = await admin
      .from("workers")
      .select("*")
      .eq("phone", phone)
      .maybeSingle();

    if (workerError) {
      return NextResponse.json({ error: workerError.message }, { status: 500 });
    }

    if (!worker) {
      return NextResponse.json(
        { error: "No account found with this phone number. Please check and try again." },
        { status: 404 }
      );
    }

    if ((worker as Worker).platform !== platform) {
      return NextResponse.json({ error: "Platform mismatch for this account" }, { status: 409 });
    }

    return NextResponse.json({ worker: worker as Worker });
  } catch {
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 });
  }
}
