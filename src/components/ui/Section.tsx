import type { ReactNode } from 'react'
import { FadeIn } from './Motion'

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 md:px-8 ${className}`}>{children}</div>
}

export function Section({ children, className = '', id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      {children}
    </section>
  )
}

/** Eyebrow + display headline. `title` may contain <em> for the light saffron word. */
export function SectionHead({
  eyebrow,
  title,
  lede,
  align = 'left',
  dark,
}: {
  eyebrow: string
  title: ReactNode
  lede?: string
  align?: 'left' | 'center'
  dark?: boolean
}) {
  return (
    <FadeIn className={`mb-12 max-w-2xl md:mb-16 ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <div className={`eyebrow mb-4 flex items-center gap-2 ${align === 'center' ? 'justify-center' : ''} ${dark ? 'text-mint' : ''}`}>
        <span className="size-1.5 rounded-full bg-saffron" />
        {eyebrow}
      </div>
      <h2 className="display text-[clamp(34px,5vw,60px)] [&_em]:font-light [&_em]:not-italic [&_em]:text-saffron">{title}</h2>
      {lede && <p className={`mt-4 text-[16px] md:text-[17px] ${dark ? 'text-paper/60' : 'text-muted'}`}>{lede}</p>}
    </FadeIn>
  )
}
