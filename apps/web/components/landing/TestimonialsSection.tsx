// Server Component

const QuoteIcon = () => (
  <svg
    width="32"
    height="24"
    viewBox="0 0 32 24"
    fill="none"
    aria-hidden="true"
    className="text-emerald-500/40"
  >
    <path
      d="M0 24V14.4C0 6.4 4.8 1.6 14.4 0l1.6 2.4C10.4 3.6 7.6 6.4 7.2 10.4H12V24H0zm18 0V14.4C18 6.4 22.8 1.6 32.4 0L34 2.4c-5.6 1.2-8.4 4-8.8 8H30V24H18z"
      fill="currentColor"
    />
  </svg>
)

function Avatar({ initials, hue }: { initials: string; hue: number }) {
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-semibold text-zinc-900 flex-shrink-0"
      style={{ backgroundColor: `hsl(${hue}, 55%, 68%)` }}
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}

const MAIN = {
  quote:
    "Arken's quantitative overlay caught the 2022 drawdown weeks ahead of the broader market. Our portfolio was positioned defensively before most institutional managers had even revised their outlooks.",
  name: "Marguerite Holloway",
  role: "Chief Investment Officer",
  company: "Westbridge Family Office",
  initials: "MH",
  hue: 158,
}

const SECONDARY = [
  {
    quote:
      "The transparency of their risk reporting is unmatched. We receive full factor exposure breakdowns every week—not summary sheets.",
    name: "Dorian Kesler",
    role: "Head of Alternatives",
    company: "Sentinel Pension Fund",
    initials: "DK",
    hue: 210,
  },
  {
    quote:
      "Three years in, the after-tax compounding difference is material. Exactly what they projected at onboarding.",
    name: "Adaeze Okonkwo",
    role: "Managing Director",
    company: "Ivory Capital Partners",
    initials: "AO",
    hue: 32,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="bg-zinc-950 py-28 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-16">
          <span className="text-[11px] font-medium uppercase tracking-widest text-emerald-500">
            Client Perspectives
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-zinc-100 leading-[1.05] mt-3">
            Words from
            <br />
            <span className="text-zinc-500">the people we serve</span>
          </h2>
        </div>

        {/* Asymmetric grid — ANTI-CENTER-BIAS, NOT 3-equal-cols */}
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6">
          {/* Featured testimonial — large */}
          <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-8 md:p-10 flex flex-col justify-between gap-8">
            <QuoteIcon />
            <blockquote className="text-[18px] md:text-[20px] text-zinc-200 leading-[1.55] font-medium tracking-[-0.01em] max-w-[56ch]">
              "{MAIN.quote}"
            </blockquote>
            <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/60">
              <Avatar initials={MAIN.initials} hue={MAIN.hue} />
              <div>
                <div className="text-[13px] font-semibold text-zinc-100">
                  {MAIN.name}
                </div>
                <div className="text-[12px] text-zinc-500">
                  {MAIN.role}, {MAIN.company}
                </div>
              </div>
            </div>
          </div>

          {/* Secondary testimonials — stacked */}
          <div className="flex flex-col gap-6">
            {SECONDARY.map((t) => (
              <div
                key={t.name}
                className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6 flex flex-col justify-between gap-6 flex-1"
              >
                <blockquote className="text-[15px] text-zinc-300 leading-[1.6]">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <Avatar initials={t.initials} hue={t.hue} />
                  <div>
                    <div className="text-[12px] font-semibold text-zinc-100">
                      {t.name}
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
