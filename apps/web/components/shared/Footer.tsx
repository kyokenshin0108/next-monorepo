import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Về TheStockHunters</h3>
            <p className="mb-4">
              The Stock Hunters là kênh phân tích chứng khoán thực chiến, cung cấp góc nhìn chiến
              lược, cập nhật dòng tiền thị trường và chọn lọc cổ phiếu tiềm năng mỗi ngày nhằm
              đồng hành cùng nhà đầu tư kiểm soát rủi ro và tối ưu lợi nhuận một cách bài bản và
              hiệu quả.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.youtube.com/@Thestockhunters"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition"
              >
                <i className="ri-youtube-fill"></i>
              </a>
              <a
                href="https://www.tiktok.com/@thestockhunters"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition"
              >
                <i className="ri-tiktok-fill"></i>
              </a>
              <a
                href="https://threads.com/"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition"
              >
                <i className="ri-threads-fill"></i>
              </a>
              <a
                href="https://substack.com/@stockhunters"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition"
              >
                <i className="ri-article-fill"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Liên Kết Nhanh</h3>
            <ul className="space-y-2">
              {[
                { label: "Trang Chủ", href: "/" },
                { label: "Live Stream", href: "/live-stream" },
                { label: "Nhận Định Thị Trường", href: "/nhan-dinh-thi-truong" },
                { label: "Kiến Thức Đầu Tư", href: "/kien-thuc-dau-tu" },
                { label: "Tin Tức Chứng Khoán", href: "/tin-tuc" },
                { label: "Đội Ngũ", href: "/doi-ngu-chuyen-gia" },
                { label: "Liên Hệ", href: "/lien-he" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Liên Hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                  <i className="ri-map-pin-line"></i>
                </div>
                <span>
                  Tầng trệt – Tòa nhà The Prince Residence, số 17-19-21 Nguyễn Văn Trỗi, Quận Phú
                  Nhuận, TP. Hồ Chí Minh
                </span>
              </li>
              <li className="flex items-center">
                <div className="w-5 h-5 flex items-center justify-center mr-2">
                  <i className="ri-phone-line"></i>
                </div>
                <span>+84 0901919100</span>
              </li>
              <li className="flex items-center">
                <div className="w-5 h-5 flex items-center justify-center mr-2">
                  <i className="ri-mail-line"></i>
                </div>
                <span>stock.hunter.info@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Pháp Lý</h3>
            <ul className="space-y-2">
              {[
                { label: "Điều Khoản Sử Dụng", href: "/dieu-khoan-su-dung" },
                { label: "Chính Sách Bảo Mật", href: "/chinh-sach-bao-mat" },
                { label: "Miễn Trừ Trách Nhiệm", href: "/mien-tru-trach-nhiem" },
                { label: "Chính Sách Cookie", href: "/chinh-sach-cookie" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 TheStockHunters. Tất cả các quyền được bảo lưu.</p>
          <div className="mt-4 md:mt-0">
            <p className="text-sm">
              Thông tin trên trang web này chỉ mang tính chất tham khảo và không phải là lời khuyên
              đầu tư.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
