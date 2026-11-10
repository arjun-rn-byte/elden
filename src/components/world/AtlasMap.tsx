import { useEffect, useRef, useState } from 'react'
import { Box, Compass, Maximize2, Minus, Plus } from 'lucide-react'
import type { AtlasRegion, StratumId } from '../../lib/regions'
import { stratumOf } from '../../lib/regions'
import { cn } from '../../lib/cn'
import { PlateShadow, PlateSurface, PlateUnderworld } from './AtlasPlates'
import { Atlas3DMap } from './Atlas3DMap'

const W = 1200
const H = 900
const MIN_SCALE = 1
const MAX_SCALE = 4

type Center = { x: number; y: number }
type View = { scale: number; center: Center }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

/** Keeps the viewBox inside the plate at the current zoom. */
const confine = (center: Center, scale: number): Center => {
  const halfW = W / scale / 2
  const halfH = H / scale / 2
  return {
    x: clamp(center.x, halfW, W - halfW),
    y: clamp(center.y, halfH, H - halfH),
  }
}

const plateArt = {
  surface: PlateSurface,
  underworld: PlateUnderworld,
  shadow: PlateShadow,
}

const controls = [
  { label: 'Zoom in', icon: Plus, kind: 'in' },
  { label: 'Zoom out', icon: Minus, kind: 'out' },
  { label: 'Reset the plate', icon: Maximize2, kind: 'reset' },
] as const

interface AtlasMapProps {
  stratum: StratumId
  regions: AtlasRegion[]
  selectedId: string | null
  onSelect: (id: string) => void
  /** Bump `nonce` to ask the map to centre on a region (e.g. from the index). */
  focus: { id: string; nonce: number } | null
}

/**
 * A pannable, zoomable survey plate with an interactive 3D astrolabe projection.
 *
 * The map serves as an ancient cartographer's archive: drawn in SVG,
 * zoomable and pannable, with coordinates matching the 3D astrolabe model.
 */
export function AtlasMap({ stratum, regions, selectedId, onSelect, focus }: AtlasMapProps) {
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d')
  const [view, setView] = useState<View>(() => {
    if (selectedId) {
      const target = regions.find((r) => r.id === selectedId)
      if (target) {
        const initialScale = 1.8
        return {
          scale: initialScale,
          center: confine({ x: (target.x / 100) * W, y: (target.y / 100) * H }, initialScale),
        }
      }
    }
    return { scale: 1, center: { x: W / 2, y: H / 2 } }
  })
  const [appliedFocus, setAppliedFocus] = useState(0)
  const [dragging, setDragging] = useState(false)

  const viewportRef = useRef<HTMLDivElement | null>(null)
  const drag = useRef<{ x: number; y: number; center: Center } | null>(null)

  const plate = stratumOf(stratum)
  const Plate = plateArt[stratum]
  const { scale } = view
  const viewW = W / scale
  const viewH = H / scale

  // Centre on a region when the index asks for it. Adjusting state during a
  // render on a changed token is the sanctioned way to react to a prop without
  // an effect round-trip.
  if (focus && focus.nonce !== appliedFocus) {
    setAppliedFocus(focus.nonce)
    const target = regions.find((region) => region.id === focus.id)
    if (target) {
      const next = Math.max(1.8, scale)
      setView({
        scale: next,
        center: confine({ x: (target.x / 100) * W, y: (target.y / 100) * H }, next),
      })
    }
  }

  const zoomAt = (factor: number, fx = 0.5, fy = 0.5) => {
    setView((prev) => {
      const next = clamp(prev.scale * factor, MIN_SCALE, MAX_SCALE)
      if (next === prev.scale) return prev

      const px = prev.center.x + (fx - 0.5) * (W / prev.scale)
      const py = prev.center.y + (fy - 0.5) * (H / prev.scale)

      return {
        scale: next,
        center: confine(
          { x: px - (fx - 0.5) * (W / next), y: py - (fy - 0.5) * (H / next) },
          next,
        ),
      }
    })
  }

  const panBy = (dx: number, dy: number) => {
    setView((prev) => ({
      ...prev,
      center: confine({ x: prev.center.x + dx, y: prev.center.y + dy }, prev.scale),
    }))
  }

  const reset = () => setView({ scale: 1, center: { x: W / 2, y: H / 2 } })

  // ⌘/Ctrl + wheel zooms about the pointer; a plain wheel belongs to the page.
  useEffect(() => {
    if (viewMode !== '2d') return
    const element = viewportRef.current
    if (!element) return

    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return
      event.preventDefault()
      const rect = element.getBoundingClientRect()
      const fx = clamp((event.clientX - rect.left) / rect.width, 0, 1)
      const fy = clamp((event.clientY - rect.top) / rect.height, 0, 1)
      const factor = event.deltaY < 0 ? 1.14 : 1 / 1.14

      setView((prev) => {
        const next = clamp(prev.scale * factor, MIN_SCALE, MAX_SCALE)
        if (next === prev.scale) return prev
        const px = prev.center.x + (fx - 0.5) * (W / prev.scale)
        const py = prev.center.y + (fy - 0.5) * (H / prev.scale)
        return {
          scale: next,
          center: confine(
            { x: px - (fx - 0.5) * (W / next), y: py - (fy - 0.5) * (H / next) },
            next,
          ),
        }
      })
    }

    element.addEventListener('wheel', onWheel, { passive: false })
    return () => element.removeEventListener('wheel', onWheel)
  }, [viewMode])

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    const element = viewportRef.current
    if (!element) return
    drag.current = { x: event.clientX, y: event.clientY, center: view.center }
    element.setPointerCapture(event.pointerId)
    setDragging(true)
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const active = drag.current
    const element = viewportRef.current
    if (!active || !element) return

    const rect = element.getBoundingClientRect()
    const deltaX = ((event.clientX - active.x) / rect.width) * viewW
    const deltaY = ((event.clientY - active.y) / rect.height) * viewH
    panBy(-deltaX, -deltaY)
  }

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return
    drag.current = null
    setDragging(false)
    viewportRef.current?.releasePointerCapture?.(event.pointerId)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const stepX = viewW * 0.14
    const stepY = viewH * 0.14

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        return panBy(-stepX, 0)
      case 'ArrowRight':
        event.preventDefault()
        return panBy(stepX, 0)
      case 'ArrowUp':
        event.preventDefault()
        return panBy(0, -stepY)
      case 'ArrowDown':
        event.preventDefault()
        return panBy(0, stepY)
      case '+':
      case '=':
        event.preventDefault()
        return zoomAt(1.25)
      case '-':
      case '_':
        event.preventDefault()
        return zoomAt(1 / 1.25)
      case '0':
        event.preventDefault()
        return reset()
      default:
        return undefined
    }
  }

  const left = view.center.x - viewW / 2
  const top = view.center.y - viewH / 2

  return (
    <div>
      {/* View Mode Toggle: 2D Cartographic Survey vs 3D Astrolabe Model */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 border border-gold/15 bg-ink/60 p-1">
          <button
            type="button"
            onClick={() => setViewMode('2d')}
            aria-pressed={viewMode === '2d'}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 font-inscribed text-[8px] uppercase tracking-[0.18em] transition-colors duration-300',
              viewMode === '2d'
                ? 'border border-gold/40 bg-gold/10 text-gold'
                : 'text-ash/60 hover:text-bone',
            )}
          >
            <Compass size={11} strokeWidth={1.3} />
            <span>2D Plate</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('3d')}
            aria-pressed={viewMode === '3d'}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 font-inscribed text-[8px] uppercase tracking-[0.18em] transition-colors duration-300',
              viewMode === '3d'
                ? 'border border-gold/40 bg-gold/10 text-gold'
                : 'text-ash/60 hover:text-bone',
            )}
          >
            <Box size={11} strokeWidth={1.3} />
            <span>3D Model</span>
          </button>
        </div>

        <span className="font-inscribed text-[7.5px] uppercase tracking-[0.24em] text-gold/45">
          {viewMode === '2d' ? 'Engraved Survey' : 'Orbital Projection'}
        </span>
      </div>

      {viewMode === '3d' ? (
        <Atlas3DMap
          stratum={stratum}
          regions={regions}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      ) : (
        <div
          ref={viewportRef}
          tabIndex={0}
          role="group"
          aria-label={`${plate.label} — survey map. Drag to pan, or use the arrow keys; plus and minus zoom, zero resets.`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onDoubleClick={(event) => {
            const rect = event.currentTarget.getBoundingClientRect()
            zoomAt(
              1.6,
              (event.clientX - rect.left) / rect.width,
              (event.clientY - rect.top) / rect.height,
            )
          }}
          onKeyDown={onKeyDown}
          className={cn(
            'relative aspect-[4/3] w-full touch-pan-y select-none overflow-hidden border border-gold/15 bg-[#070808] outline-offset-0',
            dragging ? 'cursor-grabbing' : 'cursor-grab',
          )}
        >
          <svg
            viewBox={`${left} ${top} ${viewW} ${viewH}`}
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <Plate />
          </svg>

          {/* the regions themselves */}
          <div className="pointer-events-none absolute inset-0">
            {regions.map((region, index) => {
              const x = (((region.x / 100) * W - left) / viewW) * 100
              const y = (((region.y / 100) * H - top) / viewH) * 100
              const active = region.id === selectedId

              return (
                <button
                  key={region.id}
                  type="button"
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={() => onSelect(region.id)}
                  aria-pressed={active}
                  aria-label={`${region.name} — ${region.epithet}`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  className="group/marker pointer-events-auto absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  <span className="relative flex h-7 w-7 items-center justify-center">
                    {active ? (
                      <span
                        aria-hidden
                        className="animate-breathe absolute inset-0 rotate-45 border border-gold/70 shadow-[0_0_18px_rgba(198,164,90,0.35)]"
                      />
                    ) : null}
                    <span
                      aria-hidden
                      className={cn(
                        'absolute h-3.5 w-3.5 rotate-45 border transition-[background-color,border-color,transform] duration-500 ease-out-expo',
                        active
                          ? 'scale-90 border-gold bg-gold/85'
                          : 'border-gold/60 bg-ink/70 group-hover/marker:scale-110 group-hover/marker:border-gold group-hover/marker:bg-gold/40',
                      )}
                    />
                    <span
                      aria-hidden
                      className={cn(
                        'relative h-1 w-1 rounded-full transition-colors duration-500',
                        active ? 'bg-ink' : 'bg-gold/80',
                      )}
                    />
                  </span>

                  <span
                    className={cn(
                      'mt-1 whitespace-nowrap border bg-ink/90 px-1.5 py-0.5 font-inscribed text-[8px] uppercase tracking-[0.16em] transition-opacity duration-300',
                      active
                        ? 'border-gold/40 text-gold opacity-100'
                        : 'border-gold/15 text-ash/80 opacity-0 group-hover/marker:opacity-100 group-focus-visible/marker:opacity-100',
                    )}
                  >
                    {String(index + 1).padStart(2, '0')} · {region.name}
                  </span>
                </button>
              )
            })}
          </div>

          {/* chrome */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-4 top-4 hidden items-center gap-2 sm:flex">
              <span className="h-1 w-1 rounded-full bg-gold/60" />
              <p className="font-inscribed text-[8px] uppercase tracking-[0.24em] text-ash/45">
                Drag to move · ⌘ scroll to zoom
              </p>
            </div>

            <div className="pointer-events-auto absolute right-3 top-3 flex flex-col gap-px border border-gold/15 bg-ink/85 backdrop-blur-sm">
              {controls.map(({ label, icon: Icon, kind }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => (kind === 'in' ? zoomAt(1.25) : kind === 'out' ? zoomAt(1 / 1.25) : reset())}
                  aria-label={label}
                  title={label}
                  className="flex h-9 w-9 items-center justify-center border-b border-gold/10 text-ash/70 transition-colors duration-300 last:border-b-0 hover:bg-gold/[0.07] hover:text-gold"
                >
                  <Icon size={14} strokeWidth={1.3} />
                </button>
              ))}
              <p
                aria-hidden
                className="border-t border-gold/10 py-1 text-center font-inscribed text-[8px] uppercase tracking-[0.1em] text-gold/55 tabular-nums"
              >
                {scale.toFixed(1)}
              </p>
            </div>

          </div>
        </div>
      )}

      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-3 text-[10.5px] leading-[1.8] text-mute/80">
          <span className="mt-2 h-px w-6 shrink-0 bg-gold/25" aria-hidden />
          <span>
            {viewMode === '2d'
              ? 'An ancient cartographer’s survey plate. Pans and zooms to every quadrant, or switch to the 3D astrolabe projection above.'
              : 'Interactive 3D model of the Lands Between. Drag to orbit the plane, scroll to elevate, or click any glowing beacon.'}
          </span>
        </p>
        <button
          type="button"
          onClick={() => setViewMode((m) => (m === '2d' ? '3d' : '2d'))}
          className="shrink-0 font-inscribed text-[8px] uppercase tracking-[0.22em] text-gold/70 transition-colors hover:text-gold"
        >
          {viewMode === '2d' ? 'Explore in 3D →' : '← Return to 2D Plate'}
        </button>
      </div>
    </div>
  )
}
