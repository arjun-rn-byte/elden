import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, Compass, Grid, Search } from 'lucide-react'
import {
  characters,
  characterFactions,
  characterTypes,
  type CharacterType,
  type Faction,
} from '../lib/characters'
import { Breadcrumbs } from '../components/layout/Breadcrumbs'
import { CharacterCard } from '../components/characters/CharacterCard'
import { CharacterFamilyTree } from '../components/characters/CharacterFamilyTree'
import { CharacterDetailModal } from '../components/characters/CharacterDetailModal'
import { Reveal } from '../components/ui/Reveal'
import { cn } from '../lib/cn'

export function CharactersPage() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<CharacterType | 'all'>('all')
  const [factionFilter, setFactionFilter] = useState<Faction | 'all'>('all')
  const [viewMode, setViewMode] = useState<'gallery' | 'tree'>('gallery')

  const selectedCharId = params.get('character') ?? params.get('entry')
  const selectedCharacter = characters.find((c) => c.id === selectedCharId) ?? null

  useEffect(() => {
    const previous = document.title
    document.title = 'Those Who Remain — Characters of the Lands Between'
    return () => {
      document.title = previous
    }
  }, [])

  // Filtered characters
  const filteredCharacters = useMemo(() => {
    const q = query.trim().toLowerCase()
    return characters.filter((c) => {
      const matchesSearch = q
        ? [c.name, c.title, c.epithet, c.faction, c.type, ...c.affiliations].some((term) =>
            term.toLowerCase().includes(q),
          )
        : true

      const matchesType = typeFilter === 'all' ? true : c.type === typeFilter
      const matchesFaction = factionFilter === 'all' ? true : c.faction === factionFilter

      return matchesSearch && matchesType && matchesFaction
    })
  }, [query, typeFilter, factionFilter])

  const openCharacter = (id: string) => {
    const next = new URLSearchParams(params)
    next.delete('entry')
    next.set('character', id)
    setParams(next)
  }

  const closeCharacter = () => {
    const next = new URLSearchParams(params)
    next.delete('character')
    next.delete('entry')
    setParams(next, { replace: true })
  }

  const stepCharacter = (offset: number) => {
    if (!selectedCharacter) return
    const currentIndex = characters.findIndex((c) => c.id === selectedCharacter.id)
    if (currentIndex < 0) return
    const next = characters[(currentIndex + offset + characters.length) % characters.length]
    openCharacter(next.id)
  }

  return (
    <>
      {/* Top Breadcrumb Navigation */}
      <div className="mx-auto w-full max-w-[94rem] px-5 pt-24 sm:px-8 sm:pt-28 lg:px-12">
        <Breadcrumbs items={[{ label: 'Characters', to: '/characters' }]} />
      </div>

      {/* Cinematic Masthead */}
      <section className="relative overflow-hidden border-b border-gold/15 py-12 lg:py-18">
        <div className="mx-auto w-full max-w-[94rem] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="font-inscribed text-[11px] tracking-[0.2em] text-gold/70">II</span>
              <span className="h-px w-7 bg-gold/35" />
              <span className="eyebrow">Chapter II · The Demigods & Figures</span>
            </div>

            <h1 className="mt-6 font-display text-[clamp(2.6rem,6vw,5rem)] font-light leading-[1.02] tracking-[-0.015em] text-bone">
              Those Who <span className="italic text-gold-bright/90">Remain</span>
            </h1>

            <p className="mt-5 max-w-[42rem] text-[13.5px] leading-[1.95] text-ash/80">
              The Shattering did not produce heroes; it produced claimants. God-kings who shattered
              their thrones, cursed omens who defended empty halls, and the Tarnished who arrived to
              inherit their unfinished sentence.
            </p>
          </Reveal>

          {/* Quick Metrics */}
          <div className="mt-8 flex flex-wrap gap-8 border-t border-gold/10 pt-6">
            <div>
              <span className="font-inscribed text-[7.5px] uppercase tracking-[0.2em] text-mute">Documented Figures</span>
              <p className="mt-1 font-display text-[1.4rem] text-bone">{characters.length} Demigods & Allies</p>
            </div>
            <div className="border-l border-gold/15 pl-8">
              <span className="font-inscribed text-[7.5px] uppercase tracking-[0.2em] text-mute">Lineages Mapped</span>
              <p className="mt-1 font-display text-[1.4rem] text-bone">3 Royal Dynasties</p>
            </div>
            <div className="border-l border-gold/15 pl-8">
              <span className="font-inscribed text-[7.5px] uppercase tracking-[0.2em] text-mute">Curated Folios</span>
              <p className="mt-1 font-display text-[1.4rem] text-bone">100% Inscribed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="relative py-12 lg:py-16">
        <div className="mx-auto w-full max-w-[94rem] px-5 sm:px-8 lg:px-12">
          {/* Top Controls: View Switcher and Live Search */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-gold/12 pb-6">
            {/* View Mode Toggle: Gallery vs Family Tree */}
            <div className="flex items-center gap-1.5 border border-gold/15 bg-ink-raised p-1">
              <button
                type="button"
                onClick={() => setViewMode('gallery')}
                aria-pressed={viewMode === 'gallery'}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 font-inscribed text-[8.5px] uppercase tracking-[0.2em] transition-colors',
                  viewMode === 'gallery'
                    ? 'border border-gold/40 bg-gold/10 text-gold'
                    : 'text-ash/60 hover:text-bone',
                )}
              >
                <Grid size={12} strokeWidth={1.3} />
                <span>Gallery</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('tree')}
                aria-pressed={viewMode === 'tree'}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 font-inscribed text-[8.5px] uppercase tracking-[0.2em] transition-colors',
                  viewMode === 'tree'
                    ? 'border border-gold/40 bg-gold/10 text-gold'
                    : 'text-ash/60 hover:text-bone',
                )}
              >
                <Compass size={12} strokeWidth={1.3} />
                <span>Family Tree</span>
              </button>
            </div>

            {/* Live Search Input */}
            <div className="relative w-full max-w-md">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/50" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, title, faction, or role…"
                className="w-full border border-gold/15 bg-ink-raised py-2 pl-10 pr-4 font-display text-[15px] text-bone placeholder:text-mute/60 focus:border-gold/50 focus:outline-none"
              />
            </div>
          </div>

          {/* Filter Chips Bar (only relevant for gallery view) */}
          <div className="mt-5 space-y-3">
            {/* Character Type Filters */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-inscribed text-[7.5px] uppercase tracking-[0.22em] text-mute mr-2">
                Type:
              </span>
              <button
                type="button"
                onClick={() => setTypeFilter('all')}
                className={cn(
                  'border px-2.5 py-1 font-inscribed text-[7.5px] uppercase tracking-[0.16em] transition-colors',
                  typeFilter === 'all'
                    ? 'border-gold/50 bg-gold/10 text-gold'
                    : 'border-gold/12 text-ash/65 hover:text-bone',
                )}
              >
                All ({characters.length})
              </button>
              {characterTypes.map((type) => {
                const count = characters.filter((c) => c.type === type).length
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTypeFilter(type)}
                    className={cn(
                      'border px-2.5 py-1 font-inscribed text-[7.5px] uppercase tracking-[0.16em] transition-colors',
                      typeFilter === type
                        ? 'border-gold/50 bg-gold/10 text-gold'
                        : 'border-gold/12 text-ash/65 hover:text-bone',
                    )}
                  >
                    {type} ({count})
                  </button>
                )
              })}
            </div>

            {/* Faction Filters */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-inscribed text-[7.5px] uppercase tracking-[0.22em] text-mute mr-2">
                Faction:
              </span>
              <button
                type="button"
                onClick={() => setFactionFilter('all')}
                className={cn(
                  'border px-2.5 py-1 font-inscribed text-[7.5px] uppercase tracking-[0.16em] transition-colors',
                  factionFilter === 'all'
                    ? 'border-gold/50 bg-gold/10 text-gold'
                    : 'border-gold/12 text-ash/65 hover:text-bone',
                )}
              >
                All Factions
              </button>
              {characterFactions.map((faction) => (
                <button
                  key={faction}
                  type="button"
                  onClick={() => setFactionFilter(faction)}
                  className={cn(
                    'border px-2.5 py-1 font-inscribed text-[7.5px] uppercase tracking-[0.16em] transition-colors',
                    factionFilter === faction
                      ? 'border-gold/50 bg-gold/10 text-gold'
                      : 'border-gold/12 text-ash/65 hover:text-bone',
                  )}
                >
                  {faction}
                </button>
              ))}
            </div>
          </div>

          {/* View Content: Family Tree or Gallery */}
          <div className="mt-8">
            {viewMode === 'tree' ? (
              <Reveal>
                <div className="space-y-4">
                  <div className="border border-gold/15 bg-ink/40 p-2 sm:p-4">
                    <CharacterFamilyTree
                      onSelectCharacter={openCharacter}
                      selectedId={selectedCharId}
                    />
                  </div>
                </div>
              </Reveal>
            ) : (
              <div>
                {/* Character Cards Gallery Grid */}
                {filteredCharacters.length > 0 ? (
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredCharacters.map((character) => (
                      <Reveal key={character.id} delay={0.04}>
                        <CharacterCard
                          character={character}
                          onSelect={() => openCharacter(character.id)}
                          selected={character.id === selectedCharId}
                        />
                      </Reveal>
                    ))}
                  </div>
                ) : (
                  <div className="border border-gold/15 bg-ink/60 p-12 text-center">
                    <p className="font-display text-[20px] italic text-bone/75">
                      No figures found in the archive matching this inquiry.
                    </p>
                    <p className="mt-2 text-[12px] text-mute">
                      Try broadening your search term or clearing active filters.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setQuery('')
                        setTypeFilter('all')
                        setFactionFilter('all')
                      }}
                      className="mt-5 border border-gold/30 px-4 py-2 font-inscribed text-[8px] uppercase tracking-[0.2em] text-gold hover:border-gold hover:bg-gold/10"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Next Chapter Navigation */}
      <nav aria-label="Chapters" className="border-t border-gold/15">
        <Link
          to="/bosses"
          className="group mx-auto flex w-full max-w-[94rem] items-center justify-between gap-6 px-5 py-8 transition-colors duration-500 hover:bg-ink-raised sm:px-8 lg:px-12"
        >
          <span className="flex flex-col gap-2">
            <span className="font-inscribed text-[8px] uppercase tracking-[0.26em] text-mute">
              Next Chapter · III
            </span>
            <span className="font-display text-[1.5rem] leading-tight text-bone/85 transition-colors duration-500 group-hover:text-gold">
              What Waits at the End
            </span>
          </span>
          <ArrowRight
            size={16}
            strokeWidth={1.3}
            className="shrink-0 text-gold/40 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-gold"
          />
        </Link>
      </nav>

      {/* Detailed Character Profile Modal */}
      <CharacterDetailModal
        key={selectedCharacter?.id}
        character={selectedCharacter}
        onClose={closeCharacter}
        onSelectCharacter={openCharacter}
        onPrev={() => stepCharacter(-1)}
        onNext={() => stepCharacter(1)}
      />
    </>
  )
}
