import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import type { ClaimInsert, TriggerType } from "@/lib/database.types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Manual claim submission body:", JSON.stringify(body, null, 2));
    const {
      worker_id,
      subscription_id,
      worker_insurance_id,
      trigger_type,
      claim_date,
      start_time,
      end_time,
      duration_minutes,
      amount,
      description,
      location_lat,
      location_lng,
      zone_id,
    } = body;

    const claimDateValue = claim_date || new Date().toISOString().split("T")[0];
    const startDateTimeIso = start_time ? new Date(`${claimDateValue}T${start_time}`).toISOString() : null;
    const endDateTimeIso = end_time ? new Date(`${claimDateValue}T${end_time}`).toISOString() : null;
    const claimHour = start_time ? Number(String(start_time).split(":")[0]) : null;

    // Basic validation
    const requiredFields = { worker_id, trigger_type, claim_date, start_time, amount };
    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => value === undefined || value === null || value === "")
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return NextResponse.json({ 
        error: `Missing required fields: ${missingFields.join(", ")}`,
        received: { worker_id, trigger_type, claim_date, start_time, amount }
      }, { status: 400 });
    }

    const admin = createAdminClient();

    // Ensure the worker has at least one selected insurance plan.
    const { data: workerInsurance, error: insuranceError } = await (admin as any)
      .from("worker_insurance")
      .select("id")
      .eq("worker_id", worker_id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (insuranceError) {
      return NextResponse.json({ error: insuranceError.message || "Failed to validate worker insurance" }, { status: 500 });
    }

    if (!workerInsurance && !worker_insurance_id) {
      return NextResponse.json(
        { error: "No insurance plan is selected for this worker. Please choose a plan first." },
        { status: 400 }
      );
    }

    // 1. Insert the claim
    const claimData: Record<string, unknown> = {
      worker_id,
      disruption_id: null,
      trigger_type: trigger_type,
      claim_date: claimDateValue,
      start_time,
      end_time: end_time || null,
      duration_minutes: duration_minutes || null,
      amount: Number(amount),
      status: "pending",
      description: description || null,
      location_lat: location_lat || null,
      location_lng: location_lng || null,
      zone_id: zone_id || null,
      processed_at: null,
      paid_at: null,
      rejection_reason: null,
    };

    if (subscription_id) {
      claimData.subscription_id = subscription_id;
    }

    let { data: claim, error: claimError } = await (admin as any)
      .from("claims")
      .insert(claimData)
      .select()
      .single();

    if (claimError) {
      const fallbackClaimData: Record<string, unknown> = {
        worker_id,
        disruption_id: null,
        claim_type: "manual",
        status: "approved",
        claim_time: startDateTimeIso || new Date().toISOString(),
        start_time: startDateTimeIso,
        end_time: endDateTimeIso,
        claim_hour: claimHour,
        fraud_score: 0,
        reason: description || null,
        amount: Number(amount),
        payment_status: "pending",
      };

      const fallbackRes = await (admin as any)
        .from("claims")
        .insert(fallbackClaimData)
        .select()
        .single();

      claim = fallbackRes.data;
      claimError = fallbackRes.error;
    }

    if (claimError || !claim) {
      return NextResponse.json({ error: claimError?.message || "Failed to create claim" }, { status: 500 });
    }

    // Keep dashboard compatibility when DB returns legacy claim columns.
    const claimForClient = {
      ...claim,
      claim_date: (claim as any).claim_date || claimDateValue,
      trigger_type: (claim as any).trigger_type || trigger_type,
      duration_minutes: (claim as any).duration_minutes ?? duration_minutes ?? null,
      description: (claim as any).description ?? description ?? null,
      status: (claim as any).status || "approved",
    };

    // 2. Update subscription aggregate when subscription exists (legacy flow compatibility).
    if (subscription_id) {
      const { data: subscription, error: subError } = await (admin as any)
        .from("insurance_subscriptions")
        .select("weekly_claim_total")
        .eq("id", subscription_id)
        .single();

      if (!subError && subscription) {
        const currentTotal = (subscription as any).weekly_claim_total || 0;
        const newTotal = currentTotal + Number(amount);
        await (admin as any)
          .from("insurance_subscriptions")
          .update({ weekly_claim_total: newTotal })
          .eq("id", subscription_id);
      }
    }

    // 3. Create Audit Log
    await (admin as any).from("audit_logs").insert({
      user_id: worker_id,
      user_type: "worker",
      action: "manual_claim_submission",
      entity_type: "claim",
      entity_id: claim.id,
      new_values: claimForClient,
      metadata: { source: "manual_claim_form" },
    });

    return NextResponse.json({ success: true, claim: claimForClient });
  } catch (error: any) {
    console.error("Manual claim error:", error);
    return NextResponse.json({ error: "Failed to process manual claim" }, { status: 500 });
  }
}
