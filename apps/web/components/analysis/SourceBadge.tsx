import type { NewsSource } from "@/lib/news/types"

const SOURCE_CONFIG: Record<NewsSource, { label: string; bg: string; text: string; icon: string }> = {
  cafef:     { label: "CafeF",     bg: "bg-red-50",    text: "text-red-600",    icon: "ri-stock-line" },
  vneconomy: { label: "VnEconomy", bg: "bg-blue-50",   text: "text-blue-600",   icon: "ri-line-chart-line" },
  vnexpress: { label: "VnExpress", bg: "bg-orange-50", text: "text-orange-600", icon: "ri-newspaper-line" },
}

interface SourceBadgeProps {
  source: string
  showIcon?: boolean
}

export default function SourceBadge({ source, showIcon = true }: SourceBadgeProps) {
  const cfg = SOURCE_CONFIG[source as NewsSource] ?? {
    label: source,
    bg: "bg-gray-50",
    text: "text-gray-600",
    icon: "ri-newspaper-line",
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
      {showIcon && (
        <span className="w-3 h-3 flex items-center justify-center">
          <i className={cfg.icon}></i>
        </span>
      )}
      {cfg.label}
    </span>
  )
}
