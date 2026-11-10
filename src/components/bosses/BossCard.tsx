import { motion } from 'framer-motion'
import { Skull, MapPin, Heart, Check, Plus, Flame } from 'lucide-react'
import type { BossEntry } from '../../lib/bosses'
import { BossArtwork } from './BossArtwork'

interface BossCardProps {
  boss: BossEntry
  onSelect: (boss: BossEntry) => void
  isCompared?: boolean
  onToggleCompare?: (boss: BossEntry) => void
}

export function BossCard({
  boss,
  onSelect,
  isCompared = false,
  onToggleCompare,
}: BossCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Apex Mythic':
        return 'text-[#ff4d4d] border-[#8a1c18] bg-[#2a0806]/80'
      case 'Legendary':
        return 'text-[#e5a93c] border-[#875f1b] bg-[#281b07]/80'
      case 'Formidable':
        return 'text-[#c6a45a] border-[#5e4b25] bg-[#1a1409]/80'
      case 'Field Threat':
        return 'text-[#5d9b68] border-[#294f31] bg-[#0c1c10]/80'
      case 'Challenging':
      default:
        return 'text-[#9bb1d4] border-[#364b6e] bg-[#0c1421]/80'
    }
  }

  return (
    <motion.article
      layout="position"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-[#3b1210]/60 bg-[#0d0909] text-left transition-all duration-300 hover:border-[#8c2622] hover:shadow-[0_12px_32px_rgba(140,38,34,0.22),0_0_1px_1px_rgba(201,56,50,0.3)]"
    >
      {/* Clickable Image Area */}
      <button
        type="button"
        onClick={() => onSelect(boss)}
        className="relative block w-full text-left focus:outline-none"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <BossArtwork id={boss.id} name={boss.name} accent={boss.accent} />

          {/* Difficulty Badge (Top Left) */}
          <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-[10px] font-mono tracking-wider backdrop-blur-md">
            <span className={`inline-flex items-center gap-1 font-inscribed uppercase ${getDifficultyColor(boss.difficulty)}`}>
              <Skull className="h-3 w-3" />
              {boss.difficulty}
            </span>
          </div>

          {/* Category Pill (Top Right) */}
          <div className="absolute right-3 top-3 z-10">
            <span className="inline-block rounded-sm border border-[#c6a45a]/30 bg-[#140e08]/85 px-2 py-0.5 font-inscribed text-[9px] uppercase tracking-[0.16em] text-[#e8c26a] backdrop-blur-md">
              {boss.category}
            </span>
          </div>

          {/* Health Pill (Bottom Left over Image) */}
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 rounded-sm border border-[#4a1412] bg-[#140706]/90 px-2.5 py-1 text-xs backdrop-blur-md">
            <Heart className="h-3.5 w-3.5 text-[#ff4d4d]" />
            <span className="font-mono text-[11px] font-semibold text-[#f5f0e6]">
              {boss.health.baseHp ? `${boss.health.baseHp.toLocaleString()} HP` : 'HP Unverified'}
            </span>
          </div>
        </div>
      </button>

      {/* Compare Toggle Button */}
      {onToggleCompare && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onToggleCompare(boss)
          }}
          title={isCompared ? 'Remove from Comparison' : 'Add to Comparison'}
          className={`absolute right-3 top-[52%] z-20 flex h-7 items-center gap-1.5 rounded-sm border px-2 text-[10px] font-inscribed uppercase tracking-wider backdrop-blur-md transition-all duration-200 ${
            isCompared
              ? 'border-[#c6a45a] bg-[#3a280e] text-[#f3e5be] shadow-[0_0_12px_rgba(198,164,90,0.4)]'
              : 'border-[#401a18]/80 bg-[#120706]/90 text-[#a08a7e] hover:border-[#8c2622] hover:text-[#f3e5be]'
          }`}
        >
          {isCompared ? (
            <>
              <Check className="h-3.5 w-3.5 text-[#e8c26a]" />
              <span>Comparing</span>
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" />
              <span>Compare</span>
            </>
          )}
        </button>
      )}

      {/* Boss Details Content Area */}
      <div className="flex flex-1 flex-col justify-between p-4 pt-3.5">
        <div>
          {/* Epithet & Region */}
          <div className="flex items-center justify-between text-[11px] text-[#8f7a70]">
            <span className="font-serif italic text-[#c6a45a]/90">{boss.epithet}</span>
            <span className="flex items-center gap-1 text-[10px] font-inscribed uppercase tracking-wider text-[#735e55]">
              <MapPin className="h-3 w-3 text-[#8c2622]" />
              {boss.region}
            </span>
          </div>

          {/* Boss Title / Name */}
          <button
            type="button"
            onClick={() => onSelect(boss)}
            className="group/btn mt-1 block text-left"
          >
            <h3 className="font-inscribed text-base tracking-[0.06em] text-[#f5f0e6] transition-colors group-hover/btn:text-[#e8c26a]">
              {boss.name}
            </h3>
          </button>

          {/* Location details */}
          <p className="mt-1 line-clamp-1 text-xs text-[#a09085]">
            {boss.location}
          </p>

          {/* Weakness Preview Chips */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-inscribed uppercase tracking-wider text-[#634e44]">
              Weak to:
            </span>
            {boss.weaknesses.slice(0, 3).map((w) => (
              <span
                key={w}
                className="inline-flex items-center gap-0.5 rounded-sm border border-[#521d1b]/70 bg-[#1a0908] px-1.5 py-0.5 text-[9px] font-mono text-[#ff8080]"
              >
                <Flame className="h-2.5 w-2.5 text-[#ff4d4d]" />
                {w}
              </span>
            ))}
            {boss.weaknesses.length > 3 && (
              <span className="text-[9px] font-mono text-[#78645a]">
                +{boss.weaknesses.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Action Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-[#260f0e] pt-3">
          <div className="font-mono text-[11px] text-[#c6a45a]">
            {boss.runes > 0 ? `${boss.runes.toLocaleString()} Runes` : 'Special Trial'}
          </div>

          <button
            type="button"
            onClick={() => onSelect(boss)}
            className="flex items-center gap-1 font-inscribed text-[11px] uppercase tracking-[0.16em] text-[#c93832] transition-colors hover:text-[#ff5c57]"
          >
            <span>Dossier</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </motion.article>
  )
}
