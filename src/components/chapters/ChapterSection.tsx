import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'

interface ChapterSectionProps {
  id: string
  numeral: string
  eyebrow: string
  title: ReactNode
  lede: ReactNode
  chapter?: string
  children: ReactNode
}

export function ChapterSection({
  id,
  numeral,
  eyebrow,
  title,
  lede,
  chapter,
  children,
}: ChapterSectionProps) {
  return (
    <section id={id} className="relative py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[94rem] px-5 sm:px-8 lg:px-12">
        <SectionHeading numeral={numeral} eyebrow={eyebrow} title={title} lede={lede} />
        <div className="mt-12 lg:mt-16">{children}</div>

        {chapter ? (
          <div className="mt-10 flex justify-end border-t border-gold/10 pt-6">
            <Link
              to={`/${chapter}`}
              className="group inline-flex items-center gap-3 font-inscribed text-[9px] uppercase tracking-[0.26em] text-ash/60 transition-colors duration-500 hover:text-gold"
            >
              Open the {eyebrow.toLowerCase()} chapter
              <ArrowRight
                size={13}
                strokeWidth={1.3}
                className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
              />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}
