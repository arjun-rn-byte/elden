import { ArrowRight } from 'lucide-react'
import type { CharacterEntry } from '../../lib/characters'
import { CharacterArtwork } from './CharacterArtwork'
import { cn } from '../../lib/cn'

interface CharacterCardProps {
  character: CharacterEntry
  onSelect: () => void
  selected?: boolean
}

export function CharacterCard({ character, onSelect, selected }: CharacterCardProps) {
  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect()
        }
      }}
      className={cn(
        'group relative flex flex-col overflow-hidden border bg-ink/75 transition-all duration-500 ease-out text-left cursor-pointer plate-hover',
        selected
          ? 'border-gold shadow-[0_0_24px_rgba(198,164,90,0.22)]'
          : 'border-gold/15 hover:border-gold/45',
      )}
    >
      {/* Top Card Badges */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-3 pointer-events-none">
        <span className="border border-gold/25 bg-ink/80 px-2 py-0.5 font-inscribed text-[7.5px] uppercase tracking-[0.18em] text-gold/85 backdrop-blur-md">
          {character.type}
        </span>
        <span className="border border-gold/15 bg-ink/70 px-1.5 py-0.5 font-inscribed text-[7px] uppercase tracking-[0.14em] text-ash/70 backdrop-blur-md">
          {character.faction}
        </span>
      </div>

      {/* Large Character Artwork */}
      <div className="relative w-full overflow-hidden">
        <CharacterArtwork
          id={character.id}
          name={character.name}
          accent={character.accent}
          className="transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col justify-between p-5 border-t border-gold/12 bg-ink/90">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-px w-4 bg-gold/40" />
            <span className="font-display text-[12px] italic text-gold/75">
              {character.epithet}
            </span>
          </div>

          <h3 className="mt-1 font-display text-[1.4rem] font-light leading-snug text-bone transition-colors duration-300 group-hover:text-gold">
            {character.name}
          </h3>

          <p className="mt-2.5 text-[11.5px] leading-relaxed text-ash/70 line-clamp-2">
            {character.summary}
          </p>
        </div>

        {/* Footer info & CTA */}
        <div className="mt-5 flex items-center justify-between border-t border-gold/10 pt-3">
          <span className="font-inscribed text-[7.5px] uppercase tracking-[0.2em] text-mute">
            {character.relationships.length} recorded ties
          </span>

          <span className="flex items-center gap-1.5 font-inscribed text-[8px] uppercase tracking-[0.22em] text-gold/65 transition-colors duration-300 group-hover:text-gold">
            Inspect Profile
            <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </div>
  )
}
