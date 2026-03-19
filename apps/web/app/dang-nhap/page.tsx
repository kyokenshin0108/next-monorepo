"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabaseBrowser } from "@/lib/supabase/client"

export default function DangNhapPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "", remember: false })
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState<"google" | "facebook" | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Forgot-password modal state
  const [showForgot, setShowForgot] = useState(false)
  const [forgotEmail, setForgotEmail] = useState("")
  const [forgotLoading, setForgotLoading] = useState(false)
  const [forgotSent, setForgotSent] = useState(false)
  const [forgotError, setForgotError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
  }

  // ── Email / password login ────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!formData.email.trim() || !formData.password.trim()) return
    setLoading(true)
    const { error } = await supabaseBrowser.auth.signInWithPassword({
      email: formData.email.trim(),
      password: formData.password,
    })
    setLoading(false)
    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        setError("Email hoặc mật khẩu không đúng.")
      } else if (error.message.includes("Email not confirmed")) {
        setError("Tài khoản chưa được xác nhận. Vui lòng kiểm tra email.")
      } else {
        setError(error.message)
      }
      return
    }
    router.push("/")
    router.refresh()
  }

  // ── OAuth login (Google / Facebook) ──────────────────────────────────────
  const handleOAuth = async (provider: "google" | "facebook") => {
    setError(null)
    setOauthLoading(provider)
    const { error } = await supabaseBrowser.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      setError(`Đăng nhập ${provider === "google" ? "Google" : "Facebook"} thất bại: ${error.message}`)
      setOauthLoading(null)
    }
    // On success, Supabase redirects the browser — no further action needed
  }

  // ── Forgot password ───────────────────────────────────────────────────────
  const openForgot = () => {
    setForgotEmail(formData.email)
    setForgotSent(false)
    setForgotError(null)
    setShowForgot(true)
  }

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setForgotError(null)
    if (!forgotEmail.trim()) {
      setForgotError("Vui lòng nhập địa chỉ email.")
      return
    }
    setForgotLoading(true)
    const { error } = await supabaseBrowser.auth.resetPasswordForEmail(forgotEmail.trim(), {
      redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
    })
    setForgotLoading(false)
    if (error) {
      setForgotError(error.message)
      return
    }
    setForgotSent(true)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-primary font-['Pacifico'] text-2xl">TheStockHunters</Link>
          <Link href="/" className="text-gray-700 hover:text-primary transition flex items-center">
            <div className="w-5 h-5 flex items-center justify-center mr-1">
              <i className="ri-arrow-left-line"></i>
            </div>
            <span>Quay lại</span>
          </Link>
        </div>
      </header>

      {/* Login Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                {/* Login Form */}
                <div className="lg:col-span-3 p-6 md:p-8 lg:p-10">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Đăng Nhập TheStockHunters</h1>

                  {/* OAuth buttons */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button
                      type="button"
                      onClick={() => handleOAuth("google")}
                      disabled={!!oauthLoading || loading}
                      className="w-full px-4 py-3 rounded-button border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {oauthLoading === "google" ? (
                        <i className="ri-loader-4-line animate-spin text-gray-500"></i>
                      ) : (
                        <i className="ri-google-fill text-[#4285F4]"></i>
                      )}
                      Google
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOAuth("facebook")}
                      disabled={!!oauthLoading || loading}
                      className="w-full px-4 py-3 rounded-button border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {oauthLoading === "facebook" ? (
                        <i className="ri-loader-4-line animate-spin text-gray-500"></i>
                      ) : (
                        <i className="ri-facebook-fill text-[#1877F2]"></i>
                      )}
                      Facebook
                    </button>
                  </div>

                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 text-gray-500 bg-white">Hoặc đăng nhập bằng email</span>
                    </div>
                  </div>

                  <form id="login-form" onSubmit={handleSubmit}>
                    <div className="space-y-5">
                      <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                          required
                          autoComplete="email"
                        />
                      </div>
                      <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                          Mật khẩu <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition pr-10"
                            required
                            autoComplete="current-password"
                          />
                          <div
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-500 cursor-pointer"
                          >
                            <i className={showPassword ? "ri-eye-line" : "ri-eye-off-line"}></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id="remember"
                            name="remember"
                            checked={formData.remember}
                            onChange={handleInputChange}
                            className="hidden"
                          />
                          <label htmlFor="remember" className="flex items-start cursor-pointer">
                            <span className={`w-5 h-5 inline-block mr-2 rounded border flex-shrink-0 relative before:content-[''] before:absolute before:w-full before:h-full before:rounded mt-0.5 ${formData.remember ? "bg-primary border-primary" : "border-gray-300"}`}></span>
                            <span className="text-gray-700 text-sm">Ghi nhớ đăng nhập</span>
                          </label>
                        </div>
                        <button
                          type="button"
                          onClick={openForgot}
                          className="text-primary text-sm font-medium hover:underline"
                        >
                          Quên mật khẩu?
                        </button>
                      </div>

                      {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                          <i className="ri-error-warning-line flex-shrink-0"></i>
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading || !!oauthLoading}
                        className="w-full bg-primary text-white px-6 py-3 rounded-button font-medium hover:bg-primary/90 transition flex items-center justify-center gap-2 disabled:opacity-70"
                      >
                        <i className={loading ? "ri-loader-4-line animate-spin" : "ri-login-circle-line"}></i>
                        {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
                      </button>

                      <div className="text-center">
                        <p className="text-gray-600">Chưa có tài khoản? <Link href="/dang-ky" className="text-primary font-medium hover:underline">Đăng ký ngay</Link></p>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Benefits Section */}
                <div className="lg:col-span-2 bg-primary/5 p-6 md:p-8 lg:p-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Lợi ích khi đăng nhập</h3>
                  <div className="space-y-6">
                    {[
                      { icon: "ri-line-chart-line", title: "Phân tích thị trường chuyên sâu", desc: "Tiếp cận ngay các phân tích thị trường mới nhất từ đội ngũ chuyên gia của chúng tôi." },
                      { icon: "ri-live-line", title: "Tham gia live stream với chuyên gia", desc: "Đặt câu hỏi trực tiếp với các chuyên gia hàng đầu trong các buổi live stream độc quyền." },
                      { icon: "ri-lock-line", title: "Nội dung độc quyền", desc: "Truy cập vào kho tài liệu, báo cáo và khuyến nghị đầu tư chỉ dành cho thành viên." },
                      { icon: "ri-notification-3-line", title: "Thông báo cơ hội đầu tư", desc: "Nhận thông báo kịp thời về các cơ hội đầu tư tiềm năng và biến động thị trường quan trọng." },
                      { icon: "ri-group-line", title: "Cộng đồng nhà đầu tư", desc: "Kết nối với cộng đồng nhà đầu tư để trao đổi kinh nghiệm và học hỏi từ nhau." },
                    ].map((item, i) => (
                      <div key={i} className="flex">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4 flex-shrink-0">
                          <i className={`${item.icon} text-xl`}></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-gray-700">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Sẵn sàng bắt đầu hành trình đầu tư của bạn?</h2>
            <p className="text-xl text-blue-100 mb-8">Đăng nhập ngay hôm nay để tiếp tục hành trình đầu tư cùng TheStockHunters.</p>
            <a href="#login-form" className="bg-white text-primary px-8 py-4 rounded-button font-medium hover:bg-gray-100 transition whitespace-nowrap inline-flex items-center gap-2">
              <i className="ri-login-circle-line"></i>
              Đăng Nhập Ngay
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link href="/" className="text-white font-['Pacifico'] text-2xl mb-4 md:mb-0">TheStockHunters</Link>
            <div className="flex space-x-6">
              <Link href="/dieu-khoan-su-dung" className="hover:text-white transition">Điều khoản sử dụng</Link>
              <Link href="/chinh-sach-bao-mat" className="hover:text-white transition">Chính sách bảo mật</Link>
              <Link href="/lien-he" className="hover:text-white transition">Liên hệ</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-center">
            <p>© 2025 TheStockHunters. Tất cả các quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>

      {/* ── Forgot Password Modal ─────────────────────────────────────────── */}
      {showForgot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Quên mật khẩu</h3>
              <button
                onClick={() => setShowForgot(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            {forgotSent ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-mail-check-line text-green-600 text-2xl"></i>
                </div>
                <p className="font-medium text-gray-900 mb-1">Email đã được gửi!</p>
                <p className="text-sm text-gray-500">
                  Kiểm tra hộp thư <span className="font-medium text-gray-700">{forgotEmail}</span> và nhấn vào link để đặt lại mật khẩu.
                </p>
                <p className="text-xs text-gray-400 mt-3">Không thấy email? Kiểm tra thư mục Spam.</p>
                <button
                  onClick={() => setShowForgot(false)}
                  className="mt-5 w-full bg-primary text-white py-2.5 rounded-button font-medium hover:bg-primary/90 transition"
                >
                  Đóng
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <p className="text-sm text-gray-500">
                  Nhập email đăng ký của bạn. Chúng tôi sẽ gửi link để đặt lại mật khẩu.
                </p>
                <div>
                  <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="forgot-email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-sm"
                    placeholder="email@example.com"
                    required
                    autoFocus
                  />
                </div>

                {forgotError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2.5 rounded-lg text-sm flex items-center gap-2">
                    <i className="ri-error-warning-line flex-shrink-0"></i>
                    {forgotError}
                  </div>
                )}

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowForgot(false)}
                    className="flex-1 py-2.5 border border-gray-300 rounded-button text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="flex-1 py-2.5 bg-primary text-white rounded-button text-sm font-medium hover:bg-primary/90 transition flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {forgotLoading && <i className="ri-loader-4-line animate-spin"></i>}
                    {forgotLoading ? "Đang gửi..." : "Gửi email"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
