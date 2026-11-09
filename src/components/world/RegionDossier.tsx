import type { RefObject } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import type { AtlasRegion } from '../../lib/regions'
import { stratumOf } from '../../lib/regions'
import { Glyph } from '../ui/Glyph'
import { CornerMarks } from '../ui/Ornament'
import { EASE } from '../../lib/motion'

interface RegionDossierProps {
  region: AtlasRegion
  previous: AtlasRegion
  next: AtlasRegion
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  panelRef: RefObject<HTMLElement | null>
}

function NoteList({
  title,
  notes,
  empty,
  tone = 'gold',
}: {
  title: string
  notes: { name: string; note: string }[]
  empty?: string
  tone?: 'gold' | 'crimson' | 'moon'
}) {
  const rule =
    tone === 'crimson' ? 'bg-[#9a3d36]/40' : tone === 'moon' ? 'bg-[#8798bd]/40' : 'bg-gold/35'

  return (
    <div>
      <p className="font-inscribed text-[8px] uppercase tracking-[0.26em] text-gold/55">{title}</p>
      <span aria-hidden className={`mt-3 block h-px w-8 ${rule}`} />
      {notes.length > 0 ? (
        <dl className="mt-4 space-y-3.5">
          {notes.map((item) => (
            <div key={item.name}>
              <dt className="font-display text-[13.5px] leading-snug text-bone/90">{item.name}</dt>
              <dd className="mt-1 text-[10.5px] leading-[1.7] text-ash/55">{item.note}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="mt-4 font-display text-[13px] italic leading-relaxed text-ash/45">{empty}</p>
      )}
    </div>
  )
}

/** The region's opened folio: description, ground, keepers and company. */
export function RegionDossier({
  region,
  previous,
  next,
  onClose,
  onPrev,
  onNext,
  panelRef,
}: RegionDossierProps) {
  const plate = stratumOf(region.stratum)

  return (
    <motion.section
      ref={panelRef}
      id="dossier"
      aria-label={`The survey of ${region.name}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative border-t border-gold/15 bg-[linear-gradient(180deg,rgba(22,21,18,0.55),rgba(9,9,9,0.92))]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_18%_0%,rgba(198,164,90,0.07),transparent_70%)]"
      />
      <div className="relative mx-auto w-full max-w-[94rem] px-5 py-9 sm:px-8 lg:px-12 lg:py-12">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-inscribed text-[9px] tracking-[0.22em] text-gold/60">{region.ref}</span>
              <span aria-hidden className="h-px w-6 bg-gold/30" />
              <span className="font-inscribed text-[8px] uppercase tracking-[0.24em] text-mute">
                {plate.plate} · {plate.label}
              </span>
              {plate.dlc ? (
                <span className="border border-gold/25 px-1.5 py-px font-inscribed text-[7px] uppercase tracking-[0.16em] text-gold/55">
                  DLC
                </span>
              ) : null}
            </div>

            <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3.1rem)] font-light leading-[1.02] text-bone">
              {region.name}
            </h2>
            <p className="mt-1.5 font-display text-[15px] italic text-gold/65">{region.epithet}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close the dossier"
            className="group flex shrink-0 items-center gap-2 border border-gold/15 px-3 py-2 text-mute transition-colors duration-500 hover:border-gold/40 hover:text-gold"
          >
            <span className="hidden font-inscribed text-[8px] uppercase tracking-[0.22em] sm:inline">
              Close
            </span>
            <X size={13} strokeWidth={1.4} />
          </button>
        </div>

        <div className="mt-8 grid gap-10 border-t border-gold/10 pt-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="relative plate p-5 sm:p-6">
              <CornerMarks tone="dim" />
              <Glyph
                id={region.glyph}
                size={150}
                className="pointer-events-none absolute -bottom-10 -right-8 text-gold/[0.05]"
              />
              <p className="relative font-display text-[16px] leading-[1.65] text-gold-bright/80">
                “{region.survey}”
              </p>
              <p className="relative mt-5 text-[12.5px] leading-[1.95] text-ash/70">
                {region.description}
              </p>
            </div>

            <dl className="mt-6 divide-y divide-gold/10 border-y border-gold/10">
              <div className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="font-inscribed text-[8px] uppercase tracking-[0.22em] text-mute">Filed under</dt>
                <dd className="text-right text-[10.5px] uppercase tracking-[0.14em] text-ash/70">
                  {region.depth}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="font-inscribed text-[8px] uppercase tracking-[0.22em] text-mute">Character</dt>
                <dd className="flex flex-wrap justify-end gap-1.5">
                  {region.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-gold/15 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.14em] text-ash/65"
                    >
                      {tag}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3 lg:gap-6">
            <NoteList title="Notable ground" notes={region.places} />
            <NoteList title="What keeps it" notes={region.bosses} tone="crimson" />
            <NoteList
              title="Who still speaks"
              notes={region.npcs}
              tone="moon"
              empty="No one here admits to speaking with anyone. The archive has stopped asking."
            />
          </div>
        </div>

        <nav aria-label="Regions on this plate" className="mt-9 flex items-stretch justify-between gap-px border-t border-gold/10 pt-0">
          <button
            type="button"
            onClick={onPrev}
            className="group flex flex-1 flex-col items-start gap-1.5 py-4 pr-4 text-left"
          >
            <span className="flex items-center gap-2 font-inscribed text-[8px] uppercase tracking-[0.24em] text-mute transition-colors duration-400 group-hover:text-gold/80">
              <ArrowLeft size={11} strokeWidth={1.4} className="transition-transform duration-500 group-hover:-translate-x-1" />
              Previous region
            </span>
            <span className="font-display text-[15px] text-bone/80 transition-colors duration-400 group-hover:text-gold">
              {previous.name}
            </span>
          </button>

          <span aria-hidden className="mx-4 my-4 w-px bg-gold/10" />

          <button
            type="button"
            onClick={onNext}
            className="group flex flex-1 flex-col items-end gap-1.5 py-4 pl-4 text-right"
          >
            <span className="flex items-center gap-2 font-inscribed text-[8px] uppercase tracking-[0.24em] text-mute transition-colors duration-400 group-hover:text-gold/80">
              Next region
              <ArrowRight size={11} strokeWidth={1.4} className="transition-transform duration-500 group-hover:translate-x-1" />
            </span>
            <span className="font-display text-[15px] text-bone/80 transition-colors duration-400 group-hover:text-gold">
              {next.name}
            </span>
          </button>
        </nav>
      </div>
    </motion.section>
  )
}
