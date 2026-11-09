import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import type { Entry } from '../../lib/data'
import { useLockBodyScroll } from '../../hooks/useArchive'
import { EASE } from '../../lib/motion'
import { ArcaneSigilField } from './ArcaneSigilField'
import { Breadcrumbs } from '../layout/Breadcrumbs'

interface DetailPanelProps {
  entry: Entry | null
  chapterLabel: string
  chapterSlug: string
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

const facts = (entry: Entry) => [
  { term: 'Locus', detail: entry.locus },
  { term: 'Era', detail: entry.era },
  { term: 'Standing', detail: entry.standing },
]

export function DetailPanel({
  entry,
  chapterLabel,
  chapterSlug,
  onClose,
  onPrev,
  onNext,
}: DetailPanelProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useLockBodyScroll(Boolean(entry))

  useEffect(() => {
    if (!entry) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrev()
      if (event.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    const frame = requestAnimationFrame(() => closeRef.current?.focus())
    return () => {
      window.removeEventListener('keydown', onKey)
      cancelAnimationFrame(frame)
    }
  }, [entry, onClose, onPrev, onNext])

  return (
    <AnimatePresence>
      {entry ? (
        <motion.div
          className="fixed inset-0 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <div className="absolute inset-0 bg-ink/85 backdrop-blur-md" onClick={onClose} aria-hidden />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={`${entry.name} — ${entry.epithet}`}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: EASE }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[38rem] flex-col border-l border-gold/20 bg-[linear-gradient(180deg,#121110_0%,#0a0a09_60%,#090909_100%)] shadow-[-40px_0_80px_-40px_rgba(0,0,0,0.9)]"
          >
            <ArcaneSigilField
              glyph={entry.glyph}
              accent={entry.accent}
              glyphOpacity={0.04}
              glyphSize={170}
              className="pointer-events-none absolute -right-24 top-16 h-[26rem] w-[26rem] opacity-60"
            />

            <div className="relative flex items-center justify-between gap-4 border-b border-gold/12 px-5 py-4 sm:px-7">
              <Breadcrumbs
                items={[
                  { label: chapterLabel, to: `/${chapterSlug}` },
                  { label: entry.name },
                ]}
              />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close the leaf"
                className="flex h-8 w-8 shrink-0 items-center justify-center border border-gold/15 text-ash/70 transition-colors duration-500 hover:border-gold/45 hover:text-gold"
              >
                <X size={14} strokeWidth={1.4} />
              </button>
            </div>

            <div className="relative flex-1 overflow-y-auto px-5 py-8 sm:px-7 sm:py-10">
              <div className="flex items-center gap-3">
                <span className="font-inscribed text-[10px] tracking-[0.22em] text-gold/60">
                  {entry.numeral}
                </span>
                <span className="h-px w-8 bg-gold/25" />
                <span className="eyebrow text-mute">{entry.era}</span>
              </div>

              <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,2.6rem)] leading-[1.05] text-bone">
                {entry.name}
              </h2>
              <p className="mt-2 font-display text-[14px] italic text-gold/70">{entry.epithet}</p>

              <p className="mt-7 border-l border-gold/25 pl-4 font-display text-[16px] italic leading-[1.7] text-bone/75">
                “{entry.inscription}”
              </p>

              <p className="mt-7 text-[13px] leading-[1.95] text-ash/80">{entry.summary}</p>
              <p className="mt-4 text-[13px] leading-[1.95] text-ash/70">{entry.lore}</p>

              <dl className="mt-9 grid grid-cols-1 gap-px border border-gold/12 bg-gold/10 sm:grid-cols-3">
                {facts(entry).map((fact) => (
                  <div key={fact.term} className="bg-ink/85 px-4 py-4">
                    <dt className="text-[8px] uppercase tracking-[0.24em] text-mute">{fact.term}</dt>
                    <dd className="mt-2 font-display text-[13.5px] leading-snug text-bone/85">
                      {fact.detail}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-gold/15 px-2.5 py-1 text-[8.5px] uppercase tracking-[0.18em] text-ash/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {entry.sealed ? (
                <p className="mt-7 border border-gold/15 bg-gold/[0.03] px-4 py-3 text-[11px] leading-relaxed text-mute">
                  This leaf is held in the scriptorium — the survey is incomplete, and the archive
                  will not invent what it has not read.
                </p>
              ) : null}
            </div>

            <div className="relative flex items-center justify-between gap-3 border-t border-gold/12 px-5 py-4 sm:px-7">
              <button
                type="button"
                onClick={onPrev}
                className="group flex items-center gap-2 font-inscribed text-[8.5px] uppercase tracking-[0.24em] text-ash/65 transition-colors duration-500 hover:text-gold"
              >
                <ArrowLeft
                  size={12}
                  strokeWidth={1.4}
                  className="transition-transform duration-500 group-hover:-translate-x-1"
                />
                Previous leaf
              </button>
              <button
                type="button"
                onClick={onNext}
                className="group flex items-center gap-2 font-inscribed text-[8.5px] uppercase tracking-[0.24em] text-ash/65 transition-colors duration-500 hover:text-gold"
              >
                Next leaf
                <ArrowRight
                  size={12}
                  strokeWidth={1.4}
                  className="transition-transform duration-500 group-hover:translate-x-1"
                />
              </button>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
