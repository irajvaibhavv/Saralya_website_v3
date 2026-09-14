import { Check } from 'lucide-react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { CONTACT_EMAIL, CONVICTIONS, ROLES, type RoleId } from '../../content/site'
import { MODULE_VISUALS } from '../products/ModuleVisuals'
import { ButtonLink } from '../ui/Button'
import { Counter, FadeIn } from '../ui/Motion'
import { Container, Section, SectionHead } from '../ui/Section'

/* One panel per person who might land here. The hero role picker preselects
   it; tabs let anyone switch. Each panel = one visual, one line, one action. */

type Panel = { head: ReactNode; visual: ReactNode; cta: { to: string; label: string } }

const Insight = MODULE_VISUALS.M5
const Watch = MODULE_VISUALS.M3

function panel(id: RoleId, inView: boolean): Panel {
  switch (id) {
    case 'ceo':
      return {
        head: <>Grow the book <em>without growing the branch.</em></>,
        visual: <Insight />,
        cta: { to: '/#numbers', label: 'Run my numbers' },
      }
    case 'cro':
      return {
        head: <>See stress on day 1, <em>not day 31.</em></>,
        visual: <Watch />,
        cta: { to: '/products', label: 'See Saral Watch' },
      }
    case 'cto':
      return {
        head: <>One API call. <em>Your core stays where it is.</em></>,
        visual: <ApiCall active={inView} />,
        cta: { to: '/technology', label: 'See the architecture' },
      }
    case 'compliance':
      return {
        head: <>Tick what you already have. <em>We show the gaps.</em></>,
        visual: <Readiness />,
        cta: { to: `mailto:${CONTACT_EMAIL}?subject=Compliance%20checklist`, label: 'Get all 600 checks' },
      }
    case 'investor':
      return {
        head: <>Built by people who have <em>run the engine room.</em></>,
        visual: <Pedigree />,
        cta: { to: '/about', label: 'Meet the founders' },
      }
  }
}

export function ForYou({ role, onRole }: { role: RoleId; onRole: (r: RoleId) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-15% 0px' })
  const p = panel(role, inView)

  return (
    <Section id="for-you">
      <Container>
        <SectionHead eyebrow="Something for everyone" title={<>Whoever you are, <em>there is a tap for you.</em></>} />
        <FadeIn>
          <div ref={ref} className="grid gap-6 lg:grid-cols-[220px_1fr]">
            <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => onRole(r.id)}
                  aria-pressed={r.id === role}
                  className={`relative shrink-0 rounded-full px-4 py-2.5 text-left text-[14px] font-medium transition-colors lg:rounded-2xl lg:px-5 lg:py-3.5 ${
                    r.id === role ? 'text-paper' : 'text-ink2 hover:bg-cream'
                  }`}
                >
                  {r.id === role && <motion.span layoutId="foryou-pill" className="absolute inset-0 -z-10 rounded-full bg-green lg:rounded-2xl" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                  {r.label}
                </button>
              ))}
            </div>

            <div className="overflow-hidden rounded-[32px] bg-cream shadow-card ring-1 ring-line">
              <AnimatePresence mode="wait">
                <motion.div
                  key={role}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="grid gap-8 p-6 md:grid-cols-[1fr_1fr] md:items-center md:p-10"
                >
                  <div>
                    <h3 className="display text-[clamp(30px,3.6vw,44px)] [&_em]:font-light [&_em]:italic [&_em]:text-saffron">{p.head}</h3>
                    <div className="mt-8">
                      <ButtonLink to={p.cta.to} variant="ink" arrow>
                        {p.cta.label}
                      </ButtonLink>
                    </div>
                  </div>
                  <div className="mx-auto w-full max-w-[380px]">{p.visual}</div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}

/* CTO — a request goes out, a decision types itself back. */
const RESPONSE = `{
  "decision": "APPROVE",
  "score": 742,
  "band": "prime",
  "limit": 420000,
  "sources": ["cibil","aa","gstn"],
  "latency_ms": 184
}`

function ApiCall({ active }: { active: boolean }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!active) return
    let i = 0
    const id = window.setInterval(() => {
      i += 3
      setN(i)
      if (i >= RESPONSE.length + 60) i = -40
    }, 24)
    return () => clearInterval(id)
  }, [active])
  return (
    <div className="overflow-hidden rounded-2xl bg-ink font-mono text-[12px] leading-relaxed text-paper shadow-lift">
      <div className="flex items-center gap-2 border-b border-paper/10 px-4 py-2.5 text-[10.5px] text-paper/50">
        <span className="size-2 rounded-full bg-red/80" />
        <span className="size-2 rounded-full bg-amber/80" />
        <span className="size-2 rounded-full bg-green3" />
        <span className="ml-2">POST /v1/decisions</span>
      </div>
      <pre className="min-h-[190px] whitespace-pre-wrap p-4">
        <span className="text-saffron2">$ </span>curl -X POST api.saralya.in/v1/decisions \{'\n'}
        {'  '}-d @application.json{'\n\n'}
        <span className="text-mint">{RESPONSE.slice(0, Math.max(0, n))}</span>
        <span className="animate-pulse">▍</span>
      </pre>
    </div>
  )
}

/* Compliance — six taps, a score ring. */
const CHECKS = [
  ['21-day SCN before fraud tagging', 'MD-FRM'],
  ['KFS on every digital loan', 'DLD 2025'],
  ['Every DLA registered on CIMS', 'CIMS'],
  ['DPDP consent + row-level erasure', 'DPDP'],
  ['CRILC / NBS-9 generated, not typed', 'Returns'],
  ['Immutable audit trail', 'Audit'],
]
const R = 40
const C = 2 * Math.PI * R

function Readiness() {
  const [on, setOn] = useState(() => CHECKS.map(() => false))
  const score = on.filter(Boolean).length
  return (
    <div>
      <div className="flex items-center gap-5">
        <div className="relative size-24 shrink-0">
          <svg viewBox="0 0 100 100" className="size-full -rotate-90">
            <circle cx="50" cy="50" r={R} fill="none" strokeWidth="9" className="stroke-paper2" />
            <motion.circle
              cx="50"
              cy="50"
              r={R}
              fill="none"
              strokeWidth="9"
              strokeLinecap="round"
              className={score === 6 ? 'stroke-green' : score > 3 ? 'stroke-amber' : 'stroke-red'}
              strokeDasharray={C}
              animate={{ strokeDashoffset: C * (1 - score / 6) }}
              transition={{ type: 'spring', stiffness: 140, damping: 22 }}
            />
          </svg>
          <span className="absolute inset-0 grid place-items-center font-display text-[22px] font-medium tabular-nums">{score}/6</span>
        </div>
        <p className="text-[15px] font-medium leading-snug">
          {score === 6 ? 'Inspection-ready. Saral Comply keeps it that way.' : `${6 - score} open to an inspection question.`}
        </p>
      </div>
      <div className="mt-4 space-y-1.5">
        {CHECKS.map(([q, tag], i) => (
          <button
            key={q}
            type="button"
            aria-pressed={on[i]}
            onClick={() => setOn((p) => p.map((v, j) => (j === i ? !v : v)))}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[13px] transition-colors ${on[i] ? 'bg-mint2' : 'bg-paper hover:bg-paper2'}`}
          >
            <span className={`grid size-4.5 shrink-0 place-items-center rounded-md border ${on[i] ? 'border-green bg-green text-paper' : 'border-line2'}`}>
              {on[i] && <Check className="size-3" strokeWidth={4} />}
            </span>
            <span className="flex-1">{q}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-hint">{tag}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* Investor — the two numbers the founders stand behind, and what they believe. */
function Pedigree() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {[
          [4, '+', 'decades of experience'],
          [200, '+', 'banks of pedigree'],
        ].map(([n, s, l]) => (
          <div key={l} className="rounded-2xl bg-paper p-5">
            <div className="display text-[44px] text-green">
              <Counter to={n as number} suffix={s as string} />
            </div>
            <div className="mt-1 text-[13px] text-muted">{l}</div>
          </div>
        ))}
      </div>
      <ol className="mt-4 space-y-2">
        {CONVICTIONS.map((c) => (
          <li key={c.n} className="flex gap-3 rounded-xl bg-paper px-4 py-3 text-[13.5px]">
            <span className="font-mono text-[11px] text-saffron">{c.n}</span>
            {c.title}
          </li>
        ))}
      </ol>
    </div>
  )
}
