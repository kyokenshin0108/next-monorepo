"use client"

import { useRef } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"

function MagneticButton({
  children,
  variant = "primary",
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary"
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const tx = useTransform(x, [-80, 80], [-12, 12])
  const ty = useTransform(y, [-40, 40], [-6, 6])

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
      <button
        className={
          variant === "primary"
            ? "inline-flex items-center gap-2 bg-emerald-500 text-zinc-950 font-semibold text-[14px] px-6 py-3 rounded-full hover:bg-emerald-400 transition-colors duration-200 cursor-pointer"
            : "inline-flex items-center gap-2 border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 font-medium text-[14px] px-6 py-3 rounded-full transition-colors duration-200 cursor-pointer"
        }
      >
        {children}
      </button>
    </motion.div>
  )
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M2.5 7h9M8.5 4l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function CTASection() {
  return (
    <section className="bg-zinc-900/30 border-y border-zinc-800/50 py-28 md:py-36 relative overflow-hidden">
      {/* Radial glow — center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(16,185,129,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative">
        {/* Left-aligned, not centered — DESIGN_VARIANCE 8 */}
        <div className="max-w-[640px]">
          <span className="text-[11px] font-medium uppercase tracking-widest text-emerald-500">
            Get Started
          </span>
          <h2 className="text-4xl md:text-[56px] font-semibold tracking-tighter text-zinc-100 leading-[1.03] mt-3 mb-5">
            Build a portfolio
            <br />
            <span className="text-zinc-500">worth holding.</span>
          </h2>
          <p className="text-[15px] text-zinc-400 leading-relaxed mb-8 max-w-[46ch]">
            Schedule a discovery call with our team. We review your current
            allocation, identify gaps, and outline a strategy built for your
            specific risk and return objectives.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton variant="primary">
              Schedule a call
              <ArrowRight />
            </MagneticButton>
            <MagneticButton variant="secondary">
              Download fund overview
            </MagneticButton>
          </div>

          <p className="text-[12px] text-zinc-600 mt-6">
            Minimum AUM $500K. Accredited investors only.
          </p>
        </div>
      </div>
    </section>
  )
}
