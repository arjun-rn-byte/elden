import { cn } from '../lib/cn'
import { sceneConfig } from './config'

/**
 * Mount point for the Spline Erdtree.
 *
 * To turn this on:
 *   1. npm i @splinetool/react-spline @splinetool/runtime
 *   2. replace the body below with:
 *
 *        const Spline = lazy(() => import('@splinetool/react-spline'))
 *
 *        return (
 *          <div className={cn('relative h-full w-full', className)}>
 *            <Suspense fallback={null}>
 *              <Spline scene={sceneConfig.splineUrl} className="h-full w-full" />
 *            </Suspense>
 *          </div>
 *        )
 *
 *   3. set VITE_SPLINE_SCENE_URL=https://prod.spline.design/<scene>/scene.splinecode
 *
 * Until then the slot stays empty — the hero's placeholder art already holds
 * the composition, so nothing looks broken while the scene is in production.
 */
export function SplineSlot({ className }: { className?: string }) {
  if (!sceneConfig.splineUrl) return null

  return (
    <div
      data-spline-pending={sceneConfig.splineUrl}
      className={cn('relative h-full w-full', className)}
      aria-hidden
    />
  )
}
