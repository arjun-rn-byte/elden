import { Interlude } from '../interlude/Interlude'
import { LedgerSection } from '../ledger/LedgerSection'

/** Lore: the quote band and the chronicle of the three ages. */
export function LoreSection() {
  return (
    <section id="lore" className="relative">
      <Interlude />
      <LedgerSection />
    </section>
  )
}
