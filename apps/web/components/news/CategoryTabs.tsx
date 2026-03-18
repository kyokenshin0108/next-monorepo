"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useTransition } from "react"

const TABS = [
  { id: "all", icon: "ri-apps-line", label: "Tất Cả" },
  { id: "trong-nuoc", icon: "ri-building-line", label: "Thị Trường Trong Nước" },
  { id: "quoc-te", icon: "ri-global-line", label: "Thị Trường Quốc Tế" },
  { id: "doanh-nghiep", icon: "ri-briefcase-4-line", label: "Doanh Nghiệp" },
  { id: "nganh", icon: "ri-stack-line", label: "Ngành" },
]

export default function CategoryTabs({ activeCategory }: { activeCategory: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  function handleClick(id: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (id === "all") {
      params.delete("category")
    } else {
      params.set("category", id)
    }
    params.delete("page")
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`)
    })
  }

  return (
    <section
      className={`bg-white border-b border-gray-200 sticky top-[57px] z-40 transition-opacity ${isPending ? "opacity-60" : ""}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleClick(tab.id)}
              className={`py-4 px-6 font-medium border-b-2 whitespace-nowrap ${
                activeCategory === tab.id
                  ? "text-primary border-primary"
                  : "text-gray-600 hover:text-primary border-transparent"
              }`}
            >
              <div className="flex items-center">
                <div className="w-5 h-5 flex items-center justify-center mr-2">
                  <i className={tab.icon}></i>
                </div>
                {tab.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
