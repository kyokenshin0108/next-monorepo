"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabaseBrowser } from "@/lib/supabase/client"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự.")
      return
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.")
      return
    }
    setLoading(true)
    const { error } = await supabaseBrowser.auth.updateUser({ password })
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    setSuccess(true)
    setTimeout(() => {
      router.push("/")
      router.refresh()
    }, 2500)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-primary font-['Pacifico'] text-2xl">TheStockHunters</Link>
        </div>
      </header>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Đặt lại mật khẩu</h1>
            <p className="text-gray-500 text-sm mb-6">Nhập mật khẩu mới cho tài khoản của bạn.</p>

            {success ? (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-lg flex items-start gap-3">
                <i className="ri-checkbox-circle-line text-xl flex-shrink-0 mt-0.5 text-green-500"></i>
                <div>
                  <p className="font-medium">Mật khẩu đã được cập nhật!</p>
                  <p className="text-sm mt-1">Đang chuyển về trang chủ...</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                    Mật khẩu mới <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition pr-10"
                      required
                      autoComplete="new-password"
                    />
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-500 cursor-pointer"
                    >
                      <i className={showPassword ? "ri-eye-line" : "ri-eye-off-line"}></i>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Tối thiểu 8 ký tự</p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                    Xác nhận mật khẩu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                    required
                    autoComplete="new-password"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                    <i className="ri-error-warning-line flex-shrink-0"></i>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white px-6 py-3 rounded-button font-medium hover:bg-primary/90 transition flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  <i className={loading ? "ri-loader-4-line animate-spin" : "ri-lock-password-line"}></i>
                  {loading ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
