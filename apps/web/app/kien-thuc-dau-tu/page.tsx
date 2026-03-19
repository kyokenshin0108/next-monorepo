import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import { getPublishedPosts } from "@/lib/knowledge/queries"
import KienThucClient from "./KienThucClient"

export const revalidate = 300 // ISR: rebuild trang mỗi 5 phút

export default async function KienThucDauTu() {
  const posts = await getPublishedPosts()

  return (
    <>
      <Navbar />
      <main>
        <KienThucClient posts={posts} />
      </main>
      <Footer />
    </>
  )
}
