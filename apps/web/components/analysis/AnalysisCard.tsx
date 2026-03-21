import Link from "next/link"
import type { NewsArticle } from "@/lib/news/types"
import SourceBadge from "./SourceBadge"

function formatRelativeDate(iso: string): string {
  try {
    const diff = Date.now() - new Date(iso).getTime()
    const mins = Math.floor(diff / 60_000)
    if (mins < 60) return `${mins} phút trước`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours} giờ trước`
    const days = Math.floor(hours / 24)
    if (days < 7) return `${days} ngày trước`
    return new Date(iso).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  } catch {
    return iso
  }
}

const CATEGORY_LABEL: Record<string, string> = {
  domestic:      "Thị Trường Trong Nước",
  international: "Thị Trường Quốc Tế",
  company:       "Doanh Nghiệp",
  industry:      "Ngành",
  "chung-khoan": "Chứng Khoán",
}

interface AnalysisCardProps {
  article: NewsArticle
  /** If true renders a larger hero-style card */
  featured?: boolean
}

export default function AnalysisCard({ article, featured = false }: AnalysisCardProps) {
  const excerpt = article.summary ?? article.content?.slice(0, 150) ?? ""
  const catLabel = CATEGORY_LABEL[article.category] ?? article.category

  if (featured) {
    return (
      <Link
        href={`/nhan-dinh-thi-truong/${article.id}`}
        className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition flex flex-col md:flex-row"
      >
        <div className="md:w-1/2 overflow-hidden aspect-video bg-gray-100">
          {article.image_url ? (
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <i className="ri-image-line text-5xl"></i>
            </div>
          )}
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <SourceBadge source={article.source} />
              <span className="text-xs text-primary font-medium">{catLabel}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-3 group-hover:text-primary transition leading-snug">
              {article.title}
            </h3>
            {excerpt && (
              <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{excerpt}</p>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-4">
            <i className="ri-time-line"></i>
            <span>{formatRelativeDate(article.published_at)}</span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/nhan-dinh-thi-truong/${article.id}`}
      className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition flex flex-col"
    >
      <div className="overflow-hidden aspect-video bg-gray-100">
        {article.image_url ? (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-200">
            <i className="ri-newspaper-line text-4xl"></i>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <SourceBadge source={article.source} />
          <span className="text-xs text-primary font-medium truncate">{catLabel}</span>
        </div>
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition text-sm leading-snug flex-1">
          {article.title}
        </h3>
        {excerpt && (
          <p className="text-xs text-gray-500 line-clamp-2 mb-3">{excerpt}</p>
        )}
        <div className="flex items-center gap-1 text-xs text-gray-400 mt-auto">
          <i className="ri-time-line"></i>
          <span>{formatRelativeDate(article.published_at)}</span>
        </div>
      </div>
    </Link>
  )
}
