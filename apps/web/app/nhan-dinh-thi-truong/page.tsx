import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import { getAllAnalysis } from "@/lib/market-analysis/queries"
import NhanDinhClient from "./NhanDinhClient"

export const revalidate = 300

export default async function NhanDinhThiTruong() {
  const posts = await getAllAnalysis()

  return (
    <>
      <Navbar />
      <main>
        <NhanDinhClient posts={posts} />
      </main>
      <Footer />
    </>
  )
}
