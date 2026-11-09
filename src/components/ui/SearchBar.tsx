import { Search, X } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  className?: string
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search this chapter…',
  label = 'Search this chapter',
  className,
}: SearchBarProps) {
  return (
    <div
      className={[
        'group flex h-11 items-center gap-3 border border-gold/15 bg-ink/50 px-4 transition-colors duration-500 focus-within:border-gold/45',
        className ?? '',
      ].join(' ')}
    >
      <Search size={14} strokeWidth={1.3} className="shrink-0 text-gold/50" aria-hidden />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={label}
        autoComplete="off"
        spellCheck={false}
        className="h-full min-w-0 flex-1 bg-transparent text-[12.5px] tracking-[0.02em] text-bone placeholder:text-mute/60 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="shrink-0 text-mute transition-colors duration-500 hover:text-gold"
        >
          <X size={13} strokeWidth={1.4} />
        </button>
      ) : null}
    </div>
  )
}
