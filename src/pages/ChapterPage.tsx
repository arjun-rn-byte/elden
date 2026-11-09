import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Category } from '../lib/data'
import {
  chapterAfter,
  chapterBefore,
  chapterGallery,
  chapterIntros,
  chapterPath,
  entriesOf,
  filtersOf,
} from '../lib/chapters'
import { Breadcrumbs } from '../components/layout/Breadcrumbs'
import { PageHeading } from '../components/chapters/PageHeading'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SearchBar } from '../components/ui/SearchBar'
import { FilterBar } from '../components/ui/FilterBar'
import { InfoCard } from '../components/ui/InfoCard'
import { Gallery } from '../components/ui/Gallery'
import { DetailPanel } from '../components/ui/DetailPanel'
import { Reveal } from '../components/ui/Reveal'

export function ChapterPage({ chapter }: { chapter: Category }) {
  const leaves = useMemo(() => entriesOf(chapter.id), [chapter.id])
  const filters = useMemo(() => filtersOf(chapter.id), [chapter.id])
  const gallery = chapterGallery[chapter.id]
  const intro = chapterIntros[chapter.id]

  const [query, setQuery] = useState('')
  const [tag, setTag] = useState<string | null>(null)
  const [params, setParams] = useSearchParams()

  const selectedId = params.get('entry')
  const selectedIndex = leaves.findIndex((leaf) => leaf.id === selectedId)
  const selected = selectedIndex >= 0 ? leaves[selectedIndex] : null

  useEffect(() => {
    const previous = document.title
    document.title = `${chapter.title} — Elden Ring, an interactive encyclopaedia`
    return () => {
      document.title = previous
    }
  }, [chapter.title])

  const shown = leaves.filter((leaf) => {
    const haystack = [leaf.name, leaf.epithet, leaf.locus, leaf.era, ...leaf.tags]
      .join(' ')
      .toLowerCase()
    const matchesQuery = query.trim() ? haystack.includes(query.trim().toLowerCase()) : true
    const matchesTag = tag ? leaf.tags.includes(tag) : true
    return matchesQuery && matchesTag
  })

  const openEntry = (id: string) => {
    const next = new URLSearchParams(params)
    next.set('entry', id)
    setParams(next, { replace: false })
  }

  const closeEntry = () => {
    const next = new URLSearchParams(params)
    next.delete('entry')
    setParams(next, { replace: true })
  }

  const step = (offset: number) => {
    if (selectedIndex < 0) return
    const next = leaves[(selectedIndex + offset + leaves.length) % leaves.length]
    openEntry(next.id)
  }

  const prevChapter = chapterBefore(chapter.id)
  const nextChapter = chapterAfter(chapter.id)

  return (
    <>
      <div className="mx-auto w-full max-w-[94rem] px-5 pt-24 sm:px-8 sm:pt-28 lg:px-12">
        <Breadcrumbs items={[{ label: chapter.label, to: chapterPath(chapter.id) }]} />
      </div>

      <PageHeading
        numeral={chapter.numeral}
        eyebrow={chapter.label}
        title={chapter.title}
        lede={chapter.description}
        glyph={chapter.glyph}
        accent={chapter.accent}
        count={leaves.length}
      />

      {/* About the chapter */}
      <section className="relative py-14 lg:py-20">
        <div className="mx-auto w-full max-w-[94rem] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="font-inscribed text-[8.5px] uppercase tracking-[0.28em] text-gold/55">
                  About this chapter
                </p>
                <p className="mt-5 max-w-[42rem] text-[14px] leading-[1.95] text-ash/80">{intro[0]}</p>
                <p className="mt-4 max-w-[42rem] text-[13.5px] leading-[1.95] text-ash/65">
                  {intro[1]}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={0.12}>
                <dl className="divide-y divide-gold/10 border-y border-gold/12">
                  <div className="flex items-baseline justify-between gap-4 py-3.5">
                    <dt className="text-[8.5px] uppercase tracking-[0.24em] text-mute">Leaves</dt>
                    <dd className="font-display text-[15px] text-bone/85">
                      {String(leaves.length).padStart(2, '0')}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 py-3.5">
                    <dt className="text-[8.5px] uppercase tracking-[0.24em] text-mute">Filed under</dt>
                    <dd className="text-right font-display text-[13px] italic text-gold/60">
                      {filters.slice(0, 3).join(' · ')}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 py-3.5">
                    <dt className="text-[8.5px] uppercase tracking-[0.24em] text-mute">Volume</dt>
                    <dd className="font-display text-[15px] text-bone/85">I · The Shattering</dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Leaves */}
      <section id="leaves" className="relative border-t border-gold/10 py-14 lg:py-20">
        <div className="mx-auto w-full max-w-[94rem] px-5 sm:px-8 lg:px-12">
          <SectionHeading
            numeral={chapter.numeral}
            eyebrow="The leaves"
            title={
              <>
                Read the <span className="italic text-gold/90">record</span>
              </>
            }
            lede={
              <>
                Each leaf is a single entry, kept short on purpose. Open one to read it in full —
                coordinates, era and all.
              </>
            }
          />

          <div className="mt-10 flex flex-col gap-4 border-t border-gold/12 pt-6 lg:flex-row lg:items-center lg:justify-between">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder={`Search ${chapter.label.toLowerCase()} by name, place or tag…`}
              label={`Search the ${chapter.label} chapter`}
              className="w-full lg:max-w-[22rem]"
            />
          </div>

          <div className="mt-4">
            <FilterBar
              options={filters}
              value={tag}
              onChange={setTag}
              total={leaves.length}
              shown={shown.length}
            />
          </div>

          {shown.length > 0 ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {shown.map((leaf, index) => (
                <Reveal key={leaf.id} delay={Math.min(index, 5) * 0.05} className="h-full">
                  <InfoCard entry={leaf} onOpen={() => openEntry(leaf.id)} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-10 border border-gold/12 px-6 py-14 text-center">
              <p className="font-display text-[20px] italic text-bone/75">
                Nothing in this chapter answers to that.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setTag(null)
                }}
                className="mt-4 font-inscribed text-[8.5px] uppercase tracking-[0.26em] text-gold/70 transition-colors hover:text-gold"
              >
                Clear the filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Gallery */}
      <section id="plates" className="relative border-t border-gold/10 py-14 lg:py-20">
        <div className="mx-auto w-full max-w-[94rem] px-5 sm:px-8 lg:px-12">
          <SectionHeading
            numeral="✳"
            eyebrow="The plates"
            title={
              <>
                Drawn from the <span className="italic text-gold/90">survey</span>
              </>
            }
            lede={
              <>
                The archive ships no photography. Every plate is engraved in-house, from the notes of
                whoever came back.
              </>
            }
          />
          <div className="mt-10">
            <Gallery plates={gallery} />
          </div>
        </div>
      </section>

      {/* Chapter to chapter */}
      <nav aria-label="Chapters" className="border-t border-gold/10">
        <div className="mx-auto grid w-full max-w-[94rem] gap-px bg-gold/10 sm:grid-cols-2 lg:px-12">
          <Link
            to={chapterPath(prevChapter.id)}
            className="group flex flex-col gap-2 bg-ink px-5 py-8 transition-colors duration-500 hover:bg-ink-raised sm:px-8"
          >
            <span className="flex items-center gap-2 font-inscribed text-[8px] uppercase tracking-[0.26em] text-mute">
              <ArrowLeft
                size={11}
                strokeWidth={1.4}
                className="transition-transform duration-500 group-hover:-translate-x-1"
              />
              Previous chapter
            </span>
            <span className="font-display text-[1.5rem] leading-tight text-bone/85 transition-colors duration-500 group-hover:text-gold">
              {prevChapter.title}
            </span>
          </Link>

          <Link
            to={chapterPath(nextChapter.id)}
            className="group flex flex-col items-end gap-2 bg-ink px-5 py-8 text-right transition-colors duration-500 hover:bg-ink-raised sm:px-8"
          >
            <span className="flex items-center gap-2 font-inscribed text-[8px] uppercase tracking-[0.26em] text-mute">
              Next chapter
              <ArrowRight
                size={11}
                strokeWidth={1.4}
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
            </span>
            <span className="font-display text-[1.5rem] leading-tight text-bone/85 transition-colors duration-500 group-hover:text-gold">
              {nextChapter.title}
            </span>
          </Link>
        </div>
      </nav>

      <DetailPanel
        entry={selected}
        chapterLabel={chapter.label}
        chapterSlug={chapter.id}
        onClose={closeEntry}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </>
  )
}
