"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

// ─── Animated counter ─────────────────────────────────────────────────────────

function Counter({
  target,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  target: number
  decimals?: number
  prefix?: string
  suffix?: string
}) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  useEffect(() => {
    if (!inView) return
    let current = 0
    const duration = 1400
    const steps = duration / 16
    const increment = target / steps
    const timer = setInterval(() => {
      current = Math.min(current + increment, target)
      setVal(current)
      if (current >= target) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const METRICS = [
  { label: "Annualized Net Return", target: 17.3, decimals: 1, prefix: "+", suffix: "%" },
  { label: "Assets Under Management", target: 4.2, decimals: 1, prefix: "$", suffix: "B" },
  { label: "Institutional Clients", target: 312, decimals: 0, prefix: "", suffix: "" },
  { label: "Sharpe Ratio (10Y Avg)", target: 1.74, decimals: 2, prefix: "", suffix: "" },
]

const ANNUAL = [
  { year: "2019", arken: 29.1, bench: 18.4 },
  { year: "2020", arken: 22.7, bench: 14.1 },
  { year: "2021", arken: 31.4, bench: 22.8 },
  { year: "2022", arken: -4.2, bench: -12.6 },
  { year: "2023", arken: 18.9, bench: 13.7 },
  { year: "2024", arken: 24.6, bench: 17.2 },
]

const MAX_VAL = 35 // scale: 35% = full bar height

function barHeight(v: number): string {
  return `${Math.max((Math.abs(v) / MAX_VAL) * 100, 8)}%`
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PerformanceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section
      id="performance"
      ref={sectionRef}
      className="bg-zinc-900/25 py-28 md:py-36 border-y border-zinc-800/50"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-16">
          <span className="text-[11px] font-medium uppercase tracking-widest text-emerald-500">
            Track Record
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-zinc-100 leading-[1.05] mt-3">
            Consistent results
            <br />
            <span className="text-zinc-500">across every cycle</span>
          </h2>
        </div>

        {/* Metric row — dividers, no cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 md:divide-x divide-zinc-800/60 mb-24">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              className="md:px-8 first:pl-0 last:pr-0"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.08,
                type: "spring",
                stiffness: 100,
                damping: 22,
              }}
            >
              <div className="text-[42px] md:text-[48px] font-semibold text-zinc-100 tracking-tighter leading-none">
                <Counter {...m} />
              </div>
              <div className="text-[12px] text-zinc-500 mt-2">{m.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Annual returns chart */}
        <div>
          <div className="flex items-center gap-6 mb-6">
            <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">
              Annual Returns
            </span>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-emerald-500" aria-hidden="true" />
                <span className="text-[11px] text-zinc-400">Arken GOF</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-zinc-700" aria-hidden="true" />
                <span className="text-[11px] text-zinc-400">MSCI World</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3 md:gap-5">
            {ANNUAL.map((row, i) => {
              const isNeg = row.arken < 0
              return (
                <div key={row.year} className="flex flex-col gap-2">
                  {/* Bar area */}
                  <div className="relative h-28 flex items-end gap-1">
                    {/* Zero line */}
                    <div
                      className="absolute bottom-0 inset-x-0 border-t border-zinc-700/40"
                      aria-hidden="true"
                    />

                    {/* Arken bar */}
                    <div className="flex-1 flex items-end" style={{ height: barHeight(row.arken) }}>
                      <motion.div
                        className={`w-full h-full rounded-t-[3px] ${
                          isNeg ? "bg-red-500/60" : "bg-emerald-500"
                        }`}
                        style={{ transformOrigin: "bottom" }}
                        initial={{ scaleY: 0 }}
                        animate={inView ? { scaleY: 1 } : {}}
                        transition={{
                          delay: 0.3 + i * 0.07,
                          type: "spring",
                          stiffness: 80,
                          damping: 20,
                        }}
                      />
                    </div>

                    {/* Benchmark bar */}
                    <div
                      className="flex-1 flex items-end"
                      style={{ height: barHeight(row.bench) }}
                    >
                      <motion.div
                        className={`w-full h-full rounded-t-[3px] ${
                          row.bench < 0 ? "bg-red-900/50" : "bg-zinc-700"
                        }`}
                        style={{ transformOrigin: "bottom" }}
                        initial={{ scaleY: 0 }}
                        animate={inView ? { scaleY: 1 } : {}}
                        transition={{
                          delay: 0.35 + i * 0.07,
                          type: "spring",
                          stiffness: 80,
                          damping: 20,
                        }}
                      />
                    </div>
                  </div>

                  <div className="text-[10px] text-zinc-500 text-center tabular-nums">
                    {row.year}
                  </div>
                  <div
                    className={`text-[11px] font-semibold text-center tabular-nums ${
                      isNeg ? "text-red-400" : "text-emerald-400"
                    }`}
                  >
                    {isNeg ? "" : "+"}
                    {row.arken}%
                  </div>
                </div>
              )
            })}
          </div>

          <p className="text-[11px] text-zinc-600 mt-6">
            Past performance does not guarantee future results. Returns shown are net of fees.
            Benchmark: MSCI World Total Return Index.
          </p>
        </div>
      </div>
    </section>
  )
}
