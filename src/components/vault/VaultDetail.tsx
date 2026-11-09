import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Lock } from 'lucide-react'
import { categories, type Entry } from '../../lib/data'
import { EASE } from '../../lib/motion'
import { ArcaneSigilField } from '../ui/ArcaneSigilField'
import { CornerMarks, Diamond } from '../ui/Ornament'

interface VaultDetailProps {
  entry: Entry
  position: number
  total: number
  previous?: Entry
  next?: Entry
  onPrevious: () => void
  onNext: () => void
}

export function VaultDetail({
  entry,
  position,
  total,
  previous,
  next,
  onPrevious,
  onNext,
}: VaultDetailProps) {
  const wing = categories.find((category) => category.id === entry.category)
  const facts = [
    { label: 'Locus', value: entry.locus },
    { label: 'Era', value: entry.era },
    { label: 'Standing', value: entry.standing },
  ]

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.article
        key={entry.id}
        initial={{ opacity: 0, y: 16, filter: 'blur(5px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -10, filter: 'blur(3px)' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="plate relative overflow-hidden"
        aria-labelledby={`leaf-${entry.id}`}
      >
        <ArcaneSigilField
          glyph={entry.glyph}
          accent={entry.accent}
          glyphOpacity={0.13}
          glyphSize={96}
          className="absolute -right-20 -top-24 h-[19rem] w-[19rem] opacity-45 sm:-right-28 sm:-top-28 sm:h-[26rem] sm:w-[26rem]"
        />

        <div className="relative p-6 sm:p-9 lg:p-11">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-inscribed text-[9px] uppercase tracking-[0.26em] text-gold/70">
              {wing?.label ?? 'The Archive'}
            </span>
            <Diamond className="h-[3px] w-[3px]" />
            <span className="font-sans text-[10px] tracking-[0.18em] text-mute">
              Leaf {entry.numeral}
            </span>
            {entry.sealed ? (
              <span className="ml-auto inline-flex items-center gap-2 border border-gold/20 px-2.5 py-1 font-inscribed text-[8.5px] uppercase tracking-[0.22em] text-gold/60">
                <Lock size={10} strokeWidth={1.4} />
                Sealed
              </span>
            ) : (
              <span className="ml-auto font-sans text-[9.5px] uppercase tracking-[0.2em] text-mute">
                Transcribed
              </span>
            )}
          </div>

          <h3
            id={`leaf-${entry.id}`}
            className="mt-7 font-display text-[clamp(2.15rem,4.4vw,3.6rem)] font-light leading-[0.95] tracking-[-0.02em] text-bone"
          >
            {entry.name}
          </h3>
          <p className="mt-2.5 font-display text-[1.05rem] italic text-gold/75">{entry.epithet}</p>

          <div className="mt-7 border-l border-gold/25 pl-4">
            <p className="font-display text-[15px] italic leading-relaxed text-bone/65">
              “{entry.inscription}”
            </p>
          </div>

          <p className="mt-7 max-w-[54ch] text-[15px] leading-[1.9] text-bone/85">{entry.summary}</p>

          <div className="prose-archive mt-4 max-w-[62ch]">
            <p>{entry.lore}</p>
          </div>

          {entry.sealed ? (
            <div className="mt-7 flex items-start gap-3 border border-gold/15 bg-gold/[0.025] p-4">
              <Lock size={13} strokeWidth={1.4} className="mt-0.5 shrink-0 text-gold/60" />
              <p className="text-[12px] leading-[1.8] text-ash/75">
                This leaf is still in the scriptorium. The summary stands; the full account is being
                transcribed, and the seal will lift when the survey is complete.
              </p>
            </div>
          ) : null}

          <dl className="mt-9 grid grid-cols-1 divide-y divide-gold/10 border-t border-gold/12 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {facts.map((fact) => (
              <div key={fact.label} className="py-4 sm:px-5 sm:first:pl-0 sm:last:pr-0">
                <dt className="eyebrow text-mute">{fact.label}</dt>
                <dd className="mt-2 font-display text-[15px] leading-snug text-bone/85">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>

          <ul className="mt-6 flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <li
                key={tag}
                className="border border-gold/12 px-2.5 py-1 font-sans text-[9.5px] uppercase tracking-[0.16em] text-ash/60"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex items-center justify-between gap-3 border-t border-gold/12 pt-5">
            <button
              type="button"
              onClick={onPrevious}
              disabled={!previous}
              className="group flex min-w-0 items-center gap-2 text-mute transition-colors duration-500 hover:text-gold disabled:pointer-events-none disabled:opacity-25"
            >
              <ArrowLeft
                size={13}
                strokeWidth={1.3}
                className="transition-transform duration-500 group-hover:-translate-x-1"
              />
              <span className="font-inscribed text-[8.5px] uppercase tracking-[0.24em]">
                Prev
              </span>
              <span className="hidden max-w-[9rem] truncate text-[11.5px] italic text-ash/60 sm:inline">
                {previous?.name}
              </span>
            </button>

            <span className="shrink-0 font-sans text-[10px] tracking-[0.18em] text-mute">
              {String(position).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>

            <button
              type="button"
              onClick={onNext}
              disabled={!next}
              className="group flex min-w-0 items-center gap-2 text-mute transition-colors duration-500 hover:text-gold disabled:pointer-events-none disabled:opacity-25"
            >
              <span className="hidden max-w-[9rem] truncate text-[11.5px] italic text-ash/60 sm:inline">
                {next?.name}
              </span>
              <span className="font-inscribed text-[8.5px] uppercase tracking-[0.24em]">Next</span>
              <ArrowRight
                size={13}
                strokeWidth={1.3}
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>

        <CornerMarks />
      </motion.article>
    </AnimatePresence>
  )
}
