import { ArrowUpRight } from 'lucide-react'
import type { Accent, Entry } from '../../lib/data'
import { cn } from '../../lib/cn'
import { CornerMarks } from './Ornament'
import { Glyph } from './Glyph'

const accentInk: Record<Accent, string> = {
  gold: 'text-gold/85',
  crimson: 'text-[#c07a70]',
  moon: 'text-[#a9b8d6]',
  verdant: 'text-[#aab68a]',
}

export function InfoCard({ entry, onOpen }: { entry: Entry; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Read the leaf on ${entry.name}`}
      className={cn(
        'group relative flex h-full w-full flex-col overflow-hidden border border-gold/12 bg-[linear-gradient(180deg,rgba(26,25,22,0.5),rgba(9,9,9,0.85))] p-5 text-left transition-[border-color,background-color,transform] duration-700 ease-out-expo sm:p-6',
        'hover:-translate-y-0.5 hover:border-gold/35 hover:bg-[linear-gradient(180deg,rgba(34,31,25,0.62),rgba(9,9,9,0.9))]',
        'focus-visible:-translate-y-0.5',
      )}
    >
      <CornerMarks tone="dim" />

      <Glyph
        id={entry.glyph}
        size={130}
        className="pointer-events-none absolute -bottom-8 -right-6 text-gold/[0.045] transition-colors duration-700 group-hover:text-gold/[0.1]"
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
          <Glyph id={entry.glyph} size={14} className={accentInk[entry.accent]} />
        </span>
        <span className="font-inscribed text-[9px] tracking-[0.22em] text-gold/30">{entry.numeral}</span>
      </div>

      <h3 className="mt-6 font-display text-[1.35rem] leading-tight text-bone/95">{entry.name}</h3>
      <p className="mt-1 font-display text-[12.5px] italic text-gold/65">{entry.epithet}</p>
      <p className="mt-4 line-clamp-2 text-[11.5px] leading-[1.85] text-ash/55">{entry.inscription}</p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {entry.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="border border-gold/12 px-2 py-0.5 text-[8px] uppercase tracking-[0.16em] text-mute"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <span className="truncate text-[8.5px] uppercase tracking-[0.2em] text-mute">{entry.locus}</span>
        <ArrowUpRight
          size={14}
          strokeWidth={1.3}
          className="shrink-0 text-gold/40 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
        />
      </div>
    </button>
  )
}
