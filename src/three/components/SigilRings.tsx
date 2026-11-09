import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const GOLD = '#e9c078'

/**
 * An astrolabe of light: nested rings, engraved ticks and a tilted
 * armillary band. Rotates slowly and leans toward the pointer.
 */
export function SigilRings({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null)
  const inner = useRef<THREE.Group>(null)

  const outerTicks = useMemo(
    () =>
      Array.from({ length: 48 }, (_, index) => {
        const angle = (index * (360 / 48) * Math.PI) / 180
        const long = index % 4 === 0
        const radius = 3.02
        return {
          key: index,
          position: [Math.cos(angle) * radius, Math.sin(angle) * radius, 0] as [number, number, number],
          rotation: angle,
          size: long ? 0.2 : 0.1,
          opacity: long ? 0.85 : 0.42,
        }
      }),
    [],
  )

  const runes = useMemo(
    () =>
      Array.from({ length: 8 }, (_, index) => {
        const angle = (index * 45 * Math.PI) / 180
        const radius = 2.58
        return {
          key: index,
          position: [Math.cos(angle) * radius, Math.sin(angle) * radius, 0] as [number, number, number],
        }
      }),
    [],
  )

  useFrame((state, delta) => {
    if (reduced) return
    const g = group.current
    if (!g) return

    g.rotation.z += delta * 0.026
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -0.26 + state.pointer.y * 0.12, 0.025)
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, 0.2 + state.pointer.x * 0.18, 0.025)

    if (inner.current) inner.current.rotation.z -= delta * 0.05
  })

  return (
    <group ref={group} position={[0.8, 0.35, 0]} scale={0.56}>
      {/* faint field of light behind the mechanism */}
      <mesh>
        <circleGeometry args={[3.1, 96]} />
        <meshBasicMaterial
          color={GOLD}
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* primary rings */}
      <mesh>
        <torusGeometry args={[3.02, 0.0042, 8, 260]} />
        <meshBasicMaterial
          color={GOLD}
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh>
        <torusGeometry args={[2.82, 0.003, 8, 240]} />
        <meshBasicMaterial
          color={GOLD}
          transparent
          opacity={0.42}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh>
        <torusGeometry args={[2.16, 0.0036, 8, 200]} />
        <meshBasicMaterial
          color={GOLD}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* tilted armillary band, for depth */}
      <mesh rotation={[1.18, 0.34, 0.2]}>
        <torusGeometry args={[2.72, 0.0026, 8, 220]} />
        <meshBasicMaterial
          color={GOLD}
          transparent
          opacity={0.32}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* engraved ticks */}
      <group>
        {outerTicks.map((tick) => (
          <mesh key={tick.key} position={tick.position} rotation={[0, 0, tick.rotation]}>
            <boxGeometry args={[tick.size, 0.006, 0.004]} />
            <meshBasicMaterial
              color={GOLD}
              transparent
              opacity={tick.opacity}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      <group ref={inner}>
        {runes.map((rune) => (
          <mesh key={rune.key} position={rune.position}>
            <octahedronGeometry args={[0.038]} />
            <meshBasicMaterial
              color={GOLD}
              transparent
              opacity={0.75}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[1.52, 0.0026, 8, 160]} />
          <meshBasicMaterial
            color={GOLD}
            transparent
            opacity={0.24}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  )
}
