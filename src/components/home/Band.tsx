import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Counter } from '../ui/Motion'
import { Container } from '../ui/Section'

/* Full-bleed ledger photograph with slow parallax and the two pedigree numbers. */
export function Band() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <div ref={ref} className="relative h-[70vh] min-h-[460px] overflow-hidden">
      <motion.img src="/img/ledger.jpg" alt="" loading="lazy" decoding="async" style={{ y }} className="absolute inset-0 h-[120%] w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/50 to-ink/20" />
      <Container className="relative flex h-full flex-col justify-end pb-12 text-paper md:pb-16">
        <div className="eyebrow mb-4 text-mint">Pedigree</div>
        <div className="flex flex-wrap gap-x-16 gap-y-6">
          {[
            [4, 'decades of experience'],
            [200, 'banks of pedigree'],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="display text-[clamp(64px,10vw,140px)] leading-none">
                <Counter to={n as number} suffix="+" />
              </div>
              <div className="mt-2 font-display text-[20px] italic text-paper/80">{l}</div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
