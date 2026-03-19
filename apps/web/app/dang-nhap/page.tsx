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
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
  }

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
                  <form id="login-form" onSubmit={handleSubmit}>
                    <div className="space-y-6">
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
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-500 cursor-pointer"
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
                        <a href="#" className="text-primary text-sm font-medium hover:underline">Quên mật khẩu?</a>
                      </div>

                      {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center">
                          <i className="ri-error-warning-line mr-2 flex-shrink-0"></i>
                          {error}
                        </div>
                      )}

                      <div>
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-primary text-white px-6 py-3 rounded-button font-medium hover:bg-primary/90 transition whitespace-nowrap flex items-center justify-center disabled:opacity-70"
                        >
                          <div className="w-5 h-5 flex items-center justify-center mr-2">
                            <i className={loading ? "ri-loader-4-line animate-spin" : "ri-login-circle-line"}></i>
                          </div>
                          {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
                        </button>
                      </div>

                      <div className="relative my-2">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 text-gray-500 bg-white">Hoặc đăng nhập với</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          disabled
                          className="w-full px-6 py-3 rounded-button border border-gray-300 bg-white text-gray-400 font-medium transition whitespace-nowrap flex items-center justify-center cursor-not-allowed"
                          title="Đang phát triển"
                        >
                          <div className="w-5 h-5 flex items-center justify-center mr-2">
                            <i className="ri-google-fill text-[#4285F4]"></i>
                          </div>
                          Google
                        </button>
                        <button
                          type="button"
                          disabled
                          className="w-full px-6 py-3 rounded-button border border-gray-300 bg-white text-gray-400 font-medium transition whitespace-nowrap flex items-center justify-center cursor-not-allowed"
                          title="Đang phát triển"
                        >
                          <div className="w-5 h-5 flex items-center justify-center mr-2">
                            <i className="ri-facebook-fill text-[#1877F2]"></i>
                          </div>
                          Facebook
                        </button>
                      </div>
                      <div className="text-center mt-4">
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
            <a href="#login-form" className="bg-white text-primary px-8 py-4 rounded-button font-medium hover:bg-gray-100 transition whitespace-nowrap inline-flex items-center">
              <div className="w-5 h-5 flex items-center justify-center mr-2">
                <i className="ri-login-circle-line"></i>
              </div>
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
    </div>
  )
}
