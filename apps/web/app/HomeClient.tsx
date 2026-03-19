"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import type { MarketAnalysis } from "@/lib/market-analysis/queries"
import type { KnowledgePost } from "@/lib/knowledge/queries"
import type { NewsArticle } from "@/lib/news/types"
import type { Expert } from "@/lib/experts/queries"

interface Props {
  featuredAnalysis: MarketAnalysis[]
  latestPosts: KnowledgePost[]
  featuredArticle: NewsArticle | null
  recentNews: NewsArticle[]
  featuredExperts: Expert[]
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })
}

export default function HomeClient({
  featuredAnalysis,
  latestPosts,
  featuredArticle,
  recentNews,
  featuredExperts,
}: Props) {
  const [showLiveStreamModal, setShowLiveStreamModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [liveStreamForm, setLiveStreamForm] = useState({
    fullName: "",
    streamEmail: "",
    phone: "",
    notification: false,
  })

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
    <main>
      {/* Hero Section */}
      <section className="relative w-full min-h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-gray-800"></div>
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
            <Link href="/live-stream" className="text-primary font-medium flex items-center hover:underline">
              Xem tất cả
              <div className="w-5 h-5 flex items-center justify-center ml-1">
                <i className="ri-arrow-right-line"></i>
              </div>
            </Link>
          </div>
          {/* Current/Next Live Stream */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-2/3 relative rounded-lg overflow-hidden bg-gray-200 aspect-video flex items-center justify-center">
                <i className="ri-live-line text-5xl text-gray-400"></i>
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
            {[
              { date: "10/06/2025", title: "Phân Tích Kỹ Thuật Nâng Cao", time: "19:30 - 21:00", desc: "Học cách sử dụng các chỉ báo kỹ thuật nâng cao để dự đoán xu hướng thị trường." },
              { date: "12/06/2025", title: "Phân Tích Cơ Bản Doanh Nghiệp", time: "20:00 - 21:30", desc: "Hướng dẫn đọc báo cáo tài chính và đánh giá hiệu quả kinh doanh của doanh nghiệp." },
              { date: "15/06/2025", title: "Tọa Đàm: Chiến Lược Đầu Tư 2025", time: "19:00 - 21:00", desc: "Thảo luận với các chuyên gia về chiến lược đầu tư hiệu quả trong nửa cuối năm 2025." },
            ].map((stream, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative">
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <i className="ri-calendar-event-line text-4xl text-gray-400"></i>
                  </div>
                  <div className="absolute top-3 right-3 bg-gray-900/80 text-white px-3 py-1 rounded-full text-sm font-medium">{stream.date}</div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold mb-2">{stream.title}</h4>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-time-line"></i>
                    </div>
                    {stream.time}
                  </div>
                  <p className="text-sm text-gray-700 mb-4">{stream.desc}</p>
                  <button className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-button text-sm font-medium hover:bg-gray-200 transition whitespace-nowrap">Nhắc Tôi</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Analysis — dynamic from market_analysis */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-900">Phân Tích Nổi Bật</h2>
              <div className="w-6 h-6 flex items-center justify-center text-primary">
                <i className="ri-line-chart-line"></i>
              </div>
            </div>
            <Link href="/nhan-dinh-thi-truong" className="text-primary font-medium flex items-center hover:underline">
              Xem tất cả
              <div className="w-5 h-5 flex items-center justify-center ml-1">
                <i className="ri-arrow-right-line"></i>
              </div>
            </Link>
          </div>
          {featuredAnalysis.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Chưa có phân tích nổi bật.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredAnalysis.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  {post.thumbnail_url ? (
                    <img src={post.thumbnail_url} alt={post.title} className="w-full h-48 object-cover" />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <i className="ri-line-chart-line text-4xl text-gray-400"></i>
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <div className="w-4 h-4 flex items-center justify-center mr-1">
                        <i className="ri-calendar-line"></i>
                      </div>
                      {formatDate(post.published_at)}
                      {post.category && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="text-primary">{post.category}</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-3 line-clamp-2">{post.title}</h3>
                    {post.excerpt && <p className="text-gray-700 mb-4 line-clamp-2">{post.excerpt}</p>}
                    <div className="flex justify-between items-center">
                      {post.author && (
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                            <i className="ri-user-line"></i>
                          </div>
                          <span className="text-sm font-medium">{post.author}</span>
                        </div>
                      )}
                      <Link href="/nhan-dinh-thi-truong" className="text-primary text-sm font-medium hover:underline ml-auto">Đọc tiếp</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Investment Knowledge — dynamic from knowledge_posts */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-900">Kiến Thức Đầu Tư</h2>
              <div className="w-6 h-6 flex items-center justify-center text-primary">
                <i className="ri-book-open-line"></i>
              </div>
            </div>
            <Link href="/kien-thuc-dau-tu" className="text-primary font-medium flex items-center hover:underline">
              Xem tất cả
              <div className="w-5 h-5 flex items-center justify-center ml-1">
                <i className="ri-arrow-right-line"></i>
              </div>
            </Link>
          </div>
          {latestPosts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Chưa có bài viết kiến thức.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {latestPosts.slice(0, 3).map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition">
                  <div className="relative">
                    {post.thumbnail_url ? (
                      <img src={post.thumbnail_url} alt={post.title} className="w-full h-[220px] object-cover" />
                    ) : (
                      <div className="w-full h-[220px] bg-gray-200 flex items-center justify-center">
                        <i className={`${post.icon ?? "ri-book-open-line"} text-5xl text-gray-400`}></i>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    {post.read_time_minutes && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-white/90 text-gray-700 rounded-full text-sm font-medium">{post.read_time_minutes} phút đọc</span>
                      </div>
                    )}
                    {post.duration && !post.read_time_minutes && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-white/90 text-gray-700 rounded-full text-sm font-medium">{post.duration}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <div className="w-4 h-4 flex items-center justify-center mr-1">
                        <i className="ri-calendar-line"></i>
                      </div>
                      {formatDate(post.published_at)}
                      {post.category && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="text-primary">{post.category}</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition line-clamp-2">{post.title}</h3>
                    {post.description && <p className="text-gray-600 mb-4 line-clamp-2">{post.description}</p>}
                    <div className="flex items-center justify-between">
                      {post.author && (
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                            <i className="ri-user-line text-gray-600"></i>
                          </div>
                          <span className="text-sm font-medium">{post.author}</span>
                        </div>
                      )}
                      <Link href="/kien-thuc-dau-tu" className="text-primary text-sm font-medium hover:underline ml-auto">Đọc tiếp</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stock News — dynamic from news_articles */}
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
              {featuredArticle ? (
                <Link href={`/tin-tuc/${featuredArticle.id}`} className="block bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-full">
                  <div className="relative">
                    {featuredArticle.image_url ? (
                      <img src={featuredArticle.image_url} alt={featuredArticle.title} className="w-full h-[400px] object-cover" />
                    ) : (
                      <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center">
                        <i className="ri-newspaper-line text-5xl text-gray-400"></i>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <div className="flex items-center text-xs text-white/80 mb-2">
                        <div className="w-4 h-4 flex items-center justify-center mr-1">
                          <i className="ri-calendar-line"></i>
                        </div>
                        {formatDate(featuredArticle.published_at)}
                        {featuredArticle.category && <span className="ml-3 px-2 py-0.5 bg-blue-600/80 text-white rounded text-[10px] font-medium">{featuredArticle.category}</span>}
                      </div>
                      <h3 className="text-2xl font-semibold text-white mb-2 line-clamp-2">{featuredArticle.title}</h3>
                      {featuredArticle.summary && <p className="text-white/90 line-clamp-2">{featuredArticle.summary}</p>}
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="bg-gray-100 rounded-lg h-[400px] flex items-center justify-center text-gray-400">
                  <i className="ri-newspaper-line text-5xl"></i>
                </div>
              )}
            </div>
            {/* Recent News List */}
            <div className="lg:col-span-5">
              <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                {recentNews.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Chưa có tin tức.</p>
                ) : (
                  recentNews.slice(0, 5).map((article) => (
                    <Link
                      key={article.id}
                      href={`/tin-tuc/${article.id}`}
                      className="block bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition"
                    >
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <div className="w-4 h-4 flex items-center justify-center mr-1">
                          <i className="ri-calendar-line"></i>
                        </div>
                        {formatDate(article.published_at)}
                        {article.category && (
                          <span className="ml-3 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-medium">{article.category}</span>
                        )}
                      </div>
                      <h4 className="font-semibold mb-2 hover:text-primary transition line-clamp-2">{article.title}</h4>
                      {article.summary && <p className="text-gray-700 text-sm line-clamp-2">{article.summary}</p>}
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section — dynamic from experts */}
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
          {featuredExperts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Chưa có thông tin chuyên gia.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredExperts.map((expert) => (
                <div key={expert.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  {expert.avatar_url ? (
                    <img src={expert.avatar_url} alt={expert.name} className="w-full h-64 object-cover" />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                      <i className="ri-user-3-line text-5xl text-gray-400"></i>
                    </div>
                  )}
                  <div className="p-5 text-center">
                    <h3 className="text-lg font-semibold mb-1">{expert.name}</h3>
                    <div className="text-primary text-sm font-medium mb-3">{expert.role}</div>
                    {expert.description && (
                      <p className="text-gray-700 text-sm mb-4 line-clamp-3">{expert.description}</p>
                    )}
                    <div className="flex justify-center space-x-3">
                      {expert.facebook_url && (
                        <a href={expert.facebook_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition">
                          <i className="ri-facebook-fill"></i>
                        </a>
                      )}
                      {expert.youtube_url && (
                        <a href={expert.youtube_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition">
                          <i className="ri-youtube-fill"></i>
                        </a>
                      )}
                      {expert.tiktok_url && (
                        <a href={expert.tiktok_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition">
                          <i className="ri-tiktok-fill"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
  )
}
