import Link from "next/link"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import Pagination from "@/components/news/Pagination"
import EventsCalendar from "@/components/news/EventsCalendar"
import { getNewsArticles, getFeaturedArticle, getLatestBySource } from "@/lib/news/queries"
import { getUpcomingEvents } from "@/lib/events/queries"
import type { NewsArticle, NewsSource } from "@/lib/news/types"
import { Suspense } from "react"

export const revalidate = 3600

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  } catch {
    return iso
  }
}

const SOURCE_CATEGORY: Record<NewsSource, { label: string; icon: string }> = {
  cafef:     { label: "Thị Trường Trong Nước", icon: "ri-building-line" },
  vneconomy: { label: "Doanh Nghiệp",          icon: "ri-briefcase-4-line" },
  vnexpress: { label: "Thị Trường Quốc Tế",    icon: "ri-global-line" },
}

function CategoryMeta({ source, date }: { source: NewsSource; date: string }) {
  const cat = SOURCE_CATEGORY[source]
  return (
    <div className="flex items-center text-xs text-primary font-medium mb-2 flex-wrap gap-1">
      <div className="w-4 h-4 flex items-center justify-center mr-0.5">
        <i className={cat.icon}></i>
      </div>
      <span className="mr-1">{cat.label}</span>
      <span className="text-gray-400">•</span>
      <span className="text-gray-500 ml-1">{formatDate(date)}</span>
    </div>
  )
}

// ── Article components ────────────────────────────────────────────────────────

function ArticleCard({ article }: { article: NewsArticle }) {
  return (
    <Link
      href={`/tin-tuc/${article.id}`}
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition block group"
    >
      <div className="news-image overflow-hidden aspect-video bg-gray-100">
        {article.image_url ? (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <i className="ri-image-line text-4xl"></i>
          </div>
        )}
      </div>
      <div className="p-4">
        <CategoryMeta source={article.source} date={article.published_at} />
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition">
          {article.title}
        </h3>
        {article.summary && (
          <p className="text-sm text-gray-700 line-clamp-2">{article.summary}</p>
        )}
      </div>
    </Link>
  )
}

function FeaturedArticle({ article, sideArticles }: { article: NewsArticle; sideArticles: NewsArticle[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main featured */}
      <div className="lg:col-span-2">
        <Link
          href={`/tin-tuc/${article.id}`}
          className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition block group news-card"
        >
          <div className="relative news-image overflow-hidden aspect-video bg-gray-100">
            {article.image_url ? (
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <i className="ri-image-line text-6xl"></i>
              </div>
            )}
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
              Tin nóng
            </div>
          </div>
          <div className="p-6 md:p-8">
            <CategoryMeta source={article.source} date={article.published_at} />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary transition leading-snug">
              {article.title}
            </h2>
            {article.summary && (
              <p className="text-gray-700 mb-6 leading-relaxed text-base line-clamp-3">
                {article.summary}
              </p>
            )}
            <div className="flex items-center text-primary text-sm font-medium">
              <span>Đọc tiếp</span>
              <div className="w-5 h-5 flex items-center justify-center ml-1">
                <i className="ri-arrow-right-line"></i>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {sideArticles.map((a) => (
          <Link
            key={a.id}
            href={`/tin-tuc/${a.id}`}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition block group news-card"
          >
            <div className="flex flex-col md:flex-row lg:flex-col">
              <div className="news-image overflow-hidden md:w-1/3 lg:w-full bg-gray-100">
                {a.image_url ? (
                  <img
                    src={a.image_url}
                    alt={a.title}
                    className="w-full h-full object-cover aspect-video"
                  />
                ) : (
                  <div className="aspect-video w-full h-full flex items-center justify-center text-gray-300">
                    <i className="ri-image-line text-3xl"></i>
                  </div>
                )}
              </div>
              <div className="p-4 md:w-2/3 lg:w-full">
                <CategoryMeta source={a.source} date={a.published_at} />
                <h3 className="font-bold text-sm text-gray-900 line-clamp-2 group-hover:text-primary transition mb-2">
                  {a.title}
                </h3>
                {a.summary && (
                  <p className="text-xs text-gray-700 line-clamp-2 mb-2">{a.summary}</p>
                )}
                <span className="text-primary text-xs font-medium flex items-center">
                  <span>Đọc tiếp</span>
                  <div className="w-4 h-4 flex items-center justify-center ml-1">
                    <i className="ri-arrow-right-line"></i>
                  </div>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="col-span-full py-16 text-center text-gray-400">
      <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 text-5xl">
        <i className="ri-newspaper-line"></i>
      </div>
      <p className="text-lg font-medium">Chưa có tin tức</p>
      <p className="text-sm mt-1">Dữ liệu sẽ được cập nhật tự động mỗi giờ.</p>
    </div>
  )
}

// ── "Tin Tức Theo Danh Mục" list item ────────────────────────────────────────

function CategoryListItem({ article }: { article: NewsArticle }) {
  return (
    <Link
      href={`/tin-tuc/${article.id}`}
      className="p-4 flex items-start hover:bg-gray-50 transition group"
    >
      <div className="w-24 h-24 flex-shrink-0 mr-4 rounded overflow-hidden bg-gray-100 news-image">
        {article.image_url ? (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <i className="ri-image-line text-2xl"></i>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center text-xs text-gray-500 mb-1">
          <span>{formatDate(article.published_at)}</span>
        </div>
        <h4 className="font-bold mb-1 line-clamp-2 group-hover:text-primary transition text-gray-900">
          {article.title}
        </h4>
        {article.summary && (
          <p className="text-sm text-gray-700 mb-2 line-clamp-2">{article.summary}</p>
        )}
        <span className="text-primary text-sm font-medium hover:underline">Đọc tiếp</span>
      </div>
    </Link>
  )
}

interface CategorySectionProps {
  source: NewsSource
  articles: NewsArticle[]
}

function CategorySection({ source, articles }: CategorySectionProps) {
  if (articles.length === 0) return null
  const cat = SOURCE_CATEGORY[source]
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <div className="w-5 h-5 flex items-center justify-center mr-2 text-primary">
            <i className={cat.icon}></i>
          </div>
          {cat.label}
        </h3>
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {articles.map((a) => (
            <CategoryListItem key={a.id} article={a} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

interface PageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function TinTuc({ searchParams }: PageProps) {
  const params = await searchParams
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1)

  let featured: NewsArticle | null = null
  let newsResult = { articles: [] as NewsArticle[], total: 0, page: 1, totalPages: 0 }
  let cafefArticles: NewsArticle[] = []
  let vnexpressArticles: NewsArticle[] = []
  let vneconomyArticles: NewsArticle[] = []

  const supabaseConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  let events: Awaited<ReturnType<typeof getUpcomingEvents>> = []

  if (supabaseConfigured) {
    const deadline = new Promise<null>((resolve) => setTimeout(() => resolve(null), 8000))
    try {
      const result = await Promise.race([
        Promise.all([
          getFeaturedArticle(),
          getNewsArticles({ page }),
          getLatestBySource("cafef", 3),
          getLatestBySource("vnexpress", 3),
          getLatestBySource("vneconomy", 3),
          getUpcomingEvents(40),
        ]),
        deadline,
      ])
      if (result !== null) {
        const [feat, news, cafef, vnexpress, vneconomy, evts] = result
        featured = feat
        newsResult = news
        cafefArticles = cafef
        vnexpressArticles = vnexpress
        vneconomyArticles = vneconomy
        events = evts
      }
    } catch {
      // Supabase not reachable — show empty state
    }
  }
  const { articles, totalPages } = newsResult

  // Side articles for featured: top 2 from grid (excluding featured itself)
  const sideArticles = articles.filter((a) => a.id !== featured?.id).slice(0, 2)

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/tin-tuc-nen.jpg"
              alt=""
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Tin Tức Thị Trường Chứng Khoán
              </h1>
              <p className="text-lg text-blue-100 mb-8">
                Cập nhật những tin tức mới nhất về thị trường chứng khoán trong nước và quốc tế.
                Phân tích chuyên sâu, tin nhanh và sự kiện kinh tế quan trọng.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#tin-moi-nhat"
                  className="bg-white text-primary px-6 py-3 rounded-button font-medium hover:bg-gray-100 transition whitespace-nowrap flex items-center"
                >
                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                    <i className="ri-newspaper-line"></i>
                  </div>
                  Tin Mới Nhất
                </a>
                <a
                  href="#lich-su-kien"
                  className="bg-blue-600 text-white px-6 py-3 rounded-button font-medium hover:bg-blue-700 transition whitespace-nowrap flex items-center border border-blue-400"
                >
                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                    <i className="ri-calendar-event-line"></i>
                  </div>
                  Lịch Sự Kiện
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* Tin Nổi Bật */}
          {featured && page === 1 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-6 h-6 flex items-center justify-center mr-2 text-red-600">
                  <i className="ri-fire-fill"></i>
                </div>
                Tin Nổi Bật
              </h2>
              <FeaturedArticle article={featured} sideArticles={sideArticles} />
            </div>
          )}

          {/* Tin Mới Nhất */}
          <div className="mb-12" id="tin-moi-nhat">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tin Mới Nhất</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.length > 0 ? (
                articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))
              ) : (
                <EmptyState />
              )}
            </div>
            <Suspense>
              <Pagination page={page} totalPages={totalPages} />
            </Suspense>
          </div>

          {/* Tin Tức Theo Danh Mục */}
          {page === 1 && (cafefArticles.length > 0 || vnexpressArticles.length > 0 || vneconomyArticles.length > 0) && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tin Tức Theo Danh Mục</h2>
              <CategorySection source="cafef"     articles={cafefArticles} />
              <CategorySection source="vnexpress"  articles={vnexpressArticles} />
              <CategorySection source="vneconomy" articles={vneconomyArticles} />
            </div>
          )}

          {/* Lịch Sự Kiện Kinh Tế */}
          <div className="mb-12" id="lich-su-kien">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-6 h-6 flex items-center justify-center mr-2 text-primary">
                <i className="ri-calendar-event-line"></i>
              </div>
              Lịch Sự Kiện Kinh Tế
            </h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-5">
                <EventsCalendar events={events} />
              </div>
            </div>
          </div>

          {/* Podcast — placeholder */}
          {page === 1 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-6 h-6 flex items-center justify-center mr-2 text-primary">
                  <i className="ri-mic-line"></i>
                </div>
                Podcast Tin Tức
              </h2>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden p-10 text-center text-gray-400">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 text-5xl">
                  <i className="ri-mic-line"></i>
                </div>
                <p className="text-lg font-medium text-gray-500">Sắp ra mắt</p>
                <p className="text-sm mt-1">Chúng tôi đang chuẩn bị nội dung podcast phân tích thị trường chứng khoán.</p>
              </div>
            </div>
          )}
        </div>

        {/* Newsletter */}
        <section className="py-12 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-white mb-3">
                Đăng Ký Nhận Bản Tin Thị Trường
              </h2>
              <p className="text-blue-100 mb-8">
                Nhận những tin tức mới nhất về thị trường chứng khoán, phân tích chuyên sâu và cơ
                hội đầu tư trực tiếp vào hộp thư của bạn!
              </p>
              <form className="max-w-md mx-auto flex gap-2">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="flex-1 px-4 py-3 rounded-button text-gray-800 border-none focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-white text-primary px-6 py-3 rounded-button font-medium hover:bg-gray-100 transition whitespace-nowrap"
                >
                  Đăng Ký
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
