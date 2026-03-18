import { notFound } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import { getArticleById, getRelatedArticles } from "@/lib/news/queries"

export const revalidate = 3600

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function formatDateShort(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

/** Render a content block — either plain text or an [image:URL] marker. */
function ContentBlock({ block }: { block: string }) {
  const imgMatch = /^\[image:(.+)\]$/.exec(block)
  if (imgMatch?.[1]) {
    return (
      <figure className="my-6">
        <img
          src={imgMatch[1]}
          alt=""
          className="w-full rounded-lg object-cover"
          loading="lazy"
        />
      </figure>
    )
  }
  return <p className="text-gray-800 leading-relaxed mb-4">{block}</p>
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function ArticleDetail({ params }: Props) {
  const { id } = await params
  const [article, related] = await Promise.all([
    getArticleById(id),
    getArticleById(id).then((a) => (a ? getRelatedArticles(a) : [])),
  ])

  if (!article) notFound()

  const blocks = article.content ? article.content.split("\n\n").filter(Boolean) : []
  const hasContent = blocks.some((b) => !b.startsWith("[image:"))

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center text-sm text-gray-500 space-x-2">
              <Link href="/" className="hover:text-primary transition">Trang Chủ</Link>
              <i className="ri-arrow-right-s-line"></i>
              <Link href="/tin-tuc" className="hover:text-primary transition">Tin Tức</Link>
              <i className="ri-arrow-right-s-line"></i>
              <span className="text-gray-900 line-clamp-1 max-w-xs">{article.title}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <article className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Hero Image */}
                {article.image_url && (
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-6 md:p-8">
                  {/* Date */}
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <i className="ri-time-line mr-1.5"></i>
                    {formatDate(article.published_at)}
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-4">
                    {article.title}
                  </h1>

                  {/* Summary */}
                  {article.summary && (
                    <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-primary pl-4 mb-6 font-medium">
                      {article.summary}
                    </p>
                  )}

                  <div className="border-t border-gray-100 my-6" />

                  {/* Content */}
                  {hasContent ? (
                    <div className="prose prose-lg max-w-none">
                      {blocks.map((block, i) => (
                        <ContentBlock key={i} block={block} />
                      ))}
                    </div>
                  ) : (
                    <div className="bg-blue-50 rounded-lg p-6 text-center">
                      <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3 text-primary text-4xl">
                        <i className="ri-external-link-line"></i>
                      </div>
                      <p className="text-gray-700 mb-4">
                        Nội dung đầy đủ của bài viết này có trên trang nguồn.
                      </p>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-primary text-white px-5 py-2.5 rounded-button font-medium hover:bg-primary/90 transition"
                      >
                        <span>Đọc bài gốc</span>
                        <i className="ri-external-link-line ml-2"></i>
                      </a>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                    <Link
                      href="/tin-tuc"
                      className="flex items-center text-gray-600 hover:text-primary transition font-medium"
                    >
                      <i className="ri-arrow-left-line mr-2"></i>
                      Quay lại danh sách tin
                    </Link>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-gray-400 hover:text-primary transition"
                    >
                      <i className="ri-external-link-line mr-1"></i>
                      Xem bài gốc
                    </a>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {related.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-5 h-5 flex items-center justify-center mr-2 text-primary">
                      <i className="ri-newspaper-line"></i>
                    </div>
                    Tin Liên Quan
                  </h3>
                  <div className="space-y-4">
                    {related.map((r) => (
                      <Link key={r.id} href={`/tin-tuc/${r.id}`} className="flex gap-3 group">
                        <div className="w-20 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                          {r.image_url ? (
                            <img src={r.image_url} alt={r.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                              <i className="ri-image-line"></i>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-primary transition">
                            {r.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">{formatDateShort(r.published_at)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-primary rounded-xl p-5 text-white">
                <h3 className="font-bold mb-2">Xem thêm tin tức</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Cập nhật liên tục từ nhiều nguồn, tự động mỗi giờ.
                </p>
                <Link
                  href="/tin-tuc"
                  className="inline-flex items-center bg-white text-primary px-4 py-2 rounded-button text-sm font-medium hover:bg-gray-100 transition"
                >
                  <i className="ri-arrow-left-line mr-2"></i>
                  Tất cả tin tức
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
