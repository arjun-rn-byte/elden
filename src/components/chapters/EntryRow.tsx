import type { Entry } from '../../lib/data'
import { Glyph } from '../ui/Glyph'

/** A boss is an occasion, not a card: full-width rows with room to breathe. */
export function EntryRow({ entry }: { entry: Entry }) {
  return (
    <article className="group relative grid grid-cols-[2.6rem_1fr] items-start gap-x-4 border-t border-gold/10 py-7 transition-colors duration-700 last:border-b last:border-gold/10 hover:border-gold/25 sm:grid-cols-[5rem_1fr_13rem] sm:items-center sm:gap-x-8 sm:py-9">
      <span className="font-display text-[1.7rem] leading-none text-gold/25 transition-colors duration-700 group-hover:text-gold/55 sm:text-[2.4rem]">
        {entry.numeral}
      </span>

      <div className="min-w-0">
        <h3 className="font-display text-[1.6rem] leading-tight text-bone/95 transition-colors duration-500 group-hover:text-bone sm:text-[2.05rem]">
          {entry.name}
        </h3>
        <p className="mt-1 font-display text-[13px] italic text-gold/65 sm:text-[14px]">
          {entry.epithet}
        </p>
        <p className="mt-3 max-w-[52ch] text-[11.5px] leading-[1.85] text-ash/55">
          {entry.inscription}
        </p>
      </div>

      <div className="col-start-2 mt-4 flex items-center gap-3 sm:col-start-3 sm:mt-0 sm:justify-end">
        <span className="text-[8.5px] uppercase tracking-[0.2em] text-mute">{entry.locus}</span>
        <Glyph
          id={entry.glyph}
          size={18}
          className="hidden text-gold/40 transition-colors duration-700 group-hover:text-gold/70 sm:block"
        />
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-gold/45 transition-[width] duration-[1100ms] ease-out-expo group-hover:w-full"
      />
    </article>
  )
}
