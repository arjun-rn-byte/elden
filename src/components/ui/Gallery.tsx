import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { GalleryPlate } from '../../lib/chapters'
import { EASE } from '../../lib/motion'
import { useLockBodyScroll } from '../../hooks/useArchive'
import { ArcaneSigilField } from './ArcaneSigilField'
import { CornerMarks } from './Ornament'

/** No photography in this archive: every plate is drawn, so the gallery is too. */
export function Gallery({ plates }: { plates: GalleryPlate[] }) {
  const [open, setOpen] = useState<number | null>(null)
  useLockBodyScroll(open !== null)

  useEffect(() => {
    if (open === null) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const current = open === null ? null : plates[open]

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-3">
        {plates.map((plate, index) => (
          <li key={plate.title}>
            <button
              type="button"
              onClick={() => setOpen(index)}
              aria-label={`Open the plate: ${plate.title}`}
              className="group relative flex w-full flex-col overflow-hidden border border-gold/12 bg-ink/40 text-left transition-colors duration-700 hover:border-gold/30"
            >
              <CornerMarks tone="dim" />
              <span className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden border-b border-gold/10 bg-[radial-gradient(circle_at_50%_45%,rgba(198,164,90,0.09),rgba(9,9,9,0.9)_70%)]">
                <ArcaneSigilField
                  glyph={plate.glyph}
                  accent={plate.accent}
                  glyphOpacity={0.16}
                  glyphSize={96}
                  className="h-[150%] w-[150%] opacity-70 transition-transform duration-[1600ms] ease-out-expo group-hover:scale-105"
                />
              </span>
              <span className="flex flex-col gap-1 px-4 py-4">
                <span className="font-display text-[1.05rem] leading-tight text-bone/90 transition-colors duration-500 group-hover:text-gold">
                  {plate.title}
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-mute">{plate.caption}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {current ? (
          <motion.div
            className="fixed inset-0 z-[65] flex items-center justify-center p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div
              className="absolute inset-0 bg-ink/92 backdrop-blur-md"
              onClick={() => setOpen(null)}
              aria-hidden
            />
            <motion.figure
              role="dialog"
              aria-modal="true"
              aria-label={current.title}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative w-full max-w-[34rem] border border-gold/20 bg-ink-raised p-3"
            >
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close the plate"
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center border border-gold/20 bg-ink/70 text-ash/70 transition-colors hover:border-gold/45 hover:text-gold"
              >
                <X size={14} strokeWidth={1.4} />
              </button>

              <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden border border-gold/10 bg-[radial-gradient(circle_at_50%_45%,rgba(198,164,90,0.1),rgba(9,9,9,0.95)_70%)]">
                <ArcaneSigilField
                  glyph={current.glyph}
                  accent={current.accent}
                  glyphOpacity={0.18}
                  glyphSize={140}
                  className="h-[86%] w-[86%]"
                />
              </div>

              <figcaption className="px-2 pb-1 pt-4">
                <p className="font-display text-[1.25rem] text-bone">{current.title}</p>
                <p className="mt-1 text-[10.5px] uppercase tracking-[0.2em] text-mute">
                  {current.caption}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
