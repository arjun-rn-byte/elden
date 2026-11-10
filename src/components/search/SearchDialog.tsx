import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Compass, CornerDownLeft, Search } from 'lucide-react'
import { categories, entries, sections } from '../../lib/data'
import { matchesQuery, regions, stratumLabel } from '../../lib/regions'
import { EASE } from '../../lib/motion'
import { useLockBodyScroll } from '../../hooks/useArchive'
import { cn } from '../../lib/cn'

type Result =
  | { kind: 'entry'; id: string }
  | { kind: 'region'; id: string; name: string; epithet: string; stratum: string; ref: string }
  | { kind: 'section'; id: string; label: string }

interface SearchDialogProps {
  open: boolean
  onClose: () => void
  onSelectEntry: (id: string) => void
  onSelectRegion?: (id: string) => void
  onSelectSection: (id: string) => void
}

const passages = sections.filter((section) => section.id !== 'home')

export function SearchDialog({
  open,
  onClose,
  onSelectEntry,
  onSelectRegion,
  onSelectSection,
}: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useLockBodyScroll(open)

  useEffect(() => {
    if (!open) return
    setQuery('')
    setHighlight(0)
    const frame = requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(frame)
  }, [open])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const { leafResults, regionResults, passageResults, results } = useMemo(() => {
    const q = query.trim().toLowerCase()

    const leafResults = entries
      .filter((entry) => {
        if (!q) return true
        const haystack = [
          entry.name,
          entry.epithet,
          entry.locus,
          entry.era,
          entry.standing,
          entry.category,
          ...entry.tags,
        ]
          .join(' ')
          .toLowerCase()
        return haystack.includes(q)
      })
      .slice(0, q ? 6 : 5)

    const regionResults = q
      ? regions
          .filter((region) => matchesQuery(region, q))
          .slice(0, 5)
      : []

    const passageResults = q
      ? passages.filter((section) => section.label.toLowerCase().includes(q))
      : []

    const results: Result[] = [
      ...regionResults.map((r) => ({
        kind: 'region' as const,
        id: r.id,
        name: r.name,
        epithet: r.epithet,
        stratum: stratumLabel(r.stratum),
        ref: r.ref,
      })),
      ...leafResults.map((entry) => ({ kind: 'entry' as const, id: entry.id })),
      ...passageResults.map((section) => ({
        kind: 'section' as const,
        id: section.id,
        label: section.label,
      })),
    ]

    return { leafResults, regionResults, passageResults, results }
  }, [query])

  useEffect(() => {
    setHighlight(0)
  }, [query])

  useEffect(() => {
    if (!open) return
    document.getElementById(`search-result-${highlight}`)?.scrollIntoView({ block: 'nearest' })
  }, [highlight, open])

  const openResult = (index: number) => {
    const result = results[index]
    if (!result) return
    if (result.kind === 'entry') {
      onSelectEntry(result.id)
    } else if (result.kind === 'region') {
      if (onSelectRegion) onSelectRegion(result.id)
      else onSelectEntry(result.id)
    } else {
      onSelectSection(result.id)
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: EASE }}
        >
          <div
            className="absolute inset-0 bg-ink/88 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />

          <div className="relative mx-auto mt-[8vh] w-[min(94vw,44rem)] px-0">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Search the archive"
              initial={{ opacity: 0, y: -18, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
              transition={{ duration: 0.55, ease: EASE }}
              className="plate overflow-hidden"
            >
              <div className="flex items-center gap-3 px-5 py-4 sm:px-6">
                <Search size={17} strokeWidth={1.3} className="shrink-0 text-gold/60" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowDown') {
                      event.preventDefault()
                      setHighlight((value) => Math.min(value + 1, Math.max(results.length - 1, 0)))
                    } else if (event.key === 'ArrowUp') {
                      event.preventDefault()
                      setHighlight((value) => Math.max(value - 1, 0))
                    } else if (event.key === 'Enter') {
                      event.preventDefault()
                      openResult(highlight)
                    }
                  }}
                  placeholder="Search regions, demigods, bosses or relics…"
                  aria-label="Search the archive"
                  autoComplete="off"
                  spellCheck={false}
                  className="h-8 min-w-0 flex-1 bg-transparent font-display text-[19px] leading-none text-bone placeholder:text-mute/60 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="hidden shrink-0 border border-gold/15 px-2 py-1 font-inscribed text-[8.5px] uppercase tracking-[0.2em] text-mute transition-colors hover:border-gold/40 hover:text-gold sm:block"
                >
                  esc
                </button>
              </div>

              <div className="max-h-[54vh] overflow-y-auto border-t border-gold/12">
                {results.length === 0 ? (
                  <div className="px-6 py-12 text-center">
                    <p className="font-display text-[20px] italic text-bone/75">
                      Nothing in the archive answers to that.
                    </p>
                    <p className="mt-2 text-[11px] tracking-[0.04em] text-mute">
                      Try a realm, a demigod, or the name of a relic.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                      {['Limgrave', 'Leyndell', 'Mohgwyn', 'Malenia', 'Caelid', 'Moon'].map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => setQuery(suggestion)}
                          className="border border-gold/15 px-2.5 py-1 text-[10px] tracking-[0.06em] text-ash/70 transition-colors hover:border-gold/40 hover:text-gold"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <ul>
                    {/* Region Results */}
                    {regionResults.length > 0 ? (
                      <>
                        <li className="px-5 pb-2 pt-4 sm:px-6">
                          <span className="eyebrow text-gold/70">Surveyed Regions</span>
                        </li>
                        {regionResults.map((region, rIndex) => {
                          const active = highlight === rIndex
                          return (
                            <li key={region.id}>
                              <button
                                id={`search-result-${rIndex}`}
                                type="button"
                                onMouseEnter={() => setHighlight(rIndex)}
                                onClick={() => openResult(rIndex)}
                                className={cn(
                                  'flex w-full items-center gap-4 border-l px-5 py-3 text-left transition-colors duration-200 sm:px-6',
                                  active
                                    ? 'border-gold bg-gold/[0.08]'
                                    : 'border-transparent hover:bg-bone/[0.02]',
                                )}
                              >
                                <Compass size={14} className="shrink-0 text-gold/60" />
                                <span className="w-9 shrink-0 font-inscribed text-[8.5px] tracking-[0.16em] text-gold/45 tabular-nums">
                                  {region.ref}
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="block truncate font-display text-[17px] leading-tight text-bone">
                                    {region.name}
                                  </span>
                                  <span className="mt-0.5 block truncate text-[10.5px] italic text-gold/55">
                                    {region.epithet}
                                  </span>
                                </span>
                                <span className="shrink-0 border border-gold/20 px-1.5 py-0.5 font-inscribed text-[7.5px] uppercase tracking-[0.16em] text-gold/75">
                                  {stratumLabel(region.stratum)}
                                </span>
                                <CornerDownLeft
                                  size={12}
                                  strokeWidth={1.2}
                                  className={cn(
                                    'shrink-0 transition-opacity',
                                    active ? 'text-gold opacity-100' : 'opacity-0',
                                  )}
                                />
                              </button>
                            </li>
                          )
                        })}
                      </>
                    ) : null}

                    {/* Leaf results */}
                    {leafResults.length > 0 ? (
                      <li className="px-5 pb-2 pt-4 sm:px-6">
                        <span className="eyebrow text-mute">
                          {query ? 'Archive Leaves' : 'Suggested leaves'}
                        </span>
                      </li>
                    ) : null}

                    {leafResults.map((entry, index) => {
                      const itemIndex = regionResults.length + index
                      const active = highlight === itemIndex
                      const wing = categories.find((category) => category.id === entry.category)
                      return (
                        <li key={entry.id}>
                          <button
                            id={`search-result-${itemIndex}`}
                            type="button"
                            onMouseEnter={() => setHighlight(itemIndex)}
                            onClick={() => openResult(itemIndex)}
                            className={cn(
                              'flex w-full items-center gap-4 border-l px-5 py-3 text-left transition-colors duration-200 sm:px-6',
                              active
                                ? 'border-gold/60 bg-gold/[0.06]'
                                : 'border-transparent hover:bg-bone/[0.02]',
                            )}
                          >
                            <span className="w-6 shrink-0 font-inscribed text-[9px] tracking-[0.12em] text-gold/45">
                              {entry.numeral}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate font-display text-[17px] leading-tight text-bone/90">
                                {entry.name}
                              </span>
                              <span className="mt-0.5 block truncate text-[10.5px] italic text-mute">
                                {entry.epithet}
                              </span>
                            </span>
                            <span className="hidden shrink-0 font-sans text-[8.5px] uppercase tracking-[0.16em] text-mute/80 sm:block">
                              {wing?.label}
                            </span>
                            <CornerDownLeft
                              size={12}
                              strokeWidth={1.2}
                              className={cn(
                                'shrink-0 transition-opacity',
                                active ? 'text-gold/70 opacity-100' : 'opacity-0',
                              )}
                            />
                          </button>
                        </li>
                      )
                    })}

                    {passageResults.length > 0 ? (
                      <li className="px-5 pb-2 pt-4 sm:px-6">
                        <span className="eyebrow text-mute">Passages</span>
                      </li>
                    ) : null}

                    {passageResults.map((section, index) => {
                      const resultIndex = regionResults.length + leafResults.length + index
                      const active = highlight === resultIndex
                      return (
                        <li key={section.id}>
                          <button
                            id={`search-result-${resultIndex}`}
                            type="button"
                            onMouseEnter={() => setHighlight(resultIndex)}
                            onClick={() => onSelectSection(section.id)}
                            className={cn(
                              'flex w-full items-center gap-4 border-l px-5 py-3 text-left transition-colors duration-200 sm:px-6',
                              active
                                ? 'border-gold/60 bg-gold/[0.06]'
                                : 'border-transparent hover:bg-bone/[0.02]',
                            )}
                          >
                            <ArrowRight size={12} strokeWidth={1.2} className="text-gold/40" />
                            <span className="flex-1 font-display text-[16px] text-bone/85">
                              {section.label}
                            </span>
                            <span className="font-sans text-[8.5px] uppercase tracking-[0.16em] text-mute/80">
                              Passage
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-gold/12 px-5 py-3 sm:px-6">
                <span className="font-sans text-[9px] uppercase tracking-[0.16em] text-mute/80">
                  ↑↓ move · enter read · esc close
                </span>

                <span className="ml-auto hidden font-inscribed text-[8px] uppercase tracking-[0.24em] text-mute/70 md:block">
                  Six chapters · twenty regions · twenty leaves
                </span>
              </div>
            </motion.div>

            <p className="mt-4 text-center font-inscribed text-[8px] uppercase tracking-[0.3em] text-mute/60">
              The archive answers in fragments
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
