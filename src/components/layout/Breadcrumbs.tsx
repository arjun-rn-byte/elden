import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface Crumb {
  label: string
  to?: string
}

/** The trail back up the archive: Home / Chapter / Leaf. */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('min-w-0', className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-inscribed text-[8.5px] uppercase tracking-[0.24em]">
        <li className="flex items-center gap-2">
          <Link
            to="/"
            className="text-mute transition-colors duration-500 hover:text-gold"
          >
            The Archive
          </Link>
        </li>
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-2">
              <ChevronRight size={10} strokeWidth={1.5} className="shrink-0 text-gold/30" aria-hidden />
              {item.to && !last ? (
                <Link
                  to={item.to}
                  className="truncate text-mute transition-colors duration-500 hover:text-gold"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="truncate text-gold/80">
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
