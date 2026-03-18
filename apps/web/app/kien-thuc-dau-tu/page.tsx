"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"

export default function KienThucDauTu() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="absolute inset-0 z-0">
            <img src="https://readdy.ai/api/search-image?query=investment%2520education%2520concept%2520with%2520financial%2520charts%2520and%2520books%2520on%2520desk%2520in%2520modern%2520office%252C%2520blue%2520color%2520scheme%252C%2520high%2520quality%2520professional%2520photo&width=1920&height=500&seq=hero_bg_kienthuc&orientation=landscape" alt="Hero Background" className="w-full h-full object-cover opacity-20" />
          </div>
          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Kiến Thức Đầu Tư Chứng Khoán</h1>
              <p className="text-lg text-blue-100 mb-8">Nâng cao kiến thức và kỹ năng đầu tư của bạn với các bài viết, video, podcast và lộ trình học tập được thiết kế bởi các chuyên gia hàng đầu.</p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-primary px-6 py-3 rounded-button font-medium hover:bg-gray-100 transition whitespace-nowrap flex items-center">
                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                    <i className="ri-book-open-line"></i>
                  </div>
                  Khám Phá Ngay
                </button>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-button font-medium hover:bg-blue-700 transition whitespace-nowrap flex items-center border border-blue-400">
                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                    <i className="ri-road-map-line"></i>
                  </div>
                  Lộ Trình Học Tập
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="bg-white border-b border-gray-200 sticky top-[57px] z-40">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto category-filter">
              {[
                { id: "all", icon: "ri-apps-line", label: "Tất Cả" },
                { id: "videos", icon: "ri-video-line", label: "Video" },
                { id: "articles", icon: "ri-article-line", label: "Bài Viết" },
                { id: "podcasts", icon: "ri-mic-line", label: "Podcast" },
                { id: "learning-paths", icon: "ri-road-map-line", label: "Lộ Trình" },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-button py-4 px-6 font-medium border-b-2 ${activeTab === tab.id ? "text-primary border-primary" : "text-gray-600 hover:text-primary border-transparent"}`}
                >
                  <div className="flex items-center">
                    <div className="w-5 h-5 flex items-center justify-center mr-2">
                      <i className={tab.icon}></i>
                    </div>
                    {tab.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* Learning Paths */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Lộ Trình Học Tập</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: "ri-seedling-line", color: "bg-green-100 text-green-800", title: "Nhà Đầu Tư Mới Bắt Đầu", desc: "Từ những kiến thức cơ bản đến kỹ năng đầu tư thực chiến", articles: 12, videos: 8, duration: "15 giờ" },
                { icon: "ri-line-chart-line", color: "bg-blue-100 text-primary", title: "Phân Tích Kỹ Thuật Nâng Cao", desc: "Nắm vững các công cụ phân tích kỹ thuật chuyên sâu và chiến lược giao dịch", articles: 15, videos: 10, duration: "20 giờ" },
                { icon: "ri-building-2-line", color: "bg-orange-100 text-orange-800", title: "Phân Tích Cơ Bản Doanh Nghiệp", desc: "Phương pháp đánh giá doanh nghiệp và lựa chọn cổ phiếu giá trị", articles: 10, videos: 10, duration: "18 giờ" },
              ].map((path, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-5">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${path.color}`}>
                      <i className={`${path.icon} text-xl`}></i>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{path.title}</h3>
                    <p className="text-sm text-gray-700 mb-4">{path.desc}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-article-line"></i></div>
                        <span>{path.articles} bài viết</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-video-line"></i></div>
                        <span>{path.videos} video</span>
                      </div>
                    </div>
                    <a href="#" className="text-primary text-sm font-medium hover:underline flex items-center">
                      <span>Xem tất cả</span>
                      <div className="w-5 h-5 flex items-center justify-center ml-1"><i className="ri-arrow-right-line"></i></div>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Content */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Nội Dung Mới Nhất</h2>
              <div className="flex items-center">
                <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition whitespace-nowrap mr-2">
                  <div className="flex items-center">
                    <div className="w-5 h-5 flex items-center justify-center mr-1"><i className="ri-filter-3-line"></i></div>
                    <span>Lọc</span>
                  </div>
                </button>
                <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-5 h-5 flex items-center justify-center mr-1"><i className="ri-sort-desc"></i></div>
                    <span>Mới nhất</span>
                  </div>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Video Content Item */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative video-thumbnail aspect-video">
                  <img src="https://readdy.ai/api/search-image?query=stock%2520market%2520technical%2520analysis%2520expert%2520explaining%2520chart%2520patterns%2520and%2520trading%2520strategies%252C%2520professional%2520setting%2520with%2520multiple%2520monitors%2520showing%2520financial%2520charts%252C%2520high%2520quality%2520professional%2520photo&width=400&height=225&seq=latest1&orientation=landscape" alt="Video Content" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center play-icon opacity-80">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                      <i className="ri-play-fill text-primary text-xl"></i>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">28:45</div>
                </div>
                <div className="p-4">
                  <div className="flex items-center text-xs text-primary font-medium mb-2">
                    <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-video-line"></i></div>
                    <span className="mr-2">Video</span>
                    <span className="text-gray-500">•</span>
                    <span className="ml-2">Phân Tích Kỹ Thuật</span>
                  </div>
                  <h3 className="font-bold mb-2">Chiến Lược Giao Dịch Theo Xu Hướng: Phương Pháp Xác Định Xu Hướng Chính Xác</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-user-line"></i></div>
                    <span className="mr-3">Lê Minh Tú</span>
                    <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-calendar-line"></i></div>
                    <span>08/06/2025</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">Học cách xác định xu hướng thị trường bằng các công cụ như đường trung bình động, MACD và RSI để đưa ra quyết định giao dịch hiệu quả.</p>
                  <a href="#" className="text-primary text-sm font-medium hover:underline">Xem ngay</a>
                </div>
              </div>

              {/* Article Content Item */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center text-xs text-primary font-medium mb-2">
                    <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-article-line"></i></div>
                    <span className="mr-2">Bài Viết</span>
                    <span className="text-gray-500">•</span>
                    <span className="ml-2">Phân Tích Cơ Bản</span>
                  </div>
                  <h3 className="font-bold mb-2">Phân Tích Báo Cáo Tài Chính Quý 1/2025 Của Nhóm Ngân Hàng</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-user-line"></i></div>
                    <span className="mr-3">Trần Thị Mai</span>
                    <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-calendar-line"></i></div>
                    <span>07/06/2025</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">Đánh giá chi tiết kết quả kinh doanh quý 1/2025 của các ngân hàng niêm yết, so sánh các chỉ số tài chính quan trọng và triển vọng tăng trưởng.</p>
                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-time-line"></i></div>
                      <span>Thời gian đọc: 12 phút</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-bar-chart-line"></i></div>
                      <span>Cấp độ: Trung cấp</span>
                    </div>
                  </div>
                  <a href="#" className="text-primary text-sm font-medium hover:underline">Đọc tiếp</a>
                </div>
              </div>

              {/* Podcast Content Item */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center text-xs text-primary font-medium mb-2">
                    <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-mic-line"></i></div>
                    <span className="mr-2">Podcast</span>
                    <span className="text-gray-500">•</span>
                    <span className="ml-2">Kinh Tế Vĩ Mô</span>
                  </div>
                  <h3 className="font-bold mb-2">Tác Động Của Chính Sách Tiền Tệ FED Đến Thị Trường Chứng Khoán Việt Nam</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-user-line"></i></div>
                    <span className="mr-3">TS. Nguyễn Văn Hùng</span>
                    <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-calendar-line"></i></div>
                    <span>06/06/2025</span>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full mr-3">
                        <i className="ri-play-fill text-xl"></i>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium mb-1">Tác Động Của Chính Sách Tiền Tệ FED</div>
                        <div className="flex items-center text-xs text-gray-500">
                          <span className="mr-3">42:18</span>
                          <span>06/06/2025</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-300 h-1 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: "35%" }}></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">Phân tích mối quan hệ giữa chính sách tiền tệ của FED và diễn biến thị trường chứng khoán Việt Nam, cùng dự báo xu hướng trong thời gian tới.</p>
                  <a href="#" className="text-primary text-sm font-medium hover:underline">Nghe ngay</a>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-button text-sm font-medium hover:bg-gray-50 transition whitespace-nowrap">Xem Thêm</button>
            </div>
          </div>

          {/* Video Analysis Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Video Phân Tích Đầu Tư</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { seq: "video1", title: "Phân Tích Xu Hướng VN-Index Tháng 6/2025", author: "Trần Đức Minh", views: "3,245", tag: "Phân Tích Kỹ Thuật", duration: "32:18" },
                { seq: "video2", title: "Đánh Giá Cổ Phiếu Ngân Hàng: VCB, TCB, MBB", author: "Nguyễn Thị Hương", views: "2,876", tag: "Phân Tích Cơ Bản", duration: "45:32" },
                { seq: "video3", title: "Triển Vọng Kinh Tế Việt Nam Nửa Cuối Năm 2025", author: "TS. Phạm Văn Đức", views: "3,512", tag: "Kinh Tế Vĩ Mô", duration: "38:45" },
              ].map(v => (
                <div key={v.seq} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="relative video-thumbnail aspect-video">
                    <img src={`https://readdy.ai/api/search-image?query=financial%2520expert%2520video%2520analysis&width=400&height=225&seq=${v.seq}&orientation=landscape`} alt="Video Analysis" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center play-icon opacity-80">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                        <i className="ri-play-fill text-primary text-xl"></i>
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">{v.duration}</div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center text-xs text-primary font-medium mb-2">
                      <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-video-line"></i></div>
                      <span>{v.tag}</span>
                    </div>
                    <h3 className="font-bold mb-2">{v.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-user-line"></i></div>
                      <span className="mr-3">{v.author}</span>
                      <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-eye-line"></i></div>
                      <span>{v.views} lượt xem</span>
                    </div>
                    <a href="#" className="text-primary text-sm font-medium hover:underline">Xem ngay</a>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-button text-sm font-medium hover:bg-gray-50 transition whitespace-nowrap">Xem Thêm Video</button>
            </div>
          </div>

          {/* Podcast Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Podcast Phân Tích Đầu Tư</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Featured Podcast */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center text-xs text-primary font-medium mb-3">
                    <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-mic-line"></i></div>
                    <span>Podcast Nổi Bật</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Tọa Đàm: Chiến Lược Đầu Tư Chứng Khoán Nửa Cuối Năm 2025</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-user-line"></i></div>
                    <span className="mr-3">Nhiều chuyên gia</span>
                    <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-time-line"></i></div>
                    <span>52:18</span>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 mb-4">
                    <div className="flex items-center mb-3">
                      <button className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full mr-4">
                        <i className="ri-play-fill text-2xl"></i>
                      </button>
                      <div className="flex-1">
                        <div className="text-sm font-medium mb-1">Tọa Đàm: Chiến Lược Đầu Tư Chứng Khoán</div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>05/06/2025</span>
                          <span>52:18</span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="w-full bg-gray-300 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-4">
                        <button className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-primary"><i className="ri-skip-back-line"></i></button>
                        <button className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-primary"><i className="ri-rewind-line"></i></button>
                      </div>
                      <div className="flex space-x-4">
                        <button className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-primary"><i className="ri-speed-line"></i></button>
                        <button className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-primary"><i className="ri-download-line"></i></button>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">Cuộc tọa đàm với sự tham gia của các chuyên gia hàng đầu về thị trường chứng khoán Việt Nam, thảo luận về triển vọng thị trường và chiến lược đầu tư hiệu quả trong nửa cuối năm 2025.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Chiến lược đầu tư</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Thị trường chứng khoán</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Dự báo</span>
                  </div>
                  <div className="flex gap-3">
                    <button className="bg-primary text-white px-4 py-2 rounded-button text-sm font-medium hover:bg-primary/90 transition whitespace-nowrap flex items-center">
                      <div className="w-5 h-5 flex items-center justify-center mr-1"><i className="ri-play-circle-line"></i></div>
                      Nghe Ngay
                    </button>
                    <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-button text-sm font-medium hover:bg-gray-200 transition whitespace-nowrap flex items-center">
                      <div className="w-5 h-5 flex items-center justify-center mr-1"><i className="ri-download-line"></i></div>
                      Tải Về
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Podcasts */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-4">Podcast Gần Đây</h3>
                  <div className="space-y-4 custom-scrollbar overflow-y-auto max-h-[400px] pr-2">
                    {[
                      { title: "Phân Tích Ngành Bất Động Sản: Cơ Hội và Thách Thức", author: "Lê Minh Tú", duration: "38:45" },
                      { title: "Chiến Lược Đầu Tư Vào Cổ Phiếu Giá Trị", author: "Trần Thị Mai", duration: "42:18" },
                      { title: "Tác Động Của Lạm Phát Đến Thị Trường Chứng Khoán", author: "TS. Nguyễn Văn Hùng", duration: "45:32" },
                      { title: "Phân Tích Cổ Phiếu Ngành Công Nghệ: FPT, CMG, VNG", author: "Đỗ Minh Quân", duration: "36:15" },
                      { title: "Chiến Lược Đầu Tư Theo Xu Hướng Thị Trường", author: "Nguyễn Thị Lan Anh", duration: "40:28" },
                    ].map((pod, i) => (
                      <div key={i} className={`flex items-start ${i < 4 ? "border-b border-gray-100 pb-4" : ""}`}>
                        <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-primary rounded-lg mr-3 flex-shrink-0">
                          <i className="ri-mic-line"></i>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{pod.title}</h4>
                          <div className="flex items-center text-xs text-gray-500 mb-2">
                            <div className="w-3 h-3 flex items-center justify-center mr-1"><i className="ri-user-line"></i></div>
                            <span className="mr-2">{pod.author}</span>
                            <div className="w-3 h-3 flex items-center justify-center mr-1"><i className="ri-time-line"></i></div>
                            <span>{pod.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <button className="w-7 h-7 flex items-center justify-center bg-primary text-white rounded-full mr-2">
                              <i className="ri-play-fill"></i>
                            </button>
                            <div className="flex-1">
                              <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
                                <div className="bg-primary h-full rounded-full" style={{ width: "0%" }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5">
                    <a href="#" className="text-primary font-medium hover:underline flex items-center justify-center">
                      <span>Xem tất cả podcast</span>
                      <div className="w-5 h-5 flex items-center justify-center ml-1"><i className="ri-arrow-right-line"></i></div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <section className="py-12 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-white mb-3">Đăng Ký Nhận Bản Tin Kiến Thức Đầu Tư</h2>
              <p className="text-blue-100 mb-8">Nhận những bài viết, video và podcast mới nhất về đầu tư chứng khoán. Cập nhật kiến thức và nâng cao kỹ năng đầu tư của bạn!</p>
              <form className="max-w-md mx-auto flex gap-2">
                <input type="email" placeholder="Email của bạn" className="flex-1 px-4 py-3 rounded-button text-gray-800 border-none" />
                <button type="submit" className="bg-white text-primary px-6 py-3 rounded-button font-medium hover:bg-gray-100 transition whitespace-nowrap">Đăng Ký</button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
