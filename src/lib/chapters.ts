import { categories, entries, type Accent, type CategoryId, type GlyphId } from './data'

/** Canonical route for a chapter, e.g. `/characters`. */
export const chapterPath = (id: CategoryId | string) => `/${id}`

export const chapterIds = categories.map((category) => category.id)

export const getChapter = (slug?: string) =>
  categories.find((category) => category.id === slug) ?? null

export const entriesOf = (id: CategoryId) => entries.filter((entry) => entry.category === id)

export const chapterAfter = (id: CategoryId) => {
  const index = chapterIds.indexOf(id)
  return categories[(index + 1) % categories.length]
}

export const chapterBefore = (id: CategoryId) => {
  const index = chapterIds.indexOf(id)
  return categories[(index - 1 + categories.length) % categories.length]
}

/** Copy that belongs to the chapter page rather than to a single leaf. */
export const chapterIntros: Record<CategoryId, string[]> = {
  world: [
    'Everything in the Lands Between is downstream of a single broken sentence. The Ring was not a jewel but a grammar — the arrangement that told stone where to stand and told death when to arrive.',
    'These pages survey the ground itself: the capital that still conducts its ceremonies to nobody, the lake that keeps an academy drowned, and the frontiers where the order stopped being spoken.',
  ],
  characters: [
    'The Shattering did not produce heroes. It produced claimants — each of them certain that a shard of the law made them the law.',
    'What follows is a roll of names the archive will not retire: demigods, queens, apostates, and the first lord who was politely asked to leave and did.',
  ],
  bosses: [
    'Some places in the Lands Between end in a door, and some doors have a keeper. This chapter records the keepers.',
    'Each entry is a trial with a name attached — not a ranking, and never a strategy guide. The archive is interested in what stands there, and what it is standing on.',
  ],
  weapons: [
    'Steel in this country is never only steel. A blade is a loyalty, a heresy, or a promise that outlived the person who made it.',
    'Every armament here has been carried long enough to acquire an opinion. The archive notes the opinion.',
  ],
  lore: [
    'The Ring broke, and the world was left holding the pieces of a sentence it could no longer finish.',
    'These are the oldest entries in the book: the law, the fingers that interpret it, and the three ages the archive organises everything else around.',
  ],
  items: [
    'A Tarnished walks a very long way on very small mercies. This chapter keeps an account of them.',
    'Seeds, tears, ashes and tokens — objects that are not weapons and not relics, and without which neither would be much use.',
  ],
}

export interface GalleryPlate {
  title: string
  caption: string
  glyph: GlyphId
  accent: Accent
}

/** Drawn plates — the archive ships no photography. */
export const chapterGallery: Record<CategoryId, GalleryPlate[]> = {
  world: [
    { title: 'The Erdtree', caption: 'Drawn from the pilgrim road, at dusk', glyph: 'orbit', accent: 'gold' },
    { title: 'Altus Plateau', caption: 'Terraces, ramparts, and the long climb', glyph: 'crown', accent: 'gold' },
    { title: 'Lake of Rot', caption: 'Surveyed at a distance, and briefly', glyph: 'eye', accent: 'crimson' },
  ],
  characters: [
    { title: 'The Haligtree', caption: 'Where the blade was last seen', glyph: 'swords', accent: 'crimson' },
    { title: 'Caria Manor', caption: 'A house that keeps its own weather', glyph: 'moon', accent: 'moon' },
    { title: 'The Erdtree’s Court', caption: 'An empty throne, kept warm', glyph: 'shield', accent: 'gold' },
  ],
  bosses: [
    { title: 'Stormveil', caption: 'The gate that does not open politely', glyph: 'skull', accent: 'verdant' },
    { title: 'The Void', caption: 'A star that never finished falling', glyph: 'spark', accent: 'moon' },
    { title: 'Farum Azula', caption: 'A storm outside of time', glyph: 'flame', accent: 'crimson' },
  ],
  weapons: [
    { title: 'Carian Steel', caption: 'Moonlight held in a thin edge', glyph: 'moon', accent: 'moon' },
    { title: 'The Serpent’s Gift', caption: 'A blade that heals its holder, at cost', glyph: 'flame', accent: 'crimson' },
    { title: 'Dragon Communion', caption: 'Scales, storm, and older loyalties', glyph: 'swords', accent: 'gold' },
  ],
  lore: [
    { title: 'The Elden Ring', caption: 'The law, before it was broken', glyph: 'gem', accent: 'gold' },
    { title: 'The Two Fingers', caption: 'A translation nobody audited', glyph: 'eye', accent: 'moon' },
    { title: 'The Age of Stars', caption: 'An order carried elsewhere', glyph: 'star', accent: 'moon' },
  ],
  items: [
    { title: 'The Flask', caption: 'Crimson, and always warm', glyph: 'circle', accent: 'gold' },
    { title: 'Spirit Ashes', caption: 'Company, of a kind', glyph: 'spark', accent: 'moon' },
    { title: 'Great Runes', caption: 'Shards of a sentence', glyph: 'gem', accent: 'gold' },
  ],
}

/** Filter chips are derived from the tags actually present in the chapter. */
export const filtersOf = (id: CategoryId) => {
  const counts = new Map<string, number>()
  for (const entry of entriesOf(id)) {
    for (const tag of entry.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 5)
    .map(([label]) => label)
}
