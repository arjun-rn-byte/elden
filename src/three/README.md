# The 3D layer

The hero stage is deliberately engine-agnostic. Nothing in the page layout knows whether a
canvas, a Spline scene or a drawn plate is rendering behind the title.

```
SceneStage.tsx      engine switch + Suspense fallback (no three.js imports)
├── CanvasStage.tsx lazily imports @react-three/fiber + three  ← the heavy chunk
│   └── scenes/HeroSanctum.tsx
│       ├── components/EmberField.tsx   GPU point shader: drifting gold dust
│       └── components/SigilRings.tsx   astrolabe of rings, ticks and runes
├── SplineSlot.tsx  documented drop-in point for @splinetool/react-spline
├── SigilFallback.tsx drawn sigil used while WebGL warms up / when 3D is off
└── config.ts       engine choice, ember budget, camera
```

## Switching engines

```bash
VITE_SCENE_ENGINE=r3f      # default
VITE_SCENE_ENGINE=still    # no WebGL at all, drawn sigil only
VITE_SCENE_ENGINE=spline   # uses SplineSlot
VITE_SPLINE_SCENE_URL=https://prod.spline.design/xxxxxxxx/scene.splinecode
```

To make `spline` real:

```bash
npm i @splinetool/react-spline @splinetool/runtime
```

```tsx
// src/three/SplineSlot.tsx
const Spline = lazy(() => import('@splinetool/react-spline'))

export function SplineSlot({ className }: { className?: string }) {
  return (
    <div className={cn('relative h-full w-full', className)}>
      <Suspense fallback={<SigilFallback />}>
        <Spline scene={sceneConfig.splineUrl} className="h-full w-full" />
      </Suspense>
    </div>
  )
}
```

Keep the `mask-fade-radial` wrapper in `Hero.tsx` so the scene dissolves into the page.

## Adding a scene

1. Create `scenes/YourScene.tsx` with a default export taking `{ reduced: boolean }`.
2. Render it from `CanvasStage` instead of (or alongside) `HeroSanctum`.
3. Use `meshBasicMaterial` + `AdditiveBlending` + `depthWrite={false}` for light-drawn
   geometry — it never needs lights and stays cheap.
4. Guard every `useFrame` with `reduced` and keep per-frame work allocation-free.
5. If the scene is for a wing rather than the threshold, mount another `SceneStage` with
   its own `Suspense`; the chunk is shared.

## Constraints

- `frameloop` is `'never'` while the stage is out of view.
- `dpr` is capped at `1.7`; the ember field is one draw call of 1,000 points.
- No post-processing pass yet — bloom would dwarf the current GPU budget.
