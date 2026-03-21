import type { Metadata } from "next"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"

export const metadata: Metadata = {
  title: "Terms of Service - TheStockHunters",
  description:
    "Read the Terms of Service for TheStockHunters — a stock market analysis and live streaming platform. Understand your rights, responsibilities, and our disclaimers.",
  robots: { index: true, follow: true },
}

export default function TermsOfServicePage() {
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
                  <i className="ri-file-list-2-line text-3xl"></i>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
              <p className="text-gray-600 text-lg mb-4">
                Please read these terms carefully before using TheStockHunters platform.
              </p>
              <p className="text-gray-500 text-sm">Effective date: March 21, 2026</p>
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
                  These Terms of Service ("Terms") govern your access to and use of the TheStockHunters
                  website and services (collectively, the "Service"), operated by TheStockHunters ("we", "us",
                  or "our"). By accessing or using our Service, you confirm that you have read, understood, and
                  agree to be bound by these Terms. If you do not agree, please do not use our Service.
                </p>
              </div>

              {/* Service Description */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-bar-chart-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Service Description</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm space-y-4">
                  <p className="text-gray-700">
                    TheStockHunters is a <strong>stock market analysis and live streaming platform</strong> that
                    provides:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Real-time and historical stock market data and analysis.</li>
                    <li>Live streaming sessions featuring market commentary and discussion.</li>
                    <li>Educational content covering investment concepts and strategies.</li>
                    <li>Community features enabling users to discuss market developments.</li>
                    <li>Expert insights and market outlook articles.</li>
                  </ul>
                  <p className="text-gray-700">
                    We reserve the right to modify, suspend, or discontinue any part of the Service at any
                    time with reasonable notice.
                  </p>
                </div>
              </div>

              {/* User Responsibilities */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-user-settings-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">User Responsibilities</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <div className="space-y-6">
                    {[
                      {
                        icon: "ri-calendar-check-line",
                        title: "Age Requirement",
                        desc: "You must be at least 18 years of age to use our Service. By accessing the platform, you represent and warrant that you meet this requirement.",
                      },
                      {
                        icon: "ri-id-card-line",
                        title: "Accurate Information",
                        desc: "You agree to provide accurate, current, and complete information when creating your account and to keep your information up to date. Providing false or misleading information may result in account termination.",
                      },
                      {
                        icon: "ri-lock-password-line",
                        title: "Account Security",
                        desc: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately at stock.hunter.info@gmail.com if you suspect unauthorised access.",
                      },
                      {
                        icon: "ri-thumb-up-line",
                        title: "Acceptable Use",
                        desc: "You agree not to use the Service for any unlawful purpose, to harass or harm other users, to distribute spam or malware, to manipulate market information, or to engage in any activity that disrupts the integrity of our platform.",
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4 flex-shrink-0">
                          <i className={`${item.icon} text-xl`}></i>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-700">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Financial Disclaimer */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-error-warning-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Content Disclaimer — Not Financial Advice</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm space-y-4">
                  <div className="p-4 border-l-4 border-yellow-400 bg-yellow-50 rounded-r-lg">
                    <p className="text-gray-800 font-semibold">
                      All content on TheStockHunters is provided for informational and educational purposes
                      only. It does not constitute financial, investment, legal, or tax advice.
                    </p>
                  </div>
                  <p className="text-gray-700">
                    Market analysis, live commentary, articles, and any other content published on our
                    platform reflect the opinions of the authors and should not be relied upon as a basis for
                    making investment decisions.
                  </p>
                  <p className="text-gray-700">
                    Investing in financial markets involves significant risk, including the possible loss of
                    principal. Past performance is not indicative of future results. You should consult a
                    qualified and licensed financial adviser before making any investment decisions.
                  </p>
                  <p className="text-gray-700">
                    TheStockHunters is not a registered investment adviser, broker-dealer, or financial
                    institution and does not hold any securities licences.
                  </p>
                </div>
              </div>

              {/* Liability Limitations */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-scales-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Limitation of Liability</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm space-y-4">
                  <p className="text-gray-700">
                    To the fullest extent permitted by applicable law, TheStockHunters and its officers,
                    directors, employees, and agents shall not be liable for:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Any indirect, incidental, special, consequential, or punitive damages.</li>
                    <li>
                      Any loss of profits, revenue, data, goodwill, or other intangible losses arising from
                      your use of or inability to use the Service.
                    </li>
                    <li>
                      Any investment losses or financial decisions made based on content published on our
                      platform.
                    </li>
                    <li>
                      Unauthorised access to or alteration of your transmissions or data by third parties.
                    </li>
                    <li>
                      Any interruption, suspension, or termination of the Service, whether or not caused by
                      our actions.
                    </li>
                  </ul>
                  <p className="text-gray-700">
                    In jurisdictions where limitation of liability is not fully permitted, our liability shall
                    be limited to the maximum extent allowed by law.
                  </p>
                </div>
              </div>

              {/* Account Termination */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-close-circle-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Account Termination</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm space-y-4">
                  <p className="text-gray-700">
                    <strong>You may terminate your account</strong> at any time by contacting us at{" "}
                    <a
                      href="mailto:stock.hunter.info@gmail.com?subject=Delete My Account"
                      className="text-primary font-medium hover:underline"
                    >
                      stock.hunter.info@gmail.com
                    </a>
                    . Upon termination, your personal data will be deleted in accordance with our{" "}
                    <a href="/privacy-policy" className="text-primary font-medium hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                  <p className="text-gray-700">
                    <strong>We reserve the right to suspend or terminate</strong> your account at our
                    discretion, with or without prior notice, if we determine that you have violated these
                    Terms, engaged in fraudulent activity, or caused harm to other users or the platform.
                  </p>
                  <p className="text-gray-700">
                    Termination of your account does not release you from any obligations or liabilities
                    incurred prior to the termination date.
                  </p>
                </div>
              </div>

              {/* Changes to Terms */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-refresh-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Changes to These Terms</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <p className="text-gray-700">
                    We may update these Terms from time to time. When we make material changes, we will update
                    the effective date at the top of this page and notify you via email or a prominent notice
                    on our platform. Your continued use of the Service after changes take effect constitutes
                    your acceptance of the revised Terms.
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
                    If you have any questions about these Terms of Service, please contact us:
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
