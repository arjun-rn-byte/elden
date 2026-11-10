import { useState } from 'react'
import { ArrowRight, Compass, Info, User, ZoomIn, ZoomOut } from 'lucide-react'
import { characters } from '../../lib/characters'
import { cn } from '../../lib/cn'

interface CharacterFamilyTreeProps {
  onSelectCharacter: (id: string) => void
  selectedId: string | null
}

interface TreeNode {
  id: string
  name: string
  epithet: string
  branch: 'god' | 'golden' | 'carian' | 'empyrean' | 'companion'
  x: number // X coordinate on the 1200x800 canvas
  y: number // Y coordinate
  accent: 'gold' | 'crimson' | 'moon' | 'verdant'
}

const TREE_NODES: TreeNode[] = [
  // Tier 1: Divine Progenitors (Top)
  { id: 'godfrey', name: 'Godfrey', epithet: 'First Elden Lord', branch: 'golden', x: 200, y: 100, accent: 'gold' },
  { id: 'marika', name: 'Queen Marika', epithet: 'The Eternal', branch: 'god', x: 450, y: 100, accent: 'gold' },
  { id: 'radagon', name: 'Radagon', epithet: 'Second Elden Lord', branch: 'god', x: 750, y: 100, accent: 'crimson' },

  // Tier 2: Golden Lineage (Left Branch: Godfrey + Marika)
  { id: 'godwyn', name: 'Godwyn', epithet: 'The Golden', branch: 'golden', x: 140, y: 260, accent: 'gold' },
  { id: 'morgott', name: 'Morgott', epithet: 'The Omen King', branch: 'golden', x: 260, y: 260, accent: 'gold' },
  { id: 'mohg', name: 'Mohg', epithet: 'Lord of Blood', branch: 'golden', x: 380, y: 260, accent: 'crimson' },

  // Tier 2: Carian Royal Lineage (Right Branch: Radagon + Rennala)
  { id: 'radahn', name: 'General Radahn', epithet: 'Starscourge', branch: 'carian', x: 860, y: 260, accent: 'crimson' },
  { id: 'rykard', name: 'Praetor Rykard', epithet: 'Lord of Blasphemy', branch: 'carian', x: 990, y: 260, accent: 'crimson' },
  { id: 'ranni', name: 'Ranni the Witch', epithet: 'The Snow Witch', branch: 'carian', x: 1120, y: 260, accent: 'moon' },

  // Tier 2: Twin Empyreans & Kindling (Center Branch: Marika + Radagon)
  { id: 'melina', name: 'Melina', epithet: 'Kindling Maiden', branch: 'god', x: 520, y: 260, accent: 'gold' },
  { id: 'malenia', name: 'Malenia', epithet: 'Blade of Miquella', branch: 'empyrean', x: 630, y: 260, accent: 'crimson' },
  { id: 'miquella', name: 'Miquella', epithet: 'The Kind', branch: 'empyrean', x: 740, y: 260, accent: 'gold' },

  // Tier 3: Offspring, Descendants & Bound Companions
  { id: 'godrick', name: 'Godrick', epithet: 'The Grafted', branch: 'golden', x: 140, y: 430, accent: 'verdant' },
  { id: 'fia', name: 'Fia', epithet: 'Deathbed Companion', branch: 'companion', x: 260, y: 430, accent: 'moon' },
  { id: 'millicent', name: 'Millicent', epithet: 'Daughter of Rot', branch: 'empyrean', x: 630, y: 430, accent: 'crimson' },
  { id: 'alexander', name: 'Iron Fist Alexander', epithet: 'Warrior Jar', branch: 'companion', x: 860, y: 430, accent: 'gold' },
  { id: 'blaidd', name: 'Blaidd', epithet: 'Shadowbound Beast', branch: 'carian', x: 1120, y: 430, accent: 'moon' },
  { id: 'dung-eater', name: 'Dung Eater', epithet: 'Bearer of the Curse', branch: 'companion', x: 380, y: 430, accent: 'crimson' },
]

interface ConnectionLine {
  from: string
  to: string
  type: 'union' | 'child' | 'bound' | 'descent'
  label?: string
}

const CONNECTIONS: ConnectionLine[] = [
  // Divine Unions
  { from: 'godfrey', to: 'marika', type: 'union', label: 'First Union' },
  { from: 'marika', to: 'radagon', type: 'union', label: 'Radagon is Marika' },

  // Golden Lineage from Godfrey & Marika
  { from: 'godfrey', to: 'godwyn', type: 'child' },
  { from: 'marika', to: 'godwyn', type: 'child' },
  { from: 'godfrey', to: 'morgott', type: 'child' },
  { from: 'marika', to: 'morgott', type: 'child' },
  { from: 'godfrey', to: 'mohg', type: 'child' },
  { from: 'marika', to: 'mohg', type: 'child' },

  // Godwyn descent & ties
  { from: 'godwyn', to: 'godrick', type: 'descent', label: 'Golden Lineage' },
  { from: 'godwyn', to: 'fia', type: 'bound', label: 'Deathbed Pact' },
  { from: 'mohg', to: 'dung-eater', type: 'bound', label: 'Omen Blood' },

  // Marika alone -> Melina
  { from: 'marika', to: 'melina', type: 'child', label: 'Kindling' },

  // Marika & Radagon -> Twin Empyreans
  { from: 'marika', to: 'malenia', type: 'child' },
  { from: 'radagon', to: 'malenia', type: 'child' },
  { from: 'marika', to: 'miquella', type: 'child' },
  { from: 'radagon', to: 'miquella', type: 'child' },
  { from: 'malenia', to: 'millicent', type: 'descent', label: 'Bloom Offshoot' },

  // Radagon & Rennala -> Carian Offspring
  { from: 'radagon', to: 'radahn', type: 'child' },
  { from: 'radagon', to: 'rykard', type: 'child' },
  { from: 'radagon', to: 'ranni', type: 'child' },
  { from: 'radahn', to: 'alexander', type: 'bound', label: 'Festival Bond' },
  { from: 'ranni', to: 'blaidd', type: 'bound', label: 'Shadowbound' },
]

export function CharacterFamilyTree({ onSelectCharacter, selectedId }: CharacterFamilyTreeProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [filterBranch, setFilterBranch] = useState<string>('all')
  const [scale, setScale] = useState<number>(1)

  const activeId = hoveredNode || selectedId
  const activeChar = characters.find((c) => c.id === activeId)

  // Find connected node IDs
  const connectedNodeIds = new Set<string>()
  if (activeId) {
    connectedNodeIds.add(activeId)
    CONNECTIONS.forEach((conn) => {
      if (conn.from === activeId) connectedNodeIds.add(conn.to)
      if (conn.to === activeId) connectedNodeIds.add(conn.from)
    })
  }

  const isHighlighted = (id: string) => {
    if (!activeId) return true
    return connectedNodeIds.has(id)
  }

  const isLineHighlighted = (conn: ConnectionLine) => {
    if (!activeId) return false
    return conn.from === activeId || conn.to === activeId
  }

  const getNodeColor = (accent: 'gold' | 'crimson' | 'moon' | 'verdant') => {
    switch (accent) {
      case 'crimson':
        return '#c93832'
      case 'moon':
        return '#7b92ab'
      case 'verdant':
        return '#88a368'
      case 'gold':
      default:
        return '#c6a45a'
    }
  }

  return (
    <div className="relative border border-gold/15 bg-ink/70">
      {/* Interactive Controls & Branch Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold/10 p-3 sm:px-5">
        <div className="flex items-center gap-2">
          <Compass size={14} className="text-gold/70" />
          <h3 className="font-inscribed text-[9px] uppercase tracking-[0.24em] text-gold">
            Lineage of the Demigods · Interactive Tree
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'All Branches' },
            { id: 'golden', label: 'Golden Lineage' },
            { id: 'carian', label: 'Carian Royalty' },
            { id: 'empyrean', label: 'Twin Empyreans' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterBranch(tab.id)}
              className={cn(
                'border px-2.5 py-1 font-inscribed text-[7.5px] uppercase tracking-[0.16em] transition-colors',
                filterBranch === tab.id
                  ? 'border-gold/40 bg-gold/10 text-gold'
                  : 'border-gold/10 text-ash/60 hover:text-bone',
              )}
            >
              {tab.label}
            </button>
          ))}

          <div className="ml-2 flex items-center border border-gold/15">
            <button
              type="button"
              onClick={() => setScale((s) => Math.min(1.4, s + 0.1))}
              className="px-2 py-1 text-ash/70 hover:text-gold"
              title="Zoom In"
            >
              <ZoomIn size={12} />
            </button>
            <button
              type="button"
              onClick={() => setScale((s) => Math.max(0.7, s - 0.1))}
              className="border-l border-gold/15 px-2 py-1 text-ash/70 hover:text-gold"
              title="Zoom Out"
            >
              <ZoomOut size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* SVG Canvas for Connecting Lines and Nodes */}
      <div className="relative w-full overflow-x-auto overscroll-contain p-2 sm:p-4">
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center', transition: 'transform 0.2s ease-out' }}>
          <svg viewBox="0 0 1260 520" className="w-full min-w-[900px] select-none" fill="none">
            {/* Background Graticule Grid */}
            <defs>
              <pattern id="tree-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#c6a45a" strokeOpacity="0.04" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="1260" height="520" fill="url(#tree-grid)" />

            {/* Connecting Lines */}
            {CONNECTIONS.map((conn, idx) => {
              const fromNode = TREE_NODES.find((n) => n.id === conn.from)
              const toNode = TREE_NODES.find((n) => n.id === conn.to)
              if (!fromNode || !toNode) return null

              const highlighted = isLineHighlighted(conn)
              const dimmed = activeId && !highlighted

              let strokeColor = '#c6a45a'
              let strokeDash: string | undefined = undefined

              if (conn.type === 'union') {
                strokeColor = '#f3e5be'
                strokeDash = '3 3'
              } else if (conn.type === 'bound') {
                strokeColor = '#7b92ab'
                strokeDash = '2 4'
              } else if (conn.type === 'descent') {
                strokeColor = '#a38244'
              }

              // Path computation (Curved bezier for organic lineage feel)
              const midY = (fromNode.y + toNode.y) / 2
              const pathD =
                fromNode.y === toNode.y
                  ? `M ${fromNode.x} ${fromNode.y} L ${toNode.x} ${toNode.y}`
                  : `M ${fromNode.x} ${fromNode.y} C ${fromNode.x} ${midY}, ${toNode.x} ${midY}, ${toNode.x} ${toNode.y}`

              return (
                <g key={`conn-${idx}`}>
                  <path
                    d={pathD}
                    stroke={highlighted ? '#ffd700' : strokeColor}
                    strokeWidth={highlighted ? 2.4 : 1.2}
                    strokeDasharray={strokeDash}
                    strokeOpacity={dimmed ? 0.1 : highlighted ? 1.0 : 0.4}
                    className="transition-all duration-300"
                  />
                  {conn.label && highlighted && (
                    <text
                      x={(fromNode.x + toNode.x) / 2}
                      y={midY - 6}
                      fill="#ffd700"
                      fontSize="9"
                      fontFamily="Cinzel, serif"
                      textAnchor="middle"
                      letterSpacing="1"
                      className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                    >
                      {conn.label}
                    </text>
                  )}
                </g>
              )
            })}

            {/* Tree Nodes */}
            {TREE_NODES.map((node) => {
              const isSelected = node.id === selectedId
              const isHovered = node.id === hoveredNode
              const highlighted = isHighlighted(node.id)
              const dimmed = activeId && !highlighted
              const filtered = filterBranch !== 'all' && node.branch !== filterBranch && node.branch !== 'god'

              const nodeColor = getNodeColor(node.accent)

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className={cn('cursor-pointer transition-all duration-300', filtered ? 'opacity-20' : dimmed ? 'opacity-30' : 'opacity-100')}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => onSelectCharacter(node.id)}
                >
                  {/* Outer Pulsing Halo when active/hovered */}
                  {(isSelected || isHovered) && (
                    <circle cx="0" cy="0" r="32" stroke={nodeColor} strokeWidth="1" strokeDasharray="3 5" className="animate-spin" />
                  )}

                  {/* Node Background Disc */}
                  <circle
                    cx="0"
                    cy="0"
                    r={isSelected ? 26 : isHovered ? 24 : 20}
                    fill="#0a0a09"
                    stroke={isSelected ? '#f3e5be' : nodeColor}
                    strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1.2}
                    className="transition-all duration-300 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                  />

                  {/* Inner Ring */}
                  <circle cx="0" cy="0" r={isSelected ? 18 : 14} fill="none" stroke={nodeColor} strokeOpacity={0.4} strokeWidth="0.8" />

                  {/* Center Rune Pip */}
                  <circle cx="0" cy="0" r="3" fill={isSelected ? '#fff' : nodeColor} />

                  {/* Node Label Card */}
                  <g transform="translate(0, 32)">
                    <rect
                      x="-65"
                      y="-2"
                      width="130"
                      height="26"
                      fill="#0e0d0c"
                      stroke={isSelected ? '#ffd700' : isHovered ? nodeColor : '#c6a45a'}
                      strokeWidth={isSelected || isHovered ? 1 : 0.5}
                      strokeOpacity={isSelected ? 0.9 : 0.3}
                      rx="2"
                    />
                    <text
                      x="0"
                      y="11"
                      fill={isSelected ? '#ffd700' : '#ece5d6'}
                      fontSize="9.5"
                      fontFamily="Cinzel, serif"
                      textAnchor="middle"
                      fontWeight="500"
                    >
                      {node.name}
                    </text>
                    <text
                      x="0"
                      y="21"
                      fill="#a49c8d"
                      fontSize="7"
                      fontFamily="Inter, sans-serif"
                      textAnchor="middle"
                      fontStyle="italic"
                    >
                      {node.epithet}
                    </text>
                  </g>
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      {/* Selected / Hovered Character Relationship Folio Bar */}
      {activeChar ? (
        <div className="flex flex-col gap-3 border-t border-gold/15 bg-ink/90 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/30 bg-gold/[0.06]">
              <User size={18} className="text-gold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-inscribed text-[7.5px] uppercase tracking-[0.2em] text-gold/60">
                  {activeChar.type} · {activeChar.faction}
                </span>
                <span className="h-1 w-1 rounded-full bg-gold/40" />
                <span className="font-display text-[11px] italic text-gold/70">{activeChar.epithet}</span>
              </div>
              <h4 className="font-display text-[1.2rem] text-bone">{activeChar.name}</h4>
              <p className="mt-0.5 max-w-2xl text-[11px] leading-relaxed text-ash/70 line-clamp-1">
                {activeChar.summary}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectCharacter(activeChar.id)}
            className="group inline-flex shrink-0 items-center gap-2 border border-gold/30 bg-gold/[0.08] px-3.5 py-1.5 font-inscribed text-[8px] uppercase tracking-[0.2em] text-gold transition-colors hover:border-gold hover:bg-gold/15"
          >
            <span>Open Profile</span>
            <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between border-t border-gold/10 p-3 sm:px-6 text-[10px] text-mute">
          <span className="flex items-center gap-2">
            <Info size={12} className="text-gold/50" />
            Hover over any demigod node to reveal connecting bonds and bloodlines.
          </span>
          <span className="font-inscribed text-[7.5px] uppercase tracking-[0.2em] text-gold/40">
            Select node to inspect folio
          </span>
        </div>
      )}
    </div>
  )
}
