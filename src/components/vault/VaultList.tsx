import { ChevronRight, Lock } from 'lucide-react'
import type { Entry } from '../../lib/data'
import { cn } from '../../lib/cn'

interface VaultListProps {
  leaves: Entry[]
  activeId: string
  onSelect: (id: string) => void
}

export function VaultList({ leaves, activeId, onSelect }: VaultListProps) {
  return (
    <div>
      <ul className="max-h-[22rem] overflow-y-auto border-t border-gold/12 pr-1 lg:max-h-[34rem] lg:pr-2">
        {leaves.map((entry) => {
          const active = entry.id === activeId
          return (
            <li key={entry.id} className="border-b border-gold/10">
              <button
                type="button"
                onClick={() => onSelect(entry.id)}
                aria-current={active ? 'true' : undefined}
                className={cn(
                  'group relative flex w-full items-center gap-3 py-3.5 pl-4 pr-2 text-left transition-colors duration-500',
                  active
                    ? 'bg-gradient-to-r from-gold/[0.075] via-gold/[0.02] to-transparent'
                    : 'hover:bg-bone/[0.02]',
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'absolute left-0 top-1/2 w-px -translate-y-1/2 bg-gold transition-all duration-500 ease-out-expo',
                    active ? 'h-[70%]' : 'h-0 group-hover:h-1/3',
                  )}
                />
                <span
                  className={cn(
                    'w-7 shrink-0 font-inscribed text-[9px] tracking-[0.14em] transition-colors duration-500',
                    active ? 'text-gold' : 'text-gold/35',
                  )}
                >
                  {entry.numeral}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      'block truncate font-display text-[19px] leading-tight transition-colors duration-500',
                      active ? 'text-gold-bright' : 'text-bone/75 group-hover:text-bone',
                    )}
                  >
                    {entry.name}
                  </span>
                  <span className="mt-0.5 block truncate text-[10.5px] italic leading-snug text-mute">
                    {entry.epithet}
                  </span>
                </span>
                {entry.sealed ? (
                  <Lock
                    size={11}
                    strokeWidth={1.4}
                    className="shrink-0 text-gold/30"
                    aria-label="Sealed"
                  />
                ) : (
                  <ChevronRight
                    size={13}
                    strokeWidth={1.2}
                    className={cn(
                      'shrink-0 transition-all duration-500',
                      active
                        ? 'translate-x-0 text-gold/70'
                        : '-translate-x-1 text-transparent group-hover:translate-x-0 group-hover:text-gold/40',
                    )}
                  />
                )}
              </button>
            </li>
          )
        })}
      </ul>
      <p className="mt-4 text-[10.5px] leading-[1.7] text-mute/80">
        Sealed leaves are written but not yet complete. Their summaries are given so the archive
        remains walkable.
      </p>
    </div>
  )
}
