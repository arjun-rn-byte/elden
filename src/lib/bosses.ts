export type BossCategory =
  | 'Main bosses'
  | 'Great Rune holders'
  | 'Optional bosses'
  | 'Field bosses'
  | 'Dungeon bosses'
  | 'DLC bosses'

export type BossDifficulty = 'Apex Mythic' | 'Legendary' | 'Formidable' | 'Field Threat' | 'Challenging'

export interface BossReward {
  name: string
  type: 'Remembrance' | 'Great Rune' | 'Weapon' | 'Spell' | 'Ash of War' | 'Talisman' | 'Key Item' | 'Armor'
  note?: string
}

export interface BossAbility {
  name: string
  description: string
  type: 'Physical' | 'Magic' | 'Fire' | 'Lightning' | 'Holy' | 'Bloodflame' | 'Scarlet Rot' | 'Death Blight' | 'Frenzy'
}

export interface BossRelation {
  name: string
  relation: string
  note: string
  characterId?: string
}

export interface BossEntry {
  id: string
  name: string
  title: string
  epithet: string
  category: BossCategory
  region: string
  location: string
  difficulty: BossDifficulty
  health: {
    baseHp: number | null
    phases?: string
    notes?: string
  }
  runes: number
  weaknesses: string[]
  resistances: string[]
  immunities: string[]
  rewards: BossReward[]
  lore: string
  background: string
  abilities: BossAbility[]
  relations: BossRelation[]
  accent: 'crimson' | 'gold' | 'moon' | 'verdant'
  quote?: string
}

export const bossCategories: BossCategory[] = [
  'Main bosses',
  'Great Rune holders',
  'Optional bosses',
  'Field bosses',
  'Dungeon bosses',
  'DLC bosses',
]

export const bossRegions = [
  'All Regions',
  'Limgrave',
  'Weeping Peninsula',
  'Liurnia of the Lakes',
  'Caelid',
  'Altus Plateau',
  'Mt. Gelmir',
  'Leyndell',
  'Mountaintops of the Giants',
  'Consecrated Snowfield',
  'Crumbling Farum Azula',
  'Deeproot Depths & River Wells',
  'Realm of Shadow (DLC)',
]

export const bosses: BossEntry[] = [
  // -------------------------------------------------------------------------
  // Great Rune Holders
  // -------------------------------------------------------------------------
  {
    id: 'malenia',
    name: 'Malenia, Blade of Miquella',
    title: 'Goddess of Rot',
    epithet: 'The Undefeated Swordswoman',
    category: 'Great Rune holders',
    region: 'Consecrated Snowfield',
    location: 'Elphael, Brace of the Haligtree (Roots)',
    difficulty: 'Apex Mythic',
    health: {
      baseHp: 33251,
      phases: 'Phase 1: 18,487 HP · Phase 2 (Goddess of Rot): 14,764 HP',
      notes: 'Lifesteal mechanic heals ~300-400 HP per landed hit even through 100% shields.',
    },
    runes: 480000,
    weaknesses: ['Fire', 'Frostbite', 'Bleed (Hemorrhage)', 'Stagger / Poise Break'],
    resistances: ['Immunity to Holy (40%)', 'High Magic resistance (20%)'],
    immunities: ['Scarlet Rot (Immune in Phase 2)'],
    rewards: [
      { name: 'Remembrance of the Rot Goddess', type: 'Remembrance' },
      { name: 'Malenia’s Great Rune', type: 'Great Rune', note: 'Enables rally healing after taking damage' },
      { name: 'Hand of Malenia', type: 'Weapon', note: 'Katana with Waterfowl Dance skill' },
      { name: 'Scarlet Aeonia', type: 'Spell', note: 'Incantation blooming a giant rot flower' },
    ],
    lore: 'Born an Empyrean twin to Miquella, Malenia carries the curse of the Scarlet Rot. Known as the undefeated champion of the Shattering, she bloomed in Caelid against Radahn and now slumbers beneath the roots of the Haligtree waiting for her stolen brother.',
    background: 'Mastered fencing under a blind swordsman who once sealed an ancient God of Rot. Her golden prosthetic blade and armor were forged by Miquella from unalloyed gold to stay the rot.',
    abilities: [
      { name: 'Waterfowl Dance', description: 'Leaps into the air and unleashes a three-stage flurry of hyper-sonic sword slashes across a massive radius.', type: 'Physical' },
      { name: 'Scarlet Aeonia', description: 'Dives from the sky as a colossal exploding flower that blankets the entire arena in dense Scarlet Rot mist.', type: 'Scarlet Rot' },
      { name: 'Phantom Spirits', description: 'Sends flying spectral rot clones of herself in staggered thrusts and sweeps.', type: 'Physical' },
      { name: 'Lifesteal on Hit', description: 'Every attack that makes contact restores a portion of her health gauge.', type: 'Physical' },
    ],
    relations: [
      { name: 'Miquella', relation: 'Twin Brother & Sovereign', note: 'She pledged her blade solely to Miquella’s dream of an unalloyed haven.', characterId: 'miquella' },
      { name: 'General Radahn', relation: 'Shattering Rival', note: 'Fought to a catastrophic standstill across the dunes of Caelid.', characterId: 'radahn' },
      { name: 'Millicent', relation: 'Offshoot / Daughter', note: 'Born of the Aeonian bloom, carrying Malenia’s severed dignity.', characterId: 'millicent' },
    ],
    accent: 'crimson',
    quote: 'I am Malenia, Blade of Miquella. And I have never known defeat.',
  },
  {
    id: 'radahn',
    name: 'Starscourge Radahn',
    title: 'General Radahn',
    epithet: 'Conqueror of the Stars',
    category: 'Great Rune holders',
    region: 'Caelid',
    location: 'Wailing Dunes, Redmane Castle',
    difficulty: 'Legendary',
    health: {
      baseHp: 9572,
      phases: 'Phase 1: Ground Archery & Melee · Phase 2 (50% HP): Meteor Re-entry',
      notes: 'Festival encounter allowing unlimited co-op summons across the vast battlefield.',
    },
    runes: 70000,
    weaknesses: ['Scarlet Rot', 'Pierce Damage', 'Bleed (Hemorrhage)', 'Frostbite'],
    resistances: ['Holy (40%)', 'Magic (20%)', 'Slash (10%)'],
    immunities: ['Sleep (Immune)'],
    rewards: [
      { name: 'Remembrance of the Starscourge', type: 'Remembrance' },
      { name: 'Radahn’s Great Rune', type: 'Great Rune', note: 'Increases maximum HP, FP, and Stamina by 15%' },
      { name: 'Starscourge Greatswords', type: 'Weapon', note: 'Paired colossal swords with Starcaller Cry' },
      { name: 'Lion Greatbow', type: 'Weapon', note: 'Fires Radahn’s Spears with Radahn’s Rain skill' },
    ],
    lore: 'The mightiest demigod of the Shattering, Radahn studied gravitational sorcery in Sellia so he would never have to abandon his beloved scrawny steed Leonard. He arrested the heavens, locking the movement of the stars and fate itself.',
    background: 'Inflicted with Scarlet Rot during his duel with Malenia, his mind was hollowed into feral madness, yet his subconscious will never ceased anchoring the stars.',
    abilities: [
      { name: 'Gravity Greatbow Sniping', description: 'Fires gravitational spears across immense distances with devastating tracking.', type: 'Magic' },
      { name: 'Starcaller Cry', description: 'Roars while slamming his greatswords, pulling all nearby targets toward him before detonating gravity shockwaves.', type: 'Magic' },
      { name: 'Meteor Re-entry', description: 'Launches himself into high orbit and re-enters the atmosphere as a blazing meteor crashing into the arena.', type: 'Fire' },
      { name: 'Orbital Gravitational Boulders', description: 'Summons four colossal meteors that hover beside him and sling violently forward.', type: 'Magic' },
    ],
    relations: [
      { name: 'Ranni the Witch', relation: 'Sister', note: 'His holding of the stars froze Ranni’s dark moon destiny.', characterId: 'ranni' },
      { name: 'Iron Fist Alexander', relation: 'Festival Combatant', note: 'Fought alongside the Tarnished in the great festival.', characterId: 'alexander' },
      { name: 'Praetor Rykard', relation: 'Brother', note: 'His Carian sibling before Rykard was devoured by the serpent.', characterId: 'rykard' },
    ],
    accent: 'crimson',
    quote: 'Leonard... the stars shall stay fixed till our march is done.',
  },
  {
    id: 'morgott',
    name: 'Morgott, the Omen King',
    title: 'Margit the Fell Omen',
    epithet: 'The Grace-Given Sovereign of Leyndell',
    category: 'Great Rune holders',
    region: 'Leyndell',
    location: 'Elden Throne, Royal Capital Leyndell',
    difficulty: 'Legendary',
    health: {
      baseHp: 10399,
      phases: 'Phase 1: Cane & Golden Holy Weapons · Phase 2 (60% HP): Cursed Blood Flame',
      notes: 'Can be weakened with Margit’s Shackle item twice during Phase 1.',
    },
    runes: 120000,
    weaknesses: ['Slash Damage', 'Lightning', 'Frostbite', 'Bleed (Hemorrhage)'],
    resistances: ['Holy (40%)', 'Immunity to Death Blight'],
    immunities: ['Madness (Immune)'],
    rewards: [
      { name: 'Remembrance of the Omen King', type: 'Remembrance' },
      { name: 'Morgott’s Great Rune', type: 'Great Rune', note: 'Greatly raises maximum HP by 25%' },
      { name: 'Morgott’s Cursed Sword', type: 'Weapon', note: 'Curved greatsword with cursed blood slice' },
      { name: 'Regal Omen Bairn', type: 'Key Item', note: 'Reusable tool releasing wraith spirits' },
    ],
    lore: 'Born an accursed Omen and locked in the royal sewers, Morgott loved the Erdtree regardless. During the Shattering, when all other demigods squabbled for power, he alone remained to defend the capital as the Last of the Kings.',
    background: 'Disguised his identity as Margit the Fell Omen to hunt ambitious Tarnished on the frontier roads before they could ever reach the plateau.',
    abilities: [
      { name: 'Conjured Golden Armaments', description: 'Summons spectral holy daggers, swords, giant hammers, and long spears in rapid fluid combos.', type: 'Holy' },
      { name: 'Cursed Bloodflame Burst', description: 'Releases the sealed omen blood within his cane, coating his blade in exploding bloodflame.', type: 'Bloodflame' },
      { name: 'Holy Rain of Swords', description: 'Summons golden daggers from the heavens that rain down across a wide area.', type: 'Holy' },
    ],
    relations: [
      { name: 'Mohg, Lord of Blood', relation: 'Twin Brother', note: 'Shared origins in the subterranean gaols before Mohg turned to blasphemy.', characterId: 'mohg' },
      { name: 'Godfrey', relation: 'Father', note: 'Held Morgott’s dying body on the terrace with solemn fatherly reverence.', characterId: 'godfrey' },
      { name: 'Queen Marika', relation: 'Mother', note: 'Defended her Golden Order with unrequited devotion.', characterId: 'marika' },
    ],
    accent: 'gold',
    quote: 'Thy kindled courage and thy flame of ambition... let it be put to rest.',
  },
  {
    id: 'mohg',
    name: 'Mohg, Lord of Blood',
    title: 'The Luminary of the Dynasty',
    epithet: 'Priest of the Formless Mother',
    category: 'Great Rune holders',
    region: 'Deeproot Depths & River Wells',
    location: 'Mohgwyn Dynasty Mausoleum',
    difficulty: 'Apex Mythic',
    health: {
      baseHp: 18389,
      phases: 'Phase 1: Bloodflame Rituals · Phase 2 (Tres, Duo, Unus, NIHIL!): Winged Aerial Assault',
      notes: 'Purifying Crystal Tear neutralizes his lethal three-ring blood curse ritual.',
    },
    runes: 420000,
    weaknesses: ['Bleed (Hemorrhage)', 'Physical (Standard & Strike)', 'Frostbite', 'Gravity'],
    resistances: ['Fire (80%)', 'Holy (40%)', 'Lightning (40%)'],
    immunities: ['Sleep', 'Madness'],
    rewards: [
      { name: 'Remembrance of the Blood Lord', type: 'Remembrance' },
      { name: 'Mohg’s Great Rune', type: 'Great Rune', note: 'Grants phantom blessing to summoned spirits and invaders' },
      { name: 'Mohgwyn’s Sacred Spear', type: 'Weapon', note: 'Great spear with Bloodboon Ritual' },
      { name: 'Bloodboon', type: 'Spell', note: 'Incantation casting scattered bloodflame' },
    ],
    lore: 'An Omen prince who embraced his accursed blood beneath Leyndell, discovering the Formless Mother. He absconded with Miquella’s cocoon from the Haligtree, creating an underground palace to birth a new blood dynasty.',
    background: 'Can be restrained during Phase 1 with Mohg’s Shackle. His trident bloodflame ritual is one of the most mechanically distinctive DPS checks in the game.',
    abilities: [
      { name: 'Bloodboon Ritual (NIHIL!)', description: 'Chants “Tres, Duo, Unus, NIHIL!” draining the player’s health three times to restore his own life gauge.', type: 'Bloodflame' },
      { name: 'Winged Bloodflame Dive', description: 'Sprouts black-feathered omen wings and swoops across the hall spraying boiling blood.', type: 'Fire' },
      { name: 'Spear Thrust Blood Spray', description: 'Punctures the sky into the Formless Mother’s body, splashing arena floors with lingering fire.', type: 'Bloodflame' },
    ],
    relations: [
      { name: 'Miquella', relation: 'Charmed Consort', note: 'Kept in a cocoon on the altar, unknowingly used as a gateway to the shadow realm.', characterId: 'miquella' },
      { name: 'Morgott', relation: 'Twin Brother', note: 'His twin who chose Erdtree duty while Mohg established blood heresy.', characterId: 'morgott' },
    ],
    accent: 'crimson',
    quote: 'Welcome, honoured guest, to the birthplace of our dynasty!',
  },
  {
    id: 'rykard',
    name: 'Rykard, Lord of Blasphemy',
    title: 'Praetor Rykard',
    epithet: 'The God-Devouring Serpent',
    category: 'Great Rune holders',
    region: 'Mt. Gelmir',
    location: 'Audience Pathway, Volcano Manor',
    difficulty: 'Legendary',
    health: {
      baseHp: 59174,
      phases: 'Phase 1 (God-Devouring Serpent): 30,439 HP · Phase 2 (Rykard): 28,735 HP',
      notes: 'Gimmick encounter fought exclusively with the wind-blade Serpent-Hunter great spear.',
    },
    runes: 130000,
    weaknesses: ['Serpent-Hunter Great Spear', 'Frostbite', 'Physical (Pierce)'],
    resistances: ['Fire (80%)', 'Holy (40%)', 'Magic (40%)'],
    immunities: ['Scarlet Rot (High)', 'Poison (High)'],
    rewards: [
      { name: 'Remembrance of the Blasphemous', type: 'Remembrance' },
      { name: 'Rykard’s Great Rune', type: 'Great Rune', note: 'Restores HP upon defeating enemies' },
      { name: 'Blasphemous Blade', type: 'Weapon', note: 'Greatsword with Taker’s Flames lifesteal' },
      { name: 'Rykard’s Rancor', type: 'Spell', note: 'Sorcery releasing burning cursed spirits' },
    ],
    lore: 'Praetor Rykard fed himself to the ancient immortal serpent beneath Mt. Gelmir to gain power against the gods. Joined in grotesque symbiosis, he devoured hundreds of champions into his writhing mass.',
    background: 'Fought within a cavern of boiling magma. The Serpent-Hunter spear left by ancient serpent hunters creates massive beams of light when swung inside the arena.',
    abilities: [
      { name: 'Taker’s Flames', description: 'Draws a sword coated in living human limbs and smashes forward with a volcanic fiery erupting trench.', type: 'Fire' },
      { name: 'Rain of Tormented Skulls', description: 'Darkens the cavern sky and rains hundreds of shrieking explosive flaming skulls.', type: 'Fire' },
      { name: 'Magma Spit & Serpent Bite', description: 'Lashes out with gargantuan jaws, spewing pools of boiling lava across the arena.', type: 'Physical' },
    ],
    relations: [
      { name: 'Lady Tanith', relation: 'Devoted Consort', note: 'Feasts on his severed skull following defeat in hopes of rebirthing him.', characterId: 'tanith' },
      { name: 'General Radahn', relation: 'Brother', note: 'Maintained alliances prior to succumbing to the blasphemous serpent.', characterId: 'radahn' },
      { name: 'Ranni the Witch', relation: 'Sister', note: 'Given the Blasphemous Claw by Ranni as a failsafe weapon against Maliketh.', characterId: 'ranni' },
    ],
    accent: 'crimson',
    quote: 'Join the Serpent King, as family... Together, we will devour the very gods!',
  },
  {
    id: 'godrick',
    name: 'Godrick the Grafted',
    title: 'Lord of Stormveil',
    epithet: 'The Golden Lineage’s Dregs',
    category: 'Great Rune holders',
    region: 'Limgrave',
    location: 'Stormveil Castle Courtyard',
    difficulty: 'Formidable',
    health: {
      baseHp: 6080,
      phases: 'Phase 1: Axe Sweeps & Wind Gusts · Phase 2 (50% HP): Grafted Dragon Arm',
      notes: 'Can summon Nepheli Loux and Spirit Ashes to assist.',
    },
    runes: 20000,
    weaknesses: ['Bleed (Hemorrhage)', 'Frostbite', 'Physical (Standard & Strike)'],
    resistances: ['Holy (30%)', 'Immunity to Death Blight'],
    immunities: ['Madness (Immune)'],
    rewards: [
      { name: 'Remembrance of the Grafted', type: 'Remembrance' },
      { name: 'Godrick’s Great Rune', type: 'Great Rune', note: 'Raises all attributes by +5 when active' },
      { name: 'Axe of Godrick', type: 'Weapon', note: 'Colossal greataxe with I Command Thee, Kneel!' },
      { name: 'Grafted Dragon', type: 'Weapon', note: 'Fist weapon with Bear Witness! flame spray' },
    ],
    lore: 'A distant offshoot of the Golden Lineage whose cowardly nature led him to graft countless severed limbs from slaughtered Tarnished onto his own body to imitate his forefather Godfrey’s majesty.',
    background: 'Fled Leyndell among womenfolk and was forced to beg for mercy from Malenia. Entrenched in Stormveil Castle, he hunts fresh Tarnished crossing Limgrave.',
    abilities: [
      { name: 'I Command Thee, Kneel!', description: 'Slams his dual battle axes into the dirt three times, creating massive cascading seismic shockwaves.', type: 'Physical' },
      { name: 'Dragon Flamethrower', description: 'Sweeps his grafted dragon head arm in sweeping arcs of high-temperature fire.', type: 'Fire' },
      { name: 'Storm Caller Winds', description: 'Spins his axes to envelop himself in cutting gale-force tornadoes before launching rolling projectiles.', type: 'Physical' },
    ],
    relations: [
      { name: 'Godfrey', relation: 'Ancestor', note: 'He hero-worships Godfrey, shouting to him as he amputates his arm.', characterId: 'godfrey' },
      { name: 'Nepheli Loux', relation: 'Adversary', note: 'Nepheli aids the player to bring justice for his grafting atrocities.', characterId: 'nepheli' },
    ],
    accent: 'verdant',
    quote: 'I command thee, kneel! I am the Lord of all that is golden!',
  },
  {
    id: 'rennala',
    name: 'Rennala, Queen of the Full Moon',
    title: 'Head of the Carian Royal Family',
    epithet: 'Grand Mistress of the Academy',
    category: 'Great Rune holders',
    region: 'Liurnia of the Lakes',
    location: 'Raya Lucaria Grand Library',
    difficulty: 'Formidable',
    health: {
      baseHp: 7588,
      phases: 'Phase 1 (Library Cradle): 3,493 HP · Phase 2 (Moon Illusion): 4,095 HP',
      notes: 'Phase 2 is a spectral illusion conjured by Ranni’s defensive spell.',
    },
    runes: 40000,
    weaknesses: ['Physical (Slash & Pierce: -10%)', 'Bleed (Hemorrhage)', 'Frostbite'],
    resistances: ['Magic (80%)', 'Holy (40%)', 'Fire (20%)'],
    immunities: ['Sleep (High)'],
    rewards: [
      { name: 'Remembrance of the Full Moon Queen', type: 'Remembrance' },
      { name: 'Great Rune of the Unborn', type: 'Great Rune', note: 'Unlocks character rebirth & stat respec at the library' },
      { name: 'Carian Regal Scepter', type: 'Weapon', note: 'Glintstone staff boosting full moon sorceries' },
      { name: 'Rennala’s Full Moon', type: 'Spell', note: 'Sorcery dispelling spells and lowering magic defense' },
    ],
    lore: 'The Carian queen whose stellar sorceries brought the Academy to its knees. Following Radagon’s abandonment, her heart broke and she was imprisoned within her library by rebellious scholars, clutching an amber egg.',
    background: 'Defeating her illusion unlocks the rebirth service with Larval Tears, allowing complete attribute re-allocation.',
    abilities: [
      { name: 'Rennala’s Full Moon', description: 'Ascends into a giant glowing lunar sphere that tracks the player and dispels incoming magic.', type: 'Magic' },
      { name: 'Spectral Spirit Summons', description: 'Summons phantom spirit summons of a Bloodhound Knight, giant Troll, pack of wolves, or a dragon.', type: 'Physical' },
      { name: 'Comet Azur Blast', description: 'Fires an uninterrupted concentrated beam of crystalline glintstone energy.', type: 'Magic' },
    ],
    relations: [
      { name: 'Ranni the Witch', relation: 'Daughter', note: 'Ranni wove the protective spell protecting her mother’s slumber.', characterId: 'ranni' },
      { name: 'Radagon', relation: 'Former Husband', note: 'Radagon gave her the amber egg before leaving Caria for Leyndell.', characterId: 'radagon' },
    ],
    accent: 'moon',
    quote: 'Hush, little culver. I’ll soon birth thee anew, a sweeting fresh and pure.',
  },

  // -------------------------------------------------------------------------
  // Main Bosses (Mandatory Path)
  // -------------------------------------------------------------------------
  {
    id: 'margit',
    name: 'Margit, the Fell Omen',
    title: 'The Gatekeeper of Stormveil',
    epithet: 'The First Barrier',
    category: 'Main bosses',
    region: 'Limgrave',
    location: 'Castleward Tunnel, Stormveil Approach',
    difficulty: 'Formidable',
    health: {
      baseHp: 4174,
      phases: 'Phase 1: Walking Cane Sweeps · Phase 2 (60% HP): Holy Dagger & Great Hammer',
      notes: 'Can be stunned with Margit’s Shackle purchased from Patches.',
    },
    runes: 12000,
    weaknesses: ['Slash Damage', 'Bleed (Hemorrhage)', 'Frostbite', 'Poise Stagger'],
    resistances: ['Holy (40%)', 'Immunity to Death Blight'],
    immunities: ['Madness (Immune)'],
    rewards: [
      { name: 'Talisman Pouch', type: 'Talisman', note: 'Increases talisman equipment capacity by +1' },
    ],
    lore: 'The phantom projection of Morgott guarding the approach to Stormveil Castle, testing whether newly arrived Tarnished possess the strength to pursue the Elden Ring.',
    background: 'Deliberately paced with delayed wind-up strikes designed to punish panic rolls, teaching players fundamental combat discipline.',
    abilities: [
      { name: 'Spectral Holy Daggers', description: 'Flings two rapid golden knives from his sleeve to interrupt estus healing.', type: 'Holy' },
      { name: 'Leaping Giant Hammer', description: 'Leaps high into the air and crashes down with a massive golden warhammer.', type: 'Holy' },
      { name: 'Delayed Cane Sweep', description: 'Holds his wooden walking stick aloft for unpredictable durations before whipping forward.', type: 'Physical' },
    ],
    relations: [
      { name: 'Morgott, the Omen King', relation: 'True Identity', note: 'Margit is the phantom guise Morgott uses outside the capital walls.', characterId: 'morgott' },
    ],
    accent: 'gold',
    quote: 'Someone must extinguish thy flame. Let it be Margit the Fell!',
  },
  {
    id: 'fire-giant',
    name: 'Fire Giant',
    title: 'Last of the Giants',
    epithet: 'Guardian of the Flame of Ruin',
    category: 'Main bosses',
    region: 'Mountaintops of the Giants',
    location: 'Flame Peak, Forge of the Giants',
    difficulty: 'Legendary',
    health: {
      baseHp: 42944,
      phases: 'Phase 1: Shield Sweeps & Left Leg Splint · Phase 2 (55% HP): One-Eyed God Awakening',
      notes: 'Massive health pool; Phase 1 targets the braided left ankle splint to stagger.',
    },
    runes: 180000,
    weaknesses: ['Physical (Slash & Strike)', 'Left Ankle (Phase 1)', 'Chest Eye & Wrists (Phase 2)', 'Frostbite', 'Bleed'],
    resistances: ['Fire (80%)', 'Holy (20%)', 'Magic (20%)'],
    immunities: ['Sleep (Immune)'],
    rewards: [
      { name: 'Remembrance of the Fire Giant', type: 'Remembrance' },
      { name: 'Giant’s Red Braid', type: 'Weapon', note: 'Whip with Flame Dance skill' },
      { name: 'Burn, O Flame!', type: 'Spell', note: 'Incantation creating pillars of fire' },
    ],
    lore: 'The solitary survivor of Queen Marika and Godfrey’s war of extermination against the Fire Giants, cursed to tend the immortal Flame of Ruin atop the Mountaintops forever.',
    background: 'Sacrifices his own severed left foot in Phase 2 to awaken the sleeping face of the Fell God carved into his chest.',
    abilities: [
      { name: 'Avalanche Shield Snowstorm', description: 'Scoops his colossal iron cauldron lid into the snow and flings an avalanche forward.', type: 'Physical' },
      { name: 'Fell God Fireballs', description: 'Conjures slow-drifting tracking spheres of flame that explode on proximity.', type: 'Fire' },
      { name: 'Chest Magma Eruption', description: 'Rears backward as his chest mouth spews volleys of volcanic fire across the arena.', type: 'Fire' },
    ],
    relations: [
      { name: 'Queen Marika', relation: 'Curser', note: 'Marika slew his race and bound him to tend the forge in perpetuity.', characterId: 'marika' },
      { name: 'Godfrey', relation: 'Warlord Conqueror', note: 'Godfrey conquered the giants in the first heroic age of the Erdtree.', characterId: 'godfrey' },
    ],
    accent: 'crimson',
  },
  {
    id: 'maliketh',
    name: 'Maliketh, the Black Blade',
    title: 'Beast Clergyman Gurranq',
    epithet: 'Death of the Demigods',
    category: 'Main bosses',
    region: 'Crumbling Farum Azula',
    location: 'Beside the Great Bridge',
    difficulty: 'Apex Mythic',
    health: {
      baseHp: 10620,
      phases: 'Phase 1 (Beast Clergyman): 5,310 HP · Phase 2 (Maliketh, Black Blade): 5,310 HP',
      notes: 'Phase 2 attacks reduce max HP and apply continuous percentage damage over time.',
    },
    runes: 220000,
    weaknesses: ['Physical (Standard & Pierce)', 'Frostbite', 'Bleed (Hemorrhage)'],
    resistances: ['Holy (80%)', 'Immunity to Death Blight'],
    immunities: ['Sleep', 'Madness'],
    rewards: [
      { name: 'Remembrance of the Black Blade', type: 'Remembrance' },
      { name: 'Maliketh’s Black Blade', type: 'Weapon', note: 'Colossal sword with Destined Death skill' },
      { name: 'Black Blade', type: 'Spell', note: 'Incantation spinning a blade of destined death' },
    ],
    lore: 'Queen Marika’s loyal shadowbound beast who sealed Destined Death into his sword. After Ranni stole a fragment on the Night of Black Knives, Maliketh bound the blade into his own flesh so it could never be taken again.',
    background: 'Can be parried during Phase 2 using the Blasphemous Claw when his sword glows with golden light.',
    abilities: [
      { name: 'Destined Death Slash Wave', description: 'Unleashes crimson-black energy waves that temporarily lower the target’s max HP by 10% and sap life.', type: 'Physical' },
      { name: 'Pillar Leaping Acrobatic Flurry', description: 'Leaps from pillar to pillar before spinning down with a sphere of thousands of lethal death cuts.', type: 'Physical' },
      { name: 'Bestial Claw Shards', description: 'Digs his claws into the stone, tearing up shockwaves of earth and rock.', type: 'Physical' },
    ],
    relations: [
      { name: 'Queen Marika', relation: 'Adopted Sister & Goddess', note: 'Betrayed by Marika, who shattered the Ring he sacrificed everything to guard.', characterId: 'marika' },
      { name: 'Ranni the Witch', relation: 'Thief of Death', note: 'Ranni stole his Rune fragment on the Night of Black Knives.', characterId: 'ranni' },
    ],
    accent: 'crimson',
    quote: 'O, Death. Become my blade, once more.',
  },
  {
    id: 'godfrey-first-lord',
    name: 'Godfrey, First Elden Lord',
    title: 'Hoarah Loux, Warrior',
    epithet: 'The Golden Chieftain',
    category: 'Main bosses',
    region: 'Leyndell',
    location: 'Elden Throne Terrace (Ashen Capital)',
    difficulty: 'Apex Mythic',
    health: {
      baseHp: 21903,
      phases: 'Phase 1 (Godfrey): 13,142 HP · Phase 2 (Hoarah Loux): 8,761 HP',
      notes: 'Earth-shaking arena-wide stomps must be jumped over rather than rolled through.',
    },
    runes: 300000,
    weaknesses: ['Slash Damage', 'Lightning', 'Bleed (Hemorrhage)', 'Frostbite'],
    resistances: ['Holy (40%)', 'Immune to Death Blight'],
    immunities: ['Madness (Immune)'],
    rewards: [
      { name: 'Remembrance of Hoarah Loux', type: 'Remembrance' },
      { name: 'Axe of Godfrey', type: 'Weapon', note: 'Colossal weapon with Regal Roar' },
      { name: 'Hoarah Loux’s Earthshaker', type: 'Ash of War', note: 'Shockwave roar and dual ground slam' },
    ],
    lore: 'The legendary warlord who founded the Golden Lineage alongside Marika returns from exile across the fog. At the doorstep of the Erdtree, he tests the Tarnished to determine whose crown is truly warranted by strength.',
    background: 'In Phase 2, he slays the Beast Regent Serosh with bare hands to strip away his lordly restraint and fight as the bloodthirsty warrior Hoarah Loux.',
    abilities: [
      { name: 'Arena-wide Shockwave Stomps', description: 'Stamps his foot, sending cascading golden shockwaves across the entire stone courtyard.', type: 'Physical' },
      { name: 'Hoarah Loux Powerbomb Grab', description: 'Charges forward with raw speed, tossing the player high into the air before pile-driving them into the earth.', type: 'Physical' },
      { name: 'Regal Roar', description: 'Roars with lion-like ferocity, breaking poise and charging his heavy attacks.', type: 'Physical' },
    ],
    relations: [
      { name: 'Queen Marika', relation: 'Former Wife', note: 'Marika exiled him when his battle spirit outgrew her immediate needs.', characterId: 'marika' },
      { name: 'Morgott', relation: 'Son', note: 'Held his fallen omen son with loving tenderness before confronting the Tarnished.', characterId: 'morgott' },
    ],
    accent: 'gold',
    quote: 'I’ve given thee courtesy enough. Now I fight as Hoarah Loux! Warrior!',
  },
  {
    id: 'radagon-elden-beast',
    name: 'Radagon of the Golden Order & Elden Beast',
    title: 'Radagon & The Elden Beast',
    epithet: 'Vessels of the Elden Ring',
    category: 'Main bosses',
    region: 'Leyndell',
    location: 'Inside the Erdtree, Elden Throne Core',
    difficulty: 'Apex Mythic',
    health: {
      baseHp: 35467,
      phases: 'Phase 1 (Radagon): 13,339 HP · Phase 2 (The Elden Beast): 22,127 HP',
      notes: 'Consecutive final gauntlet with no checkpoint between Radagon and the Elden Beast.',
    },
    runes: 500000,
    weaknesses: [
      'Radagon: Strike Damage, Fire',
      'Elden Beast: Physical Damage (Slash, Pierce, Strike), Glowing Chest Wound',
    ],
    resistances: ['Holy (Radagon: 80%, Elden Beast: 80% with healing absorption)'],
    immunities: ['Bleed (Immune)', 'Poison (Immune)', 'Rot (Immune)', 'Frostbite (Elden Beast)'],
    rewards: [
      { name: 'Elden Remembrance', type: 'Remembrance' },
      { name: 'Marika’s Hammer', type: 'Weapon', note: 'Hammer with Gold Breaker skill' },
      { name: 'Sacred Relic Sword', type: 'Weapon', note: 'Sword forged from Radagon’s spine with Wave of Gold' },
    ],
    lore: 'Radagon stands guard within the shattered heart of the Erdtree, wielding the hammer that both broke and attempted to mend the Ring. Upon his fall, the Elden Beast—the living incarnation of the Golden Order sent by the Greater Will—emerges from the cosmic sea.',
    background: 'The ultimate climax of the story. Torrent was later patched to be summonable during the Elden Beast fight.',
    abilities: [
      { name: 'Wave of Gold', description: 'Swings the Sacred Relic Sword, sending a rolling golden tidal wave across a colossal cone.', type: 'Holy' },
      { name: 'Elden Stars', description: 'Releases a tracking golden star projectile that constantly fires smaller piercing darts for 20 seconds.', type: 'Holy' },
      { name: 'Runic Ring Prison', description: 'Ascends into the cosmos, summoning three concentric rings that constrict and detonate.', type: 'Holy' },
      { name: 'Radagon Triple Ground Smash', description: 'Teleports with holy lightning before smashing the hammer three times with expanding rune shockwaves.', type: 'Holy' },
    ],
    relations: [
      { name: 'Queen Marika', relation: 'Other Self', note: 'Two halves of a shattered godhead imprisoned inside the Erdtree.', characterId: 'marika' },
    ],
    accent: 'gold',
    quote: 'Order, given a body, and asked to defend itself.',
  },

  // -------------------------------------------------------------------------
  // Optional Legendary & Remembrance Bosses
  // -------------------------------------------------------------------------
  {
    id: 'placidusax',
    name: 'Dragonlord Placidusax',
    title: 'The Dragonlord Outside of Time',
    epithet: 'The Ancient Elden Lord of Scales',
    category: 'Optional bosses',
    region: 'Crumbling Farum Azula',
    location: 'Heart of the Storm (Accessed by lying down in ruins)',
    difficulty: 'Apex Mythic',
    health: {
      baseHp: 26651,
      phases: 'Phase 1: Red Lightning Claws · Phase 2 (50% HP): Teleporting Cloud Sweeps & Golden Laser Beam',
      notes: 'Secret arena completely outside the flow of normal time.',
    },
    runes: 280000,
    weaknesses: ['Pierce Damage', 'Frostbite', 'Bleed (Hemorrhage)'],
    resistances: ['Lightning (40%)', 'Holy (40%)', 'Fire (40%)', 'Magic (40%)'],
    immunities: ['Sleep', 'Madness'],
    rewards: [
      { name: 'Remembrance of the Dragonlord', type: 'Remembrance' },
      { name: 'Dragon King’s Cragblade', type: 'Weapon', note: 'Heavy thrusting sword with Thundercloud Form' },
      { name: 'Placidusax’s Ruin', type: 'Spell', note: 'Incantation blasting golden laser breath' },
    ],
    lore: 'Before the age of the Erdtree and the reign of Queen Marika, Dragonlord Placidusax served as Elden Lord under an ancient Outer God that abandoned the world. He slumbers outside of time waiting for his god’s return.',
    background: 'Originally possessed four heads (two have been severed in ancient battles). Fought amid a timeless swirling tempestic vortex.',
    abilities: [
      { name: 'Placidusax’s Ruin (Golden Death Laser)', description: 'Both heads vomit sweeping twin golden laser beams that carve through the stone floor with massive explosions.', type: 'Fire' },
      { name: 'Thundercloud Divebomb', description: 'Dissolves into a black stormcloud and sweeps across the arena at supersonic speed with lightning claws.', type: 'Lightning' },
      { name: 'Red Lightning Spear Impalement', description: 'Drives a massive bolt of scarlet lightning straight into the ground, triggering a shockwave.', type: 'Lightning' },
    ],
    relations: [
      { name: 'Godfrey', relation: 'Ancient Predecessor', note: 'Held the mantle of Elden Lord long before Godfrey ever walked the Lands Between.', characterId: 'godfrey' },
    ],
    accent: 'gold',
  },
  {
    id: 'astel',
    name: 'Astel, Naturalborn of the Void',
    title: 'Naturalborn of the Void',
    epithet: 'The Malformed Star',
    category: 'Optional bosses',
    region: 'Deeproot Depths & River Wells',
    location: 'Grand Cloister (Beneath Lake of Rot)',
    difficulty: 'Legendary',
    health: {
      baseHp: 11170,
      phases: 'Single Phase: Gravitational Cosmic Attacks & Teleportation',
      notes: 'Head takes double damage; body has high defense.',
    },
    runes: 80000,
    weaknesses: ['Physical (Standard & Strike)', 'Head Weakspot (+100% damage)', 'Frostbite', 'Bleed'],
    resistances: ['Magic (40%)', 'Immunity to Scarlet Rot & Poison'],
    immunities: ['Sleep', 'Madness'],
    rewards: [
      { name: 'Remembrance of the Naturalborn', type: 'Remembrance' },
      { name: 'Bastard’s Stars', type: 'Weapon', note: 'Flail with Nebula skill' },
      { name: 'Waves of Darkness', type: 'Ash of War', note: 'Ground slam with spreading gravitational shockwaves' },
    ],
    lore: 'A malformed falling star that plummeted from the dark void between galaxies, destroying one of the Eternal Cities and robbing its people of their sky.',
    background: 'Guards the passage leading to the Moonlight Altar, required for completing Princess Ranni’s questline.',
    abilities: [
      { name: 'Cosmic Laser Beam', description: 'Snaps its jaws to charge and fire an instantaneous lightspeed cosmic ray.', type: 'Magic' },
      { name: 'Nebula Cloud Explosions', description: 'Sweeps hands to release trails of purple cosmic dust that detonate in chain explosions.', type: 'Magic' },
      { name: 'Teleportation Grab', description: 'Disappears into thin air and materializes above the player to crush them in its mandibles.', type: 'Physical' },
      { name: 'Gravity Wave Levitation', description: 'Levitates all targets into the air before slamming them violently down.', type: 'Magic' },
    ],
    relations: [
      { name: 'Ranni the Witch', relation: 'Quest Trial', note: 'Defeating Astel grants passage to Ranni’s resting place at the Cathedral of Manus Celes.', characterId: 'ranni' },
    ],
    accent: 'moon',
  },
  {
    id: 'fortissax',
    name: 'Lichdragon Fortissax',
    title: 'Lichdragon Fortissax',
    epithet: 'Friend to Godwyn the Golden',
    category: 'Optional bosses',
    region: 'Deeproot Depths & River Wells',
    location: 'Deathbed Dream, Deeproot Depths',
    difficulty: 'Legendary',
    health: {
      baseHp: 12903,
      phases: 'Single Phase: Death Lightning & Red Lightning Claws',
      notes: 'Accessed exclusively by entering Fia’s Deathbed Dream at the end of her quest.',
    },
    runes: 90000,
    weaknesses: ['Pierce Damage', 'Frostbite', 'Bleed (Hemorrhage)'],
    resistances: ['Lightning (80%)', 'Holy (40%)'],
    immunities: ['Death Blight (Immune)'],
    rewards: [
      { name: 'Remembrance of the Lichdragon', type: 'Remembrance' },
      { name: 'Fortissax’s Lightning Spear', type: 'Spell', note: 'Twin red lightning spears' },
      { name: 'Death Lightning', type: 'Spell', note: 'Storm of black-gold death lightning' },
    ],
    lore: 'When Godwyn died in soul on the Night of Black Knives, his noble ancient dragon companion Fortissax entered his corrupted spirit to fight the Death within, but was slowly transformed into a Lichdragon.',
    background: 'Defeating him allows Fia to conceive the Mending Rune of the Death-Prince.',
    abilities: [
      { name: 'Death Lightning Storm', description: 'Calls down black and crimson lightning that leaves lingering clouds of lethal Death Blight.', type: 'Death Blight' },
      { name: 'Twin Lightning Spear Slam', description: 'Conjures two massive red lightning spears in his claws and drives them into the ground.', type: 'Lightning' },
    ],
    relations: [
      { name: 'Godwyn the Golden', relation: 'Beloved Comrade', note: 'Fought to save Godwyn’s soul from corruption from within.', characterId: 'godwyn' },
      { name: 'Fia', relation: 'Dream Guardian', note: 'Fought within Fia’s slumbering deathbed consciousness.', characterId: 'fia' },
    ],
    accent: 'moon',
  },

  // -------------------------------------------------------------------------
  // Field Bosses
  // -------------------------------------------------------------------------
  {
    id: 'tree-sentinel',
    name: 'Tree Sentinel',
    title: 'The Golden Cavalier',
    epithet: 'The Outrider of Leyndell',
    category: 'Field bosses',
    region: 'Limgrave',
    location: 'First Step road, Limgrave',
    difficulty: 'Field Threat',
    health: {
      baseHp: 3249,
      phases: 'Phase 1: Halberd Horseback · Phase 2 (50% HP): Erdtree Greatshield Magic Reflection',
      notes: 'First field boss encountered right outside the Church of Elleh.',
    },
    runes: 3200,
    weaknesses: ['Lightning', 'Pierce Damage', 'Bleed (Hemorrhage)', 'Frostbite'],
    resistances: ['Holy (40%)', 'Slash (20%)'],
    immunities: ['Sleep (High)'],
    rewards: [
      { name: 'Golden Halberd', type: 'Weapon', note: 'Heavy halberd with Golden Vow' },
    ],
    lore: 'Heavily armored mounted knights of the Golden Order assigned to patrol key crossroads and highways, crushing any Tarnished who dare set foot outside their tombs.',
    background: 'Can reflect incoming magical projectiles with his Erdtree Greatshield in Phase 2.',
    abilities: [
      { name: 'Shield Bash Shockwave', description: 'Slams his horse sideways, flattening unmounted attackers with heavy poise break.', type: 'Physical' },
      { name: 'Erdtree Spell Reflection', description: 'Absorbs player spells with his golden shield and fires an amplified retaliation beam.', type: 'Holy' },
    ],
    relations: [],
    accent: 'gold',
  },
  {
    id: 'flying-dragon-agheel',
    name: 'Flying Dragon Agheel',
    title: 'The Scourge of Agheel Lake',
    epithet: 'The Wyrm of the Shallows',
    category: 'Field bosses',
    region: 'Limgrave',
    location: 'Agheel Lake, Limgrave',
    difficulty: 'Field Threat',
    health: {
      baseHp: 3192,
      phases: 'Aerial Flame Sweeps & Tail Swipes',
      notes: 'Can be engaged mounted on Torrent for superior mobility.',
    },
    runes: 5000,
    weaknesses: ['Pierce Damage to Head (+100%)', 'Frostbite', 'Bleed (Hemorrhage)'],
    resistances: ['Fire (40%)', 'Slash (20%)'],
    immunities: ['Madness'],
    rewards: [
      { name: 'Dragon Heart', type: 'Key Item', note: 'Can be traded at the Church of Dragon Communion' },
    ],
    lore: 'A predatory dragon that swoops down upon the shallows of Agheel Lake, incinerating wandering nobles who pray for wings.',
    background: 'Defeating him unlocks Agheel’s Flame at the Dragon Communion Altar.',
    abilities: [
      { name: 'Airborne Fire Sweep', description: 'Takes flight and breathes a wide carpet of fire across the water.', type: 'Fire' },
      { name: 'Tail Whip', description: 'Sweeps his tail in a 360-degree circle to punish behind-the-legs attackers.', type: 'Physical' },
    ],
    relations: [],
    accent: 'crimson',
  },
  {
    id: 'nights-cavalry',
    name: 'Night’s Cavalry',
    title: 'Harbingers of Death',
    epithet: 'Riders of Morgott',
    category: 'Field bosses',
    region: 'Limgrave',
    location: 'Bridge to Weeping Peninsula (Night Only)',
    difficulty: 'Field Threat',
    health: {
      baseHp: 1665,
      phases: 'Mounted Flail/Glaive Combat · Unmounted Recovery when steed falls',
      notes: 'Only appears in the game world during the night.',
    },
    runes: 2400,
    weaknesses: ['Lightning', 'Holy Damage', 'Bleed', 'Dismounting Steed'],
    resistances: ['Slash Damage', 'Immunity to Death Blight'],
    immunities: ['Sleep (High)'],
    rewards: [
      { name: 'Ash of War: Repeating Thrust', type: 'Ash of War' },
      { name: 'Nightrider Glaive / Flail', type: 'Weapon' },
    ],
    lore: 'Grim mounted knights led by the Omen King Morgott who stalk the highways under cover of darkness, executing champions who defy the Erdtree.',
    background: 'Killing the horse grounds the rider, making him vulnerable to a lethal critical riposte.',
    abilities: [
      { name: 'Horseback Glaive Drag', description: 'Drags his polearm through the road before launching a launching upward swing.', type: 'Physical' },
    ],
    relations: [
      { name: 'Morgott, the Omen King', relation: 'Commander', note: 'Dispatched across the Lands Between under Morgott’s direct order.', characterId: 'morgott' },
    ],
    accent: 'moon',
  },

  // -------------------------------------------------------------------------
  // Dungeon Bosses
  // -------------------------------------------------------------------------
  {
    id: 'crucible-knight',
    name: 'Crucible Knight',
    title: 'Knight of the Primordial Crucible',
    epithet: 'The Unflinching Sentinel',
    category: 'Dungeon bosses',
    region: 'Limgrave',
    location: 'Stormhill Evergaol, Limgrave',
    difficulty: 'Formidable',
    health: {
      baseHp: 2420,
      phases: 'Phase 1: Greatshield & Broadsword · Phase 2 (50% HP): Angelic Wings & Tail Sweep',
      notes: 'Does not flinch from regular attacks; teaches parrying timing.',
    },
    runes: 2100,
    weaknesses: ['Parrying', 'Fire', 'Lightning'],
    resistances: ['Holy (40%)', 'Slash (20%)', 'Pierce (20%)'],
    immunities: ['Bleed (Immune)', 'Frostbite (Immune)', 'Poison (Immune)', 'Sleep (Immune)'],
    rewards: [
      { name: 'Aspects of the Crucible: Tail', type: 'Spell', note: 'Incantation conjuring a primordial tail sweep' },
    ],
    lore: 'One of sixteen ancient knights who served First Elden Lord Godfrey, drawing upon the primordial red-tinged gold of the Crucible of Life.',
    background: 'Complete poise immunity to light attacks. In Phase 2, manifests golden ethereal dragon wings and a sweeping tail.',
    abilities: [
      { name: 'Crucible Wings Swoop', description: 'Sprouts golden dragon wings, glides across the arena with thrusting broadsword.', type: 'Physical' },
      { name: 'Aspect of the Crucible: Tail', description: 'Conjures a massive sweeping tail that sweeps 360 degrees, followed by a second longer whip.', type: 'Physical' },
    ],
    relations: [
      { name: 'Godfrey', relation: 'Original Commander', note: 'Served Godfrey before the Crucible was branded as impure by the Golden Order.', characterId: 'godfrey' },
    ],
    accent: 'gold',
  },
  {
    id: 'bloodhound-knight-darriwil',
    name: 'Bloodhound Knight Darriwil',
    title: 'The Traitorous Bloodhound',
    epithet: 'Lord of the Forlorn Hound',
    category: 'Dungeon bosses',
    region: 'Limgrave',
    location: 'Forlorn Hound Evergaol, Limgrave',
    difficulty: 'Challenging',
    health: {
      baseHp: 1450,
      phases: 'Feral Teleporting Slashing Combos',
      notes: 'Can summon Blaidd the Half-Wolf to assist if his quest is initiated.',
    },
    runes: 1800,
    weaknesses: ['Strike Damage', 'Lightning', 'Parrying'],
    resistances: ['Slash (10%)'],
    immunities: ['Sleep (High)'],
    rewards: [
      { name: 'Bloodhound’s Fang', type: 'Weapon', note: 'Legendary curved greatsword with Bloodhound’s Finesse' },
    ],
    lore: 'A disgraced Bloodhound Knight locked into an Evergaol after committing treason against Princess Ranni’s retinue.',
    background: 'Blaidd the Half-Wolf hunts Darriwil to carry out justice.',
    abilities: [
      { name: 'Bloodhound Step Teleport', description: 'Vanishes in a blur of mist to reappear instantly behind the player.', type: 'Physical' },
      { name: 'Claw Uppercut', description: 'Scrapes his curved claw against the stone before leaping into a backflip.', type: 'Physical' },
    ],
    relations: [
      { name: 'Blaidd', relation: 'Pursuer & Executioner', note: 'Blaidd tracks Darriwil to execute him for his treachery.', characterId: 'blaidd' },
    ],
    accent: 'moon',
  },
  {
    id: 'magma-wyrm-makar',
    name: 'Magma Wyrm Makar',
    title: 'The Transformed Drake',
    epithet: 'The Ruin-Strewn Precipice Guardian',
    category: 'Dungeon bosses',
    region: 'Liurnia of the Lakes',
    location: 'Ruin-Strewn Precipice (Alternative to Grand Lift of Dectus)',
    difficulty: 'Formidable',
    health: {
      baseHp: 7140,
      phases: 'Phase 1: Quadruped Magma Spew · Phase 2 (50% HP): Bipedal Greatsword Slam',
      notes: 'Can summon Great Horned Tragoth to assist.',
    },
    runes: 18000,
    weaknesses: ['Sleep', 'Physical Damage to Head (+100%)', 'Frostbite', 'Bleed'],
    resistances: ['Fire (80%)', 'Slash (20%)'],
    immunities: ['Scarlet Rot (High)'],
    rewards: [
      { name: 'Magma Wyrm’s Scalesword', type: 'Weapon', note: 'Curved greatsword with Magma Guillotine' },
      { name: 'Dragon Heart', type: 'Key Item' },
    ],
    lore: 'Humans who engaged in excessive dragon communion rituals by consuming dragon hearts eventually transformed into wingless, crawl-bound Magma Wyrms.',
    background: 'Guards the ancient mine tunnel providing secret passage up to the Altus Plateau without requiring both halves of the Dectus Medallion.',
    abilities: [
      { name: 'Magma Charge', description: 'Crawls at high speed while continuously vomiting trails of boiling lava across the cavern floor.', type: 'Fire' },
      { name: 'Bipedal Guillotine Slam', description: 'Stands erect on hind legs and brings down a massive flaming stone sword.', type: 'Physical' },
    ],
    relations: [],
    accent: 'crimson',
  },

  // -------------------------------------------------------------------------
  // DLC Bosses (Shadow of the Erdtree)
  // -------------------------------------------------------------------------
  {
    id: 'messmer',
    name: 'Messmer the Impaler',
    title: 'Lord of the Shadow Keep',
    epithet: 'The Serpent of the Crusade',
    category: 'DLC bosses',
    region: 'Realm of Shadow (DLC)',
    location: 'Shadow Keep, Scadu Altus',
    difficulty: 'Apex Mythic',
    health: {
      baseHp: 38981,
      phases: 'Phase 1: Spear Flurry & Blackflame · Phase 2 (Base Serpent Messmer): Abyssal Serpents',
      notes: 'Marika’s secret son, sealed away with an Abyssal Serpent within his right eye.',
    },
    runes: 400000,
    weaknesses: ['Slash Damage', 'Frostbite', 'Bleed (Hemorrhage)'],
    resistances: ['Fire (80%)', 'Holy (40%)'],
    immunities: ['Sleep', 'Madness'],
    rewards: [
      { name: 'Remembrance of the Impaler', type: 'Remembrance' },
      { name: 'Messmer’s Kindling', type: 'Key Item', note: 'Required to burn the sealing tree of Enir-Ilim' },
      { name: 'Spear of the Impaler', type: 'Weapon', note: 'Heavy spear with Messmer’s Assault' },
      { name: 'Messmer’s Orb', type: 'Spell', note: 'Incantation creating giant exploding orb' },
    ],
    lore: 'The elder son of Queen Marika who led the holy crusade into the Land of Shadow, incinerating the Hornsent civilization before being abandoned in the shadow realm to prevent his serpent curse from threatening the Golden Order.',
    background: 'Wears a closed seal over his eye holding back the Base Serpent. Ripping the seal off in Phase 2 awakens massive abyssal vipers.',
    abilities: [
      { name: 'Messmer’s Assault', description: 'Spins through the air with a blazing red spear, thrusting dozens of times before erupting giant spears from the earth.', type: 'Fire' },
      { name: 'Base Serpent Strike', description: 'Transforms his arms and torso into titanic abyssal serpents that strike through the floor.', type: 'Physical' },
      { name: 'Messmer’s Orb Slam', description: 'Leaps into the stratosphere before plummeting as an immense sun of red flame.', type: 'Fire' },
    ],
    relations: [
      { name: 'Queen Marika', relation: 'Mother', note: 'Cast him into the Land of Shadow and sealed his existence from history.', characterId: 'marika' },
      { name: 'Melina', relation: 'Sister', note: 'Shares her kindling vision and one sealed eye.', characterId: 'melina' },
    ],
    accent: 'crimson',
    quote: 'Mother, wouldst thou truly lordship sanction, in one so bereft of light?',
  },
  {
    id: 'rellana',
    name: 'Rellana, Twin Moon Knight',
    title: 'The Sword of the Shadow',
    epithet: 'Carian Princess of Ensis',
    category: 'DLC bosses',
    region: 'Realm of Shadow (DLC)',
    location: 'Castle Ensis, Scadu Altus Approach',
    difficulty: 'Legendary',
    health: {
      baseHp: 29704,
      phases: 'Phase 1: Dual Sword Sorcery · Phase 2 (55% HP): Moon and Fire Stance',
      notes: 'Younger sister of Queen Rennala who renounced her birthright to follow Messmer.',
    },
    runes: 240000,
    weaknesses: ['Lightning', 'Pierce Damage', 'Frostbite', 'Bleed (Hemorrhage)'],
    resistances: ['Magic (40%)', 'Fire (40%)'],
    immunities: ['Sleep (High)'],
    rewards: [
      { name: 'Remembrance of the Twin Moon Knight', type: 'Remembrance' },
      { name: 'Rellana’s Twin Blades', type: 'Weapon', note: 'Paired swords scaling with Magic & Fire' },
      { name: 'Rellana’s Twin Moons', type: 'Spell', note: 'Sorcery slamming two giant moons into the ground' },
    ],
    lore: 'Sister to Queen Rennala, Rellana renounced her Carian lineage and palace to follow Messmer into the Land of Shadow, merging Carian moon sorcery with Messmer’s flame.',
    background: 'Guards the ford gate of Castle Ensis. Can simultaneously coat one blade in blue glintstone and the other in burning flame.',
    abilities: [
      { name: 'Rellana’s Twin Moons', description: 'Leaps high and drops two colossal glowing moons that detonate with room-wide waves of lunar energy.', type: 'Magic' },
      { name: 'Flame & Magic Stance', description: 'Fires waves of glintstone arcs with right hand while whipping fire tornadoes with left.', type: 'Magic' },
    ],
    relations: [
      { name: 'Queen Rennala', relation: 'Elder Sister', note: 'Shared twin moon sorceries before Rellana departed for the crusade.', characterId: 'rennala' },
      { name: 'Messmer the Impaler', relation: 'Beloved Sovereign', note: 'Followed Messmer into exile out of unshakeable devotion.', characterId: 'messmer' },
    ],
    accent: 'moon',
    quote: 'Two moons, one knight, no negotiation.',
  },
  {
    id: 'bayle',
    name: 'Bayle the Dread',
    title: 'The Ancient Traitor Dragon',
    epithet: 'The Arch-Drake of Jagged Peak',
    category: 'DLC bosses',
    region: 'Realm of Shadow (DLC)',
    location: 'Summit of Jagged Peak',
    difficulty: 'Apex Mythic',
    health: {
      baseHp: 41612,
      phases: 'Phase 1: Magma Flame Breath · Phase 2 (50% HP): Flaming Wings & Cataclysmic Dive',
      notes: 'Can summon Igon the Dragon Hunter for iconic voicework during the duel.',
    },
    runes: 490000,
    weaknesses: ['Pierce Damage', 'Head Weakpoint (+100%)', 'Dragon-Hunter’s Great Katana'],
    resistances: ['Fire (80%)', 'Lightning (40%)'],
    immunities: ['Bleed (High)', 'Frostbite (High)'],
    rewards: [
      { name: 'Heart of Bayle', type: 'Key Item', note: 'Trade for Bayle’s Tyranny or Bayle’s Flame Lightning' },
    ],
    lore: 'The progenitor of the drakes who challenged Dragonlord Placidusax in an ancient war for dragon supremacy, severing two of Placidusax’s heads while losing his own leg and wings before retreating to Jagged Peak.',
    background: 'A brutally maimed dragon fighting with pure unbridled hatred, wielding magma lightning.',
    abilities: [
      { name: 'Bayle’s Flame Lightning Roar', description: 'Roars with apocalyptic intensity, conjuring red lightning volcanoes from the peak’s crags.', type: 'Lightning' },
      { name: 'Flaming Wing Dive', description: 'Ignites spectral wings of pure magma lightning to dive across the mountain crag.', type: 'Fire' },
    ],
    relations: [
      { name: 'Dragonlord Placidusax', relation: 'Ancient Nemesis', note: 'Bayle severed two of Placidusax’s heads in their primordial duel.', characterId: 'placidusax' },
    ],
    accent: 'crimson',
    quote: 'Curse you, Bayle! I hereby vow, you will rue this day! — Igon',
  },
  {
    id: 'dancing-lion',
    name: 'Divine Beast Dancing Lion',
    title: 'Divine Beast of Belurat',
    epithet: 'The Ritual Storm Dancer',
    category: 'DLC bosses',
    region: 'Realm of Shadow (DLC)',
    location: 'Belurat, Tower Settlement (Theatre of the Divine Beast)',
    difficulty: 'Legendary',
    health: {
      baseHp: 22896,
      phases: 'Rotates elements: Wind -> Lightning -> Frostbite',
      notes: 'Ceremonial dance performed by two Hornsent warriors inside a lion costume.',
    },
    runes: 120000,
    weaknesses: ['Fire', 'Bleed (Hemorrhage)', 'Pierce Damage'],
    resistances: ['Wind (40%)', 'Lightning (40%)', 'Frost (40%)'],
    immunities: ['Madness'],
    rewards: [
      { name: 'Remembrance of the Dancing Lion', type: 'Remembrance' },
      { name: 'Divine Beast Head', type: 'Armor', note: 'Increases Strength & Dexterity' },
      { name: 'Ash of War: Divine Beast Frost Stomp', type: 'Ash of War' },
    ],
    lore: 'An ancient Hornsent ritual invoking divine storms, performed atop Belurat’s theatre by masked performers who channel the thunder, gales, and blizzard of the heavens.',
    background: 'Dynamic boss battle that shifts the arena’s weather and environmental element every 30 seconds.',
    abilities: [
      { name: 'Thunder Dance', description: 'Calls down lightning strikes while leaping through the air with fluid acrobatic rolls.', type: 'Lightning' },
      { name: 'Blizzard Step', description: 'Freezes the arena floor with jagged spikes of frostbite ice.', type: 'Magic' },
    ],
    relations: [],
    accent: 'gold',
  },
  {
    id: 'midra',
    name: 'Midra, Lord of Frenzied Flame',
    title: 'Midra, Lord of Frenzied Flame',
    epithet: 'The Tormented Sage of the Manse',
    category: 'DLC bosses',
    region: 'Realm of Shadow (DLC)',
    location: 'Midra’s Manse, Abyssal Woods',
    difficulty: 'Legendary',
    health: {
      baseHp: 47171,
      phases: 'Phase 1 (Midra, Weakened Scholar): 5,000 HP · Phase 2 (Lord of Frenzied Flame): 42,171 HP',
      notes: 'Inflicts Madness buildup with nearly every strike in Phase 2.',
    },
    runes: 410000,
    weaknesses: ['Slash Damage', 'Pierce Damage', 'Frostbite', 'Bleed'],
    resistances: ['Fire (80%)', 'Holy (40%)'],
    immunities: ['Madness (Immune)'],
    rewards: [
      { name: 'Remembrance of the Lord of Frenzied Flame', type: 'Remembrance' },
      { name: 'Greatsword of Damnation', type: 'Weapon', note: 'Golden Greatsword with Golden Crux' },
      { name: 'Midra’s Flame of Frenzy', type: 'Spell', note: 'Incantation spraying uncontainable madness flame' },
    ],
    lore: 'A gentle scholar who endured centuries of gruesome impalement by the Hornsent in his manse. Begged by his companion Nanaya to endure, he finally succumbs to agony and decapitates himself to become a Lord of Frenzied Flame.',
    background: 'His head is replaced by the glowing, roaring sun-orb of the Frenzied Flame.',
    abilities: [
      { name: 'Frenzied Flame Geyser', description: 'Spews torrents of yellow madness flame that drive the player insane.', type: 'Frenzy' },
      { name: 'Golden Crux Impalement', description: 'Rushes forward to impale the player on a barbed golden spear before detonating.', type: 'Holy' },
    ],
    relations: [],
    accent: 'crimson',
    quote: 'The depths of your foolishness... The flame... will swallow all...',
  },
]

export const bossById = (id: string | null | undefined): BossEntry | null =>
  bosses.find((b) => b.id === id) ?? null

export const bossesByCategory = (cat: BossCategory): BossEntry[] =>
  bosses.filter((b) => b.category === cat)

export const bossesByRegion = (reg: string): BossEntry[] =>
  reg === 'All Regions' ? bosses : bosses.filter((b) => b.region.toLowerCase().includes(reg.toLowerCase()))
