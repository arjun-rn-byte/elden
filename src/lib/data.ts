export type CategoryId = 'world' | 'characters' | 'bosses' | 'weapons' | 'lore' | 'items'

/** The archive can be read whole, or through a single wing. */
export type Filter = CategoryId | 'all'

export type GlyphId =
  | 'crown'
  | 'flame'
  | 'star'
  | 'eye'
  | 'swords'
  | 'orbit'
  | 'moon'
  | 'shield'
  | 'circle'
  | 'spark'
  | 'gem'
  | 'skull'

export type Accent = 'gold' | 'crimson' | 'moon' | 'verdant'

export interface Category {
  id: CategoryId
  numeral: string
  label: string
  title: string
  tagline: string
  description: string
  glyph: GlyphId
  accent: Accent
}

export interface Entry {
  id: string
  name: string
  epithet: string
  category: CategoryId
  numeral: string
  glyph: GlyphId
  accent: Accent
  inscription: string
  summary: string
  lore: string
  locus: string
  era: string
  standing: string
  tags: string[]
  sealed?: boolean
}

export const categories: Category[] = [
  {
    id: 'world',
    numeral: 'I',
    label: 'World',
    title: 'The Lands Between',
    tagline: 'Ground that outlived its kings',
    description:
      'Gilded capitals, drowned academies, rotten frontiers and a tree that still burns at the centre of everything.',
    glyph: 'orbit',
    accent: 'gold',
  },
  {
    id: 'characters',
    numeral: 'II',
    label: 'Characters',
    title: 'Those Who Remain',
    tagline: 'Names the Shattering would not bury',
    description:
      'Demigods, queens and apostates — and the Tarnished who inherited their unfinished argument.',
    glyph: 'crown',
    accent: 'crimson',
  },
  {
    id: 'bosses',
    numeral: 'III',
    label: 'Bosses',
    title: 'What Waits at the End',
    tagline: 'The last argument of a place',
    description:
      'Not every door is a door. Some are a trial with a name, standing between you and the next word of the story.',
    glyph: 'skull',
    accent: 'verdant',
  },
  {
    id: 'weapons',
    numeral: 'IV',
    label: 'Weapons',
    title: 'What the Hand Remembers',
    tagline: 'Steel with an opinion',
    description:
      'Blades that carry moonlight, blood or a dead god’s grievance. Each one an argument you can hold.',
    glyph: 'swords',
    accent: 'gold',
  },
  {
    id: 'lore',
    numeral: 'V',
    label: 'Lore',
    title: 'The Broken Law',
    tagline: 'What the world was told to be',
    description:
      'The Ring, the Order, the fingers that point at it. The history of the Lands Between is a sentence that was interrupted.',
    glyph: 'eye',
    accent: 'moon',
  },
  {
    id: 'items',
    numeral: 'VI',
    label: 'Items',
    title: 'What Was Left Behind',
    tagline: 'Small mercies, still working',
    description:
      'Seeds, tears, ashes and tokens. The things that keep a Tarnished walking one more road than they should.',
    glyph: 'gem',
    accent: 'gold',
  },
]

export const entries: Entry[] = [
  {
    id: 'leyndell',
    name: 'Leyndell',
    epithet: 'Royal Capital',
    category: 'world',
    numeral: 'I',
    glyph: 'crown',
    accent: 'gold',
    inscription: 'Every stone was laid as an argument for eternity.',
    summary:
      'A capital raised in the shadow of the Erdtree, where gold is law and the ramparts still hold a dragon’s wing.',
    lore: 'Leyndell climbs in terraces toward a tree with no crown in sight, its streets kept by the Golden Order’s last ceremonious guard. Pilgrims arrive expecting a promise. The archive records instead a siege that never formally ended — only paused, and dressed as peace.',
    locus: 'Altus Plateau',
    era: 'Age of the Erdtree',
    standing: 'Seat of the Golden Order',
    tags: ['Capital', 'Altus', 'Golden Order'],
  },
  {
    id: 'caelid',
    name: 'Caelid',
    epithet: 'The Scarlet Waste',
    category: 'world',
    numeral: 'II',
    glyph: 'flame',
    accent: 'crimson',
    inscription: 'The land did not fall. It was sentenced.',
    summary:
      'A green country unmade by scarlet rot, still loud with the things that grew in its place.',
    lore: 'Caelid was vineyards and watchfires until a single bloom answered a siege. Now the earth is red and soft, the fauna swollen far past its own shape, and the sky above Aeonia glows like a wound that will not close. Few survey it twice.',
    locus: 'Eastern Limgrave',
    era: 'After the Starscourge',
    standing: 'Rot-blighted waste',
    tags: ['Scarlet Rot', 'Aeonia', 'Wasteland'],
  },
  {
    id: 'nokron',
    name: 'Nokron',
    epithet: 'Eternal City',
    category: 'world',
    numeral: 'III',
    glyph: 'star',
    accent: 'moon',
    inscription: 'They made a night of their own, and were buried in it.',
    summary:
      'An Eternal City beneath Limgrave, terraced in black stone and lit by a counterfeit firmament.',
    lore: 'Nokron descends in rings toward false stars, its halls veined with silver tears and the slow drip of a drowned river. Its people sought a Lord of Night; the Greater Will answered with a falling star and a silence that has lasted ages.',
    locus: 'Beneath Limgrave',
    era: 'Before the Erdtree',
    standing: 'Sealed, half-drowned',
    tags: ['Eternal City', 'Nox', 'Silver Tears'],
  },
  {
    id: 'shadow',
    name: 'The Land of Shadow',
    epithet: 'The Occluded Realm',
    category: 'world',
    numeral: 'IV',
    glyph: 'eye',
    accent: 'verdant',
    inscription: 'The unwanted were not destroyed. They were carried.',
    summary:
      'A realm pressed flat beneath the world, kept for everything the Order could not bear to burn.',
    lore: 'The Land of Shadow is reachable only where a withered arm points the way. Its shrines keep the names of gods who were erased rather than defeated, and its fields grow gravestones the way other fields grow wheat.',
    locus: 'Beyond the Erdtree’s reach',
    era: 'Struck from record',
    standing: 'Occluded',
    tags: ['Veiled', 'Erased', 'Graves'],
  },
  {
    id: 'malenia',
    name: 'Malenia',
    epithet: 'Blade of Miquella',
    category: 'characters',
    numeral: 'V',
    glyph: 'swords',
    accent: 'crimson',
    inscription: 'She never knew defeat. She only knew what it cost.',
    summary:
      'The Blade of Miquella, whose bloom turned an entire country into a symptom.',
    lore: 'Malenia was born with rot in her blood and a promise to her twin brother that outlasted her body. At Aeonia she released the Scarlet Aeonia and ended a siege by ending the land around it. She is remembered as undefeated, which the archive notes is a different thing from victorious.',
    locus: 'The Haligtree',
    era: 'The Shattering',
    standing: 'Demigod · Empyrean',
    tags: ['Scarlet Rot', 'Haligtree', 'Undefeated'],
  },
  {
    id: 'radahn',
    name: 'Radahn',
    epithet: 'Starscourge',
    category: 'characters',
    numeral: 'VI',
    glyph: 'orbit',
    accent: 'gold',
    inscription: 'He held the stars still, and they have not forgiven him.',
    summary:
      'A general who arrested the heavens above the Lands Between, then forgot himself entirely.',
    lore: 'Radahn learned gravity as a scholar and used it as a leash, pinning the stars so that no fate could fall unbidden. The rot took his mind but not his strength; his soldiers still ride the dunes to keep him company, and the sky above Caelid waits to be released.',
    locus: 'Caelid',
    era: 'The Shattering',
    standing: 'Demigod · Starscourge',
    tags: ['Gravity', 'Redmane', 'Stars'],
  },
  {
    id: 'ranni',
    name: 'Ranni',
    epithet: 'The Snow Witch',
    category: 'characters',
    numeral: 'VII',
    glyph: 'moon',
    accent: 'moon',
    inscription: 'She killed her body to keep her will.',
    summary:
      'A Carian witch who refused the Two Fingers and chose a cold, distant order instead.',
    lore: 'Ranni is snow and porcelain and a voice that arrives from slightly behind you. She shed her flesh, stole a fragment of death, and set a thousand-year voyage in motion — so the world might be ruled by something that does not wish to be worshipped.',
    locus: 'Liurnia · Caria Manor',
    era: 'The Shattering',
    standing: 'Empyrean · Apostate',
    tags: ['Dark Moon', 'Caria', 'Age of Stars'],
  },
  {
    id: 'godfrey',
    name: 'Godfrey',
    epithet: 'First Elden Lord',
    category: 'characters',
    numeral: 'VIII',
    glyph: 'shield',
    accent: 'gold',
    inscription: 'The first lord was asked to leave, and did.',
    summary:
      'The golden lion of the first age, whose grace ended long before his strength did.',
    lore: 'Godfrey carried the Order on his shoulders and was dismissed when the Order no longer required shoulders. He took his axe and his last warriors beyond the grace of gold. This leaf of the archive is still being transcribed.',
    locus: 'The Erdtree’s court',
    era: 'First Age',
    standing: 'Elden Lord · Exiled',
    tags: ['Golden Lineage', 'Tarnished', 'Exile'],
    sealed: true,
  },
  {
    id: 'elden-beast',
    name: 'The Elden Beast',
    epithet: 'Incarnation of Order',
    category: 'bosses',
    numeral: 'IX',
    glyph: 'circle',
    accent: 'gold',
    inscription: 'Order, given a body, and asked to defend itself.',
    summary:
      'The living incarnation of the Golden Order, coiled at the heart of the Erdtree.',
    lore: 'The Elden Beast is not a creature that serves the Ring; it is the Ring’s opinion of itself. Its body is a constellation and its weapon is a sword of gathered law. Every age must, eventually, argue with it.',
    locus: 'The Erdtree’s heart',
    era: 'Before memory',
    standing: 'Vessel of the Ring',
    tags: ['Elden Ring', 'Order', 'Final Vigil'],
  },
  {
    id: 'astel',
    name: 'Astel',
    epithet: 'Naturalborn of the Void',
    category: 'bosses',
    numeral: 'X',
    glyph: 'spark',
    accent: 'moon',
    inscription: 'A star fell, and did not stop falling.',
    summary:
      'A malformed star that came to the Eternal Cities and never found a reason to leave.',
    lore: 'Astel is a child of the dark between stars, with the patience of geology and a terrible interest in small things. It nests in the deepest rot and the deepest ruin, and its remembrance is the only proof that the sky once reached down here.',
    locus: 'Lake of Rot',
    era: 'Age of the Nox',
    standing: 'Remembrance-bearer',
    tags: ['Void', 'Eternal City', 'Remembrance'],
  },
  {
    id: 'placidusax',
    name: 'Placidusax',
    epithet: 'Dragonlord',
    category: 'bosses',
    numeral: 'XI',
    glyph: 'flame',
    accent: 'crimson',
    inscription: 'The storm still answers to a name no one says.',
    summary:
      'The Dragonlord who held the world before the Erdtree, waiting outside of time.',
    lore: 'Placidusax kept the seat of Elden Lord in an age of scales and lightning. His storm is kept in a place with no horizon, and his leaf is being transcribed.',
    locus: 'Crumbling Farum Azula',
    era: 'Age of Dragons',
    standing: 'Elden Lord · Waiting',
    tags: ['Dragons', 'Storm', 'Before Gold'],
    sealed: true,
  },
  {
    id: 'elden-ring',
    name: 'The Elden Ring',
    epithet: 'The Broken Law',
    category: 'lore',
    numeral: 'XIX',
    glyph: 'gem',
    accent: 'gold',
    inscription: 'The law of the world, broken into pieces small enough to hold.',
    summary:
      'The shattered law of the Lands Between, scattered into Great Runes and grievances.',
    lore: 'The Elden Ring was never a ring of metal. It was the sentence that made the world legible, and when it broke, the shards kept their authority. To gather them is not to repair the world but to inherit the argument over what it should be.',
    locus: 'The Erdtree',
    era: 'The Shattering',
    standing: 'Fundamental · Broken',
    tags: ['Great Runes', 'Law', 'Shattering'],
  },
  {
    id: 'moonveil',
    name: 'Moonveil',
    epithet: 'Carian Katana',
    category: 'weapons',
    numeral: 'XII',
    glyph: 'swords',
    accent: 'moon',
    inscription: 'The blade remembers the moon it was forged under.',
    summary:
      'A thin, cruel blade whose drawn edge carries the cold of a distant moon.',
    lore: 'Moonveil is blue steel kept by a magistrate who had no business owning it. Its arc releases a line of moonlight that lingers a breath after the strike — proof that some relics are simply older loyalties wearing a handle.',
    locus: 'Gael Tunnel',
    era: 'Age of Caria',
    standing: 'Armament · Carian',
    tags: ['Katana', 'Caria', 'Moonlight'],
  },
  {
    id: 'rivers-of-blood',
    name: 'Rivers of Blood',
    epithet: 'Bloodsoaked Katana',
    category: 'weapons',
    numeral: 'XIII',
    glyph: 'flame',
    accent: 'crimson',
    inscription: 'A blade that asks for blood and does not much care whose.',
    summary:
      'A katana of the Bloody Finger, its edge married to fire and to a hunger that never quite closes.',
    lore: 'The weapon was never forged so much as fed. Its wielder’s oath is written in the steel, and the steel keeps asking for the same payment the oath did — one more river, one more name.',
    locus: 'Church of Repose',
    era: 'Age of the Erdtree',
    standing: 'Armament · Bloody Finger',
    tags: ['Katana', 'Fire', 'Blood'],
  },
  {
    id: 'blasphemous-blade',
    name: 'Blasphemous Blade',
    epithet: 'Sword of the Serpent',
    category: 'weapons',
    numeral: 'XIV',
    glyph: 'flame',
    accent: 'crimson',
    inscription: 'Every sin committed in its name is left glowing on the edge.',
    summary:
      'A greatsword that carries its owner’s heresy the way a candle carries a flame — proudly, and at a cost.',
    lore: 'It was made to devour, and it learned the habit well. The blade heals the hand that holds it, which is the oldest bargain in the Lands Between: strength now, and the bill delivered later.',
    locus: 'Volcano Manor',
    era: 'The Shattering',
    standing: 'Armament · Blasphemy',
    tags: ['Greatsword', 'Heresy', 'Serpent'],
  },
  {
    id: 'dark-moon',
    name: 'Dark Moon Greatsword',
    epithet: 'Moonlight Blade',
    category: 'weapons',
    numeral: 'XV',
    glyph: 'moon',
    accent: 'moon',
    inscription: 'A consort’s gift, still cold after all these years.',
    summary:
      'The Carian greatsword that holds a moon in its steel — a promise made in a language only two people spoke.',
    lore: 'Cold light gathers along the blade when it is raised, as though the moon had been waiting for permission. It is the least subtle weapon in the archive, and the most sincere.',
    locus: 'Moonlight Altar',
    era: 'Age of Caria',
    standing: 'Armament · Carian',
    tags: ['Greatsword', 'Moonlight', 'Caria'],
  },
  {
    id: 'golden-seed',
    name: 'Golden Seed',
    epithet: 'Seed of the Erdtree',
    category: 'items',
    numeral: 'XVI',
    glyph: 'spark',
    accent: 'gold',
    inscription: 'A piece of the tree, small enough to carry.',
    summary:
      'A seed shed by the Erdtree, warm to the touch, that strengthens the flask of a Tarnished who still intends to continue.',
    lore: 'The tree does not give these away. It loses them, the way anything enormous loses pieces of itself, and the ground keeps them for whoever is desperate enough to look.',
    locus: 'Scattered across the Lands Between',
    era: 'Age of the Erdtree',
    standing: 'Consumable · Sacred',
    tags: ['Erdtree', 'Flask', 'Pilgrimage'],
  },
  {
    id: 'sacred-tear',
    name: 'Sacred Tear',
    epithet: 'Tear of the Erdtree',
    category: 'items',
    numeral: 'XVII',
    glyph: 'circle',
    accent: 'gold',
    inscription: 'The tree weeps, and the weeping is worth something.',
    summary:
      'A tear fallen from the Erdtree’s boughs, used to strengthen a flask beyond what ordinary grace allows.',
    lore: 'Nothing about the Lands Between is generous, but some things are abundant. The tears are one of them; the tree has been crying for a very long time, and no one has asked it why.',
    locus: 'Churches of Marika',
    era: 'Age of the Erdtree',
    standing: 'Consumable · Sacred',
    tags: ['Erdtree', 'Flask', 'Grace'],
  },
  {
    id: 'mimic-tear',
    name: 'Mimic Tear Ashes',
    epithet: 'A Copy That Fights',
    category: 'items',
    numeral: 'XVIII',
    glyph: 'eye',
    accent: 'moon',
    inscription: 'It remembers being you, and it is not impressed.',
    summary:
      'Ashes of a silver mimic that takes your shape, your arms and your worst habits, then goes to work.',
    lore: 'The mimic is not a servant. It is a mirror that has been given a sword, and it fights with the exact carelessness you do. Watching it is the closest the archive comes to criticism.',
    locus: 'Nokron, Eternal City',
    era: 'Age of the Eternal Cities',
    standing: 'Spirit Ash · Silver',
    tags: ['Spirit', 'Nokron', 'Silver'],
  },
  {
    id: 'two-fingers',
    name: 'The Two Fingers',
    epithet: 'Voices of the Greater Will',
    category: 'lore',
    numeral: 'XX',
    glyph: 'eye',
    accent: 'moon',
    inscription: 'Two fingers, raised — and no mouth to explain why.',
    summary:
      'The enormous, silent digits that interpret the Greater Will for the Roundtable, and expect to be obeyed.',
    lore: 'They do not speak. They are read, the way weather is read, by people who have made a career of agreeing with it. Every order in the Lands Between arrives through this translation, which is why so few of them sound like mercy.',
    locus: 'Roundtable Hold',
    era: 'Age of the Erdtree',
    standing: 'Outer God · Interpreter',
    tags: ['Greater Will', 'Fingers', 'Order'],
  },

]

export const countByCategory = (id: CategoryId) =>
  entries.filter((entry) => entry.category === id).length

export interface SectionLink {
  id: string
  label: string
}

export const sections: SectionLink[] = [
  { id: 'home', label: 'The Threshold' },
  { id: 'world', label: 'World' },
  { id: 'characters', label: 'Characters' },
  { id: 'bosses', label: 'Bosses' },
  { id: 'weapons', label: 'Weapons' },
  { id: 'lore', label: 'Lore' },
  { id: 'items', label: 'Items' },
]

export const ages = [
  {
    numeral: 'I',
    name: 'The Age of the Erdtree',
    note: 'Order is founded. The Ring is whole, and the world is taught to read it.',
    span: 'Before record',
  },
  {
    numeral: 'II',
    name: 'The Shattering',
    note: 'The Ring breaks. Demigods take up shards and call them claims.',
    span: 'The long war',
  },
  {
    numeral: 'III',
    name: 'The Age of Stars',
    note: 'A thousand-year voyage. The order is carried elsewhere, and left unowned.',
    span: 'Beyond the veil',
  },
]

export const ledger = [
  { value: 9, label: 'Regions charted', suffix: '' },
  { value: 42, label: 'Figures recorded', suffix: '' },
  { value: 24, label: 'Bosses accounted', suffix: '' },
  { value: 118, label: 'Relics recovered', suffix: '' },
]
