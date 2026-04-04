import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import type { Platform, VehicleType, Worker } from "@/lib/database.types";
import { verifyRegistrationOtpSession } from "@/lib/registration-otp-store";

interface RegisterPayload {
  name?: string;
  phone?: string;
  platform?: Platform;
  city?: string;
  upiId?: string;
  vehicleType?: VehicleType;
  vehicleRegistration?: string;
  otp?: string;
  otpSessionId?: string;
}

const PHONE_REGEX = /^\d{10}$/;
const UPI_REGEX = /^[a-zA-Z0-9._-]{2,}@[a-zA-Z]{2,}$/;
const VEHICLE_TYPES: VehicleType[] = ["bike", "scooter", "bicycle"];

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as RegisterPayload;

    const name = payload.name?.trim();
    const phone = payload.phone?.trim();
    const platform = payload.platform;
    const city = payload.city?.trim();
    const upiId = payload.upiId?.trim() || null;
    const vehicleType = payload.vehicleType;
    const vehicleRegistration = payload.vehicleRegistration?.trim() || null;
    const otp = payload.otp?.trim();
    const otpSessionId = payload.otpSessionId?.trim();

    if (!name || !phone || !platform || !city || !vehicleType || !otp || !otpSessionId) {
      return NextResponse.json(
        { error: "Registration details and OTP verification are required" },
        { status: 400 }
      );
    }

    if (name.length < 2 || name.length > 100) {
      return NextResponse.json({ error: "Please enter a valid full name" }, { status: 400 });
    }

    if (!PHONE_REGEX.test(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit phone number" },
        { status: 400 }
      );
    }

    if (upiId && !UPI_REGEX.test(upiId)) {
      return NextResponse.json({ error: "Please enter a valid UPI ID" }, { status: 400 });
    }

    if (!VEHICLE_TYPES.includes(vehicleType)) {
      return NextResponse.json({ error: "Please select a valid vehicle type" }, { status: 400 });
    }

    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json({ error: "Please enter a valid 6-digit OTP" }, { status: 400 });
    }

    const otpVerification = verifyRegistrationOtpSession(otpSessionId, phone, otp);
    if (!otpVerification.ok) {
      return NextResponse.json({ error: otpVerification.error }, { status: 401 });
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

    const workersTable = admin.from("workers") as ReturnType<typeof admin.from>;

    const { data: worker, error: createError } = await workersTable
      .insert({
        name,
        phone,
        platform,
        city,
        upi_id: upiId,
      })
      .select("*")
      .single();

    if (createError || !worker) {
      return NextResponse.json(
        { error: createError?.message || "Failed to create account" },
        { status: 500 }
      );
    }

    const vehiclesTable = admin.from("worker_vehicles") as ReturnType<typeof admin.from>;

    const { error: vehicleCreateError } = await vehiclesTable.insert({
      worker_id: (worker as Worker).id,
      vehicle_type: vehicleType,
      registration_number: vehicleRegistration,
      is_primary: true,
    });

    if (vehicleCreateError) {
      await workersTable.delete().eq("id", (worker as Worker).id);
      return NextResponse.json({ error: "Failed to save vehicle details" }, { status: 500 });
    }

    return NextResponse.json({ worker: worker as Worker }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
  }
}
