/**
 * A wide, cinematic vista for the World chapter: dawn over the highlands, the
 * Erdtree on the horizon, and the surveyor's country below it. Drawn rather
 * than photographed, so it stays crisp at any width and weighs nothing.
 */
export function WorldLandscape() {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="vl-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#050505" />
          <stop offset="26%" stopColor="#0a0908" />
          <stop offset="48%" stopColor="#151108" />
          <stop offset="65%" stopColor="#2a1f0e" />
          <stop offset="72%" stopColor="#3d2c11" />
          <stop offset="81%" stopColor="#1b1409" />
          <stop offset="100%" stopColor="#070605" />
        </linearGradient>
        <radialGradient id="vl-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f8ecc8" stopOpacity="0.95" />
          <stop offset="22%" stopColor="#e7cb8c" stopOpacity="0.5" />
          <stop offset="52%" stopColor="#c6a45a" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#c6a45a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="vl-tree" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#050505" stopOpacity="0.96" />
          <stop offset="70%" stopColor="#050505" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#050505" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="vl-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#241c10" />
          <stop offset="100%" stopColor="#100d08" />
        </linearGradient>
        <linearGradient id="vl-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#15110b" />
          <stop offset="100%" stopColor="#0a0907" />
        </linearGradient>
        <linearGradient id="vl-haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c6a45a" stopOpacity="0" />
          <stop offset="55%" stopColor="#c6a45a" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#c6a45a" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1600" height="900" fill="url(#vl-sky)" />

      {/* the last stars */}
      <g fill="#e8e2d2">
        {[
          [140, 70, 0.5],
          [320, 46, 0.32],
          [470, 96, 0.42],
          [610, 54, 0.26],
          [760, 84, 0.36],
          [980, 40, 0.3],
          [1120, 104, 0.24],
          [1290, 62, 0.34],
          [1440, 116, 0.26],
          [240, 150, 0.2],
          [880, 140, 0.18],
          [1540, 60, 0.22],
        ].map(([cx, cy, opacity]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.5" fillOpacity={opacity} />
        ))}
      </g>

      {/* dawn */}
      <circle cx="980" cy="596" r="380" fill="url(#vl-sun)" />
      <circle cx="980" cy="596" r="46" fill="#f6e8c2" fillOpacity="0.55" />
      <circle cx="980" cy="596" r="22" fill="#fdf6e2" fillOpacity="0.75" />

      {/* far ridges */}
      <path
        d="M 0 640 L 120 592 L 210 618 L 320 556 L 430 606 L 520 566 L 640 622 L 760 586 L 860 624 L 960 588 L 1080 630 L 1180 596 L 1300 636 L 1420 590 L 1520 626 L 1600 600 V 900 H 0 Z"
        fill="url(#vl-far)"
        opacity="0.85"
      />

      {/* the Erdtree, rim-lit by the dawn */}
      <g>
        <circle cx="1180" cy="470" r="300" fill="url(#vl-tree)" opacity="0.55" />
        <path
          d="M 1180 620 C 1172 560 1150 520 1110 486 C 1074 456 1058 420 1072 386 C 1088 348 1132 330 1172 342 C 1200 350 1220 368 1230 392 C 1252 362 1290 350 1322 362 C 1360 376 1378 414 1368 450 C 1358 486 1326 512 1292 534 C 1260 554 1238 586 1234 626 Z"
          fill="#050504"
          opacity="0.94"
        />
        <g stroke="#c6a45a" strokeOpacity="0.3" fill="none" strokeWidth="1.2">
          <path d="M 1180 620 V 500" />
          <path d="M 1180 552 C 1150 538 1128 512 1118 486" />
          <path d="M 1180 566 C 1212 550 1240 522 1252 494" />
          <path d="M 1120 420 C 1150 410 1176 414 1192 430" strokeOpacity="0.16" />
          <path d="M 1258 432 C 1288 428 1312 440 1324 458" strokeOpacity="0.16" />
        </g>
        <path
          d="M 1060 620 C 1100 600 1130 606 1180 620 C 1230 604 1272 598 1312 620"
          fill="none"
          stroke="#c6a45a"
          strokeOpacity="0.14"
        />
      </g>

      {/* middle country: broken walls and a ruined gate */}
      <path
        d="M 0 720 L 180 688 L 330 706 L 470 676 L 620 700 L 760 678 L 900 706 L 1040 682 L 1180 708 L 1320 680 L 1460 704 L 1600 676 V 900 H 0 Z"
        fill="url(#vl-mid)"
      />
      <g stroke="#0a0907" fill="#0a0907" opacity="0.95">
        <path d="M 356 704 V 640 H 372 V 704 Z" />
        <path d="M 398 706 V 662 H 412 V 706 Z" />
        <path d="M 436 700 V 630 L 452 618 L 468 630 V 700 Z" />
        <path d="M 1128 700 V 646 H 1146 V 700 Z" />
        <path d="M 1168 702 V 668 H 1182 V 702 Z" />
      </g>

      {/* mist bands */}
      <g className="animate-[fog-drift-a_64s_ease-in-out_infinite]">
        <ellipse cx="520" cy="676" rx="440" ry="34" fill="url(#vl-haze)" opacity="0.7" />
      </g>
      <g className="animate-[fog-drift-b_82s_ease-in-out_infinite]">
        <ellipse cx="1120" cy="704" rx="520" ry="30" fill="url(#vl-haze)" opacity="0.55" />
      </g>

      {/* foreground ridge, and a lone figure on the road */}
      <path
        d="M 0 812 L 220 774 L 420 796 L 640 768 L 880 800 L 1080 772 L 1300 802 L 1600 768 V 900 H 0 Z"
        fill="#060605"
      />
      <g fill="#060605">
        <path d="M 704 780 c 0 -10 6 -16 12 -16 s 12 6 12 16 z" />
        <path d="M 712 764 a 4 4 0 1 1 8 0 a 4 4 0 1 1 -8 0" />
      </g>
      <path d="M 560 790 C 640 778 720 786 800 776" fill="none" stroke="#c6a45a" strokeOpacity="0.08" />
    </svg>
  )
}
