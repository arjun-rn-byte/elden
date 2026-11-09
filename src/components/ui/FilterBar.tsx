import { cn } from '../../lib/cn'

interface FilterBarProps {
  options: string[]
  value: string | null
  onChange: (value: string | null) => void
  total: number
  shown: number
  label?: string
}

export function FilterBar({
  options,
  value,
  onChange,
  total,
  shown,
  label = 'Filter by',
}: FilterBarProps) {
  const chip = (active: boolean) =>
    cn(
      'relative border px-3 py-1.5 font-inscribed text-[8.5px] uppercase tracking-[0.2em] transition-colors duration-500',
      active
        ? 'border-gold/45 bg-gold/[0.08] text-gold'
        : 'border-gold/12 text-ash/65 hover:border-gold/30 hover:text-bone',
    )

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label={label}>
        <button type="button" onClick={() => onChange(null)} aria-pressed={value === null} className={chip(value === null)}>
          All
        </button>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(value === option ? null : option)}
            aria-pressed={value === option}
            className={chip(value === option)}
          >
            {option}
          </button>
        ))}
      </div>

      <p className="shrink-0 font-inscribed text-[8.5px] uppercase tracking-[0.24em] text-mute">
        {String(shown).padStart(2, '0')} of {String(total).padStart(2, '0')} leaves
      </p>
    </div>
  )
}
