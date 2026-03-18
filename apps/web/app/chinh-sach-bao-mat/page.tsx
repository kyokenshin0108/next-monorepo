"use client"
import { useState } from "react"
import Link from "next/link"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"

export default function ChinhSachBaoMatPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return
    setSubmitStatus("loading")
    setTimeout(() => {
      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setSubmitStatus("idle"), 3000)
    }, 1500)
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Chính sách bảo mật</h1>
              <p className="text-gray-600 text-lg mb-8">Cam kết bảo vệ thông tin cá nhân và quyền riêng tư của khách hàng là ưu tiên hàng đầu của chúng tôi</p>
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <i className="ri-shield-check-line text-3xl"></i>
                </div>
              </div>
              <p className="text-gray-500 mt-6">Cập nhật lần cuối: 01/06/2025</p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Introduction */}
              <div className="mb-12 bg-white p-8 rounded-lg shadow-sm">
                <p className="text-gray-700 leading-relaxed">
                  TheStockHunters ("chúng tôi", "của chúng tôi") cam kết bảo vệ quyền riêng tư của bạn. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, tiết lộ, lưu trữ và bảo vệ thông tin cá nhân của bạn khi bạn sử dụng trang web và dịch vụ của chúng tôi. Bằng việc sử dụng dịch vụ của chúng tôi, bạn đồng ý với việc thu thập và sử dụng thông tin theo chính sách này.
                </p>
              </div>

              {/* Information Collection */}
              <div className="mb-12 pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-information-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Thông tin thu thập</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <p className="text-gray-700 mb-6">Chúng tôi thu thập các loại thông tin sau đây:</p>
                  <div className="space-y-4">
                    {[
                      { icon: "ri-user-line", title: "Thông tin cá nhân", desc: "Họ tên, địa chỉ email, số điện thoại, địa chỉ và các thông tin liên hệ khác mà bạn cung cấp khi đăng ký tài khoản." },
                      { icon: "ri-bank-card-line", title: "Thông tin tài chính", desc: "Thông tin thanh toán như số thẻ tín dụng (được mã hóa), thông tin tài khoản ngân hàng khi bạn mua dịch vụ của chúng tôi." },
                      { icon: "ri-profile-line", title: "Thông tin hồ sơ", desc: "Thông tin về kinh nghiệm đầu tư, mục tiêu tài chính, khẩu vị rủi ro và các thông tin khác mà bạn cung cấp trong hồ sơ của mình." },
                      { icon: "ri-device-line", title: "Thông tin thiết bị", desc: "Địa chỉ IP, loại thiết bị, phiên bản trình duyệt, múi giờ, vị trí địa lý và thông tin về cách bạn tương tác với trang web của chúng tôi." },
                      { icon: "ri-file-list-3-line", title: "Dữ liệu sử dụng", desc: "Thông tin về cách bạn sử dụng dịch vụ của chúng tôi, bao gồm các trang bạn truy cập, thời gian truy cập, các tính năng bạn sử dụng và các hoạt động khác trên nền tảng." },
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
                </div>
              </div>

              {/* Purpose of Use */}
              <div className="mb-12 pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-file-list-3-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Mục đích sử dụng</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <p className="text-gray-700 mb-6">Chúng tôi sử dụng thông tin của bạn cho các mục đích sau:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { icon: "ri-service-line", title: "Cung cấp dịch vụ", desc: "Để cung cấp, duy trì và cải thiện dịch vụ của chúng tôi, bao gồm xác thực tài khoản, xử lý thanh toán và cung cấp hỗ trợ khách hàng." },
                      { icon: "ri-customer-service-2-line", title: "Cá nhân hóa trải nghiệm", desc: "Để cung cấp nội dung và đề xuất phù hợp với sở thích và nhu cầu của bạn, cải thiện trải nghiệm người dùng trên nền tảng của chúng tôi." },
                      { icon: "ri-mail-line", title: "Liên lạc", desc: "Để liên hệ với bạn về tài khoản, cập nhật dịch vụ, thông báo bảo mật và các thông tin quan trọng khác liên quan đến việc sử dụng dịch vụ của chúng tôi." },
                      { icon: "ri-bar-chart-line", title: "Phân tích và cải tiến", desc: "Để phân tích cách người dùng sử dụng dịch vụ, xác định xu hướng và cải thiện tính năng, hiệu suất và chất lượng dịch vụ của chúng tôi." },
                      { icon: "ri-advertisement-line", title: "Tiếp thị", desc: "Để gửi thông tin về sản phẩm, dịch vụ, khuyến mãi và sự kiện mới (chỉ khi bạn đã đồng ý nhận các thông tin tiếp thị từ chúng tôi)." },
                      { icon: "ri-shield-check-line", title: "Bảo mật và tuân thủ", desc: "Để bảo vệ an toàn và bảo mật cho dịch vụ của chúng tôi, ngăn chặn gian lận, và tuân thủ các nghĩa vụ pháp lý của chúng tôi." },
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

              {/* Storage Duration */}
              <div className="mb-12 pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-time-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Thời gian lưu trữ</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <p className="text-gray-700 mb-6">Chúng tôi lưu trữ thông tin cá nhân của bạn trong thời gian cần thiết để thực hiện các mục đích được nêu trong Chính sách này, trừ khi pháp luật yêu cầu hoặc cho phép thời gian lưu trữ lâu hơn.</p>
                  <div className="space-y-6">
                    {[
                      { icon: "ri-user-settings-line", title: "Thông tin tài khoản", desc: "Chúng tôi lưu trữ thông tin tài khoản của bạn trong thời gian bạn duy trì tài khoản với chúng tôi. Sau khi bạn đóng tài khoản, chúng tôi sẽ tiếp tục lưu trữ một số thông tin trong thời gian tối đa 5 năm để tuân thủ các nghĩa vụ pháp lý, giải quyết tranh chấp và thực thi các thỏa thuận của chúng tôi." },
                      { icon: "ri-bank-card-line", title: "Thông tin thanh toán", desc: "Thông tin thanh toán được lưu trữ trong thời gian cần thiết để xử lý giao dịch và tuân thủ các quy định về kế toán và thuế, thường là 7-10 năm theo quy định của pháp luật." },
                      { icon: "ri-file-list-3-line", title: "Dữ liệu sử dụng", desc: "Dữ liệu về cách bạn sử dụng dịch vụ của chúng tôi thường được lưu trữ trong thời gian tối đa 2 năm để phục vụ mục đích phân tích và cải thiện dịch vụ." },
                      { icon: "ri-delete-bin-line", title: "Xóa dữ liệu", desc: "Bạn có thể yêu cầu xóa dữ liệu cá nhân của mình bất cứ lúc nào bằng cách liên hệ với chúng tôi. Chúng tôi sẽ xóa dữ liệu của bạn trong thời gian hợp lý, trừ khi chúng tôi có nghĩa vụ pháp lý phải lưu giữ một số thông tin nhất định." },
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

              {/* User Rights */}
              <div className="mb-12 pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-user-settings-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Quyền của người dùng</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <p className="text-gray-700 mb-6">Tùy thuộc vào luật pháp hiện hành, bạn có thể có các quyền sau đối với dữ liệu cá nhân của mình:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { icon: "ri-eye-line", title: "Quyền truy cập", desc: "Bạn có quyền yêu cầu bản sao dữ liệu cá nhân mà chúng tôi lưu giữ về bạn." },
                      { icon: "ri-edit-2-line", title: "Quyền chỉnh sửa", desc: "Bạn có quyền yêu cầu chúng tôi sửa đổi hoặc cập nhật dữ liệu cá nhân không chính xác hoặc không đầy đủ." },
                      { icon: "ri-delete-bin-line", title: "Quyền xóa", desc: "Bạn có quyền yêu cầu chúng tôi xóa dữ liệu cá nhân của bạn trong một số trường hợp nhất định." },
                      { icon: "ri-forbid-line", title: "Quyền hạn chế xử lý", desc: "Bạn có quyền yêu cầu chúng tôi hạn chế việc xử lý dữ liệu cá nhân của bạn trong một số trường hợp nhất định." },
                      { icon: "ri-download-2-line", title: "Quyền di chuyển dữ liệu", desc: "Bạn có quyền nhận dữ liệu cá nhân của mình ở định dạng có cấu trúc, thông dụng và có thể đọc được bằng máy." },
                      { icon: "ri-close-circle-line", title: "Quyền phản đối", desc: "Bạn có quyền phản đối việc xử lý dữ liệu cá nhân của mình trong một số trường hợp nhất định." },
                      { icon: "ri-settings-5-line", title: "Quyền rút lại sự đồng ý", desc: "Bạn có quyền rút lại sự đồng ý của mình bất cứ lúc nào đối với việc xử lý dữ liệu cá nhân dựa trên sự đồng ý." },
                      { icon: "ri-government-line", title: "Quyền khiếu nại", desc: "Bạn có quyền khiếu nại với cơ quan bảo vệ dữ liệu có thẩm quyền về việc chúng tôi thu thập và sử dụng dữ liệu cá nhân của bạn." },
                    ].map((item, i) => (
                      <div key={i} className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 flex items-center justify-center text-primary mr-3">
                            <i className={item.icon}></i>
                          </div>
                          <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        </div>
                        <p className="text-gray-700">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-6 bg-primary/5 rounded-lg">
                    <p className="text-gray-700">Để thực hiện bất kỳ quyền nào trong số này, vui lòng liên hệ với chúng tôi theo thông tin liên hệ được cung cấp ở cuối chính sách này. Chúng tôi sẽ xử lý yêu cầu của bạn trong thời gian hợp lý và phù hợp với luật pháp hiện hành.</p>
                  </div>
                </div>
              </div>

              {/* Security Measures */}
              <div className="mb-12 pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-lock-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Biện pháp bảo mật</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <p className="text-gray-700 mb-6">Chúng tôi cam kết bảo vệ dữ liệu cá nhân của bạn và đã triển khai các biện pháp bảo mật phù hợp để bảo vệ thông tin của bạn:</p>
                  <div className="space-y-6">
                    {[
                      { icon: "ri-lock-password-line", title: "Mã hóa dữ liệu", desc: "Chúng tôi sử dụng công nghệ mã hóa tiêu chuẩn ngành để bảo vệ dữ liệu nhạy cảm, bao gồm mã hóa SSL/TLS cho dữ liệu đang truyền và mã hóa AES-256 cho dữ liệu lưu trữ." },
                      { icon: "ri-shield-check-line", title: "Kiểm soát truy cập", desc: "Chúng tôi thực hiện các biện pháp kiểm soát truy cập nghiêm ngặt để đảm bảo rằng chỉ nhân viên được ủy quyền mới có thể truy cập vào dữ liệu cá nhân và chỉ cho các mục đích kinh doanh hợp pháp." },
                      { icon: "ri-scan-line", title: "Giám sát và kiểm tra bảo mật", desc: "Chúng tôi thường xuyên thực hiện kiểm tra bảo mật, đánh giá lỗ hổng và kiểm tra xâm nhập để xác định và khắc phục các rủi ro bảo mật tiềm ẩn." },
                      { icon: "ri-user-follow-line", title: "Xác thực đa yếu tố", desc: "Chúng tôi cung cấp và khuyến khích sử dụng xác thực đa yếu tố để tăng cường bảo mật cho tài khoản của bạn." },
                      { icon: "ri-database-2-line", title: "Sao lưu dữ liệu", desc: "Chúng tôi thực hiện sao lưu dữ liệu thường xuyên và có kế hoạch khôi phục sau thảm họa để đảm bảo dữ liệu của bạn được bảo vệ khỏi mất mát hoặc hư hỏng." },
                      { icon: "ri-team-line", title: "Đào tạo nhân viên", desc: "Nhân viên của chúng tôi được đào tạo về các thực hành bảo mật dữ liệu và phải tuân thủ các chính sách bảo mật nghiêm ngặt." },
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
                  <div className="mt-6 p-6 bg-primary/5 rounded-lg">
                    <p className="text-gray-700">Mặc dù chúng tôi nỗ lực bảo vệ thông tin cá nhân của bạn, không có phương thức truyền tải qua internet hoặc lưu trữ điện tử nào là an toàn 100%. Do đó, chúng tôi không thể đảm bảo an ninh tuyệt đối. Chúng tôi cam kết thông báo cho bạn và cơ quan quản lý có liên quan về bất kỳ vi phạm dữ liệu nào có thể xảy ra theo yêu cầu của pháp luật.</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-contacts-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Thông tin liên hệ</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <p className="text-gray-700 mb-6">Nếu bạn có bất kỳ câu hỏi, thắc mắc hoặc yêu cầu liên quan đến Chính sách bảo mật này hoặc cách chúng tôi xử lý dữ liệu cá nhân của bạn, vui lòng liên hệ với chúng tôi:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Thông tin liên hệ</h3>
                      <div className="space-y-4">
                        {[
                          { icon: "ri-building-line", text: "Công ty Cổ phần TheStockHunters" },
                          { icon: "ri-map-pin-line", text: "Tầng 15, Tòa nhà Vietcombank Tower, 198 Trần Quang Khải, Phường Lý Thái Tổ, Quận Hoàn Kiếm, Hà Nội" },
                          { icon: "ri-mail-line", text: "privacy@thestockhunters.vn" },
                          { icon: "ri-phone-line", text: "1900 6868" },
                        ].map((item, i) => (
                          <div key={i} className="flex">
                            <div className="w-8 h-8 flex items-center justify-center text-primary mr-3">
                              <i className={item.icon}></i>
                            </div>
                            <div>
                              <p className="text-gray-700">{item.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Gửi yêu cầu</h3>
                      <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Họ và tên</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
                          </div>
                          <div>
                            <label htmlFor="subject" className="block text-gray-700 font-medium mb-1">Chủ đề</label>
                            <select id="subject" name="subject" value={formData.subject} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition pr-8">
                              <option value="">Chọn chủ đề</option>
                              <option value="access">Yêu cầu truy cập dữ liệu</option>
                              <option value="delete">Yêu cầu xóa dữ liệu</option>
                              <option value="update">Yêu cầu cập nhật dữ liệu</option>
                              <option value="question">Câu hỏi về chính sách bảo mật</option>
                              <option value="other">Khác</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Nội dung</label>
                            <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition"></textarea>
                          </div>
                          <button type="submit" disabled={submitStatus === "loading"} className="bg-primary text-white px-6 py-3 rounded-button font-medium hover:bg-primary/90 transition whitespace-nowrap disabled:opacity-70">
                            {submitStatus === "loading" ? "Đang gửi..." : submitStatus === "success" ? "Đã gửi thành công!" : "Gửi yêu cầu"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="p-6 bg-primary/5 rounded-lg">
                    <div className="flex">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4 flex-shrink-0">
                        <i className="ri-time-line text-xl"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Thời gian phản hồi</h3>
                        <p className="text-gray-700">Chúng tôi sẽ phản hồi các yêu cầu liên quan đến quyền riêng tư của bạn trong vòng 30 ngày kể từ ngày nhận được yêu cầu. Trong một số trường hợp phức tạp, chúng tôi có thể cần thêm thời gian, nhưng sẽ thông báo cho bạn về việc gia hạn này.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Updates */}
              <div className="bg-white p-8 rounded-lg shadow-sm mb-12">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-refresh-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Cập nhật chính sách bảo mật</h2>
                </div>
                <p className="text-gray-700 mb-4">Chúng tôi có thể cập nhật Chính sách bảo mật này theo thời gian để phản ánh những thay đổi trong hoạt động kinh doanh của chúng tôi hoặc để tuân thủ các yêu cầu pháp lý mới. Khi chúng tôi thực hiện các thay đổi quan trọng đối với Chính sách này, chúng tôi sẽ thông báo cho bạn bằng cách:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Đăng thông báo nổi bật trên trang web của chúng tôi</li>
                  <li>Gửi email thông báo đến địa chỉ email đã đăng ký của bạn</li>
                  <li>Cập nhật ngày "Cập nhật lần cuối" ở đầu Chính sách này</li>
                </ul>
                <p className="text-gray-700">Chúng tôi khuyến khích bạn xem xét Chính sách này định kỳ để biết thông tin mới nhất về cách chúng tôi bảo vệ dữ liệu cá nhân của bạn. Việc bạn tiếp tục sử dụng dịch vụ của chúng tôi sau khi thay đổi có hiệu lực đồng nghĩa với việc bạn chấp nhận những thay đổi đó.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Bạn có câu hỏi về bảo mật dữ liệu?</h2>
              <p className="text-xl text-blue-100 mb-8">Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn về cách chúng tôi bảo vệ thông tin cá nhân.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="tel:0901919100" className="bg-white text-primary px-8 py-4 rounded-button font-medium hover:bg-gray-100 transition whitespace-nowrap inline-flex items-center justify-center">
                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                    <i className="ri-customer-service-2-line"></i>
                  </div>
                  Liên hệ hỗ trợ
                </a>
                <Link href="/dang-ky" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-button font-medium hover:bg-white/10 transition whitespace-nowrap inline-flex items-center justify-center">
                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                    <i className="ri-arrow-left-line"></i>
                  </div>
                  Quay lại đăng ký
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
