import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import { getAllAnalysis } from "@/lib/market-analysis/queries"
import { getNewsArticles } from "@/lib/news/queries"
import NhanDinhClient from "./NhanDinhClient"

export const revalidate = 300

export default async function NhanDinhThiTruong() {
  const [posts, newsResult] = await Promise.all([
    getAllAnalysis(),
    getNewsArticles({ page: 1 }).catch(() => ({ articles: [], total: 0, page: 1, totalPages: 0 })),
  ])

  return (
    <>
      <Navbar />
      <main>
        <NhanDinhClient posts={posts} newsArticles={newsResult.articles} />
      </main>
      <Footer />
    </>
  )
}
