"use client"
import { useState } from "react"
import Link from "next/link"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"

export default function ChinhSachCookiePage() {
  const [performanceCookie, setPerformanceCookie] = useState(true)
  const [functionalCookie, setFunctionalCookie] = useState(true)
  const [marketingCookie, setMarketingCookie] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)

  const showNotification = (msg: string) => {
    setNotification(msg)
    setTimeout(() => setNotification(null), 3000)
  }

  const savePreferences = () => {
    showNotification("Cài đặt cookie của bạn đã được lưu!")
  }

  const acceptAll = () => {
    setPerformanceCookie(true)
    setFunctionalCookie(true)
    setMarketingCookie(true)
    showNotification("Cài đặt cookie của bạn đã được lưu!")
  }

  const rejectAll = () => {
    setPerformanceCookie(false)
    setFunctionalCookie(false)
    setMarketingCookie(false)
    showNotification("Cài đặt cookie của bạn đã được lưu!")
  }

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.querySelector(id)
    if (el) {
      window.scrollTo({ top: (el as HTMLElement).offsetTop - 100, behavior: "smooth" })
    }
  }

  return (
    <>
      <Navbar />
      <main>
        {notification && (
          <div className="fixed bottom-4 right-4 bg-primary text-white px-6 py-3 rounded-lg shadow-lg z-50">
            {notification}
          </div>
        )}

        {/* Breadcrumb */}
        <div className="bg-gray-100 py-3 border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-gray-600">
              <Link href="/" className="hover:text-primary transition">Trang Chủ</Link>
              <div className="w-4 h-4 flex items-center justify-center mx-1 text-gray-400">
                <i className="ri-arrow-right-s-line"></i>
              </div>
              <span className="text-gray-800 font-medium">Chính Sách Cookie</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Chính Sách Cookie</h1>
              <p className="text-blue-100 text-lg">Hiểu rõ cách TheStockHunters sử dụng cookie để cải thiện trải nghiệm của bạn và bảo vệ quyền riêng tư của bạn.</p>
              <div className="mt-8">
                <Link href="/lien-he" className="bg-white text-primary px-6 py-3 rounded-button font-medium hover:bg-gray-100 transition whitespace-nowrap inline-flex items-center">
                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                    <i className="ri-arrow-left-line"></i>
                  </div>
                  Quay Lại Trang Trước
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
              <div className="mb-8">
                <p className="text-gray-600 mb-4">Cập nhật lần cuối: 09/06/2025</p>
                <div className="flex items-center space-x-4 mb-6">
                  <a href="#gioi-thieu" onClick={(e) => handleSmoothScroll(e, "#gioi-thieu")} className="text-primary hover:underline font-medium">Giới thiệu</a>
                  <a href="#loai-cookie" onClick={(e) => handleSmoothScroll(e, "#loai-cookie")} className="text-primary hover:underline font-medium">Loại Cookie</a>
                  <a href="#muc-dich" onClick={(e) => handleSmoothScroll(e, "#muc-dich")} className="text-primary hover:underline font-medium">Mục đích sử dụng</a>
                  <a href="#quan-ly" onClick={(e) => handleSmoothScroll(e, "#quan-ly")} className="text-primary hover:underline font-medium">Quản lý Cookie</a>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2 bg-blue-50 mb-8">
                  <p className="text-gray-700">Chính sách Cookie này giải thích cách TheStockHunters sử dụng cookie và các công nghệ tương tự khi bạn truy cập trang web của chúng tôi. Vui lòng đọc kỹ để hiểu rõ cách chúng tôi thu thập và xử lý dữ liệu của bạn.</p>
                </div>
              </div>

              {/* Introduction */}
              <div id="gioi-thieu" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Giới Thiệu Về Cookie</h2>
                <p className="text-gray-700 mb-4">Cookie là những tệp văn bản nhỏ được lưu trữ trên thiết bị của bạn (máy tính, điện thoại, máy tính bảng) khi bạn truy cập trang web. Cookie giúp trang web ghi nhớ thông tin về lượt truy cập của bạn, chẳng hạn như ngôn ngữ ưa thích và các cài đặt khác. Điều này giúp trải nghiệm của bạn trở nên hiệu quả và cá nhân hóa hơn.</p>
                <p className="text-gray-700 mb-4">TheStockHunters sử dụng cookie và các công nghệ tương tự như pixel, thẻ và đèn hiệu web để cung cấp, bảo vệ và cải thiện dịch vụ của chúng tôi. Khi bạn truy cập trang web của chúng tôi, chúng tôi có thể tự động thu thập thông tin nhất định thông qua việc sử dụng cookie.</p>
              </div>

              {/* Types of Cookies */}
              <div id="loai-cookie" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Các Loại Cookie Chúng Tôi Sử Dụng</h2>
                <p className="text-gray-700 mb-6">TheStockHunters sử dụng các loại cookie sau đây:</p>
                <div className="space-y-6">
                  {[
                    { title: "1. Cookie Cần Thiết", desc: "Cookie cần thiết giúp trang web của chúng tôi có thể sử dụng được bằng cách kích hoạt các chức năng cơ bản như điều hướng trang và truy cập vào các khu vực bảo mật của trang web. Trang web không thể hoạt động đúng cách nếu không có loại cookie này.", example: "Ví dụ: Cookie phiên đăng nhập, cookie giỏ hàng, cookie bảo mật." },
                    { title: "2. Cookie Hiệu Suất", desc: "Cookie hiệu suất thu thập thông tin về cách bạn sử dụng trang web của chúng tôi, chẳng hạn như những trang bạn truy cập thường xuyên nhất và liệu bạn có nhận được thông báo lỗi từ các trang web hay không. Những cookie này không thu thập thông tin nhận dạng bạn.", example: "Ví dụ: Google Analytics, Adobe Analytics." },
                    { title: "3. Cookie Chức Năng", desc: "Cookie chức năng cho phép trang web cung cấp chức năng và cá nhân hóa nâng cao. Chúng có thể được đặt bởi chúng tôi hoặc các nhà cung cấp bên thứ ba có dịch vụ chúng tôi đã thêm vào trang.", example: "Ví dụ: Cookie lưu trữ tùy chọn ngôn ngữ, cài đặt giao diện." },
                    { title: "4. Cookie Tiếp Thị", desc: "Cookie tiếp thị được sử dụng để theo dõi người dùng trên các trang web. Mục đích là hiển thị quảng cáo phù hợp và hấp dẫn đối với từng người dùng, do đó có giá trị hơn đối với các nhà xuất bản và nhà quảng cáo bên thứ ba.", example: "Ví dụ: Cookie từ Facebook, Google Ads, các mạng quảng cáo khác." },
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-700 mb-2">{item.desc}</p>
                      <p className="text-gray-600 text-sm italic">{item.example}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Purpose Section */}
              <div id="muc-dich" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Mục Đích Sử Dụng Cookie</h2>
                <p className="text-gray-700 mb-6">Chúng tôi sử dụng cookie cho các mục đích sau:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { icon: "ri-shield-check-line", title: "Bảo Mật và Xác Thực", desc: "Bảo vệ tài khoản người dùng, ngăn chặn gian lận và đảm bảo an toàn cho trang web của chúng tôi." },
                    { icon: "ri-user-settings-line", title: "Cá Nhân Hóa", desc: "Ghi nhớ tùy chọn của bạn và cung cấp nội dung được cá nhân hóa phù hợp với sở thích của bạn." },
                    { icon: "ri-line-chart-line", title: "Phân Tích và Hiệu Suất", desc: "Thu thập thông tin về cách người dùng tương tác với trang web để cải thiện hiệu suất và trải nghiệm người dùng." },
                    { icon: "ri-advertisement-line", title: "Quảng Cáo Mục Tiêu", desc: "Cung cấp quảng cáo phù hợp với sở thích của bạn và đo lường hiệu quả của các chiến dịch tiếp thị." },
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-lg">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                        <i className={`${item.icon} text-xl`}></i>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-700">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <p className="text-gray-700">Chúng tôi cũng có thể chia sẻ thông tin về việc sử dụng trang web của bạn với các đối tác phân tích, quảng cáo và mạng xã hội, những đối tác này có thể kết hợp thông tin đó với thông tin khác mà bạn đã cung cấp cho họ hoặc thông tin mà họ đã thu thập từ việc bạn sử dụng dịch vụ của họ.</p>
                </div>
              </div>

              {/* Cookie Management */}
              <div id="quan-ly" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Quản Lý Cài Đặt Cookie</h2>
                <p className="text-gray-700 mb-6">Bạn có thể kiểm soát và quản lý cookie theo nhiều cách khác nhau. Xin lưu ý rằng việc xóa hoặc chặn cookie có thể ảnh hưởng đến trải nghiệm người dùng của bạn và một số phần của trang web có thể không còn hoạt động đầy đủ.</p>

                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h3 className="font-semibold text-gray-900 mb-4">Tùy Chỉnh Cài Đặt Cookie</h3>
                  <p className="text-gray-700 mb-6">Bạn có thể tùy chỉnh cài đặt cookie của mình bất kỳ lúc nào bằng cách điều chỉnh các tùy chọn dưới đây:</p>

                  <div className="space-y-4">
                    {/* Necessary cookies (always on) */}
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Cookie Cần Thiết</h4>
                        <p className="text-sm text-gray-600">Luôn hoạt động và không thể tắt</p>
                      </div>
                      <label className="relative inline-block w-11 h-6">
                        <input type="checkbox" checked disabled className="opacity-0 w-0 h-0" />
                        <span className="absolute cursor-not-allowed top-0 left-0 right-0 bottom-0 bg-primary rounded-full transition-all before:absolute before:content-[''] before:h-[18px] before:w-[18px] before:left-3 before:bottom-[3px] before:bg-white before:rounded-full before:transition-all"></span>
                      </label>
                    </div>

                    {/* Performance cookies */}
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Cookie Hiệu Suất</h4>
                        <p className="text-sm text-gray-600">Giúp chúng tôi cải thiện trang web</p>
                      </div>
                      <label className="relative inline-block w-11 h-6 cursor-pointer">
                        <input type="checkbox" checked={performanceCookie} onChange={(e) => setPerformanceCookie(e.target.checked)} className="opacity-0 w-0 h-0" />
                        <span className={`absolute top-0 left-0 right-0 bottom-0 rounded-full transition-all before:absolute before:content-[''] before:h-[18px] before:w-[18px] before:bottom-[3px] before:bg-white before:rounded-full before:transition-all ${performanceCookie ? "bg-primary before:left-[23px]" : "bg-gray-200 before:left-[3px]"}`}></span>
                      </label>
                    </div>

                    {/* Functional cookies */}
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Cookie Chức Năng</h4>
                        <p className="text-sm text-gray-600">Cung cấp trải nghiệm cá nhân hóa</p>
                      </div>
                      <label className="relative inline-block w-11 h-6 cursor-pointer">
                        <input type="checkbox" checked={functionalCookie} onChange={(e) => setFunctionalCookie(e.target.checked)} className="opacity-0 w-0 h-0" />
                        <span className={`absolute top-0 left-0 right-0 bottom-0 rounded-full transition-all before:absolute before:content-[''] before:h-[18px] before:w-[18px] before:bottom-[3px] before:bg-white before:rounded-full before:transition-all ${functionalCookie ? "bg-primary before:left-[23px]" : "bg-gray-200 before:left-[3px]"}`}></span>
                      </label>
                    </div>

                    {/* Marketing cookies */}
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Cookie Tiếp Thị</h4>
                        <p className="text-sm text-gray-600">Hiển thị quảng cáo phù hợp với sở thích</p>
                      </div>
                      <label className="relative inline-block w-11 h-6 cursor-pointer">
                        <input type="checkbox" checked={marketingCookie} onChange={(e) => setMarketingCookie(e.target.checked)} className="opacity-0 w-0 h-0" />
                        <span className={`absolute top-0 left-0 right-0 bottom-0 rounded-full transition-all before:absolute before:content-[''] before:h-[18px] before:w-[18px] before:bottom-[3px] before:bg-white before:rounded-full before:transition-all ${marketingCookie ? "bg-primary before:left-[23px]" : "bg-gray-200 before:left-[3px]"}`}></span>
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-6">
                    <button onClick={savePreferences} className="bg-primary text-white px-6 py-3 rounded-button font-medium hover:bg-primary/90 transition whitespace-nowrap">Lưu Tùy Chọn</button>
                    <button onClick={acceptAll} className="bg-gray-800 text-white px-6 py-3 rounded-button font-medium hover:bg-gray-700 transition whitespace-nowrap">Chấp Nhận Tất Cả</button>
                    <button onClick={rejectAll} className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-button font-medium hover:bg-gray-50 transition whitespace-nowrap">Từ Chối Tất Cả (Trừ Cần Thiết)</button>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 mb-3">Quản Lý Cookie Qua Trình Duyệt</h3>
                <p className="text-gray-700 mb-4">Hầu hết các trình duyệt web cho phép bạn kiểm soát cookie thông qua cài đặt của trình duyệt. Để tìm hiểu thêm về cách quản lý cookie, vui lòng truy cập trang trợ giúp của trình duyệt của bạn:</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { href: "https://support.google.com/chrome/answer/95647", icon: "ri-chrome-fill", label: "Google Chrome" },
                    { href: "https://support.mozilla.org/vi/kb/enable-and-disable-cookies-website-preferences", icon: "ri-firefox-fill", label: "Mozilla Firefox" },
                    { href: "https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac", icon: "ri-safari-fill", label: "Safari" },
                    { href: "https://support.microsoft.com/vi-vn/microsoft-edge/xóa-cookie-trong-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09", icon: "ri-edge-fill", label: "Microsoft Edge" },
                  ].map((browser, i) => (
                    <a key={i} href={browser.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-sm transition">
                      <div className="w-12 h-12 flex items-center justify-center mb-2">
                        <i className={`${browser.icon} text-2xl text-gray-700`}></i>
                      </div>
                      <span className="text-gray-900 font-medium">{browser.label}</span>
                    </a>
                  ))}
                </div>

                <p className="text-gray-700">Xin lưu ý rằng nếu bạn chọn chặn cookie, bạn có thể không truy cập được một số tính năng của trang web của chúng tôi và một số dịch vụ có thể không hoạt động đúng cách.</p>
              </div>

              {/* Additional Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Thời Gian Lưu Trữ Cookie</h2>
                  <p className="text-gray-700 mb-4">Thời gian lưu trữ cookie trên thiết bị của bạn sẽ khác nhau tùy thuộc vào loại cookie:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li><span className="font-medium">Cookie phiên (Session cookies):</span> Các cookie này chỉ tồn tại trong phiên duyệt web của bạn và sẽ bị xóa khi bạn đóng trình duyệt.</li>
                    <li><span className="font-medium">Cookie liên tục (Persistent cookies):</span> Các cookie này vẫn còn trên thiết bị của bạn trong một khoảng thời gian xác định (thường là vài ngày đến vài tháng) hoặc cho đến khi bạn xóa chúng thủ công.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Chia Sẻ Thông Tin Cookie</h2>
                  <p className="text-gray-700 mb-4">Chúng tôi có thể chia sẻ thông tin thu thập được thông qua cookie với:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Các đối tác phân tích để hiểu cách người dùng tương tác với trang web của chúng tôi.</li>
                    <li>Các đối tác quảng cáo để cung cấp quảng cáo phù hợp với sở thích của bạn.</li>
                    <li>Các nhà cung cấp dịch vụ bên thứ ba giúp chúng tôi vận hành trang web và cung cấp dịch vụ.</li>
                  </ul>
                  <p className="text-gray-700 mt-4">Chúng tôi sẽ không bán, cho thuê hoặc trao đổi thông tin cá nhân của bạn với bất kỳ bên thứ ba nào mà không có sự đồng ý của bạn, trừ khi được yêu cầu bởi pháp luật.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Cập Nhật Chính Sách Cookie</h2>
                  <p className="text-gray-700 mb-4">Chúng tôi có thể cập nhật Chính sách Cookie này theo thời gian để phản ánh những thay đổi về cookie mà chúng tôi sử dụng hoặc vì các lý do hoạt động, pháp lý hoặc quy định khác. Vui lòng truy cập lại Chính sách Cookie này thường xuyên để cập nhật thông tin về việc chúng tôi sử dụng cookie.</p>
                  <p className="text-gray-700">Khi chúng tôi thực hiện những thay đổi đáng kể đối với Chính sách Cookie này, chúng tôi sẽ thông báo cho bạn bằng cách đăng thông báo nổi bật trên trang web của chúng tôi hoặc gửi email thông báo cho bạn.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Liên Hệ Với Chúng Tôi</h2>
                  <p className="text-gray-700 mb-4">Nếu bạn có bất kỳ câu hỏi nào về cách chúng tôi sử dụng cookie hoặc về Chính sách Cookie này, vui lòng liên hệ với chúng tôi tại:</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 mb-2"><span className="font-medium">Email:</span> privacy@thestockhunters.vn</p>
                    <p className="text-gray-700 mb-2"><span className="font-medium">Điện thoại:</span> +84 0901919100</p>
                    <p className="text-gray-700"><span className="font-medium">Địa chỉ:</span> Tầng trệt – Tòa nhà The Prince Residence, số 17-19-21 Nguyễn Văn Trỗi, Quận Phú Nhuận, TP. Hồ Chí Minh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Policies */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Các Chính Sách Liên Quan</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/dieu-khoan-su-dung" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition flex flex-col">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                    <i className="ri-file-list-3-line text-xl"></i>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Điều Khoản Sử Dụng</h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">Các quy định và điều khoản khi sử dụng dịch vụ của TheStockHunters.</p>
                  <div className="text-primary font-medium flex items-center text-sm">
                    <span>Xem chi tiết</span>
                    <div className="w-5 h-5 flex items-center justify-center ml-1">
                      <i className="ri-arrow-right-line"></i>
                    </div>
                  </div>
                </Link>
                <Link href="/chinh-sach-bao-mat" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition flex flex-col">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                    <i className="ri-shield-keyhole-line text-xl"></i>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Chính Sách Bảo Mật</h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">Cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.</p>
                  <div className="text-primary font-medium flex items-center text-sm">
                    <span>Xem chi tiết</span>
                    <div className="w-5 h-5 flex items-center justify-center ml-1">
                      <i className="ri-arrow-right-line"></i>
                    </div>
                  </div>
                </Link>
                <Link href="/mien-tru-trach-nhiem" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition flex flex-col">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                    <i className="ri-information-line text-xl"></i>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Miễn Trừ Trách Nhiệm</h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">Giới hạn trách nhiệm của chúng tôi đối với thông tin và dịch vụ được cung cấp.</p>
                  <div className="text-primary font-medium flex items-center text-sm">
                    <span>Xem chi tiết</span>
                    <div className="w-5 h-5 flex items-center justify-center ml-1">
                      <i className="ri-arrow-right-line"></i>
                    </div>
                  </div>
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
