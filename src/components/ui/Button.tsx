import { ArrowRight } from 'lucide-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'saffron' | 'ink' | 'ghost' | 'paper'
type Size = 'md' | 'lg'

const BASE =
  'group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[transform,background-color,color,box-shadow] duration-200 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron'
const VARIANTS: Record<Variant, string> = {
  saffron: 'bg-saffron text-white shadow-saffron hover:bg-[#d9661a]',
  ink: 'bg-ink text-paper hover:bg-green2',
  ghost: 'border border-line2 text-ink hover:border-ink hover:bg-cream',
  paper: 'bg-paper text-ink hover:bg-cream',
}
const SIZES: Record<Size, string> = {
  md: 'px-5 py-2.5 text-[14px]',
  lg: 'px-6 py-3.5 text-[15px]',
}

const cx = (variant: Variant = 'ink', size: Size = 'md', className = '') => `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`

const Arrow = () => <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />

export function Button({
  variant,
  size,
  arrow,
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; arrow?: boolean; children: ReactNode }) {
  return (
    <button className={cx(variant, size, className)} {...rest}>
      {children}
      {arrow && <Arrow />}
    </button>
  )
}

export function ButtonLink({
  to,
  variant,
  size,
  arrow,
  className,
  children,
}: {
  to: string
  variant?: Variant
  size?: Size
  arrow?: boolean
  className?: string
  children: ReactNode
}) {
  const cls = cx(variant, size, className)
  if (to.startsWith('mailto:') || to.startsWith('http')) {
    return (
      <a href={to} className={cls}>
        {children}
        {arrow && <Arrow />}
      </a>
    )
  }
  return (
    <Link to={to} className={cls}>
      {children}
      {arrow && <Arrow />}
    </Link>
  )
}
