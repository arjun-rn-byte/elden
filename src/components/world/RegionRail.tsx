import { Layers } from 'lucide-react'
import type { AtlasRegion, Stratum, StratumId } from '../../lib/regions'
import { cn } from '../../lib/cn'
import { SearchBar } from '../ui/SearchBar'

interface RegionRailProps {
  stratum: StratumId
  strata: Stratum[]
  counts: Record<StratumId, number>
  query: string
  onQuery: (value: string) => void
  tag: string | null
  onTag: (value: string | null) => void
  tags: string[]
  regions: AtlasRegion[]
  total: number
  selectedId: string | null
  onSelect: (id: string) => void
  onStratum: (id: StratumId) => void
  /** Strata that do match the current query, for the empty state. */
  elsewhere: { id: StratumId; label: string; count: number }[]
  className?: string
}

/** The selection panel: search, plate tabs, tag filters and the region index. */
export function RegionRail({
  stratum,
  strata,
  counts,
  query,
  onQuery,
  tag,
  onTag,
  tags,
  regions,
  total,
  selectedId,
  onSelect,
  onStratum,
  elsewhere,
  className,
}: RegionRailProps) {
  return (
    <aside
      className={cn(
        'flex min-h-0 flex-col border border-gold/12 bg-ink/40 lg:max-h-[calc(100vh-8rem)]',
        className,
      )}
    >
      <div className="border-b border-gold/10 px-4 pb-4 pt-5 sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Layers size={12} strokeWidth={1.4} className="text-gold/50" aria-hidden />
            <h3 className="font-inscribed text-[9px] uppercase tracking-[0.26em] text-gold/70">
              The index
            </h3>
          </div>
          <p className="font-inscribed text-[8px] uppercase tracking-[0.22em] text-mute tabular-nums">
            {String(regions.length).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </p>
        </div>

        <SearchBar
          value={query}
          onChange={onQuery}
          placeholder="Search ground, keepers, names…"
          label="Search the survey"
          className="mt-4 w-full"
        />

        <div role="tablist" aria-label="Survey plates" className="mt-4 flex flex-col gap-px border border-gold/12">
          {strata.map((item) => {
            const active = item.id === stratum
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onStratum(item.id)}
                className={cn(
                  'group flex items-baseline justify-between gap-3 px-3 py-2 text-left transition-colors duration-400',
                  active ? 'bg-gold/[0.08]' : 'hover:bg-gold/[0.03]',
                )}
              >
                <span className="flex min-w-0 items-baseline gap-2">
                  <span
                    aria-hidden
                    className={cn(
                      'h-1 w-1 shrink-0 translate-y-[-2px] rounded-full',
                      active ? 'bg-gold' : 'bg-gold/25',
                    )}
                  />
                  <span
                    className={cn(
                      'truncate font-inscribed text-[8.5px] uppercase tracking-[0.2em] transition-colors duration-400',
                      active ? 'text-gold' : 'text-ash/70 group-hover:text-bone',
                    )}
                  >
                    {item.label}
                  </span>
                  {item.dlc ? (
                    <span className="shrink-0 border border-gold/25 px-1 py-px font-inscribed text-[7px] uppercase tracking-[0.14em] text-gold/55">
                      DLC
                    </span>
                  ) : null}
                </span>
                <span className="shrink-0 font-inscribed text-[8px] tracking-[0.16em] text-mute tabular-nums">
                  {String(counts[item.id] ?? 0).padStart(2, '0')}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5" role="group" aria-label="Filter by character of the ground">
          <button
            type="button"
            onClick={() => onTag(null)}
            aria-pressed={tag === null}
            className={cn(
              'border px-2 py-1 font-inscribed text-[8px] uppercase tracking-[0.16em] transition-colors duration-400',
              tag === null
                ? 'border-gold/45 bg-gold/[0.08] text-gold'
                : 'border-gold/12 text-ash/60 hover:border-gold/30 hover:text-bone',
            )}
          >
            All
          </button>
          {tags.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onTag(tag === option ? null : option)}
              aria-pressed={tag === option}
              className={cn(
                'border px-2 py-1 font-inscribed text-[8px] uppercase tracking-[0.16em] transition-colors duration-400',
                tag === option
                  ? 'border-gold/45 bg-gold/[0.08] text-gold'
                  : 'border-gold/12 text-ash/60 hover:border-gold/30 hover:text-bone',
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {regions.length > 0 ? (
          <ul className="divide-y divide-gold/[0.07]">
            {regions.map((region) => {
              const active = region.id === selectedId
              const ordinal = region.ref.split('·').pop()?.trim() ?? ''
              return (
                <li key={region.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(region.id)}
                    aria-current={active ? 'true' : undefined}
                    className={cn(
                      'group relative flex w-full items-baseline gap-3 px-4 py-3 text-left transition-colors duration-400 sm:px-5',
                      active ? 'bg-gold/[0.06]' : 'hover:bg-gold/[0.03]',
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'absolute inset-y-0 left-0 w-px transition-colors duration-400',
                        active ? 'bg-gold' : 'bg-transparent',
                      )}
                    />
                    <span className="w-5 shrink-0 font-inscribed text-[8.5px] tracking-[0.18em] text-gold/35 tabular-nums">
                      {ordinal}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          'block truncate font-display text-[15px] leading-tight transition-colors duration-400',
                          active ? 'text-gold' : 'text-bone/85 group-hover:text-bone',
                        )}
                      >
                        {region.name}
                      </span>
                      <span className="mt-0.5 block truncate font-display text-[11.5px] italic text-ash/45">
                        {region.epithet}
                      </span>
                    </span>
                    <span className="shrink-0 font-inscribed text-[8px] uppercase tracking-[0.16em] text-mute/70">
                      {region.ref}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="px-5 py-10 text-center">
            <p className="font-display text-[17px] italic text-bone/70">
              Nothing on this plate answers to that.
            </p>
            {elsewhere.length > 0 ? (
              <>
                <p className="mt-2 text-[10.5px] uppercase tracking-[0.18em] text-mute">
                  It is filed on another plate
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {elsewhere.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onStratum(item.id)}
                      className="border border-gold/20 px-2.5 py-1.5 font-inscribed text-[8px] uppercase tracking-[0.18em] text-gold/75 transition-colors hover:border-gold/45 hover:text-gold"
                    >
                      {item.label} · {String(item.count).padStart(2, '0')}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onQuery('')
                  onTag(null)
                }}
                className="mt-4 font-inscribed text-[8.5px] uppercase tracking-[0.24em] text-gold/70 transition-colors hover:text-gold"
              >
                Clear the search
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  )
}
