import type { Metadata } from "next"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"

export const metadata: Metadata = {
  title: "Hướng Dẫn Xóa Dữ Liệu - TheStockHunters",
  description:
    "Tìm hiểu cách yêu cầu xóa tài khoản và toàn bộ dữ liệu cá nhân khỏi TheStockHunters, bao gồm dữ liệu được thu thập qua Facebook Login.",
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
                Hướng Dẫn Xóa Dữ Liệu
              </h1>
              <p className="text-gray-600 text-lg mb-4">
                Bạn có quyền yêu cầu xóa tài khoản và toàn bộ dữ liệu cá nhân mà TheStockHunters lưu giữ
                bất kỳ lúc nào.
              </p>
              <p className="text-gray-500 text-sm">Cập nhật lần cuối: 21/03/2026</p>
            </div>
          </div>
        </section>

        {/* Nội dung */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-10">

              {/* Tổng quan */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <p className="text-gray-700 leading-relaxed">
                  TheStockHunters tôn trọng quyền riêng tư và quyền sở hữu dữ liệu của bạn. Trang này
                  hướng dẫn cách yêu cầu xóa tài khoản và toàn bộ dữ liệu cá nhân liên quan, bao gồm
                  thông tin được thu thập qua Facebook Login (họ tên, địa chỉ email và ảnh đại diện).
                </p>
              </div>

              {/* Cách yêu cầu xóa */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-mail-send-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Cách Yêu Cầu Xóa Dữ Liệu</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <p className="text-gray-700 mb-8">
                    Thực hiện các bước đơn giản sau để gửi yêu cầu xóa dữ liệu:
                  </p>
                  <div className="space-y-6">
                    {[
                      {
                        step: "1",
                        icon: "ri-mail-open-line",
                        title: "Soạn Email",
                        desc: (
                          <>
                            Mở ứng dụng email và soạn tin nhắn mới gửi đến{" "}
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
                        title: 'Đặt Tiêu Đề: "Delete My Account"',
                        desc: (
                          <>
                            Đặt tiêu đề email chính xác là: <strong>"Delete My Account"</strong>. Điều này
                            giúp yêu cầu của bạn được chuyển đến đúng bộ phận quản lý dữ liệu.
                          </>
                        ),
                      },
                      {
                        step: "3",
                        icon: "ri-user-line",
                        title: "Cung Cấp Thông Tin Tài Khoản",
                        desc: (
                          <>
                            Trong nội dung email, hãy ghi rõ họ tên và địa chỉ email liên kết với tài khoản
                            TheStockHunters của bạn để chúng tôi có thể xác minh và xử lý yêu cầu.
                          </>
                        ),
                      },
                      {
                        step: "4",
                        icon: "ri-send-plane-line",
                        title: "Gửi Yêu Cầu",
                        desc: (
                          <>
                            Gửi email. Bạn sẽ nhận được email xác nhận rằng yêu cầu của bạn đã được tiếp nhận.
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
                      Gửi Yêu Cầu Xóa Dữ Liệu
                    </a>
                  </div>
                </div>
              </div>

              {/* Dữ liệu sẽ bị xóa */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-database-2-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Dữ Liệu Sẽ Được Xóa</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <p className="text-gray-700 mb-6">
                    Sau khi xử lý yêu cầu, chúng tôi sẽ xóa vĩnh viễn toàn bộ dữ liệu cá nhân liên quan
                    đến tài khoản của bạn, bao gồm:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { icon: "ri-user-line", label: "Họ và tên" },
                      { icon: "ri-mail-line", label: "Địa chỉ email" },
                      { icon: "ri-image-line", label: "Ảnh đại diện" },
                      { icon: "ri-login-circle-line", label: "Lịch sử đăng nhập và hồ sơ phiên" },
                      { icon: "ri-settings-line", label: "Tùy chỉnh và cài đặt tài khoản" },
                      { icon: "ri-history-line", label: "Nhật ký hoạt động và dữ liệu sử dụng" },
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
                      <strong>Lưu ý:</strong> Chúng tôi có thể giữ lại một số dữ liệu phi cá nhân, đã ẩn
                      danh hoặc tổng hợp không thể dùng để xác định danh tính bạn, cũng như thông tin bắt
                      buộc phải lưu giữ theo quy định pháp luật.
                    </p>
                  </div>
                </div>
              </div>

              {/* Thời gian xử lý */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-time-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Thời Gian Xử Lý</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <div className="space-y-6">
                    {[
                      {
                        icon: "ri-checkbox-circle-line",
                        title: "Xác Nhận Tiếp Nhận",
                        desc: "Bạn sẽ nhận được email xác nhận trong vòng 2 ngày làm việc, thông báo rằng yêu cầu xóa dữ liệu của bạn đã được tiếp nhận và đang được xử lý.",
                        color: "text-green-600",
                        bg: "bg-green-50",
                      },
                      {
                        icon: "ri-time-line",
                        title: "Xử Lý — Trong Vòng 30 Ngày",
                        desc: "Toàn bộ dữ liệu cá nhân liên quan đến tài khoản của bạn sẽ được xóa vĩnh viễn khỏi hệ thống trong vòng 30 ngày kể từ khi nhận được yêu cầu.",
                        color: "text-primary",
                        bg: "bg-primary/5",
                      },
                      {
                        icon: "ri-mail-check-line",
                        title: "Xác Nhận Hoàn Tất",
                        desc: "Sau khi xóa xong, chúng tôi sẽ gửi email xác nhận cuối cùng đến địa chỉ đã đăng ký, thông báo rằng dữ liệu của bạn đã được xóa vĩnh viễn.",
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

              {/* Đăng nhập qua Facebook */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-facebook-box-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Đã Đăng Nhập Qua Facebook?</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm space-y-4">
                  <p className="text-gray-700">
                    Nếu bạn đã đăng nhập bằng Facebook Login, chúng tôi chỉ lưu giữ dữ liệu bạn đã cấp
                    phép trong quá trình đăng nhập (họ tên, email, ảnh đại diện). Gửi yêu cầu xóa đến
                    chúng tôi sẽ xóa toàn bộ dữ liệu này khỏi nền tảng.
                  </p>
                  <p className="text-gray-700">
                    Để đồng thời thu hồi quyền truy cập của TheStockHunters vào tài khoản Facebook, bạn có
                    thể xóa ứng dụng trực tiếp trong cài đặt Facebook:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                    <li>
                      Vào <strong>Cài đặt &amp; Quyền riêng tư Facebook → Cài đặt → Ứng dụng và trang web</strong>.
                    </li>
                    <li>Tìm <strong>TheStockHunters</strong> trong danh sách ứng dụng đang hoạt động.</li>
                    <li>Nhấn <strong>Xóa</strong> để thu hồi quyền truy cập.</li>
                  </ol>
                  <p className="text-gray-700">
                    Việc thu hồi quyền truy cập trên Facebook sẽ ngăn chia sẻ dữ liệu trong tương lai
                    nhưng không tự động xóa dữ liệu đã lưu trên máy chủ của chúng tôi — vui lòng đồng thời
                    gửi yêu cầu xóa qua email như hướng dẫn ở trên.
                  </p>
                </div>
              </div>

              {/* Liên hệ */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-contacts-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Có Thắc Mắc?</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <p className="text-gray-700 mb-6">
                    Nếu bạn có bất kỳ câu hỏi nào về quy trình xóa dữ liệu hoặc quyền riêng tư của mình,
                    vui lòng liên hệ với chúng tôi:
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
                      Chính Sách Quyền Riêng Tư
                    </a>
                    <a
                      href="/terms-of-service"
                      className="inline-flex items-center justify-center border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/5 transition"
                    >
                      <i className="ri-file-list-2-line mr-2"></i>
                      Điều Khoản Sử Dụng
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
