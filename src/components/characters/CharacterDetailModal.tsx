import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldAlert,
  X,
} from 'lucide-react'
import type { CharacterEntry } from '../../lib/characters'
import { characterById } from '../../lib/characters'
import { CharacterArtwork } from './CharacterArtwork'
import { Character3DPedestal } from './Character3DPedestal'
import { EASE } from '../../lib/motion'
import { cn } from '../../lib/cn'

interface CharacterDetailModalProps {
  character: CharacterEntry | null
  onClose: () => void
  onSelectCharacter: (id: string) => void
  onPrev?: () => void
  onNext?: () => void
}

export function CharacterDetailModal({
  character,
  onClose,
  onSelectCharacter,
  onPrev,
  onNext,
}: CharacterDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'lore' | 'quests' | 'ties' | '3d'>('lore')
  const [revealedSpoilers, setRevealedSpoilers] = useState<Record<string, boolean>>({})

  // Escape key closes modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!character) return null

  const toggleSpoiler = (label: string) => {
    setRevealedSpoilers((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  const revealAllSpoilers = () => {
    const all: Record<string, boolean> = {}
    character.spoilers.forEach((s) => {
      all[s.label] = true
    })
    setRevealedSpoilers(all)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 lg:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="absolute inset-0 bg-ink/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="relative flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden border border-gold/25 bg-[#090909] shadow-[0_25px_80px_rgba(0,0,0,0.95)]"
        >
          {/* Top Bar Chrome */}
          <div className="flex items-center justify-between border-b border-gold/15 bg-ink-raised px-5 py-3 sm:px-7">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="font-inscribed text-[8px] uppercase tracking-[0.24em] text-gold/70">
                Demigod Archive · {character.type}
              </span>
              <span className="hidden sm:inline border border-gold/20 px-2 py-0.5 font-inscribed text-[7.5px] uppercase tracking-[0.16em] text-ash/70">
                {character.faction}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {onPrev && (
                <button
                  type="button"
                  onClick={onPrev}
                  className="flex h-8 w-8 items-center justify-center border border-gold/15 text-ash/60 transition-colors hover:border-gold/40 hover:text-gold"
                  title="Previous character"
                >
                  <ArrowLeft size={13} />
                </button>
              )}
              {onNext && (
                <button
                  type="button"
                  onClick={onNext}
                  className="flex h-8 w-8 items-center justify-center border border-gold/15 text-ash/60 transition-colors hover:border-gold/40 hover:text-gold"
                  title="Next character"
                >
                  <ArrowRight size={13} />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center border border-gold/20 text-ash/70 transition-colors hover:border-gold/50 hover:text-gold"
                title="Close profile (Esc)"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Modal Body: Scrollable */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {/* Header Hero Area */}
            <div className="relative border-b border-gold/15 bg-gradient-to-b from-ink-raised to-ink p-6 sm:p-8 lg:p-10">
              <div className="grid gap-8 md:grid-cols-[14rem_minmax(0,1fr)] lg:grid-cols-[16rem_minmax(0,1fr)] items-start">
                {/* Large Portrait */}
                <div className="border border-gold/20 shadow-2xl">
                  <CharacterArtwork
                    id={character.id}
                    name={character.name}
                    accent={character.accent}
                  />
                </div>

                {/* Hero Header Text */}
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-display text-[14px] italic text-gold/80">
                        {character.epithet}
                      </span>
                      <span className="text-gold/30">·</span>
                      <span className="font-inscribed text-[8px] uppercase tracking-[0.2em] text-ash/60">
                        {character.faction}
                      </span>
                    </div>

                    <h2 className="mt-1 font-display text-[clamp(2.2rem,4vw,3.2rem)] font-light leading-tight text-bone">
                      {character.name}
                    </h2>

                    <p className="mt-4 font-display text-[15px] italic leading-relaxed text-gold-bright/80 border-l border-gold/30 pl-4">
                      “{character.quote}”
                    </p>

                    <p className="mt-4 text-[13px] leading-[1.85] text-ash/75">
                      {character.summary}
                    </p>
                  </div>

                  {/* Affiliations Pills */}
                  <div className="mt-6 border-t border-gold/10 pt-4">
                    <span className="font-inscribed text-[7.5px] uppercase tracking-[0.22em] text-gold/50">
                      Affiliations & Crests
                    </span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {character.affiliations.map((tag) => (
                        <span
                          key={tag}
                          className="border border-gold/15 bg-gold/[0.04] px-2.5 py-1 text-[8.5px] uppercase tracking-[0.14em] text-ash/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="sticky top-0 z-20 flex border-b border-gold/15 bg-ink/95 px-6 backdrop-blur-md">
              {[
                { id: 'lore', label: 'Lore & Background' },
                { id: 'quests', label: 'History & Quests' },
                { id: 'ties', label: `Relationships (${character.relationships.length})` },
                { id: '3d', label: '3D Model Pedestal' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={cn(
                    'border-b-2 px-4 py-3 font-inscribed text-[8.5px] uppercase tracking-[0.2em] transition-colors',
                    activeTab === tab.id
                      ? 'border-gold text-gold bg-gold/[0.04]'
                      : 'border-transparent text-ash/60 hover:text-bone',
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="p-6 sm:p-8 lg:p-10">
              {activeTab === 'lore' && (
                <div className="space-y-8">
                  {/* Background & History */}
                  <div>
                    <h3 className="font-inscribed text-[9px] uppercase tracking-[0.26em] text-gold/60">
                      Origins & Genesis
                    </h3>
                    <p className="mt-3 text-[13.5px] leading-[1.9] text-ash/85">
                      {character.background}
                    </p>
                  </div>

                  <div className="border-t border-gold/10 pt-6">
                    <h3 className="font-inscribed text-[9px] uppercase tracking-[0.26em] text-gold/60">
                      Role in the Shattering
                    </h3>
                    <p className="mt-3 text-[13.5px] leading-[1.9] text-ash/85">
                      {character.history}
                    </p>
                  </div>

                  {/* Story Spoilers Section */}
                  {character.spoilers.length > 0 && (
                    <div className="border border-gold/20 bg-gold/[0.02] p-5 sm:p-6">
                      <div className="flex items-center justify-between border-b border-gold/10 pb-3">
                        <div className="flex items-center gap-2">
                          <ShieldAlert size={14} className="text-[#c93832]" />
                          <h4 className="font-inscribed text-[8.5px] uppercase tracking-[0.22em] text-[#c93832]">
                            Story Spoilers & Revealed Truths
                          </h4>
                        </div>
                        <button
                          type="button"
                          onClick={revealAllSpoilers}
                          className="font-inscribed text-[7.5px] uppercase tracking-[0.18em] text-gold/70 hover:text-gold"
                        >
                          Reveal All Spoilers
                        </button>
                      </div>

                      <div className="mt-4 space-y-4">
                        {character.spoilers.map((spoiler) => {
                          const isRevealed = Boolean(revealedSpoilers[spoiler.label])
                          return (
                            <div
                              key={spoiler.label}
                              className="border border-gold/10 bg-ink/70 p-4 transition-all"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-display text-[13px] text-bone/90">
                                  {spoiler.label}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => toggleSpoiler(spoiler.label)}
                                  className="flex items-center gap-1.5 font-inscribed text-[7.5px] uppercase tracking-[0.16em] text-gold/70 hover:text-gold"
                                >
                                  {isRevealed ? (
                                    <>
                                      <EyeOff size={11} /> Hide
                                    </>
                                  ) : (
                                    <>
                                      <Eye size={11} /> Reveal Spoiler
                                    </>
                                  )}
                                </button>
                              </div>

                              <div className="mt-2.5">
                                {isRevealed ? (
                                  <p className="text-[12px] leading-relaxed text-bone/85 animate-fade-rise">
                                    {spoiler.text}
                                  </p>
                                ) : (
                                  <p className="select-none text-[12px] italic text-mute/50 blur-[3px]">
                                    This confidential truth is sealed by the Golden Order to protect the timeline.
                                  </p>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'quests' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-inscribed text-[9px] uppercase tracking-[0.26em] text-gold/60">
                      Tarnished Path & Questline Walkthrough
                    </h3>
                    <p className="mt-3 text-[13.5px] leading-[1.9] text-ash/85">
                      {character.quest}
                    </p>
                  </div>

                  <div className="border-t border-gold/10 pt-6">
                    <h4 className="font-inscribed text-[8px] uppercase tracking-[0.22em] text-gold/50">
                      Historical Significance
                    </h4>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-ash/70">
                      {character.history}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'ties' && (
                <div className="space-y-4">
                  <p className="text-[11.5px] text-ash/70">
                    Documented lineage, alliances, and feuds across the Shattering. Click any figure to navigate directly to their folio:
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {character.relationships.map((rel) => {
                      const target = characterById(rel.targetId)
                      return (
                        <div
                          key={rel.targetId}
                          onClick={() => {
                            if (target) onSelectCharacter(target.id)
                          }}
                          className={cn(
                            'group flex flex-col justify-between border border-gold/12 bg-ink/70 p-4 transition-all duration-300',
                            target ? 'cursor-pointer hover:border-gold/45 hover:bg-gold/[0.04]' : '',
                          )}
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="border border-gold/20 px-2 py-0.5 font-inscribed text-[7px] uppercase tracking-[0.16em] text-gold/80">
                                {rel.relation}
                              </span>
                              {target && (
                                <ArrowRight
                                  size={11}
                                  className="text-gold/40 transition-transform group-hover:translate-x-1 group-hover:text-gold"
                                />
                              )}
                            </div>
                            <h4 className="mt-2 font-display text-[15px] text-bone group-hover:text-gold transition-colors">
                              {target ? target.name : rel.targetId}
                            </h4>
                            <p className="mt-1 text-[11px] leading-relaxed text-ash/65">
                              {rel.note}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {activeTab === '3d' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-inscribed text-[9px] uppercase tracking-[0.26em] text-gold/60">
                      Astral 3D Character Stage
                    </h3>
                    <p className="mt-1.5 text-[11.5px] text-ash/70">
                      An interactive 3D WebGL inspection pedestal. Drag to orbit the character’s astral dais, adjust elevation with scroll, and examine celestial Great Rune rings.
                    </p>
                  </div>

                  <Character3DPedestal name={character.name} accent={character.accent} />
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between border-t border-gold/12 bg-ink-raised px-6 py-3">
            <span className="font-inscribed text-[7.5px] uppercase tracking-[0.2em] text-mute">
              The Tarnished Archive · Volume II
            </span>

            <button
              type="button"
              onClick={onClose}
              className="border border-gold/20 px-3 py-1 font-inscribed text-[8px] uppercase tracking-[0.2em] text-gold hover:border-gold hover:bg-gold/10 transition-colors"
            >
              Return to Gallery
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
