import { Suspense, lazy } from 'react'
import { cn } from '../lib/cn'
import { sceneConfig } from './config'
import { SigilFallback } from './SigilFallback'
import { SplineSlot } from './SplineSlot'

/**
 * The WebGL layer is code-split: three.js and R3F are only fetched once the
 * hero asks for them, so the first paint stays light.
 */
const CanvasStage = lazy(() => import('./CanvasStage'))

export function SceneStage({ className }: { className?: string }) {
  if (sceneConfig.engine === 'still') {
    return <SigilFallback className={className} />
  }

  if (sceneConfig.engine === 'spline') {
    return <SplineSlot className={className} />
  }

  return (
    <div className={cn('relative h-full w-full', className)} aria-hidden>
      <Suspense fallback={<SigilFallback />}>
        <CanvasStage />
      </Suspense>
    </div>
  )
}
