"use client"

import { motion } from "framer-motion"

// ─── SVG Performance Chart ───────────────────────────────────────────────────

function PerformanceChart() {
  const data = [18, 24, 29, 22, 35, 42, 38, 52, 48, 61, 58, 73, 69, 81, 76, 88, 84, 93, 90, 100]
  const W = 400,
    H = 190,
    px = 10,
    pt = 18,
    pb = 28
  const cw = W - px * 2
  const ch = H - pt - pb
  const toX = (i: number) => px + (i / (data.length - 1)) * cw
  const toY = (v: number) => pt + (1 - v / 100) * ch

  const linePath = data.reduce((acc, v, i) => {
    const x = toX(i),
      y = toY(v)
    if (i === 0) return `M ${x} ${y}`
    const prevVal = data[i - 1] ?? 0
    const px0 = toX(i - 1)
    const py0 = toY(prevVal)
    const cpx = px0 + (x - px0) / 2
    return `${acc} C ${cpx} ${py0} ${cpx} ${y} ${x} ${y}`
  }, "")

  const lastX = toX(data.length - 1)
  const lastY = toY(data[data.length - 1] ?? 100)
  const baseY = pt + ch
  const areaPath = `${linePath} L ${lastX} ${baseY} L ${toX(0)} ${baseY} Z`
  const years = ["2020", "2021", "2022", "2023", "2024"]

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="heroArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.01" />
        </linearGradient>
        <linearGradient id="heroLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.3" />
          <stop offset="60%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>

      {[25, 50, 75].map((v) => (
        <line
          key={v}
          x1={px}
          y1={toY(v)}
          x2={W - px}
          y2={toY(v)}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />
      ))}

      <path d={areaPath} fill="url(#heroArea)" />

      <motion.path
        d={linePath}
        fill="none"
        stroke="url(#heroLine)"
        strokeWidth="1.75"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: 2.2, delay: 0.6, ease: "easeOut" },
          opacity: { duration: 0.4, delay: 0.6 },
        }}
      />

      {/* Pulsing endpoint */}
      <motion.circle
        cx={lastX}
        cy={lastY}
        r="8"
        fill="#10b981"
        fillOpacity="0"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [1, 1.8, 1], opacity: [0, 0.3, 0] }}
        transition={{ delay: 2.8, duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.circle
        cx={lastX}
        cy={lastY}
        r="3.5"
        fill="#10b981"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.8, type: "spring", stiffness: 200, damping: 12 }}
      />

      {years.map((year, i) => (
        <text
          key={year}
          x={px + (i / (years.length - 1)) * cw}
          y={H - 6}
          textAnchor="middle"
          fill="rgba(161,161,170,0.35)"
          fontSize="9"
          fontFamily="Geist,system-ui,sans-serif"
        >
          {year}
        </text>
      ))}
    </svg>
  )
}

// ─── Inline arrow ─────────────────────────────────────────────────────────────

function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path
        d="M2 6.5h9M7.5 3.5l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── Animation variants ───────────────────────────────────────────────────────

const cont = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 22 },
  },
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <section className="min-h-[100dvh] bg-zinc-950 relative overflow-hidden flex items-center">
      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Left-edge emerald radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 60% at -5% 55%, rgba(16,185,129,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 w-full pt-24 pb-16 grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-16 items-center">
        {/* LEFT — content */}
        <motion.div
          className="flex flex-col gap-7"
          variants={cont}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-emerald-400 border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1.5 rounded-full">
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
                aria-hidden="true"
              />
              $4.2B Assets Under Management
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-[52px] md:text-[64px] xl:text-[76px] font-semibold tracking-[-0.04em] leading-[1.0] text-zinc-50"
          >
            Capital that
            <br />
            <span className="text-zinc-500">compounds.</span>
            <br />
            Strategy that
            <br />
            holds.
          </motion.h1>

          <motion.p
            variants={item}
            className="text-[15px] text-zinc-400 leading-relaxed max-w-[50ch]"
          >
            Arken deploys quantitative risk models and deep fundamental research
            to build durable portfolios across global equity, fixed income, and
            alternative markets.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-3"
          >
            <button className="inline-flex items-center gap-2 bg-emerald-500 text-zinc-950 font-semibold text-[13px] px-5 py-2.5 rounded-full hover:bg-emerald-400 active:scale-[0.97] transition-all duration-200 cursor-pointer">
              Build your portfolio
              <ArrowRight />
            </button>
            <button className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-100 text-[13px] font-medium transition-colors duration-200 cursor-pointer">
              View track record
              <ArrowRight />
            </button>
          </motion.div>

          <motion.div
            variants={item}
            className="flex items-center gap-8 pt-6 border-t border-zinc-800/60"
          >
            {[
              { value: "+17.3%", label: "Annualized return" },
              { value: "98.1%", label: "Client retention" },
              { value: "14", label: "Active strategies" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-[26px] font-semibold text-zinc-100 tracking-tight">
                  {s.value}
                </div>
                <div className="text-[11px] text-zinc-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — chart panel + floating cards */}
        <motion.div
          className="relative h-[380px] md:h-[460px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Chart panel */}
          <div className="absolute inset-0 rounded-2xl bg-zinc-900/40 border border-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden">
            <div className="p-5 h-full flex flex-col">
              <div className="text-[10px] font-medium uppercase tracking-widest text-zinc-500 mb-0.5">
                Portfolio Performance
              </div>
              <div className="text-[13px] font-semibold text-zinc-300 mb-3">
                Global Opportunities Fund
              </div>
              <div className="flex-1 min-h-0">
                <PerformanceChart />
              </div>
            </div>
          </div>

          {/* Floating card — Live NAV */}
          <motion.div
            className="absolute -top-4 -right-2 md:-right-6 bg-zinc-900/90 backdrop-blur-md border border-white/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_16px_40px_rgba(0,0,0,0.5)] rounded-2xl px-4 py-3 min-w-[136px]"
            initial={{ opacity: 0, y: -12, x: 6 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ delay: 1.0, type: "spring", stiffness: 100, damping: 22 }}
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
                aria-hidden="true"
              />
              <span className="text-[9px] font-medium uppercase tracking-widest text-zinc-500">
                Live NAV
              </span>
            </div>
            <div className="text-[19px] font-semibold text-zinc-100 tracking-tight">
              $284.37
            </div>
            <div className="text-[11px] text-emerald-400 mt-0.5">+2.14% today</div>
          </motion.div>

          {/* Floating card — Top performer */}
          <motion.div
            className="absolute -bottom-3 -left-3 md:-left-8 bg-zinc-900/90 backdrop-blur-md border border-white/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_16px_40px_rgba(0,0,0,0.5)] rounded-2xl px-4 py-3 w-52"
            initial={{ opacity: 0, y: 12, x: -6 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 100, damping: 22 }}
          >
            <div className="text-[9px] font-medium uppercase tracking-widest text-zinc-500 mb-1.5">
              YTD Leader
            </div>
            <div className="text-[13px] font-semibold text-zinc-100">
              Global Opportunities
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[11px] text-zinc-500">32 holdings</span>
              <span className="text-[11px] font-semibold text-emerald-400">+31.7%</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
