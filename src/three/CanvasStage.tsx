import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import { sceneConfig } from './config'
import { SigilFallback } from './SigilFallback'

const HeroSanctum = lazy(() => import('./scenes/HeroSanctum'))

/**
 * Mounts the R3F scene, suspends the render loop when the hero leaves the
 * viewport, and holds a drawn sigil until WebGL is ready.
 */
export default function CanvasStage() {
  const reduced = useReducedMotion() ?? false
  const host = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 160)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const element = host.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([record]) => setInView(Boolean(record?.isIntersecting)),
      { threshold: 0 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={host} className="relative h-full w-full">
      {ready ? (
        <Suspense fallback={<SigilFallback />}>
          <Canvas
            className="!absolute inset-0"
            dpr={sceneConfig.dpr}
            camera={{ position: sceneConfig.camera.position, fov: sceneConfig.camera.fov }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            frameloop={inView ? 'always' : 'never'}
          >
            <HeroSanctum reduced={reduced} />
          </Canvas>
        </Suspense>
      ) : (
        <SigilFallback />
      )}
    </div>
  )
}
