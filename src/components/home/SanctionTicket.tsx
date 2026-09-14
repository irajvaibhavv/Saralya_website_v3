import { Check, Fingerprint } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

/* idle → checking (4 sources tick in) → sanctioned (stamp) → idle.
   Loops on its own; a tap starts a run immediately. */

const CHECKS = ['CIBIL', 'GSTN', 'Account Aggregator', 'Fraud screen']
type Phase = 'idle' | 'checking' | 'sanctioned'

export function SanctionTicket() {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('idle')
  const [done, setDone] = useState(0)
  const timers = useRef<number[]>([])

  const clear = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const run = () => {
    clear()
    setDone(0)
    setPhase('checking')
    CHECKS.forEach((_, i) => timers.current.push(window.setTimeout(() => setDone(i + 1), 450 + i * 420)))
    timers.current.push(window.setTimeout(() => setPhase('sanctioned'), 450 + CHECKS.length * 420 + 200))
    timers.current.push(window.setTimeout(() => setPhase('idle'), 450 + CHECKS.length * 420 + 3400))
  }

  useEffect(() => {
    if (reduce) {
      setPhase('sanctioned')
      setDone(CHECKS.length)
      return
    }
    if (phase !== 'idle') return
    const id = window.setTimeout(run, 1800)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, reduce])

  useEffect(() => clear, [])

  return (
    <motion.button
      type="button"
      onClick={() => phase === 'idle' && run()}
      whileTap={{ scale: 0.98 }}
      aria-label="Run a sample decision"
      className="relative w-full rounded-2xl bg-cream p-4 text-left shadow-lift ring-1 ring-line"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-hint">Application · #SA-2041</div>
          <div className="mt-1 text-[15px] font-semibold">Rahul Kumar</div>
          <div className="text-[12.5px] text-muted">Kirana store · Coimbatore</div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-hint">Amount</div>
          <div className="font-display text-[20px] font-medium">₹4,20,000</div>
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        {CHECKS.map((c, i) => {
          const ok = phase !== 'idle' && done > i
          const now = phase === 'checking' && done === i
          return (
            <div key={c} className="flex items-center gap-2 text-[12.5px]">
              <span
                className={`grid size-4 place-items-center rounded-full transition-colors ${ok ? 'bg-green text-paper' : now ? 'bg-saffron' : 'bg-paper2'}`}
              >
                {ok && <Check className="size-2.5" strokeWidth={4} />}
                {now && <span className="size-1.5 animate-ping rounded-full bg-paper" />}
              </span>
              <span className={ok ? 'text-ink' : 'text-hint'}>{c}</span>
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
        <span className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-hint">
          <Fingerprint className="size-3.5 text-saffron" />
          {phase === 'idle' ? 'Tap to decide' : phase === 'checking' ? 'Deciding…' : 'Decided in minutes'}
        </span>
        {phase === 'idle' && <span className="size-2 rounded-full bg-saffron shadow-[0_0_0_6px_rgba(233,113,28,0.18)]" />}
      </div>

      <AnimatePresence>
        {phase === 'sanctioned' && (
          <motion.div
            key="stamp"
            initial={{ opacity: 0, scale: 1.8, rotate: -14 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 22 }}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-md border-[3px] border-saffron px-3 py-1 font-display text-[22px] font-semibold uppercase tracking-[0.08em] text-saffron/90 mix-blend-multiply"
          >
            Sanctioned
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
