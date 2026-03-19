import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import { getAllExperts } from "@/lib/experts/queries"
import DoiNguClient from "./DoiNguClient"

export const revalidate = 300

export default async function DoiNguPage() {
  const experts = await getAllExperts()

  return (
    <>
      <Navbar />
      <main>
        <DoiNguClient experts={experts} />
      </main>
      <Footer />
    </>
  )
}
