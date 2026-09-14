import { Link } from 'react-router-dom'
import { CONTACT_EMAIL } from '../../content/site'
import { Logo } from './Nav'

const COLS = [
  { h: 'Product', links: [['Products', '/products'], ['Technology', '/technology'], ['Live demo', '/demo']] },
  { h: 'Company', links: [['About', '/about'], ['Privacy', '/privacy'], ['Contact', `mailto:${CONTACT_EMAIL}`]] },
]

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-[14px] text-muted">Lending infrastructure for India&rsquo;s banks and NBFCs. Built in Bharat, for Bharat.</p>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-hint">AWS Mumbai · DR Hyderabad</p>
        </div>
        {COLS.map((c) => (
          <div key={c.h}>
            <div className="eyebrow mb-4">{c.h}</div>
            <ul className="space-y-2.5 text-[14px]">
              {c.links.map(([label, to]) => (
                <li key={label}>
                  {to.startsWith('mailto') ? (
                    <a href={to} className="text-ink2 hover:text-saffron">
                      {label}
                    </a>
                  ) : (
                    <Link to={to} className="text-ink2 hover:text-saffron">
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-2 px-5 py-5 font-mono text-[11px] text-hint md:px-8">
          <span>© {new Date().getFullYear()} Saralya Technologies</span>
          <span>Making Lending Saral for Bharat</span>
        </div>
      </div>
    </footer>
  )
}
