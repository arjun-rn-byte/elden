import type { Accent, Entry } from '../../lib/data'
import { cn } from '../../lib/cn'
import { CornerMarks } from '../ui/Ornament'
import { Glyph } from '../ui/Glyph'

const accentInk: Record<Accent, string> = {
  gold: 'text-gold/85',
  crimson: 'text-[#c07a70]',
  moon: 'text-[#a9b8d6]',
  verdant: 'text-[#aab68a]',
}

export function EntryPlate({
  entry,
  variant = 'portrait',
}: {
  entry: Entry
  variant?: 'portrait' | 'compact'
}) {
  const compact = variant === 'compact'

  return (
    <article
      className={cn(
        'group relative flex h-full overflow-hidden border border-gold/12 bg-[linear-gradient(180deg,rgba(26,25,22,0.5),rgba(9,9,9,0.82))] transition-[border-color,background-color,transform] duration-700 ease-out-expo',
        'hover:border-gold/32 hover:bg-[linear-gradient(180deg,rgba(34,31,25,0.62),rgba(9,9,9,0.9))]',
        compact ? 'flex-col p-5' : 'flex-col p-5 sm:p-6',
      )}
    >
      <CornerMarks tone="dim" />

      <Glyph
        id={entry.glyph}
        size={140}
        className="pointer-events-none absolute -bottom-9 -right-7 text-gold/[0.045] transition-colors duration-700 group-hover:text-gold/[0.1]"
      />

      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(237,219,176,0.55),transparent)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />

      <div className="flex items-start justify-between gap-4">
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center">
          <span
            aria-hidden
            className="absolute inset-0 rotate-45 border border-gold/22 transition-[transform,border-color] duration-[900ms] ease-out-expo group-hover:rotate-[135deg] group-hover:border-gold/45"
          />
          <Glyph
            id={entry.glyph}
            size={compact ? 14 : 15}
            className={cn('transition-opacity duration-700', accentInk[entry.accent])}
          />
        </span>
        <span className="font-inscribed text-[9px] tracking-[0.22em] text-gold/30">
          {entry.numeral}
        </span>
      </div>

      <h3
        className={cn(
          'mt-6 font-display leading-tight text-bone/95 transition-colors duration-500 group-hover:text-bone',
          compact ? 'text-[1.2rem]' : 'text-[1.35rem] sm:text-[1.45rem]',
        )}
      >
        {entry.name}
      </h3>
      <p className="mt-1 font-display text-[12.5px] italic text-gold/65">{entry.epithet}</p>

      <p
        className={cn(
          'mt-4 text-[11.5px] leading-[1.85] text-ash/55',
          compact ? 'line-clamp-2' : '',
        )}
      >
        {entry.inscription}
      </p>

      <div className="mt-auto flex items-center gap-2.5 pt-6">
        <span className="h-px w-4 bg-gold/30" aria-hidden />
        <span className="truncate text-[8.5px] uppercase tracking-[0.2em] text-mute">
          {entry.locus}
        </span>
      </div>
    </article>
  )
}
