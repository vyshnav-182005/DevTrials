import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { createRegistrationOtpSession } from "@/lib/registration-otp-store";
import { sendRegistrationOtpSms } from "@/lib/sms";
import type { Platform } from "@/lib/database.types";

interface LoginSendOtpPayload {
  phone?: string;
  platform?: Platform;
}

const PHONE_REGEX = /^\d{10}$/;
const PLATFORM_VALUES: Platform[] = ["blinkit", "zepto", "instamart"];

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as LoginSendOtpPayload;
    const phone = payload.phone?.trim();
    const platform = payload.platform;

    if (!phone || !PHONE_REGEX.test(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit phone number" },
        { status: 400 }
      );
    }

    if (!platform || !PLATFORM_VALUES.includes(platform)) {
      return NextResponse.json({ error: "Please select a valid platform" }, { status: 400 });
    }

    const admin = createAdminClient();
    const { data: workerData, error: workerError } = await admin
      .from("workers")
      .select("id, platform")
      .eq("phone", phone)
      .maybeSingle();

    const worker = workerData as { id: string; platform: Platform } | null;

    if (workerError) {
      return NextResponse.json({ error: workerError.message }, { status: 500 });
    }

    if (!worker) {
      return NextResponse.json(
        { error: "No account found with this phone number. Please check and try again." },
        { status: 404 }
      );
    }

    if (worker.platform !== platform) {
      const platformName =
        worker.platform === "blinkit"
          ? "Blinkit"
          : worker.platform === "instamart"
            ? "Swiggy Instamart"
            : "Zepto";

      return NextResponse.json(
        { error: `This number is registered with ${platformName}` },
        { status: 409 }
      );
    }

    const { sessionId, otp, ttlSeconds } = createRegistrationOtpSession(phone);
    const smsResult = await sendRegistrationOtpSms(phone, otp);

    if (!smsResult.sent) {
      if (process.env.NODE_ENV !== "production") {
        return NextResponse.json({
          sessionId,
          ttlSeconds,
          smsDispatched: false,
          debugOtp: otp,
          warning: smsResult.reason,
        });
      }

      return NextResponse.json(
        { error: smsResult.reason || "Failed to send OTP SMS" },
        { status: 500 }
      );
    }

    return NextResponse.json({ sessionId, ttlSeconds, smsDispatched: true });
  } catch {
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
