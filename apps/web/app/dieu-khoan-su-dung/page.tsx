"use client"
import Link from "next/link"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"

export default function DieuKhoanSuDungPage() {
  return (
    <>
      <Navbar />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Điều khoản sử dụng</h1>
            <p className="text-gray-600 mb-8">Cập nhật lần cuối: 01/06/2025</p>

            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. Giới thiệu</h2>
              <p className="text-gray-700 mb-4">Chào mừng bạn đến với TheStockHunters. Các Điều khoản sử dụng này ("Điều khoản") điều chỉnh việc truy cập và sử dụng trang web TheStockHunters, bao gồm tất cả nội dung, tính năng và dịch vụ được cung cấp.</p>
              <p className="text-gray-700 mb-4">Bằng việc truy cập hoặc sử dụng dịch vụ của chúng tôi, bạn đồng ý chịu ràng buộc bởi các Điều khoản này. Nếu bạn không đồng ý với bất kỳ phần nào của các Điều khoản này, bạn không được phép truy cập hoặc sử dụng dịch vụ của chúng tôi.</p>
              <p className="text-gray-700">TheStockHunters cung cấp nền tảng phân tích và thông tin về thị trường chứng khoán, không phải là dịch vụ tư vấn đầu tư chính thức. Mọi quyết định đầu tư dựa trên thông tin từ nền tảng của chúng tôi hoàn toàn thuộc trách nhiệm của bạn.</p>
            </section>

            {/* Terms of Service */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. Quy định sử dụng dịch vụ</h2>
              <p className="text-gray-700 mb-4">Khi sử dụng dịch vụ của TheStockHunters, bạn đồng ý:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Cung cấp thông tin chính xác, đầy đủ và cập nhật khi đăng ký tài khoản.</li>
                <li>Bảo mật thông tin đăng nhập và mật khẩu của bạn.</li>
                <li>Không chia sẻ tài khoản với người khác hoặc cho phép người khác truy cập thông qua tài khoản của bạn.</li>
                <li>Không sử dụng dịch vụ của chúng tôi cho bất kỳ mục đích bất hợp pháp hoặc trái phép nào.</li>
                <li>Không thu thập hoặc khai thác dữ liệu từ nền tảng của chúng tôi bằng các phương tiện tự động.</li>
                <li>Không can thiệp vào hoạt động bình thường của dịch vụ hoặc gây quá tải cho hệ thống.</li>
              </ul>
              <p className="text-gray-700">TheStockHunters có quyền tạm ngừng hoặc chấm dứt quyền truy cập của bạn vào dịch vụ nếu vi phạm bất kỳ điều khoản nào nêu trên hoặc có hành vi gây hại đến nền tảng và cộng đồng người dùng.</p>
            </section>

            {/* User Responsibilities */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. Trách nhiệm của người dùng</h2>
              <p className="text-gray-700 mb-4">Khi sử dụng dịch vụ của TheStockHunters, bạn chịu trách nhiệm về:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Mọi quyết định đầu tư dựa trên thông tin từ nền tảng của chúng tôi.</li>
                <li>Tuân thủ tất cả các luật và quy định hiện hành liên quan đến hoạt động đầu tư chứng khoán.</li>
                <li>Nội dung bạn đăng tải, chia sẻ hoặc tương tác trên nền tảng của chúng tôi.</li>
                <li>Bảo vệ thiết bị của bạn khỏi phần mềm độc hại và đảm bảo kết nối internet an toàn khi truy cập dịch vụ của chúng tôi.</li>
                <li>Thông báo cho chúng tôi ngay lập tức nếu phát hiện bất kỳ hoạt động đáng ngờ nào liên quan đến tài khoản của bạn.</li>
              </ul>
              <p className="text-gray-700">Bạn hiểu rằng đầu tư chứng khoán luôn tiềm ẩn rủi ro, và TheStockHunters không đảm bảo về kết quả đầu tư hoặc độ chính xác tuyệt đối của thông tin được cung cấp.</p>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">4. Quyền sở hữu trí tuệ</h2>
              <p className="text-gray-700 mb-4">Tất cả nội dung trên nền tảng TheStockHunters, bao gồm nhưng không giới hạn ở văn bản, đồ họa, logo, biểu tượng, hình ảnh, clip âm thanh, tải xuống kỹ thuật số, tổng hợp dữ liệu và phần mềm, đều là tài sản của TheStockHunters hoặc các nhà cung cấp nội dung của chúng tôi và được bảo vệ bởi luật sở hữu trí tuệ Việt Nam và quốc tế.</p>
              <p className="text-gray-700 mb-4">Bạn được cấp quyền giới hạn, không độc quyền, không thể chuyển nhượng để truy cập và sử dụng dịch vụ của chúng tôi. Quyền này không cho phép bạn:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Sao chép, phân phối, trưng bày, thực hiện công khai, hoặc tạo các tác phẩm phái sinh từ nội dung của chúng tôi.</li>
                <li>Sử dụng bất kỳ robot, spider, scraper hoặc phương tiện tự động khác để truy cập nội dung của chúng tôi.</li>
                <li>Xóa bất kỳ thông báo bản quyền, nhãn hiệu hoặc quyền sở hữu khác từ nội dung của chúng tôi.</li>
                <li>Sao chép hoặc sửa đổi phần mềm, mã HTML hoặc các mã khác tạo nên nền tảng của chúng tôi.</li>
              </ul>
              <p className="text-gray-700">Việc sử dụng nội dung của chúng tôi mà không có sự cho phép trước bằng văn bản có thể vi phạm quyền sở hữu trí tuệ và sẽ bị xử lý theo quy định của pháp luật.</p>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">5. Giới hạn trách nhiệm</h2>
              <p className="text-gray-700 mb-4">TheStockHunters cung cấp nội dung và dịch vụ "nguyên trạng" và "như có sẵn", không có bất kỳ bảo đảm nào, dù rõ ràng hay ngụ ý. Chúng tôi không đảm bảo rằng:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Dịch vụ sẽ đáp ứng yêu cầu cụ thể của bạn.</li>
                <li>Dịch vụ sẽ không bị gián đoạn, kịp thời, an toàn hoặc không có lỗi.</li>
                <li>Kết quả có được từ việc sử dụng dịch vụ sẽ chính xác hoặc đáng tin cậy.</li>
                <li>Chất lượng của bất kỳ sản phẩm, dịch vụ, thông tin hoặc tài liệu khác mà bạn mua hoặc có được thông qua dịch vụ sẽ đáp ứng mong đợi của bạn.</li>
              </ul>
              <p className="text-gray-700 mb-4">Trong mọi trường hợp, TheStockHunters, các giám đốc, nhân viên, đối tác hoặc đại lý của chúng tôi sẽ không chịu trách nhiệm về bất kỳ thiệt hại nào (bao gồm nhưng không giới hạn ở thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, đặc biệt, hậu quả hoặc trừng phạt) phát sinh từ:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Việc sử dụng hoặc không thể sử dụng dịch vụ của chúng tôi.</li>
                <li>Bất kỳ thay đổi nào đối với dịch vụ.</li>
                <li>Truy cập trái phép hoặc thay đổi dữ liệu của bạn.</li>
                <li>Tuyên bố hoặc hành vi của bất kỳ bên thứ ba nào trên dịch vụ của chúng tôi.</li>
                <li>Quyết định đầu tư dựa trên thông tin từ nền tảng của chúng tôi.</li>
              </ul>
              <p className="text-gray-700">Giới hạn trách nhiệm này áp dụng trong phạm vi tối đa được pháp luật cho phép.</p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">6. Thay đổi điều khoản</h2>
              <p className="text-gray-700 mb-4">TheStockHunters có quyền, theo quyết định riêng của mình, sửa đổi hoặc thay thế các Điều khoản này bất cứ lúc nào. Chúng tôi sẽ cố gắng thông báo cho bạn về những thay đổi quan trọng thông qua email hoặc thông báo trên nền tảng của chúng tôi.</p>
              <p className="text-gray-700 mb-4">Việc bạn tiếp tục sử dụng dịch vụ sau khi chúng tôi đăng các thay đổi sẽ cấu thành sự chấp nhận của bạn đối với các điều khoản mới. Nếu bạn không đồng ý với các điều khoản mới, bạn không được phép tiếp tục sử dụng dịch vụ của chúng tôi.</p>
              <p className="text-gray-700">Chúng tôi khuyến nghị bạn thường xuyên kiểm tra trang Điều khoản sử dụng để cập nhật những thay đổi mới nhất.</p>
            </section>

            {/* Legal Terms */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">7. Điều khoản pháp lý khác</h2>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">7.1. Luật áp dụng</h3>
              <p className="text-gray-700 mb-4">Các Điều khoản này sẽ được điều chỉnh và giải thích theo luật pháp Việt Nam, không áp dụng các nguyên tắc xung đột pháp luật.</p>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">7.2. Giải quyết tranh chấp</h3>
              <p className="text-gray-700 mb-4">Bất kỳ tranh chấp nào phát sinh từ hoặc liên quan đến các Điều khoản này sẽ được giải quyết thông qua thương lượng thiện chí. Nếu không thể giải quyết thông qua thương lượng, tranh chấp sẽ được đưa ra Tòa án có thẩm quyền tại Việt Nam.</p>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">7.3. Tính tách biệt</h3>
              <p className="text-gray-700 mb-4">Nếu bất kỳ điều khoản nào trong các Điều khoản này bị coi là không hợp lệ hoặc không thể thực thi, các điều khoản còn lại sẽ vẫn có hiệu lực đầy đủ.</p>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">7.4. Toàn bộ thỏa thuận</h3>
              <p className="text-gray-700 mb-4">Các Điều khoản này cấu thành toàn bộ thỏa thuận giữa bạn và TheStockHunters liên quan đến việc sử dụng dịch vụ của chúng tôi, và thay thế tất cả các thỏa thuận trước đây giữa bạn và chúng tôi.</p>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">7.5. Không từ bỏ quyền</h3>
              <p className="text-gray-700">Việc TheStockHunters không thực thi bất kỳ quyền hoặc điều khoản nào trong các Điều khoản này sẽ không được coi là từ bỏ quyền đó hoặc điều khoản đó.</p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">8. Thông tin liên hệ</h2>
              <p className="text-gray-700 mb-4">Nếu bạn có bất kỳ câu hỏi nào về các Điều khoản sử dụng này, vui lòng liên hệ với chúng tôi:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Email: hotro@thestockhunters.vn</li>
                <li>Điện thoại: 028 7300 9955</li>
                <li>Địa chỉ: Tầng 15, Tòa nhà Vietcombank Tower, 5 Công Trường Mê Linh, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</li>
              </ul>
            </section>
          </div>

          {/* Back Button */}
          <div className="max-w-4xl mx-auto text-center mb-8">
            <Link href="/dang-ky" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-button font-medium hover:bg-primary/90 transition whitespace-nowrap">
              <div className="w-5 h-5 flex items-center justify-center mr-2">
                <i className="ri-arrow-left-line"></i>
              </div>
              Quay lại trang đăng ký
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
