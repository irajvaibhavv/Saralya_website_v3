import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Cta } from '../components/layout/Cta'
import { PageHero } from '../components/layout/PageHero'
import { FadeIn } from '../components/ui/Motion'
import { Container, Section, SectionHead } from '../components/ui/Section'
import { CONVICTIONS, FOUNDERS } from '../content/site'

export function About() {
  const [f, setF] = useState(0)
  const founder = FOUNDERS[f]

  return (
    <>
      <PageHero eyebrow="About" title={<>Ten years of Indian credit will be written <em>outside the metros.</em></>} />

      {/* convictions beside the arch photo */}
      <Container className="pb-10">
        <FadeIn className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="arch mx-auto aspect-[4/5] w-full max-w-[380px] overflow-hidden">
            <img src="/img/ledger.jpg" alt="" className="size-full object-cover" />
          </div>
          <ol className="divide-y divide-line">
            {CONVICTIONS.map((c) => (
              <li key={c.n} className="group grid gap-3 py-6 sm:grid-cols-[56px_1fr]">
                <span className="font-mono text-[12px] text-saffron">{c.n}</span>
                <div>
                  <div className="display text-[clamp(24px,2.8vw,34px)]">{c.title}</div>
                  <p className="mt-2 max-w-lg text-[14.5px] text-muted">{c.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </FadeIn>
      </Container>

      {/* founders — two tabs, one card */}
      <Section id="founders">
        <Container>
          <SectionHead eyebrow="Founders" title={<>Two people who have <em>run the engine room.</em></>} />
          <FadeIn className="overflow-hidden rounded-[32px] bg-green text-paper shadow-lift">
            <div className="flex border-b border-paper/10">
              {FOUNDERS.map((x, i) => (
                <button
                  key={x.name}
                  type="button"
                  onClick={() => setF(i)}
                  aria-pressed={i === f}
                  className={`relative flex-1 px-5 py-4 text-left transition-colors ${i === f ? 'text-paper' : 'text-paper/50 hover:text-paper/80'}`}
                >
                  <span className="font-display text-[20px]">{x.name}</span>
                  <span className="ml-3 hidden font-mono text-[11px] uppercase tracking-[0.12em] sm:inline">{x.role}</span>
                  {i === f && <motion.span layoutId="founder-bar" className="absolute inset-x-0 bottom-0 h-0.5 bg-saffron" />}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid gap-8 p-6 md:grid-cols-[auto_1fr] md:p-10"
              >
                <div className="flex size-24 items-center justify-center rounded-full bg-paper font-display text-[32px] text-green">{founder.initials}</div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-mint">{founder.line}</div>
                  <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-paper/85">{founder.body}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {founder.points.map((p) => (
                      <li key={p} className="rounded-full bg-paper/10 px-3 py-1.5 text-[12.5px]">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </FadeIn>
        </Container>
      </Section>
      <Cta />
    </>
  )
}
