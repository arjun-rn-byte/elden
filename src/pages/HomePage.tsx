import { Hero } from '../components/hero/Hero'
import { WorldSection } from '../components/world/WorldSection'
import { ChapterSection } from '../components/chapters/ChapterSection'
import { EntryPlate } from '../components/chapters/EntryPlate'
import { EntryRow } from '../components/chapters/EntryRow'
import { LoreSection } from '../components/lore/LoreSection'
import { Reveal } from '../components/ui/Reveal'
import { entries } from '../lib/data'

const byChapter = (id: string) => entries.filter((entry) => entry.category === id)

export function HomePage() {
  const characters = byChapter('characters')
  const bosses = byChapter('bosses')
  const weapons = byChapter('weapons')
  const items = byChapter('items')

  return (
    <>
      <Hero />
      <WorldSection />

      <ChapterSection
        id="characters"
        numeral="II"
        eyebrow="Characters"
        chapter="characters"
        title={
          <>
            Those who
            <br />
            <span className="italic text-gold/90">remain</span>
          </>
        }
        lede={
          <>
            Demigods, queens and apostates — and the Tarnished who inherited their unfinished
            argument.
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {characters.map((entry, index) => (
            <Reveal key={entry.id} delay={index * 0.06} className="h-full">
              <EntryPlate entry={entry} />
            </Reveal>
          ))}
        </div>
      </ChapterSection>

      <ChapterSection
        id="bosses"
        numeral="III"
        eyebrow="Bosses"
        chapter="bosses"
        title={
          <>
            What waits
            <br />
            at the <span className="italic text-gold/90">end</span>
          </>
        }
        lede={
          <>
            Not every door is a door. Some are a trial with a name, standing between you and the next
            word of the story.
          </>
        }
      >
        <div className="-mt-6">
          {bosses.map((entry) => (
            <EntryRow key={entry.id} entry={entry} />
          ))}
        </div>
      </ChapterSection>

      <ChapterSection
        id="weapons"
        numeral="IV"
        eyebrow="Weapons"
        chapter="weapons"
        title={
          <>
            What the hand
            <br />
            <span className="italic text-gold/90">remembers</span>
          </>
        }
        lede={
          <>
            Blades that carry moonlight, blood or a dead god’s grievance. Each one an argument you can
            hold.
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {weapons.map((entry, index) => (
            <Reveal key={entry.id} delay={index * 0.06} className="h-full">
              <EntryPlate entry={entry} />
            </Reveal>
          ))}
        </div>
      </ChapterSection>

      <LoreSection />

      <ChapterSection
        id="items"
        numeral="VI"
        eyebrow="Items"
        chapter="items"
        title={
          <>
            What was
            <br />
            left <span className="italic text-gold/90">behind</span>
          </>
        }
        lede={
          <>
            Seeds, tears, ashes and tokens. The things that keep a Tarnished walking one more road
            than they should.
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((entry, index) => (
            <Reveal key={entry.id} delay={index * 0.06} className="h-full">
              <EntryPlate entry={entry} variant="compact" />
            </Reveal>
          ))}
        </div>
      </ChapterSection>
    </>
  )
}
