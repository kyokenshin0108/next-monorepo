"use client"
import { useState } from "react"
import Link from "next/link"
import type { MarketAnalysis } from "@/lib/market-analysis/queries"
import type { NewsArticle } from "@/lib/news/types"
import AnalysisCard from "@/components/analysis/AnalysisCard"

// ── formatters ────────────────────────────────────────────────────────────

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

function fmtPrice(n: number | null) {
  if (n === null) return null
  // Values stored in VND (e.g. 85000) → format as "85.000"
  return n.toLocaleString("vi-VN")
}

// ── badges ────────────────────────────────────────────────────────────────

function RecBadge({ rec }: { rec: string | null }) {
  if (!rec) return null
  const label =
    rec === "BUY" ? "MUA" : rec === "SELL" ? "BÁN" : rec === "HOLD" ? "TRUNG LẬP" : rec
  const cls =
    rec === "BUY"
      ? "bg-green-100 text-green-700 border border-green-200"
      : rec === "SELL"
        ? "bg-red-100 text-red-700 border border-red-200"
        : "bg-yellow-100 text-yellow-700 border border-yellow-200"
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${cls}`}>
      {label}
    </span>
  )
}

function SourceBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
      {name}
    </span>
  )
}

function TickerBadge({ ticker }: { ticker: string | null }) {
  if (!ticker) return null
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-gray-900 text-white">
      {ticker}
    </span>
  )
}

// ── report card ───────────────────────────────────────────────────────────

function ReportCard({ post, featured = false }: { post: MarketAnalysis; featured?: boolean }) {
  const upside = post.upside_percent
  const upsideColor =
    upside === null ? "text-gray-500" : upside > 0 ? "text-green-600" : "text-red-600"
  const upsidePrefix = upside !== null && upside > 0 ? "+" : ""

  if (featured) {
    return (
      <Link
        href={`/nhan-dinh-thi-truong/${post.slug}`}
        className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow block"
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
          {/* Left accent bar */}
          <div className="md:col-span-1 bg-gradient-to-b from-primary to-blue-700 p-6 flex flex-col justify-between min-h-[180px]">
            <div>
              {post.ticker && (
                <span className="text-3xl font-bold text-white block mb-1">{post.ticker}</span>
              )}
              <RecBadge rec={post.recommendation} />
            </div>
            {post.target_price !== null && (
              <div className="mt-4">
                <p className="text-blue-200 text-xs mb-1">Giá mục tiêu</p>
                <p className="text-white font-bold text-lg">{fmtPrice(post.target_price)}</p>
                {upside !== null && (
                  <p className={`text-sm font-semibold ${upside > 0 ? "text-green-300" : "text-red-300"}`}>
                    {upsidePrefix}{upside.toFixed(1)}% upside
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right content */}
          <div className="md:col-span-4 p-6">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">Nổi bật</span>
              <SourceBadge name={post.source_name} />
              {post.subcategory && (
                <span className="text-xs text-gray-500">{post.subcategory}</span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-snug">{post.title}</h3>
            {post.excerpt && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
            )}
            <div className="flex items-center justify-between mt-auto">
              {post.author && (
                <div className="flex items-center text-xs text-gray-500">
                  <i className="ri-user-line mr-1"></i>
                  <span>{post.author}</span>
                </div>
              )}
              <div className="flex items-center text-xs text-gray-500">
                <i className="ri-time-line mr-1"></i>
                <span>{fmtDate(post.published_at)}</span>
              </div>
            </div>
          </div>
        </div>
    </Link>
  )
}

  return (
    <Link
      href={`/nhan-dinh-thi-truong/${post.slug}`}
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer block"
    >
      {/* Top bar: ticker + recommendation */}
      <div className="px-4 pt-4 pb-2 flex items-center gap-2 flex-wrap">
        <TickerBadge ticker={post.ticker} />
        <RecBadge rec={post.recommendation} />
        <SourceBadge name={post.source_name} />
      </div>

      <div className="px-4 pb-4">
        <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2 leading-snug mt-1">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
        )}

        {/* Price / Upside row */}
        {(post.target_price !== null || upside !== null) && (
          <div className="flex items-center gap-4 py-2 border-t border-gray-50 mb-2">
            {post.target_price !== null && (
              <div>
                <p className="text-xs text-gray-400 leading-none">Giá mục tiêu</p>
                <p className="text-sm font-semibold text-gray-800">{fmtPrice(post.target_price)}</p>
              </div>
            )}
            {upside !== null && (
              <div>
                <p className="text-xs text-gray-400 leading-none">Upside</p>
                <p className={`text-sm font-bold ${upsideColor}`}>
                  {upsidePrefix}{upside.toFixed(1)}%
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
          {post.subcategory && <span>{post.subcategory}</span>}
          <div className="flex items-center gap-1 ml-auto">
            <i className="ri-time-line"></i>
            <span>{fmtDate(post.published_at)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ── empty state ───────────────────────────────────────────────────────────

function Empty({ label }: { label: string }) {
  return (
    <div className="col-span-3 py-12 text-center text-gray-400">
      <i className="ri-inbox-line text-4xl block mb-2"></i>
      <p>Chưa có {label} nào.</p>
    </div>
  )
}

// ── main component ────────────────────────────────────────────────────────

export default function NhanDinhClient({
  posts,
  newsArticles = [],
  defaultTab = "analysis",
}: {
  posts: MarketAnalysis[]
  newsArticles?: NewsArticle[]
  defaultTab?: string
}) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [filterRec, setFilterRec] = useState<string>("all")
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [sortBy, setSortBy] = useState<"date" | "upside">("date")

  const featuredPost = posts.find((p) => p.is_featured) ?? null
  const regularPosts = posts.filter((p) => !p.is_featured)

  const filteredPosts = regularPosts
    .filter((p) => filterRec === "all" || p.recommendation === filterRec)
    .sort((a, b) => {
      if (sortBy === "upside") {
        return (b.upside_percent ?? -999) - (a.upside_percent ?? -999)
      }
      return new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    })

  const tabs = [
    { id: "analysis", label: "Báo cáo phân tích" },
    {
      id: "news",
      label: `Tin Tức Tổng Hợp${newsArticles.length > 0 ? ` (${newsArticles.length})` : ""}`,
    },
  ]

  return (
    <>
      {/* Page title */}
      <section className="bg-white border-b border-gray-200 sticky top-[60px] z-40">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Nhận Định Thị Trường</h1>
        </div>
      </section>

      {/* Stats strip */}
      {posts.length > 0 && (
        <section className="bg-gray-50 border-b border-gray-200 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-6 text-sm flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span>
                <span className="text-gray-600">
                  MUA: <strong>{posts.filter((p) => p.recommendation === "BUY").length}</strong>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
                <span className="text-gray-600">
                  BÁN: <strong>{posts.filter((p) => p.recommendation === "SELL").length}</strong>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block"></span>
                <span className="text-gray-600">
                  TRUNG LẬP: <strong>{posts.filter((p) => p.recommendation === "HOLD").length}</strong>
                </span>
              </div>
              <span className="text-gray-400 text-xs ml-auto">
                Cập nhật lúc {new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Tabs + content */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Tab nav */}
          <div className="flex overflow-x-auto category-filter mb-6 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-btn px-6 py-3 font-medium whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── Analysis tab ── */}
          {activeTab === "analysis" && (
            <>
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                {/* Recommendation filter */}
                {(["all", "BUY", "SELL", "HOLD"] as const).map((rec) => (
                  <button
                    key={rec}
                    onClick={() => setFilterRec(rec)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                      filterRec === rec
                        ? rec === "BUY"
                          ? "bg-green-600 text-white border-green-600"
                          : rec === "SELL"
                            ? "bg-red-600 text-white border-red-600"
                            : rec === "HOLD"
                              ? "bg-yellow-500 text-white border-yellow-500"
                              : "bg-primary text-white border-primary"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {rec === "all" ? "Tất cả" : rec === "BUY" ? "MUA" : rec === "SELL" ? "BÁN" : "TRUNG LẬP"}
                  </button>
                ))}

                {/* Sort */}
                <div className="relative ml-auto">
                  <button
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="flex items-center gap-2 px-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm hover:bg-gray-50"
                  >
                    <i className="ri-sort-desc"></i>
                    <span>{sortBy === "upside" ? "Upside cao nhất" : "Mới nhất"}</span>
                    <i className="ri-arrow-down-s-line"></i>
                  </button>
                  {showSortDropdown && (
                    <div className="absolute right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 min-w-[180px] z-50 top-full mt-1">
                      <button
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm"
                        onClick={() => { setSortBy("date"); setShowSortDropdown(false) }}
                      >
                        <i className="ri-time-line mr-2"></i>Mới nhất
                      </button>
                      <button
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm"
                        onClick={() => { setSortBy("upside"); setShowSortDropdown(false) }}
                      >
                        <i className="ri-arrow-up-line mr-2"></i>Upside cao nhất
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Report grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Featured report */}
                {featuredPost && filterRec === "all" && (
                  <ReportCard post={featuredPost} featured />
                )}

                {filteredPosts.length > 0 ? (
                  filteredPosts.map((p) => <ReportCard key={p.id} post={p} />)
                ) : (
                  <Empty label="báo cáo" />
                )}
              </div>
            </>
          )}

          {/* ── News tab ── */}
          {activeTab === "news" && (
            <div>
              {newsArticles.length > 0 ? (
                <>
                  {newsArticles[0] && (
                    <div className="mb-6">
                      <AnalysisCard article={newsArticles[0]} featured />
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newsArticles.slice(1).map((a) => (
                      <AnalysisCard key={a.id} article={a} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="py-16 text-center text-gray-400">
                  <i className="ri-newspaper-line text-5xl block mb-4"></i>
                  <p className="text-lg font-medium">Đang cập nhật nội dung...</p>
                  <p className="text-sm mt-1">Tin tức sẽ được tổng hợp tự động mỗi giờ.</p>
                </div>
              )}
            </div>
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
            <p className="text-blue-100 mb-8">
              Nhận các báo cáo phân tích thị trường mới nhất từ TheStockHunters. Chúng tôi gửi phân tích
              chuyên sâu và cơ hội đầu tư tiềm năng đến email của bạn mỗi tuần.
            </p>
            <form className="max-w-md mx-auto flex gap-2">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 px-4 py-3 rounded-button text-gray-800 border-none"
              />
              <Link href="/dang-ky">
                <button
                  type="button"
                  className="bg-white text-primary px-6 py-3 rounded-button font-medium hover:bg-gray-100 transition whitespace-nowrap"
                >
                  Đăng Ký
                </button>
              </Link>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
