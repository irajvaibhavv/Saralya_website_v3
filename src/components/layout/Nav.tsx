import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ButtonLink } from '../ui/Button'

const LINKS = [
  { to: '/products', label: 'Products' },
  { to: '/technology', label: 'Technology' },
  { to: '/about', label: 'About' },
]

export function Logo({ light }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Saralya home">
      <svg viewBox="0 0 32 32" className="size-7">
        <rect width="32" height="32" rx="8" className={light ? 'fill-paper' : 'fill-green'} />
        <path d="M8 16a8 8 0 0 1 16 0v8H8z" className={light ? 'fill-green' : 'fill-paper'} />
        <circle cx="16" cy="17" r="3" className="fill-saffron" />
      </svg>
      <span className={`font-display text-[22px] font-medium tracking-[-0.02em] ${light ? 'text-paper' : 'text-ink'}`}>saralya</span>
    </Link>
  )
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header className="sticky top-0 z-50">
      <div className={`transition-colors duration-300 ${scrolled ? 'border-b border-line bg-paper/85 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 md:px-8">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${isActive ? 'text-ink' : 'text-muted hover:text-ink'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-cream shadow-card" />}
                    {l.label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="hidden md:block">
            <ButtonLink to="/demo" variant="ink" arrow>
              Try a live decision
            </ButtonLink>
          </div>
          <button className="grid size-10 place-items-center md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute inset-x-3 top-[68px] rounded-3xl border border-line bg-cream p-3 shadow-lift md:hidden"
          >
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className="block rounded-2xl px-4 py-3 text-[16px] font-medium hover:bg-paper">
                {l.label}
              </NavLink>
            ))}
            <ButtonLink to="/demo" variant="saffron" className="mt-2 w-full" arrow>
              Try a live decision
            </ButtonLink>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
