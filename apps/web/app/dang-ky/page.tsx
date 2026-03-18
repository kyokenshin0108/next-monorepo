"use client"
import { useState } from "react"
import Link from "next/link"

export default function DangKyPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
    newsletter: false,
  })
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [faqOpen, setFaqOpen] = useState<number | null>(0)

  const faqs = [
    {
      q: "Tài khoản TheStockHunters có tính phí không?",
      a: "TheStockHunters cung cấp cả tài khoản miễn phí và tài khoản trả phí. Với tài khoản miễn phí, bạn có thể truy cập các phân tích thị trường cơ bản, tham gia một số buổi live stream và đọc các bài viết kiến thức đầu tư. Tài khoản trả phí sẽ mở khóa tất cả các tính năng cao cấp như phân tích chuyên sâu, khuyến nghị đầu tư cụ thể và tư vấn 1-1 với chuyên gia.",
    },
    {
      q: "Làm thế nào để nâng cấp lên tài khoản trả phí?",
      a: "Sau khi đăng ký tài khoản miễn phí, bạn có thể nâng cấp lên tài khoản trả phí bằng cách truy cập vào phần \"Tài khoản\" và chọn \"Nâng cấp tài khoản\". Chúng tôi cung cấp nhiều gói dịch vụ khác nhau với các mức giá phù hợp với nhu cầu và ngân sách của bạn. Bạn có thể thanh toán qua thẻ tín dụng, chuyển khoản ngân hàng hoặc ví điện tử.",
    },
    {
      q: "Tôi có thể hủy tài khoản bất cứ lúc nào không?",
      a: "Có, bạn có thể hủy tài khoản TheStockHunters bất cứ lúc nào. Đối với tài khoản trả phí, nếu bạn hủy trong thời gian sử dụng, bạn vẫn có thể tiếp tục sử dụng dịch vụ cho đến hết thời hạn đã thanh toán. Chúng tôi không hoàn tiền cho thời gian sử dụng còn lại. Để hủy tài khoản, vui lòng truy cập phần \"Tài khoản\" và chọn \"Hủy tài khoản\".",
    },
    {
      q: "TheStockHunters có ứng dụng di động không?",
      a: "Hiện tại, TheStockHunters đang phát triển ứng dụng di động cho cả hệ điều hành iOS và Android. Dự kiến ứng dụng sẽ được ra mắt vào quý 3 năm 2025. Trong thời gian chờ đợi, bạn vẫn có thể truy cập trang web của chúng tôi thông qua trình duyệt di động với trải nghiệm được tối ưu hóa cho màn hình nhỏ.",
    },
    {
      q: "Thông tin cá nhân của tôi có được bảo mật không?",
      a: "TheStockHunters cam kết bảo mật thông tin cá nhân của khách hàng. Chúng tôi tuân thủ nghiêm ngặt các quy định về bảo vệ dữ liệu và không bao giờ chia sẻ thông tin của bạn với bên thứ ba mà không có sự đồng ý. Tất cả dữ liệu được mã hóa và lưu trữ an toàn trên hệ thống máy chủ bảo mật của chúng tôi. Bạn có thể tìm hiểu thêm trong Chính sách bảo mật của chúng tôi.",
    },
  ]

  const handleFaqToggle = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password.length < 8) return
    if (formData.password !== formData.confirmPassword) return
    if (!formData.terms) return
    setSubmitStatus("loading")
    const data: Record<string, string> = {
      fullname: formData.fullname,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    }
    try {
      const response = await fetch("https://readdy.ai/api/form/d12kbs2gsjloep0qolqg", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      })
      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ fullname: "", email: "", phone: "", password: "", confirmPassword: "", terms: false, newsletter: false })
        setTimeout(() => setSubmitStatus("idle"), 5000)
      } else {
        throw new Error("Submission failed")
      }
    } catch {
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 5000)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-primary font-['Pacifico'] text-2xl">TheStockHunters</Link>
          <Link href="/lien-he" className="text-gray-700 hover:text-primary transition flex items-center">
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
                  <form id="registration-form" onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="fullname" className="block text-gray-700 font-medium mb-2">Họ và tên <span className="text-red-500">*</span></label>
                        <input type="text" id="fullname" name="fullname" value={formData.fullname} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition" required />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email <span className="text-red-500">*</span></label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition" required />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Số điện thoại <span className="text-red-500">*</span></label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition" required />
                      </div>
                      <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Mật khẩu <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition pr-10" required />
                          <div onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-500 cursor-pointer">
                            <i className={showPassword ? "ri-eye-line" : "ri-eye-off-line"}></i>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số</p>
                      </div>
                      <div>
                        <label htmlFor="confirm-password" className="block text-gray-700 font-medium mb-2">Xác nhận mật khẩu <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <input type={showConfirmPassword ? "text" : "password"} id="confirm-password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition pr-10" required />
                          <div onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-500 cursor-pointer">
                            <i className={showConfirmPassword ? "ri-eye-line" : "ri-eye-off-line"}></i>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-start">
                          <input type="checkbox" id="terms" name="terms" checked={formData.terms} onChange={handleInputChange} className="hidden" required />
                          <label htmlFor="terms" className="flex items-start cursor-pointer">
                            <span className={`w-5 h-5 inline-block mr-2 rounded border flex-shrink-0 relative before:content-[''] before:absolute before:w-full before:h-full before:rounded mt-0.5 ${formData.terms ? "bg-primary border-primary" : "border-gray-300"}`}></span>
                            <span className="text-gray-700 text-sm">Tôi đồng ý với <Link href="/dieu-khoan-su-dung" className="text-primary hover:underline">Điều khoản sử dụng</Link> và <Link href="/chinh-sach-bao-mat" className="text-primary hover:underline">Chính sách bảo mật</Link> của TheStockHunters</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-start">
                          <input type="checkbox" id="newsletter" name="newsletter" checked={formData.newsletter} onChange={handleInputChange} className="hidden" />
                          <label htmlFor="newsletter" className="flex items-start cursor-pointer">
                            <span className={`w-5 h-5 inline-block mr-2 rounded border flex-shrink-0 relative before:content-[''] before:absolute before:w-full before:h-full before:rounded mt-0.5 ${formData.newsletter ? "bg-primary border-primary" : "border-gray-300"}`}></span>
                            <span className="text-gray-700 text-sm">Tôi muốn nhận thông tin cập nhật về thị trường và các cơ hội đầu tư qua email</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <button type="submit" disabled={submitStatus === "loading"} className="w-full bg-primary text-white px-6 py-3 rounded-button font-medium hover:bg-primary/90 transition whitespace-nowrap flex items-center justify-center disabled:opacity-70">
                          <div className="w-5 h-5 flex items-center justify-center mr-2">
                            <i className={submitStatus === "loading" ? "ri-loader-4-line animate-spin" : "ri-user-add-line"}></i>
                          </div>
                          {submitStatus === "loading" ? "Đang xử lý..." : "Đăng Ký Tài Khoản"}
                        </button>
                      </div>
                      {submitStatus === "success" && (
                        <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg">
                          Đăng ký tài khoản thành công! Vui lòng kiểm tra email để xác nhận tài khoản.
                        </div>
                      )}
                      {submitStatus === "error" && (
                        <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg">
                          Đã có lỗi xảy ra. Vui lòng thử lại sau.
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
                    <div className="flex">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4 flex-shrink-0">
                        <i className="ri-line-chart-line text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Phân tích thị trường chuyên sâu</h4>
                        <p className="text-gray-700">Nhận báo cáo phân tích thị trường hàng ngày và hàng tuần từ đội ngũ chuyên gia của chúng tôi.</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4 flex-shrink-0">
                        <i className="ri-live-line text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Tham gia live stream với chuyên gia</h4>
                        <p className="text-gray-700">Tham gia các buổi live stream hàng tuần với các chuyên gia hàng đầu về thị trường chứng khoán.</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4 flex-shrink-0">
                        <i className="ri-lock-line text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Nội dung độc quyền</h4>
                        <p className="text-gray-700">Tiếp cận các bài viết, phân tích và khuyến nghị đầu tư độc quyền chỉ dành cho thành viên.</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4 flex-shrink-0">
                        <i className="ri-notification-3-line text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Thông báo cơ hội đầu tư</h4>
                        <p className="text-gray-700">Nhận thông báo kịp thời về các cơ hội đầu tư tiềm năng và biến động thị trường quan trọng.</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4 flex-shrink-0">
                        <i className="ri-group-line text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Cộng đồng nhà đầu tư</h4>
                        <p className="text-gray-700">Tham gia cộng đồng nhà đầu tư của TheStockHunters để trao đổi kinh nghiệm và học hỏi từ nhau.</p>
                      </div>
                    </div>
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

      {/* Testimonials Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Nhà đầu tư nói gì về chúng tôi</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Hàng nghìn nhà đầu tư đã tin tưởng và sử dụng dịch vụ của TheStockHunters để nâng cao hiệu quả đầu tư.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  <i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i>
                </div>
              </div>
              <p className="text-gray-700 mb-6">"Tôi đã tham gia TheStockHunters được hơn 1 năm và thực sự ấn tượng với chất lượng phân tích thị trường. Các khuyến nghị đầu tư rất chính xác và giúp tôi tăng hiệu suất danh mục đầu tư lên đáng kể."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-primary mr-3">
                  <i className="ri-user-3-fill text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Nguyễn Văn Tuấn</h4>
                  <p className="text-gray-600 text-sm">Nhà đầu tư cá nhân, Hà Nội</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  <i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i>
                </div>
              </div>
              <p className="text-gray-700 mb-6">"Các buổi live stream với chuyên gia của TheStockHunters đã giúp tôi hiểu sâu hơn về phân tích kỹ thuật và cơ bản. Tôi đã áp dụng những kiến thức này vào chiến lược đầu tư của mình và thu được kết quả rất tốt."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-primary mr-3">
                  <i className="ri-user-3-fill text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Trần Thị Minh Hương</h4>
                  <p className="text-gray-600 text-sm">Chuyên viên tài chính, TP.HCM</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  <i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i>
                </div>
              </div>
              <p className="text-gray-700 mb-6">"Là người mới bắt đầu đầu tư chứng khoán, tôi rất may mắn khi biết đến TheStockHunters. Nội dung kiến thức đầu tư rất dễ hiểu và thực tế. Đội ngũ hỗ trợ luôn sẵn sàng giải đáp mọi thắc mắc của tôi."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-primary mr-3">
                  <i className="ri-user-3-fill text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Lê Đình Quang</h4>
                  <p className="text-gray-600 text-sm">Kỹ sư phần mềm, Đà Nẵng</p>
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
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button onClick={() => handleFaqToggle(index)} className="w-full px-6 py-4 text-left font-semibold flex items-center justify-between focus:outline-none bg-white">
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
