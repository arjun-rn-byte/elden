/** Deterministic PRNG so the dust sits in the same place on every render. */
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

const random = mulberry32(0x9e3779b9)

const motes = Array.from({ length: 34 }, (_, index) => {
  const size = 1 + random() * 2.4
  return {
    id: index,
    left: random() * 100,
    top: 32 + random() * 68,
    size,
    drift: (random() * 2 - 1) * 46,
    duration: 16 + random() * 20,
    delay: -random() * 32,
    opacity: 0.25 + random() * 0.55,
  }
})

/**
 * CSS-only gold dust: no WebGL context, no layout thrash, and it costs one
 * composited layer per mote. The motes rise, sway and fade, then repeat.
 */
export function GoldDust() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {motes.map((mote) => (
        <span
          key={mote.id}
          className="hero-mote"
          style={{
            left: `${mote.left}%`,
            top: `${mote.top}%`,
            width: `${mote.size}px`,
            height: `${mote.size}px`,
            ['--mote-peak' as string]: mote.opacity,
            ['--drift' as string]: `${mote.drift}px`,
            animationDuration: `${mote.duration}s`,
            animationDelay: `${mote.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
