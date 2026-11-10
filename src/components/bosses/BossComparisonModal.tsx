import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Scale, Heart, Sparkles, Shield, AlertTriangle, ShieldAlert, Award, ExternalLink } from 'lucide-react'
import type { BossEntry } from '../../lib/bosses'
import { BossArtwork } from './BossArtwork'
import { useLockBodyScroll } from '../../hooks/useArchive'

interface BossComparisonModalProps {
  bosses: BossEntry[]
  onClose: () => void
  onInspectBoss: (boss: BossEntry) => void
  onRemoveBoss: (bossId: string) => void
}

export function BossComparisonModal({
  bosses,
  onClose,
  onInspectBoss,
  onRemoveBoss,
}: BossComparisonModalProps) {
  useLockBodyScroll(true)

  const maxHp = useMemo(() => {
    return Math.max(...bosses.map((b) => b.health.baseHp || 0), 1)
  }, [bosses])

  const maxRunes = useMemo(() => {
    return Math.max(...bosses.map((b) => b.runes || 0), 1)
  }, [bosses])

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#040303]/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-[#7a221e] bg-[#0c0707] shadow-[0_24px_64px_rgba(0,0,0,0.95),0_0_36px_rgba(201,56,50,0.25)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#2d1110] bg-[#140807] px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#8a221e]/60 bg-[#240a08] text-[#e8c26a]">
                <Scale className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-inscribed text-base uppercase tracking-[0.18em] text-[#f5f0e6]">
                  Adversary Comparative Analysis
                </h2>
                <p className="font-serif text-xs text-[#a38c80]">
                  Comparative tactical metrics, health pools, weaknesses, and rewards
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-[#401a18] text-[#a08a7e] transition-colors hover:border-[#8c2622] hover:bg-[#260f0e] hover:text-[#f5f0e6]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Matrix Body (Horizontal Scrollable Grid) */}
          <div className="flex-1 overflow-x-auto overflow-y-auto p-6">
            <div
              className="grid gap-6"
              style={{
                gridTemplateColumns: `repeat(${bosses.length}, minmax(280px, 1fr))`,
              }}
            >
              {bosses.map((boss) => {
                const hpPercent = boss.health.baseHp ? (boss.health.baseHp / maxHp) * 100 : 0
                const runesPercent = boss.runes ? (boss.runes / maxRunes) * 100 : 0

                return (
                  <div
                    key={boss.id}
                    className="flex flex-col rounded-lg border border-[#3b1513] bg-[#110909] p-4 shadow-inner"
                  >
                    {/* Boss Card Mini Header */}
                    <div className="relative mb-3 flex items-start gap-3">
                      <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded border border-[#521c19]">
                        <BossArtwork id={boss.id} name={boss.name} accent={boss.accent} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-inscribed text-[10px] uppercase tracking-wider text-[#e8c26a]">
                            {boss.category}
                          </span>
                          {bosses.length > 2 && (
                            <button
                              type="button"
                              onClick={() => onRemoveBoss(boss.id)}
                              title="Remove from comparison"
                              className="text-[#786157] hover:text-[#ff4d4d]"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                        <h3 className="font-inscribed text-sm leading-snug tracking-wider text-[#f5f0e6]">
                          {boss.name}
                        </h3>
                        <p className="mt-0.5 font-serif text-[11px] italic text-[#a08a7e]">
                          {boss.epithet}
                        </p>
                        <span className="mt-1 inline-block rounded border border-[#5c1c19] bg-[#210908] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#ff7373]">
                          {boss.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Quick Profile Action */}
                    <button
                      type="button"
                      onClick={() => {
                        onClose()
                        onInspectBoss(boss)
                      }}
                      className="mb-4 flex items-center justify-center gap-1.5 rounded border border-[#4d1f1c] bg-[#1f0d0c] py-1.5 text-center font-inscribed text-[10px] uppercase tracking-[0.16em] text-[#e8c26a] transition-colors hover:border-[#8c2622] hover:bg-[#2e1311]"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>View Full Profile</span>
                    </button>

                    {/* Stat Bars: Health Pool */}
                    <div className="mb-4 rounded border border-[#2e1311] bg-[#170a09] p-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1 font-inscribed text-[10px] uppercase tracking-wider text-[#b39e8f]">
                          <Heart className="h-3.5 w-3.5 text-[#ff4d4d]" />
                          Base Vitality
                        </span>
                        <span className="font-mono text-[11px] font-bold text-[#ff6666]">
                          {boss.health.baseHp ? `${boss.health.baseHp.toLocaleString()} HP` : 'Placeholder'}
                        </span>
                      </div>
                      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#260f0e]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#941b17] to-[#e63946] transition-all duration-500"
                          style={{ width: `${Math.max(hpPercent, 6)}%` }}
                        />
                      </div>
                      {boss.health.phases && (
                        <p className="mt-1 text-[10px] font-serif italic text-[#8c766b]">
                          {boss.health.phases}
                        </p>
                      )}
                    </div>

                    {/* Stat Bars: Runes */}
                    <div className="mb-4 rounded border border-[#2e1311] bg-[#170a09] p-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1 font-inscribed text-[10px] uppercase tracking-wider text-[#b39e8f]">
                          <Sparkles className="h-3.5 w-3.5 text-[#e8c26a]" />
                          Runes Bestowed
                        </span>
                        <span className="font-mono text-[11px] font-bold text-[#e8c26a]">
                          {boss.runes > 0 ? `${boss.runes.toLocaleString()}` : '0'}
                        </span>
                      </div>
                      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#260f0e]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#99762a] to-[#f3e5be] transition-all duration-500"
                          style={{ width: `${Math.max(runesPercent, 4)}%` }}
                        />
                      </div>
                    </div>

                    {/* Weaknesses Section */}
                    <div className="mb-3 border-t border-[#260f0e] pt-3">
                      <div className="flex items-center gap-1.5 text-[10px] font-inscribed uppercase tracking-wider text-[#ff7373]">
                        <AlertTriangle className="h-3 w-3" />
                        <span>Vulnerabilities / Weaknesses</span>
                      </div>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {boss.weaknesses.map((w) => (
                          <span
                            key={w}
                            className="rounded border border-[#6b1e1a] bg-[#240a08] px-2 py-0.5 font-mono text-[10px] text-[#ff9999]"
                          >
                            {w}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Resistances Section */}
                    <div className="mb-3 border-t border-[#260f0e] pt-3">
                      <div className="flex items-center gap-1.5 text-[10px] font-inscribed uppercase tracking-wider text-[#7ea0d4]">
                        <Shield className="h-3 w-3" />
                        <span>Resistances</span>
                      </div>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {boss.resistances.map((r) => (
                          <span
                            key={r}
                            className="rounded border border-[#1f2f4a] bg-[#0c1421] px-2 py-0.5 font-mono text-[10px] text-[#a4c1eb]"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Immunities Section */}
                    <div className="mb-3 border-t border-[#260f0e] pt-3">
                      <div className="flex items-center gap-1.5 text-[10px] font-inscribed uppercase tracking-wider text-[#99877b]">
                        <ShieldAlert className="h-3 w-3" />
                        <span>Immunities</span>
                      </div>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {boss.immunities.length > 0 ? (
                          boss.immunities.map((im) => (
                            <span
                              key={im}
                              className="rounded border border-[#3b322a] bg-[#1a1613] px-2 py-0.5 font-mono text-[10px] text-[#d6c7b8]"
                            >
                              {im}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] font-serif italic text-[#736357]">
                            None verified
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Key Rewards Section */}
                    <div className="mt-auto border-t border-[#260f0e] pt-3">
                      <div className="flex items-center gap-1.5 text-[10px] font-inscribed uppercase tracking-wider text-[#e8c26a]">
                        <Award className="h-3 w-3" />
                        <span>Noteworthy Rewards</span>
                      </div>
                      <ul className="mt-1.5 space-y-1">
                        {boss.rewards.slice(0, 3).map((reward, i) => (
                          <li
                            key={i}
                            className="flex items-center justify-between text-[11px] text-[#d4c3b6]"
                          >
                            <span className="truncate">{reward.name}</span>
                            <span className="rounded bg-[#21180d] px-1 font-mono text-[9px] text-[#c6a45a]">
                              {reward.type}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
