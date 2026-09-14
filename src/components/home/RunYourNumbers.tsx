import { motion, useMotionValueEvent, useReducedMotion, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { CONTACT_EMAIL } from '../../content/site'
import { ButtonLink } from '../ui/Button'
import { FadeIn } from '../ui/Motion'
import { Container, Section, SectionHead } from '../ui/Section'

/* Three sliders, and the visitor's own book decided in minutes. Every figure
   is derived from their inputs — nothing is claimed about other lenders. */

const PER_LOAN = 75 // ₹/loan, mid-point of the pay-per-loan band

const crore = (n: number) => (n >= 1e7 ? `₹${(n / 1e7).toFixed(n < 1e8 ? 1 : 0)} Cr` : n >= 1e5 ? `₹${(n / 1e5).toFixed(n < 1e6 ? 1 : 0)} L` : `₹${Math.round(n).toLocaleString('en-IN')}`)
const count = (n: number) => Math.round(n).toLocaleString('en-IN')

export function RunYourNumbers() {
  const [loans, setLoans] = useState(5000)
  const [ticket, setTicket] = useState(200000)
  const [tat, setTat] = useState(5)

  const disbursal = loans * ticket
  const unlocked = (disbursal * tat) / 30
  const cost = loans * PER_LOAN
  const months = Array.from({ length: 12 }, (_, i) => (i + 1) * unlocked)

  const body = encodeURIComponent(
    `Loans/month: ${count(loans)}\nAverage ticket: ${crore(ticket)}\nTurnaround today: ${tat} days\n\nValue released/month: ${crore(unlocked)}\nPlatform cost/month: ${crore(cost)}\n\nPlease send me this model.`,
  )

  return (
    <Section id="numbers" className="bg-ink text-paper">
      <Container>
        <SectionHead dark eyebrow="Run your own book" title={<>Move three sliders. <em>See what minutes are worth.</em></>} />
        <FadeIn className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="space-y-8">
            <Slider label="Loans decided / month" value={loans} min={250} max={50000} step={250} display={count(loans)} onChange={setLoans} />
            <Slider label="Average ticket" value={ticket} min={25000} max={2500000} step={25000} display={crore(ticket)} onChange={setTicket} />
            <Slider label="Turnaround today" value={tat} min={1} max={21} step={1} display={`${tat} day${tat === 1 ? '' : 's'}`} onChange={setTat} />
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-paper/40">Indicative · your inputs, our pricing · nothing leaves your browser</p>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-paper/10 ring-1 ring-paper/10">
              <Cell label="Decision time" value="< 5 min" note={`down from ${tat} days`} accent />
              <Cell label="Monthly disbursal" value={<Roll to={disbursal} />} note={`${count(loans)} loans`} />
              <Cell label="Released from the queue" value={<Roll to={unlocked} />} note="every month" big />
              <Cell label="Platform cost" value={<Roll to={cost} />} note={`₹${PER_LOAN}/loan · no capex`} />
            </div>

            {/* 12-month ledger bars */}
            <div className="mt-6 flex h-[110px] items-end gap-1.5">
              {months.map((v, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-saffron/40 to-saffron"
                  animate={{ height: `${((i + 1) / 12) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 160, damping: 22, delay: i * 0.02 }}
                  title={crore(v)}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between font-mono text-[10.5px] uppercase tracking-[0.12em] text-paper/40">
              <span>Month 1</span>
              <span>
                12 months · <span className="text-saffron2">{crore(unlocked * 12)}</span> released
              </span>
            </div>

            <div className="mt-8">
              <ButtonLink to={`mailto:${CONTACT_EMAIL}?subject=Portfolio%20model&body=${body}`} variant="saffron" arrow>
                Send me this model
              </ButtonLink>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}

function Slider({ label, value, min, max, step, display, onChange }: { label: string; value: number; min: number; max: number; step: number; display: string; onChange: (n: number) => void }) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-paper/50">{label}</span>
        <span className="font-display text-[28px] font-medium tabular-nums">{display}</span>
      </div>
      <input
        type="range"
        aria-label={label}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full"
        style={{ ['--pct' as string]: `${pct}%`, background: `linear-gradient(var(--color-saffron), var(--color-saffron)) 0 / ${pct}% 100% no-repeat, rgba(244,238,226,0.15)` }}
      />
    </div>
  )
}

function Cell({ label, value, note, accent, big }: { label: string; value: React.ReactNode; note: string; accent?: boolean; big?: boolean }) {
  return (
    <div className={`p-5 md:p-6 ${big ? 'bg-saffron text-white' : 'bg-ink'}`}>
      <div className={`font-mono text-[10.5px] uppercase tracking-[0.12em] ${big ? 'text-white/70' : 'text-paper/40'}`}>{label}</div>
      <div className={`display mt-2 text-[clamp(24px,3vw,36px)] tabular-nums ${accent ? 'text-saffron2' : ''}`}>{value}</div>
      <div className={`mt-1 text-[12.5px] ${big ? 'text-white/80' : 'text-paper/50'}`}>{note}</div>
    </div>
  )
}

function Roll({ to }: { to: number }) {
  const reduce = useReducedMotion()
  const spring = useSpring(to, { stiffness: 170, damping: 26 })
  const [shown, setShown] = useState(to)
  useMotionValueEvent(spring, 'change', (v) => setShown(v))
  useEffect(() => {
    spring.set(to)
  }, [to, spring])
  return <>{crore(reduce ? to : shown)}</>
}
