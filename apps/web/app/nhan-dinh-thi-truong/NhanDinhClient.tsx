"use client"
import { useState } from "react"
import Link from "next/link"
import type { MarketAnalysis } from "@/lib/market-analysis/queries"

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit", month: "2-digit", year: "numeric",
  })
}

function fmtViews(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(".0", "") + "K"
  return String(n)
}

// ── Video card (landscape) ────────────────────────────────────────

function VideoCard({ post, showViews = true }: { post: MarketAnalysis; showViews?: boolean }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <div className="relative aspect-video bg-gray-200">
        {post.thumbnail_url ? (
          <img src={post.thumbnail_url} alt={post.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <i className="ri-video-line text-4xl text-gray-400"></i>
          </div>
        )}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center play-icon">
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
            <i className="ri-play-fill text-primary text-2xl"></i>
          </div>
        </div>
        {post.duration && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
            {post.duration}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center text-xs text-primary font-medium mb-2">
          <div className="w-4 h-4 flex items-center justify-center mr-1">
            <i className="ri-price-tag-3-line"></i>
          </div>
          {post.category}
        </div>
        <h3 className="font-semibold text-base mb-2 line-clamp-2">{post.title}</h3>
        <div className="flex items-center justify-between text-xs text-gray-500">
          {showViews && post.view_count > 0 && (
            <div className="flex items-center">
              <div className="w-3 h-3 flex items-center justify-center mr-1">
                <i className="ri-eye-line"></i>
              </div>
              <span>{fmtViews(post.view_count)} lượt xem</span>
            </div>
          )}
          {post.author && (
            <div className="flex items-center">
              <div className="w-3 h-3 flex items-center justify-center mr-1">
                <i className="ri-user-line"></i>
              </div>
              <span>{post.author}</span>
            </div>
          )}
          <div className="flex items-center">
            <div className="w-3 h-3 flex items-center justify-center mr-1">
              <i className="ri-time-line"></i>
            </div>
            <span>{fmtDate(post.published_at)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Article card ─────────────────────────────────────────────────

function ArticleCard({ post }: { post: MarketAnalysis }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      {post.thumbnail_url && (
        <img src={post.thumbnail_url} alt={post.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <div className="flex items-center text-xs text-primary font-medium mb-2">
          <div className="w-4 h-4 flex items-center justify-center mr-1">
            <i className="ri-price-tag-3-line"></i>
          </div>
          <span>{post.category}</span>
        </div>
        <h3 className="font-semibold mb-2 line-clamp-2">{post.title}</h3>
        {post.excerpt && (
          <p className="text-sm text-gray-700 mb-3 line-clamp-3">{post.excerpt}</p>
        )}
        <div className="flex items-center justify-between">
          {post.author && (
            <div className="flex items-center text-sm text-gray-500">
              <div className="w-4 h-4 flex items-center justify-center mr-1">
                <i className="ri-user-line"></i>
              </div>
              <span>{post.author}</span>
            </div>
          )}
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-4 h-4 flex items-center justify-center mr-1">
              <i className="ri-time-line"></i>
            </div>
            <span>{fmtDate(post.published_at)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Short card (portrait) ─────────────────────────────────────────

function ShortCard({ post }: { post: MarketAnalysis }) {
  return (
    <div style={{ breakInside: "avoid", marginBottom: "16px" }}>
      <div className="relative video-thumbnail rounded-lg overflow-hidden">
        <div className="aspect-[9/16] relative bg-gray-200">
          {post.thumbnail_url ? (
            <img src={post.thumbnail_url} alt={post.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <i className="ri-video-line text-4xl text-gray-400"></i>
            </div>
          )}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center play-icon">
            <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
              <i className="ri-play-fill text-primary text-xl"></i>
            </div>
          </div>
          {post.duration && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
              {post.duration}
            </div>
          )}
        </div>
        <div className="p-3 bg-white">
          <h4 className="font-medium text-sm">{post.title}</h4>
          <div className="flex items-center justify-between mt-2">
            {post.author && (
              <div className="flex items-center text-xs text-gray-500">
                <div className="w-3 h-3 flex items-center justify-center mr-1">
                  <i className="ri-user-line"></i>
                </div>
                <span>{post.author}</span>
              </div>
            )}
            {post.view_count > 0 && (
              <div className="flex items-center text-xs text-gray-500">
                <div className="w-3 h-3 flex items-center justify-center mr-1">
                  <i className="ri-eye-line"></i>
                </div>
                <span>{fmtViews(post.view_count)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Empty state ───────────────────────────────────────────────────

function Empty({ label }: { label: string }) {
  return (
    <div className="col-span-3 py-12 text-center text-gray-400">
      <i className="ri-inbox-line text-4xl block mb-2"></i>
      <p>Chưa có {label} nào.</p>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────

export default function NhanDinhClient({ posts }: { posts: MarketAnalysis[] }) {
  const [activeTab, setActiveTab] = useState("articles")
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showDateDropdown, setShowDateDropdown] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [showCustomDate, setShowCustomDate] = useState(false)

  const featuredVideos = posts.filter(p => p.type === "video" && p.is_featured).slice(0, 3)
  const allVideos = posts.filter(p => p.type === "video")
  const featuredArticle = posts.find(p => p.type === "article" && p.is_featured) ?? null
  const regularArticles = posts.filter(p => p.type === "article" && !p.is_featured)
  const shorts = posts.filter(p => p.type === "short")

  function closeDropdowns() {
    setShowCategoryDropdown(false)
    setShowDateDropdown(false)
    setShowSortDropdown(false)
  }

  return (
    <>
      {/* Page Title */}
      <section className="bg-white border-b border-gray-200 sticky top-[60px] z-40">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Nhận Định Thị Trường</h1>
        </div>
      </section>

      {/* Featured Videos */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Video Nổi Bật</h2>
          {featuredVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVideos.map(p => <VideoCard key={p.id} post={p} />)}
            </div>
          ) : (
            <div className="grid grid-cols-3"><Empty label="video nổi bật" /></div>
          )}
        </div>
      </section>

      {/* Tabs + Content */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Tab nav */}
          <div className="flex overflow-x-auto category-filter mb-6 border-b border-gray-200">
            {[
              { id: "articles", label: "Bài viết phân tích" },
              { id: "videos",   label: "Videos" },
              { id: "shorts",   label: "Shorts" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-btn px-6 py-3 font-medium whitespace-nowrap ${activeTab === tab.id ? "text-primary border-b-2 border-primary" : "text-gray-600 hover:text-gray-900"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {/* Category */}
            <div className="relative filter-container">
              <button
                onClick={() => { setShowCategoryDropdown(!showCategoryDropdown); setShowDateDropdown(false); setShowSortDropdown(false) }}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-button text-sm hover:bg-gray-50"
              >
                <i className="ri-price-tag-3-line"></i><span>Danh mục</span><i className="ri-arrow-down-s-line"></i>
              </button>
              {showCategoryDropdown && (
                <div className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-2 min-w-[200px] z-50 top-full left-0">
                  {["Nhận định hàng ngày", "Nhận định hàng tuần", "Phân tích kỹ thuật", "Phân tích cơ bản", "Phân tích vĩ mô"].map(cat => (
                    <label key={cat} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input type="checkbox" className="mr-2" /><span>{cat}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            {/* Date */}
            <div className="relative filter-container">
              <button
                onClick={() => { setShowDateDropdown(!showDateDropdown); setShowCategoryDropdown(false); setShowSortDropdown(false) }}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-button text-sm hover:bg-gray-50"
              >
                <i className="ri-calendar-line"></i><span>Thời gian</span><i className="ri-arrow-down-s-line"></i>
              </button>
              {showDateDropdown && (
                <div className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[240px] z-50 top-full left-0">
                  {[{val:"all",label:"Tất cả"},{val:"today",label:"Hôm nay"},{val:"week",label:"Tuần này"},{val:"month",label:"Tháng này"}].map(opt => (
                    <label key={opt.val} className="flex items-center hover:bg-gray-50 p-2 rounded cursor-pointer">
                      <input type="radio" name="date-filter" value={opt.val} className="mr-2" defaultChecked={opt.val === "all"} /><span>{opt.label}</span>
                    </label>
                  ))}
                  <label className="flex items-center hover:bg-gray-50 p-2 rounded cursor-pointer">
                    <input type="radio" name="date-filter" value="custom" className="mr-2" onChange={() => setShowCustomDate(true)} /><span>Tùy chọn</span>
                  </label>
                  {showCustomDate && (
                    <div className="pl-6 flex gap-2">
                      <input type="date" className="px-2 py-1 border border-gray-200 rounded text-sm" />
                      <span className="text-gray-400">đến</span>
                      <input type="date" className="px-2 py-1 border border-gray-200 rounded text-sm" />
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Sort */}
            <div className="relative filter-container">
              <button
                onClick={() => { setShowSortDropdown(!showSortDropdown); setShowCategoryDropdown(false); setShowDateDropdown(false) }}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-button text-sm hover:bg-gray-50"
              >
                <i className="ri-sort-desc"></i><span>Sắp xếp</span><i className="ri-arrow-down-s-line"></i>
              </button>
              {showSortDropdown && (
                <div className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-2 min-w-[180px] z-50 top-full left-0">
                  <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded"><i className="ri-time-line mr-2"></i>Mới nhất</button>
                  <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded"><i className="ri-eye-line mr-2"></i>Xem nhiều nhất</button>
                  <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded"><i className="ri-heart-line mr-2"></i>Được yêu thích</button>
                </div>
              )}
            </div>
            <button onClick={closeDropdowns} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 text-sm">
              <i className="ri-refresh-line"></i><span>Xóa bộ lọc</span>
            </button>
          </div>

          {/* Articles tab */}
          {activeTab === "articles" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Featured article — full-width */}
              {featuredArticle && (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredArticle.thumbnail_url ? (
                      <img src={featuredArticle.thumbnail_url} alt={featuredArticle.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                        <i className="ri-article-line text-6xl text-gray-300"></i>
                      </div>
                    )}
                    <div className="p-6 flex flex-col justify-center relative">
                      <div className="absolute top-6 left-6">
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">Nổi bật</span>
                      </div>
                      <div className="flex items-center text-xs text-primary font-medium mb-3 mt-8">
                        <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-price-tag-3-line"></i></div>
                        <span>{featuredArticle.category}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-4">{featuredArticle.title}</h3>
                      {featuredArticle.excerpt && (
                        <p className="text-gray-700 mb-6">{featuredArticle.excerpt}</p>
                      )}
                      <div className="flex items-center justify-between mt-auto">
                        {featuredArticle.author && (
                          <div className="flex items-center text-sm text-gray-500">
                            <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-user-line"></i></div>
                            <span>{featuredArticle.author}</span>
                          </div>
                        )}
                        <div className="flex items-center text-sm text-gray-500">
                          <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-time-line"></i></div>
                          <span>{fmtDate(featuredArticle.published_at)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Regular articles */}
              {regularArticles.length > 0
                ? regularArticles.map(p => <ArticleCard key={p.id} post={p} />)
                : !featuredArticle && <Empty label="bài viết" />
              }
            </div>
          )}

          {/* Videos tab */}
          {activeTab === "videos" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allVideos.length > 0
                ? allVideos.map(p => (
                  <div key={p.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <div className="relative aspect-video bg-gray-200">
                      {p.thumbnail_url ? (
                        <img src={p.thumbnail_url} alt={p.title} className="w-full h-48 object-cover" />
                      ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                          <i className="ri-video-line text-4xl text-gray-400"></i>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center play-icon">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                          <i className="ri-play-fill text-primary text-xl"></i>
                        </div>
                      </div>
                      {p.duration && (
                        <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">{p.duration}</div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center text-xs text-primary font-medium mb-2">
                        <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-price-tag-3-line"></i></div>
                        {p.category}
                      </div>
                      <h3 className="font-semibold mb-2 line-clamp-2">{p.title}</h3>
                      <div className="flex items-center justify-between mb-3">
                        {p.author && (
                          <div className="flex items-center text-sm text-gray-500">
                            <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-user-line"></i></div>
                            <span>{p.author}</span>
                          </div>
                        )}
                        {p.view_count > 0 && (
                          <div className="flex items-center text-sm text-gray-500">
                            <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-eye-line"></i></div>
                            <span>{fmtViews(p.view_count)} lượt xem</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-time-line"></i></div>
                        <span>{fmtDate(p.published_at)}</span>
                      </div>
                    </div>
                  </div>
                ))
                : <Empty label="video" />
              }
            </div>
          )}

          {/* Shorts tab */}
          {activeTab === "shorts" && (
            shorts.length > 0 ? (
              <div style={{ columnCount: 4, columnGap: "16px" }}>
                {shorts.map(p => <ShortCard key={p.id} post={p} />)}
              </div>
            ) : (
              <div className="grid grid-cols-3"><Empty label="short video" /></div>
            )
          )}

          <div className="mt-8 text-center">
            <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-button text-sm font-medium hover:bg-gray-50 transition whitespace-nowrap">
              Xem Thêm
            </button>
          </div>
        </div>
      </section>

      {/* Subscription */}
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
    </>
  )
}
