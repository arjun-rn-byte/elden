interface BossArtworkProps {
  id: string
  name: string
  accent?: 'crimson' | 'gold' | 'moon' | 'verdant'
  className?: string
}

export function BossArtwork({ id, name, accent = 'crimson', className = '' }: BossArtworkProps) {
  const getTheme = () => {
    switch (accent) {
      case 'gold':
        return {
          primary: '#c6a45a',
          secondary: '#362912',
          glow: '#f3e5be',
          bg: '#141008',
        }
      case 'moon':
        return {
          primary: '#5d7599',
          secondary: '#162030',
          glow: '#9bb1d4',
          bg: '#090d14',
        }
      case 'verdant':
        return {
          primary: '#596b43',
          secondary: '#1c2414',
          glow: '#88a368',
          bg: '#0c1209',
        }
      case 'crimson':
      default:
        return {
          primary: '#c93832',
          secondary: '#420f0d',
          glow: '#ff5c57',
          bg: '#160807',
        }
    }
  }

  const theme = getTheme()

  const renderBossGlyph = () => {
    switch (id) {
      case 'malenia':
        return (
          <g transform="translate(100, 100)">
            {/* Scarlet Aeonia Petals */}
            <circle cx="0" cy="0" r="42" fill="none" stroke={theme.glow} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <path d="M 0 -70 C 25 -40, 25 -10, 0 0 C -25 -10, -25 -40, 0 -70 Z" fill={theme.primary} opacity="0.75" />
            <path d="M 0 70 C 25 40, 25 10, 0 0 C -25 10, -25 40, 0 70 Z" fill={theme.primary} opacity="0.75" />
            <path d="M -70 0 C -40 25, -10 25, 0 0 C -10 -25, -40 -25, -70 0 Z" fill={theme.primary} opacity="0.75" />
            <path d="M 70 0 C 40 25, 10 25, 0 0 C 10 -25, 40 -25, 70 0 Z" fill={theme.primary} opacity="0.75" />
            {/* Winged golden helm */}
            <path d="M -35 -15 Q 0 -50 35 -15 L 20 -2 Q 0 -15 -20 -2 Z" fill="#e8c26a" opacity="0.9" />
            <path d="M -45 -35 C -30 -25 -25 0 -35 15" stroke="#f3e5be" strokeWidth="2.5" fill="none" />
            <path d="M 45 -35 C 30 -25 25 0 35 15" stroke="#f3e5be" strokeWidth="2.5" fill="none" />
            {/* Curved prosthetic blade */}
            <path d="M -65 55 Q 0 10 65 -45" stroke="#e8c26a" strokeWidth="3" fill="none" />
            <circle cx="0" cy="0" r="10" fill={theme.glow} opacity="0.9" filter="drop-shadow(0 0 8px #ff5c57)" />
          </g>
        )

      case 'radahn':
        return (
          <g transform="translate(100, 100)">
            {/* Gravitational Singularity Rings */}
            <ellipse cx="0" cy="0" rx="75" ry="32" fill="none" stroke="#7a348a" strokeWidth="2" strokeDasharray="5 3" opacity="0.6" transform="rotate(-18)" />
            <ellipse cx="0" cy="0" rx="75" ry="32" fill="none" stroke="#9d4edd" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" transform="rotate(28)" />
            {/* Twin Starscourge curved greatswords */}
            <path d="M -50 -55 Q -10 -10 -35 60 L -45 50 Q -25 -5 -60 -45 Z" fill="#2d1338" stroke="#9d4edd" strokeWidth="2" />
            <path d="M 50 -55 Q 10 -10 35 60 L 45 50 Q 25 -5 60 -45 Z" fill="#2d1338" stroke="#9d4edd" strokeWidth="2" />
            {/* Horned Helmet with Red Crest Mane */}
            <path d="M -30 -10 C -25 -45 0 -55 25 -10 Z" fill="#bfa15f" stroke="#e6c67c" strokeWidth="1.5" />
            <path d="M -18 -45 Q 0 -85 18 -45" stroke="#c93832" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
            <circle cx="0" cy="5" r="14" fill="#6a1b9a" opacity="0.8" filter="drop-shadow(0 0 10px #9d4edd)" />
          </g>
        )

      case 'morgott':
        return (
          <g transform="translate(100, 100)">
            {/* Omen Horn Crown */}
            <path d="M -40 20 C -60 -10 -50 -50 -20 -60 C -30 -35 -25 -10 -15 10" fill="none" stroke="#a38851" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 40 20 C 60 -10 50 -50 20 -60 C 30 -35 25 -10 15 10" fill="none" stroke="#a38851" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M -12 -15 C -20 -40 0 -65 10 -40 C 0 -30 -5 -15 0 0" fill="none" stroke="#8c7340" strokeWidth="2.5" />
            {/* Cursed Sword Cane */}
            <path d="M -5 70 L -5 -30 L 5 -30 L 5 70 Z" fill="#1f1810" stroke="#c6a45a" strokeWidth="1.5" />
            {/* Golden blood flare */}
            <path d="M 0 -20 Q 20 -35 5 -60 Q -15 -35 0 -20" fill="#e5b857" opacity="0.7" />
            <circle cx="0" cy="15" r="30" fill="none" stroke="#a38851" strokeWidth="1" strokeDasharray="2 4" />
          </g>
        )

      case 'mohg':
        return (
          <g transform="translate(100, 100)">
            {/* Bloodflame halo */}
            <circle cx="0" cy="-5" r="48" fill="none" stroke="#c93832" strokeWidth="2" strokeDasharray="6 3" opacity="0.7" />
            {/* Sacred Spear / Trident */}
            <path d="M 0 75 L 0 -55" stroke="#7a1410" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M -30 -25 C -25 -50 -10 -65 0 -55 C 10 -65 25 -50 30 -25" fill="none" stroke="#c93832" strokeWidth="3" />
            <path d="M -30 -25 L -20 -65 M 30 -25 L 20 -65" stroke="#e63946" strokeWidth="2.5" />
            <polygon points="0,-75 -6,-55 6,-55" fill="#ff4d4d" />
            {/* Asymmetrical curled omen horn over eye */}
            <path d="M -15 0 C -45 5 -40 40 -10 30 C -25 25 -25 10 -15 0" fill="#3a2518" stroke="#a37e50" strokeWidth="2" />
          </g>
        )

      case 'rykard':
        return (
          <g transform="translate(100, 100)">
            {/* Magma Serpent Maw */}
            <path d="M -50 40 C -70 0 -30 -55 0 -60 C 30 -55 70 0 50 40 C 0 65 -50 40 -50 40 Z" fill="#2d0a07" stroke="#e76f51" strokeWidth="2" />
            {/* Serpentine Fangs */}
            <polygon points="-25,-20 -20,0 -15,-20" fill="#fff" />
            <polygon points="25,-20 20,0 15,-20" fill="#fff" />
            {/* Writhing Blasphemous Blade with arms */}
            <path d="M 0 -70 L 0 50" stroke="#f4a261" strokeWidth="3" />
            <path d="M -15 -30 Q -5 -40 0 -30 Q 10 -40 15 -30" stroke="#c93832" strokeWidth="2" fill="none" />
            <path d="M -18 10 Q -5 0 0 10 Q 12 0 18 10" stroke="#c93832" strokeWidth="2" fill="none" />
            <circle cx="0" cy="-10" r="14" fill="#e76f51" opacity="0.8" filter="drop-shadow(0 0 12px #ff4500)" />
          </g>
        )

      case 'godrick':
        return (
          <g transform="translate(100, 100)">
            {/* Golden Grafted Axes */}
            <path d="M -55 -40 L 40 55" stroke="#c6a45a" strokeWidth="3" />
            <path d="M -55 -40 C -75 -20 -60 10 -35 -15 Z" fill="#8c7340" stroke="#f3e5be" strokeWidth="1.5" />
            <path d="M 55 -40 L -40 55" stroke="#c6a45a" strokeWidth="3" />
            <path d="M 55 -40 C 75 -20 60 10 35 -15 Z" fill="#8c7340" stroke="#f3e5be" strokeWidth="1.5" />
            {/* Grafted Dragon Head */}
            <path d="M -15 10 C -30 25 -10 60 0 65 C 10 60 30 25 15 10 Z" fill="#382515" stroke="#d4a373" strokeWidth="2" />
            <circle cx="0" cy="35" r="6" fill="#f77f00" filter="drop-shadow(0 0 8px #f77f00)" />
          </g>
        )

      case 'rennala':
        return (
          <g transform="translate(100, 100)">
            {/* Full Moon & Amber Starlight */}
            <circle cx="0" cy="0" r="50" fill="none" stroke="#9bb1d4" strokeWidth="2" opacity="0.8" />
            <circle cx="0" cy="0" r="42" fill="#14213d" opacity="0.7" />
            <ellipse cx="12" cy="-8" rx="28" ry="38" fill="#0b132b" opacity="0.9" />
            {/* Amber Egg Core */}
            <ellipse cx="0" cy="10" rx="14" ry="20" fill="#e59866" stroke="#f8c471" strokeWidth="1.5" filter="drop-shadow(0 0 10px #e59866)" />
            {/* Carian Sorcery Sigil */}
            <polygon points="0,-65 8,-48 24,-48 11,-38 16,-22 0,-32 -16,-22 -11,-38 -24,-48 -8,-48" fill="#48cae4" opacity="0.8" />
          </g>
        )

      case 'margit':
        return (
          <g transform="translate(100, 100)">
            {/* Wooden Staff & Horn Cluster */}
            <path d="M -15 75 L 20 -65" stroke="#5c4d3c" strokeWidth="5" strokeLinecap="round" />
            {/* Golden light dagger */}
            <polygon points="-30,-10 -15,-45 5,-20" fill="#e5b857" opacity="0.85" filter="drop-shadow(0 0 6px #f3e5be)" />
            {/* Spiked Omen Horns */}
            <path d="M -40 20 Q -50 -10 -25 -25" stroke="#8c7340" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 30 15 Q 45 -15 20 -30" stroke="#8c7340" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="0" cy="5" r="28" fill="none" stroke="#a38851" strokeWidth="1" strokeDasharray="3 3" />
          </g>
        )

      case 'fire-giant':
        return (
          <g transform="translate(100, 100)">
            {/* Fell God Chest Face / Blazing Eye */}
            <circle cx="0" cy="0" r="48" fill="#2b110e" stroke="#d00000" strokeWidth="2.5" />
            <ellipse cx="0" cy="0" rx="36" ry="16" fill="#170806" stroke="#ff5a36" strokeWidth="2" />
            <circle cx="0" cy="0" r="12" fill="#ffba08" filter="drop-shadow(0 0 12px #ff4500)" />
            {/* Bronze Cauldron Rim */}
            <path d="M -60 -40 Q 0 -65 60 -40 L 50 -25 Q 0 -45 -50 -25 Z" fill="#5e2917" stroke="#b04a28" strokeWidth="1.5" />
            {/* Flames radiating */}
            <path d="M 0 50 Q 15 70 0 85 Q -15 70 0 50" fill="#ff4800" opacity="0.8" />
          </g>
        )

      case 'maliketh':
        return (
          <g transform="translate(100, 100)">
            {/* Destined Death Blade & Deathflame */}
            <path d="M -10 70 L -10 -55 L 10 -45 L 10 70 Z" fill="#191919" stroke="#b32420" strokeWidth="2" />
            {/* Swirling Deathflame Aura */}
            <path d="M -25 -20 C -40 -40 -10 -65 0 -75 C 10 -65 40 -40 25 -20 C 15 -35 0 -40 -10 -25 Z" fill="#c9184a" opacity="0.85" filter="drop-shadow(0 0 10px #ff0055)" />
            <circle cx="0" cy="-5" r="45" fill="none" stroke="#590d22" strokeWidth="1.5" strokeDasharray="4 2" />
            {/* Beast helm eye slit */}
            <path d="M -25 20 Q 0 30 25 20" stroke="#ffb703" strokeWidth="2.5" fill="none" />
          </g>
        )

      case 'godfrey-first-lord':
        return (
          <g transform="translate(100, 100)">
            {/* Giant Broken Greataxe */}
            <path d="M 0 75 L 0 -50" stroke="#7a6744" strokeWidth="4.5" />
            <path d="M 0 -45 C 45 -45 65 -15 45 20 L 0 5 Z" fill="#2d2a24" stroke="#c6a45a" strokeWidth="2" />
            {/* Serosh Lion Phantom Crest */}
            <path d="M -45 -25 C -55 -55 -20 -70 0 -60 C -15 -50 -10 -30 -30 -15 Z" fill="#3d3523" stroke="#f3e5be" strokeWidth="1.5" />
            <circle cx="0" cy="5" r="10" fill="#e8c26a" opacity="0.8" />
            <circle cx="0" cy="5" r="42" fill="none" stroke="#c6a45a" strokeWidth="1" strokeDasharray="3 4" />
          </g>
        )

      case 'radagon-elden-beast':
        return (
          <g transform="translate(100, 100)">
            {/* Golden Order Great Rune & Cosmic Beast Ribs */}
            {/* Radagon's criss-cross lattice */}
            <line x1="-40" y1="-40" x2="40" y2="40" stroke="#e8c26a" strokeWidth="2.5" />
            <line x1="40" y1="-40" x2="-40" y2="40" stroke="#e8c26a" strokeWidth="2.5" />
            <line x1="0" y1="-60" x2="0" y2="60" stroke="#f3e5be" strokeWidth="2" />
            <line x1="-60" y1="0" x2="60" y2="0" stroke="#f3e5be" strokeWidth="2" />
            {/* Elden Ring Ring Arc */}
            <circle cx="0" cy="0" r="50" fill="none" stroke="#f3e5be" strokeWidth="1.5" opacity="0.8" />
            <circle cx="0" cy="-25" r="30" fill="none" stroke="#e8c26a" strokeWidth="1.5" opacity="0.6" />
            <circle cx="0" cy="0" r="12" fill="#ffd166" opacity="0.9" filter="drop-shadow(0 0 12px #ffe699)" />
          </g>
        )

      case 'placidusax':
        return (
          <g transform="translate(100, 100)">
            {/* Twin Dragon heads and Golden Lightning */}
            <path d="M -20 50 C -50 20 -60 -30 -40 -60 C -30 -45 -35 -20 -15 10" fill="none" stroke="#d4af37" strokeWidth="3" />
            <path d="M 20 50 C 50 20 60 -30 40 -60 C 30 -45 35 -20 15 10" fill="none" stroke="#d4af37" strokeWidth="3" />
            {/* Storm vortex lightning bolts */}
            <polygon points="0,-75 8,-35 -4,-35 6,0 -8,0 0,45" fill="#f3e5be" filter="drop-shadow(0 0 8px #ffd700)" />
            <circle cx="0" cy="0" r="55" fill="none" stroke="#a38851" strokeWidth="1" strokeDasharray="4 4" />
          </g>
        )

      case 'astel':
        return (
          <g transform="translate(100, 100)">
            {/* Cosmic skull, pincers and gravity eye */}
            <path d="M -20 -10 C -45 -10 -40 -45 -15 -45 C -25 -30 -20 -20 -10 -20" fill="none" stroke="#7209b7" strokeWidth="2.5" />
            <path d="M 20 -10 C 45 -10 40 -45 15 -45 C 25 -30 20 -20 10 -20" fill="none" stroke="#7209b7" strokeWidth="2.5" />
            <circle cx="0" cy="-25" r="16" fill="#3a0ca3" stroke="#4cc9f0" strokeWidth="1.5" />
            <circle cx="0" cy="-25" r="6" fill="#f72585" filter="drop-shadow(0 0 8px #f72585)" />
            {/* Celestial bead spine */}
            <circle cx="0" cy="5" r="8" fill="#4361ee" />
            <circle cx="0" cy="25" r="7" fill="#4361ee" />
            <circle cx="0" cy="45" r="6" fill="#3f37c9" />
            <circle cx="0" cy="62" r="5" fill="#3a0ca3" />
          </g>
        )

      case 'fortissax':
        return (
          <g transform="translate(100, 100)">
            {/* Death Dragon & Crimson Death Lightning Spears */}
            <polygon points="0,-75 10,-20 -5,-20 8,35 -8,35 0,75" fill="#ff1e42" filter="drop-shadow(0 0 10px #ff0033)" />
            <polygon points="-40,-40 -25,-5 -35,-5 -20,30" fill="#c9184a" opacity="0.8" />
            <polygon points="40,-40 25,-5 35,-5 20,30" fill="#c9184a" opacity="0.8" />
            <circle cx="0" cy="0" r="52" fill="none" stroke="#590d22" strokeWidth="1.5" strokeDasharray="3 4" />
          </g>
        )

      case 'messmer':
        return (
          <g transform="translate(100, 100)">
            {/* Serpentine Fire & Impaler Spear */}
            <path d="M 0 75 L 0 -70" stroke="#c93832" strokeWidth="3" />
            <polygon points="0,-75 -8,-50 8,-50" fill="#ff4d4d" />
            {/* Coiled Serpent */}
            <path d="M -30 35 C -50 0 -20 -40 0 -35 C 25 -40 50 0 25 35 C 5 50 -15 35 -30 35" fill="none" stroke="#d00000" strokeWidth="2.5" />
            <circle cx="0" cy="-10" r="16" fill="#9d0208" opacity="0.8" />
            <circle cx="0" cy="-10" r="6" fill="#faa307" filter="drop-shadow(0 0 10px #ffba08)" />
          </g>
        )

      case 'rellana':
        return (
          <g transform="translate(100, 100)">
            {/* Twin Moons & Twin Blades (Sorcery & Flame) */}
            <circle cx="-25" cy="-25" r="22" fill="#1b2a47" stroke="#48cae4" strokeWidth="1.5" />
            <circle cx="25" cy="-25" r="22" fill="#3a110e" stroke="#e63946" strokeWidth="1.5" />
            {/* Dual crossed blades */}
            <line x1="-40" y1="50" x2="25" y2="-45" stroke="#48cae4" strokeWidth="2.5" />
            <line x1="40" y1="50" x2="-25" y2="-45" stroke="#e63946" strokeWidth="2.5" />
          </g>
        )

      case 'bayle':
        return (
          <g transform="translate(100, 100)">
            {/* Volcanic Craggy Dragon & Magma Rupture */}
            <path d="M -60 30 C -50 -30 0 -65 0 -65 C 0 -65 50 -30 60 30 C 25 20 0 50 -60 30 Z" fill="#2b0e0c" stroke="#dc2f02" strokeWidth="2" />
            <circle cx="0" cy="-15" r="16" fill="#f48c06" opacity="0.85" filter="drop-shadow(0 0 12px #e85d04)" />
            <line x1="-30" y1="-10" x2="30" y2="-10" stroke="#6a040f" strokeWidth="3" />
          </g>
        )

      case 'midra':
        return (
          <g transform="translate(100, 100)">
            {/* Frenzied Flame Sun-Orb over Spine */}
            <circle cx="0" cy="-25" r="32" fill="#dc2f02" filter="drop-shadow(0 0 18px #ffba08)" />
            <circle cx="0" cy="-25" r="18" fill="#ffdd00" />
            {/* Pierced Greatsword through body */}
            <line x1="-35" y1="45" x2="35" y2="-65" stroke="#2b2d42" strokeWidth="3.5" />
            <path d="M 0 0 L 0 65" stroke="#a37e50" strokeWidth="2" />
          </g>
        )

      default:
        return (
          <g transform="translate(100, 100)">
            {/* Intimidating Generic Elden Sigil */}
            <circle cx="0" cy="0" r="50" fill="none" stroke={theme.primary} strokeWidth="1.5" strokeDasharray="4 4" />
            <circle cx="0" cy="0" r="35" fill="none" stroke={theme.glow} strokeWidth="1" opacity="0.5" />
            <path d="M 0 -60 L 0 60" stroke={theme.primary} strokeWidth="2" />
            <path d="M -45 0 L 45 0" stroke={theme.primary} strokeWidth="2" />
            <polygon points="0,-40 28,0 0,40 -28,0" fill="none" stroke={theme.glow} strokeWidth="1.5" />
            <circle cx="0" cy="0" r="12" fill={theme.primary} opacity="0.75" />
          </g>
        )
    }
  }

  return (
    <div className={`relative aspect-[4/5] w-full overflow-hidden bg-[#070606] ${className}`}>
      {/* Intimidating Background Vignette & Gradients */}
      <div
        className="absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-65"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${theme.primary}33 0%, ${theme.secondary}99 65%, #050303 100%)`,
        }}
      />

      {/* Antique Elden Runic Watermark Pattern */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-20 transition-opacity duration-500 group-hover:opacity-35"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id={`boss-grid-${id}`} width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke={theme.primary} strokeWidth="0.5" strokeOpacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#boss-grid-${id})`} />
      </svg>

      {/* Central Boss Heraldic Vector Artwork */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <svg
          viewBox="0 0 200 200"
          className="h-full w-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-out group-hover:scale-105"
        >
          {renderBossGlyph()}
        </svg>
      </div>

      {/* Atmospheric Smoke and Edge Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0707] via-transparent to-[#0a0707]/60" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.9)]" />

      {/* Corner Bracket Accents */}
      <div
        className="pointer-events-none absolute left-2 top-2 h-4 w-4 border-l border-t transition-colors duration-500"
        style={{ borderColor: `${theme.primary}88` }}
      />
      <div
        className="pointer-events-none absolute right-2 top-2 h-4 w-4 border-r border-t transition-colors duration-500"
        style={{ borderColor: `${theme.primary}88` }}
      />
      <div
        className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 border-b border-l transition-colors duration-500"
        style={{ borderColor: `${theme.primary}88` }}
      />
      <div
        className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-b border-r transition-colors duration-500"
        style={{ borderColor: `${theme.primary}88` }}
      />

      <span className="sr-only">{name}</span>
    </div>
  )
}
