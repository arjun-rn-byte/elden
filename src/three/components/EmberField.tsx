import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { sceneConfig } from '../config'

/** Small deterministic PRNG — keeps the ember field stable between renders. */
function mulberry32(seed: number) {
  let state = seed
  return () => {
    state |= 0
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uHeight;

  attribute float aScale;
  attribute float aPhase;
  attribute float aSpeed;

  varying float vTwinkle;
  varying float vDepth;

  void main() {
    vec3 transformed = position;

    // Slow upward drift, wrapped so the field never empties.
    transformed.y = mod(transformed.y + uTime * aSpeed, uHeight) - uHeight * 0.5;
    transformed.x += sin(uTime * 0.24 + aPhase) * 0.32;
    transformed.z += cos(uTime * 0.17 + aPhase * 1.4) * 0.22;

    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);

    gl_PointSize = aScale * uPixelRatio * (52.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

    vTwinkle = 0.28 + 0.72 * abs(sin(uTime * 0.45 + aPhase));
    vDepth = clamp((-mvPosition.z - 1.0) / 9.0, 0.0, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;

  varying float vTwinkle;
  varying float vDepth;

  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    float alpha = smoothstep(0.5, 0.04, d);
    alpha *= alpha;

    // Nearer embers are brighter; distant ones dissolve into the fog.
    float depthFade = mix(1.0, 0.35, vDepth);
    gl_FragColor = vec4(uColor, alpha * vTwinkle * depthFade * uOpacity);
  }
`

/** Floating golden dust, drawn as GPU points so it costs almost nothing. */
export function EmberField({ reduced }: { reduced: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null)

  const geometry = useMemo(() => {
    const { count, area } = sceneConfig.embers
    const positions = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    const phases = new Float32Array(count)
    const speeds = new Float32Array(count)
    // Seeded, so the field is identical on every render and reload.
    const random = mulberry32(0x51ab1e)

    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = (random() * 2 - 1) * area.x
      positions[index * 3 + 1] = (random() * 2 - 1) * area.y
      positions[index * 3 + 2] = (random() * 2 - 1) * area.z

      // A few larger motes give the field depth.
      const large = random() > 0.93
      scales[index] = large ? 1.9 + random() * 1.6 : 0.5 + random() * 0.9
      phases[index] = random() * Math.PI * 2
      speeds[index] = 0.05 + random() * 0.22
    }

    return { positions, scales, phases, speeds }
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(typeof window === 'undefined' ? 1 : window.devicePixelRatio, 1.75) },
      uHeight: { value: sceneConfig.embers.area.y * 2 },
      uColor: { value: new THREE.Color(sceneConfig.embers.color) },
      uOpacity: { value: 1 },
    }),
    [],
  )

  useFrame((_, delta) => {
    if (reduced || !material.current) return
    material.current.uniforms.uTime.value += Math.min(delta, 0.05)
  })

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[geometry.positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[geometry.scales, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[geometry.phases, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[geometry.speeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
