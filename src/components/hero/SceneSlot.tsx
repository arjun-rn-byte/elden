import { SplineSlot } from '../../three/SplineSlot'

/**
 * The reserved stage for the Erdtree scene.
 *
 * It is deliberately empty for now: the placeholder artwork behind it is
 * composed around this rectangle, so the moment a Spline scene is configured
 * (`VITE_SPLINE_SCENE_URL`) it fills exactly the space the eye already reads
 * as the centre of the world — and none of the type has to move.
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
      <SplineSlot className="h-full w-full" />
    </div>
  )
}
