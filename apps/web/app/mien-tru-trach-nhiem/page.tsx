"use client"
import { useEffect } from "react"
import Link from "next/link"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"

export default function MienTruTrachNhiemPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Navbar />
      <main>
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center text-sm text-gray-600">
              <Link href="/" className="hover:text-primary transition">Trang Chủ</Link>
              <div className="w-4 h-4 flex items-center justify-center mx-1">
                <i className="ri-arrow-right-s-line"></i>
              </div>
              <span className="text-gray-500">Pháp Lý</span>
              <div className="w-4 h-4 flex items-center justify-center mx-1">
                <i className="ri-arrow-right-s-line"></i>
              </div>
              <span className="text-primary font-medium">Miễn Trừ Trách Nhiệm</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary to-blue-700 py-16">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl">
              <Link href="/lien-he" className="inline-flex items-center text-white bg-white/20 px-4 py-2 rounded-full mb-6 hover:bg-white/30 transition">
                <div className="w-5 h-5 flex items-center justify-center mr-2">
                  <i className="ri-arrow-left-line"></i>
                </div>
                <span>Trở về trang trước</span>
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Miễn Trừ Trách Nhiệm</h1>
              <p className="text-xl text-blue-100 mb-8">Trang này giải thích về giới hạn trách nhiệm pháp lý và tuyên bố rủi ro đầu tư của TheStockHunters. Vui lòng đọc kỹ trước khi sử dụng dịch vụ của chúng tôi.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/" className="bg-white text-primary px-6 py-3 rounded-button font-medium hover:bg-gray-100 transition whitespace-nowrap flex items-center">
                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                    <i className="ri-home-4-line"></i>
                  </div>
                  Trở về trang chủ
                </Link>
                <Link href="/chinh-sach-bao-mat" className="bg-transparent border border-white text-white px-6 py-3 rounded-button font-medium hover:bg-white/10 transition whitespace-nowrap flex items-center">
                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                    <i className="ri-shield-line"></i>
                  </div>
                  Chính Sách Bảo Mật
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Giới Thiệu Chung</h2>
                <p className="text-gray-700 mb-4">Trang web TheStockHunters ("Trang Web") được vận hành bởi Công ty TNHH TheStockHunters ("chúng tôi", "của chúng tôi", hoặc "TheStockHunters"). Bằng việc truy cập và sử dụng Trang Web này, bạn chấp nhận và đồng ý với các điều khoản miễn trừ trách nhiệm được nêu dưới đây.</p>
                <p className="text-gray-700 mb-4">Trang Web này cung cấp thông tin về thị trường chứng khoán, phân tích kỹ thuật, và các nội dung liên quan đến đầu tư tài chính. Tuy nhiên, chúng tôi không đảm bảo tính chính xác, đầy đủ, hoặc kịp thời của thông tin được cung cấp trên Trang Web.</p>
                <p className="text-gray-700">Vui lòng đọc kỹ tuyên bố miễn trừ trách nhiệm này trước khi sử dụng Trang Web của chúng tôi. Nếu bạn không đồng ý với bất kỳ phần nào của tuyên bố này, vui lòng không sử dụng Trang Web của chúng tôi.</p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Miễn Trừ Trách Nhiệm về Thông Tin Đầu Tư</h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 mb-6">
                  <div className="flex">
                    <div className="w-6 h-6 flex items-center justify-center text-yellow-500 mr-3 flex-shrink-0">
                      <i className="ri-alert-line"></i>
                    </div>
                    <p className="text-gray-700">Thông tin trên Trang Web này chỉ mang tính chất tham khảo và không cấu thành lời khuyên đầu tư, khuyến nghị tài chính, hoặc đề xuất mua/bán bất kỳ chứng khoán nào.</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">TheStockHunters không phải là công ty chứng khoán được cấp phép, công ty quản lý quỹ, hoặc tổ chức tư vấn đầu tư. Chúng tôi không đưa ra lời khuyên đầu tư cá nhân hóa hoặc xem xét mục tiêu đầu tư, tình hình tài chính, hoặc nhu cầu cụ thể của bất kỳ người dùng nào.</p>
                <p className="text-gray-700 mb-4">Mọi ý kiến, phân tích, nhận định, dự báo, hoặc khuyến nghị được đưa ra trên Trang Web đều dựa trên quan điểm cá nhân của người viết và không nên được xem là lời khuyên đầu tư chính thức. Các phân tích kỹ thuật và cơ bản được cung cấp chỉ nhằm mục đích tham khảo và có thể không phản ánh chính xác diễn biến thực tế của thị trường hoặc giá trị của các chứng khoán.</p>
                <p className="text-gray-700">Trước khi thực hiện bất kỳ quyết định đầu tư nào, chúng tôi khuyến nghị bạn nên tham khảo ý kiến của các chuyên gia tài chính được cấp phép và thực hiện nghiên cứu độc lập của riêng mình.</p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Rủi Ro Đầu Tư</h2>
                <p className="text-gray-700 mb-4">Đầu tư chứng khoán và các công cụ tài chính khác luôn tiềm ẩn rủi ro, bao gồm nhưng không giới hạn ở việc mất một phần hoặc toàn bộ vốn đầu tư. Hiệu suất trong quá khứ không đảm bảo cho kết quả trong tương lai. Giá trị của các khoản đầu tư có thể tăng hoặc giảm, và nhà đầu tư có thể không nhận lại được số tiền đã đầu tư ban đầu.</p>
                <p className="text-gray-700 mb-4">Thị trường chứng khoán và các thị trường tài chính khác có thể bị ảnh hưởng bởi nhiều yếu tố, bao gồm các sự kiện kinh tế, chính trị, và xã hội, cả trong nước và quốc tế. Những biến động này có thể dẫn đến sự thay đổi đáng kể trong giá trị của các khoản đầu tư.</p>
                <p className="text-gray-700">Bạn nên cân nhắc kỹ lưỡng mục tiêu đầu tư, khả năng chịu đựng rủi ro, và tình hình tài chính cá nhân trước khi đưa ra bất kỳ quyết định đầu tư nào. Nếu cần thiết, hãy tìm kiếm lời khuyên từ các chuyên gia tài chính được cấp phép.</p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Tuyên Bố về Tính Chất Tham Khảo</h2>
                <p className="text-gray-700 mb-4">Tất cả nội dung trên Trang Web của TheStockHunters, bao gồm nhưng không giới hạn ở bài viết, video, webinar, khóa học, phân tích thị trường, và các tài liệu khác, chỉ mang tính chất tham khảo và giáo dục. Chúng tôi không đảm bảo tính chính xác, đầy đủ, hoặc kịp thời của thông tin được cung cấp.</p>
                <p className="text-gray-700 mb-4">Thông tin trên Trang Web có thể bao gồm các tuyên bố hoặc dự báo về tương lai, dựa trên các giả định và đánh giá tại thời điểm đưa ra. Những tuyên bố này có thể thay đổi mà không cần thông báo trước và có thể không chính xác do nhiều yếu tố nằm ngoài tầm kiểm soát của chúng tôi.</p>
                <p className="text-gray-700">Người dùng nên thực hiện nghiên cứu độc lập và xác minh thông tin trước khi sử dụng cho mục đích đầu tư hoặc kinh doanh. TheStockHunters không chịu trách nhiệm về bất kỳ tổn thất hoặc thiệt hại nào phát sinh từ việc sử dụng thông tin trên Trang Web.</p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Quyền Sở Hữu Trí Tuệ</h2>
                <p className="text-gray-700 mb-4">Tất cả nội dung trên Trang Web, bao gồm nhưng không giới hạn ở văn bản, hình ảnh, video, biểu đồ, logo, và thiết kế, đều thuộc quyền sở hữu của TheStockHunters hoặc các đối tác cung cấp nội dung của chúng tôi, và được bảo vệ bởi luật sở hữu trí tuệ Việt Nam và quốc tế.</p>
                <p className="text-gray-700 mb-4">Bạn có thể xem, tải xuống, và in các phần của Trang Web chỉ cho mục đích sử dụng cá nhân, phi thương mại. Bạn không được sao chép, phân phối, sửa đổi, hiển thị công khai, thực hiện, tái sản xuất, xuất bản, cấp phép, tạo ra các tác phẩm phái sinh, chuyển nhượng, hoặc bán bất kỳ thông tin, phần mềm, sản phẩm, hoặc dịch vụ nào từ Trang Web mà không có sự đồng ý bằng văn bản của TheStockHunters.</p>
                <p className="text-gray-700">Việc sử dụng trái phép nội dung của chúng tôi có thể vi phạm luật sở hữu trí tuệ, nhãn hiệu, quyền riêng tư, công khai, và/hoặc các luật khác, và có thể dẫn đến trách nhiệm dân sự và/hoặc hình sự.</p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Thay Đổi Nội Dung</h2>
                <p className="text-gray-700 mb-4">TheStockHunters có quyền thay đổi, cập nhật, hoặc xóa bất kỳ nội dung nào trên Trang Web mà không cần thông báo trước. Chúng tôi cũng có thể thay đổi hoặc ngừng cung cấp bất kỳ tính năng hoặc dịch vụ nào trên Trang Web vào bất kỳ lúc nào mà không cần thông báo trước.</p>
                <p className="text-gray-700 mb-4">Tuyên bố miễn trừ trách nhiệm này có thể được cập nhật theo thời gian. Bạn nên kiểm tra trang này thường xuyên để cập nhật những thay đổi. Việc tiếp tục sử dụng Trang Web sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận và đồng ý với những thay đổi đó.</p>
                <p className="text-gray-700">Phiên bản mới nhất của tuyên bố miễn trừ trách nhiệm này được cập nhật vào ngày 09/06/2025.</p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Giới Hạn Trách Nhiệm</h2>
                <p className="text-gray-700 mb-4">Trong phạm vi tối đa được pháp luật cho phép, TheStockHunters và các giám đốc, nhân viên, đối tác, đại lý, nhà cung cấp, hoặc bên liên kết của chúng tôi sẽ không chịu trách nhiệm đối với bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, đặc biệt, hậu quả, hoặc mang tính trừng phạt nào phát sinh từ hoặc liên quan đến:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                  <li>Việc sử dụng hoặc không thể sử dụng Trang Web;</li>
                  <li>Việc sử dụng hoặc tin tưởng vào bất kỳ nội dung, thông tin, sản phẩm, hoặc dịch vụ nào có trên Trang Web;</li>
                  <li>Bất kỳ giao dịch hoặc đầu tư nào được thực hiện dựa trên thông tin từ Trang Web;</li>
                  <li>Bất kỳ tổn thất nào về lợi nhuận, doanh thu, sử dụng, dữ liệu, hoặc các tổn thất vô hình khác;</li>
                  <li>Bất kỳ gián đoạn, sai sót, thiếu sót, hoặc virus nào có thể lây nhiễm thông qua việc sử dụng Trang Web.</li>
                </ul>
                <p className="text-gray-700">Giới hạn trách nhiệm này áp dụng cho tất cả các lý thuyết về trách nhiệm pháp lý, bao gồm nhưng không giới hạn ở vi phạm hợp đồng, vi phạm bảo hành, sơ suất, trách nhiệm sản phẩm, hoặc trách nhiệm nghiêm ngặt khác, ngay cả khi TheStockHunters đã được thông báo về khả năng xảy ra những thiệt hại đó.</p>
              </div>

              {/* CTA Box */}
              <div className="bg-gray-100 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Lưu Ý Quan Trọng</h3>
                <p className="text-gray-700 mb-4">Bằng việc tiếp tục sử dụng Trang Web của TheStockHunters, bạn xác nhận rằng đã đọc, hiểu và đồng ý với tất cả các điều khoản trong tuyên bố miễn trừ trách nhiệm này. Nếu bạn không đồng ý với bất kỳ phần nào của tuyên bố này, vui lòng không sử dụng Trang Web của chúng tôi.</p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/lien-he" className="bg-primary text-white px-6 py-3 rounded-button font-medium hover:bg-primary/90 transition whitespace-nowrap flex items-center">
                    <div className="w-5 h-5 flex items-center justify-center mr-2">
                      <i className="ri-check-line"></i>
                    </div>
                    Tôi đã hiểu
                  </Link>
                  <Link href="/dieu-khoan-su-dung" className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-button font-medium hover:bg-gray-100 transition whitespace-nowrap flex items-center">
                    <div className="w-5 h-5 flex items-center justify-center mr-2">
                      <i className="ri-file-list-3-line"></i>
                    </div>
                    Xem Điều Khoản Sử Dụng
                  </Link>
                </div>
              </div>

              {/* Related Links */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Chính Sách Liên Quan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/dieu-khoan-su-dung" className="bg-white border border-gray-200 rounded-lg p-4 hover:border-primary transition flex items-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-3 flex-shrink-0">
                      <i className="ri-file-list-3-line"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Điều Khoản Sử Dụng</h4>
                      <p className="text-gray-600 text-sm">Quy định về việc sử dụng dịch vụ của chúng tôi</p>
                    </div>
                  </Link>
                  <Link href="/chinh-sach-bao-mat" className="bg-white border border-gray-200 rounded-lg p-4 hover:border-primary transition flex items-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-3 flex-shrink-0">
                      <i className="ri-shield-line"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Chính Sách Bảo Mật</h4>
                      <p className="text-gray-600 text-sm">Cách chúng tôi thu thập và xử lý dữ liệu của bạn</p>
                    </div>
                  </Link>
                  <Link href="/chinh-sach-cookie" className="bg-white border border-gray-200 rounded-lg p-4 hover:border-primary transition flex items-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-3 flex-shrink-0">
                      <i className="ri-cookie-line"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Chính Sách Cookie</h4>
                      <p className="text-gray-600 text-sm">Thông tin về việc sử dụng cookie trên trang web</p>
                    </div>
                  </Link>
                  <Link href="/lien-he" className="bg-white border border-gray-200 rounded-lg p-4 hover:border-primary transition flex items-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-3 flex-shrink-0">
                      <i className="ri-customer-service-2-line"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Liên Hệ Hỗ Trợ</h4>
                      <p className="text-gray-600 text-sm">Nhận hỗ trợ từ đội ngũ chăm sóc khách hàng</p>
                    </div>
                  </Link>
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
