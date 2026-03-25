import Link from "next/link";

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">
            Last updated: March 2025
          </p>

          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                1. Introduction
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                SwiftShield (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting the privacy of our users. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered parametric micro-insurance platform for quick-commerce delivery partners.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                By using SwiftShield, you consent to the data practices described in this policy. We encourage you to read this policy carefully to understand our practices regarding your personal data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                2. Information We Collect
              </h2>
              <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mb-3">
                2.1 Personal Information
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                We collect the following personal information directly from you:
              </p>
              <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2 mb-4">
                <li>Mobile phone number (used for authentication and communication)</li>
                <li>Full name (as registered with your delivery platform)</li>
                <li>Delivery platform association (Blinkit, Zepto, or Swiggy Instamart)</li>
                <li>Primary delivery zone (pin code)</li>
                <li>Vehicle type (two-wheeler, e-bike, etc.)</li>
                <li>UPI ID (for payout processing)</li>
              </ul>

              <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mb-3">
                2.2 Location Data
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                To verify claims and provide accurate coverage, we collect:
              </p>
              <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2 mb-4">
                <li>GPS coordinates during active delivery sessions</li>
                <li>Location data at the time of claim initiation</li>
                <li>Historical location patterns for fraud prevention</li>
              </ul>

              <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mb-3">
                2.3 Platform Activity Data
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                We receive or access the following from your delivery platform (with your consent):
              </p>
              <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2 mb-4">
                <li>Active session status (on-duty/off-duty)</li>
                <li>Delivery completion timestamps</li>
                <li>Earnings data (for premium calculation and payout verification)</li>
              </ul>

              <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mb-3">
                2.4 Device Information
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                We automatically collect certain device information:
              </p>
              <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                <li>Device type and operating system</li>
                <li>Browser type and version</li>
                <li>IP address and network information</li>
                <li>Device identifiers for fraud prevention</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                <li><strong>Insurance Services:</strong> To provide, manage, and process your insurance coverage and claims</li>
                <li><strong>Premium Calculation:</strong> To calculate personalized weekly premiums based on your risk profile and zone</li>
                <li><strong>Claim Verification:</strong> To verify the authenticity of claims using location and activity data</li>
                <li><strong>Fraud Prevention:</strong> To detect and prevent fraudulent claims using AI-powered anomaly detection</li>
                <li><strong>Payout Processing:</strong> To process approved payouts to your UPI-linked account</li>
                <li><strong>Communication:</strong> To send OTPs, claim notifications, payout confirmations, and service updates</li>
                <li><strong>Service Improvement:</strong> To analyze usage patterns and improve our platform</li>
                <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulatory requirements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                4. AI and Machine Learning
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                SwiftShield uses AI and machine learning technologies to:
              </p>
              <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2 mb-4">
                <li>Calculate dynamic risk scores and personalized premiums</li>
                <li>Detect weather disruptions and trigger events automatically</li>
                <li>Identify anomalous claim patterns for fraud prevention</li>
                <li>Predict zone-level risk for coverage optimization</li>
              </ul>
              <p className="text-zinc-600 dark:text-zinc-400">
                These automated systems process your data to make decisions about claim approval and premium pricing. You have the right to request human review of any automated decision that significantly affects you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                5. Data Sharing and Disclosure
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2 mb-4">
                <li><strong>Insurance Partners:</strong> Reinsurers and underwriters as required for coverage</li>
                <li><strong>Payment Processors:</strong> Razorpay and UPI service providers for payout processing</li>
                <li><strong>Platform Partners:</strong> Blinkit, Zepto, or Swiggy for session and activity verification</li>
                <li><strong>Weather Data Providers:</strong> IMD and OpenWeatherMap for trigger verification</li>
                <li><strong>Legal Authorities:</strong> When required by law or to protect our legal rights</li>
                <li><strong>Service Providers:</strong> Cloud hosting (Supabase, Vercel) and analytics providers</li>
              </ul>
              <p className="text-zinc-600 dark:text-zinc-400">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                6. Data Security
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                We implement robust security measures to protect your data:
              </p>
              <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                <li>End-to-end encryption for data transmission</li>
                <li>Secure database storage with Supabase (PostgreSQL)</li>
                <li>OTP-based authentication without password storage</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls limiting data access to authorized personnel</li>
                <li>Compliance with industry-standard security practices</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                7. Data Retention
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                We retain your data for the following periods:
              </p>
              <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                <li><strong>Account Data:</strong> For the duration of your account plus 5 years as required by insurance regulations</li>
                <li><strong>Claim Records:</strong> 8 years from the date of claim settlement (IRDAI requirement)</li>
                <li><strong>Location Data:</strong> 90 days for active verification, anonymized thereafter</li>
                <li><strong>Transaction Records:</strong> 10 years as per financial regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                8. Your Rights
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Under applicable data protection laws, you have the right to:
              </p>
              <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your data (subject to legal retention requirements)</li>
                <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
                <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent at any time for consent-based processing</li>
              </ul>
              <p className="text-zinc-600 dark:text-zinc-400 mt-4">
                To exercise these rights, contact us at privacy@swiftshield.in.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                9. Cookies and Tracking
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Our web application uses essential cookies for authentication and session management. We do not use third-party advertising cookies. Analytics cookies may be used to improve our service, and you can opt out through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                10. Children&apos;s Privacy
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                SwiftShield is not intended for users under 18 years of age. We do not knowingly collect personal information from minors. If we learn that we have collected data from a person under 18, we will delete it promptly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                11. International Data Transfers
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Your data is primarily stored and processed in India. Some of our service providers may process data in other jurisdictions. In such cases, we ensure appropriate safeguards are in place to protect your data in accordance with applicable laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                12. Changes to This Policy
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes via SMS or through our platform. The &quot;Last updated&quot; date at the top indicates when the policy was last revised.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                13. Grievance Officer
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                In accordance with the Information Technology Act, 2000 and rules made thereunder, the contact details of the Grievance Officer are:
              </p>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                <p className="text-zinc-700 dark:text-zinc-300 font-medium">Grievance Officer</p>
                <p className="text-zinc-600 dark:text-zinc-400">SwiftShield Insurance</p>
                <p className="text-zinc-600 dark:text-zinc-400">Email: grievance@swiftshield.in</p>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2">
                  Response time: Within 24 hours of receipt
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                14. Contact Us
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                For questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="mt-4 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                <p className="text-zinc-700 dark:text-zinc-300 font-medium">SwiftShield Privacy Team</p>
                <p className="text-zinc-600 dark:text-zinc-400">Email: privacy@swiftshield.in</p>
                <p className="text-zinc-600 dark:text-zinc-400">Helpline: 1800-XXX-XXXX (Toll-free)</p>
              </div>
            </section>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-8">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            <Link href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
              Terms of Service
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
