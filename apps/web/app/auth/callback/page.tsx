"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabaseBrowser } from "@/lib/supabase/client"

/**
 * Handles OAuth redirects (Google, Facebook) and password-reset magic links.
 * Supabase redirects here with either ?code= (PKCE) or #access_token= (implicit).
 * The client SDK auto-detects the implicit-flow hash; PKCE needs an explicit exchange.
 */
export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get("code")
    const type = params.get("type") // "recovery" for password-reset links

    if (code) {
      supabaseBrowser.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (error) console.error("[Auth callback] exchange error:", error.message)
        router.push(type === "recovery" ? "/auth/reset-password" : "/")
        router.refresh()
      })
    } else {
      // Implicit flow: tokens are in the URL hash — Supabase SDK picks them up automatically
      router.push("/")
      router.refresh()
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <i className="ri-loader-4-line text-primary text-4xl animate-spin block mb-3"></i>
        <p className="text-gray-600">Đang xử lý đăng nhập...</p>
      </div>
    </div>
  )
}
