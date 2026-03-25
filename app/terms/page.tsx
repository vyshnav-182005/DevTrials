import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/login" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-xl flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-zinc-900 dark:text-white">SwiftShield</span>
          </Link>
          <Link
            href="/login"
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Terms of Service
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">
            Last updated: March 2025
          </p>

          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                By accessing or using SwiftShield&apos;s AI-powered parametric micro-insurance platform (&quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use our Service.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                SwiftShield is designed to provide income protection insurance for delivery partners working with quick-commerce platforms including Blinkit, Zepto, and Swiggy Instamart in India.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                2. Eligibility
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                To use our Service, you must:
              </p>
              <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                <li>Be at least 18 years of age</li>
                <li>Be a registered delivery partner with a supported quick-commerce platform (Blinkit, Zepto, or Swiggy Instamart)</li>
                <li>Have a valid Indian mobile number</li>
                <li>Have a valid UPI-linked bank account for receiving payouts</li>
                <li>Operate within the service areas covered by SwiftShield</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                3. Insurance Coverage
              </h2>
              <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mb-3">
                3.1 Scope of Coverage
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                SwiftShield provides parametric income protection coverage for lost earnings due to qualifying external disruptions, including:
              </p>
              <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2 mb-4">
                <li>Heavy rainfall (exceeding 15mm/hr threshold)</li>
                <li>Extreme heat (temperature above 42°C for 3+ consecutive hours)</li>
                <li>Flash floods and waterlogging</li>
                <li>Severe cold and dense fog (visibility below 50m or temperature below 5°C)</li>
                <li>Government-imposed curfews and civil strikes</li>
                <li>Platform outages (Pro Plan only)</li>
              </ul>
              <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mb-3">
                3.2 Exclusions
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                This policy does NOT cover:
              </p>
              <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                <li>Health, medical, or accident-related expenses</li>
                <li>Vehicle damage or repair costs</li>
                <li>Personal belongings or equipment</li>
                <li>Third-party liability</li>
                <li>Income loss due to personal reasons or voluntary work stoppage</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                4. Premium and Payment
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Premium amounts are calculated weekly based on:
              </p>
              <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2 mb-4">
                <li>Your selected plan tier (Starter, Shield, or Pro)</li>
                <li>Your operating zone&apos;s risk profile</li>
                <li>Historical weather and disruption data for your area</li>
                <li>Your claim history and platform activity</li>
              </ul>
              <p className="text-zinc-600 dark:text-zinc-400">
                Premiums are non-refundable once coverage has commenced, except as provided in our pause and credit wallet feature.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                5. Claims and Payouts
              </h2>
              <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mb-3">
                5.1 Automatic Claim Initiation
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                When a qualifying disruption is detected in your zone, our system automatically generates a claim draft. You will receive a notification to confirm the impact before payout processing.
              </p>
              <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mb-3">
                5.2 Payout Processing
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Approved claims are processed via UPI to your linked account. Payout times vary by plan:
              </p>
              <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2 mb-4">
                <li>Starter Plan: Within 2 hours of trigger confirmation</li>
                <li>Shield Plan: Within 1 hour of trigger confirmation</li>
                <li>Pro Plan: Within 30 minutes of trigger confirmation</li>
              </ul>
              <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mb-3">
                5.3 Claim Limits
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                All claims are subject to daily hour caps and weekly coverage caps as specified in your plan. A 48-hour cooling period applies between payouts.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                6. Fraud Prevention
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                SwiftShield employs multi-layer fraud detection including:
              </p>
              <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2 mb-4">
                <li>GPS and location verification</li>
                <li>Platform session validation</li>
                <li>Behavioral anomaly detection using machine learning</li>
                <li>Cross-worker pattern analysis</li>
              </ul>
              <p className="text-zinc-600 dark:text-zinc-400">
                Any attempt to submit fraudulent claims, manipulate location data, or otherwise deceive our system will result in immediate account termination and may be reported to relevant authorities.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                7. User Responsibilities
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                You agree to:
              </p>
              <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                <li>Provide accurate and truthful information during registration</li>
                <li>Keep your account credentials secure and confidential</li>
                <li>Allow location access for claim verification purposes</li>
                <li>Notify us immediately of any unauthorized account access</li>
                <li>Not share, transfer, or sell your account to others</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                8. Termination
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                We may suspend or terminate your account if:
              </p>
              <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                <li>You violate these Terms of Service</li>
                <li>We detect fraudulent activity on your account</li>
                <li>You are no longer eligible for coverage</li>
                <li>You request account closure</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                9. Limitation of Liability
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                SwiftShield&apos;s liability is limited to the coverage amounts specified in your active plan. We are not liable for any indirect, incidental, or consequential damages arising from the use of our Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                10. Dispute Resolution
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Any disputes arising from these Terms or the use of our Service shall be resolved through arbitration in accordance with the Arbitration and Conciliation Act, 1996, with the seat of arbitration in Bengaluru, Karnataka, India.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                11. Governing Law
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                These Terms shall be governed by and construed in accordance with the laws of India, including the Insurance Regulatory and Development Authority of India (IRDAI) regulations applicable to parametric insurance products.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                12. Changes to Terms
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                We reserve the right to modify these Terms at any time. Changes will be effective upon posting to our platform. Continued use of the Service after changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                13. Contact Us
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                For questions or concerns regarding these Terms, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                <p className="text-zinc-700 dark:text-zinc-300 font-medium">SwiftShield Insurance</p>
                <p className="text-zinc-600 dark:text-zinc-400">Email: support@swiftshield.in</p>
                <p className="text-zinc-600 dark:text-zinc-400">Helpline: 1800-XXX-XXXX (Toll-free)</p>
              </div>
            </section>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-8">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
              Privacy Policy
            </Link>
            {" | "}
            <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
              Back to Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
