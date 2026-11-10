import { SceneStage } from '../../three/SceneStage'

/**
 * The reserved stage for the Erdtree scene.
 *
 * Renders the Three.js HeroSanctum astrolabe rings and drifting golden dust,
 * or switches to Spline when configured.
 *
 * Dimensions: 76rem × 62vh at the vertical 42% line, i.e. the optical centre
 * of the hero, sitting above the CTA.
 */
export function SceneSlot() {
  return (
    <div
      data-scene-stage="erdtree"
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-[42%] -z-10 h-[58vh] w-[min(72rem,88vw)] -translate-x-1/2 -translate-y-1/2 sm:h-[62vh]"
    >
      <SceneStage className="h-full w-full" />
    </div>
  )
}
