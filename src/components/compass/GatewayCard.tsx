import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { countByCategory, type Category } from '../../lib/data'
import { EASE } from '../../lib/motion'
import { cn } from '../../lib/cn'
import { ArcaneSigilField } from '../ui/ArcaneSigilField'
import { CornerMarks } from '../ui/Ornament'

interface GatewayCardProps {
  category: Category
  index: number
  className?: string
  onOpen: () => void
}

export function GatewayCard({ category, index, className, onOpen }: GatewayCardProps) {
  const leaves = countByCategory(category.id)

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, ease: EASE, delay: index * 0.07 }}
      className={cn(
        'plate plate-hover group relative flex h-[23rem] w-full flex-col justify-end overflow-hidden p-6 text-left sm:h-[26rem] sm:p-9 lg:h-[27rem]',
        className,
      )}
    >
      {/* engraved medallion, cropped by the corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 h-[17rem] w-[17rem] transition-transform duration-[1800ms] ease-out-expo group-hover:scale-[1.06] sm:h-[20rem] sm:w-[20rem] lg:-right-16 lg:-top-20 lg:h-[19rem] lg:w-[19rem]"
      >
        <ArcaneSigilField
          glyph={category.glyph}
          accent={category.accent}
          glyphOpacity={0.24}
          glyphSize={86}
          className="absolute inset-0"
        />
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-10 right-1 select-none font-display text-[9rem] leading-none text-gold/[0.045]"
      >
        {category.numeral}
      </span>

      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,#0b0b0a_6%,rgba(11,11,10,0.86)_32%,rgba(11,11,10,0.35)_62%,rgba(11,11,10,0.02)_100%)]"
      />

      {/* top line: numeral, wing */}
      <div className="absolute inset-x-6 top-6 flex items-center gap-3 sm:inset-x-9 sm:top-8">
        <span className="font-display text-[1.9rem] italic leading-none text-gold/45">
          {category.numeral}
        </span>
        <span className="h-7 w-px bg-gold/20" aria-hidden />
        <span className="eyebrow pt-0.5">{category.label}</span>
      </div>

      <div className="relative">
        <h3 className="font-display text-[clamp(1.75rem,2.6vw,2.35rem)] leading-none text-bone transition-colors duration-500 group-hover:text-gold-bright">
          {category.title}
        </h3>
        <p className="mt-2.5 font-display text-[15px] italic leading-snug text-gold/65">
          {category.tagline}
        </p>
        <p className="mt-4 max-w-[36ch] text-[12.5px] leading-[1.8] text-ash/70">
          {category.description}
        </p>

        <div className="mt-6 flex items-center gap-3 border-t border-gold/12 pt-4">
          <span className="font-inscribed text-[9px] uppercase tracking-[0.26em] text-gold/70 transition-colors duration-500 group-hover:text-gold">
            Open the wing
          </span>
          <span className="h-px flex-1 bg-gold/15" aria-hidden />
          <span className="font-sans text-[8.5px] uppercase tracking-[0.18em] text-mute">
            {String(leaves).padStart(2, '0')} leaves
          </span>
          <ArrowUpRight
            size={15}
            strokeWidth={1.2}
            className="text-gold/50 transition-all duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
          />
        </div>
      </div>

      <CornerMarks tone="dim" />

      {/* hairline that draws itself across the top on hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-gold/70 to-transparent transition-transform duration-[1200ms] ease-out-expo group-hover:scale-x-100"
      />
    </motion.button>
  )
}
