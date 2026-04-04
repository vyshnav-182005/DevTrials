import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { createRegistrationOtpSession } from "@/lib/registration-otp-store";
import { sendRegistrationOtpSms } from "@/lib/sms";

interface SendOtpPayload {
  phone?: string;
}

const PHONE_REGEX = /^\d{10}$/;

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as SendOtpPayload;
    const phone = payload.phone?.trim();

    if (!phone || !PHONE_REGEX.test(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit phone number" },
        { status: 400 }
      );
    }

    const admin = createAdminClient();
    const { data: existingWorker, error: existingWorkerError } = await admin
      .from("workers")
      .select("id")
      .eq("phone", phone)
      .maybeSingle();

    if (existingWorkerError) {
      return NextResponse.json({ error: existingWorkerError.message }, { status: 500 });
    }

    if (existingWorker) {
      return NextResponse.json(
        { error: "A user with this phone number already exists" },
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
