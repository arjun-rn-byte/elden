import { motion, AnimatePresence } from 'framer-motion'
import { Scale, X, ArrowRight, Skull } from 'lucide-react'
import type { BossEntry } from '../../lib/bosses'

interface BossComparisonBarProps {
  selectedBosses: BossEntry[]
  onRemoveBoss: (bossId: string) => void
  onClearAll: () => void
  onOpenComparison: () => void
}

export function BossComparisonBar({
  selectedBosses,
  onRemoveBoss,
  onClearAll,
  onOpenComparison,
}: BossComparisonBarProps) {
  if (selectedBosses.length === 0) return null

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Boss comparison tray"
        className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2"
      >
        <div className="flex items-center gap-3 rounded-xl border border-[#7a221e] bg-[#120706]/95 p-2.5 shadow-[0_16px_36px_rgba(0,0,0,0.85),0_0_24px_rgba(201,56,50,0.35)] backdrop-blur-xl">
          {/* Header indicator */}
          <div className="flex items-center gap-2 pl-2 pr-1">
            <Scale className="h-4 w-4 text-[#e8c26a]" />
            <span className="hidden font-inscribed text-xs uppercase tracking-[0.16em] text-[#f3e5be] sm:inline">
              Comparison Roster ({selectedBosses.length}/4)
            </span>
          </div>

          {/* Selected boss chips */}
          <div className="flex items-center gap-2">
            {selectedBosses.map((boss) => (
              <div
                key={boss.id}
                className="group flex items-center gap-1.5 rounded-lg border border-[#4d1a17] bg-[#1c0c0b] py-1 pl-2.5 pr-1.5 text-xs text-[#f5f0e6]"
              >
                <Skull className="h-3 w-3 text-[#c93832]" />
                <span className="max-w-[100px] truncate font-serif text-[11px] sm:max-w-[140px]">
                  {boss.name}
                </span>
                <button
                  type="button"
                  onClick={() => onRemoveBoss(boss.id)}
                  aria-label={`Remove ${boss.name} from comparison`}
                  className="rounded p-0.5 text-[#8f756b] transition-colors hover:bg-[#361311] hover:text-[#ff4d4d]"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Clear & Compare buttons */}
          <div className="flex items-center gap-2 border-l border-[#3a1513] pl-3">
            <button
              type="button"
              onClick={onClearAll}
              className="px-2 py-1 font-inscribed text-[10px] uppercase tracking-wider text-[#a08a7e] hover:text-[#f3e5be]"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={onOpenComparison}
              disabled={selectedBosses.length < 2}
              className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 font-inscribed text-xs uppercase tracking-[0.16em] transition-all ${
                selectedBosses.length >= 2
                  ? 'border border-[#e8c26a] bg-gradient-to-r from-[#8c2622] to-[#b32b25] text-[#fdfcf9] shadow-[0_0_16px_rgba(201,56,50,0.5)] hover:brightness-110'
                  : 'cursor-not-allowed border border-[#3b1c19] bg-[#1f0f0e] text-[#6b554e]'
              }`}
            >
              <span>Compare</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  )
}
