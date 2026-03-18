"use client"

const STATS = [
  "$4.2B Assets Under Management",
  "17.3% Annualized Net Returns",
  "312 Institutional Clients",
  "23 Years Operating History",
  "47 Countries — 6 Market Regions",
  "14 Active Strategies",
  "AA-Rated Internal Risk Framework",
  "1.74 10Y Average Sharpe Ratio",
]

// Duplicate for seamless loop
const ITEMS = [...STATS, ...STATS]

function Separator() {
  return (
    <span
      aria-hidden="true"
      className="w-[3px] h-[3px] rounded-full bg-zinc-700 flex-shrink-0 mx-2"
    />
  )
}

export default function StatsMarquee() {
  return (
    <div
      className="bg-zinc-900/50 border-y border-white/[0.05] py-3.5 overflow-hidden"
      aria-label="Key statistics"
    >
      <div
        className="flex items-center whitespace-nowrap"
        style={{
          animation: "marquee 38s linear infinite",
          willChange: "transform",
        }}
      >
        {ITEMS.map((stat, i) => (
          <span key={i} className="inline-flex items-center flex-shrink-0">
            <span className="text-[12px] font-medium text-zinc-400 tracking-wide px-4">
              {stat}
            </span>
            <Separator />
          </span>
        ))}
      </div>
    </div>
  )
}
