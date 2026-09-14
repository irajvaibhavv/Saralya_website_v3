import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { Container } from '../ui/Section'

const EASE = [0.22, 1, 0.36, 1] as const

export function PageHero({ eyebrow, title, lede, children }: { eyebrow: string; title: ReactNode; lede?: ReactNode; children?: ReactNode }) {
  return (
    <section className="pt-14 pb-10 md:pt-24 md:pb-14">
      <Container>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
          <div className="eyebrow mb-4 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-saffron" />
            {eyebrow}
          </div>
          <h1 className="display max-w-4xl text-[clamp(40px,7vw,88px)] [&_em]:font-light [&_em]:not-italic [&_em]:text-saffron">{title}</h1>
          {lede && <p className="mt-5 max-w-xl text-[17px] text-muted">{lede}</p>}
          {children}
        </motion.div>
      </Container>
    </section>
  )
}
