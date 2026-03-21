import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import { getAllAnalysis } from "@/lib/market-analysis/queries"
import { getNewsArticles } from "@/lib/news/queries"
import NhanDinhClient from "./NhanDinhClient"

export const revalidate = 300

export default async function NhanDinhThiTruong() {
  const posts = await getAllAnalysis().catch(() => [])

  // Fallback to news_articles when market_analysis is empty or errored
  const newsResult =
    posts.length === 0
      ? await getNewsArticles({ page: 1 }).catch(() => ({ articles: [], total: 0, page: 1, totalPages: 0 }))
      : { articles: [], total: 0, page: 1, totalPages: 0 }

  const defaultTab =
    posts.length === 0 && newsResult.articles.length > 0 ? "news" : "analysis"

  return (
    <>
      <Navbar />
      <main>
        <NhanDinhClient
          posts={posts}
          newsArticles={newsResult.articles}
          defaultTab={defaultTab}
        />
      </main>
      <Footer />
    </>
  )
}
