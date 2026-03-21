import type { Metadata } from "next"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"

export const metadata: Metadata = {
  title: "Data Deletion Instructions - TheStockHunters",
  description:
    "Learn how to request the deletion of your account and all personal data from TheStockHunters, including data obtained via Facebook Login.",
  robots: { index: true, follow: true },
}

export default function DataDeletionPage() {
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
                  <i className="ri-delete-bin-5-line text-3xl"></i>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Data Deletion Instructions
              </h1>
              <p className="text-gray-600 text-lg mb-4">
                You have the right to request the deletion of your account and all personal data held by
                TheStockHunters at any time.
              </p>
              <p className="text-gray-500 text-sm">Last updated: March 21, 2026</p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-10">

              {/* Overview */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <p className="text-gray-700 leading-relaxed">
                  TheStockHunters respects your right to privacy and data ownership. This page explains how
                  to request the deletion of your account and all associated personal data, including any
                  information collected via Facebook Login (name, email address, and profile picture).
                </p>
              </div>

              {/* How to Request Deletion */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-mail-send-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">How to Request Deletion</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <p className="text-gray-700 mb-8">
                    Follow these simple steps to submit a data deletion request:
                  </p>
                  <div className="space-y-6">
                    {[
                      {
                        step: "1",
                        icon: "ri-mail-open-line",
                        title: "Compose an Email",
                        desc: (
                          <>
                            Open your email client and compose a new message to{" "}
                            <a
                              href="mailto:stock.hunter.info@gmail.com?subject=Delete My Account"
                              className="text-primary font-medium hover:underline"
                            >
                              stock.hunter.info@gmail.com
                            </a>
                            .
                          </>
                        ),
                      },
                      {
                        step: "2",
                        icon: "ri-edit-line",
                        title: 'Use the Subject Line: "Delete My Account"',
                        desc: (
                          <>
                            Set the email subject to exactly: <strong>"Delete My Account"</strong>. This
                            ensures your request is correctly routed to our data management team.
                          </>
                        ),
                      },
                      {
                        step: "3",
                        icon: "ri-user-line",
                        title: "Include Your Account Details",
                        desc: (
                          <>
                            In the body of the email, include the name and email address associated with
                            your TheStockHunters account so we can locate and verify your data.
                          </>
                        ),
                      },
                      {
                        step: "4",
                        icon: "ri-send-plane-line",
                        title: "Send Your Request",
                        desc: (
                          <>
                            Send the email. You will receive a confirmation reply acknowledging that your
                            request has been received.
                          </>
                        ),
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex">
                        <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4">
                          {item.step}
                        </div>
                        <div className="flex-1 pt-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-gray-700">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 text-center">
                    <a
                      href="mailto:stock.hunter.info@gmail.com?subject=Delete My Account"
                      className="inline-flex items-center bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition"
                    >
                      <i className="ri-mail-send-line mr-2"></i>
                      Send Deletion Request
                    </a>
                  </div>
                </div>
              </div>

              {/* What Data Will Be Deleted */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-database-2-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">What Data Will Be Deleted</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <p className="text-gray-700 mb-6">
                    Upon processing your deletion request, we will permanently remove all personal data
                    associated with your account, including:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { icon: "ri-user-line", label: "Full name" },
                      { icon: "ri-mail-line", label: "Email address" },
                      { icon: "ri-image-line", label: "Profile picture" },
                      { icon: "ri-login-circle-line", label: "Login history and session records" },
                      { icon: "ri-settings-line", label: "Account preferences and settings" },
                      { icon: "ri-history-line", label: "Activity logs and usage data" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 flex items-center justify-center text-primary mr-3 flex-shrink-0">
                          <i className={item.icon}></i>
                        </div>
                        <p className="text-gray-700">{item.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                    <p className="text-gray-700 text-sm">
                      <strong>Note:</strong> We may retain certain non-personal, anonymised, or aggregated
                      data that cannot be used to identify you, as well as any information required to be
                      retained by applicable law.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-time-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Timeline</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <div className="space-y-6">
                    {[
                      {
                        icon: "ri-checkbox-circle-line",
                        title: "Acknowledgement",
                        desc: "You will receive a confirmation email within 2 business days acknowledging that your deletion request has been received and is being processed.",
                        color: "text-green-600",
                        bg: "bg-green-50",
                      },
                      {
                        icon: "ri-time-line",
                        title: "Processing — within 30 days",
                        desc: "All personal data associated with your account will be permanently deleted from our systems within 30 days of receiving your request.",
                        color: "text-primary",
                        bg: "bg-primary/5",
                      },
                      {
                        icon: "ri-mail-check-line",
                        title: "Deletion Confirmed",
                        desc: "Once the deletion is complete, we will send you a final confirmation email to the address on file, verifying that your data has been permanently removed.",
                        color: "text-blue-600",
                        bg: "bg-blue-50",
                      },
                    ].map((item, i) => (
                      <div key={i} className={`flex p-6 rounded-lg ${item.bg}`}>
                        <div className={`w-10 h-10 flex items-center justify-center ${item.color} mr-4 flex-shrink-0 text-2xl`}>
                          <i className={item.icon}></i>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-gray-700">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Facebook-Specific Note */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-facebook-box-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Signed In via Facebook?</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm space-y-4">
                  <p className="text-gray-700">
                    If you signed in using Facebook Login, we hold only the data you authorised during the
                    Facebook Login process (name, email, profile picture). Requesting deletion with us will
                    remove all of this data from our platform.
                  </p>
                  <p className="text-gray-700">
                    To also revoke TheStockHunters' access to your Facebook account, you can remove the app
                    directly in your Facebook settings:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                    <li>
                      Go to <strong>Facebook Settings &amp; Privacy → Settings → Apps and Websites</strong>.
                    </li>
                    <li>Find <strong>TheStockHunters</strong> in the list of active apps.</li>
                    <li>Click <strong>Remove</strong> to revoke access.</li>
                  </ol>
                  <p className="text-gray-700">
                    Revoking access on Facebook stops future data sharing but does not automatically delete
                    data already held on our servers — please also send us an email deletion request as
                    described above.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-contacts-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Questions?</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <p className="text-gray-700 mb-6">
                    If you have any questions about the data deletion process or your privacy rights, please
                    reach out to us:
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
                  <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <a
                      href="/privacy-policy"
                      className="inline-flex items-center justify-center border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/5 transition"
                    >
                      <i className="ri-shield-check-line mr-2"></i>
                      Privacy Policy
                    </a>
                    <a
                      href="/terms-of-service"
                      className="inline-flex items-center justify-center border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/5 transition"
                    >
                      <i className="ri-file-list-2-line mr-2"></i>
                      Terms of Service
                    </a>
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
