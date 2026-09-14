import { AlertTriangle, Check, Fingerprint, RotateCcw } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Cta } from '../components/layout/Cta'
import { PageHero } from '../components/layout/PageHero'
import { Button } from '../components/ui/Button'
import { FadeIn } from '../components/ui/Motion'
import { Container } from '../components/ui/Section'

/* empty → loading → report. Sample data; the run button keeps `.demo-run`
   for the screenshot harness. */

const STEPS = ['Fetching CIBIL bureau report', 'Pulling GST filing history', 'Analysing 6 months of bank statements', 'Running risk model', 'Checking fraud & early-warning signals']
const BANDS = [
  ['Risk band', 'Prime', 82, 'bg-green'],
  ['GST health', 'Regular filer', 88, 'bg-green'],
  ['Bank behaviour', 'Moderate', 64, 'bg-amber'],
] as const

type Phase = 'empty' | 'loading' | 'report'
const R = 54
const C = 2 * Math.PI * R
const STEP_MS = 620

export function Demo() {
  const [phase, setPhase] = useState<Phase>('empty')
  const [step, setStep] = useState(-1)
  const [score, setScore] = useState(0)
  const timers = useRef<number[]>([])
  const raf = useRef(0)

  const reset = () => {
    timers.current.forEach(clearTimeout)
    cancelAnimationFrame(raf.current)
    setPhase('empty')
    setStep(-1)
    setScore(0)
  }
  useEffect(() => reset, [])

  const run = () => {
    reset()
    setPhase('loading')
    STEPS.forEach((_, i) => timers.current.push(window.setTimeout(() => setStep(i), i * STEP_MS)))
    timers.current.push(
      window.setTimeout(() => {
        setStep(STEPS.length)
        setPhase('report')
        const t0 = performance.now()
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / 1200)
          setScore(Math.round(742 * (1 - Math.pow(1 - p, 3))))
          if (p < 1) raf.current = requestAnimationFrame(tick)
        }
        raf.current = requestAnimationFrame(tick)
      }, STEPS.length * STEP_MS + 400),
    )
  }

  return (
    <>
      <PageHero eyebrow="Live demo" title={<>Run a decision. <em>Watch the report build.</em></>} lede="Sample data pre-loaded. Hit run." />

      <Container className="pb-8">
        <FadeIn className="grid overflow-hidden rounded-[32px] bg-cream shadow-card ring-1 ring-line lg:grid-cols-[340px_1fr]">
          {/* application */}
          <div className="border-b border-line p-7 lg:border-b-0 lg:border-r">
            <div className="font-display text-[24px] font-medium">New application</div>
            <div className="mt-6 space-y-4">
              {[
                ['Applicant', 'Rahul Kumar'],
                ['Loan amount', '₹4,20,000'],
                ['Product', 'MSME · Working capital'],
                ['City', 'Coimbatore'],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-line pb-3">
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-hint">{k}</div>
                  <div className="mt-1 text-[15px] font-medium">{v}</div>
                </div>
              ))}
            </div>
            <div className="mt-7 flex items-center gap-3">
              <Button variant="saffron" size="lg" className="demo-run flex-1" onClick={run} disabled={phase === 'loading'}>
                <Fingerprint className="size-4" />
                {phase === 'report' ? 'Run again' : 'Run decision'}
              </Button>
              <button onClick={reset} aria-label="Reset" className="grid size-12 place-items-center rounded-full bg-paper text-muted hover:text-ink">
                <RotateCcw className="size-4" />
              </button>
            </div>
          </div>

          {/* output */}
          <div className="relative min-h-[520px] rule-y p-7 md:p-9">
            <AnimatePresence mode="wait">
              {phase === 'empty' && (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full min-h-[440px] flex-col items-center justify-center text-center">
                  <span className="grid size-20 place-items-center rounded-full bg-saffron-w text-saffron">
                    <Fingerprint className="size-9" />
                  </span>
                  <div className="mt-5 font-display text-[26px]">No decision yet</div>
                  <div className="mt-1 text-[14px] text-muted">Tap run. Nothing leaves your browser.</div>
                </motion.div>
              )}

              {phase === 'loading' && (
                <motion.div key="loading" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mx-auto flex h-full min-h-[440px] max-w-sm flex-col justify-center gap-2">
                  {STEPS.map((label, i) => {
                    const done = i < step
                    const now = i === step
                    return (
                      <motion.div key={label} animate={{ opacity: done || now ? 1 : 0.35 }} className="flex items-center gap-3 rounded-2xl bg-cream px-4 py-3 ring-1 ring-line">
                        <span className={`grid size-6 place-items-center rounded-full ${done ? 'bg-green text-paper' : 'bg-paper'}`}>
                          {done ? <Check className="size-3.5" strokeWidth={3} /> : now ? <span className="size-3.5 animate-spin rounded-full border-2 border-line border-t-saffron" /> : null}
                        </span>
                        <span className="text-[14px] font-medium">{label}</span>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}

              {phase === 'report' && (
                <motion.div key="report" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <motion.div
                      initial={{ scale: 1.6, rotate: -10, opacity: 0 }}
                      animate={{ scale: 1, rotate: -4, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
                      className="rounded-md border-[3px] border-saffron px-3 py-1 font-display text-[22px] font-semibold uppercase tracking-[0.08em] text-saffron"
                    >
                      Approve · STP
                    </motion.div>
                    <div className="text-right font-mono text-[11px] text-hint">
                      APP-2841
                      <br />
                      decided in minutes
                    </div>
                  </div>

                  <div className="mt-6 grid gap-6 rounded-3xl bg-cream p-6 ring-1 ring-line sm:grid-cols-[150px_1fr] sm:items-center">
                    <div className="relative mx-auto size-[130px]">
                      <svg viewBox="0 0 130 130" className="size-full -rotate-90">
                        <circle cx="65" cy="65" r={R} fill="none" strokeWidth="10" className="stroke-paper2" />
                        <motion.circle cx="65" cy="65" r={R} fill="none" strokeWidth="10" strokeLinecap="round" className="stroke-green" strokeDasharray={C} initial={{ strokeDashoffset: C }} animate={{ strokeDashoffset: C - C * (742 / 850) }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-display text-[34px] font-medium leading-none tabular-nums">{score}</span>
                        <span className="font-mono text-[10px] text-hint">/ 850</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {BANDS.map(([k, v, pct, tone], i) => (
                        <div key={k}>
                          <div className="flex justify-between text-[13px]">
                            <span className="text-muted">{k}</span>
                            <span className="font-semibold">{v}</span>
                          </div>
                          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-paper2">
                            <motion.div className={`h-full rounded-full ${tone}`} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-mint2 p-4 text-[13.5px]">
                      <div className="mb-1 flex items-center gap-1.5 font-semibold text-green">
                        <Check className="size-4" strokeWidth={3} /> Recommended
                      </div>
                      Sanction ₹4,20,000 · 24 months · KFS auto-generated.
                    </div>
                    <div className="rounded-2xl bg-saffron-w p-4 text-[13.5px]">
                      <div className="mb-1 flex items-center gap-1.5 font-semibold text-saffron">
                        <AlertTriangle className="size-4" /> Watch
                      </div>
                      Bank behaviour moderate — Saral Watch tags on day 1 if it slips.
                    </div>
                  </div>
                  <p className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-hint">Sample application · illustrative output</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>
      </Container>
      <Cta />
    </>
  )
}
