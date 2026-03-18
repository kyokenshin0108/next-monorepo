"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import Link from "next/link"

function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect width="28" height="28" rx="8" fill="#10b981" />
      <polyline
        points="5,20 10.5,12 16,16 23,8"
        fill="none"
        stroke="#022c22"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MagneticCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const tx = useTransform(x, [-60, 60], [-10, 10])
  const ty = useTransform(y, [-30, 30], [-5, 5])

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set(e.clientX - r.left - r.width / 2)
    y.set(e.clientY - r.top - r.height / 2)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: tx, y: ty }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      whileTap={{ scale: 0.96 }}
    >
      <button className="bg-emerald-500 text-zinc-950 text-[13px] font-semibold px-4 py-[7px] rounded-full hover:bg-emerald-400 transition-colors duration-200 cursor-pointer">
        Open Account
      </button>
    </motion.div>
  )
}

const NAV_LINKS = ["Strategy", "Performance", "Research", "About"]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-zinc-950/75 backdrop-blur-xl border-b border-white/[0.05] shadow-[inset_0_-1px_0_rgba(255,255,255,0.03)]"
          : ""
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 md:px-10 h-[60px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark />
          <span className="text-[15px] font-semibold text-zinc-100 tracking-tight">
            Arken Capital
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <Link
                href={`#${l.toLowerCase()}`}
                className="text-[13px] text-zinc-400 hover:text-zinc-100 transition-colors duration-200"
              >
                {l}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="hidden md:block text-[13px] text-zinc-400 hover:text-zinc-100 transition-colors duration-200"
          >
            Sign in
          </Link>
          <MagneticCTA />
        </div>
      </nav>
    </header>
  )
}
