// Server Component

function LogoMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
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

const LINKS = {
  Strategies: ["Global Opportunities", "Fixed Income Core", "Multi-Asset", "Alternatives", "ESG Growth"],
  Company: ["About Arken", "Team", "Careers", "Press", "Contact"],
  Research: ["Market Outlook", "Factor Reports", "Webinars", "Whitepapers"],
  Legal: ["Privacy Policy", "Terms of Use", "Disclosures", "Cookie Settings"],
}

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 pb-10">
        {/* Top grid — asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-12 md:gap-8">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <LogoMark />
              <span className="text-[14px] font-semibold text-zinc-100 tracking-tight">
                Arken Capital
              </span>
            </div>
            <p className="text-[13px] text-zinc-500 leading-relaxed max-w-[30ch]">
              Quantitative precision and fundamental discipline—compounding for
              institutions and family offices since 2002.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[11px] text-zinc-600">
                SEC Registered Investment Adviser
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500 mb-4">
                {group}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-16 pt-6 border-t border-zinc-800/50">
          <p className="text-[12px] text-zinc-600">
            &copy; {new Date().getFullYear()} Arken Capital Management LLC. All rights reserved.
          </p>
          <p className="text-[11px] text-zinc-700 max-w-[56ch] text-left md:text-right leading-relaxed">
            Investment involves risk, including the possible loss of principal.
            Past performance is not indicative of future results. Not an offer
            to buy or sell securities.
          </p>
        </div>
      </div>
    </footer>
  )
}
