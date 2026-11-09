import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ArcaneSigilField } from '../components/ui/ArcaneSigilField'

export function NotFoundPage() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden px-5 pb-24 pt-40 sm:px-8 lg:px-12">
      <ArcaneSigilField
        glyph="eye"
        accent="gold"
        glyphOpacity={0.04}
        glyphSize={190}
        className="pointer-events-none absolute -right-20 top-24 h-[34rem] w-[34rem] opacity-50"
      />
      <div className="relative mx-auto w-full max-w-[94rem]">
        <p className="font-inscribed text-[9px] uppercase tracking-[0.3em] text-gold/60">Leaf not found</p>
        <h1 className="mt-6 max-w-[22ch] font-display text-[clamp(2.6rem,6vw,4.6rem)] font-light leading-[0.98] text-bone">
          The page you sought is <span className="italic text-gold/85">sealed</span>.
        </h1>
        <p className="mt-6 max-w-[34rem] text-[13.5px] leading-[1.95] text-ash/70">
          Either the path was mistranscribed, or this leaf has not been written yet. The archive does
          not invent what it has not read.
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-3 border border-gold/30 px-6 py-3 font-inscribed text-[9px] uppercase tracking-[0.26em] text-gold/80 transition-colors duration-500 hover:border-gold/60 hover:text-gold"
        >
          <ArrowLeft size={12} strokeWidth={1.4} />
          Return to the archive
        </Link>
      </div>
    </section>
  )
}
