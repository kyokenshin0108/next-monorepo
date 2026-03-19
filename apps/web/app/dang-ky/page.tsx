"use client"
import { useState } from "react"
import Link from "next/link"
import { supabaseBrowser } from "@/lib/supabase/client"

export default function DangKyPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [oauthLoading, setOauthLoading] = useState<"google" | "facebook" | null>(null)
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
    newsletter: false,
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [faqOpen, setFaqOpen] = useState<number | null>(0)

  const faqs = [
    {
      q: "Tài khoản TheStockHunters có tính phí không?",
      a: "TheStockHunters cung cấp cả tài khoản miễn phí và tài khoản trả phí. Với tài khoản miễn phí, bạn có thể truy cập các phân tích thị trường cơ bản, tham gia một số buổi live stream và đọc các bài viết kiến thức đầu tư.",
    },
    {
      q: "Làm thế nào để nâng cấp lên tài khoản trả phí?",
      a: "Sau khi đăng ký tài khoản miễn phí, bạn có thể nâng cấp lên tài khoản trả phí bằng cách truy cập vào phần \"Tài khoản\" và chọn \"Nâng cấp tài khoản\".",
    },
    {
      q: "Tôi có thể hủy tài khoản bất cứ lúc nào không?",
      a: "Có, bạn có thể hủy tài khoản TheStockHunters bất cứ lúc nào. Để hủy tài khoản, vui lòng truy cập phần \"Tài khoản\" và chọn \"Hủy tài khoản\".",
    },
    {
      q: "TheStockHunters có ứng dụng di động không?",
      a: "Hiện tại, TheStockHunters đang phát triển ứng dụng di động cho cả hệ điều hành iOS và Android. Trong thời gian chờ đợi, bạn vẫn có thể truy cập trang web qua trình duyệt di động.",
    },
    {
      q: "Thông tin cá nhân của tôi có được bảo mật không?",
      a: "TheStockHunters cam kết bảo mật thông tin cá nhân của khách hàng. Chúng tôi tuân thủ nghiêm ngặt các quy định về bảo vệ dữ liệu và không bao giờ chia sẻ thông tin của bạn với bên thứ ba mà không có sự đồng ý.",
    },
  ]

  const handleOAuth = async (provider: "google" | "facebook") => {
    setOauthLoading(provider)
    const { error } = await supabaseBrowser.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) {
      setErrorMsg(`Đăng ký ${provider === "google" ? "Google" : "Facebook"} thất bại: ${error.message}`)
      setOauthLoading(null)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (formData.password.length < 8) {
      setErrorMsg("Mật khẩu phải có ít nhất 8 ký tự.")
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Mật khẩu xác nhận không khớp.")
      return
    }
    if (!formData.terms) {
      setErrorMsg("Vui lòng đồng ý với điều khoản sử dụng.")
      return
    }

    setLoading(true)
    const { error } = await supabaseBrowser.auth.signUp({
      email: formData.email.trim(),
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullname.trim(),
          phone: formData.phone.trim(),
        },
      },
    })
    setLoading(false)

    if (error) {
      if (error.message.includes("already registered") || error.message.includes("User already registered")) {
        setErrorMsg("Email này đã được đăng ký. Vui lòng đăng nhập hoặc dùng email khác.")
      } else {
        setErrorMsg(error.message)
      }
      return
    }

    setStatus("success")
    setFormData({ fullname: "", email: "", phone: "", password: "", confirmPassword: "", terms: false, newsletter: false })
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

      {/* Registration Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Đăng Ký Tài Khoản TheStockHunters</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">Tham gia cộng đồng đầu tư chứng khoán hàng đầu Việt Nam và nhận các phân tích chuyên sâu từ đội ngũ chuyên gia của chúng tôi.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                {/* Registration Form */}
                <div className="lg:col-span-3 p-6 md:p-8 lg:p-10">
                  {/* OAuth quick-register */}
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
                      <span className="px-4 text-gray-500 bg-white">Hoặc đăng ký bằng email</span>
                    </div>
                  </div>

                  <form id="registration-form" onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="fullname" className="block text-gray-700 font-medium mb-2">Họ và tên <span className="text-red-500">*</span></label>
                        <input type="text" id="fullname" name="fullname" value={formData.fullname} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition" required />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email <span className="text-red-500">*</span></label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition" required autoComplete="email" />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Số điện thoại</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
                      </div>
                      <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Mật khẩu <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition pr-10" required autoComplete="new-password" />
                          <div onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-500 cursor-pointer">
                            <i className={showPassword ? "ri-eye-line" : "ri-eye-off-line"}></i>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Tối thiểu 8 ký tự</p>
                      </div>
                      <div>
                        <label htmlFor="confirm-password" className="block text-gray-700 font-medium mb-2">Xác nhận mật khẩu <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <input type={showConfirmPassword ? "text" : "password"} id="confirm-password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition pr-10" required autoComplete="new-password" />
                          <div onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-500 cursor-pointer">
                            <i className={showConfirmPassword ? "ri-eye-line" : "ri-eye-off-line"}></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <input type="checkbox" id="terms" name="terms" checked={formData.terms} onChange={handleInputChange} className="hidden" />
                        <label htmlFor="terms" className="flex items-start cursor-pointer">
                          <span className={`w-5 h-5 inline-block mr-2 rounded border flex-shrink-0 relative before:content-[''] before:absolute before:w-full before:h-full before:rounded mt-0.5 ${formData.terms ? "bg-primary border-primary" : "border-gray-300"}`}></span>
                          <span className="text-gray-700 text-sm">Tôi đồng ý với <Link href="/dieu-khoan-su-dung" className="text-primary hover:underline">Điều khoản sử dụng</Link> và <Link href="/chinh-sach-bao-mat" className="text-primary hover:underline">Chính sách bảo mật</Link> của TheStockHunters</span>
                        </label>
                      </div>
                      <div className="flex items-start">
                        <input type="checkbox" id="newsletter" name="newsletter" checked={formData.newsletter} onChange={handleInputChange} className="hidden" />
                        <label htmlFor="newsletter" className="flex items-start cursor-pointer">
                          <span className={`w-5 h-5 inline-block mr-2 rounded border flex-shrink-0 relative before:content-[''] before:absolute before:w-full before:h-full before:rounded mt-0.5 ${formData.newsletter ? "bg-primary border-primary" : "border-gray-300"}`}></span>
                          <span className="text-gray-700 text-sm">Tôi muốn nhận thông tin cập nhật về thị trường và các cơ hội đầu tư qua email</span>
                        </label>
                      </div>

                      {errorMsg && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center">
                          <i className="ri-error-warning-line mr-2 flex-shrink-0"></i>
                          {errorMsg}
                        </div>
                      )}

                      <div>
                        <button type="submit" disabled={loading} className="w-full bg-primary text-white px-6 py-3 rounded-button font-medium hover:bg-primary/90 transition whitespace-nowrap flex items-center justify-center disabled:opacity-70">
                          <div className="w-5 h-5 flex items-center justify-center mr-2">
                            <i className={loading ? "ri-loader-4-line animate-spin" : "ri-user-add-line"}></i>
                          </div>
                          {loading ? "Đang xử lý..." : "Đăng Ký Tài Khoản"}
                        </button>
                      </div>

                      {status === "success" && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                          <div className="flex items-start">
                            <i className="ri-checkbox-circle-line mr-2 mt-0.5 flex-shrink-0 text-green-500"></i>
                            <div>
                              <p className="font-medium">Đăng ký thành công!</p>
                              <p className="text-sm mt-1">Vui lòng kiểm tra email để xác nhận tài khoản, sau đó <Link href="/dang-nhap" className="font-medium underline">đăng nhập</Link>.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="text-center">
                        <p className="text-gray-600">Đã có tài khoản? <Link href="/dang-nhap" className="text-primary font-medium hover:underline">Đăng nhập</Link></p>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Benefits Section */}
                <div className="lg:col-span-2 bg-primary/5 p-6 md:p-8 lg:p-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Lợi ích khi đăng ký tài khoản</h3>
                  <div className="space-y-6">
                    {[
                      { icon: "ri-line-chart-line", title: "Phân tích thị trường chuyên sâu", desc: "Nhận báo cáo phân tích thị trường hàng ngày và hàng tuần từ đội ngũ chuyên gia của chúng tôi." },
                      { icon: "ri-live-line", title: "Tham gia live stream với chuyên gia", desc: "Tham gia các buổi live stream hàng tuần với các chuyên gia hàng đầu về thị trường chứng khoán." },
                      { icon: "ri-lock-line", title: "Nội dung độc quyền", desc: "Tiếp cận các bài viết, phân tích và khuyến nghị đầu tư độc quyền chỉ dành cho thành viên." },
                      { icon: "ri-notification-3-line", title: "Thông báo cơ hội đầu tư", desc: "Nhận thông báo kịp thời về các cơ hội đầu tư tiềm năng và biến động thị trường quan trọng." },
                      { icon: "ri-group-line", title: "Cộng đồng nhà đầu tư", desc: "Tham gia cộng đồng nhà đầu tư của TheStockHunters để trao đổi kinh nghiệm và học hỏi từ nhau." },
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
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center mb-4">
                      <div className="w-6 h-6 flex items-center justify-center text-primary mr-2">
                        <i className="ri-shield-check-line"></i>
                      </div>
                      <span className="text-gray-700 font-medium">Bảo mật thông tin tuyệt đối</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 flex items-center justify-center text-primary mr-2">
                        <i className="ri-customer-service-2-line"></i>
                      </div>
                      <span className="text-gray-700 font-medium">Hỗ trợ khách hàng 24/7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Câu Hỏi Thường Gặp</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Những thắc mắc phổ biến về việc đăng ký tài khoản và sử dụng dịch vụ của TheStockHunters.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setFaqOpen(faqOpen === index ? null : index)} className="w-full px-6 py-4 text-left font-semibold flex items-center justify-between focus:outline-none bg-white">
                  <span>{faq.q}</span>
                  <i className={faqOpen === index ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"}></i>
                </button>
                {faqOpen === index && (
                  <div className="px-6 pb-4 bg-white">
                    <p className="text-gray-700">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Sẵn sàng bắt đầu hành trình đầu tư của bạn?</h2>
            <p className="text-xl text-blue-100 mb-8">Đăng ký ngay hôm nay để nhận phân tích thị trường chuyên sâu và tham gia cộng đồng nhà đầu tư của TheStockHunters.</p>
            <a href="#registration-form" className="bg-white text-primary px-8 py-4 rounded-button font-medium hover:bg-gray-100 transition whitespace-nowrap inline-flex items-center">
              <div className="w-5 h-5 flex items-center justify-center mr-2">
                <i className="ri-user-add-line"></i>
              </div>
              Đăng Ký Ngay
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
