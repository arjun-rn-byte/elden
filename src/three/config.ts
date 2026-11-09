/**
 * Scene configuration.
 *
 * The hero is engine-agnostic: R3F is the default, but the same slot can host
 * a Spline scene (`VITE_SCENE_ENGINE=spline`) or a still atmospheric plate
 * (`VITE_SCENE_ENGINE=still`) without touching a single section component.
 */
export type SceneEngine = 'r3f' | 'spline' | 'still'

const engine = import.meta.env.VITE_SCENE_ENGINE as string | undefined

export const sceneConfig = {
  engine: (engine === 'spline' || engine === 'still' ? engine : 'r3f') as SceneEngine,
  /** Paste a Spline scene URL here (or set VITE_SPLINE_SCENE_URL). */
  splineUrl: (import.meta.env.VITE_SPLINE_SCENE_URL as string | undefined) ?? '',
  embers: {
    count: 1000,
    color: '#e8cd8f',
    area: { x: 7.5, y: 6, z: 5 },
  },
  camera: { position: [0, 0, 6.2] as [number, number, number], fov: 42 },
  dpr: [1, 1.7] as [number, number],
} as const
