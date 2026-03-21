import type { Metadata } from "next"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"

export const metadata: Metadata = {
  title: "Privacy Policy - TheStockHunters",
  description:
    "Learn how TheStockHunters collects, uses, and protects your personal data including information obtained through Facebook Login.",
  robots: { index: true, follow: true },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <i className="ri-shield-check-line text-3xl"></i>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
              <p className="text-gray-600 text-lg mb-4">
                TheStockHunters is committed to protecting your privacy and personal information.
              </p>
              <p className="text-gray-500 text-sm">Last updated: March 21, 2026</p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-10">

              {/* Introduction */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <p className="text-gray-700 leading-relaxed">
                  This Privacy Policy describes how TheStockHunters ("we", "us", or "our") collects, uses, and
                  safeguards your personal information when you use our platform, including when you sign in via
                  Facebook Login. By using our services, you agree to the practices described in this policy.
                </p>
              </div>

              {/* Data We Collect */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-information-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Data We Collect</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <p className="text-gray-700 mb-6">
                    When you sign in using Facebook Login, we request and receive only the following information
                    from your Facebook profile:
                  </p>
                  <div className="space-y-4">
                    {[
                      {
                        icon: "ri-user-line",
                        title: "Full Name",
                        desc: "Your name as it appears on your Facebook profile, used to personalise your experience on our platform.",
                      },
                      {
                        icon: "ri-mail-line",
                        title: "Email Address",
                        desc: "Your email address associated with Facebook, used for account identification, login, and communication.",
                      },
                      {
                        icon: "ri-image-line",
                        title: "Profile Picture",
                        desc: "Your Facebook profile picture, displayed as your avatar within the platform.",
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex">
                        <div className="w-6 h-6 flex items-center justify-center text-primary mr-3 flex-shrink-0 mt-0.5">
                          <i className={item.icon}></i>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-gray-700">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                    <p className="text-gray-700 text-sm">
                      We do not request access to your Facebook friends list, posts, messages, or any other data
                      beyond the permissions listed above.
                    </p>
                  </div>
                </div>
              </div>

              {/* How We Use Data */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-file-list-3-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">How We Use Your Data</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <p className="text-gray-700 mb-6">
                    We use the information collected exclusively for the following purposes:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        icon: "ri-login-box-line",
                        title: "Authentication",
                        desc: "To verify your identity and allow secure access to your account on our platform.",
                      },
                      {
                        icon: "ri-customer-service-2-line",
                        title: "Personalisation",
                        desc: "To display your name and profile picture within the platform for a personalised experience.",
                      },
                      {
                        icon: "ri-mail-send-line",
                        title: "Communication",
                        desc: "To send important account-related notifications such as login alerts or policy updates.",
                      },
                      {
                        icon: "ri-shield-check-line",
                        title: "Security",
                        desc: "To protect your account, detect fraud, and ensure the security and integrity of our platform.",
                      },
                    ].map((item, i) => (
                      <div key={i} className="border border-gray-200 rounded-lg p-6">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                          <i className={`${item.icon} text-xl`}></i>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-700">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Data Storage */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-database-2-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Data Storage &amp; Security</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm space-y-4">
                  <p className="text-gray-700">
                    Your personal data is stored securely in <strong>Supabase</strong>, an enterprise-grade,
                    SOC 2 Type II compliant database platform. Supabase encrypts data at rest and in transit
                    using industry-standard TLS/SSL and AES-256 encryption.
                  </p>
                  <p className="text-gray-700">
                    We retain your data only for as long as your account is active or as required by law. Upon
                    account deletion, your personal data is removed from our systems within 30 days.
                  </p>
                  <p className="text-gray-700">
                    Access to personal data is strictly limited to authorised personnel and is protected by
                    role-based access controls.
                  </p>
                </div>
              </div>

              {/* No Selling / Sharing */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-forbid-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">We Do Not Sell or Share Your Data</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <p className="text-gray-700 mb-4">
                    We do <strong>not</strong> sell, rent, trade, or otherwise transfer your personal
                    information to third parties for commercial or marketing purposes.
                  </p>
                  <p className="text-gray-700 mb-4">
                    We do not share your data with advertisers, data brokers, or any other external parties
                    except in the following limited circumstances:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>When required by applicable law or a valid legal order.</li>
                    <li>To protect the rights, property, or safety of TheStockHunters, our users, or the public.</li>
                    <li>
                      With trusted service providers who operate under strict confidentiality agreements and
                      process data solely on our behalf (e.g., Supabase for database hosting).
                    </li>
                  </ul>
                </div>
              </div>

              {/* User Rights & Data Deletion */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-delete-bin-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Your Rights &amp; Data Deletion</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm space-y-4">
                  <p className="text-gray-700">
                    You have the right to access, correct, or delete your personal data at any time.
                  </p>
                  <p className="text-gray-700">
                    To request deletion of your account and all associated personal data, please email us at{" "}
                    <a
                      href="mailto:stock.hunter.info@gmail.com?subject=Delete My Account"
                      className="text-primary font-medium hover:underline"
                    >
                      stock.hunter.info@gmail.com
                    </a>{" "}
                    with the subject line <strong>"Delete My Account"</strong>. We will process your request
                    and confirm deletion within <strong>30 days</strong>.
                  </p>
                  <p className="text-gray-700">
                    For a step-by-step guide, see our{" "}
                    <a href="/data-deletion" className="text-primary font-medium hover:underline">
                      Data Deletion Instructions
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-contacts-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <p className="text-gray-700 mb-6">
                    If you have any questions, concerns, or requests regarding this Privacy Policy or the
                    handling of your personal data, please contact us:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center text-primary mr-3">
                        <i className="ri-building-line"></i>
                      </div>
                      <p className="text-gray-700 font-medium">TheStockHunters</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center text-primary mr-3">
                        <i className="ri-mail-line"></i>
                      </div>
                      <a
                        href="mailto:stock.hunter.info@gmail.com"
                        className="text-primary font-medium hover:underline"
                      >
                        stock.hunter.info@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                    <p className="text-gray-600 text-sm">
                      We aim to respond to all privacy-related inquiries within <strong>30 days</strong> of
                      receipt.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
