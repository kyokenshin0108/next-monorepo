// Server Component — no "use client" directive

const FEATURES = [
  {
    number: "01",
    title: "Quantitative Risk Modeling",
    description:
      "Multi-factor algorithms screen 4,800+ securities daily across volatility, momentum, quality, and value signals. Every position carries a quantified risk weight before it touches a portfolio.",
    tag: "Risk Engine",
  },
  {
    number: "02",
    title: "Fundamental Research Overlay",
    description:
      "Quantitative signals are stress-tested by a 23-person analyst team. Positions pass only when systematic and fundamental evidence converge—neither alone is sufficient.",
    tag: "Research",
  },
  {
    number: "03",
    title: "Continuous Exposure Monitoring",
    description:
      "Live tracking across factor loadings, concentration risk, and drawdown thresholds. Automated rebalancing triggers fire when portfolio limits breach defined tolerances.",
    tag: "Monitoring",
  },
  {
    number: "04",
    title: "Tax-Optimized Execution",
    description:
      "Loss-harvesting opportunities are identified during order execution. After-tax returns for high-net-worth clients exceed pre-tax benchmarks by 1.4% on average.",
    tag: "Execution",
  },
]

export default function StrategySection() {
  return (
    <section id="strategy" className="bg-zinc-950 py-28 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2.2fr] gap-16 md:gap-24">
          {/* Sticky label column */}
          <div className="md:sticky md:top-24 md:self-start">
            <span className="text-[11px] font-medium uppercase tracking-widest text-emerald-500">
              How it works
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-zinc-100 leading-[1.05] mt-3">
              How Arken
              <br />
              <span className="text-zinc-500">allocates capital</span>
            </h2>
            <p className="text-[14px] text-zinc-500 leading-relaxed mt-4 max-w-[34ch]">
              Four interconnected disciplines that work in sequence—never in
              isolation.
            </p>
          </div>

          {/* Feature list — divide-y, no card boxes */}
          <div className="divide-y divide-zinc-800/50">
            {FEATURES.map((f) => (
              <div
                key={f.number}
                className="py-8 md:py-10 grid grid-cols-[28px_1fr] gap-6 group"
              >
                <span className="text-[11px] font-mono text-zinc-700 mt-0.5 select-none tabular-nums">
                  {f.number}
                </span>
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-[16px] font-semibold text-zinc-100 tracking-tight group-hover:text-emerald-400 transition-colors duration-200">
                      {f.title}
                    </h3>
                    <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-600 border border-zinc-800 px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">
                      {f.tag}
                    </span>
                  </div>
                  <p className="text-[14px] text-zinc-500 leading-relaxed max-w-[60ch]">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
