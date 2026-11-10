interface CharacterArtworkProps {
  id: string
  name: string
  accent?: 'gold' | 'crimson' | 'moon' | 'verdant'
  className?: string
}

export function CharacterArtwork({ id, name, accent = 'gold', className = '' }: CharacterArtworkProps) {
  const getGradient = () => {
    switch (accent) {
      case 'crimson':
        return {
          primary: '#8c2822',
          secondary: '#3d0f0e',
          glow: '#d9534f',
        }
      case 'moon':
        return {
          primary: '#5d7599',
          secondary: '#1b263b',
          glow: '#9bb1d4',
        }
      case 'verdant':
        return {
          primary: '#596b43',
          secondary: '#1f2916',
          glow: '#88a368',
        }
      case 'gold':
      default:
        return {
          primary: '#c6a45a',
          secondary: '#362912',
          glow: '#f3e5be',
        }
    }
  }

  const grad = getGradient()

  return (
    <div className={`relative aspect-[3/4] w-full overflow-hidden bg-[#0a0a09] ${className}`}>
      {/* Background atmospheric gradient */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at 50% 38%, ${grad.primary}44 0%, ${grad.secondary}88 60%, #050505 100%)`,
        }}
      />

      {/* Cartographer's engraved coordinate grid overlay */}
      <svg className="absolute inset-0 h-full w-full opacity-15" aria-hidden>
        <line x1="0" y1="25%" x2="100%" y2="25%" stroke="#c6a45a" strokeWidth="0.6" strokeDasharray="2 4" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#c6a45a" strokeWidth="0.8" />
        <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#c6a45a" strokeWidth="0.6" strokeDasharray="2 4" />
        <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#c6a45a" strokeWidth="0.6" strokeDasharray="2 4" />
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#c6a45a" strokeWidth="0.8" />
        <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#c6a45a" strokeWidth="0.6" strokeDasharray="2 4" />
        <circle cx="50%" cy="40%" r="35%" fill="none" stroke="#c6a45a" strokeWidth="0.8" strokeOpacity="0.4" />
      </svg>

      {/* Unique Character Emblem Art */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <svg
          viewBox="0 0 300 400"
          className="h-full w-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Universal Halo / Ring of Order */}
          <circle cx="150" cy="150" r="100" stroke={grad.primary} strokeWidth="1.2" strokeOpacity="0.5" />
          <circle cx="150" cy="150" r="115" stroke={grad.primary} strokeWidth="0.6" strokeDasharray="4 8" strokeOpacity="0.3" />

          {/* Character-specific heraldic silhouette */}
          {id === 'marika' && (
            <g stroke={grad.glow} strokeWidth="1.8" strokeLinecap="round">
              {/* Cruciform stance of Queen Marika */}
              <line x1="150" y1="50" x2="150" y2="310" strokeWidth="2.5" />
              <line x1="60" y1="120" x2="240" y2="120" strokeWidth="2.2" />
              {/* Arched crown */}
              <path d="M120 70 Q150 40 180 70" fill="none" strokeWidth="1.5" />
              <path d="M130 90 Q150 65 170 90" fill="none" strokeWidth="1.2" />
              {/* Draped braids */}
              <path d="M135 120 C125 180 115 250 130 320" fill="none" />
              <path d="M165 120 C175 180 185 250 170 320" fill="none" />
              {/* Elden Rune Arc */}
              <path d="M90 240 Q150 290 210 240" fill="none" strokeWidth="2" />
            </g>
          )}

          {id === 'radagon' && (
            <g stroke="#d97736" strokeWidth="2" strokeLinecap="round">
              {/* Radagon's Fundamentalist Hash Lattice */}
              <line x1="110" y1="70" x2="190" y2="230" />
              <line x1="190" y1="70" x2="110" y2="230" />
              <line x1="150" y1="50" x2="150" y2="250" strokeWidth="2.5" />
              <line x1="80" y1="150" x2="220" y2="150" strokeWidth="2" />
              {/* Hammer of Marika */}
              <rect x="135" y="270" width="30" height="18" fill="#c6a45a" stroke="#f3e5be" />
              <line x1="150" y1="288" x2="150" y2="350" stroke="#f3e5be" strokeWidth="3" />
            </g>
          )}

          {id === 'godfrey' && (
            <g stroke="#e2b96f" strokeWidth="2">
              {/* Great Battle Axe Silhouette */}
              <line x1="150" y1="50" x2="150" y2="350" strokeWidth="3.5" />
              {/* Broad axe blades */}
              <path d="M150 80 C90 60 70 140 150 160 Z" fill="#2a1f10" />
              <path d="M150 80 C210 60 230 140 150 160 Z" fill="#2a1f10" />
              {/* Serosh lion mane crest */}
              <path d="M100 200 C80 230 110 280 150 260 C190 280 220 230 200 200" fill="none" strokeWidth="1.6" />
            </g>
          )}

          {id === 'godwyn' && (
            <g stroke="#f3e5be" strokeWidth="1.8">
              {/* Radiant Prince halo */}
              <circle cx="150" cy="130" r="45" fill="#262114" />
              {/* Golden Dragon Lightning bolts */}
              <path d="M150 60 L140 110 L165 115 L145 180" stroke="#ffd166" strokeWidth="2.4" />
              {/* Deathroot creep below */}
              <path d="M120 260 C130 290 110 320 90 350" stroke="#525c68" strokeWidth="2" />
              <path d="M150 270 C160 300 150 330 150 360" stroke="#525c68" strokeWidth="2" />
              <path d="M180 260 C170 290 190 320 210 350" stroke="#525c68" strokeWidth="2" />
            </g>
          )}

          {id === 'morgott' && (
            <g stroke="#c6a45a" strokeWidth="1.8" strokeLinecap="round">
              {/* Curved Omen horns */}
              <path d="M130 110 C100 80 80 40 110 20 C130 30 135 70 140 90" fill="#17140e" />
              <path d="M170 110 C200 80 220 40 190 20 C170 30 165 70 160 90" fill="#17140e" />
              {/* Cloaked hood */}
              <path d="M110 120 C130 90 170 90 190 120 L210 240 L90 240 Z" fill="#12110e" />
              {/* Cane of the Omen King */}
              <line x1="210" y1="130" x2="230" y2="350" stroke="#e8c278" strokeWidth="2.8" />
            </g>
          )}

          {id === 'mohg' && (
            <g stroke="#c93832" strokeWidth="2">
              {/* Single piercing horn through eye */}
              <path d="M130 120 C90 70 110 30 150 15 C145 50 140 80 140 110" fill="#240c0b" />
              {/* Sacred Spear of the Mohgwyn Dynasty (Trident) */}
              <line x1="150" y1="60" x2="150" y2="350" strokeWidth="3" />
              <line x1="120" y1="80" x2="120" y2="140" strokeWidth="2" />
              <line x1="180" y1="80" x2="180" y2="140" strokeWidth="2" />
              <path d="M120 140 C120 170 180 170 180 140" fill="none" />
              {/* Bloodflame arc */}
              <path d="M90 260 Q150 220 210 260" stroke="#ff4d4d" strokeWidth="2" />
            </g>
          )}

          {id === 'malenia' && (
            <g stroke="#c74136" strokeWidth="2">
              {/* Winged Helm silhouette */}
              <path d="M110 100 C90 60 70 40 60 20 C90 35 120 60 130 90 Z" fill="#c6a45a" stroke="#f3e5be" />
              <path d="M190 100 C210 60 230 40 240 20 C210 35 180 60 170 90 Z" fill="#c6a45a" stroke="#f3e5be" />
              {/* Slender golden helmet brow */}
              <path d="M125 100 Q150 85 175 100 L165 140 Q150 150 135 140 Z" fill="#c6a45a" stroke="#f3e5be" />
              {/* Hand of Malenia blade */}
              <line x1="220" y1="90" x2="100" y2="360" stroke="#f3e5be" strokeWidth="2.2" />
              {/* Rot Bloom petals */}
              <circle cx="150" cy="240" r="30" stroke="#e65c5c" strokeDasharray="6 6" fill="none" />
            </g>
          )}

          {id === 'miquella' && (
            <g stroke="#ecd9a6" strokeWidth="1.8">
              {/* Twin golden braids */}
              <path d="M125 80 C110 140 100 220 115 300" fill="none" strokeWidth="2.2" />
              <path d="M175 80 C190 140 200 220 185 300" fill="none" strokeWidth="2.2" />
              {/* Unalloyed Needle halo */}
              <circle cx="150" cy="110" r="40" stroke="#ffd97d" strokeWidth="1.6" fill="none" />
              <line x1="150" y1="40" x2="150" y2="180" stroke="#ffd97d" strokeWidth="2" />
              {/* Haligtree crown */}
              <path d="M110 70 Q150 30 190 70" fill="none" />
            </g>
          )}

          {id === 'radahn' && (
            <g stroke="#d96941" strokeWidth="2">
              {/* Colossal horned general helmet */}
              <path d="M90 90 L130 130 L170 130 L210 90 L180 60 L150 40 L120 60 Z" fill="#30160d" />
              {/* Red mane crest */}
              <path d="M110 50 Q150 10 190 50" stroke="#e04836" strokeWidth="3" fill="none" />
              {/* Crossed Starscourge curved greatswords */}
              <path d="M70 160 Q110 240 190 330" stroke="#c6a45a" strokeWidth="4" />
              <path d="M230 160 Q190 240 110 330" stroke="#c6a45a" strokeWidth="4" />
              {/* Gravitational purple ring */}
              <circle cx="150" cy="240" r="40" stroke="#9d4edd" strokeWidth="1.8" strokeDasharray="3 6" fill="none" />
            </g>
          )}

          {id === 'ranni' && (
            <g stroke="#8daed6" strokeWidth="1.8">
              {/* Wide witch brim hat */}
              <ellipse cx="150" cy="120" rx="95" ry="24" fill="#0c1726" stroke="#9bbfe0" strokeWidth="1.6" />
              <path d="M95 115 L150 30 L205 115 Z" fill="#0d1b2a" stroke="#9bbfe0" strokeWidth="1.8" />
              {/* Dark Moon crescent */}
              <path d="M130 190 A35 35 0 0 0 170 230 A30 30 0 0 1 130 190 Z" fill="#d9e6f2" stroke="none" />
              {/* Four spectral arms */}
              <path d="M80 180 Q110 210 130 220" />
              <path d="M220 180 Q190 210 170 220" />
              <path d="M70 230 Q110 250 130 270" />
              <path d="M230 230 Q190 250 170 270" />
            </g>
          )}

          {id === 'rykard' && (
            <g stroke="#c94b32" strokeWidth="2">
              {/* Great serpent jaws */}
              <path d="M100 130 Q150 70 200 130 Q150 210 100 130 Z" fill="#1c0b08" />
              <path d="M120 130 Q150 105 180 130" fill="none" stroke="#f0803c" />
              {/* Magma blades & spikes */}
              <line x1="80" y1="210" x2="220" y2="290" stroke="#ff7b00" strokeWidth="3" />
              <line x1="220" y1="210" x2="80" y2="290" stroke="#ff7b00" strokeWidth="3" />
            </g>
          )}

          {id === 'godrick' && (
            <g stroke="#9cae7d" strokeWidth="1.8">
              {/* Grafted crown & axe */}
              <circle cx="150" cy="120" r="35" fill="#1a1c15" />
              <path d="M130 80 L140 100 L150 75 L160 100 L170 80" stroke="#c6a45a" strokeWidth="2" />
              {/* Multi-limbed array */}
              <line x1="150" y1="160" x2="90" y2="230" strokeWidth="2.5" />
              <line x1="150" y1="160" x2="210" y2="230" strokeWidth="2.5" />
              <line x1="150" y1="190" x2="70" y2="270" strokeWidth="2" />
              <line x1="150" y1="190" x2="230" y2="270" strokeWidth="2" />
              {/* Dragon head forearm */}
              <path d="M60 270 C50 250 70 230 90 250 Z" fill="#242116" stroke="#c6a45a" />
            </g>
          )}

          {id === 'melina' && (
            <g stroke="#e5c88b" strokeWidth="1.8">
              {/* Hooded traveler mantle */}
              <path d="M100 110 Q150 70 200 110 L220 280 L80 280 Z" fill="#14120e" stroke="#c6a45a" />
              {/* One closed eye with talon beast claw */}
              <path d="M135 150 Q145 142 155 150" stroke="#f3e5be" strokeWidth="2" />
              <path d="M165 145 L175 160 L185 145" stroke="#a472a8" strokeWidth="1.5" />
              {/* Flame of Kindling in hand */}
              <path d="M150 220 Q140 200 150 185 Q160 200 150 220 Z" fill="#ff9f43" stroke="#ff5252" />
            </g>
          )}

          {id === 'blaidd' && (
            <g stroke="#9ab2cc" strokeWidth="2">
              {/* Wolf snout and pointed ears */}
              <path d="M110 90 L120 40 L140 80 L160 80 L180 40 L190 90 L150 145 Z" fill="#121821" stroke="#9bbfe0" />
              {/* Royal Carian Greatsword on back */}
              <line x1="90" y1="60" x2="210" y2="330" stroke="#c6a45a" strokeWidth="3.5" />
              {/* Fur mantle collar */}
              <path d="M90 140 Q150 180 210 140 L220 220 L80 220 Z" fill="#0d1117" />
            </g>
          )}

          {id === 'alexander' && (
            <g stroke="#c6a45a" strokeWidth="2.2">
              {/* Living Warrior Jar vessel */}
              <path d="M110 110 L190 110 L220 180 C220 250 80 250 80 180 Z" fill="#241b12" stroke="#d4af37" />
              {/* Red wax seal lid */}
              <ellipse cx="150" cy="110" rx="42" ry="12" fill="#8f2d27" stroke="#b23a32" />
              {/* Knotted rope handles */}
              <path d="M80 160 C60 170 60 190 80 200" stroke="#c6a45a" />
              <path d="M220 160 C240 170 240 190 220 200" stroke="#c6a45a" />
              {/* Heroic battle stance fists */}
              <circle cx="70" cy="240" r="14" fill="#1f1810" stroke="#d4af37" />
              <circle cx="230" cy="240" r="14" fill="#1f1810" stroke="#d4af37" />
            </g>
          )}

          {id === 'millicent' && (
            <g stroke="#c74b40" strokeWidth="1.8">
              {/* Valkyrie Prosthetic Arm */}
              <line x1="210" y1="140" x2="210" y2="280" stroke="#f3e5be" strokeWidth="3" />
              <path d="M205 280 L215 280 L210 320 Z" fill="#f3e5be" stroke="#c6a45a" />
              {/* Single Unalloyed needle */}
              <line x1="150" y1="70" x2="150" y2="230" stroke="#ffd166" strokeWidth="2" />
              <circle cx="150" cy="70" r="8" fill="#ffd166" />
              {/* Flowing traveler cloak */}
              <path d="M110 130 C100 190 120 260 140 310" fill="none" stroke="#8c332c" />
            </g>
          )}

          {id === 'fia' && (
            <g stroke="#7b92ab" strokeWidth="1.8">
              {/* Deathbed veil mantle */}
              <path d="M110 100 Q150 70 190 100 L210 320 L90 320 Z" fill="#0d1117" />
              {/* Half of Cursemark of Death (Centipede) */}
              <path d="M150 170 C130 180 130 210 150 220 C170 230 170 260 150 270" stroke="#90a4ae" strokeWidth="2.5" fill="none" />
              <line x1="130" y1="180" x2="170" y2="180" stroke="#90a4ae" strokeWidth="1.5" />
              <line x1="130" y1="220" x2="170" y2="220" stroke="#90a4ae" strokeWidth="1.5" />
              <line x1="130" y1="260" x2="170" y2="260" stroke="#90a4ae" strokeWidth="1.5" />
            </g>
          )}

          {id === 'dung-eater' && (
            <g stroke="#913a30" strokeWidth="2">
              {/* Grotesque Omen Armor with sawed-off horns */}
              <circle cx="150" cy="110" r="32" fill="#1c0f0a" />
              {/* Sun crest medallion */}
              <circle cx="150" cy="190" r="28" fill="#a66e28" stroke="#ffbe0b" />
              <line x1="150" y1="150" x2="150" y2="230" stroke="#ffbe0b" strokeWidth="2.5" />
              <line x1="110" y1="190" x2="190" y2="190" stroke="#ffbe0b" strokeWidth="2.5" />
              {/* Sword of Milos spine weapon */}
              <line x1="210" y1="110" x2="230" y2="340" stroke="#a33b32" strokeWidth="3.2" strokeDasharray="8 4" />
            </g>
          )}

          {/* Golden base plinth */}
          <line x1="60" y1="360" x2="240" y2="360" stroke="#c6a45a" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="80" y1="366" x2="220" y2="366" stroke="#c6a45a" strokeWidth="0.6" strokeOpacity="0.3" />
        </svg>
      </div>

      {/* Name and epithet bottom titleplate */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/90 to-transparent p-4 text-center">
        <p className="font-inscribed text-[8px] uppercase tracking-[0.28em] text-gold/60">Archive Portrait</p>
        <p className="mt-0.5 font-display text-[14px] text-bone/90">{name}</p>
      </div>
    </div>
  )
}
