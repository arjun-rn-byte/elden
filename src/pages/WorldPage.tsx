import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { WorldMasthead } from '../components/world/WorldMasthead'
import { AtlasMap } from '../components/world/AtlasMap'
import { RegionRail } from '../components/world/RegionRail'
import { RegionDossier } from '../components/world/RegionDossier'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import {
  matchesQuery,
  matchesTag,
  regionNeighbours,
  regionsOf,
  resolveRegion,
  strata,
  stratumOf,
  tagsOf,
  type StratumId,
} from '../lib/regions'

export function WorldPage() {
  const [params, setParams] = useSearchParams()
  const [stratumTab, setStratumTab] = useState<StratumId>('surface')
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState<string | null>(null)
  const [focus, setFocus] = useState<{ id: string; nonce: number } | null>(null)

  const dossierRef = useRef<HTMLElement | null>(null)
  const focusToken = useRef(0)
  const firstRender = useRef(true)

  const selected = resolveRegion(params.get('region') ?? params.get('entry'))
  const stratum = selected ? selected.stratum : stratumTab
  const plate = stratumOf(stratum)

  const plateRegions = useMemo(() => regionsOf(stratum), [stratum])
  const tagOptions = useMemo(() => tagsOf(stratum), [stratum])
  const shown = useMemo(
    () => plateRegions.filter((region) => matchesQuery(region, query) && matchesTag(region, tag)),
    [plateRegions, query, tag],
  )

  const elsewhere = useMemo(
    () =>
      query.trim()
        ? strata
            .filter((item) => item.id !== stratum)
            .map((item) => ({
              id: item.id,
              label: item.short,
              count: regionsOf(item.id).filter((region) => matchesQuery(region, query)).length,
            }))
            .filter((item) => item.count > 0)
        : [],
    [query, stratum],
  )

  const counts = useMemo(
    () =>
      strata.reduce(
        (all, item) => {
          all[item.id] = regionsOf(item.id).length
          return all
        },
        {} as Record<StratumId, number>,
      ),
    [],
  )

  useEffect(() => {
    const previous = document.title
    document.title = 'The Lands Between — an atlas of the Lands Between'
    return () => {
      document.title = previous
    }
  }, [])

  // Escape closes the folio, the way it closes every other panel in the archive.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !params.get('region')) return
      const next = new URLSearchParams(params)
      next.delete('region')
      setParams(next, { replace: true })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [params, setParams])

  // On a phone the folio opens below the map, outside the viewport. Bring it in.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (!selected || !window.matchMedia('(max-width: 1023px)').matches) return
    dossierRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [selected])

  const openRegion = (id: string, options?: { focus?: boolean }) => {
    const next = new URLSearchParams(params)
    next.delete('entry')
    next.set('region', id)
    setParams(next)
    if (options?.focus) {
      focusToken.current += 1
      setFocus({ id, nonce: focusToken.current })
    }
  }

  const closeRegion = () => {
    const next = new URLSearchParams(params)
    next.delete('region')
    next.delete('entry')
    setParams(next, { replace: true })
  }

  const changeStratum = (id: StratumId) => {
    setTag(null)
    if (id === stratum) return
    setStratumTab(id)
    if (selected) closeRegion()
  }

  const neighbours = selected ? regionNeighbours(selected) : null

  return (
    <>
      <WorldMasthead />

      <section id="survey" className="relative py-14 lg:py-20">
        <div className="mx-auto w-full max-w-[94rem] px-5 sm:px-8 lg:px-12">
          <SectionHeading
            numeral="I"
            eyebrow="The survey"
            title={
              <>
                Charts of the <span className="italic text-gold/90">Lands Between</span>
              </>
            }
            lede={
              <>
                Three plates, {plateRegions.length} regions on this one. Choose a marker or a name
                from the index; the dossier opens below the chart.
              </>
            }
          />

          <Reveal className="mt-8 lg:mt-10">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-start xl:grid-cols-[minmax(0,1fr)_24rem]">
              <div className="border border-gold/12 bg-ink/40 p-3 sm:p-4 lg:p-5">
                <div className="mb-3 flex items-baseline justify-between gap-3">
                  <p className="font-inscribed text-[8px] uppercase tracking-[0.26em] text-gold/60">
                    {plate.plate} — {plate.title}
                  </p>
                  <p className="font-inscribed text-[8px] uppercase tracking-[0.2em] text-mute tabular-nums">
                    {shown.length === plateRegions.length
                      ? `${String(plateRegions.length).padStart(2, '0')} regions`
                      : `${String(shown.length).padStart(2, '0')} / ${String(plateRegions.length).padStart(2, '0')}`}
                  </p>
                </div>

                <AtlasMap
                  key={stratum}
                  stratum={stratum}
                  regions={plateRegions}
                  selectedId={selected?.id ?? null}
                  onSelect={(id) => openRegion(id)}
                  focus={focus}
                />

                <p className="mt-4 hidden border-t border-gold/10 pt-3 text-[10px] leading-[1.8] text-mute/75 sm:block">
                  {plate.note}
                </p>
              </div>

              <RegionRail
                stratum={stratum}
                strata={strata}
                counts={counts}
                query={query}
                onQuery={setQuery}
                tag={tag}
                onTag={setTag}
                tags={tagOptions}
                regions={shown}
                total={plateRegions.length}
                selectedId={selected?.id ?? null}
                onSelect={(id) => openRegion(id, { focus: true })}
                onStratum={changeStratum}
                elsewhere={elsewhere}
                className="lg:sticky lg:top-24"
              />
            </div>

            {selected && neighbours ? (
              <div className="mt-4 border border-gold/12">
                <RegionDossier
                  key={selected.id}
                  region={selected}
                  previous={neighbours.previous}
                  next={neighbours.next}
                  onClose={closeRegion}
                  onPrev={() => openRegion(neighbours.previous.id, { focus: true })}
                  onNext={() => openRegion(neighbours.next.id, { focus: true })}
                  panelRef={dossierRef}
                />
              </div>
            ) : null}
          </Reveal>

          <div className="mt-8 flex flex-col gap-3 border-t border-gold/10 pt-6 text-[10.5px] leading-[1.9] text-mute/75 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[46rem]">
              The plates are drawn rather than photographed, and every marker is placed from the
              same coordinates the index reads — a corrected survey moves the map with it.
            </p>
            <p className="shrink-0 font-inscribed text-[8px] uppercase tracking-[0.24em] text-gold/45">
              {plate.plate} · {plate.label}
            </p>
          </div>
        </div>
      </section>

      <nav aria-label="Chapters" className="border-t border-gold/10">
        <Link
          to="/characters"
          className="group mx-auto flex w-full max-w-[94rem] items-center justify-between gap-6 px-5 py-8 transition-colors duration-500 hover:bg-ink-raised sm:px-8 lg:px-12"
        >
          <span className="flex flex-col gap-2">
            <span className="font-inscribed text-[8px] uppercase tracking-[0.26em] text-mute">
              Next chapter · II
            </span>
            <span className="font-display text-[1.5rem] leading-tight text-bone/85 transition-colors duration-500 group-hover:text-gold">
              Those Who Remain
            </span>
          </span>
          <ArrowRight
            size={16}
            strokeWidth={1.3}
            className="shrink-0 text-gold/40 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-gold"
          />
        </Link>
      </nav>
    </>
  )
}
