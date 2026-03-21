import type { Metadata } from "next"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"

export const metadata: Metadata = {
  title: "Chính Sách Quyền Riêng Tư - TheStockHunters",
  description:
    "Tìm hiểu cách TheStockHunters thu thập, sử dụng và bảo vệ dữ liệu cá nhân của bạn, bao gồm thông tin được thu thập qua Facebook Login.",
  robots: { index: true, follow: true },
}

export default function PrivacyPolicyPage() {
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
                  <i className="ri-shield-check-line text-3xl"></i>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Chính Sách Quyền Riêng Tư</h1>
              <p className="text-gray-600 text-lg mb-4">
                TheStockHunters cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn.
              </p>
              <p className="text-gray-500 text-sm">Cập nhật lần cuối: 21/03/2026</p>
            </div>
          </div>
        </section>

        {/* Nội dung */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-10">

              {/* Giới thiệu */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <p className="text-gray-700 leading-relaxed">
                  Chính Sách Quyền Riêng Tư này mô tả cách TheStockHunters ("chúng tôi") thu thập, sử dụng và
                  bảo vệ thông tin cá nhân của bạn khi sử dụng nền tảng, bao gồm khi bạn đăng nhập qua
                  Facebook Login. Bằng việc sử dụng dịch vụ của chúng tôi, bạn đồng ý với các thực hành
                  được mô tả trong chính sách này.
                </p>
              </div>

              {/* Dữ liệu chúng tôi thu thập */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-information-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Dữ Liệu Chúng Tôi Thu Thập</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <p className="text-gray-700 mb-6">
                    Khi bạn đăng nhập bằng Facebook Login, chúng tôi chỉ yêu cầu và nhận các thông tin sau
                    từ hồ sơ Facebook của bạn:
                  </p>
                  <div className="space-y-4">
                    {[
                      {
                        icon: "ri-user-line",
                        title: "Họ và Tên",
                        desc: "Tên của bạn như hiển thị trên hồ sơ Facebook, được sử dụng để cá nhân hóa trải nghiệm của bạn trên nền tảng.",
                      },
                      {
                        icon: "ri-mail-line",
                        title: "Địa Chỉ Email",
                        desc: "Địa chỉ email liên kết với Facebook, được dùng để xác định tài khoản, đăng nhập và liên lạc.",
                      },
                      {
                        icon: "ri-image-line",
                        title: "Ảnh Đại Diện",
                        desc: "Ảnh đại diện Facebook của bạn, được hiển thị làm avatar trong nền tảng.",
                      },
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
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                    <p className="text-gray-700 text-sm">
                      Chúng tôi không yêu cầu quyền truy cập vào danh sách bạn bè, bài đăng, tin nhắn hoặc
                      bất kỳ dữ liệu nào khác ngoài các quyền được liệt kê ở trên.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mục đích sử dụng */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-file-list-3-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Mục Đích Sử Dụng Dữ Liệu</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <p className="text-gray-700 mb-6">
                    Chúng tôi sử dụng thông tin thu thập được chỉ cho các mục đích sau:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        icon: "ri-login-box-line",
                        title: "Xác Thực Tài Khoản",
                        desc: "Xác minh danh tính của bạn và cho phép truy cập an toàn vào tài khoản trên nền tảng.",
                      },
                      {
                        icon: "ri-customer-service-2-line",
                        title: "Cá Nhân Hóa",
                        desc: "Hiển thị tên và ảnh đại diện của bạn trong nền tảng để mang lại trải nghiệm cá nhân hóa.",
                      },
                      {
                        icon: "ri-mail-send-line",
                        title: "Liên Lạc",
                        desc: "Gửi các thông báo quan trọng liên quan đến tài khoản như cảnh báo đăng nhập hoặc cập nhật chính sách.",
                      },
                      {
                        icon: "ri-shield-check-line",
                        title: "Bảo Mật",
                        desc: "Bảo vệ tài khoản, phát hiện gian lận và đảm bảo tính an toàn và toàn vẹn của nền tảng.",
                      },
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

              {/* Lưu trữ và bảo mật */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-database-2-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Lưu Trữ &amp; Bảo Mật Dữ Liệu</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm space-y-4">
                  <p className="text-gray-700">
                    Dữ liệu cá nhân của bạn được lưu trữ an toàn trên <strong>Supabase</strong> — nền tảng
                    cơ sở dữ liệu đạt chuẩn doanh nghiệp, tuân thủ SOC 2 Type II. Supabase mã hóa dữ liệu
                    khi lưu trữ và truyền tải bằng các tiêu chuẩn TLS/SSL và AES-256.
                  </p>
                  <p className="text-gray-700">
                    Chúng tôi chỉ lưu giữ dữ liệu của bạn trong thời gian tài khoản còn hoạt động hoặc theo
                    yêu cầu của pháp luật. Sau khi xóa tài khoản, dữ liệu cá nhân của bạn sẽ được xóa khỏi
                    hệ thống trong vòng 30 ngày.
                  </p>
                  <p className="text-gray-700">
                    Quyền truy cập vào dữ liệu cá nhân bị giới hạn nghiêm ngặt đối với nhân viên được ủy
                    quyền và được bảo vệ bằng kiểm soát truy cập theo vai trò.
                  </p>
                </div>
              </div>

              {/* Không bán hoặc chia sẻ */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-forbid-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Chúng Tôi Không Bán Hoặc Chia Sẻ Dữ Liệu</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <p className="text-gray-700 mb-4">
                    Chúng tôi <strong>không</strong> bán, cho thuê, trao đổi hoặc chuyển giao thông tin cá
                    nhân của bạn cho bên thứ ba vì mục đích thương mại hay tiếp thị.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Chúng tôi không chia sẻ dữ liệu của bạn với các nhà quảng cáo, công ty môi giới dữ liệu
                    hoặc bất kỳ bên ngoài nào, ngoại trừ các trường hợp hạn chế sau:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Khi được yêu cầu bởi pháp luật hiện hành hoặc lệnh pháp lý hợp lệ.</li>
                    <li>Để bảo vệ quyền lợi, tài sản hoặc sự an toàn của TheStockHunters, người dùng hoặc cộng đồng.</li>
                    <li>
                      Với các nhà cung cấp dịch vụ đáng tin cậy hoạt động theo thỏa thuận bảo mật nghiêm ngặt
                      và chỉ xử lý dữ liệu thay mặt chúng tôi (ví dụ: Supabase để lưu trữ cơ sở dữ liệu).
                    </li>
                  </ul>
                </div>
              </div>

              {/* Quyền của người dùng & xóa dữ liệu */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-delete-bin-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Quyền Của Bạn &amp; Xóa Dữ Liệu</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm space-y-4">
                  <p className="text-gray-700">
                    Bạn có quyền truy cập, chỉnh sửa hoặc xóa dữ liệu cá nhân của mình bất kỳ lúc nào.
                  </p>
                  <p className="text-gray-700">
                    Để yêu cầu xóa tài khoản và toàn bộ dữ liệu cá nhân, vui lòng gửi email đến{" "}
                    <a
                      href="mailto:stock.hunter.info@gmail.com?subject=Delete My Account"
                      className="text-primary font-medium hover:underline"
                    >
                      stock.hunter.info@gmail.com
                    </a>{" "}
                    với tiêu đề <strong>"Delete My Account"</strong>. Chúng tôi sẽ xử lý yêu cầu và xác
                    nhận xóa trong vòng <strong>30 ngày</strong>.
                  </p>
                  <p className="text-gray-700">
                    Xem hướng dẫn từng bước tại{" "}
                    <a href="/data-deletion" className="text-primary font-medium hover:underline">
                      Hướng Dẫn Xóa Dữ Liệu
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* Liên hệ */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-contacts-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Liên Hệ</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <p className="text-gray-700 mb-6">
                    Nếu bạn có bất kỳ câu hỏi, thắc mắc hoặc yêu cầu nào liên quan đến Chính Sách Quyền
                    Riêng Tư này hoặc cách chúng tôi xử lý dữ liệu cá nhân của bạn, vui lòng liên hệ:
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
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                    <p className="text-gray-600 text-sm">
                      Chúng tôi sẽ phản hồi mọi yêu cầu liên quan đến quyền riêng tư trong vòng{" "}
                      <strong>30 ngày</strong> kể từ khi nhận được.
                    </p>
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
