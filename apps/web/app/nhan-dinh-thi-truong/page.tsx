"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"

export default function NhanDinhThiTruong() {
  const [activeTab, setActiveTab] = useState("articles")
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showDateDropdown, setShowDateDropdown] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [showCustomDate, setShowCustomDate] = useState(false)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest(".filter-container")) {
        setShowCategoryDropdown(false)
        setShowDateDropdown(false)
        setShowSortDropdown(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  return (
    <>
      <Navbar />
      <main>
        {/* Page Title */}
        <section className="bg-white border-b border-gray-200 sticky top-[60px] z-40">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Nhận Định Thị Trường</h1>
          </div>
        </section>

        {/* Video Highlights Section */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Video Nổi Bật</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Featured Video 1 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative video-thumbnail aspect-video">
                  <img src="https://readdy.ai/api/search-image?query=professional%2520stock%2520market%2520analyst%2520explaining%2520financial%2520charts%2520on%2520camera%252C%2520studio%2520setup%2520with%2520multiple%2520monitors%2520showing%2520stock%2520data%2520in%2520background%252C%2520high-quality%2520lighting%252C%2520professional%2520equipment%252C%2520business%2520attire%252C%2520engaging%2520presentation%2520style&width=400&height=225&seq=featured_video1&orientation=landscape" alt="Video nổi bật" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center play-icon">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                      <i className="ri-play-fill text-primary text-2xl"></i>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    25:16
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center text-xs text-primary font-medium mb-2">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-price-tag-3-line"></i>
                    </div>
                    Nhận định hàng tuần
                  </div>
                  <h3 className="font-semibold text-base mb-2 line-clamp-2">Nhận Định Thị Trường Tuần 23/2025: Cơ Hội Đầu Tư Nhóm Cổ Phiếu Ngân Hàng</h3>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <div className="w-3 h-3 flex items-center justify-center mr-1">
                        <i className="ri-eye-line"></i>
                      </div>
                      <span>2,458 lượt xem</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 flex items-center justify-center mr-1">
                        <i className="ri-time-line"></i>
                      </div>
                      <span>08/06/2025</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Featured Video 2 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative video-thumbnail aspect-video">
                  <img src="https://readdy.ai/api/search-image?query=stock%2520market%2520analyst%2520explaining%2520technical%2520analysis%2520with%2520charts%2520and%2520graphs%252C%2520professional%2520studio%2520setting%252C%2520multiple%2520monitors%2520with%2520financial%2520data%252C%2520high%2520quality%2520professional%2520photo&width=400&height=225&seq=featured_video2&orientation=landscape" alt="Video phân tích" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center play-icon">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                      <i className="ri-play-fill text-primary text-2xl"></i>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    18:42
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center text-xs text-primary font-medium mb-2">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-price-tag-3-line"></i>
                    </div>
                    Phân tích kỹ thuật
                  </div>
                  <h3 className="font-semibold text-base mb-2 line-clamp-2">Phân Tích Kỹ Thuật VN-Index: Xu Hướng Tháng 6/2025</h3>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <div className="w-3 h-3 flex items-center justify-center mr-1">
                        <i className="ri-eye-line"></i>
                      </div>
                      <span>1,245 lượt xem</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 flex items-center justify-center mr-1">
                        <i className="ri-time-line"></i>
                      </div>
                      <span>07/06/2025</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Featured Video 3 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative video-thumbnail aspect-video">
                  <img src="https://readdy.ai/api/search-image?query=financial%2520expert%2520explaining%2520market%2520outlook%252C%2520professional%2520studio%2520setting%252C%2520presentation%2520with%2520economic%2520data%2520charts%252C%2520business%2520formal%2520attire%252C%2520high%2520quality%2520professional%2520photo&width=400&height=225&seq=featured_video3&orientation=landscape" alt="Video phân tích" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center play-icon">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                      <i className="ri-play-fill text-primary text-2xl"></i>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    22:15
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center text-xs text-primary font-medium mb-2">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-price-tag-3-line"></i>
                    </div>
                    Nhận định hàng tuần
                  </div>
                  <h3 className="font-semibold text-base mb-2 line-clamp-2">Nhận Định Thị Trường Tuần 22/2025: Cơ Hội Đầu Tư Nhóm Bất Động Sản</h3>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <div className="w-3 h-3 flex items-center justify-center mr-1">
                        <i className="ri-eye-line"></i>
                      </div>
                      <span>2,345 lượt xem</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 flex items-center justify-center mr-1">
                        <i className="ri-time-line"></i>
                      </div>
                      <span>01/06/2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Tabs Section */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            {/* Tab Navigation */}
            <div className="flex overflow-x-auto category-filter mb-6 border-b border-gray-200">
              <button
                className={`tab-btn px-6 py-3 font-medium ${activeTab === "articles" ? "text-primary border-b-2 border-primary" : "text-gray-600 hover:text-gray-900"}`}
                onClick={() => setActiveTab("articles")}
              >
                Bài viết phân tích
              </button>
              <button
                className={`tab-btn px-6 py-3 font-medium ${activeTab === "videos" ? "text-primary border-b-2 border-primary" : "text-gray-600 hover:text-gray-900"}`}
                onClick={() => setActiveTab("videos")}
              >
                Videos
              </button>
              <button
                className={`tab-btn px-6 py-3 font-medium ${activeTab === "shorts" ? "text-primary border-b-2 border-primary" : "text-gray-600 hover:text-gray-900"}`}
                onClick={() => setActiveTab("shorts")}
              >
                Shorts
              </button>
            </div>

            {/* Filter Section */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {/* Category Filter */}
              <div className="relative filter-container">
                <button
                  onClick={() => { setShowCategoryDropdown(!showCategoryDropdown); setShowDateDropdown(false); setShowSortDropdown(false) }}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-button text-sm hover:bg-gray-50"
                >
                  <i className="ri-price-tag-3-line"></i>
                  <span>Danh mục</span>
                  <i className="ri-arrow-down-s-line"></i>
                </button>
                {showCategoryDropdown && (
                  <div className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-2 min-w-[200px] z-50 top-full left-0">
                    <div className="flex flex-col gap-1">
                      {["Nhận định hàng ngày", "Nhận định hàng tuần", "Phân tích kỹ thuật", "Phân tích cơ bản", "Phân tích vĩ mô"].map(cat => (
                        <label key={cat} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                          <input type="checkbox" className="mr-2" />
                          <span>{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Date Filter */}
              <div className="relative filter-container">
                <button
                  onClick={() => { setShowDateDropdown(!showDateDropdown); setShowCategoryDropdown(false); setShowSortDropdown(false) }}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-button text-sm hover:bg-gray-50"
                >
                  <i className="ri-calendar-line"></i>
                  <span>Thời gian</span>
                  <i className="ri-arrow-down-s-line"></i>
                </button>
                {showDateDropdown && (
                  <div className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[240px] z-50 top-full left-0">
                    <div className="flex flex-col gap-2">
                      {[{ val: "all", label: "Tất cả" }, { val: "today", label: "Hôm nay" }, { val: "week", label: "Tuần này" }, { val: "month", label: "Tháng này" }].map(opt => (
                        <label key={opt.val} className="flex items-center hover:bg-gray-50 p-2 rounded cursor-pointer">
                          <input type="radio" name="date-filter" value={opt.val} className="mr-2" defaultChecked={opt.val === "all"} />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                      <label className="flex items-center hover:bg-gray-50 p-2 rounded cursor-pointer">
                        <input type="radio" name="date-filter" value="custom" className="mr-2" onChange={() => setShowCustomDate(true)} />
                        <span>Tùy chọn</span>
                      </label>
                      {showCustomDate && (
                        <div className="pl-6 flex gap-2">
                          <input type="date" className="px-2 py-1 border border-gray-200 rounded text-sm" />
                          <span className="text-gray-400">đến</span>
                          <input type="date" className="px-2 py-1 border border-gray-200 rounded text-sm" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Sort Filter */}
              <div className="relative filter-container">
                <button
                  onClick={() => { setShowSortDropdown(!showSortDropdown); setShowCategoryDropdown(false); setShowDateDropdown(false) }}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-button text-sm hover:bg-gray-50"
                >
                  <i className="ri-sort-desc"></i>
                  <span>Sắp xếp</span>
                  <i className="ri-arrow-down-s-line"></i>
                </button>
                {showSortDropdown && (
                  <div className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-2 min-w-[180px] z-50 top-full left-0">
                    <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded"><i className="ri-time-line mr-2"></i>Mới nhất</button>
                    <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded"><i className="ri-eye-line mr-2"></i>Xem nhiều nhất</button>
                    <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded"><i className="ri-heart-line mr-2"></i>Được yêu thích</button>
                  </div>
                )}
              </div>

              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 text-sm">
                <i className="ri-refresh-line"></i>
                <span>Xóa bộ lọc</span>
              </button>
            </div>

            {/* Articles Tab */}
            {activeTab === "articles" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Featured Article */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <img src="https://readdy.ai/api/search-image?query=professional%2520stock%2520market%2520analysis%2520with%2520detailed%2520financial%2520charts%252C%2520modern%2520data%2520visualization%252C%2520clean%2520design%252C%2520blue%2520and%2520white%2520theme%252C%2520high%2520quality%2520business%2520presentation&width=600&height=400&seq=featured_article&orientation=landscape" alt="Phân tích thị trường" className="w-full h-full object-cover" />
                    <div className="p-6 flex flex-col justify-center relative">
                      <div className="absolute top-6 left-6">
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">Nổi bật</span>
                      </div>
                      <div className="flex items-center text-xs text-primary font-medium mb-3 mt-8">
                        <div className="w-4 h-4 flex items-center justify-center mr-1">
                          <i className="ri-price-tag-3-line"></i>
                        </div>
                        <span>Phân tích vĩ mô</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-4">Phân Tích Tác Động Của Lãi Suất FED Đến TTCK Việt Nam Nửa Cuối 2025</h3>
                      <p className="text-gray-700 mb-6">Báo cáo phân tích chuyên sâu về mối quan hệ giữa chính sách lãi suất của FED và diễn biến thị trường chứng khoán Việt Nam. Đánh giá tác động của các quyết định lãi suất sắp tới và đề xuất chiến lược đầu tư phù hợp.</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center text-sm text-gray-500">
                          <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-user-line"></i></div>
                          <span>Đỗ Thị Mai</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-time-line"></i></div>
                          <span>08/06/2025</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Article 1 */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <img src="https://readdy.ai/api/search-image?query=stock%2520market%2520chart%2520analysis%2520with%2520financial%2520data%2520overlay%252C%2520professional%2520business%2520chart%2520visualization%252C%2520clean%2520design%252C%2520blue%2520and%2520white%2520color%2520scheme&width=400&height=225&seq=article1&orientation=landscape" alt="Phân tích thị trường" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="flex items-center text-xs text-primary font-medium mb-2">
                      <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-price-tag-3-line"></i></div>
                      <span>Nhận định hàng ngày</span>
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2">Nhận Định Thị Trường Ngày 08/06/2025: Nhóm Cổ Phiếu Dầu Khí Dẫn Dắt</h3>
                    <p className="text-sm text-gray-700 mb-3 line-clamp-3">Thị trường chứng khoán Việt Nam hôm nay ghi nhận phiên tăng điểm tích cực với sự dẫn dắt từ nhóm cổ phiếu dầu khí. VN-Index tăng 8,5 điểm (+0,7%) lên mức 1.285 điểm với thanh khoản cải thiện so với phiên trước đó.</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500"><div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-user-line"></i></div><span>Nguyễn Thị Hương</span></div>
                      <div className="flex items-center text-sm text-gray-500"><div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-time-line"></i></div><span>08/06/2025</span></div>
                    </div>
                  </div>
                </div>

                {/* Article 2 */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <img src="https://readdy.ai/api/search-image?query=financial%2520report%2520with%2520charts%2520and%2520company%2520analysis%252C%2520professional%2520business%2520document%252C%2520clean%2520design%252C%2520financial%2520data%2520visualization&width=400&height=225&seq=article2&orientation=landscape" alt="Phân tích cơ bản" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="flex items-center text-xs text-primary font-medium mb-2">
                      <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-price-tag-3-line"></i></div>
                      <span>Phân tích cơ bản</span>
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2">Phân Tích Cơ Bản Ngành Ngân Hàng Quý 2/2025: Triển Vọng Tăng Trưởng</h3>
                    <p className="text-sm text-gray-700 mb-3 line-clamp-3">Báo cáo phân tích chi tiết về tình hình kinh doanh của các ngân hàng niêm yết trong quý 2/2025. Đánh giá triển vọng tăng trưởng lợi nhuận, chất lượng tài sản và khả năng sinh lời của các ngân hàng.</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500"><div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-user-line"></i></div><span>Phạm Minh Tuấn</span></div>
                      <div className="flex items-center text-sm text-gray-500"><div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-time-line"></i></div><span>06/06/2025</span></div>
                    </div>
                  </div>
                </div>

                {/* Article 3 */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <img src="https://readdy.ai/api/search-image?query=macroeconomic%2520analysis%2520with%2520charts%2520showing%2520GDP%2520growth%252C%2520inflation%252C%2520and%2520interest%2520rates%252C%2520professional%2520economic%2520data%2520visualization%252C%2520clean%2520design&width=400&height=225&seq=article3&orientation=landscape" alt="Phân tích vĩ mô" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="flex items-center text-xs text-primary font-medium mb-2">
                      <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-price-tag-3-line"></i></div>
                      Phân tích vĩ mô
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2">Phân Tích Tác Động Của Lãi Suất FED Đến Thị Trường Chứng Khoán Việt Nam</h3>
                    <p className="text-sm text-gray-700 mb-3 line-clamp-3">Phân tích chi tiết về mối quan hệ giữa chính sách lãi suất của Cục Dự trữ Liên bang Mỹ (FED) và diễn biến của thị trường chứng khoán Việt Nam. Đánh giá tác động của các quyết định lãi suất sắp tới.</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500"><div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-user-line"></i></div><span>Đỗ Thị Mai</span></div>
                      <div className="flex items-center text-sm text-gray-500"><div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-time-line"></i></div><span>05/06/2025</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Videos Tab */}
            {activeTab === "videos" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { seq: "video1", tag: "Phân tích kỹ thuật", title: "Phân Tích Kỹ Thuật VN-Index: Xu Hướng Tháng 6/2025", author: "Lê Văn Thành", views: "1,245", date: "07/06/2025", duration: "18:42" },
                  { seq: "video2", tag: "Nhận định hàng tuần", title: "Nhận Định Thị Trường Tuần 22/2025: Cơ Hội Đầu Tư Nhóm Bất Động Sản", author: "Trần Đức Minh", views: "2,345", date: "01/06/2025", duration: "22:15" },
                  { seq: "video3", tag: "Phân tích cơ bản", title: "Phân Tích Cơ Bản: Định Giá Cổ Phiếu Theo Phương Pháp DCF", author: "Phạm Minh Tuấn", views: "1,876", date: "28/05/2025", duration: "25:38" },
                  { seq: "video4", tag: "Tọa đàm", title: "Tọa Đàm: Triển Vọng Thị Trường Chứng Khoán Việt Nam 2025", author: "Nhiều chuyên gia", views: "3,210", date: "25/05/2025", duration: "28:42" },
                  { seq: "video5", tag: "Phân tích kỹ thuật", title: "Phân Tích Kỹ Thuật: Nhận Diện Mô Hình Giá Hiệu Quả", author: "Lê Văn Thành", views: "2,156", date: "22/05/2025", duration: "19:24" },
                  { seq: "video6", tag: "Hướng dẫn đầu tư", title: "Chiến Lược Quản Lý Rủi Ro Trong Đầu Tư Chứng Khoán", author: "Nguyễn Thị Hương", views: "1,945", date: "18/05/2025", duration: "23:15" },
                ].map((v) => (
                  <div key={v.seq} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <div className="relative video-thumbnail">
                      <img src={`https://readdy.ai/api/search-image?query=stock%2520market%2520analyst%2520video&width=400&height=225&seq=${v.seq}&orientation=landscape`} alt={v.title} className="w-full h-48 object-cover" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center play-icon">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                          <i className="ri-play-fill text-primary text-xl"></i>
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">{v.duration}</div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center text-xs text-primary font-medium mb-2">
                        <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-price-tag-3-line"></i></div>
                        {v.tag}
                      </div>
                      <h3 className="font-semibold mb-2 line-clamp-2">{v.title}</h3>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center text-sm text-gray-500"><div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-user-line"></i></div><span>{v.author}</span></div>
                        <div className="flex items-center text-sm text-gray-500"><div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-eye-line"></i></div><span>{v.views} lượt xem</span></div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500"><div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-time-line"></i></div><span>{v.date}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Shorts Tab */}
            {activeTab === "shorts" && (
              <div style={{ columnCount: 4, columnGap: "16px" }} className="shorts-grid">
                {[
                  { seq: "short_video1", title: "Mô hình đảo chiều xu hướng - Phân tích kỹ thuật", author: "Lê Văn Thành", views: "1.2K", duration: "1:25" },
                  { seq: "short_video2", title: "3 chỉ số định giá cổ phiếu quan trọng nhất", author: "Phạm Minh Tuấn", views: "2.5K", duration: "0:58" },
                  { seq: "short_video3", title: "Dòng tiền đang chảy vào nhóm ngành nào?", author: "Trần Đức Minh", views: "1.8K", duration: "1:12" },
                  { seq: "short_video4", title: "Chiến lược đầu tư trong thị trường biến động", author: "Nguyễn Thị Hương", views: "3.1K", duration: "0:45" },
                  { seq: "short_video5", title: "5 bước xác định điểm vào lệnh hiệu quả", author: "Lê Văn Thành", views: "2.8K", duration: "1:05" },
                  { seq: "short_video6", title: "Cách lọc cổ phiếu tiềm năng trong 2 phút", author: "Phạm Minh Tuấn", views: "1.9K", duration: "0:52" },
                  { seq: "short_video7", title: "3 nguyên tắc quản trị rủi ro mọi nhà đầu tư cần biết", author: "Đỗ Thị Mai", views: "2.3K", duration: "1:18" },
                  { seq: "short_video8", title: "Phân biệt các nhóm ngành trên TTCK Việt Nam", author: "Trần Đức Minh", views: "1.7K", duration: "0:48" },
                ].map((s) => (
                  <div key={s.seq} style={{ breakInside: "avoid", marginBottom: "16px" }}>
                    <div className="relative video-thumbnail rounded-lg overflow-hidden">
                      <div className="aspect-[9/16] relative">
                        <img src={`https://readdy.ai/api/search-image?query=stock%2520market%2520short%2520video&width=270&height=480&seq=${s.seq}&orientation=portrait`} alt="Video ngắn" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center play-icon">
                          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                            <i className="ri-play-fill text-primary text-xl"></i>
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">{s.duration}</div>
                      </div>
                      <div className="p-3 bg-white">
                        <h4 className="font-medium text-sm">{s.title}</h4>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center text-xs text-gray-500"><div className="w-3 h-3 flex items-center justify-center mr-1"><i className="ri-user-line"></i></div><span>{s.author}</span></div>
                          <div className="flex items-center text-xs text-gray-500"><div className="w-3 h-3 flex items-center justify-center mr-1"><i className="ri-eye-line"></i></div><span>{s.views}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 text-center">
              <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-button text-sm font-medium hover:bg-gray-50 transition whitespace-nowrap">
                Xem Thêm
              </button>
            </div>
          </div>
        </section>

        {/* Subscription Section */}
        <section className="py-12 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-white mb-3">Đăng Ký Nhận Báo Cáo Phân Tích</h2>
              <p className="text-blue-100 mb-8">Nhận các báo cáo phân tích thị trường mới nhất từ TheStockHunters. Chúng tôi gửi phân tích chuyên sâu và cơ hội đầu tư tiềm năng đến email của bạn mỗi tuần.</p>
              <form className="max-w-md mx-auto flex gap-2">
                <input type="email" placeholder="Email của bạn" className="flex-1 px-4 py-3 rounded-button text-gray-800 border-none" />
                <Link href="/dang-ky">
                  <button type="button" className="bg-white text-primary px-6 py-3 rounded-button font-medium hover:bg-gray-100 transition whitespace-nowrap">Đăng Ký</button>
                </Link>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
