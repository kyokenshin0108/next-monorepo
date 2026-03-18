import type { SourceConfig } from "./types"

export const SOURCE_CONFIGS: SourceConfig[] = [
  {
    id: "cafef",
    name: "CafeF",
    rssUrl: "https://cafef.vn/thi-truong-chung-khoan.rss",
    category: "chung-khoan",
    canCrawl: true,
  },
  {
    id: "vneconomy",
    name: "VnEconomy",
    rssUrl: "https://vneconomy.vn/chung-khoan.rss",
    category: "chung-khoan",
    canCrawl: true,
  },
  {
    id: "vnexpress",
    name: "VnExpress",
    rssUrl: "https://vnexpress.net/rss/kinh-doanh.rss",
    category: "chung-khoan",
    canCrawl: true,
  },
]
