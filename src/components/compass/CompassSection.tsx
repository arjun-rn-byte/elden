import { ArrowRight } from 'lucide-react'
import { categories, type CategoryId } from '../../lib/data'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { GatewayCard } from './GatewayCard'

interface CompassSectionProps {
  onSelectCategory: (id: CategoryId) => void
  onBrowseAll: () => void
}

export function CompassSection({ onSelectCategory, onBrowseAll }: CompassSectionProps) {
  return (
    <section id="compass" className="relative py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[94rem] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          numeral="01"
          eyebrow="The Compass"
          title={
            <>
              Four doorways into
              <br />
              the <span className="italic text-gold/90">Lands Between</span>
            </>
          }
          lede={
            <>
              The codex is not arranged as an index but as a country. Choose a wing and the archive
              opens there — every leaf can be entered without a guide.
            </>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-12 lg:mt-16 lg:gap-5">
          <div className="md:col-span-7">
            <GatewayCard
              category={categories[0]}
              index={0}
              onOpen={() => onSelectCategory(categories[0].id)}
            />
          </div>
          <div className="md:col-span-5">
            <GatewayCard
              category={categories[1]}
              index={1}
              onOpen={() => onSelectCategory(categories[1].id)}
            />
          </div>
          <div className="md:col-span-5">
            <GatewayCard
              category={categories[2]}
              index={2}
              onOpen={() => onSelectCategory(categories[2].id)}
            />
          </div>
          <div className="md:col-span-7">
            <GatewayCard
              category={categories[3]}
              index={3}
              onOpen={() => onSelectCategory(categories[3].id)}
            />
          </div>
        </div>

        <Reveal delay={0.1} className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-inscribed text-[9px] uppercase tracking-[0.26em] text-mute">
            Thirteen leaves transcribed · further leaves in the scriptorium
          </p>
          <button
            type="button"
            onClick={onBrowseAll}
            className="group inline-flex items-center gap-3 self-start text-gold/75 transition-colors duration-500 hover:text-gold"
          >
            <span className="font-inscribed text-[9px] uppercase tracking-[0.26em]">
              Browse the whole archive
            </span>
            <ArrowRight
              size={14}
              strokeWidth={1.3}
              className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
            />
          </button>
        </Reveal>
      </div>
    </section>
  )
}
