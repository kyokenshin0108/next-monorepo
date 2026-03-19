import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import { getFeaturedAnalysis } from "@/lib/market-analysis/queries"
import { getPublishedPosts } from "@/lib/knowledge/queries"
import { getFeaturedArticle, getNewsArticles } from "@/lib/news/queries"
import { getFeaturedExperts } from "@/lib/experts/queries"
import HomeClient from "./HomeClient"

export const revalidate = 300

export default async function HomePage() {
  const [featuredAnalysis, latestPostsResult, featuredArticle, newsResult, featuredExperts] =
    await Promise.all([
      getFeaturedAnalysis(3),
      getPublishedPosts(),
      getFeaturedArticle(),
      getNewsArticles({ page: 1 }),
      getFeaturedExperts(4),
    ])

  return (
    <>
      <Navbar />
      <HomeClient
        featuredAnalysis={featuredAnalysis}
        latestPosts={latestPostsResult.slice(0, 3)}
        featuredArticle={featuredArticle}
        recentNews={newsResult.articles.slice(0, 5)}
        featuredExperts={featuredExperts}
      />
      <Footer />
    </>
  )
}
