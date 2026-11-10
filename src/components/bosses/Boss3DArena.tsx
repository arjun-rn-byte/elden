import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { RotateCcw, ZoomIn, ZoomOut, Play, Pause, Flame, ShieldAlert } from 'lucide-react'
import { EmberField } from '../../three/components/EmberField'

const CRIMSON = '#c93832'
const CRIMSON_GLOW = '#ff4d4d'
const GOLD = '#c6a45a'
const GOLD_GLOW = '#f3e5be'

interface BossArenaSceneProps {
  rotX: number
  rotY: number
  zoom: number
  autoRotate: boolean
  bossName: string
  accent: 'crimson' | 'gold' | 'moon' | 'verdant'
}

function BossArenaScene({
  rotX,
  rotY,
  zoom,
  autoRotate,
  accent,
}: BossArenaSceneProps) {
  const root = useRef<THREE.Group>(null)
  const ring1 = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)
  const ring3 = useRef<THREE.Mesh>(null)
  const coreGroup = useRef<THREE.Group>(null)
  const beaconRef = useRef<THREE.Mesh>(null)
  const autoY = useRef(0)

  const primaryColor =
    accent === 'gold' ? GOLD : accent === 'moon' ? '#48cae4' : accent === 'verdant' ? '#596b43' : CRIMSON
  const glowColor =
    accent === 'gold' ? GOLD_GLOW : accent === 'moon' ? '#9bb1d4' : accent === 'verdant' ? '#88a368' : CRIMSON_GLOW

  useFrame((_, delta) => {
    if (autoRotate) {
      autoY.current += delta * 0.4
    }

    if (root.current) {
      root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, rotX, 0.08)
      root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, rotY + autoY.current, 0.08)
      root.current.position.z = THREE.MathUtils.lerp(root.current.position.z, (zoom - 1) * 2.5, 0.08)
    }

    if (ring1.current) ring1.current.rotation.z += delta * 0.35
    if (ring2.current) ring2.current.rotation.z -= delta * 0.25
    if (ring3.current) {
      ring3.current.rotation.x += delta * 0.4
      ring3.current.rotation.y += delta * 0.2
    }

    if (coreGroup.current) {
      coreGroup.current.rotation.y -= delta * 0.6
      coreGroup.current.position.y = 1.3 + Math.sin(autoY.current * 2) * 0.08
    }

    if (beaconRef.current) {
      const mat = beaconRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.25 + Math.sin(autoY.current * 3) * 0.1
    }
  })

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 4]} intensity={1.5} color="#fff" />
      <directionalLight position={[-5, -4, -4]} intensity={0.4} color={primaryColor} />
      <pointLight position={[0, 2.5, 0]} intensity={2.0} color={glowColor} distance={10} />

      <group ref={root} position={[0, -0.6, 0]}>
        {/* Tier 1: Dark Obsidian Arena Base */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[2.8, 3.1, 0.3, 48]} />
          <meshStandardMaterial color="#0c0908" roughness={0.8} metalness={0.3} />
        </mesh>

        {/* Tier 2: Raised Inner Dais */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[2.2, 2.4, 0.18, 48]} />
          <meshStandardMaterial color="#140d0c" roughness={0.7} metalness={0.4} />
        </mesh>

        {/* Outermost Outer Runic Containment Ring */}
        <mesh position={[0, 0.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.5, 2.65, 64]} />
          <meshBasicMaterial color={primaryColor} transparent opacity={0.65} side={THREE.DoubleSide} />
        </mesh>

        {/* Mid Blood/Gold Engraved Inscription Ring */}
        <mesh ref={ring1} position={[0, 0.325, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.9, 2.05, 48]} />
          <meshBasicMaterial color={GOLD} transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>

        {/* Inner Counter-Rotating Hexagram Ring */}
        <mesh ref={ring2} position={[0, 0.33, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.3, 1.42, 6]} />
          <meshBasicMaterial color={primaryColor} transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>

        {/* Vertical Concentric Summoning Beacon of Light */}
        <mesh ref={beaconRef} position={[0, 2.2, 0]}>
          <cylinderGeometry args={[0.35, 0.75, 4.2, 24, 1, true]} />
          <meshBasicMaterial
            color={glowColor}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Central Boss Core Armature (Floating above the dais) */}
        <group ref={coreGroup} position={[0, 1.3, 0]}>
          {/* Outer Rotating Runic Gyro-Cage */}
          <mesh ref={ring3}>
            <torusGeometry args={[1.05, 0.02, 16, 64]} />
            <meshBasicMaterial color={primaryColor} transparent opacity={0.8} />
          </mesh>

          {/* Secondary Gyro Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.9, 0.015, 12, 48]} />
            <meshBasicMaterial color={GOLD} transparent opacity={0.6} />
          </mesh>

          {/* Central Prismatic Boss Soul Shard (Icosahedron / Octahedron) */}
          <mesh>
            <octahedronGeometry args={[0.55, 0]} />
            <meshStandardMaterial
              color="#1a0b0a"
              emissive={primaryColor}
              emissiveIntensity={1.2}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>

          {/* Inner Pulsing Core */}
          <mesh>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshBasicMaterial color={glowColor} />
          </mesh>
        </group>
      </group>
    </>
  )
}

interface Boss3DArenaProps {
  bossName: string
  accent?: 'crimson' | 'gold' | 'moon' | 'verdant'
  className?: string
}

export function Boss3DArena({
  bossName,
  accent = 'crimson',
  className = '',
}: Boss3DArenaProps) {
  const [rotX, setRotX] = useState(0.25)
  const [rotY, setRotY] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [autoRotate, setAutoRotate] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0, rotX: 0.25, rotY: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setAutoRotate(false)
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      rotX,
      rotY,
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const dx = e.clientX - dragStart.current.x
    const dy = e.clientY - dragStart.current.y
    setRotY(dragStart.current.rotY + dx * 0.008)
    const nextX = dragStart.current.rotX + dy * 0.008
    setRotX(Math.max(-0.4, Math.min(0.8, nextX)))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    setZoom((prev) => Math.max(0.65, Math.min(1.7, prev - e.deltaY * 0.001)))
  }

  const resetView = () => {
    setRotX(0.25)
    setRotY(0)
    setZoom(1)
    setAutoRotate(true)
  }

  return (
    <div
      className={`relative h-full w-full select-none overflow-hidden rounded-lg border border-[#3b1210]/60 bg-[#060404] ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* 3D WebGL Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 2.2, 5.8], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <EmberField reduced={false} />
            <BossArenaScene
              rotX={rotX}
              rotY={rotY}
              zoom={zoom}
              autoRotate={autoRotate}
              bossName={bossName}
              accent={accent}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Atmospheric Vignette Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-radial-vignette opacity-80" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060404] via-transparent to-[#060404]/80" />

      {/* Header Overlay & Spatial Coordinates */}
      <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded border border-[#8c221e]/50 bg-[#170808]/90 text-crimson">
          <Flame className="h-4 w-4 animate-pulse text-[#e63946]" />
        </div>
        <div>
          <span className="block font-inscribed text-[10px] uppercase tracking-[0.22em] text-[#e8c26a]">
            Summoning Arena · Spatial Projection
          </span>
          <span className="block font-serif text-xs text-[#a09085]">
            Target: <span className="text-[#f5f0e6]">{bossName}</span>
          </span>
        </div>
      </div>

      {/* Model Spec Badge */}
      <div className="pointer-events-none absolute right-4 top-4 hidden items-center gap-2 rounded border border-[#c6a45a]/25 bg-[#120d08]/80 px-2.5 py-1 text-[10px] font-mono tracking-wider text-[#c6a45a] sm:flex">
        <ShieldAlert className="h-3 w-3 text-[#e63946]" />
        <span>GLTF / R3F PEDESTAL RESERVED</span>
      </div>

      {/* Bottom Hint */}
      <div className="pointer-events-none absolute bottom-4 left-4 text-[11px] font-inscribed uppercase tracking-[0.18em] text-[#78665c]">
        <span>Drag to rotate 360° · Scroll to zoom</span>
      </div>

      {/* Interactive Controls Overlay */}
      <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-md border border-[#401a18]/70 bg-[#120807]/90 p-1 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setZoom((z) => Math.min(1.7, z + 0.15))}
          title="Zoom In"
          className="flex h-7 w-7 items-center justify-center rounded text-[#b39e8f] transition-colors hover:bg-[#2e1311] hover:text-[#f3e5be]"
        >
          <ZoomIn className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setZoom((z) => Math.max(0.65, z - 0.15))}
          title="Zoom Out"
          className="flex h-7 w-7 items-center justify-center rounded text-[#b39e8f] transition-colors hover:bg-[#2e1311] hover:text-[#f3e5be]"
        >
          <ZoomOut className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setAutoRotate((r) => !r)}
          title={autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
          className="flex h-7 w-7 items-center justify-center rounded text-[#b39e8f] transition-colors hover:bg-[#2e1311] hover:text-[#f3e5be]"
        >
          {autoRotate ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        </button>
        <button
          type="button"
          onClick={resetView}
          title="Reset Camera"
          className="flex h-7 w-7 items-center justify-center rounded text-[#b39e8f] transition-colors hover:bg-[#2e1311] hover:text-[#f3e5be]"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
