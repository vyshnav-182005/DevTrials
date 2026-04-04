interface SmsResult {
  sent: boolean;
  reason?: string;
}

function toIndianE164(phone: string) {
  if (phone.startsWith("+")) return phone;
  return `+91${phone}`;
}

export async function sendRegistrationOtpSms(phone: string, otp: string): Promise<SmsResult> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

  if (!accountSid || !authToken || (!fromNumber && !messagingServiceSid)) {
    return {
      sent: false,
      reason: "SMS provider is not configured. Set Twilio env vars.",
    };
  }

  const body = new URLSearchParams({
    To: toIndianE164(phone),
    Body: `Your SwiftShield OTP is ${otp}. It is valid for 5 minutes.`,
  });

  if (messagingServiceSid) {
    body.set("MessagingServiceSid", messagingServiceSid);
  } else if (fromNumber) {
    body.set("From", fromNumber);
  }

  const auth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    }
  );

  if (!response.ok) {
    const twilioError = await response.text();
    return { sent: false, reason: `Twilio error: ${twilioError}` };
  }

  return { sent: true };
}
