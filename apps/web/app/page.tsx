"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"

export default function HomePage() {
  const [showLiveStreamModal, setShowLiveStreamModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [liveStreamForm, setLiveStreamForm] = useState({
    fullName: "",
    streamEmail: "",
    phone: "",
    notification: false,
  })

  // Lock body scroll when modals are open
  useEffect(() => {
    if (showLiveStreamModal || showSuccessModal) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [showLiveStreamModal, showSuccessModal])

  const handleLiveStreamSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (
      liveStreamForm.fullName.length > 500 ||
      liveStreamForm.streamEmail.length > 500 ||
      liveStreamForm.phone.length > 500
    ) {
      return
    }
    const formData = new URLSearchParams()
    formData.append("fullName", liveStreamForm.fullName)
    formData.append("streamEmail", liveStreamForm.streamEmail)
    formData.append("phone", liveStreamForm.phone)
    formData.append("notification", liveStreamForm.notification ? "yes" : "")
    try {
      const response = await fetch("https://readdy.ai/api/form/d13754j4u8u7tbdlodk0", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData,
      })
      if (response.ok) {
        setShowLiveStreamModal(false)
        setShowSuccessModal(true)
        setLiveStreamForm({ fullName: "", streamEmail: "", phone: "", notification: false })
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative w-full min-h-[400px] md:h-[500px] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://readdy.ai/api/search-image?query=stock%20market%20trading%20floor%20with%20digital%20displays%20showing%20market%20data%2C%20financial%20charts%20and%20graphs%2C%20blue%20and%20green%20colors%2C%20professional%20environment%2C%20modern%20technology%2C%20high-quality%20professional%20photo%2C%20clear%20visibility%20of%20data%2C%20suitable%20for%20financial%20website%20hero%20image&width=1920&height=1000&seq=hero1&orientation=landscape')" }}></div>
          <div className="absolute inset-0 hero-gradient"></div>
          <div className="container mx-auto px-4 py-12 md:py-0 h-full relative z-10">
            <div className="flex flex-col justify-center h-full max-w-2xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Săn Cơ Hội Đầu Tư Cùng TheStockHunters</h1>
              <p className="text-lg text-gray-700 mb-8">Nền tảng phân tích chứng khoán hàng đầu Việt Nam với những nhận định sắc bén, phân tích chuyên sâu và chiến lược đầu tư hiệu quả.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/nhan-dinh-thi-truong" className="bg-primary text-white px-6 py-3 rounded-button font-medium hover:bg-primary/90 transition whitespace-nowrap inline-block">Xem Nhận Định Mới Nhất</Link>
                <Link href="/live-stream" className="bg-white text-primary border border-primary px-6 py-3 rounded-button font-medium hover:bg-gray-50 transition whitespace-nowrap inline-block">Lịch Live Stream</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Live Stream Schedule */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-gray-900">Lịch Live Stream</h2>
                <div className="w-6 h-6 flex items-center justify-center text-primary">
                  <i className="ri-live-line"></i>
                </div>
              </div>
              <Link href="/tin-tuc" className="text-primary font-medium flex items-center hover:underline">
                Xem tất cả
                <div className="w-5 h-5 flex items-center justify-center ml-1">
                  <i className="ri-arrow-right-line"></i>
                </div>
              </Link>
            </div>
            {/* Current/Next Live Stream */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-2/3 relative rounded-lg overflow-hidden bg-gray-200 aspect-video">
                  <img src="https://readdy.ai/api/search-image?query=professional%20stock%20market%20analyst%20explaining%20financial%20charts%20on%20camera%2C%20studio%20setup%20with%20monitors%20showing%20stock%20data%2C%20high%20quality%20lighting%2C%20professional%20equipment%2C%20business%20attire&width=800&height=450&seq=livestream1&orientation=landscape" alt="Live Stream" className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-live-line"></i>
                    </div>
                    LIVE
                  </div>
                </div>
                <div className="w-full md:w-1/3">
                  <h3 className="text-xl font-semibold mb-3">Phân Tích Thị Trường Tuần 23/2025</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <div className="w-5 h-5 flex items-center justify-center mr-2">
                      <i className="ri-user-line"></i>
                    </div>
                    Người dẫn: Trần Đức Minh
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <div className="w-5 h-5 flex items-center justify-center mr-2">
                      <i className="ri-time-line"></i>
                    </div>
                    Thời gian: 19:30 - 21:00, 08/06/2025
                  </div>
                  <p className="text-gray-700 mb-6">Phân tích chi tiết diễn biến thị trường tuần qua và dự báo xu hướng tuần tới. Tập trung vào nhóm cổ phiếu ngân hàng và bất động sản.</p>
                  <button
                    onClick={() => setShowLiveStreamModal(true)}
                    className="bg-primary text-white px-4 py-2 rounded-button text-sm font-medium hover:bg-primary/90 transition whitespace-nowrap"
                  >
                    Đăng Ký Tham Gia
                  </button>
                </div>
              </div>
            </div>
            {/* Upcoming Live Streams */}
            <h3 className="text-xl font-semibold mb-6">Sắp Diễn Ra</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stream 1 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative">
                  <img src="https://readdy.ai/api/search-image?query=stock%20market%20analyst%20discussing%20technical%20analysis%20charts%2C%20professional%20setting%2C%20computer%20screens%20with%20financial%20data%2C%20business%20casual%20attire&width=400&height=225&seq=upcoming1&orientation=landscape" alt="Upcoming Stream" className="w-full h-48 object-cover" />
                  <div className="absolute top-3 right-3 bg-gray-900/80 text-white px-3 py-1 rounded-full text-sm font-medium">10/06/2025</div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold mb-2">Phân Tích Kỹ Thuật Nâng Cao</h4>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-time-line"></i>
                    </div>
                    19:30 - 21:00
                  </div>
                  <p className="text-sm text-gray-700 mb-4">Học cách sử dụng các chỉ báo kỹ thuật nâng cao để dự đoán xu hướng thị trường.</p>
                  <button className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-button text-sm font-medium hover:bg-gray-200 transition whitespace-nowrap">Nhắc Tôi</button>
                </div>
              </div>
              {/* Stream 2 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative">
                  <img src="https://readdy.ai/api/search-image?query=financial%20expert%20analyzing%20company%20fundamentals%2C%20desk%20with%20reports%20and%20laptop%20showing%20financial%20statements%2C%20professional%20office%20environment&width=400&height=225&seq=upcoming2&orientation=landscape" alt="Upcoming Stream" className="w-full h-48 object-cover" />
                  <div className="absolute top-3 right-3 bg-gray-900/80 text-white px-3 py-1 rounded-full text-sm font-medium">12/06/2025</div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold mb-2">Phân Tích Cơ Bản Doanh Nghiệp</h4>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-time-line"></i>
                    </div>
                    20:00 - 21:30
                  </div>
                  <p className="text-sm text-gray-700 mb-4">Hướng dẫn đọc báo cáo tài chính và đánh giá hiệu quả kinh doanh của doanh nghiệp.</p>
                  <button className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-button text-sm font-medium hover:bg-gray-200 transition whitespace-nowrap">Nhắc Tôi</button>
                </div>
              </div>
              {/* Stream 3 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative">
                  <img src="https://readdy.ai/api/search-image?query=investment%20panel%20discussion%20with%20multiple%20experts%2C%20conference%20room%20setting%2C%20presentation%20screen%20showing%20market%20trends%2C%20professional%20business%20environment&width=400&height=225&seq=upcoming3&orientation=landscape" alt="Upcoming Stream" className="w-full h-48 object-cover" />
                  <div className="absolute top-3 right-3 bg-gray-900/80 text-white px-3 py-1 rounded-full text-sm font-medium">15/06/2025</div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold mb-2">Tọa Đàm: Chiến Lược Đầu Tư 2025</h4>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-time-line"></i>
                    </div>
                    19:00 - 21:00
                  </div>
                  <p className="text-sm text-gray-700 mb-4">Thảo luận với các chuyên gia về chiến lược đầu tư hiệu quả trong nửa cuối năm 2025.</p>
                  <button className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-button text-sm font-medium hover:bg-gray-200 transition whitespace-nowrap">Nhắc Tôi</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hot Analysis */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-gray-900">Phân Tích Nổi Bật</h2>
                <div className="w-6 h-6 flex items-center justify-center text-primary">
                  <i className="ri-line-chart-line"></i>
                </div>
              </div>
              <Link href="/tin-tuc" className="text-primary font-medium flex items-center hover:underline">
                Xem tất cả
                <div className="w-5 h-5 flex items-center justify-center ml-1">
                  <i className="ri-arrow-right-line"></i>
                </div>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Analysis 1 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <img src="https://readdy.ai/api/search-image?query=financial%20charts%20and%20graphs%20showing%20market%20trends%2C%20stock%20price%20movements%2C%20technical%20analysis%20patterns%2C%20professional%20data%20visualization&width=400&height=225&seq=analysis1&orientation=landscape" alt="Market Analysis" className="w-full h-48 object-cover" />
                <div className="p-5">
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-calendar-line"></i>
                    </div>
                    07/06/2025
                  </div>
                  <h3 className="text-lg font-semibold mb-3">Xu Hướng Thị Trường Nửa Cuối Năm 2025</h3>
                  <p className="text-gray-700 mb-4">Phân tích các yếu tố vĩ mô tác động đến thị trường chứng khoán Việt Nam trong 6 tháng cuối năm 2025 và các cơ hội đầu tư tiềm năng.</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                        <i className="ri-user-line"></i>
                      </div>
                      <span className="text-sm font-medium">Lê Hoàng Nam</span>
                    </div>
                    <Link href="/nhan-dinh-thi-truong" className="text-primary text-sm font-medium hover:underline">Đọc tiếp</Link>
                  </div>
                </div>
              </div>
              {/* Analysis 2 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <img src="https://readdy.ai/api/search-image?query=real%20estate%20development%20project%20aerial%20view%2C%20modern%20buildings%20and%20construction%20sites%2C%20urban%20planning%20visualization%2C%20property%20investment%20concept&width=400&height=225&seq=analysis2&orientation=landscape" alt="Real Estate Analysis" className="w-full h-48 object-cover" />
                <div className="p-5">
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-calendar-line"></i>
                    </div>
                    06/06/2025
                  </div>
                  <h3 className="text-lg font-semibold mb-3">Triển Vọng Ngành Bất Động Sản 2025-2026</h3>
                  <p className="text-gray-700 mb-4">Đánh giá tình hình thị trường bất động sản, các chính sách mới và cơ hội đầu tư vào cổ phiếu bất động sản trong giai đoạn tới.</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                        <i className="ri-user-line"></i>
                      </div>
                      <span className="text-sm font-medium">Phạm Thị Hương</span>
                    </div>
                    <Link href="/nhan-dinh-thi-truong" className="text-primary text-sm font-medium hover:underline">Đọc tiếp</Link>
                  </div>
                </div>
              </div>
              {/* Analysis 3 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <img src="https://readdy.ai/api/search-image?query=banking%20sector%20concept%2C%20modern%20bank%20building%20exterior%2C%20financial%20institution%2C%20digital%20banking%20technology%2C%20professional%20business%20environment&width=400&height=225&seq=analysis3&orientation=landscape" alt="Banking Analysis" className="w-full h-48 object-cover" />
                <div className="p-5">
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-calendar-line"></i>
                    </div>
                    05/06/2025
                  </div>
                  <h3 className="text-lg font-semibold mb-3">So Sánh Cổ Phiếu Ngân Hàng Quý 2/2025</h3>
                  <p className="text-gray-700 mb-4">Phân tích chi tiết kết quả kinh doanh và định giá cổ phiếu của 10 ngân hàng niêm yết hàng đầu trên thị trường chứng khoán Việt Nam.</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                        <i className="ri-user-line"></i>
                      </div>
                      <span className="text-sm font-medium">Nguyễn Văn Thành</span>
                    </div>
                    <Link href="/nhan-dinh-thi-truong" className="text-primary text-sm font-medium hover:underline">Đọc tiếp</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Knowledge */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-gray-900">Kiến Thức Đầu Tư</h2>
                <div className="w-6 h-6 flex items-center justify-center text-primary">
                  <i className="ri-book-open-line"></i>
                </div>
              </div>
              <Link href="/tin-tuc" className="text-primary font-medium flex items-center hover:underline">
                Xem tất cả
                <div className="w-5 h-5 flex items-center justify-center ml-1">
                  <i className="ri-arrow-right-line"></i>
                </div>
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Article Card 1 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition">
                <div className="relative">
                  <img src="https://readdy.ai/api/search-image?query=professional%20stock%20market%20analysis%20setup%20with%20multiple%20screens%20showing%20technical%20charts%2C%20financial%20data%20visualization%2C%20modern%20office%20environment%2C%20high%20quality%20professional%20photo&width=800&height=400&seq=featured1&orientation=landscape" alt="Featured Article" className="w-full h-[220px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 text-gray-700 rounded-full text-sm font-medium">15 phút đọc</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-calendar-line"></i>
                    </div>
                    04/06/2025
                    <span className="mx-2">•</span>
                    <span className="text-primary">Phân tích kỹ thuật</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition">10 Chỉ Báo Kỹ Thuật Hiệu Quả Nhất Cho Nhà Đầu Tư Mới</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">Hướng dẫn chi tiết về cách sử dụng các chỉ báo kỹ thuật phổ biến như RSI, MACD, Bollinger Bands và cách kết hợp chúng để ra quyết định đầu tư.</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                        <i className="ri-user-line text-gray-600"></i>
                      </div>
                      <span className="text-sm font-medium">Trần Đức Minh</span>
                    </div>
                    <Link href="/kien-thuc-dau-tu" className="text-primary text-sm font-medium hover:underline">Đọc tiếp</Link>
                  </div>
                </div>
              </div>
              {/* Article Card 2 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition">
                <div className="relative">
                  <img src="https://readdy.ai/api/search-image?query=financial%20report%20analysis%2C%20business%20documents%20with%20charts%20and%20graphs%2C%20professional%20desk%20setup&width=800&height=400&seq=article2&orientation=landscape" alt="Article" className="w-full h-[220px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 text-gray-700 rounded-full text-sm font-medium">10 phút đọc</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-calendar-line"></i>
                    </div>
                    03/06/2025
                    <span className="mx-2">•</span>
                    <span className="text-primary">Phân tích cơ bản</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition">Cách Đọc Báo Cáo Tài Chính Doanh Nghiệp Hiệu Quả</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">Hướng dẫn chi tiết cách phân tích các chỉ số tài chính quan trọng và đánh giá hiệu quả hoạt động của doanh nghiệp thông qua báo cáo tài chính.</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                        <i className="ri-user-line text-gray-600"></i>
                      </div>
                      <span className="text-sm font-medium">Phạm Thị Hương</span>
                    </div>
                    <Link href="/kien-thuc-dau-tu" className="text-primary text-sm font-medium hover:underline">Đọc tiếp</Link>
                  </div>
                </div>
              </div>
              {/* Article Card 3 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition">
                <div className="relative">
                  <img src="https://readdy.ai/api/search-image?query=risk%20management%20concept%2C%20financial%20safety%20net%2C%20professional%20investment%20planning%2C%20modern%20business%20setting&width=800&height=400&seq=article3&orientation=landscape" alt="Article" className="w-full h-[220px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 text-gray-700 rounded-full text-sm font-medium">12 phút đọc</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-calendar-line"></i>
                    </div>
                    02/06/2025
                    <span className="mx-2">•</span>
                    <span className="text-primary">Quản lý rủi ro</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition">5 Chiến Lược Quản Lý Rủi Ro Trong Đầu Tư Chứng Khoán</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">Tìm hiểu các phương pháp quản lý rủi ro hiệu quả và xây dựng chiến lược đầu tư an toàn trong thị trường chứng khoán.</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                        <i className="ri-user-line text-gray-600"></i>
                      </div>
                      <span className="text-sm font-medium">Nguyễn Văn Thành</span>
                    </div>
                    <Link href="/kien-thuc-dau-tu" className="text-primary text-sm font-medium hover:underline">Đọc tiếp</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stock News */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-gray-900">Tin Tức Chứng Khoán</h2>
                <div className="w-6 h-6 flex items-center justify-center text-primary">
                  <i className="ri-newspaper-line"></i>
                </div>
              </div>
              <Link href="/tin-tuc" className="text-primary font-medium flex items-center hover:underline">
                Xem tất cả
                <div className="w-5 h-5 flex items-center justify-center ml-1">
                  <i className="ri-arrow-right-line"></i>
                </div>
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Featured News */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-full">
                  <div className="relative">
                    <img src="https://readdy.ai/api/search-image?query=stock%20exchange%20trading%20floor%20with%20traders%20and%20digital%20displays%2C%20busy%20financial%20market%2C%20professional%20business%20environment%2C%20news%20worthy%20moment&width=800&height=400&seq=news1&orientation=landscape" alt="Featured News" className="w-full h-[400px] object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <div className="flex items-center text-xs text-white/80 mb-2">
                        <div className="w-4 h-4 flex items-center justify-center mr-1">
                          <i className="ri-calendar-line"></i>
                        </div>
                        08/06/2025 | 10:30
                      </div>
                      <h3 className="text-2xl font-semibold text-white mb-2">VN-Index vượt mốc 1.250 điểm, thanh khoản tăng mạnh</h3>
                      <p className="text-white/90 line-clamp-2">Thị trường chứng khoán Việt Nam ghi nhận phiên tăng điểm ấn tượng với VN-Index vượt mốc 1.250 điểm, mức cao nhất trong 3 tháng qua. Thanh khoản thị trường tăng mạnh với giá trị giao dịch đạt hơn 15.000 tỷ đồng.</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Recent News List */}
              <div className="lg:col-span-5">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                    {/* News Item 1 */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition cursor-pointer">
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <div className="w-4 h-4 flex items-center justify-center mr-1">
                          <i className="ri-calendar-line"></i>
                        </div>
                        08/06/2025 | 09:15
                        <span className="ml-3 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-medium">Vĩ mô</span>
                      </div>
                      <h4 className="font-semibold mb-2 hover:text-primary transition">Ngân hàng Nhà nước giữ nguyên lãi suất điều hành</h4>
                      <p className="text-gray-700 text-sm line-clamp-2">Ngân hàng Nhà nước Việt Nam quyết định giữ nguyên lãi suất điều hành trong cuộc họp chính sách tiền tệ tháng 6/2025, phù hợp với dự báo của các chuyên gia.</p>
                    </div>
                    {/* News Item 2 */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition cursor-pointer">
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <div className="w-4 h-4 flex items-center justify-center mr-1">
                          <i className="ri-calendar-line"></i>
                        </div>
                        08/06/2025 | 08:45
                        <span className="ml-3 px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-medium">Cổ phiếu</span>
                      </div>
                      <h4 className="font-semibold mb-2 hover:text-primary transition">Vingroup công bố kế hoạch phát hành 500 triệu USD trái phiếu quốc tế</h4>
                      <p className="text-gray-700 text-sm line-clamp-2">Tập đoàn Vingroup (VIC) vừa công bố kế hoạch phát hành 500 triệu USD trái phiếu quốc tế với kỳ hạn 5 năm nhằm tài trợ cho các dự án phát triển mới.</p>
                    </div>
                    {/* News Item 3 */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition cursor-pointer">
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <div className="w-4 h-4 flex items-center justify-center mr-1">
                          <i className="ri-calendar-line"></i>
                        </div>
                        08/06/2025 | 08:30
                        <span className="ml-3 px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-medium">Cổ phiếu</span>
                      </div>
                      <h4 className="font-semibold mb-2 hover:text-primary transition">FPT báo cáo doanh thu quý 2 tăng 25% so với cùng kỳ</h4>
                      <p className="text-gray-700 text-sm line-clamp-2">Công ty Cổ phần FPT (FPT) vừa công bố kết quả kinh doanh quý 2/2025 với doanh thu đạt 12.500 tỷ đồng, tăng 25% so với cùng kỳ năm trước, vượt 5% kế hoạch đề ra.</p>
                    </div>
                    {/* News Item 4 */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition cursor-pointer">
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <div className="w-4 h-4 flex items-center justify-center mr-1">
                          <i className="ri-calendar-line"></i>
                        </div>
                        08/06/2025 | 08:15
                        <span className="ml-3 px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-[10px] font-medium">Quốc tế</span>
                      </div>
                      <h4 className="font-semibold mb-2 hover:text-primary transition">Fed dự kiến giữ nguyên lãi suất trong cuộc họp tháng 6</h4>
                      <p className="text-gray-700 text-sm line-clamp-2">Các chuyên gia dự báo Cục Dự trữ Liên bang Mỹ (Fed) sẽ giữ nguyên lãi suất trong cuộc họp tháng 6 sau khi số liệu việc làm và lạm phát cho thấy dấu hiệu hạ nhiệt.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-2 mb-8">
              <Link href="/doi-ngu-chuyen-gia" className="flex items-center gap-2 hover:text-primary transition">
                <h2 className="text-2xl font-bold text-gray-900">Đội Ngũ Chuyên Gia</h2>
                <div className="w-6 h-6 flex items-center justify-center text-primary">
                  <i className="ri-team-line"></i>
                </div>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Team Member 1 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <img src="https://readdy.ai/api/search-image?query=professional%20asian%20male%20financial%20analyst%20in%20business%20suit%2C%20confident%20pose%2C%20office%20environment%2C%20high%20quality%20professional%20headshot&width=400&height=400&seq=team1&orientation=squarish" alt="Team Member" className="w-full h-64 object-cover" />
                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold mb-1">Trần Đức Minh</h3>
                  <div className="text-primary text-sm font-medium mb-3">Chuyên Gia Phân Tích Kỹ Thuật</div>
                  <p className="text-gray-700 text-sm mb-4">Hơn 15 năm kinh nghiệm phân tích kỹ thuật và giao dịch trên thị trường chứng khoán Việt Nam và quốc tế.</p>
                  <div className="flex justify-center space-x-3">
                    <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition">
                      <i className="ri-facebook-fill"></i>
                    </a>
                    <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition">
                      <i className="ri-youtube-fill"></i>
                    </a>
                    <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition">
                      <i className="ri-tiktok-fill"></i>
                    </a>
                  </div>
                </div>
              </div>
              {/* Team Member 2 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <img src="https://readdy.ai/api/search-image?query=professional%20asian%20female%20financial%20expert%20in%20business%20attire%2C%20confident%20pose%2C%20office%20environment%2C%20high%20quality%20professional%20headshot&width=400&height=400&seq=team2&orientation=squarish" alt="Team Member" className="w-full h-64 object-cover" />
                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold mb-1">Phạm Thị Hương</h3>
                  <div className="text-primary text-sm font-medium mb-3">Chuyên Gia Phân Tích Cơ Bản</div>
                  <p className="text-gray-700 text-sm mb-4">Chuyên gia phân tích tài chính với bằng CFA, từng làm việc tại các công ty chứng khoán hàng đầu trong và ngoài nước.</p>
                  <div className="flex justify-center space-x-3">
                    <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition">
                      <i className="ri-facebook-fill"></i>
                    </a>
                    <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition">
                      <i className="ri-youtube-fill"></i>
                    </a>
                    <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition">
                      <i className="ri-tiktok-fill"></i>
                    </a>
                  </div>
                </div>
              </div>
              {/* Team Member 3 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <img src="https://readdy.ai/api/search-image?query=professional%20asian%20male%20investment%20advisor%20in%20business%20suit%2C%20confident%20pose%2C%20office%20environment%2C%20high%20quality%20professional%20headshot&width=400&height=400&seq=team3&orientation=squarish" alt="Team Member" className="w-full h-64 object-cover" />
                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold mb-1">Nguyễn Văn Thành</h3>
                  <div className="text-primary text-sm font-medium mb-3">Chuyên Gia Ngành Ngân Hàng</div>
                  <p className="text-gray-700 text-sm mb-4">Hơn 10 năm kinh nghiệm trong lĩnh vực ngân hàng và tài chính, chuyên phân tích cổ phiếu ngành ngân hàng.</p>
                  <div className="flex justify-center space-x-3">
                    <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition">
                      <i className="ri-facebook-fill"></i>
                    </a>
                    <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition">
                      <i className="ri-youtube-fill"></i>
                    </a>
                    <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition">
                      <i className="ri-tiktok-fill"></i>
                    </a>
                  </div>
                </div>
              </div>
              {/* Team Member 4 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <img src="https://readdy.ai/api/search-image?query=professional%20asian%20female%20investment%20strategist%20in%20business%20attire%2C%20confident%20pose%2C%20office%20environment%2C%20high%20quality%20professional%20headshot&width=400&height=400&seq=team4&orientation=squarish" alt="Team Member" className="w-full h-64 object-cover" />
                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold mb-1">Lê Hoàng Nam</h3>
                  <div className="text-primary text-sm font-medium mb-3">Chiến Lược Gia Đầu Tư</div>
                  <p className="text-gray-700 text-sm mb-4">Chuyên gia xây dựng chiến lược đầu tư dài hạn, từng quản lý danh mục đầu tư trị giá hàng trăm tỷ đồng.</p>
                  <div className="flex justify-center space-x-3">
                    <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition">
                      <i className="ri-facebook-fill"></i>
                    </a>
                    <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition">
                      <i className="ri-youtube-fill"></i>
                    </a>
                    <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition">
                      <i className="ri-tiktok-fill"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Đăng Ký Nhận Tin</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">Nhận các phân tích thị trường, nhận định cổ phiếu và thông báo về các buổi live stream mới nhất từ TheStockHunters.</p>
            <form action="https://readdy.ai/api/form/d13754j4u8u7tbdlodk0" method="POST" className="max-w-md mx-auto flex gap-2">
              <input type="email" name="subscribeEmail" placeholder="Email của bạn" maxLength={500} className="flex-1 px-4 py-3 rounded-button text-gray-800 border-none" required />
              <button type="submit" className="bg-white text-primary px-6 py-3 rounded-button font-medium hover:bg-gray-100 transition whitespace-nowrap">Đăng Ký</button>
            </form>
          </div>
        </section>

        {/* Live Stream Registration Modal */}
        {showLiveStreamModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={(e) => { if (e.target === e.currentTarget) setShowLiveStreamModal(false) }}
          >
            <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
              <button
                onClick={() => setShowLiveStreamModal(false)}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-close-line text-xl"></i>
                </div>
              </button>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Đăng Ký Tham Gia Live Stream</h2>
              <form onSubmit={handleLiveStreamSubmit} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    maxLength={500}
                    value={liveStreamForm.fullName}
                    onChange={(e) => setLiveStreamForm({ ...liveStreamForm, fullName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-button focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="streamEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="streamEmail"
                    name="streamEmail"
                    maxLength={500}
                    value={liveStreamForm.streamEmail}
                    onChange={(e) => setLiveStreamForm({ ...liveStreamForm, streamEmail: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-button focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại (tùy chọn)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    maxLength={500}
                    value={liveStreamForm.phone}
                    onChange={(e) => setLiveStreamForm({ ...liveStreamForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-button focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="notification"
                    name="notification"
                    checked={liveStreamForm.notification}
                    onChange={(e) => setLiveStreamForm({ ...liveStreamForm, notification: e.target.checked })}
                    className="mt-1 w-4 h-4 text-primary border-gray-300 rounded"
                  />
                  <label htmlFor="notification" className="ml-2 text-sm text-gray-700">Tôi muốn nhận thông báo trước khi buổi live stream bắt đầu</label>
                </div>
                <button type="submit" className="w-full bg-primary text-white py-2 rounded-button font-medium hover:bg-primary/90 transition">Xác Nhận Đăng Ký</button>
              </form>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={(e) => { if (e.target === e.currentTarget) setShowSuccessModal(false) }}
          >
            <div className="bg-white rounded-lg w-full max-w-md p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-check-line text-3xl text-green-500"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Đăng Ký Thành Công!</h3>
              <p className="text-gray-600 mb-6">Chúng tôi đã gửi email xác nhận cho bạn. Hãy kiểm tra hộp thư để xem thông tin chi tiết về buổi live stream.</p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="bg-primary text-white px-6 py-2 rounded-button font-medium hover:bg-primary/90 transition"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
