import { useMemo } from 'react'
import type { Accent, GlyphId } from '../../lib/data'
import { cn } from '../../lib/cn'
import { Glyph } from './Glyph'

const accents: Record<Accent, { line: string; glow: string; glyph: string }> = {
  gold: { line: '#c6a45a', glow: 'rgba(198,164,90,0.16)', glyph: '#e0c78c' },
  crimson: { line: '#9a3d36', glow: 'rgba(124,38,34,0.17)', glyph: '#c07a70' },
  moon: { line: '#8798bd', glow: 'rgba(126,147,184,0.15)', glyph: '#a9b8d6' },
  verdant: { line: '#8a9862', glow: 'rgba(125,138,90,0.14)', glyph: '#aab68a' },
}

const C = 200

/**
 * The artwork system of the archive: engraved rings, ticks and spokes
 * surrounding a single heraldic glyph. No raster imagery — everything
 * is drawn, so it stays crisp and weighs nothing.
 */
export function ArcaneSigilField({
  glyph,
  accent = 'gold',
  className,
  glyphOpacity = 0.18,
  glyphSize = 112,
}: {
  glyph: GlyphId
  accent?: Accent
  className?: string
  glyphOpacity?: number
  glyphSize?: number
}) {
  const tone = accents[accent]
  // Callers usually place the field themselves (absolute inset-0, etc.),
  // so only fall back to `relative` when no positioning utility is given.
  const positioned = /(^|\s)(absolute|fixed|sticky)(\s|$)/.test(className ?? '')

  const ticks = useMemo(
    () =>
      Array.from({ length: 72 }, (_, index) => {
        const angle = (index * 5 * Math.PI) / 180
        const long = index % 6 === 0
        const inner = long ? 146 : 151
        const outer = 160
        return {
          key: index,
          x1: C + Math.cos(angle) * inner,
          y1: C + Math.sin(angle) * inner,
          x2: C + Math.cos(angle) * outer,
          y2: C + Math.sin(angle) * outer,
          width: long ? 1 : 0.6,
          opacity: long ? 0.7 : 0.32,
        }
      }),
    [],
  )

  const spokes = useMemo(
    () =>
      Array.from({ length: 8 }, (_, index) => {
        const angle = (index * 45 * Math.PI) / 180
        return {
          key: index,
          x1: C + Math.cos(angle) * 76,
          y1: C + Math.sin(angle) * 76,
          x2: C + Math.cos(angle) * 111,
          y2: C + Math.sin(angle) * 111,
        }
      }),
    [],
  )

  return (
    <div
      className={cn(
        'pointer-events-none overflow-hidden',
        positioned ? '' : 'relative',
        className,
      )}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(58% 58% at 50% 46%, ${tone.glow} 0%, rgba(9,9,9,0) 68%)`,
        }}
      />

      <svg
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        <g style={{ transformOrigin: '200px 200px' }} className="animate-slow-spin-reverse">
          {ticks.map((tick) => (
            <line
              key={tick.key}
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
              stroke={tone.line}
              strokeWidth={tick.width}
              strokeOpacity={tick.opacity}
            />
          ))}
        </g>

        <circle cx={C} cy={C} r="146" stroke={tone.line} strokeOpacity="0.22" strokeWidth="0.8" />
        <circle
          cx={C}
          cy={C}
          r="136"
          stroke={tone.line}
          strokeOpacity="0.3"
          strokeWidth="0.7"
          strokeDasharray="1 7"
          style={{ transformOrigin: '200px 200px' }}
          className="animate-slow-spin"
        />
        <circle cx={C} cy={C} r="112" stroke={tone.line} strokeOpacity="0.18" strokeWidth="0.8" />
        <circle cx={C} cy={C} r="76" stroke={tone.line} strokeOpacity="0.22" strokeWidth="0.8" />

        <g stroke={tone.line} strokeWidth="0.7" strokeOpacity="0.16">
          {spokes.map((spoke) => (
            <line key={spoke.key} x1={spoke.x1} y1={spoke.y1} x2={spoke.x2} y2={spoke.y2} />
          ))}
        </g>

        {/* broken outer arc — the ring never quite closes */}
        <circle
          cx={C}
          cy={C}
          r="160"
          stroke={tone.line}
          strokeOpacity="0.34"
          strokeWidth="1.6"
          strokeDasharray="58 190"
          strokeLinecap="round"
          style={{ transformOrigin: '200px 200px' }}
          className="animate-slow-spin"
        />

        <rect
          x="104"
          y="104"
          width="192"
          height="192"
          stroke={tone.line}
          strokeOpacity="0.14"
          strokeWidth="0.8"
          transform="rotate(45 200 200)"
        />

        <g fill={tone.line} fillOpacity="0.5">
          <circle cx="200" cy="88" r="1.6" />
          <circle cx="200" cy="312" r="1.6" />
          <circle cx="88" cy="200" r="1.6" />
          <circle cx="312" cy="200" r="1.6" />
        </g>
      </svg>

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: glyphOpacity, color: tone.glyph }}
      >
        <Glyph id={glyph} size={glyphSize} strokeWidth={0.55} />
      </div>
    </div>
  )
}
