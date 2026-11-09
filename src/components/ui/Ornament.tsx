import { cn } from '../../lib/cn'

/** Hairline rule with a small diamond at its centre. */
export function Ornament({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)} aria-hidden>
      <span className="rule h-px flex-1" />
      <span className="relative block h-[5px] w-[5px] rotate-45 border border-gold/60" />
      <span className="rule h-px flex-1" />
    </div>
  )
}

/** Four engraved corner marks for stone plates. */
export function CornerMarks({ tone = 'gold' }: { tone?: 'gold' | 'dim' }) {
  const color = tone === 'gold' ? 'border-gold/35' : 'border-gold/15'
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      <span className={cn('absolute left-0 top-0 h-3 w-3 border-l border-t', color)} />
      <span className={cn('absolute right-0 top-0 h-3 w-3 border-r border-t', color)} />
      <span className={cn('absolute bottom-0 left-0 h-3 w-3 border-b border-l', color)} />
      <span className={cn('absolute bottom-0 right-0 h-3 w-3 border-b border-r', color)} />
    </span>
  )
}

export function Diamond({ className }: { className?: string }) {
  return <span aria-hidden className={cn('block h-1 w-1 rotate-45 bg-gold/70', className)} />
}
