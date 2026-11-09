/**
 * The three survey plates of the World atlas.
 *
 * These are drawn, not photographed: coastline, rot, snow, roots and shadow
 * are all paths and hatching. Every plate is 1200 × 900 so a region's
 * percentage coordinates land in exactly the same place at any size.
 *
 * To replace the plate with a real 3D map later, keep the coordinate system
 * and swap the drawing — the markers, zoom, index and dossier do not care.
 */

const GOLD = '#c6a45a'
const CRIMSON = '#9a3d36'
const MOON = '#8798bd'

const W = 1200
const H = 900

const LANDMASS = `M 300 800
  C 250 770 215 700 232 640
  C 245 592 205 552 225 500
  C 240 462 290 448 300 414
  C 312 372 278 336 306 300
  C 336 262 396 268 432 246
  C 470 222 500 186 548 168
  C 600 148 660 132 716 146
  C 772 160 800 196 838 200
  C 876 204 900 190 926 214
  C 956 242 944 288 958 330
  C 972 372 1006 398 1000 440
  C 994 482 1030 512 1014 556
  C 998 600 950 606 934 648
  C 918 690 940 730 900 758
  C 858 788 800 774 754 792
  C 706 810 664 804 616 816
  C 566 828 520 806 470 812
  C 410 818 356 826 300 800
  Z`

const LIURNIA = `M 268 470
  C 300 440 340 430 372 448
  C 404 466 420 500 400 530
  C 378 562 332 566 300 544
  C 272 524 254 494 268 470
  Z`

/** Ruled grid and rhumb lines — the surveying furniture of the chart. */
function Graticule() {
  return (
    <g>
      {[150, 300, 450, 600, 750, 900, 1050].map((x) => (
        <line
          key={`v${x}`}
          x1={x}
          y1={44}
          x2={x}
          y2={856}
          stroke={GOLD}
          strokeOpacity="0.055"
          strokeWidth="0.8"
        />
      ))}
      {[150, 300, 450, 600, 750].map((y) => (
        <line
          key={`h${y}`}
          x1={44}
          y1={y}
          x2={1156}
          y2={y}
          stroke={GOLD}
          strokeOpacity="0.055"
          strokeWidth="0.8"
        />
      ))}
      <g stroke={GOLD} strokeOpacity="0.04" strokeWidth="0.7">
        <line x1="600" y1="44" x2="150" y2="856" />
        <line x1="600" y1="44" x2="1050" y2="856" />
        <line x1="380" y1="44" x2="1050" y2="700" />
        <line x1="820" y1="44" x2="150" y2="700" />
      </g>
    </g>
  )
}

/** Double rule, corner ticks and plate marks. */
function Frame() {
  return (
    <g>
      <rect x="18" y="18" width={W - 36} height={H - 36} fill="none" stroke={GOLD} strokeOpacity="0.24" />
      <rect x="30" y="30" width={W - 60} height={H - 60} fill="none" stroke={GOLD} strokeOpacity="0.1" strokeWidth="0.8" />
      {[
        [30, 30, 1, 1],
        [W - 30, 30, -1, 1],
        [30, H - 30, 1, -1],
        [W - 30, H - 30, -1, -1],
      ].map(([x, y, sx, sy]) => (
        <path
          key={`${x}-${y}`}
          d={`M${x} ${y + sy * 26} L${x} ${y} L${x + sx * 26} ${y}`}
          fill="none"
          stroke={GOLD}
          strokeOpacity="0.4"
          strokeWidth="1.2"
        />
      ))}
    </g>
  )
}

function Compass({ x = 1058, y = 130 }: { x?: number; y?: number }) {
  const r = 46
  return (
    <g stroke={GOLD} fill="none">
      <circle cx={x} cy={y} r={r} strokeOpacity="0.28" />
      <circle cx={x} cy={y} r={r + 8} strokeOpacity="0.14" strokeDasharray="1 6" />
      <circle cx={x} cy={y} r={r * 0.42} strokeOpacity="0.22" />
      {[
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0],
      ].map(([dx, dy], index) => (
        <line
          key={index}
          x1={x + dx * r * 0.16}
          y1={y + dy * r * 0.16}
          x2={x + dx * r * 0.92}
          y2={y + dy * r * 0.92}
          strokeOpacity={index === 0 ? 0.6 : 0.26}
        />
      ))}
      <g strokeOpacity="0.2">
        <line x1={x - r * 0.4} y1={y - r * 0.4} x2={x + r * 0.4} y2={y + r * 0.4} />
        <line x1={x - r * 0.4} y1={y + r * 0.4} x2={x + r * 0.4} y2={y - r * 0.4} />
      </g>
      <text
        x={x}
        y={y - r - 8}
        fill={GOLD}
        fillOpacity="0.55"
        stroke="none"
        fontSize="11"
        fontFamily="Cinzel, serif"
        letterSpacing="2"
        textAnchor="middle"
      >
        N
      </text>
    </g>
  )
}

function ScaleBar({ x = 74, y = 836 }: { x?: number; y?: number }) {
  return (
    <g stroke={GOLD} fill={GOLD}>
      <g strokeOpacity="0.4" strokeWidth="1">
        <line x1={x} y1={y} x2={x + 150} y2={y} />
        <line x1={x} y1={y - 4} x2={x} y2={y + 4} />
        <line x1={x + 75} y1={y - 3} x2={x + 75} y2={y + 3} />
        <line x1={x + 150} y1={y - 4} x2={x + 150} y2={y + 4} />
      </g>
      <text x={x} y={y - 10} fillOpacity="0.45" stroke="none" fontSize="9" fontFamily="Cinzel, serif" letterSpacing="1.6">
        0
      </text>
      <text
        x={x + 150}
        y={y - 10}
        fillOpacity="0.45"
        stroke="none"
        fontSize="9"
        fontFamily="Cinzel, serif"
        letterSpacing="1.6"
        textAnchor="end"
      >
        LEAGUES
      </text>
    </g>
  )
}

/** A range of mountains, drawn as engraved chevrons. */
function Ridge({
  x,
  y,
  width = 120,
  peaks = 5,
  opacity = 0.34,
}: {
  x: number
  y: number
  width?: number
  peaks?: number
  opacity?: number
}) {
  const step = width / peaks
  const d = Array.from({ length: peaks }, (_, index) => {
    const bx = x + index * step
    return `M${bx} ${y} l${step / 2} -${step * 0.72} l${step / 2} ${step * 0.72}`
  }).join(' ')
  return (
    <path
      d={d}
      fill="none"
      stroke={GOLD}
      strokeOpacity={opacity}
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
  )
}

function TreeMark({ x, y, scale = 1, opacity = 0.4 }: { x: number; y: number; scale?: number; opacity?: number }) {
  return (
    <g stroke={GOLD} strokeOpacity={opacity} fill="none" strokeWidth="1" transform={`translate(${x} ${y}) scale(${scale})`}>
      <line x1="0" y1="0" x2="0" y2="-16" />
      <path d="M0 -9 l-6 -6 M0 -13 l6 -6 M0 -5 l-5 -5 M0 -4 l5 -5" />
    </g>
  )
}

/* ------------------------------------------------------------------ surface */

export function PlateSurface() {
  return (
    <>
      <defs>
        <radialGradient id="surface-sea" cx="50%" cy="42%" r="70%">
          <stop offset="0%" stopColor="#0d0f10" />
          <stop offset="60%" stopColor="#090b0b" />
          <stop offset="100%" stopColor="#050606" />
        </radialGradient>
        <linearGradient id="surface-land" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#26221a" />
          <stop offset="55%" stopColor="#191713" />
          <stop offset="100%" stopColor="#12110f" />
        </linearGradient>
        <radialGradient id="surface-erdtree" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.3" />
          <stop offset="45%" stopColor={GOLD} stopOpacity="0.1" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
        <pattern id="surface-waves" width="26" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 12 q6.5 -5 13 0 t13 0" fill="none" stroke={GOLD} strokeOpacity="0.2" strokeWidth="0.8" />
        </pattern>
        <pattern id="surface-rot" width="11" height="11" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.9" fill={CRIMSON} fillOpacity="0.55" />
          <circle cx="8" cy="8" r="0.7" fill="#c07a70" fillOpacity="0.3" />
        </pattern>
        <pattern id="surface-snow" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#c9d3e0" strokeOpacity="0.16" strokeWidth="1" />
        </pattern>
        <pattern id="surface-forest" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="1.1" fill={GOLD} fillOpacity="0.2" />
          <circle cx="11" cy="10" r="0.8" fill={GOLD} fillOpacity="0.14" />
        </pattern>
      </defs>

      <rect width={W} height={H} fill="url(#surface-sea)" />
      <rect width={W} height={H} fill="url(#surface-waves)" opacity="1" />
      <Graticule />

      {/* the land */}
      <path d={LANDMASS} fill="url(#surface-land)" stroke={GOLD} strokeOpacity="0.68" strokeWidth="1.6" />
      <path
        d={LANDMASS}
        fill="none"
        stroke={GOLD}
        strokeOpacity="0.22"
        strokeWidth="9"
        strokeDasharray="1 11"
        strokeLinecap="round"
      />

      {/* Liurnia: the drowned basin */}
      <path d={LIURNIA} fill="#080d0f" fillOpacity="0.92" stroke={GOLD} strokeOpacity="0.3" strokeWidth="1" />
      {[484, 500, 516].map((y, index) => (
        <path
          key={y}
          d={`M ${292 + index * 6} ${y} q 24 -8 48 0 t 48 0`}
          fill="none"
          stroke={GOLD}
          strokeOpacity="0.14"
          strokeWidth="0.8"
        />
      ))}

      {/* Altus terraces */}
      {[0, 14, 28].map((offset) => (
        <path
          key={offset}
          d={`M ${520 - offset} ${330 + offset * 0.5} q 60 -26 118 0`}
          fill="none"
          stroke={GOLD}
          strokeOpacity="0.16"
          strokeWidth="0.9"
        />
      ))}

      {/* Mountaintops and Gelmir */}
      <Ridge x={644} y={214} width={150} peaks={6} opacity={0.36} />
      <Ridge x={666} y={238} width={104} peaks={4} opacity={0.2} />
      <Ridge x={392} y={400} width={92} peaks={4} opacity={0.3} />
      <Ridge x={900} y={556} width={78} peaks={3} opacity={0.18} />

      {/* the snow country */}
      <path
        d="M 498 176 C 540 140 610 128 676 146 C 706 154 726 172 720 196 C 700 224 636 226 590 214 C 548 204 508 200 498 176 Z"
        fill="url(#surface-snow)"
        fillOpacity="0.5"
        stroke="#c9d3e0"
        strokeOpacity="0.18"
        strokeWidth="0.9"
      />

      {/* Caelid */}
      <path
        d="M 828 404 C 872 386 934 398 968 434 C 998 466 986 516 950 540 C 910 566 852 552 824 520 C 798 490 798 424 828 404 Z"
        fill="url(#surface-rot)"
        fillOpacity="0.75"
        stroke={CRIMSON}
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      <path
        d="M 846 486 q 40 -22 84 -4"
        fill="none"
        stroke={CRIMSON}
        strokeOpacity="0.4"
        strokeWidth="0.9"
        strokeDasharray="3 4"
      />

      {/* forests and the Mistwood */}
      <path
        d="M 356 596 C 400 574 452 586 468 616 C 484 646 450 676 404 672 C 362 668 330 624 356 596 Z"
        fill="url(#surface-forest)"
        fillOpacity="0.8"
        stroke={GOLD}
        strokeOpacity="0.12"
      />
      <path
        d="M 372 300 C 404 282 442 292 452 316 C 462 342 436 366 400 360 C 366 354 346 320 372 300 Z"
        fill="url(#surface-forest)"
        fillOpacity="0.6"
        stroke={GOLD}
        strokeOpacity="0.1"
      />

      {/* rivers */}
      <path
        d="M 632 300 C 604 348 588 386 566 424 C 540 470 508 496 480 536 C 450 578 414 606 372 640"
        fill="none"
        stroke={MOON}
        strokeOpacity="0.28"
        strokeWidth="1.6"
      />
      <path
        d="M 700 268 C 720 316 700 356 716 392 C 730 424 774 434 796 464"
        fill="none"
        stroke={MOON}
        strokeOpacity="0.2"
        strokeWidth="1.2"
      />

      {/* the Erdtree, and the capital under it */}
      <circle cx="648" cy="396" r="132" fill="url(#surface-erdtree)" />
      <g stroke={GOLD} fill="none">
        <circle cx="648" cy="396" r="30" strokeOpacity="0.32" />
        <circle cx="648" cy="396" r="42" strokeOpacity="0.16" strokeDasharray="1 5" />
        <line x1="648" y1="372" x2="648" y2="420" strokeOpacity="0.5" />
        <path d="M648 384 l-14 -12 M648 378 l14 -12 M648 396 l-16 -10 M648 392 l16 -10" strokeOpacity="0.42" />
      </g>

      {/* a handful of trees, for scale */}
      <TreeMark x={392} y={640} opacity={0.3} />
      <TreeMark x={430} y={656} scale={0.8} opacity={0.22} />
      <TreeMark x={846} y={620} scale={0.9} opacity={0.2} />
      <TreeMark x={700} y={300} scale={1.1} opacity={0.26} />

      <Compass x={1058} y={800} />
      <ScaleBar />
      <Frame />
    </>
  )
}

/* --------------------------------------------------------------- underworld */

export function PlateUnderworld() {
  return (
    <>
      <defs>
        <radialGradient id="under-plane" cx="46%" cy="34%" r="72%">
          <stop offset="0%" stopColor="#111110" />
          <stop offset="65%" stopColor="#0a0b0c" />
          <stop offset="100%" stopColor="#060707" />
        </radialGradient>
        <linearGradient id="under-river" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={MOON} stopOpacity="0.5" />
          <stop offset="55%" stopColor={MOON} stopOpacity="0.22" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0.16" />
        </linearGradient>
        <radialGradient id="under-rot" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={CRIMSON} stopOpacity="0.5" />
          <stop offset="70%" stopColor={CRIMSON} stopOpacity="0.14" />
          <stop offset="100%" stopColor={CRIMSON} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="under-nokron" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#aebbd6" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#aebbd6" stopOpacity="0" />
        </radialGradient>
        <pattern id="under-rock" width="46" height="46" patternUnits="userSpaceOnUse">
          <path d="M0 34 q11 -8 22 0 t22 0" fill="none" stroke={GOLD} strokeOpacity="0.045" strokeWidth="1" />
        </pattern>
        <pattern id="under-stars" width="90" height="70" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="18" r="1" fill="#dbe4f4" fillOpacity="0.4" />
          <circle cx="52" cy="8" r="0.7" fill="#dbe4f4" fillOpacity="0.26" />
          <circle cx="70" cy="42" r="0.9" fill="#dbe4f4" fillOpacity="0.3" />
          <circle cx="30" cy="54" r="0.6" fill="#dbe4f4" fillOpacity="0.22" />
        </pattern>
      </defs>

      <rect width={W} height={H} fill="url(#under-plane)" />
      <rect width={W} height={H} fill="url(#under-rock)" opacity="0.8" />
      <rect x="40" y="40" width={W - 80} height="250" fill="url(#under-stars)" opacity="0.5" />
      <Graticule />

      {/* the false sky and its constellations */}
      <g stroke="#dbe4f4" strokeOpacity="0.2" fill="none" strokeWidth="0.8">
        <path d="M 236 168 L 292 128 L 352 156 L 404 112" />
        <path d="M 700 150 L 758 110 L 816 140 L 862 106" />
        <path d="M 470 96 L 512 140 L 566 118" />
      </g>
      <g fill="#dbe4f4" fillOpacity="0.4">
        {[
          [236, 168],
          [292, 128],
          [352, 156],
          [404, 112],
          [700, 150],
          [758, 110],
          [816, 140],
          [862, 106],
          [470, 96],
          [512, 140],
          [566, 118],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.6" />
        ))}
      </g>

      {/* cavern strata */}
      {[336, 452, 574, 690, 800].map((y, index) => (
        <path
          key={y}
          d={`M 52 ${y} C 220 ${y - 26 - index * 4} 380 ${y + 22} 540 ${y - 6} C 700 ${y - 34} 900 ${y + 24} 1148 ${y - 10}`}
          fill="none"
          stroke={GOLD}
          strokeOpacity={0.07 + index * 0.008}
          strokeWidth="1"
        />
      ))}

      {/* roots coming down from the surface */}
      <g fill="none" stroke={GOLD} strokeOpacity="0.2" strokeWidth="1.4">
        <path d="M 604 40 C 596 120 560 160 556 224 C 552 280 586 316 576 372" />
        <path d="M 604 40 C 616 108 652 150 648 208 C 644 262 610 300 622 352" />
        <path d="M 560 200 C 520 246 476 268 448 316" strokeWidth="1" strokeOpacity="0.14" />
        <path d="M 648 216 C 690 258 730 276 758 320" strokeWidth="1" strokeOpacity="0.14" />
      </g>
      <path
        d="M 556 224 C 552 320 520 396 546 470 C 566 528 540 590 552 652"
        fill="none"
        stroke={GOLD}
        strokeOpacity="0.16"
        strokeWidth="2.4"
      />

      {/* Siofra, running south */}
      <path
        d="M 420 200 C 404 286 372 336 356 404 C 340 474 352 544 330 616 C 314 674 300 724 306 800"
        fill="none"
        stroke="url(#under-river)"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M 420 200 C 404 286 372 336 356 404 C 340 474 352 544 330 616 C 314 674 300 724 306 800"
        fill="none"
        stroke="#c9d6ea"
        strokeOpacity="0.35"
        strokeWidth="0.9"
      />

      {/* Ainsel, running east of it */}
      <path
        d="M 806 160 C 768 226 730 268 712 330 C 694 392 706 448 678 508 C 654 560 636 620 646 690"
        fill="none"
        stroke="url(#under-river)"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.42"
      />
      <path
        d="M 806 160 C 768 226 730 268 712 330 C 694 392 706 448 678 508 C 654 560 636 620 646 690"
        fill="none"
        stroke="#c9d6ea"
        strokeOpacity="0.3"
        strokeWidth="0.9"
      />

      {/* Nokron and Nokstella */}
      <circle cx="420" cy="292" r="120" fill="url(#under-nokron)" />
      <g stroke={MOON} fill="none" strokeOpacity="0.28">
        <circle cx="420" cy="292" r="46" />
        <circle cx="420" cy="292" r="60" strokeOpacity="0.16" strokeDasharray="1 6" />
        <path d="M 388 306 q 32 -34 64 0" />
        <path d="M 394 292 h 52" strokeOpacity="0.18" />
      </g>
      <g stroke={MOON} fill="none" strokeOpacity="0.24">
        <path d="M 596 406 q 30 -40 60 0" />
        <path d="M 610 396 v 34 M 642 396 v 34" strokeOpacity="0.16" />
      </g>

      {/* the lake that should not exist */}
      <circle cx="700" cy="540" r="96" fill="url(#under-rot)" />
      <ellipse cx="700" cy="540" rx="66" ry="34" fill={CRIMSON} fillOpacity="0.16" stroke={CRIMSON} strokeOpacity="0.34" />
      <path d="M 654 538 q 22 -10 44 0 t 44 0" fill="none" stroke={CRIMSON} strokeOpacity="0.4" strokeWidth="0.9" />

      {/* Deeproot: the bundle under everything */}
      <g stroke={GOLD} fill="none" strokeOpacity="0.24" strokeWidth="1.2">
        <path d="M 576 476 C 556 520 570 552 552 588 C 536 620 548 652 534 686" />
        <path d="M 576 476 C 600 520 586 560 610 596 C 630 626 618 660 634 692" />
        <path d="M 576 476 C 576 522 556 546 574 582" strokeOpacity="0.14" />
      </g>
      <path d="M 576 476 V 700" stroke={GOLD} strokeOpacity="0.3" strokeWidth="2.6" />

      {/* Mohgwyn, lit from below */}
      <g transform="translate(864 648)">
        <circle cx="0" cy="0" r="110" fill="url(#under-rot)" opacity="0.7" />
        <path d="M -34 44 L -34 -16 L -18 -34 L -18 -54 L -8 -54 L -8 -34 L 8 -34 L 8 -54 L 18 -54 L 18 -34 L 34 -16 L 34 44 Z" fill="#120a0a" stroke={CRIMSON} strokeOpacity="0.5" />
        <path d="M -20 44 L -20 4 L 20 4 L 20 44" fill="none" stroke={CRIMSON} strokeOpacity="0.3" />
        <line x1="0" y1="44" x2="0" y2="66" stroke={CRIMSON} strokeOpacity="0.3" />
      </g>

      <Compass x={1058} y={800} />
      <ScaleBar y={836} />
      <Frame />
    </>
  )
}

/* ------------------------------------------------------------------- shadow */

export function PlateShadow() {
  return (
    <>
      <defs>
        <radialGradient id="shadow-field" cx="50%" cy="40%" r="72%">
          <stop offset="0%" stopColor="#141311" />
          <stop offset="60%" stopColor="#0b0b0a" />
          <stop offset="100%" stopColor="#060607" />
        </radialGradient>
        <radialGradient id="shadow-canopy" cx="50%" cy="34%" r="52%">
          <stop offset="0%" stopColor="#241f19" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#121110" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0b0b0a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="shadow-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.22" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="shadow-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10202a" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0a1014" stopOpacity="0.9" />
        </linearGradient>
        <pattern id="shadow-ash" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="5" r="0.8" fill={GOLD} fillOpacity="0.12" />
          <circle cx="10" cy="11" r="0.6" fill={GOLD} fillOpacity="0.08" />
        </pattern>
        <pattern id="shadow-tomb" width="34" height="30" patternUnits="userSpaceOnUse">
          <path d="M10 22 v-9 M6 16 h8" stroke={GOLD} strokeOpacity="0.16" strokeWidth="0.9" />
          <path d="M24 26 v-6" stroke={GOLD} strokeOpacity="0.1" strokeWidth="0.9" />
        </pattern>
      </defs>

      <rect width={W} height={H} fill="url(#shadow-field)" />
      <rect width={W} height={H} fill="url(#shadow-ash)" opacity="0.7" />
      <Graticule />

      {/* the realm's ragged outline */}
      <path
        d="M 262 742 C 226 690 246 620 220 566 C 198 518 236 468 226 420 C 214 366 264 330 306 300 C 348 270 352 214 404 190 C 462 162 520 190 574 176 C 634 160 668 116 730 126 C 790 136 800 190 848 210 C 900 232 936 208 962 250 C 986 290 958 330 974 374 C 992 424 1030 452 1018 500 C 1006 550 962 566 950 612 C 938 660 962 706 920 742 C 874 782 810 762 756 780 C 700 798 660 776 606 792 C 548 810 508 778 456 786 C 396 796 334 792 292 770 C 274 760 268 752 262 742 Z"
        fill="#0e0d0c"
        fillOpacity="0.9"
        stroke={GOLD}
        strokeOpacity="0.4"
        strokeWidth="1.2"
      />
      <path
        d="M 262 742 C 226 690 246 620 220 566 C 198 518 236 468 226 420 C 214 366 264 330 306 300 C 348 270 352 214 404 190 C 462 162 520 190 574 176 C 634 160 668 116 730 126 C 790 136 800 190 848 210 C 900 232 936 208 962 250 C 986 290 958 330 974 374 C 992 424 1030 452 1018 500 C 1006 550 962 566 950 612 C 938 660 962 706 920 742 C 874 782 810 762 756 780 C 700 798 660 776 606 792 C 548 810 508 778 456 786 C 396 796 334 792 292 770 C 274 760 268 752 262 742 Z"
        fill="none"
        stroke={GOLD}
        strokeOpacity="0.12"
        strokeWidth="9"
        strokeDasharray="1 11"
      />

      {/* the southern coast */}
      <path
        d="M 380 726 C 452 706 520 744 590 724 C 650 707 700 738 748 722 L 748 800 C 690 816 604 806 528 816 C 462 824 410 800 380 792 Z"
        fill="url(#shadow-water)"
        stroke={MOON}
        strokeOpacity="0.2"
        strokeWidth="0.9"
      />

      {/* the Scadutree, at the centre of the shadow */}
      <circle cx="566" cy="330" r="180" fill="url(#shadow-halo)" />
      <path
        d="M 566 470 C 556 420 540 392 512 366 C 486 342 470 316 476 292 C 484 264 512 252 540 258 C 560 262 574 274 582 292 C 596 268 622 258 646 266 C 674 276 686 304 678 330 C 670 358 646 376 620 392 C 596 406 582 432 576 470 Z"
        fill="url(#shadow-canopy)"
        stroke={GOLD}
        strokeOpacity="0.34"
        strokeWidth="1.1"
      />
      <g stroke={GOLD} fill="none" strokeOpacity="0.26" strokeWidth="1">
        <path d="M 566 470 V 402 M 566 428 C 544 418 526 400 518 380 M 566 436 C 590 424 610 404 618 382" />
        <path d="M 520 300 C 546 292 566 296 578 310 M 612 306 C 636 304 656 312 664 326" strokeOpacity="0.16" />
      </g>
      <path
        d="M 566 470 C 552 520 556 560 540 600"
        fill="none"
        stroke={GOLD}
        strokeOpacity="0.2"
        strokeWidth="1.4"
      />

      {/* Shadow Keep */}
      <g transform="translate(700 300)" stroke={GOLD} strokeOpacity="0.32" fill="#100f0e">
        <path d="M -40 40 V -18 L -24 -18 L -24 -38 L -8 -38 L -8 -18 L 8 -18 L 8 -44 L 24 -44 L 24 -18 L 40 -18 V 40 Z" strokeWidth="1.1" />
        <path d="M -14 40 V 8 H 14 V 40" fill="none" strokeOpacity="0.2" />
        <line x1="-40" y1="40" x2="40" y2="40" strokeOpacity="0.5" />
      </g>

      {/* the jagged peak */}
      <Ridge x={790} y={352} width={170} peaks={5} opacity={0.34} />
      <Ridge x={812} y={378} width={116} peaks={4} opacity={0.18} />
      <path d="M 874 360 L 908 268 L 940 360" fill="none" stroke={GOLD} strokeOpacity="0.24" strokeWidth="1.1" />

      {/* Rauh: terraces and aqueduct */}
      <g stroke={GOLD} fill="none" strokeOpacity="0.2" strokeWidth="1">
        <path d="M 706 470 q 52 -18 104 0" />
        <path d="M 716 486 q 42 -14 84 0" strokeOpacity="0.14" />
        <path d="M 730 502 q 30 -10 58 0" strokeOpacity="0.1" />
        <path d="M 742 470 v 40 M 776 468 v 44" strokeOpacity="0.12" />
      </g>

      {/* gravesite plain */}
      <path
        d="M 420 560 C 470 534 540 540 584 566 C 624 590 606 636 556 648 C 502 660 440 640 424 606 C 416 588 412 570 420 560 Z"
        fill="url(#shadow-tomb)"
        fillOpacity="0.9"
        stroke={GOLD}
        strokeOpacity="0.12"
      />

      {/* the closed wood */}
      <path
        d="M 286 400 C 326 366 392 372 416 408 C 440 446 414 496 366 504 C 318 512 268 476 268 442 C 268 424 274 410 286 400 Z"
        fill="#0a0d0a"
        fillOpacity="0.9"
        stroke="#8a9862"
        strokeOpacity="0.2"
      />
      {[
        [318, 430],
        [346, 452],
        [366, 420],
        [300, 460],
        [386, 470],
      ].map(([x, y]) => (
        <TreeMark key={`${x}-${y}`} x={x} y={y} scale={0.9} opacity={0.26} />
      ))}

      {/* cerulean flowers on the coast */}
      <g fill={MOON} fillOpacity="0.3">
        {[
          [500, 700],
          [530, 716],
          [560, 704],
          [588, 730],
          [512, 738],
          [548, 752],
          [612, 712],
          [640, 736],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.8" />
        ))}
      </g>

      <Compass x={1058} y={800} />
      <ScaleBar y={836} />
      <Frame />
    </>
  )
}
