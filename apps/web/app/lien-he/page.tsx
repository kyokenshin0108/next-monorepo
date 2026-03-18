"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"

export default function LienHePage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0)
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    privacy: false,
  })
  const [charCount, setCharCount] = useState(0)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const faqs = [
    {
      q: "Làm thế nào để đặt lịch tư vấn với chuyên gia?",
      a: "Bạn có thể đặt lịch tư vấn với chuyên gia bằng cách truy cập trang \"Đội Ngũ\" trên website của chúng tôi, chọn chuyên gia phù hợp và nhấp vào nút \"Đặt Lịch Tư Vấn\". Sau đó, điền thông tin cá nhân và chủ đề tư vấn, chúng tôi sẽ liên hệ lại với bạn trong vòng 24 giờ để xác nhận lịch hẹn.",
    },
    {
      q: "Tôi có thể liên hệ với TheStockHunters qua những kênh nào?",
      a: "Bạn có thể liên hệ với TheStockHunters qua nhiều kênh khác nhau: gọi điện thoại đến số hotline, gửi email, điền form liên hệ trên website, nhắn tin qua các trang mạng xã hội của chúng tôi như Facebook, Telegram, hoặc đến trực tiếp văn phòng trong giờ làm việc.",
    },
    {
      q: "Thời gian phản hồi yêu cầu hỗ trợ là bao lâu?",
      a: "Chúng tôi cam kết phản hồi mọi yêu cầu hỗ trợ trong vòng 24 giờ làm việc. Đối với các vấn đề kỹ thuật khẩn cấp, bạn có thể liên hệ qua hotline để được hỗ trợ nhanh chóng. Các yêu cầu tư vấn chuyên sâu có thể mất thời gian lâu hơn tùy thuộc vào lịch trình của chuyên gia.",
    },
    {
      q: "Tôi muốn hợp tác với TheStockHunters thì liên hệ như thế nào?",
      a: "Để đề xuất hợp tác với TheStockHunters, bạn có thể gửi email đến địa chỉ partnership@thestockhunters.vn hoặc điền form liên hệ trên website với chủ đề \"Hợp tác kinh doanh\". Đội ngũ phát triển kinh doanh của chúng tôi sẽ liên hệ lại để thảo luận chi tiết về cơ hội hợp tác.",
    },
    {
      q: "Tôi có thể đóng góp ý kiến hoặc báo cáo lỗi như thế nào?",
      a: "Chúng tôi luôn đánh giá cao mọi ý kiến đóng góp từ người dùng. Bạn có thể gửi góp ý hoặc báo cáo lỗi qua form liên hệ trên website với chủ đề \"Góp ý, phản hồi\", hoặc gửi email trực tiếp đến feedback@thestockhunters.vn. Mọi đóng góp sẽ được xem xét cẩn thận để cải thiện dịch vụ.",
    },
  ]

  const handleFaqToggle = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
      if (name === "message") setCharCount(value.length)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus("loading")
    const formPayload = new URLSearchParams()
    formPayload.append("fullname", formData.fullname)
    formPayload.append("email", formData.email)
    formPayload.append("phone", formData.phone)
    formPayload.append("subject", formData.subject)
    formPayload.append("message", formData.message)
    try {
      const response = await fetch("https://readdy.ai/api/form/d137l0bsc1g7foltfgg0", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formPayload,
      })
      if (!response.ok) throw new Error("Network response was not ok")
      setSubmitStatus("success")
      setFormData({ fullname: "", email: "", phone: "", subject: "", message: "", privacy: false })
      setCharCount(0)
      setTimeout(() => setSubmitStatus("idle"), 3000)
    } catch {
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 3000)
    }
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gray-900 py-20">
          <div className="absolute inset-0 overflow-hidden">
            <img src="https://readdy.ai/api/search-image?query=professional%2520business%2520contact%2520center%2520with%2520modern%2520design%252C%2520customer%2520service%2520representatives%2520in%2520a%2520clean%2520office%2520environment%252C%2520multiple%2520workstations%2520with%2520computers%252C%2520soft%2520lighting%252C%2520blue%2520color%2520scheme%252C%2520large%2520windows%2520with%2520city%2520view%252C%2520professional%2520atmosphere&width=1920&height=600&seq=contact_hero&orientation=landscape" alt="Liên hệ" className="w-full h-full object-cover opacity-30" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Liên Hệ Với TheStockHunters</h1>
              <p className="text-xl text-blue-100 mb-8">Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi hoặc yêu cầu nào.</p>
              <div className="flex flex-wrap gap-4">
                <a href="mailto:stock.hunter.info@gmail.com" className="bg-primary text-white px-6 py-3 rounded-button font-medium hover:bg-primary/90 transition whitespace-nowrap flex items-center">
                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                    <i className="ri-mail-send-line"></i>
                  </div>
                  Gửi Tin Nhắn
                </a>
                <a href="https://zalo.me/g/ejewdx285" className="bg-white text-primary px-6 py-3 rounded-button font-medium hover:bg-gray-100 transition whitespace-nowrap flex items-center">
                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                    <i className="ri-information-line"></i>
                  </div>
                  Thông Tin Liên Hệ
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Info */}
              <div id="contact-info" className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Thông Tin Liên Hệ</h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4 flex-shrink-0">
                        <i className="ri-map-pin-line text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Địa Chỉ</h4>
                        <p className="text-gray-700">Tầng trệt – Tòa nhà The Prince Residence, số 17-19-21 Nguyễn Văn Trỗi, Quận Phú Nhuận, TP. Hồ Chí Minh</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4 flex-shrink-0">
                        <i className="ri-phone-line text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Điện Thoại</h4>
                        <p className="text-gray-700">+84 0901919100</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4 flex-shrink-0">
                        <i className="ri-mail-line text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                        <p className="text-gray-700">stock.hunter.info@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Kết Nối Với Chúng Tôi</h3>
                  <div className="flex space-x-3 mb-6">
                    <a href="https://www.youtube.com/@Thestockhunters" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition">
                      <i className="ri-youtube-fill"></i>
                    </a>
                    <a href="https://www.tiktok.com/@thestockhunters" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition">
                      <i className="ri-tiktok-fill"></i>
                    </a>
                    <a href="https://threads.com/" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition">
                      <i className="ri-threads-fill"></i>
                    </a>
                    <a href="https://substack.com/sign-in?redirect=%2Fpublish%2Fsettings&for_pub=stockhunters&error=You%27re%20logged%20in%20as%20quanghuytrinh18%40gmail.com%2C%20but%20this%20page%20is%20private.%20Try%20signing%20in%20with%20a%20different%20email%2C%20or%20letting%20the%20author%20know%20they%27ve%20linked%20to%20a%20private%20page.&change_user=true" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition">
                      <i className="ri-article-fill"></i>
                    </a>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Đăng Ký Nhận Bản Tin</h4>
                    <p className="text-gray-700 text-sm mb-3">Nhận phân tích thị trường và cập nhật mới nhất từ chúng tôi</p>
                    <form className="flex gap-2">
                      <input type="email" placeholder="Email của bạn" className="flex-1 px-3 py-2 rounded-button text-gray-800 border border-gray-300 text-sm" />
                      <button type="submit" className="bg-primary text-white px-4 py-2 rounded-button text-sm font-medium hover:bg-primary/90 transition whitespace-nowrap">Đăng Ký</button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div id="contact-form" className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Gửi Tin Nhắn Cho Chúng Tôi</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="fullname" className="block text-gray-700 font-medium mb-2">Họ và tên <span className="text-red-500">*</span></label>
                        <input type="text" id="fullname" name="fullname" value={formData.fullname} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition" required />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email <span className="text-red-500">*</span></label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition" required />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Số điện thoại</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Chủ đề <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <select id="subject" name="subject" value={formData.subject} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition appearance-none pr-10" required>
                            <option value="">Chọn chủ đề</option>
                            <option value="support">Hỗ trợ kỹ thuật</option>
                            <option value="consultation">Tư vấn đầu tư</option>
                            <option value="partnership">Hợp tác kinh doanh</option>
                            <option value="feedback">Góp ý, phản hồi</option>
                            <option value="other">Khác</option>
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none w-5 h-5 flex items-center justify-center text-gray-500">
                            <i className="ri-arrow-down-s-line"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Nội dung tin nhắn <span className="text-red-500">*</span></label>
                      <textarea id="message" name="message" rows={6} maxLength={500} value={formData.message} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition" required></textarea>
                      <div className="text-sm text-gray-500 mt-1">{charCount}/500 ký tự</div>
                    </div>
                    <div className="mb-6">
                      <div className="flex items-start">
                        <input type="checkbox" id="privacy" name="privacy" checked={formData.privacy} onChange={handleInputChange} className="hidden" required />
                        <label htmlFor="privacy" className="flex items-start cursor-pointer">
                          <span className={`w-5 h-5 inline-block mr-2 rounded border flex-shrink-0 relative before:content-[''] before:absolute before:w-full before:h-full before:rounded mt-0.5 ${formData.privacy ? "bg-primary border-primary" : "border-gray-300"}`}></span>
                          <span className="text-gray-700 text-sm">Tôi đồng ý với <Link href="/chinh-sach-bao-mat" className="text-primary hover:underline">Chính sách bảo mật</Link> của TheStockHunters và cho phép xử lý thông tin cá nhân của tôi.</span>
                        </label>
                      </div>
                    </div>
                    <button type="submit" disabled={submitStatus === "loading"} className="bg-primary text-white px-6 py-3 rounded-button font-medium hover:bg-primary/90 transition whitespace-nowrap flex items-center disabled:opacity-70">
                      <div className="w-5 h-5 flex items-center justify-center mr-2">
                        <i className={submitStatus === "loading" ? "ri-loader-4-line animate-spin" : "ri-send-plane-line"}></i>
                      </div>
                      {submitStatus === "loading" ? "Đang gửi..." : "Gửi Tin Nhắn"}
                    </button>
                    {submitStatus === "success" && (
                      <div className="mt-4 bg-green-100 text-green-700 px-4 py-3 rounded-lg flex items-center">
                        <i className="ri-check-line mr-2"></i>Tin nhắn đã được gửi thành công!
                      </div>
                    )}
                    {submitStatus === "error" && (
                      <div className="mt-4 bg-red-100 text-red-700 px-4 py-3 rounded-lg flex items-center">
                        <i className="ri-error-warning-line mr-2"></i>Có lỗi xảy ra, vui lòng thử lại sau!
                      </div>
                    )}
                  </form>
                </div>

                {/* Location Map */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Vị Trí Của Chúng Tôi</h3>
                  <div className="h-80 rounded-lg overflow-hidden">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1724668277367!2d106.67742797460394!3d10.797631089362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d4a7c59c09%3A0x8e2f7cbc924be1db!2zMTcgTmd1eeG7hW4gVsSDbiB0cuG7l2ksIFBoxrDhu51uZyAxNywgUGjDuiBOaHXhuq1uLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1709967145899!5m2!1svi!2s" width="100%" height="320" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <a href="https://maps.app.goo.gl/dxSVPGZPGHPVGHZz8" target="_blank" className="text-primary flex items-center hover:underline">
                      <span>Xem trên Google Maps</span>
                      <div className="w-5 h-5 flex items-center justify-center ml-1">
                        <i className="ri-external-link-line"></i>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Câu Hỏi Thường Gặp</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Những câu hỏi phổ biến về dịch vụ và cách liên hệ với TheStockHunters.</p>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <button onClick={() => handleFaqToggle(index)} className="w-full px-6 py-4 text-left font-semibold flex items-center justify-between focus:outline-none">
                      <span>{faq.q}</span>
                      <i className={faqOpen === index ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"}></i>
                    </button>
                    {faqOpen === index && (
                      <div className="px-6 pb-4">
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
              <h2 className="text-3xl font-bold text-white mb-4">Bắt Đầu Hành Trình Đầu Tư Cùng TheStockHunters</h2>
              <p className="text-xl text-blue-100 mb-8">Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ bạn trên con đường đầu tư thành công.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/dang-ky" className="bg-white text-primary px-6 py-3 rounded-button font-medium hover:bg-gray-100 transition whitespace-nowrap flex items-center justify-center">
                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                    <i className="ri-user-add-line"></i>
                  </div>
                  Đăng Ký Tài Khoản
                </Link>
                <a href="https://www.youtube.com/@Thestockhunters/streams" className="bg-primary border border-white text-white px-6 py-3 rounded-button font-medium hover:bg-primary/90 transition whitespace-nowrap flex items-center justify-center">
                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                    <i className="ri-live-line"></i>
                  </div>
                  Xem Live Stream
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
