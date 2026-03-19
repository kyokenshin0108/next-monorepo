"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/context"

const NAV_LINKS = [
  { label: "Trang Chủ", href: "/" },
  { label: "Live Stream", href: "/live-stream" },
  { label: "Nhận Định Thị Trường", href: "/nhan-dinh-thi-truong" },
  { label: "Kiến Thức Đầu Tư", href: "/kien-thuc-dau-tu" },
  { label: "Tin Tức", href: "/tin-tuc" },
  { label: "Đội Ngũ", href: "/doi-ngu-chuyen-gia" },
  { label: "Liên Hệ", href: "/lien-he" },
]

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => (w[0] ?? "").toUpperCase())
    .join("")
}

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading, signOut } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    setDropdownOpen(false)
    await signOut()
    router.push("/")
    router.refresh()
  }

  const displayName: string =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Tài khoản"

  const initials = getInitials(displayName)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-primary text-xl md:text-2xl mr-12"
            style={{ fontFamily: "var(--font-pacifico), cursive" }}
          >
            TheStockHunters
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={`font-medium hover:text-primary transition ${
                    isActive
                      ? "text-primary border-b-2 border-primary pb-1"
                      : "text-gray-700"
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="search-input bg-gray-100 rounded-full py-2 pl-10 pr-4 w-48 lg:w-64 text-sm border-none"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-500">
                <i className="ri-search-line"></i>
              </div>
            </div>

            {/* Auth area */}
            {loading ? (
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-loader-4-line animate-spin text-primary"></i>
              </div>
            ) : user ? (
              /* User avatar + dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 hover:opacity-80 transition focus:outline-none"
                >
                  <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt={displayName}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      initials
                    )}
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-700 max-w-[120px] truncate">
                    {displayName}
                  </span>
                  <i className={`ri-arrow-down-s-line text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}></i>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                    {/* User info header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900 truncate">{displayName}</p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                    </div>
                    {/* Menu items */}
                    <Link
                      href="/tai-khoan"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <i className="ri-user-line mr-2 text-gray-400"></i>
                      Tài khoản của tôi
                    </Link>
                    <Link
                      href="/tai-khoan/thong-bao"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <i className="ri-notification-3-line mr-2 text-gray-400"></i>
                      Thông báo
                    </Link>
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        <i className="ri-logout-box-r-line mr-2"></i>
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Login button */
              <Link
                href="/dang-nhap"
                className="bg-primary text-white px-4 py-2 rounded-button text-sm font-medium hover:bg-primary/90 transition whitespace-nowrap"
              >
                Đăng Nhập
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-700"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <i className={`text-xl ${mobileOpen ? "ri-close-line" : "ri-menu-line"}`}></i>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 mt-3">
            <nav className="py-4">
              <ul className="space-y-4">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="block text-gray-700 font-medium hover:text-primary transition"
                      onClick={() => setMobileOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
                <li className="border-t border-gray-100 pt-4">
                  {user ? (
                    <button
                      onClick={() => { setMobileOpen(false); handleSignOut() }}
                      className="flex items-center text-red-600 font-medium"
                    >
                      <i className="ri-logout-box-r-line mr-2"></i>
                      Đăng xuất ({displayName})
                    </button>
                  ) : (
                    <Link
                      href="/dang-nhap"
                      className="block bg-primary text-white px-4 py-2 rounded-button text-sm font-medium text-center"
                      onClick={() => setMobileOpen(false)}
                    >
                      Đăng Nhập
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
