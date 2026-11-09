import { useMemo } from 'react'
import { categories, countByCategory, entries, type Filter } from '../../lib/data'
import { cn } from '../../lib/cn'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { VaultDetail } from './VaultDetail'
import { VaultList } from './VaultList'

interface VaultSectionProps {
  filter: Filter
  activeId: string
  onFilterChange: (filter: Filter) => void
  onSelectEntry: (id: string) => void
}

export function VaultSection({
  filter,
  activeId,
  onFilterChange,
  onSelectEntry,
}: VaultSectionProps) {
  const leaves = useMemo(
    () => (filter === 'all' ? entries : entries.filter((entry) => entry.category === filter)),
    [filter],
  )

  const entry = leaves.find((leaf) => leaf.id === activeId) ?? leaves[0]
  const index = leaves.findIndex((leaf) => leaf.id === entry.id)

  const chips: Array<{ id: Filter; label: string; count: number }> = [
    { id: 'all', label: 'All leaves', count: entries.length },
    ...categories.map((category) => ({
      id: category.id as Filter,
      label: category.label.replace('The ', ''),
      count: countByCategory(category.id),
    })),
  ]

  return (
    <section id="archive" className="relative py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[94rem] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          numeral="02"
          eyebrow="The Archive"
          title={
            <>
              Leaves lately
              <br />
              <span className="italic text-gold/90">transcribed</span>
            </>
          }
          lede={
            <>
              Thirteen leaves of a much longer book. Read them in any order — the wings are filters,
              not chapters, and the seals are honest.
            </>
          }
        />

        <Reveal delay={0.06}>
          <div className="mt-10 flex flex-wrap items-center gap-2 border-y border-gold/12 py-4">
            {chips.map((chip) => {
              const active = chip.id === filter
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => onFilterChange(chip.id)}
                  aria-pressed={active}
                  className={cn(
                    'group flex items-center gap-2 border px-3 py-1.5 font-inscribed text-[9px] uppercase tracking-[0.2em] transition-all duration-500 ease-out-expo',
                    active
                      ? 'border-gold/45 bg-gold/[0.07] text-gold'
                      : 'border-gold/12 text-ash/60 hover:border-gold/30 hover:text-bone',
                  )}
                >
                  {chip.label}
                  <span
                    className={cn(
                      'font-sans text-[8.5px] tracking-normal',
                      active ? 'text-gold/60' : 'text-mute/70',
                    )}
                  >
                    {String(chip.count).padStart(2, '0')}
                  </span>
                </button>
              )
            })}
            <span className="ml-auto hidden font-sans text-[10px] tracking-[0.18em] text-mute sm:block">
              {leaves.length === 1 ? 'One leaf' : `${leaves.length} leaves`} in view
            </span>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4 xl:col-span-3">
            <VaultList leaves={leaves} activeId={entry.id} onSelect={onSelectEntry} />
          </div>

          <div className="lg:col-span-8 xl:col-span-9">
            <VaultDetail
              entry={entry}
              position={index + 1}
              total={leaves.length}
              previous={index > 0 ? leaves[index - 1] : undefined}
              next={index < leaves.length - 1 ? leaves[index + 1] : undefined}
              onPrevious={() => index > 0 && onSelectEntry(leaves[index - 1].id)}
              onNext={() => index < leaves.length - 1 && onSelectEntry(leaves[index + 1].id)}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
