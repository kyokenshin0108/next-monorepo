"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useTransition } from "react"

interface Props {
  page: number
  totalPages: number
}

export default function Pagination({ page, totalPages }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  if (totalPages <= 1) return null

  function goTo(p: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(p))
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`)
    })
  }

  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
    if (totalPages <= 5) return i + 1
    if (page <= 3) return i + 1
    if (page >= totalPages - 2) return totalPages - 4 + i
    return page - 2 + i
  })

  return (
    <div className={`mt-8 flex justify-center items-center gap-2 transition-opacity ${isPending ? "opacity-60" : ""}`}>
      <button
        onClick={() => goTo(page - 1)}
        disabled={page <= 1}
        className="w-9 h-9 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <i className="ri-arrow-left-s-line"></i>
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => goTo(p)}
          className={`w-9 h-9 flex items-center justify-center rounded border text-sm font-medium transition ${
            p === page
              ? "bg-primary text-white border-primary"
              : "border-gray-200 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => goTo(page + 1)}
        disabled={page >= totalPages}
        className="w-9 h-9 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <i className="ri-arrow-right-s-line"></i>
      </button>
    </div>
  )
}
