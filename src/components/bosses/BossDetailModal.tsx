import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Heart,
  Sparkles,
  MapPin,
  Flame,
  Shield,
  ShieldAlert,
  Award,
  Users,
  Swords,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Skull,
  Eye,
  Check,
  Plus,
} from 'lucide-react'
import type { BossEntry } from '../../lib/bosses'
import { BossArtwork } from './BossArtwork'
import { Boss3DArena } from './Boss3DArena'
import { useLockBodyScroll } from '../../hooks/useArchive'

interface BossDetailModalProps {
  boss: BossEntry
  onClose: () => void
  onNavigateBoss: (direction: 'prev' | 'next') => void
  isCompared?: boolean
  onToggleCompare?: (boss: BossEntry) => void
}

type TabType = 'overview' | 'combat' | 'lore' | 'rewards'

export function BossDetailModal({
  boss,
  onClose,
  onNavigateBoss,
  isCompared = false,
  onToggleCompare,
}: BossDetailModalProps) {
  useLockBodyScroll(true)
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Apex Mythic':
        return 'text-[#ff4d4d] border-[#8a1c18] bg-[#2a0806]'
      case 'Legendary':
        return 'text-[#e5a93c] border-[#875f1b] bg-[#281b07]'
      case 'Formidable':
        return 'text-[#c6a45a] border-[#5e4b25] bg-[#1a1409]'
      case 'Field Threat':
        return 'text-[#5d9b68] border-[#294f31] bg-[#0c1c10]'
      case 'Challenging':
      default:
        return 'text-[#9bb1d4] border-[#364b6e] bg-[#0c1421]'
    }
  }

  const getDamageTypeBadge = (type: string) => {
    switch (type) {
      case 'Fire':
        return 'text-[#ff7b54] border-[#8a221e] bg-[#290a08]'
      case 'Bloodflame':
        return 'text-[#ff4d6d] border-[#800f2f] bg-[#2b0910]'
      case 'Scarlet Rot':
        return 'text-[#ff758f] border-[#590d22] bg-[#240610]'
      case 'Holy':
        return 'text-[#ffe49e] border-[#8a6e29] bg-[#292008]'
      case 'Magic':
        return 'text-[#70d6ff] border-[#134074] bg-[#07162c]'
      case 'Lightning':
        return 'text-[#ffd166] border-[#805b10] bg-[#211803]'
      case 'Frenzy':
        return 'text-[#ff9e00] border-[#9e2a2b] bg-[#2e0f00]'
      case 'Death Blight':
        return 'text-[#a2d2ff] border-[#3d405b] bg-[#14151f]'
      default:
        return 'text-[#e0d6cc] border-[#4a3f35] bg-[#1a1612]'
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
        {/* Darkened Atmospheric Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#030202]/92 backdrop-blur-md"
        />

        {/* Modal Sheet */}
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-[#7a221e] bg-[#0a0606] shadow-[0_24px_64px_rgba(0,0,0,0.95),0_0_40px_rgba(201,56,50,0.3)]"
        >
          {/* Top Control Bar */}
          <div className="flex items-center justify-between border-b border-[#2b100f] bg-[#120706] px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="font-inscribed text-[10px] uppercase tracking-[0.24em] text-[#e8c26a]">
                Adversary Archive // No. {boss.id.toUpperCase()}
              </span>
              <span className="hidden rounded border border-[#3b1513] bg-[#1a0c0b] px-2 py-0.5 font-mono text-[10px] text-[#8f756b] sm:inline">
                {boss.category}
              </span>
            </div>

            {/* Actions: Prev / Next / Compare / Close */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigateBoss('prev')}
                title="Previous Boss"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-[#3a1513] text-[#a08a7e] hover:border-[#8c2622] hover:bg-[#260f0e] hover:text-[#f5f0e6]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigateBoss('next')}
                title="Next Boss"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-[#3a1513] text-[#a08a7e] hover:border-[#8c2622] hover:bg-[#260f0e] hover:text-[#f5f0e6]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {onToggleCompare && (
                <button
                  type="button"
                  onClick={() => onToggleCompare(boss)}
                  className={`flex h-8 items-center gap-1.5 rounded-md border px-3 font-inscribed text-[10px] uppercase tracking-wider transition-all ${
                    isCompared
                      ? 'border-[#c6a45a] bg-[#3a280e] text-[#f3e5be]'
                      : 'border-[#3a1513] bg-[#190908] text-[#a08a7e] hover:border-[#8c2622] hover:text-[#f5f0e6]'
                  }`}
                >
                  {isCompared ? <Check className="h-3.5 w-3.5 text-[#e8c26a]" /> : <Plus className="h-3.5 w-3.5" />}
                  <span>{isCompared ? 'In Roster' : 'Compare'}</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                title="Close Dossier"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-[#3a1513] text-[#a08a7e] hover:border-[#8c2622] hover:bg-[#260f0e] hover:text-[#f5f0e6]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Hero Banner Area */}
          <div className="relative border-b border-[#2b100f] bg-gradient-to-r from-[#170908] via-[#0f0707] to-[#170908] px-6 py-5 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-sm border px-2 py-0.5 font-inscribed text-[10px] uppercase tracking-wider ${getDifficultyColor(boss.difficulty)}`}>
                    <Skull className="mr-1 inline h-3 w-3" />
                    {boss.difficulty}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#a08a7e]">
                    <MapPin className="h-3 w-3 text-[#c93832]" />
                    {boss.region} · {boss.location}
                  </span>
                </div>
                <h1 className="mt-1 font-inscribed text-2xl tracking-wide text-[#f5f0e6] sm:text-3xl">
                  {boss.name}
                </h1>
                <p className="font-serif text-sm italic text-[#c6a45a]">
                  &ldquo;{boss.epithet}&rdquo; · {boss.title}
                </p>
              </div>

              {/* Vital Stat Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-lg border border-[#4d1715] bg-[#1a0807] px-3.5 py-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-inscribed uppercase tracking-wider text-[#ff8080]">
                    <Heart className="h-3.5 w-3.5 text-[#ff4d4d]" />
                    <span>Base Vitality</span>
                  </div>
                  <div className="font-mono text-base font-bold text-[#f5f0e6]">
                    {boss.health.baseHp ? `${boss.health.baseHp.toLocaleString()} HP` : 'Unverified HP'}
                  </div>
                </div>

                <div className="rounded-lg border border-[#423315] bg-[#1a1409] px-3.5 py-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-inscribed uppercase tracking-wider text-[#e8c26a]">
                    <Sparkles className="h-3.5 w-3.5 text-[#f3e5be]" />
                    <span>Runes Awarded</span>
                  </div>
                  <div className="font-mono text-base font-bold text-[#f3e5be]">
                    {boss.runes > 0 ? `${boss.runes.toLocaleString()}` : 'Special Trial'}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mt-6 flex flex-wrap gap-2 border-t border-[#260f0e] pt-3">
              {[
                { id: 'overview', label: 'Overview & 3D Dais', icon: Eye },
                { id: 'combat', label: 'Combat & Vulnerabilities', icon: Swords },
                { id: 'lore', label: 'Lore & Chronicle', icon: BookOpen },
                { id: 'rewards', label: 'Rewards & Dropped Relics', icon: Award },
              ].map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 font-inscribed text-xs uppercase tracking-[0.16em] transition-all ${
                      isActive
                        ? 'border border-[#8c2622] bg-[#2b0f0e] text-[#f3e5be] shadow-[0_0_12px_rgba(201,56,50,0.3)]'
                        : 'border border-transparent text-[#947d72] hover:border-[#3b1513] hover:bg-[#140807] hover:text-[#e8c26a]'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Modal Tab Content Area */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* 3D Model Arena Area (Takes prominent center stage - 7 cols) */}
                <div className="lg:col-span-7">
                  <div className="flex flex-col h-[460px] rounded-xl border border-[#3b1513] bg-[#060404] p-2">
                    <Boss3DArena bossName={boss.name} accent={boss.accent} className="flex-1" />
                  </div>
                  <div className="mt-3 flex items-center justify-between rounded-lg border border-[#2b100f] bg-[#120807] px-4 py-2.5 text-xs text-[#a08a7e]">
                    <span className="font-inscribed uppercase tracking-wider text-[#c6a45a]">
                      Encounter Arena:
                    </span>
                    <span className="font-serif italic text-[#f5f0e6]">
                      {boss.location}
                    </span>
                  </div>
                </div>

                {/* Tactical & Atmospheric Summary (5 cols) */}
                <div className="flex flex-col justify-between space-y-5 lg:col-span-5">
                  {/* Quote or Epithet inscription */}
                  {boss.quote && (
                    <div className="rounded-lg border-l-2 border-[#c93832] bg-[#140807] p-4 italic text-[#e0cfc5] shadow-inner">
                      &ldquo;{boss.quote}&rdquo;
                    </div>
                  )}

                  {/* Artwork Preview and Quick Lore */}
                  <div className="rounded-lg border border-[#3b1513] bg-[#110909] p-4">
                    <h3 className="font-inscribed text-xs uppercase tracking-[0.18em] text-[#e8c26a]">
                      Archival Record Summary
                    </h3>
                    <p className="mt-2 font-serif text-sm leading-relaxed text-[#c4b5a8]">
                      {boss.lore}
                    </p>
                  </div>

                  {/* Phase & Health details */}
                  <div className="rounded-lg border border-[#3b1513] bg-[#110909] p-4">
                    <h3 className="font-inscribed text-xs uppercase tracking-[0.18em] text-[#ff8080]">
                      Phase Progression & Vitality Breakdown
                    </h3>
                    <p className="mt-1 font-serif text-xs text-[#a08a7e]">
                      {boss.health.phases || 'Single continuous phase encounter.'}
                    </p>
                    {boss.health.notes && (
                      <p className="mt-2 rounded border border-[#421815] bg-[#1a0a09] p-2 text-[11px] font-mono text-[#d67b7b]">
                        Note: {boss.health.notes}
                      </p>
                    )}
                  </div>

                  {/* Quick Weaknesses pills */}
                  <div className="rounded-lg border border-[#3b1513] bg-[#110909] p-4">
                    <div className="flex items-center gap-1.5 font-inscribed text-xs uppercase tracking-[0.18em] text-[#ff8080]">
                      <Flame className="h-3.5 w-3.5 text-[#ff4d4d]" />
                      <span>Primary Vulnerabilities</span>
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {boss.weaknesses.map((w) => (
                        <span
                          key={w}
                          className="rounded border border-[#661d19] bg-[#240a08] px-2.5 py-1 font-mono text-xs text-[#ff9999]"
                        >
                          {w}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'combat' && (
              <div className="space-y-8">
                {/* Tactical Weakness & Resistance Triad */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {/* Weaknesses */}
                  <div className="rounded-lg border border-[#521c19] bg-[#140807] p-4">
                    <div className="flex items-center gap-2 border-b border-[#3b1513] pb-2 font-inscribed text-xs uppercase tracking-[0.18em] text-[#ff7373]">
                      <Flame className="h-4 w-4 text-[#ff4d4d]" />
                      <span>Weaknesses</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {boss.weaknesses.map((w) => (
                        <span
                          key={w}
                          className="rounded border border-[#6b1e1a] bg-[#240a08] px-2.5 py-1 font-mono text-xs text-[#ff9999]"
                        >
                          {w}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Resistances */}
                  <div className="rounded-lg border border-[#1f304f] bg-[#0b1321] p-4">
                    <div className="flex items-center gap-2 border-b border-[#1b2b45] pb-2 font-inscribed text-xs uppercase tracking-[0.18em] text-[#7ea0d4]">
                      <Shield className="h-4 w-4 text-[#48cae4]" />
                      <span>Resistances</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {boss.resistances.map((r) => (
                        <span
                          key={r}
                          className="rounded border border-[#2b4169] bg-[#121c2e] px-2.5 py-1 font-mono text-xs text-[#a4c1eb]"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Immunities */}
                  <div className="rounded-lg border border-[#3b322a] bg-[#141210] p-4">
                    <div className="flex items-center gap-2 border-b border-[#29231e] pb-2 font-inscribed text-xs uppercase tracking-[0.18em] text-[#c4b5a8]">
                      <ShieldAlert className="h-4 w-4 text-[#e8c26a]" />
                      <span>Immunities</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {boss.immunities.length > 0 ? (
                        boss.immunities.map((im) => (
                          <span
                            key={im}
                            className="rounded border border-[#4d4036] bg-[#1f1b17] px-2.5 py-1 font-mono text-xs text-[#e8ded4]"
                          >
                            {im}
                          </span>
                        ))
                      ) : (
                        <span className="font-serif text-xs italic text-[#7a695d]">
                          No total immunities verified.
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Combat Abilities & Moveset */}
                <div>
                  <h3 className="mb-4 font-inscribed text-sm uppercase tracking-[0.2em] text-[#e8c26a]">
                    Combat Arts & Signature Moveset
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {boss.abilities.map((ability, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg border border-[#3b1513] bg-[#110909] p-4 transition-colors hover:border-[#66201c]"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-inscribed text-sm tracking-wide text-[#f5f0e6]">
                            {ability.name}
                          </h4>
                          <span className={`rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${getDamageTypeBadge(ability.type)}`}>
                            {ability.type}
                          </span>
                        </div>
                        <p className="mt-2 font-serif text-xs leading-relaxed text-[#a8978c]">
                          {ability.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'lore' && (
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Lore Background Narrative */}
                <div className="space-y-6 lg:col-span-7">
                  <div className="rounded-lg border border-[#3b1513] bg-[#110909] p-6">
                    <h3 className="font-inscribed text-sm uppercase tracking-[0.2em] text-[#e8c26a]">
                      Mythos & Archival Chronicle
                    </h3>
                    <p className="mt-3 font-serif text-sm leading-relaxed text-[#c4b5a8]">
                      {boss.background}
                    </p>
                  </div>

                  <div className="rounded-lg border border-[#3b1513] bg-[#110909] p-6">
                    <h3 className="font-inscribed text-sm uppercase tracking-[0.2em] text-[#c93832]">
                      Historical Standing in the Shattering
                    </h3>
                    <p className="mt-3 font-serif text-sm leading-relaxed text-[#c4b5a8]">
                      {boss.lore}
                    </p>
                  </div>
                </div>

                {/* Related Characters & Quests */}
                <div className="space-y-6 lg:col-span-5">
                  <div className="rounded-lg border border-[#3b1513] bg-[#110909] p-5">
                    <div className="flex items-center gap-2 font-inscribed text-xs uppercase tracking-[0.18em] text-[#e8c26a]">
                      <Users className="h-4 w-4" />
                      <span>Related Demigods & Quests</span>
                    </div>

                    <div className="mt-4 space-y-3">
                      {boss.relations.map((relation, idx) => (
                        <div
                          key={idx}
                          className="rounded border border-[#2b100f] bg-[#170a09] p-3 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-inscribed tracking-wide text-[#f5f0e6]">
                              {relation.name}
                            </span>
                            <span className="rounded bg-[#260f0e] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#c6a45a]">
                              {relation.relation}
                            </span>
                          </div>
                          <p className="mt-1 font-serif text-[#a39084]">
                            {relation.note}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-[#3b1513]">
                    <BossArtwork id={boss.id} name={boss.name} accent={boss.accent} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'rewards' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-inscribed text-sm uppercase tracking-[0.2em] text-[#e8c26a]">
                    Spoils of Conquest & Remembrances
                  </h3>
                  <p className="font-serif text-xs text-[#a38c80]">
                    Relics, Great Runes, weapons, and remembrances hewn into the Erdtree upon defeat.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {boss.rewards.map((reward, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col justify-between rounded-lg border border-[#3b1513] bg-[#110909] p-4 transition-all hover:border-[#8c2622]"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="rounded border border-[#523e19] bg-[#1f1709] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#e8c26a]">
                            {reward.type}
                          </span>
                          <Award className="h-4 w-4 text-[#c6a45a]" />
                        </div>
                        <h4 className="mt-2 font-inscribed text-base tracking-wide text-[#f5f0e6]">
                          {reward.name}
                        </h4>
                      </div>

                      {reward.note && (
                        <p className="mt-3 border-t border-[#260f0e] pt-2 font-serif text-xs text-[#9c897d]">
                          {reward.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
