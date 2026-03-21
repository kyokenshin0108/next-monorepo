import type { Metadata } from "next"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"

export const metadata: Metadata = {
  title: "Điều Khoản Sử Dụng - TheStockHunters",
  description:
    "Đọc Điều Khoản Sử Dụng của TheStockHunters — nền tảng phân tích thị trường chứng khoán và phát trực tiếp. Tìm hiểu quyền lợi, trách nhiệm và các tuyên bố miễn trừ.",
  robots: { index: true, follow: true },
}

export default function TermsOfServicePage() {
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
                  <i className="ri-file-list-2-line text-3xl"></i>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Điều Khoản Sử Dụng</h1>
              <p className="text-gray-600 text-lg mb-4">
                Vui lòng đọc kỹ các điều khoản này trước khi sử dụng nền tảng TheStockHunters.
              </p>
              <p className="text-gray-500 text-sm">Ngày có hiệu lực: 21/03/2026</p>
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
                  Điều Khoản Sử Dụng này ("Điều Khoản") điều chỉnh việc bạn truy cập và sử dụng trang web
                  cùng các dịch vụ của TheStockHunters (gọi chung là "Dịch Vụ"), được vận hành bởi
                  TheStockHunters ("chúng tôi"). Bằng việc truy cập hoặc sử dụng Dịch Vụ, bạn xác nhận đã
                  đọc, hiểu và đồng ý tuân theo các Điều Khoản này. Nếu bạn không đồng ý, vui lòng không
                  sử dụng Dịch Vụ của chúng tôi.
                </p>
              </div>

              {/* Mô tả dịch vụ */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-bar-chart-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Mô Tả Dịch Vụ</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm space-y-4">
                  <p className="text-gray-700">
                    TheStockHunters là <strong>nền tảng phân tích thị trường chứng khoán và phát trực tiếp</strong> cung cấp:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Dữ liệu và phân tích thị trường chứng khoán theo thời gian thực và lịch sử.</li>
                    <li>Các buổi phát trực tiếp với bình luận và thảo luận về thị trường.</li>
                    <li>Nội dung giáo dục về các khái niệm và chiến lược đầu tư.</li>
                    <li>Tính năng cộng đồng cho phép người dùng thảo luận về diễn biến thị trường.</li>
                    <li>Bài viết nhận định chuyên gia và triển vọng thị trường.</li>
                  </ul>
                  <p className="text-gray-700">
                    Chúng tôi có quyền sửa đổi, tạm ngừng hoặc chấm dứt bất kỳ phần nào của Dịch Vụ vào
                    bất kỳ lúc nào với thông báo hợp lý.
                  </p>
                </div>
              </div>

              {/* Trách nhiệm người dùng */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-user-settings-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Trách Nhiệm Người Dùng</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <div className="space-y-6">
                    {[
                      {
                        icon: "ri-calendar-check-line",
                        title: "Yêu Cầu Độ Tuổi",
                        desc: "Bạn phải đủ 18 tuổi trở lên để sử dụng Dịch Vụ của chúng tôi. Bằng cách truy cập nền tảng, bạn xác nhận và đảm bảo rằng bạn đáp ứng yêu cầu này.",
                      },
                      {
                        icon: "ri-id-card-line",
                        title: "Thông Tin Chính Xác",
                        desc: "Bạn đồng ý cung cấp thông tin chính xác, đầy đủ và cập nhật khi tạo tài khoản. Việc cung cấp thông tin sai lệch có thể dẫn đến chấm dứt tài khoản.",
                      },
                      {
                        icon: "ri-lock-password-line",
                        title: "Bảo Mật Tài Khoản",
                        desc: "Bạn có trách nhiệm bảo mật thông tin đăng nhập và chịu trách nhiệm về mọi hoạt động diễn ra dưới tài khoản của mình. Thông báo ngay cho chúng tôi tại stock.hunter.info@gmail.com nếu bạn nghi ngờ có truy cập trái phép.",
                      },
                      {
                        icon: "ri-thumb-up-line",
                        title: "Sử Dụng Hợp Lệ",
                        desc: "Bạn đồng ý không sử dụng Dịch Vụ cho bất kỳ mục đích bất hợp pháp nào, không quấy rối người dùng khác, không phát tán thư rác hoặc phần mềm độc hại, không thao túng thông tin thị trường hoặc thực hiện bất kỳ hoạt động nào gây tổn hại đến tính toàn vẹn của nền tảng.",
                      },
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

              {/* Tuyên bố miễn trừ tài chính */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-error-warning-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Tuyên Bố Miễn Trừ — Không Phải Tư Vấn Tài Chính</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm space-y-4">
                  <div className="p-4 border-l-4 border-yellow-400 bg-yellow-50 rounded-r-lg">
                    <p className="text-gray-800 font-semibold">
                      Toàn bộ nội dung trên TheStockHunters chỉ được cung cấp cho mục đích thông tin và
                      giáo dục. Đây không phải là tư vấn tài chính, đầu tư, pháp lý hay thuế.
                    </p>
                  </div>
                  <p className="text-gray-700">
                    Các phân tích thị trường, bình luận phát trực tiếp, bài viết và mọi nội dung khác được
                    đăng tải trên nền tảng phản ánh quan điểm của tác giả và không nên được dùng làm cơ sở
                    để ra quyết định đầu tư.
                  </p>
                  <p className="text-gray-700">
                    Đầu tư vào thị trường tài chính tiềm ẩn rủi ro đáng kể, bao gồm khả năng mất vốn. Kết
                    quả trong quá khứ không đảm bảo cho kết quả trong tương lai. Bạn nên tham khảo ý kiến
                    của chuyên gia tư vấn tài chính có chứng chỉ trước khi đưa ra bất kỳ quyết định đầu tư nào.
                  </p>
                  <p className="text-gray-700">
                    TheStockHunters không phải là công ty tư vấn đầu tư, môi giới chứng khoán hay tổ chức
                    tài chính đã đăng ký và không nắm giữ bất kỳ giấy phép chứng khoán nào.
                  </p>
                </div>
              </div>

              {/* Giới hạn trách nhiệm */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-scales-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Giới Hạn Trách Nhiệm</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm space-y-4">
                  <p className="text-gray-700">
                    Trong phạm vi tối đa được pháp luật hiện hành cho phép, TheStockHunters và các cán bộ,
                    giám đốc, nhân viên và đại lý của chúng tôi sẽ không chịu trách nhiệm đối với:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Bất kỳ thiệt hại gián tiếp, ngẫu nhiên, đặc biệt, hậu quả hoặc trừng phạt nào.</li>
                    <li>
                      Bất kỳ tổn thất lợi nhuận, doanh thu, dữ liệu, uy tín hay tổn thất vô hình nào phát
                      sinh từ việc sử dụng hoặc không thể sử dụng Dịch Vụ.
                    </li>
                    <li>
                      Bất kỳ tổn thất đầu tư hay quyết định tài chính nào được đưa ra dựa trên nội dung
                      đăng tải trên nền tảng.
                    </li>
                    <li>
                      Việc bên thứ ba truy cập trái phép hoặc thay đổi dữ liệu hay nội dung truyền tải của bạn.
                    </li>
                    <li>
                      Bất kỳ sự gián đoạn, tạm ngừng hoặc chấm dứt Dịch Vụ, dù có hay không do hành động
                      của chúng tôi gây ra.
                    </li>
                  </ul>
                  <p className="text-gray-700">
                    Tại các khu vực pháp lý không cho phép giới hạn hoàn toàn trách nhiệm, trách nhiệm của
                    chúng tôi sẽ được giới hạn ở mức tối đa mà pháp luật cho phép.
                  </p>
                </div>
              </div>

              {/* Chấm dứt tài khoản */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-close-circle-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Chấm Dứt Tài Khoản</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm space-y-4">
                  <p className="text-gray-700">
                    <strong>Bạn có thể chấm dứt tài khoản</strong> bất kỳ lúc nào bằng cách liên hệ với
                    chúng tôi tại{" "}
                    <a
                      href="mailto:stock.hunter.info@gmail.com?subject=Delete My Account"
                      className="text-primary font-medium hover:underline"
                    >
                      stock.hunter.info@gmail.com
                    </a>
                    . Sau khi chấm dứt, dữ liệu cá nhân của bạn sẽ được xóa theo{" "}
                    <a href="/privacy-policy" className="text-primary font-medium hover:underline">
                      Chính Sách Quyền Riêng Tư
                    </a>{" "}
                    của chúng tôi.
                  </p>
                  <p className="text-gray-700">
                    <strong>Chúng tôi có quyền đình chỉ hoặc chấm dứt</strong> tài khoản của bạn theo quyết
                    định của chúng tôi, có hoặc không có thông báo trước, nếu chúng tôi xác định bạn đã vi
                    phạm Điều Khoản này, tham gia hoạt động gian lận hoặc gây hại cho người dùng khác hay
                    nền tảng.
                  </p>
                  <p className="text-gray-700">
                    Việc chấm dứt tài khoản không miễn trừ bạn khỏi bất kỳ nghĩa vụ hoặc trách nhiệm nào
                    phát sinh trước ngày chấm dứt.
                  </p>
                </div>
              </div>

              {/* Thay đổi điều khoản */}
              <div className="pb-8 border-b-2 border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                    <i className="ri-refresh-line text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Thay Đổi Điều Khoản</h2>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <p className="text-gray-700">
                    Chúng tôi có thể cập nhật các Điều Khoản này theo thời gian. Khi có thay đổi quan trọng,
                    chúng tôi sẽ cập nhật ngày có hiệu lực ở đầu trang này và thông báo cho bạn qua email
                    hoặc thông báo nổi bật trên nền tảng. Việc bạn tiếp tục sử dụng Dịch Vụ sau khi thay
                    đổi có hiệu lực đồng nghĩa với việc bạn chấp nhận các Điều Khoản đã được sửa đổi.
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
                    Nếu bạn có bất kỳ câu hỏi nào về Điều Khoản Sử Dụng này, vui lòng liên hệ với chúng tôi:
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
