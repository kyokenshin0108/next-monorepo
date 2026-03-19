"use client"
import { useState } from "react"
import type { KnowledgePost } from "@/lib/knowledge/queries"

// ── helpers ────────────────────────────────────────────────────────────────

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

function fmtViews(n: number) {
  return n.toLocaleString("vi-VN")
}

// ── sub-components ─────────────────────────────────────────────────────────

function VideoCard({ post }: { post: KnowledgePost }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative aspect-video bg-gray-100">
        {post.thumbnail_url ? (
          <img src={post.thumbnail_url} alt={post.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <i className="ri-video-line text-4xl text-gray-400"></i>
          </div>
        )}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-80">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
            <i className="ri-play-fill text-primary text-xl"></i>
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
            <i className="ri-video-line"></i>
          </div>
          <span>Video</span>
          {post.category && (
            <>
              <span className="text-gray-400 mx-1">•</span>
              <span>{post.category}</span>
            </>
          )}
        </div>
        <h3 className="font-bold mb-2 line-clamp-2">{post.title}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          {post.author && (
            <>
              <div className="w-4 h-4 flex items-center justify-center mr-1">
                <i className="ri-user-line"></i>
              </div>
              <span className="mr-3">{post.author}</span>
            </>
          )}
          {post.view_count > 0 && (
            <>
              <div className="w-4 h-4 flex items-center justify-center mr-1">
                <i className="ri-eye-line"></i>
              </div>
              <span>{fmtViews(post.view_count)} lượt xem</span>
            </>
          )}
        </div>
        {post.description && (
          <p className="text-sm text-gray-700 mb-4 line-clamp-2">{post.description}</p>
        )}
        <a
          href={post.content_url || "#"}
          className="text-primary text-sm font-medium hover:underline"
        >
          Xem ngay
        </a>
      </div>
    </div>
  )
}

function ArticleCard({ post }: { post: KnowledgePost }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex items-center text-xs text-primary font-medium mb-2">
          <div className="w-4 h-4 flex items-center justify-center mr-1">
            <i className="ri-article-line"></i>
          </div>
          <span className="mr-2">Bài Viết</span>
          {post.category && (
            <>
              <span className="text-gray-400">•</span>
              <span className="ml-2">{post.category}</span>
            </>
          )}
        </div>
        <h3 className="font-bold mb-2 line-clamp-2">{post.title}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          {post.author && (
            <>
              <div className="w-4 h-4 flex items-center justify-center mr-1">
                <i className="ri-user-line"></i>
              </div>
              <span className="mr-3">{post.author}</span>
            </>
          )}
          <div className="w-4 h-4 flex items-center justify-center mr-1">
            <i className="ri-calendar-line"></i>
          </div>
          <span>{fmtDate(post.published_at)}</span>
        </div>
        {post.description && (
          <p className="text-sm text-gray-700 mb-4 line-clamp-3">{post.description}</p>
        )}
        <div className="mb-4 space-y-1">
          {post.read_time_minutes && (
            <div className="flex items-center text-sm text-gray-500">
              <div className="w-4 h-4 flex items-center justify-center mr-1">
                <i className="ri-time-line"></i>
              </div>
              <span>Thời gian đọc: {post.read_time_minutes} phút</span>
            </div>
          )}
          {post.level && (
            <div className="flex items-center text-sm text-gray-500">
              <div className="w-4 h-4 flex items-center justify-center mr-1">
                <i className="ri-bar-chart-line"></i>
              </div>
              <span>Cấp độ: {post.level}</span>
            </div>
          )}
        </div>
        <a
          href={post.content_url || "#"}
          className="text-primary text-sm font-medium hover:underline"
        >
          Đọc tiếp
        </a>
      </div>
    </div>
  )
}

function PodcastCard({ post }: { post: KnowledgePost }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex items-center text-xs text-primary font-medium mb-2">
          <div className="w-4 h-4 flex items-center justify-center mr-1">
            <i className="ri-mic-line"></i>
          </div>
          <span className="mr-2">Podcast</span>
          {post.category && (
            <>
              <span className="text-gray-400">•</span>
              <span className="ml-2">{post.category}</span>
            </>
          )}
        </div>
        <h3 className="font-bold mb-2 line-clamp-2">{post.title}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          {post.author && (
            <>
              <div className="w-4 h-4 flex items-center justify-center mr-1">
                <i className="ri-user-line"></i>
              </div>
              <span className="mr-3">{post.author}</span>
            </>
          )}
          <div className="w-4 h-4 flex items-center justify-center mr-1">
            <i className="ri-calendar-line"></i>
          </div>
          <span>{fmtDate(post.published_at)}</span>
        </div>
        <div className="bg-gray-100 rounded-lg p-3 mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full mr-3 flex-shrink-0">
              <i className="ri-play-fill text-xl"></i>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium mb-1 line-clamp-1">{post.title}</div>
              <div className="flex items-center text-xs text-gray-500 gap-2">
                {post.duration && <span>{post.duration}</span>}
                <span>{fmtDate(post.published_at)}</span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full bg-gray-300 h-1 rounded-full">
              <div className="bg-primary h-full rounded-full w-0"></div>
            </div>
          </div>
        </div>
        {post.description && (
          <p className="text-sm text-gray-700 mb-4 line-clamp-2">{post.description}</p>
        )}
        <a
          href={post.content_url || "#"}
          className="text-primary text-sm font-medium hover:underline"
        >
          Nghe ngay
        </a>
      </div>
    </div>
  )
}

function LearningPathCard({ post }: { post: KnowledgePost }) {
  const icon = post.icon || "ri-book-open-line"
  const colorClass = post.color_class || "bg-gray-100 text-gray-800"
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-5">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClass}`}>
          <i className={`${icon} text-xl`}></i>
        </div>
        <h3 className="text-lg font-bold mb-2">{post.title}</h3>
        <p className="text-sm text-gray-700 mb-4">{post.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          {post.level && (
            <div className="flex items-center">
              <div className="w-4 h-4 flex items-center justify-center mr-1">
                <i className="ri-bar-chart-line"></i>
              </div>
              <span>{post.level}</span>
            </div>
          )}
          {post.duration && (
            <div className="flex items-center">
              <div className="w-4 h-4 flex items-center justify-center mr-1">
                <i className="ri-time-line"></i>
              </div>
              <span>{post.duration}</span>
            </div>
          )}
        </div>
        <a
          href={post.content_url || "#"}
          className="text-primary text-sm font-medium hover:underline flex items-center"
        >
          <span>Xem tất cả</span>
          <div className="w-5 h-5 flex items-center justify-center ml-1">
            <i className="ri-arrow-right-line"></i>
          </div>
        </a>
      </div>
    </div>
  )
}

// ── latest content card (mixed type) ────────────────────────────────────────

function LatestCard({ post }: { post: KnowledgePost }) {
  if (post.type === "video") return <VideoCard post={post} />
  if (post.type === "article") return <ArticleCard post={post} />
  return <PodcastCard post={post} />
}

// ── featured podcast ──────────────────────────────────────────────────────

function FeaturedPodcast({ post }: { post: KnowledgePost }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex items-center text-xs text-primary font-medium mb-3">
          <div className="w-4 h-4 flex items-center justify-center mr-1">
            <i className="ri-mic-line"></i>
          </div>
          <span>Podcast Nổi Bật</span>
        </div>
        <h3 className="text-xl font-bold mb-3">{post.title}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          {post.author && (
            <>
              <div className="w-4 h-4 flex items-center justify-center mr-1">
                <i className="ri-user-line"></i>
              </div>
              <span className="mr-3">{post.author}</span>
            </>
          )}
          {post.duration && (
            <>
              <div className="w-4 h-4 flex items-center justify-center mr-1">
                <i className="ri-time-line"></i>
              </div>
              <span>{post.duration}</span>
            </>
          )}
        </div>
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <div className="flex items-center mb-3">
            <button className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full mr-4">
              <i className="ri-play-fill text-2xl"></i>
            </button>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium mb-1 line-clamp-1">{post.title}</div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{fmtDate(post.published_at)}</span>
                {post.duration && <span>{post.duration}</span>}
              </div>
            </div>
          </div>
          <div className="mb-3">
            <div className="w-full bg-gray-300 h-1.5 rounded-full">
              <div className="bg-primary h-full rounded-full" style={{ width: "45%" }}></div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-primary">
                <i className="ri-skip-back-line"></i>
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-primary">
                <i className="ri-rewind-line"></i>
              </button>
            </div>
            <div className="flex space-x-4">
              <button className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-primary">
                <i className="ri-speed-line"></i>
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-primary">
                <i className="ri-download-line"></i>
              </button>
            </div>
          </div>
        </div>
        {post.description && (
          <p className="text-gray-700 mb-4">{post.description}</p>
        )}
        {post.category && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {post.category}
            </span>
          </div>
        )}
        <div className="flex gap-3">
          <a
            href={post.content_url || "#"}
            className="bg-primary text-white px-4 py-2 rounded-button text-sm font-medium hover:bg-primary/90 transition whitespace-nowrap flex items-center"
          >
            <div className="w-5 h-5 flex items-center justify-center mr-1">
              <i className="ri-play-circle-line"></i>
            </div>
            Nghe Ngay
          </a>
          <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-button text-sm font-medium hover:bg-gray-200 transition whitespace-nowrap flex items-center">
            <div className="w-5 h-5 flex items-center justify-center mr-1">
              <i className="ri-download-line"></i>
            </div>
            Tải Về
          </button>
        </div>
      </div>
    </div>
  )
}

function RecentPodcastList({ posts }: { posts: KnowledgePost[] }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-5">
        <h3 className="text-lg font-bold mb-4">Podcast Gần Đây</h3>
        <div className="space-y-4 custom-scrollbar overflow-y-auto max-h-[400px] pr-2">
          {posts.map((pod, i) => (
            <div
              key={pod.id}
              className={`flex items-start ${i < posts.length - 1 ? "border-b border-gray-100 pb-4" : ""}`}
            >
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-primary rounded-lg mr-3 flex-shrink-0">
                <i className="ri-mic-line"></i>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 mb-1 line-clamp-2">{pod.title}</h4>
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  {pod.author && (
                    <>
                      <div className="w-3 h-3 flex items-center justify-center mr-1">
                        <i className="ri-user-line"></i>
                      </div>
                      <span className="mr-2">{pod.author}</span>
                    </>
                  )}
                  {pod.duration && (
                    <>
                      <div className="w-3 h-3 flex items-center justify-center mr-1">
                        <i className="ri-time-line"></i>
                      </div>
                      <span>{pod.duration}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center">
                  <button className="w-7 h-7 flex items-center justify-center bg-primary text-white rounded-full mr-2 flex-shrink-0">
                    <i className="ri-play-fill"></i>
                  </button>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 h-1 rounded-full">
                      <div className="bg-primary h-full rounded-full w-0"></div>
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
            <div className="w-5 h-5 flex items-center justify-center ml-1">
              <i className="ri-arrow-right-line"></i>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

// ── empty state ───────────────────────────────────────────────────────────

function EmptyState({ label }: { label: string }) {
  return (
    <div className="col-span-3 py-12 text-center text-gray-400">
      <i className="ri-inbox-line text-4xl block mb-2"></i>
      <p>Chưa có {label} nào.</p>
    </div>
  )
}

// ── main component ────────────────────────────────────────────────────────

const TABS = [
  { id: "all",            icon: "ri-apps-line",     label: "Tất Cả" },
  { id: "videos",         icon: "ri-video-line",    label: "Video" },
  { id: "articles",       icon: "ri-article-line",  label: "Bài Viết" },
  { id: "podcasts",       icon: "ri-mic-line",      label: "Podcast" },
  { id: "learning-paths", icon: "ri-road-map-line", label: "Lộ Trình" },
]

export default function KienThucClient({ posts }: { posts: KnowledgePost[] }) {
  const [activeTab, setActiveTab] = useState("all")

  const learningPaths = posts.filter(p => p.type === "learning_path")
  const videos        = posts.filter(p => p.type === "video")
  const articles      = posts.filter(p => p.type === "article")
  const podcasts      = posts.filter(p => p.type === "podcast")

  const featuredPodcast  = podcasts.find(p => p.is_featured) ?? podcasts[0] ?? null
  const recentPodcasts   = podcasts.filter(p => p.id !== featuredPodcast?.id).slice(0, 5)

  // Latest 3 across video + article + podcast, sorted by date
  const latestContent = [...videos, ...articles, ...podcasts]
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .slice(0, 3)

  const showLearningPaths = activeTab === "all" || activeTab === "learning-paths"
  const showLatest        = activeTab === "all"
  const showVideos        = activeTab === "all" || activeTab === "videos"
  const showArticles      = activeTab === "articles"
  const showPodcasts      = activeTab === "all" || activeTab === "podcasts"

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://readdy.ai/api/search-image?query=investment%2520education%2520concept%2520with%2520financial%2520charts%2520and%2520books%2520on%2520desk%2520in%2520modern%2520office%252C%2520blue%2520color%2520scheme%252C%2520high%2520quality%2520professional%2520photo&width=1920&height=500&seq=hero_bg_kienthuc&orientation=landscape"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Kiến Thức Đầu Tư Chứng Khoán
            </h1>
            <p className="text-lg text-blue-100 mb-8">
              Nâng cao kiến thức và kỹ năng đầu tư của bạn với các bài viết, video, podcast và lộ trình
              học tập được thiết kế bởi các chuyên gia hàng đầu.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-primary px-6 py-3 rounded-button font-medium hover:bg-gray-100 transition whitespace-nowrap flex items-center">
                <div className="w-5 h-5 flex items-center justify-center mr-2">
                  <i className="ri-book-open-line"></i>
                </div>
                Khám Phá Ngay
              </button>
              <button
                onClick={() => setActiveTab("learning-paths")}
                className="bg-blue-600 text-white px-6 py-3 rounded-button font-medium hover:bg-blue-700 transition whitespace-nowrap flex items-center border border-blue-400"
              >
                <div className="w-5 h-5 flex items-center justify-center mr-2">
                  <i className="ri-road-map-line"></i>
                </div>
                Lộ Trình Học Tập
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-[57px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto category-filter">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-button py-4 px-6 font-medium border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-primary border-primary"
                    : "text-gray-600 hover:text-primary border-transparent"
                }`}
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

      {/* Content */}
      <div className="container mx-auto px-4 py-8">

        {/* ── Learning Paths ── */}
        {showLearningPaths && (
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Lộ Trình Học Tập</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningPaths.length > 0
                ? learningPaths.map(p => <LearningPathCard key={p.id} post={p} />)
                : <EmptyState label="lộ trình" />
              }
            </div>
          </div>
        )}

        {/* ── Latest (all tab only) ── */}
        {showLatest && latestContent.length > 0 && (
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Nội Dung Mới Nhất</h2>
              <div className="flex items-center">
                <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition whitespace-nowrap mr-2">
                  <div className="flex items-center">
                    <div className="w-5 h-5 flex items-center justify-center mr-1">
                      <i className="ri-filter-3-line"></i>
                    </div>
                    <span>Lọc</span>
                  </div>
                </button>
                <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-5 h-5 flex items-center justify-center mr-1">
                      <i className="ri-sort-desc"></i>
                    </div>
                    <span>Mới nhất</span>
                  </div>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestContent.map(p => <LatestCard key={p.id} post={p} />)}
            </div>
          </div>
        )}

        {/* ── Videos (all + videos tab) ── */}
        {showVideos && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Video Phân Tích Đầu Tư</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.length > 0
                ? videos.map(p => <VideoCard key={p.id} post={p} />)
                : <EmptyState label="video" />
              }
            </div>
            {videos.length > 3 && (
              <div className="mt-8 text-center">
                <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-button text-sm font-medium hover:bg-gray-50 transition whitespace-nowrap">
                  Xem Thêm Video
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── Articles (articles tab only) ── */}
        {showArticles && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Bài Viết</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.length > 0
                ? articles.map(p => <ArticleCard key={p.id} post={p} />)
                : <EmptyState label="bài viết" />
              }
            </div>
          </div>
        )}

        {/* ── Podcasts (all + podcasts tab) ── */}
        {showPodcasts && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Podcast Phân Tích Đầu Tư</h2>
            {featuredPodcast ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FeaturedPodcast post={featuredPodcast} />
                {recentPodcasts.length > 0 && <RecentPodcastList posts={recentPodcasts} />}
              </div>
            ) : (
              <div className="grid grid-cols-1">
                <EmptyState label="podcast" />
              </div>
            )}
          </div>
        )}

      </div>

      {/* Newsletter */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Đăng Ký Nhận Bản Tin Kiến Thức Đầu Tư
            </h2>
            <p className="text-blue-100 mb-8">
              Nhận những bài viết, video và podcast mới nhất về đầu tư chứng khoán. Cập nhật kiến thức
              và nâng cao kỹ năng đầu tư của bạn!
            </p>
            <form className="max-w-md mx-auto flex gap-2">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 px-4 py-3 rounded-button text-gray-800 border-none"
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
    </>
  )
}
