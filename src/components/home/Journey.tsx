import { ArrowUpRight } from 'lucide-react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MODULES } from '../../content/site'
import { MODULE_VISUALS } from '../products/ModuleVisuals'
import { Container } from '../ui/Section'

/* The life of one loan, pinned. Scrolling through swaps the stage; the rail
   on the left fills as you go. Each stage is one module. */

const STAGES = ['Apply', 'Screen', 'Watch', 'Recover', 'Report', 'Inspect']

export function Journey() {
  const ref = useRef<HTMLDivElement>(null)
  const [i, setI] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (p) => setI(Math.min(MODULES.length - 1, Math.floor(p * MODULES.length))))

  const m = MODULES[i]
  const Visual = MODULE_VISUALS[m.code]

  return (
    <section id="journey" ref={ref} className="relative" style={{ height: `${MODULES.length * 100}vh` }}>
      <div className="sticky top-0 flex min-h-[100svh] items-center overflow-hidden py-10 md:py-16">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div className="order-2 lg:order-1">
              <div className="eyebrow mb-4 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-saffron" />
                The life of one loan
              </div>

              {/* rail */}
              <ol className="mb-8 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em]">
                {STAGES.map((s, k) => (
                  <li key={s} className={`flex items-center gap-2 transition-colors ${k <= i ? 'text-ink' : 'text-hint'}`}>
                    <span className={`h-px w-3 transition-colors ${k <= i ? 'bg-saffron' : 'bg-line2'}`} />
                    {s}
                  </li>
                ))}
              </ol>

              <AnimatePresence mode="wait">
                <motion.div
                  key={m.code}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="font-mono text-[12px] text-saffron">
                    {m.code} · {m.tag}
                  </div>
                  <h2 className="display mt-3 text-[clamp(36px,5.5vw,68px)]">{m.short}</h2>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {m.points.map((p) => (
                      <span key={p} className="rounded-full border border-line2 bg-cream px-3 py-1.5 font-mono text-[11px] text-ink2">
                        {p}
                      </span>
                    ))}
                  </div>
                  <Link to="/products" className="group mt-8 inline-flex items-center gap-1.5 text-[14px] font-semibold text-green">
                    {m.name}
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="order-1 mx-auto w-full max-w-[300px] lg:order-2 lg:max-w-[460px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={m.code}
                  initial={{ opacity: 0, scale: 0.96, rotate: -1 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.96, rotate: 1 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Visual />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Container>

        {/* progress bar along the bottom of the pinned frame */}
        <motion.div className="absolute inset-x-0 bottom-0 h-1 origin-left bg-saffron" style={{ scaleX: scrollYProgress }} />
      </div>
    </section>
  )
}
