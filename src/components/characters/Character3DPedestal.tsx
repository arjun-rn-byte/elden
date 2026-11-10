import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { RotateCcw, Box } from 'lucide-react'
import { EmberField } from '../../three/components/EmberField'

const GOLD = '#c6a45a'
const GOLD_BRIGHT = '#f3e5be'

function ModelPedestal({
  rotX,
  rotY,
  zoom,
  accentColor,
}: {
  rotX: number
  rotY: number
  zoom: number
  accentColor: string
}) {
  const root = useRef<THREE.Group>(null)
  const ringGroup = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (root.current) {
      root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, rotX, 0.1)
      root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, rotY, 0.1)
      root.current.position.z = THREE.MathUtils.lerp(root.current.position.z, (zoom - 1) * 2, 0.1)
    }

    if (ringGroup.current) {
      ringGroup.current.rotation.y += delta * 0.4
      ringGroup.current.rotation.z += delta * 0.2
    }

    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 0.8
    }
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} color="#fff" />
      <pointLight position={[0, 2, 0]} intensity={1.0} color={accentColor} distance={8} />

      <group ref={root} position={[0, -0.6, 0]}>
        {/* Stone Pedestal Base */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[2.2, 2.4, 0.35, 48]} />
          <meshStandardMaterial color="#111110" roughness={0.75} metalness={0.2} />
        </mesh>

        {/* Golden Inscribed Pedestal Rim */}
        <mesh position={[0, 0.19, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.05, 2.22, 48]} />
          <meshBasicMaterial color={GOLD} transparent opacity={0.65} side={THREE.DoubleSide} />
        </mesh>

        <mesh position={[0, 0.192, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.5, 1.54, 48]} />
          <meshBasicMaterial color={GOLD} transparent opacity={0.35} side={THREE.DoubleSide} />
        </mesh>

        {/* Rotating Astrorunic Rings */}
        <group ref={ringGroup} position={[0, 1.4, 0]}>
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[1.6, 0.015, 8, 48]} />
            <meshBasicMaterial color={accentColor} transparent opacity={0.6} />
          </mesh>
          <mesh rotation={[-Math.PI / 4, 0, 0]}>
            <torusGeometry args={[1.8, 0.012, 8, 48]} />
            <meshBasicMaterial color={GOLD_BRIGHT} transparent opacity={0.4} />
          </mesh>
        </group>

        {/* 3D Character Hologram Placeholder Monolith */}
        <mesh ref={coreRef} position={[0, 1.4, 0]}>
          <octahedronGeometry args={[0.75]} />
          <meshStandardMaterial
            color={accentColor}
            wireframe
            roughness={0.2}
            metalness={0.8}
            emissive={accentColor}
            emissiveIntensity={0.35}
          />
        </mesh>

        {/* Vertical beacon of grace */}
        <mesh position={[0, 1.6, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 3.2, 8]} />
          <meshBasicMaterial color={GOLD_BRIGHT} transparent opacity={0.5} />
        </mesh>
      </group>

      <EmberField reduced={false} />
    </>
  )
}

export function Character3DPedestal({
  name,
  accent = 'gold',
}: {
  name: string
  accent?: 'gold' | 'crimson' | 'moon' | 'verdant'
}) {
  const [rotX, setRotX] = useState(0.2)
  const [rotY, setRotY] = useState(0)
  const [zoom, setZoom] = useState(1.0)
  const [dragging, setDragging] = useState(false)
  const lastPointer = useRef<{ x: number; y: number } | null>(null)

  const accentColor =
    accent === 'crimson' ? '#c93832' : accent === 'moon' ? '#7b92ab' : accent === 'verdant' ? '#88a368' : GOLD

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

    setRotY((prev) => prev + dx * 0.01)
    setRotX((prev) => Math.max(-0.4, Math.min(0.8, prev + dy * 0.01)))
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    setDragging(false)
    lastPointer.current = null
    ;(e.target as HTMLElement).releasePointerCapture?.(e.pointerId)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    setZoom((prev) => Math.max(0.6, Math.min(1.8, prev - e.deltaY * 0.0015)))
  }

  const resetView = () => {
    setRotX(0.2)
    setRotY(0)
    setZoom(1.0)
  }

  return (
    <div
      className="relative aspect-video w-full touch-none select-none overflow-hidden border border-gold/15 bg-[#060606]"
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
            Initializing 3D Astral Stage…
          </div>
        }
      >
        <Canvas camera={{ position: [0, 1.8, 5.2], fov: 45 }} dpr={[1, 1.7]} gl={{ antialias: true, alpha: true }}>
          <ModelPedestal rotX={rotX} rotY={rotY} zoom={zoom} accentColor={accentColor} />
        </Canvas>
      </Suspense>

      {/* 3D Stage Overlay Header */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-3 sm:p-4">
        <div className="flex items-center gap-2 border border-gold/20 bg-ink/80 px-2.5 py-1 backdrop-blur-sm">
          <Box size={12} className="text-gold" />
          <span className="font-inscribed text-[8px] uppercase tracking-[0.22em] text-gold">
            3D Pedestal · {name}
          </span>
        </div>

        <button
          type="button"
          onClick={resetView}
          title="Reset Orbit"
          className="pointer-events-auto flex h-7 w-7 items-center justify-center border border-gold/15 bg-ink/80 text-ash/70 transition-colors hover:text-gold backdrop-blur-sm"
        >
          <RotateCcw size={12} strokeWidth={1.3} />
        </button>
      </div>

      {/* 3D Stage Overlay Footer */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-gold/10 bg-gradient-to-t from-ink via-ink/80 to-transparent p-3 sm:px-4">
        <p className="font-inscribed text-[7.5px] uppercase tracking-[0.2em] text-ash/60">
          Drag to orbit 360° · Scroll to inspect
        </p>
        <span className="border border-gold/20 px-1.5 py-0.5 font-inscribed text-[7px] uppercase tracking-[0.16em] text-gold/60">
          GLTF Model Slot Reserved
        </span>
      </div>
    </div>
  )
}
