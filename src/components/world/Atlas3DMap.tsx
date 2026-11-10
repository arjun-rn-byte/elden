import { Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { AtlasRegion, StratumId } from '../../lib/regions'
import { stratumOf } from '../../lib/regions'
import { EmberField } from '../../three/components/EmberField'
import { Maximize2, RotateCcw } from 'lucide-react'

const GOLD = '#c6a45a'
const GOLD_BRIGHT = '#f3e5be'
const CRIMSON = '#9a3d36'
const MOON = '#8798bd'

interface Atlas3DMapProps {
  stratum: StratumId
  regions: AtlasRegion[]
  selectedId: string | null
  onSelect: (id: string) => void
}

/** 3D Interactive Pin representing a region on the cartographic astrolabe */
function RegionPin({
  region,
  active,
  onSelect,
}: {
  region: AtlasRegion
  active: boolean
  onSelect: (id: string) => void
}) {
  const [hovered, setHovered] = useState(false)
  const pinRef = useRef<THREE.Group>(null)

  // Map 0-100% coordinates to 3D X/Z plane (disc radius ~ 5 units)
  const posX = ((region.x - 50) / 50) * 4.2
  const posZ = ((region.y - 50) / 50) * 3.4

  const pinColor = region.accent === 'crimson' ? CRIMSON : region.accent === 'moon' ? MOON : GOLD

  useFrame((_, delta) => {
    if (!pinRef.current) return
    if (active) {
      pinRef.current.rotation.y += delta * 1.6
    } else if (hovered) {
      pinRef.current.rotation.y += delta * 3.0
    }
  })

  return (
    <group position={[posX, 0.05, posZ]}>
      {/* Ground beacon / base ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[active ? 0.22 : 0.12, active ? 0.32 : 0.18, 24]} />
        <meshBasicMaterial
          color={active ? GOLD_BRIGHT : pinColor}
          transparent
          opacity={active ? 0.9 : hovered ? 0.7 : 0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Vertical light stem */}
      <mesh position={[0, active ? 0.45 : 0.28, 0]}>
        <cylinderGeometry args={[0.015, 0.015, active ? 0.9 : 0.56, 8]} />
        <meshBasicMaterial
          color={active ? GOLD_BRIGHT : pinColor}
          transparent
          opacity={active ? 0.95 : 0.5}
        />
      </mesh>

      {/* Floating interactive marker gem */}
      <group
        ref={pinRef}
        position={[0, active ? 0.95 : 0.62, 0]}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(region.id)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'default'
        }}
      >
        <mesh scale={active ? 1.4 : hovered ? 1.25 : 1}>
          <octahedronGeometry args={[0.14]} />
          <meshBasicMaterial
            color={active ? GOLD_BRIGHT : hovered ? '#fff' : pinColor}
            wireframe={!active && !hovered}
          />
        </mesh>

        {active ? (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.26, 0.015, 8, 32]} />
            <meshBasicMaterial
              color={GOLD_BRIGHT}
              transparent
              opacity={0.8}
            />
          </mesh>
        ) : null}
      </group>

      {/* Label billboard on hover / active */}
      {(hovered || active) ? (
        <group position={[0, active ? 1.35 : 1.0, 0]}>
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[1.5, 0.32]} />
            <meshBasicMaterial color="#090909" transparent opacity={0.88} />
          </mesh>
        </group>
      ) : null}
    </group>
  )
}

/** Astrolabe Cartographic Plate 3D model */
function AstrolabePlate({
  regions,
  selectedId,
  onSelect,
}: {
  regions: AtlasRegion[]
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  const plateGroup = useRef<THREE.Group>(null)

  // Subtle coordinate grid rings and radials
  const rings = useMemo(() => [1.5, 2.8, 4.0, 4.9], [])
  const radials = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => (i * Math.PI) / 6)
  }, [])

  return (
    <group ref={plateGroup} position={[0, -0.2, 0]}>
      {/* Dark stone surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[5.2, 64]} />
        <meshStandardMaterial
          color="#0c0d0d"
          roughness={0.85}
          metalness={0.2}
        />
      </mesh>

      {/* Outer bronze boundary ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[5.1, 5.24, 64]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
        <ringGeometry args={[4.88, 4.92, 64]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.22} side={THREE.DoubleSide} />
      </mesh>

      {/* Concentric survey circles */}
      {rings.map((r, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
          <ringGeometry args={[r, r + 0.018, 64]} />
          <meshBasicMaterial color={GOLD} transparent opacity={0.12} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Radial longitude lines */}
      {radials.map((angle, i) => (
        <group key={i} rotation={[0, angle, 0]} position={[0, 0.008, 0]}>
          <mesh position={[2.5, 0, 0]}>
            <boxGeometry args={[4.8, 0.004, 0.01]} />
            <meshBasicMaterial color={GOLD} transparent opacity={0.08} />
          </mesh>
        </group>
      ))}

      {/* 3D Region markers */}
      {regions.map((region) => (
        <RegionPin
          key={region.id}
          region={region}
          active={region.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </group>
  )
}

/** The 3D Scene root with user orbit controls via drag */
function SceneContent({
  regions,
  selectedId,
  onSelect,
  rotX,
  rotY,
  zoom,
}: {
  regions: AtlasRegion[]
  selectedId: string | null
  onSelect: (id: string) => void
  rotX: number
  rotY: number
  zoom: number
}) {
  const sceneRoot = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!sceneRoot.current) return
    sceneRoot.current.rotation.x = THREE.MathUtils.lerp(sceneRoot.current.rotation.x, rotX, 0.1)
    sceneRoot.current.rotation.y = THREE.MathUtils.lerp(sceneRoot.current.rotation.y, rotY, 0.1)
    sceneRoot.current.position.z = THREE.MathUtils.lerp(sceneRoot.current.position.z, (zoom - 1) * 3, 0.1)
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 4]} intensity={1.1} color="#fbf4dd" />
      <pointLight position={[0, 3, 0]} intensity={0.8} color="#c6a45a" distance={10} />

      <group ref={sceneRoot}>
        <AstrolabePlate regions={regions} selectedId={selectedId} onSelect={onSelect} />
      </group>

      <EmberField reduced={false} />
    </>
  )
}

export function Atlas3DMap({ stratum, regions, selectedId, onSelect }: Atlas3DMapProps) {
  const [rotX, setRotX] = useState(0.85) // Slight isometric downward tilt
  const [rotY, setRotY] = useState(0)
  const [zoom, setZoom] = useState(1.0)
  const [dragging, setDragging] = useState(false)
  const lastPointer = useRef<{ x: number; y: number } | null>(null)

  const plate = stratumOf(stratum)
  const selectedRegion = regions.find((r) => r.id === selectedId)

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return
    setDragging(true)
    lastPointer.current = { x: e.clientX, y: e.clientY }
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging || !lastPointer.current) return
    const dx = e.clientX - lastPointer.current.x
    const dy = e.clientY - lastPointer.current.y
    lastPointer.current = { x: e.clientX, y: e.clientY }

    setRotY((prev) => prev + dx * 0.008)
    setRotX((prev) => Math.max(0.3, Math.min(1.4, prev + dy * 0.008)))
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    setDragging(false)
    lastPointer.current = null
    ;(e.target as HTMLElement).releasePointerCapture?.(e.pointerId)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    setZoom((prev) => Math.max(0.7, Math.min(2.0, prev - e.deltaY * 0.0015)))
  }

  const resetView = () => {
    setRotX(0.85)
    setRotY(0)
    setZoom(1.0)
  }

  return (
    <div
      className="relative aspect-[4/3] w-full touch-none select-none overflow-hidden border border-gold/15 bg-[#050606]"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      style={{ cursor: dragging ? 'grabbing' : 'grab' }}
    >
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center font-inscribed text-[9px] uppercase tracking-[0.24em] text-gold/60">
            Constructing 3D Survey Astrolabe…
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 4.8, 6.2], fov: 42 }}
          dpr={[1, 1.7]}
          gl={{ antialias: true, alpha: true }}
        >
          <SceneContent
            regions={regions}
            selectedId={selectedId}
            onSelect={onSelect}
            rotX={rotX}
            rotY={rotY}
            zoom={zoom}
          />
        </Canvas>
      </Suspense>

      {/* 3D Model HUD Chrome */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 border border-gold/15 bg-ink/80 px-2.5 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
            <p className="font-inscribed text-[8px] uppercase tracking-[0.24em] text-gold">
              3D Astrolabe · {plate.label}
            </p>
          </div>

          <div className="pointer-events-auto flex items-center gap-1 border border-gold/15 bg-ink/80 p-1 backdrop-blur-sm">
            <button
              type="button"
              onClick={resetView}
              title="Reset 3D Orientation"
              aria-label="Reset 3D Orientation"
              className="flex h-7 w-7 items-center justify-center text-ash/70 transition-colors hover:text-gold"
            >
              <RotateCcw size={12} strokeWidth={1.3} />
            </button>
            <button
              type="button"
              onClick={() => setZoom(1.0)}
              title="Default Scale"
              aria-label="Default Scale"
              className="flex h-7 w-7 items-center justify-center text-ash/70 transition-colors hover:text-gold"
            >
              <Maximize2 size={12} strokeWidth={1.3} />
            </button>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <p className="font-inscribed text-[7.5px] uppercase tracking-[0.2em] text-ash/50">
            Drag to orbit · Scroll to elevate · Click beacon to select
          </p>

          {selectedRegion ? (
            <div className="border border-gold/30 bg-ink/90 px-3 py-1.5 text-right backdrop-blur-sm">
              <span className="font-inscribed text-[7.5px] uppercase tracking-[0.22em] text-gold/60">
                Selected Coordinates
              </span>
              <p className="font-display text-[13px] text-bone">
                {selectedRegion.ref} · {selectedRegion.name}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
