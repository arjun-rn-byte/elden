import { useState, useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Flame, Skull, MapPin, SlidersHorizontal, RotateCcw } from 'lucide-react'
import {
  bosses,
  bossCategories,
  bossRegions,
  type BossCategory,
  type BossEntry,
} from '../lib/bosses'
import { BossCard } from '../components/bosses/BossCard'
import { BossDetailModal } from '../components/bosses/BossDetailModal'
import { BossComparisonBar } from '../components/bosses/BossComparisonBar'
import { BossComparisonModal } from '../components/bosses/BossComparisonModal'

type SortOption = 'default' | 'hp-desc' | 'hp-asc' | 'runes-desc' | 'name-asc'

export function BossesPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions')
  const [sortOption, setSortOption] = useState<SortOption>('default')

  // Selected boss for full detail modal (derived from URL query parameter "?boss=<id>")
  const activeBossId = searchParams.get('boss')
  const activeBoss = useMemo(
    () => bosses.find((b) => b.id === activeBossId) ?? null,
    [activeBossId],
  )

  // Selected bosses for comparison (max 4)
  const [comparedBosses, setComparedBosses] = useState<BossEntry[]>([])
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false)

  const openBossModal = useCallback((boss: BossEntry) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('boss', boss.id)
      return next
    })
  }, [setSearchParams])

  const closeBossModal = useCallback(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.delete('boss')
      return next
    })
  }, [setSearchParams])

  const navigateBossModal = useCallback((direction: 'prev' | 'next') => {
    if (!activeBoss) return
    const currentIndex = bosses.findIndex((b) => b.id === activeBoss.id)
    if (currentIndex === -1) return
    const nextIndex =
      direction === 'next'
        ? (currentIndex + 1) % bosses.length
        : (currentIndex - 1 + bosses.length) % bosses.length
    const nextBoss = bosses[nextIndex]
    openBossModal(nextBoss)
  }, [activeBoss, openBossModal])

  // Comparison toggle
  const toggleCompare = useCallback((boss: BossEntry) => {
    setComparedBosses((prev) => {
      const exists = prev.some((b) => b.id === boss.id)
      if (exists) {
        return prev.filter((b) => b.id !== boss.id)
      }
      if (prev.length >= 4) {
        // Replace oldest or cap at 4
        return [...prev.slice(1), boss]
      }
      return [...prev, boss]
    })
  }, [])

  const removeComparedBoss = useCallback((bossId: string) => {
    setComparedBosses((prev) => prev.filter((b) => b.id !== bossId))
  }, [])

  const clearComparedBosses = useCallback(() => {
    setComparedBosses([])
  }, [])

  // Filter & sort bosses
  const filteredBosses = useMemo(() => {
    const q = query.trim().toLowerCase()

    const list = bosses.filter((boss) => {
      // Category filter
      if (selectedCategory !== 'All' && boss.category !== selectedCategory) {
        return false
      }

      // Region filter
      if (selectedRegion !== 'All Regions' && boss.region !== selectedRegion) {
        return false
      }

      // Search query
      if (q) {
        const matchesName = boss.name.toLowerCase().includes(q)
        const matchesTitle = boss.title.toLowerCase().includes(q)
        const matchesEpithet = boss.epithet.toLowerCase().includes(q)
        const matchesLocation = boss.location.toLowerCase().includes(q)
        const matchesWeakness = boss.weaknesses.some((w) => w.toLowerCase().includes(q))
        const matchesReward = boss.rewards.some((r) => r.name.toLowerCase().includes(q))
        return (
          matchesName ||
          matchesTitle ||
          matchesEpithet ||
          matchesLocation ||
          matchesWeakness ||
          matchesReward
        )
      }

      return true
    })

    // Sort
    switch (sortOption) {
      case 'hp-desc':
        return list.slice().sort((a, b) => (b.health.baseHp || 0) - (a.health.baseHp || 0))
      case 'hp-asc':
        return list.slice().sort((a, b) => (a.health.baseHp || 0) - (b.health.baseHp || 0))
      case 'runes-desc':
        return list.slice().sort((a, b) => b.runes - a.runes)
      case 'name-asc':
        return list.slice().sort((a, b) => a.name.localeCompare(b.name))
      default:
        return list
    }
  }, [query, selectedCategory, selectedRegion, sortOption])

  return (
    <div className="relative min-h-screen bg-[#070404] pb-28 pt-20 text-[#e0d6cc]">
      {/* Background Ambience & Runes */}
      <div className="pointer-events-none fixed inset-0 bg-radial-vignette opacity-80" />
      <div
        className="pointer-events-none fixed inset-0 opacity-25"
        style={{
          background:
            'radial-gradient(circle at 50% 15%, rgba(140, 38, 34, 0.25) 0%, transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Hero Masthead */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7a221e]/70 bg-[#140706]/90 px-4 py-1.5 shadow-[0_0_20px_rgba(201,56,50,0.2)] backdrop-blur-md">
            <Flame className="h-4 w-4 text-[#ff4d4d]" />
            <span className="font-inscribed text-xs uppercase tracking-[0.22em] text-[#e8c26a]">
              Volume III · The Great Foes & Demigods
            </span>
          </div>

          <h1 className="mt-4 font-inscribed text-3xl uppercase tracking-[0.14em] text-[#f5f0e6] sm:text-5xl md:text-6xl">
            Boss Archive
          </h1>

          <p className="mx-auto mt-4 max-w-2xl font-serif text-base leading-relaxed text-[#ab978a] sm:text-lg">
            A comprehensive compendium of the lords, demigods, and fell horrors that command the
            Lands Between and the Realm of Shadow. Inspect verified vitality, exploit elemental
            vulnerabilities, and study mythic combat movesets.
          </p>

          <div className="mt-5 flex items-center justify-center gap-6 font-mono text-xs text-[#8c7468]">
            <span className="flex items-center gap-1.5">
              <Skull className="h-3.5 w-3.5 text-[#c93832]" />
              {bosses.length} Recorded Adversaries
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#c6a45a]" />
              {bossRegions.length - 1} Territories
            </span>
          </div>
        </header>

        {/* Search & Filter Bar Controls */}
        <section aria-label="Boss filters and search" className="mb-10 space-y-4">
          <div className="flex flex-col gap-4 rounded-xl border border-[#3b1513] bg-[#0f0707]/90 p-4 shadow-xl backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
            {/* Live Search Input */}
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8c7468]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by boss name, title, weapon weakness, location, reward..."
                className="w-full rounded-lg border border-[#301311] bg-[#170a09] py-2.5 pl-10 pr-4 font-serif text-sm text-[#f5f0e6] placeholder-[#6b584f] transition-all focus:border-[#8c2622] focus:outline-none focus:ring-1 focus:ring-[#8c2622]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8c7468] hover:text-[#f5f0e6]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Region Dropdown Filter */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-inscribed uppercase tracking-wider text-[#8c7468]">
                Region:
              </span>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="rounded-lg border border-[#301311] bg-[#170a09] px-3 py-2 font-serif text-xs text-[#e0cfc5] focus:border-[#8c2622] focus:outline-none"
              >
                {bossRegions.map((region) => (
                  <option key={region} value={region} className="bg-[#140807] text-[#e0cfc5]">
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[11px] font-inscribed uppercase tracking-wider text-[#8c7468]">
                <SlidersHorizontal className="h-3 w-3" />
                Sort:
              </span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="rounded-lg border border-[#301311] bg-[#170a09] px-3 py-2 font-serif text-xs text-[#e0cfc5] focus:border-[#8c2622] focus:outline-none"
              >
                <option value="default" className="bg-[#140807]">Default Canonical</option>
                <option value="hp-desc" className="bg-[#140807]">Vitality (Highest HP)</option>
                <option value="hp-asc" className="bg-[#140807]">Vitality (Lowest HP)</option>
                <option value="runes-desc" className="bg-[#140807]">Runes Awarded</option>
                <option value="name-asc" className="bg-[#140807]">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-[#2b100f] pb-3">
            <span className="mr-2 text-[11px] font-inscribed uppercase tracking-[0.18em] text-[#8c7468]">
              Category:
            </span>
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className={`rounded-md px-3 py-1.5 font-inscribed text-xs uppercase tracking-[0.16em] transition-all ${
                selectedCategory === 'All'
                  ? 'border border-[#8c2622] bg-[#290a08] text-[#f3e5be] shadow-[0_0_12px_rgba(201,56,50,0.3)]'
                  : 'border border-[#2e1311] bg-[#120706] text-[#8c7468] hover:border-[#4d1a17] hover:text-[#d4c3b6]'
              }`}
            >
              All Categories ({bosses.length})
            </button>

            {bossCategories.map((category) => {
              const count = bosses.filter((b) => b.category === category).length
              const isActive = selectedCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category as BossCategory)}
                  className={`rounded-md px-3 py-1.5 font-inscribed text-xs uppercase tracking-[0.16em] transition-all ${
                    isActive
                      ? 'border border-[#8c2622] bg-[#290a08] text-[#f3e5be] shadow-[0_0_12px_rgba(201,56,50,0.3)]'
                      : 'border border-[#2e1311] bg-[#120706] text-[#8c7468] hover:border-[#4d1a17] hover:text-[#d4c3b6]'
                  }`}
                >
                  {category} ({count})
                </button>
              )
            })}
          </div>
        </section>

        {/* Gallery Results Count & Active Filters Indicator */}
        <div className="mb-6 flex items-center justify-between text-xs text-[#8c7468]">
          <span>
            Displaying <strong className="font-mono text-[#f5f0e6]">{filteredBosses.length}</strong>{' '}
            of {bosses.length} adversaries
          </span>

          {(selectedCategory !== 'All' || selectedRegion !== 'All Regions' || query) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All')
                setSelectedRegion('All Regions')
                setQuery('')
              }}
              className="flex items-center gap-1 font-inscribed uppercase tracking-wider text-[#c93832] hover:text-[#ff5c57]"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Boss Gallery Grid */}
        {filteredBosses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBosses.map((boss) => (
              <BossCard
                key={boss.id}
                boss={boss}
                onSelect={openBossModal}
                isCompared={comparedBosses.some((b) => b.id === boss.id)}
                onToggleCompare={toggleCompare}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="rounded-xl border border-[#3b1513] bg-[#120706] p-12 text-center">
            <Skull className="mx-auto h-12 w-12 text-[#6b201c]" />
            <h3 className="mt-4 font-inscribed text-lg uppercase tracking-wider text-[#f5f0e6]">
              No Adversaries Uncovered
            </h3>
            <p className="mx-auto mt-2 max-w-md font-serif text-sm text-[#8c7468]">
              No boss entries correspond with your search query &ldquo;{query}&rdquo; or filter
              parameters. Try searching by element (e.g. &ldquo;Fire&rdquo; or &ldquo;Frostbite&rdquo;)
              or reset filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All')
                setSelectedRegion('All Regions')
                setQuery('')
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[#8c2622] bg-[#290a08] px-4 py-2 font-inscribed text-xs uppercase tracking-[0.16em] text-[#f3e5be] hover:brightness-110"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Persistent Floating Comparison Tray */}
      <BossComparisonBar
        selectedBosses={comparedBosses}
        onRemoveBoss={removeComparedBoss}
        onClearAll={clearComparedBosses}
        onOpenComparison={() => setComparisonModalOpen(true)}
      />

      {/* Comparison Matrix Modal */}
      {comparisonModalOpen && comparedBosses.length >= 2 && (
        <BossComparisonModal
          bosses={comparedBosses}
          onClose={() => setComparisonModalOpen(false)}
          onInspectBoss={(boss) => {
            setComparisonModalOpen(false)
            openBossModal(boss)
          }}
          onRemoveBoss={removeComparedBoss}
        />
      )}

      {/* Dedicated Boss Profile Dossier Modal */}
      {activeBoss && (
        <BossDetailModal
          key={activeBoss.id}
          boss={activeBoss}
          onClose={closeBossModal}
          onNavigateBoss={navigateBossModal}
          isCompared={comparedBosses.some((b) => b.id === activeBoss.id)}
          onToggleCompare={toggleCompare}
        />
      )}
    </div>
  )
}
