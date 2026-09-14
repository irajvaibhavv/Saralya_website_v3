import { AnimatePresence, motion } from 'motion/react'
import { ROLES, type RoleId } from '../../content/site'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Section'
import { SanctionTicket } from './SanctionTicket'

const EASE = [0.22, 1, 0.36, 1] as const

export function Hero({ role, onRole }: { role: RoleId; onRole: (r: RoleId) => void }) {
  const current = ROLES.find((r) => r.id === role)!

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="eyebrow flex items-center gap-2"
            >
              <span className="size-1.5 rounded-full bg-saffron" />
              Lending infrastructure for India&rsquo;s banks &amp; NBFCs
            </motion.div>

            <h1 className="display mt-6 text-[clamp(48px,8vw,104px)]">
              {['Making Lending', 'Saral', 'for Bharat.'].map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className={`block ${i === 1 ? 'font-light text-saffron' : ''}`}
                    initial={{ y: '105%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.05 + i * 0.08 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Role picker — the page tailors itself to whoever walked in. */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.35 }}
              className="mt-10"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-hint">I am a…</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => onRole(r.id)}
                    aria-pressed={r.id === role}
                    className={`relative rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${
                      r.id === role ? 'text-paper' : 'text-ink2 hover:bg-cream'
                    }`}
                  >
                    {r.id === role && (
                      <motion.span layoutId="role-pill" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
                    )}
                    {r.label}
                  </button>
                ))}
              </div>
              <div className="mt-4 min-h-14 overflow-hidden sm:min-h-8">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={role}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="max-w-md font-display text-[19px] font-light leading-snug text-ink2 md:text-[22px]"
                  >
                    {current.line}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <ButtonLink to="/demo" variant="saffron" size="lg" arrow>
                Try a live decision
              </ButtonLink>
              <ButtonLink to="/#for-you" variant="ghost" size="lg">
                Show me what&rsquo;s for me
              </ButtonLink>
            </motion.div>
          </div>

          {/* Arch photo + the ticket that gets decided on top of it. */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="relative mx-auto w-full max-w-[520px] lg:ml-auto"
          >
            <div className="arch relative aspect-[4/5] overflow-hidden bg-paper2">
              <img src="/img/market.jpg" alt="A market street in India" className="size-full object-cover" fetchPriority="high" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <div className="absolute inset-x-6 bottom-6 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/80">
                For the institutions that lend to under-banked India
              </div>
            </div>
            <div className="absolute -left-4 top-[46%] w-[min(300px,82%)] md:-left-14">
              <SanctionTicket />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
