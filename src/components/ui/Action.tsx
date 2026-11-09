import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

type Variant = 'solid' | 'outline' | 'quiet'
type Size = 'sm' | 'md' | 'lg'

const base =
  'group relative inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap font-inscribed uppercase tracking-[0.22em] transition-[color,background-color,border-color,box-shadow,transform] duration-500 ease-out-expo disabled:pointer-events-none disabled:opacity-40'

const variants: Record<Variant, string> = {
  solid:
    'bg-[linear-gradient(180deg,#f0dfae_0%,#c6a45a_52%,#a5843d_100%)] text-[#12100b] shadow-[0_20px_45px_-26px_rgba(198,164,90,0.8),inset_0_1px_0_rgba(255,255,255,0.4)] hover:brightness-[1.07] hover:shadow-[0_24px_55px_-24px_rgba(198,164,90,0.85),inset_0_1px_0_rgba(255,255,255,0.5)]',
  outline:
    'border border-gold/25 bg-transparent text-bone/85 hover:border-gold/55 hover:bg-gold/[0.055] hover:text-bone',
  quiet: 'px-0 text-ash/80 hover:text-gold',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[9px] tracking-[0.2em]',
  md: 'h-11 px-6 text-[10px]',
  lg: 'h-[52px] px-8 text-[10.5px]',
}

export function actionClass(variant: Variant = 'outline', size: Size = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className)
}

interface ActionProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  href?: string
  to?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  ariaLabel?: string
}

export function Action({
  children,
  variant = 'outline',
  size = 'md',
  className,
  href,
  to,
  onClick,
  type = 'button',
  ariaLabel,
}: ActionProps) {
  const classes = actionClass(variant, size, className)

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
