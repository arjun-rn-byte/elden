import type { GlyphId } from '../../lib/data'
import {
  CircleDot,
  Crown,
  Eye,
  Flame,
  Gem,
  Moon,
  Orbit,
  Shield,
  Skull,
  Sparkles,
  Star,
  Swords,
  type LucideIcon,
} from 'lucide-react'

const glyphs: Record<GlyphId, LucideIcon> = {
  crown: Crown,
  flame: Flame,
  star: Star,
  eye: Eye,
  swords: Swords,
  orbit: Orbit,
  moon: Moon,
  shield: Shield,
  circle: CircleDot,
  spark: Sparkles,
  gem: Gem,
  skull: Skull,
}

interface GlyphProps {
  id: GlyphId
  size?: number
  strokeWidth?: number
  className?: string
}

export function Glyph({ id, size = 24, strokeWidth = 1, className }: GlyphProps) {
  const Icon = glyphs[id] ?? CircleDot
  return <Icon size={size} strokeWidth={strokeWidth} className={className} aria-hidden />
}
