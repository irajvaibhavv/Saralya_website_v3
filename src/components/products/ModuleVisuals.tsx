import { Check } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { ComponentType } from 'react'
import { useEffect, useState } from 'react'

/* One looping visual per module. Each is self-contained, ~1:1, and restarts
   with a delay so it reads as "alive" without demanding attention. */

const LOOP = (duration: number, repeatDelay = 1.6) => ({ duration, repeat: Infinity, repeatDelay, ease: [0.22, 1, 0.36, 1] as const })

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-cream p-6 shadow-card ring-1 ring-line md:p-8">
      <div className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.14em] text-hint md:left-7 md:top-7">{label}</div>
      <div className="flex size-full items-center justify-center pt-4">{children}</div>
    </div>
  )
}

/* M1 — score dial fills, sources light up */
function Appraisal() {
  const R = 70
  const C = 2 * Math.PI * R
  const [n, setN] = useState(0)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return setN(742)
    let raf = 0
    const loop = () => {
      const t0 = performance.now()
      const tick = (t: number) => {
        const p = Math.min((t - t0) / 1600, 1)
        setN(Math.round(742 * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
        else setTimeout(loop, 2200)
      }
      raf = requestAnimationFrame(tick)
    }
    loop()
    return () => cancelAnimationFrame(raf)
  }, [reduce])
  return (
    <Frame label="Saral Appraisal">
      <div className="relative size-[200px]">
        <svg viewBox="0 0 160 160" className="size-full -rotate-90">
          <circle cx="80" cy="80" r={R} fill="none" strokeWidth="10" className="stroke-paper2" />
          <motion.circle
            cx="80"
            cy="80"
            r={R}
            fill="none"
            strokeWidth="10"
            strokeLinecap="round"
            className="stroke-green"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={{ strokeDashoffset: [C, C * 0.18, C * 0.18] }}
            transition={{ duration: 3.8, times: [0, 0.42, 1], repeat: Infinity, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-[44px] font-medium leading-none tabular-nums">{n}</span>
          <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-green">Prime · approve</span>
        </div>
        {['CIBIL', 'AA', 'GSTN'].map((s, i) => (
          <motion.span
            key={s}
            className="absolute rounded-full bg-ink px-2 py-0.5 font-mono text-[10px] text-paper"
            style={{ left: ['-14%', '78%', '30%'][i], top: ['12%', '20%', '-8%'][i] }}
            animate={{ opacity: [0, 1, 1, 0], y: [6, 0, 0, -4] }}
            transition={{ duration: 3.8, times: [0, 0.15, 0.85, 1], repeat: Infinity, delay: i * 0.25 }}
          >
            {s}
          </motion.span>
        ))}
      </div>
    </Frame>
  )
}

/* M2 — applicant network; one cluster lights up red */
function Screen() {
  const nodes = [
    [40, 60], [90, 30], [150, 50], [200, 90], [60, 130], [120, 110], [180, 160], [100, 180], [30, 190],
  ]
  const edges: [number, number][] = [[0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 3], [5, 6], [6, 7], [7, 8], [4, 8], [1, 5]]
  const cluster = new Set([4, 5, 8])
  return (
    <Frame label="Saral Screen">
      <svg viewBox="0 0 240 220" className="w-full max-w-[280px]">
        {edges.map(([a, b], i) => {
          const hot = cluster.has(a) && cluster.has(b)
          return (
            <motion.line
              key={i}
              x1={nodes[a][0]}
              y1={nodes[a][1]}
              x2={nodes[b][0]}
              y2={nodes[b][1]}
              strokeWidth={hot ? 2.5 : 1.2}
              className={hot ? 'stroke-red' : 'stroke-line2'}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={LOOP(1.2, 2.4)}
            />
          )
        })}
        {nodes.map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={cluster.has(i) ? 8 : 6}
            className={cluster.has(i) ? 'fill-red' : 'fill-green'}
            animate={cluster.has(i) ? { scale: [1, 1.35, 1] } : { scale: 1 }}
            transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.6, delay: 1.2 }}
            style={{ transformOrigin: `${x}px ${y}px` }}
          />
        ))}
        <motion.g animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 3.6, repeat: Infinity, times: [0, 0.3, 0.9, 1] }}>
          <rect x="112" y="186" width="118" height="24" rx="12" className="fill-ink" />
          <text x="171" y="202" textAnchor="middle" className="fill-paper font-mono text-[10px]">
            Cluster flagged · SCN
          </text>
        </motion.g>
      </svg>
    </Frame>
  )
}

/* M3 — cashflow line, stress flag on day 1 */
function Watch() {
  const d = 'M10 90 C 40 80, 60 60, 90 70 S 140 90, 170 60 S 220 30, 250 80 S 290 130, 310 120'
  return (
    <Frame label="Saral Watch">
      <svg viewBox="0 0 320 180" className="w-full">
        {[40, 80, 120].map((y) => (
          <line key={y} x1="10" x2="310" y1={y} y2={y} className="stroke-line" strokeDasharray="2 6" />
        ))}
        <motion.path d={d} fill="none" strokeWidth="3" className="stroke-green" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={LOOP(2)} />
        <motion.g initial={{ opacity: 0, y: 6 }} animate={{ opacity: [0, 0, 1, 1, 0], y: [6, 6, 0, 0, 0] }} transition={{ duration: 3.6, times: [0, 0.55, 0.65, 0.95, 1], repeat: Infinity }}>
          <line x1="250" x2="250" y1="20" y2="150" className="stroke-saffron" strokeWidth="1.5" strokeDasharray="3 4" />
          <circle cx="250" cy="80" r="7" className="fill-saffron" />
          <rect x="176" y="150" width="148" height="24" rx="12" className="fill-ink" />
          <text x="250" y="166" textAnchor="middle" className="fill-paper font-mono text-[10px]">
            SMA-0 tagged · Day 1
          </text>
        </motion.g>
      </svg>
    </Frame>
  )
}

/* M4 — buckets, RPC connects stream in */
function Recover() {
  const rows = [
    ['0–30', 88, 'bg-green'],
    ['31–60', 62, 'bg-green3'],
    ['61–90', 41, 'bg-amber'],
    ['90+', 22, 'bg-red'],
  ] as const
  return (
    <Frame label="Saral Recover">
      <div className="w-full space-y-4">
        {rows.map(([b, pct, tone], i) => (
          <div key={b} className="flex items-center gap-3">
            <span className="w-12 font-mono text-[11px] text-hint">{b}</span>
            <div className="h-6 flex-1 overflow-hidden rounded-full bg-paper2">
              <motion.div
                className={`h-full rounded-full ${tone}`}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ ...LOOP(1.4, 2.2), delay: i * 0.12 }}
              />
            </div>
            <motion.span
              className="w-8 text-right font-mono text-[11px] text-ink"
              animate={{ opacity: [0, 1] }}
              transition={{ ...LOOP(0.5, 3.1), delay: 1.2 + i * 0.12 }}
            >
              {pct}%
            </motion.span>
          </div>
        ))}
        <motion.div
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 font-mono text-[10px] text-paper"
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3.6, times: [0, 0.4, 0.9, 1], repeat: Infinity }}
        >
          <span className="size-1.5 rounded-full bg-mint" /> RPC-first dialler · connected
        </motion.div>
      </div>
    </Frame>
  )
}

/* M5 — vintage cohorts, one is hot */
function Insight() {
  const cohorts = [18, 26, 34, 72, 41, 29]
  return (
    <Frame label="Saral Insight">
      <div className="w-full">
        <div className="flex h-[170px] items-end gap-3">
          {cohorts.map((v, i) => (
            <motion.div
              key={i}
              className={`flex-1 rounded-t-md ${v > 60 ? 'bg-saffron' : 'bg-green/70'}`}
              initial={{ height: 0 }}
              animate={{ height: `${v * 1.3}%` }}
              transition={{ ...LOOP(1, 2.6), delay: i * 0.08 }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] text-hint">
          {['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((m) => (
            <span key={m} className="flex-1 text-center">{m}</span>
          ))}
        </div>
        <motion.div
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 font-mono text-[10px] text-paper"
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3.6, times: [0, 0.4, 0.9, 1], repeat: Infinity }}
        >
          Jul cohort · 3.6% 90+ DPD
        </motion.div>
      </div>
    </Frame>
  )
}

/* M6 — four clicks, pack ready */
function Comply() {
  const items = ['MD-FRM', 'DLD 2025', 'KYC MD', 'DPDP', 'CRILC', 'NBS-9']
  return (
    <Frame label="Saral Comply">
      <div className="w-full">
        <div className="grid grid-cols-2 gap-2">
          {items.map((it, i) => (
            <motion.div
              key={it}
              className="flex items-center gap-2 rounded-xl bg-paper px-3 py-2 font-mono text-[11px]"
              animate={{ opacity: [0.4, 1, 1, 0.4] }}
              transition={{ duration: 3.6, times: [0, 0.15, 0.9, 1], repeat: Infinity, delay: i * 0.1 }}
            >
              <motion.span
                className="grid size-4 place-items-center rounded-full bg-green text-paper"
                animate={{ scale: [0, 1, 1, 0] }}
                transition={{ duration: 3.6, times: [0, 0.15, 0.9, 1], repeat: Infinity, delay: i * 0.1 }}
              >
                <Check className="size-2.5" strokeWidth={4} />
              </motion.span>
              {it}
            </motion.div>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-3">
          {[1, 2, 3, 4].map((n) => (
            <motion.span
              key={n}
              className="grid size-8 place-items-center rounded-full bg-ink font-mono text-[11px] text-paper"
              animate={{ scale: [0.6, 1.1, 1, 1, 0.6], opacity: [0, 1, 1, 1, 0] }}
              transition={{ duration: 3.6, times: [0, 0.1, 0.15, 0.9, 1], repeat: Infinity, delay: 0.6 + n * 0.25 }}
            >
              {n}
            </motion.span>
          ))}
          <motion.span
            className="font-display text-[18px] font-light text-saffron"
            animate={{ opacity: [0, 0, 1, 1, 0] }}
            transition={{ duration: 3.6, times: [0, 0.5, 0.6, 0.9, 1], repeat: Infinity }}
          >
            pack ready.
          </motion.span>
        </div>
      </div>
    </Frame>
  )
}

export const MODULE_VISUALS: Record<string, ComponentType> = { M1: Appraisal, M2: Screen, M3: Watch, M4: Recover, M5: Insight, M6: Comply }
