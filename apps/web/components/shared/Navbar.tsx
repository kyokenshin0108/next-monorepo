"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_LINKS = [
  { label: "Trang Chủ", href: "/" },
  { label: "Live Stream", href: "/live-stream" },
  { label: "Nhận Định Thị Trường", href: "/nhan-dinh-thi-truong" },
  { label: "Kiến Thức Đầu Tư", href: "/kien-thuc-dau-tu" },
  { label: "Tin Tức", href: "/tin-tuc" },
  { label: "Đội Ngũ", href: "/doi-ngu-chuyen-gia" },
  { label: "Liên Hệ", href: "/lien-he" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  return (
    <>
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

              {/* Login */}
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-primary text-white px-4 py-2 rounded-button text-sm font-medium hover:bg-primary/90 transition whitespace-nowrap"
              >
                Đăng Nhập
              </button>

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
                </ul>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Login Modal */}
      {showLoginModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={(e) => e.target === e.currentTarget && setShowLoginModal(false)}
        >
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-close-line text-xl"></i>
              </div>
            </button>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Đăng Nhập</h2>
            <form
              action="https://readdy.ai/api/form/d13754j4u8u7tbdlodk0"
              method="POST"
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email/Tên đăng nhập
                </label>
                <input
                  type="text"
                  name="email"
                  maxLength={500}
                  className="w-full px-3 py-2 border border-gray-300 rounded-button focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                <input
                  type="password"
                  name="password"
                  maxLength={500}
                  className="w-full px-3 py-2 border border-gray-300 rounded-button focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" name="remember" className="w-4 h-4 text-primary border-gray-300 rounded" />
                  <span className="ml-2 text-sm text-gray-700">Ghi nhớ đăng nhập</span>
                </label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Quên mật khẩu?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-button font-medium hover:bg-primary/90 transition"
              >
                Đăng Nhập
              </button>
              <div className="relative text-center my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Hoặc đăng nhập với</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-button bg-white text-gray-700 hover:bg-gray-50 transition"
                >
                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                    <i className="ri-google-fill text-[#4285F4]"></i>
                  </div>
                  <span className="text-sm font-medium">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-button bg-white text-gray-700 hover:bg-gray-50 transition"
                >
                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                    <i className="ri-facebook-fill text-[#1877F2]"></i>
                  </div>
                  <span className="text-sm font-medium">Facebook</span>
                </button>
              </div>
              <div className="text-center text-sm text-gray-700 mt-4">
                Chưa có tài khoản?{" "}
                <Link href="/dang-ky" className="text-primary hover:underline" onClick={() => setShowLoginModal(false)}>
                  Đăng ký ngay
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
