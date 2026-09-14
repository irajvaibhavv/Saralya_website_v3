import { FileText, Fingerprint } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { FadeIn } from '../ui/Motion'
import { Container, Section, SectionHead } from '../ui/Section'

/* The UPI argument, as a slider: drag from how lending works today to how it
   works with Saralya. Documents collapse into one tap, days into minutes. */

const DOCS = 12
const DAYS = 7

export function Upi() {
  const [t, setT] = useState(0) // 0 = today, 1 = with Saralya
  const docs = Math.round(DOCS * (1 - t))
  const days = Math.max(0, Math.round(DAYS * (1 - t)))

  return (
    <Section id="upi">
      <Container>
        <SectionHead eyebrow="Why UPI" title={<>Paying took a queue. <em>Then it took a tap.</em></>} lede="Drag to do the same to a loan." />
        <FadeIn className="rounded-[32px] bg-cream p-6 shadow-card ring-1 ring-line md:p-10">
          <div className="grid gap-10 md:grid-cols-[1fr_auto_1fr] md:items-center">
            {/* documents → tap */}
            <div className="relative min-h-[160px]">
              <div className="grid grid-cols-6 gap-2 sm:grid-cols-6">
                {Array.from({ length: DOCS }).map((_, k) => (
                  <motion.div
                    key={k}
                    animate={{ opacity: k < docs ? 1 : 0, scale: k < docs ? 1 : 0.4 }}
                    transition={{ duration: 0.25 }}
                    className="grid aspect-[3/4] place-items-center rounded-lg bg-paper ring-1 ring-line"
                  >
                    <FileText className="size-4 text-hint" />
                  </motion.div>
                ))}
              </div>
              <motion.div
                animate={{ opacity: t > 0.85 ? 1 : 0, scale: t > 0.85 ? 1 : 0.6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="absolute inset-0 grid place-items-center"
              >
                <span className="grid size-24 place-items-center rounded-full bg-saffron text-white shadow-saffron">
                  <Fingerprint className="size-11" />
                </span>
              </motion.div>
              <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-hint">
                {docs > 0 ? `${docs} documents · ${Math.max(1, Math.round(3 * (1 - t)))} branch visits` : 'One tap · one API call'}
              </div>
            </div>

            {/* slider */}
            <div className="flex flex-col items-center gap-3 md:w-[220px]">
              <div className="flex w-full justify-between font-mono text-[10.5px] uppercase tracking-[0.12em] text-hint">
                <span>Today</span>
                <span className="text-green">Saralya</span>
              </div>
              <input
                type="range"
                aria-label="From today's lending to Saralya"
                min={0}
                max={100}
                value={t * 100}
                onChange={(e) => setT(Number(e.target.value) / 100)}
                className="w-full"
                style={{ ['--pct' as string]: `${t * 100}%` }}
              />
              <span className="font-mono text-[10.5px] text-hint">drag →</span>
            </div>

            {/* days → minutes */}
            <div className="text-center md:text-right">
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-hint">Time to decision</div>
              <div className="display mt-2 text-[clamp(56px,9vw,120px)] tabular-nums">
                {days > 0 ? (
                  <>
                    {days}
                    <span className="font-light text-muted"> days</span>
                  </>
                ) : (
                  <span className="text-green">
                    &lt;5<span className="font-light"> min</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
