import { EmberField } from '../components/EmberField'
import { SigilRings } from '../components/SigilRings'

/**
 * The default hero scene: drifting gold dust behind a slowly turning
 * astrolabe. Add further objects here — a ruined arch, a distant tree,
 * a Spline scene mounted as a drei primitive — without touching the page.
 */
export default function HeroSanctum({ reduced }: { reduced: boolean }) {
  return (
    <>
      <EmberField reduced={reduced} />
      <SigilRings reduced={reduced} />
    </>
  )
}
