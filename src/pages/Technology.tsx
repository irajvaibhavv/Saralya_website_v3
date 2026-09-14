import { motion } from 'motion/react'
import { useState } from 'react'
import { Cta } from '../components/layout/Cta'
import { PageHero } from '../components/layout/PageHero'
import { FadeIn, Item, Stagger } from '../components/ui/Motion'
import { Container, Section, SectionHead } from '../components/ui/Section'
import { COMPLIANCE, MODULES, PILLARS } from '../content/site'

/* Four pillars drive one diagram: pick a pillar, the layer it lives in lights up. */

const LAYERS = [
  { id: 'core', label: 'Your core banking', items: ['FinnOne', 'Lentra', 'Finflux', 'AllCloud'] },
  { id: 'api', label: 'Saralya API layer', items: ['REST + webhooks', 'Multi-tenant', 'AWS Mumbai'] },
  { id: 'modules', label: 'Six modules', items: MODULES.map((m) => m.name.replace('Saral ', '')) },
  { id: 'rails', label: "India's rails", items: ['Bureaus', 'Account Aggregator', 'GSTN · MCA21', 'NPCI · CIMS'] },
]
const PILLAR_LAYER = ['api', 'modules', 'api', 'rails']

export function Technology() {
  const [active, setActive] = useState(0)
  const lit = PILLAR_LAYER[active]

  return (
    <>
      <PageHero eyebrow="Technology" title={<>Built for <em>inspection.</em> Plugs into what you have.</>} />

      <Container className="pb-10">
        <FadeIn className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          <div className="space-y-2">
            {PILLARS.map((p, i) => (
              <button
                key={p.title}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`flex w-full items-start gap-4 rounded-2xl p-5 text-left transition-colors ${i === active ? 'bg-cream shadow-card ring-1 ring-line' : 'hover:bg-cream/60'}`}
              >
                <p.icon className={`mt-0.5 size-5 shrink-0 ${i === active ? 'text-saffron' : 'text-hint'}`} />
                <div>
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-hint">{p.sub}</div>
                  <div className="mt-1 font-display text-[22px] font-medium">{p.title}</div>
                  <motion.div initial={false} animate={{ height: i === active ? 'auto' : 0, opacity: i === active ? 1 : 0 }} className="overflow-hidden">
                    <ul className="mt-3 space-y-1.5 text-[13.5px] text-muted">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex gap-2">
                          <span className="mt-2 size-1 shrink-0 rounded-full bg-saffron" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </button>
            ))}
          </div>

          {/* stack diagram */}
          <div className="space-y-3 self-start lg:sticky lg:top-24">
            {LAYERS.map((l, i) => {
              const on = l.id === lit
              return (
                <div key={l.id}>
                  <motion.div
                    animate={{ scale: on ? 1.02 : 1 }}
                    className={`rounded-2xl p-5 ring-1 transition-colors duration-300 ${on ? 'bg-green text-paper ring-green' : 'bg-cream ring-line'}`}
                  >
                    <div className={`font-mono text-[10.5px] uppercase tracking-[0.14em] ${on ? 'text-mint' : 'text-hint'}`}>{l.label}</div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {l.items.map((it) => (
                        <span key={it} className={`rounded-full px-2.5 py-1 text-[12px] ${on ? 'bg-paper/15' : 'bg-paper text-ink2'}`}>
                          {it}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                  {i < LAYERS.length - 1 && (
                    <div className="flex justify-center py-1">
                      <motion.span
                        className="h-5 w-px bg-line2"
                        animate={{ scaleY: [0, 1], opacity: [0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1.2, delay: i * 0.3 }}
                        style={{ originY: 0 }}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </FadeIn>
      </Container>

      <Section id="compliance">
        <Container>
          <SectionHead eyebrow="Compliance" title={<>Regulation is <em>architecture</em>, not a feature.</>} />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMPLIANCE.map((c) => (
              <Item key={c.title} className="group rounded-3xl bg-cream p-6 ring-1 ring-line transition-shadow hover:shadow-card">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-saffron">{c.tag}</div>
                <div className="mt-2 font-display text-[22px] font-medium">{c.title}</div>
                <p className="mt-2 text-[13.5px] text-muted">{c.body}</p>
              </Item>
            ))}
          </Stagger>
        </Container>
      </Section>
      <Cta />
    </>
  )
}
