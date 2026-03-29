import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import { getAnalysisBySlug, getRelatedAnalysis, type MarketAnalysis } from "@/lib/market-analysis/queries"

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const report = await getAnalysisBySlug(slug)
  if (!report) return { title: "Báo cáo không tồn tại - TheStockHunters" }

  const desc = report.excerpt ?? report.summary ?? report.title
  return {
    title: `${report.title} - TheStockHunters`,
    description: desc,
    openGraph: {
      title: report.title,
      description: desc,
      images: report.featured_image_url ? [report.featured_image_url] : [],
    },
  }
}

// ── helpers ────────────────────────────────────────────────────────────────

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

function fmtPrice(n: number) {
  return n.toLocaleString("vi-VN")
}

function RecBadge({ rec }: { rec: string | null }) {
  if (!rec) return null
  const label = rec === "BUY" ? "MUA" : rec === "SELL" ? "BÁN" : "TRUNG LẬP"
  const cls =
    rec === "BUY"
      ? "bg-green-100 text-green-700 border border-green-200"
      : rec === "SELL"
        ? "bg-red-100 text-red-700 border border-red-200"
        : "bg-yellow-100 text-yellow-700 border border-yellow-200"
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${cls}`}>
      {label}
    </span>
  )
}

// ── related card ───────────────────────────────────────────────────────────

function RelatedCard({ report }: { report: MarketAnalysis }) {
  const upside = report.upside_percent
  const upsideColor = upside === null ? "" : upside > 0 ? "text-green-600" : "text-red-600"
  const upsidePrefix = upside !== null && upside > 0 ? "+" : ""

  return (
    <Link
      href={`/nhan-dinh-thi-truong/${report.slug}`}
      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition group"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-900 text-white flex items-center justify-center text-xs font-bold">
        {report.ticker ?? "—"}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-primary transition">
          {report.title}
        </p>
        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
          <span>{report.source_name}</span>
          {upside !== null && (
            <span className={`font-semibold ${upsideColor}`}>
              {upsidePrefix}{upside.toFixed(1)}%
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

// ── page ───────────────────────────────────────────────────────────────────

export default async function ReportDetailPage({ params }: Props) {
  const { slug } = await params

  const [report, related] = await Promise.all([
    getAnalysisBySlug(slug),
    getAnalysisBySlug(slug).then((r) => (r ? getRelatedAnalysis(r, 4) : [])),
  ])

  if (!report) notFound()

  const upside = report.upside_percent
  const upsideColor = upside === null ? "text-gray-700" : upside > 0 ? "text-green-600" : "text-red-600"
  const upsidePrefix = upside !== null && upside > 0 ? "+" : ""

  const contentBlocks = report.content
    ? report.content.split("\n\n").filter(Boolean)
    : []

  function renderBlock(block: string, i: number) {
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-primary rounded-full inline-block flex-shrink-0" />
          {block.slice(3)}
        </h2>
      )
    }
    if (block.startsWith("### ")) {
      return (
        <h3 key={i} className="text-base font-semibold text-gray-800 mt-6 mb-2">
          {block.slice(4)}
        </h3>
      )
    }
    const lines = block.split("\n").filter(Boolean)
    const isBulletList = lines.length > 1 && lines.every((l) => l.startsWith("- ") || l.startsWith("* "))
    if (isBulletList) {
      return (
        <ul key={i} className="space-y-2 mb-4">
          {lines.map((l, j) => (
            <li key={j} className="flex items-start gap-2 text-gray-700 text-sm leading-relaxed">
              <i className="ri-arrow-right-s-line text-primary mt-0.5 flex-shrink-0" />
              {l.slice(2)}
            </li>
          ))}
        </ul>
      )
    }
    return (
      <p key={i} className="text-gray-800 leading-relaxed mb-4">
        {block}
      </p>
    )
  }

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">

        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center text-sm text-gray-500 gap-2 flex-wrap">
              <Link href="/" className="hover:text-primary transition">Trang Chủ</Link>
              <i className="ri-arrow-right-s-line"></i>
              <Link href="/nhan-dinh-thi-truong" className="hover:text-primary transition">
                Nhận Định Thị Trường
              </Link>
              <i className="ri-arrow-right-s-line"></i>
              <span className="text-gray-900 line-clamp-1 max-w-xs">{report.title}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── Main content ── */}
            <article className="lg:col-span-2 space-y-6">

              {/* Header card */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">

                {/* Top accent bar */}
                <div className="bg-gradient-to-r from-primary to-blue-700 px-6 py-5">
                  <div className="flex items-center gap-3 flex-wrap">
                    {report.ticker && (
                      <span className="text-3xl font-bold text-white">{report.ticker}</span>
                    )}
                    <RecBadge rec={report.recommendation} />
                    <span className="ml-auto text-blue-200 text-sm">{report.source_name}</span>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  {/* Badges */}
                  <div className="flex items-center gap-2 flex-wrap mb-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                      {report.source_name}
                    </span>
                    {report.subcategory && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                        {report.subcategory}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-4">
                    {report.title}
                  </h1>

                  {/* Date */}
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <i className="ri-time-line mr-1.5"></i>
                    {fmtDate(report.published_at)}
                  </div>

                  {/* Key metrics */}
                  {(report.target_price !== null || report.upside_percent !== null || report.sentiment) && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl mb-6">
                      {report.target_price !== null && (
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Giá mục tiêu</p>
                          <p className="text-lg font-bold text-gray-900">{fmtPrice(report.target_price)}</p>
                          <p className="text-xs text-gray-400">VND</p>
                        </div>
                      )}
                      {upside !== null && (
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Tiềm năng tăng</p>
                          <p className={`text-lg font-bold ${upsideColor}`}>
                            {upsidePrefix}{upside.toFixed(1)}%
                          </p>
                          <p className="text-xs text-gray-400">Upside</p>
                        </div>
                      )}
                      {report.sentiment && (
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Quan điểm</p>
                          <p className="text-sm font-semibold text-gray-900 capitalize">{report.sentiment}</p>
                          <p className="text-xs text-gray-400">Sentiment</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Excerpt / summary */}
                  {(report.excerpt ?? report.summary) && (
                    <p className="text-base text-gray-700 leading-relaxed border-l-4 border-primary pl-4 mb-6">
                      {report.excerpt ?? report.summary}
                    </p>
                  )}

                  <div className="border-t border-gray-100 my-6" />

                  {/* Key points */}
                  {report.key_points && report.key_points.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <i className="ri-list-check text-primary"></i>
                        Điểm nhấn đầu tư
                      </h2>
                      <ul className="space-y-2">
                        {report.key_points.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <i className="ri-checkbox-circle-line text-primary mt-0.5 flex-shrink-0"></i>
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Full content */}
                  {contentBlocks.length > 0 ? (
                    <div className="prose prose-lg max-w-none">
                      {contentBlocks.map((block, i) => renderBlock(block, i))}
                    </div>
                  ) : (report.source_url || report.report_pdf_url) ? (
                    <div className="bg-blue-50 rounded-xl p-6 text-center">
                      <i className="ri-file-text-line text-4xl text-primary mb-3 block"></i>
                      <p className="text-gray-700 mb-4">
                        Báo cáo đầy đủ có sẵn trên trang nguồn.
                      </p>
                      <div className="flex items-center justify-center gap-3 flex-wrap">
                        {report.source_url && (
                          <a
                            href={report.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition"
                          >
                            Xem trên trang nguồn
                            <i className="ri-external-link-line ml-2"></i>
                          </a>
                        )}
                        {report.report_pdf_url && (
                          <a
                            href={report.report_pdf_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-white text-primary border border-primary px-5 py-2.5 rounded-lg font-medium hover:bg-blue-50 transition"
                          >
                            Tải báo cáo PDF
                            <i className="ri-file-download-line ml-2"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  ) : null}

                  {/* Footer */}
                  <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                    <Link
                      href="/nhan-dinh-thi-truong"
                      className="flex items-center text-gray-600 hover:text-primary transition font-medium"
                    >
                      <i className="ri-arrow-left-line mr-2"></i>
                      Quay lại nhận định
                    </Link>
                    {report.source_url ? (
                      <a
                        href={report.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-gray-400 hover:text-primary transition"
                      >
                        <i className="ri-external-link-line mr-1"></i>
                        Nguồn: {report.source_name}
                      </a>
                    ) : (
                      <span className="text-sm text-gray-400">
                        Nguồn: {report.source_name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </article>

            {/* ── Sidebar ── */}
            <aside className="space-y-6">

              {/* Report summary card */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="text-base font-bold text-gray-900 mb-4">Thông tin báo cáo</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Mã CK</dt>
                    <dd className="font-bold text-gray-900">{report.ticker ?? "—"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Nguồn</dt>
                    <dd className="font-medium text-gray-900">{report.source_name}</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-gray-500">Khuyến nghị</dt>
                    <dd><RecBadge rec={report.recommendation} /></dd>
                  </div>
                  {report.target_price !== null && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Giá mục tiêu</dt>
                      <dd className="font-bold text-gray-900">{fmtPrice(report.target_price)} VND</dd>
                    </div>
                  )}
                  {upside !== null && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Upside</dt>
                      <dd className={`font-bold ${upsideColor}`}>
                        {upsidePrefix}{upside.toFixed(1)}%
                      </dd>
                    </div>
                  )}
                  {report.subcategory && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Ngành</dt>
                      <dd className="text-gray-900">{report.subcategory}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Ngày KN</dt>
                    <dd className="text-gray-900">{new Date(report.published_at).toLocaleDateString("vi-VN")}</dd>
                  </div>
                </dl>
              </div>

              {/* Related reports */}
              {related.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <i className="ri-bar-chart-line text-primary"></i>
                    Báo cáo liên quan
                  </h3>
                  <div className="divide-y divide-gray-50">
                    {related.map((r) => (
                      <RelatedCard key={r.id} report={r} />
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-primary rounded-xl p-5 text-white">
                <h3 className="font-bold mb-2">Theo dõi báo cáo mới</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Nhận báo cáo phân tích từ các công ty chứng khoán hàng đầu mỗi ngày.
                </p>
                <Link
                  href="/dang-ky"
                  className="inline-flex items-center bg-white text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
                >
                  Đăng ký ngay
                  <i className="ri-arrow-right-line ml-2"></i>
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
