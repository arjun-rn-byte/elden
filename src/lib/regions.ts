import type { Accent, GlyphId } from './data'

/**
 * The World atlas. Three plates — the surface, the underworld and the shadow —
 * each holding the regions charted on it. Coordinates are percentages of the
 * plate, so a marker sits in the same place at every screen size and zoom.
 *
 * Everything a region knows lives here. Replacing this file with accurate
 * survey data is enough: the map, the index, the filters and the dossier are
 * all derived from it.
 */

export type StratumId = 'surface' | 'underworld' | 'shadow'

export interface Stratum {
  id: StratumId
  plate: string
  label: string
  short: string
  title: string
  note: string
  dlc?: boolean
}

export const strata: Stratum[] = [
  {
    id: 'surface',
    plate: 'Plate I',
    label: 'The Surface',
    short: 'Surface',
    title: 'Above the roots',
    note: 'The first chart. Nine regions, from the southern cape to the frozen north, drawn by whoever walked out again.',
  },
  {
    id: 'underworld',
    plate: 'Plate II',
    label: 'The Underworld',
    short: 'Under',
    title: 'Beneath the roots',
    note: 'Four regions held under the surface. The wells go down further than the survey does.',
  },
  {
    id: 'shadow',
    plate: 'Plate III',
    label: 'Shadow of the Erdtree',
    short: 'Shadow',
    title: 'The shadow realm',
    note: 'Seven regions charted after the crossing. Filed separately: the shadow is not on the first chart, and does not answer to it.',
    dlc: true,
  },
]

export interface RegionNote {
  name: string
  note: string
}

export interface AtlasRegion {
  id: string
  name: string
  epithet: string
  stratum: StratumId
  /** Position on the plate, in percent. */
  x: number
  y: number
  ref: string
  depth: string
  glyph: GlyphId
  accent: Accent
  tags: string[]
  description: string
  survey: string
  places: RegionNote[]
  bosses: RegionNote[]
  npcs: RegionNote[]
}

export const regions: AtlasRegion[] = [
  // ---------------------------------------------------------------- surface
  {
    id: 'limgrave',
    name: 'Limgrave',
    epithet: 'The first green country',
    stratum: 'surface',
    x: 30,
    y: 62,
    ref: 'I · 01',
    depth: 'Surface · the coast road',
    glyph: 'orbit',
    accent: 'verdant',
    tags: ['Coast', 'Threshold', 'Ruins'],
    description:
      'The archive begins where most journeys do: on a green shelf above the sea, with the ruined chapel behind you and a castle ahead that has never once opened its gate politely. Limgrave is generous with grass and stingy with answers — broken walls, grazing sheep, and a wind that carries the smell of rain and old smoke.',
    survey:
      'Walked from the Gatefront to the Mistwood and back. The country is kinder than its landlord.',
    places: [
      { name: 'Stormveil Castle', note: 'Gatehouse, ramparts, and a stair that only goes up' },
      { name: 'Church of Elleh', note: 'A merchant, a grace, and the first kindness offered' },
      { name: 'Gatefront Ruins', note: 'A garrison that lost the argument and kept the wall' },
      { name: 'Mistwood', note: 'Where the howling comes from, and does not stop' },
    ],
    bosses: [
      { name: 'Margit, the Fell Omen', note: 'The first argument the country makes' },
      { name: 'Godrick the Grafted', note: 'A lord assembled from his applicants' },
      { name: 'Tree Sentinel', note: 'Patrols the first field, unhurried, forever' },
    ],
    npcs: [
      { name: 'Melina', note: 'An offer of company, made at a grace' },
      { name: 'White Mask Varré', note: 'Too friendly about it, and correct' },
      { name: 'Boc the Seamster', note: 'A tailor in a cave, ashamed of his hands' },
    ],
  },
  {
    id: 'weeping-peninsula',
    name: 'Weeping Peninsula',
    epithet: 'A coast that grieves quietly',
    stratum: 'surface',
    x: 26,
    y: 82,
    ref: 'I · 02',
    depth: 'Surface · the southern cape',
    glyph: 'eye',
    accent: 'verdant',
    tags: ['Coast', 'Peninsula', 'Rain'],
    description:
      'South of the starting road the weather turns. Rain moves in from the sea in long grey curtains, and the peninsula keeps its griefs small and well-kept: a castle holding a siege it lost years ago, a village that went mad politely, and a church where pilgrims still leave things nobody collects.',
    survey:
      'Charted in three days of rain. Ink ran; the coastline is therefore approximate and the castle is exact.',
    places: [
      { name: 'Castle Morne', note: 'A garrison still standing its post for a lord who left' },
      { name: 'Church of Pilgrimage', note: 'Offerings at the door, none of them new' },
      { name: 'Ailing Village', note: 'The madness here is quiet and extremely well mannered' },
      { name: 'Tombsward Catacombs', note: 'The dead are filed, not buried' },
    ],
    bosses: [
      { name: 'Leonine Misbegotten', note: 'Holds the castle out of habit, not loyalty' },
      { name: 'Erdtree Avatar', note: 'A guardian grown enormous and tired' },
      { name: 'Ancient Hero of Zamor', note: 'Come a long way south to guard nothing' },
    ],
    npcs: [
      { name: 'Irina', note: 'Waiting at the road for a letter that will not arrive' },
      { name: 'Edgar', note: 'A knight who chose the castle over the daughter' },
      { name: 'Merchant of the Church', note: 'Sells to pilgrims, and to what is left of them' },
    ],
  },
  {
    id: 'liurnia',
    name: 'Liurnia of the Lakes',
    epithet: 'The academy under water',
    stratum: 'surface',
    x: 30,
    y: 38,
    ref: 'I · 03',
    depth: 'Surface · the drowned basin',
    glyph: 'moon',
    accent: 'moon',
    tags: ['Lakes', 'Sorcery', 'Academy'],
    description:
      'A whole province half-sunk in cold water, with the academy standing in the middle of it like a held breath. Liurnia is the archive of an argument between two kinds of magic, and the loser wrote the shoreline. Everything here is either flooded, levitating, or politely refusing to explain itself.',
    survey:
      'Surveyed by boat and by ladder. The academy was measured from the outside; nobody inside would hold still.',
    places: [
      { name: 'Raya Lucaria Academy', note: 'Library, debate hall, and a very large locked door' },
      { name: 'Caria Manor', note: 'A house that keeps its own weather and its own opinions' },
      { name: 'Village of the Albinaurics', note: 'A settlement the order does not list' },
      { name: 'Moonlight Altar', note: 'Where the moon is treated as a jurisdiction' },
    ],
    bosses: [
      { name: 'Rennala, Queen of the Full Moon', note: 'Still teaching a class that ended long ago' },
      { name: 'Red Wolf of Radagon', note: 'Guards the corridor, and the memory in it' },
      { name: 'Royal Knight Loretta', note: 'Rides the shallow water as though it were a road' },
      { name: 'Glintstone Dragon Adula', note: 'Sleeps on the roof of a scholarly dispute' },
    ],
    npcs: [
      { name: 'Ranni the Witch', note: 'Speaks in half-sentences, all of them binding' },
      { name: 'Blaidd', note: 'A shadow with manners and a very large sword' },
      { name: 'Iji', note: 'A smith who would rather you did not thank him' },
      { name: 'Thops', note: 'A student locked out of the only place he belonged' },
    ],
  },
  {
    id: 'caelid',
    name: 'Caelid',
    epithet: 'The country the rot kept',
    stratum: 'surface',
    x: 76,
    y: 52,
    ref: 'I · 04',
    depth: 'Surface · the eastern frontier',
    glyph: 'flame',
    accent: 'crimson',
    tags: ['Scarlet rot', 'Frontier', 'Wasteland'],
    description:
      'Something burned here that was not fire, and the country has been standing in the aftermath ever since. Caelid is red, wet, and loud: a landscape of swollen trees and patient monstrosities, holding a festival in a castle that expects you to attend.',
    survey:
      'Crossed once, quickly. The rot does not respect a survey, and the survey did not argue.',
    places: [
      { name: 'Redmane Castle', note: 'The festival ground, and the general it honours' },
      { name: 'Sellia, Town of Sorcery', note: 'Streets that hide themselves out of habit' },
      { name: 'Aeonia Swamp', note: 'The bloom, and everything that grew around it' },
      { name: 'Bestial Sanctum', note: 'A beast, a bridge, and an unrecorded appetite' },
    ],
    bosses: [
      { name: 'Starscourge Radahn', note: 'Holding the sky down with what is left of him' },
      { name: 'Commander O\'Neil', note: 'Still commanding a regiment of rot' },
      { name: 'Black Blade Kindred', note: 'Guards the sanctum against visitors and reason' },
    ],
    npcs: [
      { name: 'Gowry', note: 'A hermit with a long plan and a short patience' },
      { name: 'Millicent', note: 'Ill, courteous, and not asking for pity' },
      { name: 'Gurranq, Beast Clergyman', note: 'Hungry for deathroot, and honest about it' },
    ],
  },
  {
    id: 'altus-plateau',
    name: 'Altus Plateau',
    epithet: 'The plateau that kept its manners',
    stratum: 'surface',
    x: 48,
    y: 33,
    ref: 'I · 05',
    depth: 'Surface · the high road',
    glyph: 'crown',
    accent: 'gold',
    tags: ['Highlands', 'Roads', 'Gold'],
    description:
      'The climb to the capital is a long introduction, and the plateau is where the country starts dressing for it. Wide roads, older statues, and a gold light that makes even the ruins look appointed. Everything here is on the way to somewhere more important, and knows it.',
    survey:
      'Followed the highway from the lift to the capital gate. The road is intact. The reasons for it are not.',
    places: [
      { name: 'Grand Lift of Dectus', note: 'The only door between the low country and the high' },
      { name: 'Altus Highway Junction', note: 'A crossroads with a very good view of the war' },
      { name: 'Shaded Castle', note: 'A house of thorns and a knight who married into them' },
      { name: 'Perfumer\'s Ruins', note: 'Sweet air, in the way a warning is sweet' },
    ],
    bosses: [
      { name: 'Ancient Dragon Lansseax', note: 'Arrives as weather, leaves as a verdict' },
      { name: 'Elemer of the Briar', note: 'The castle\'s lord, and its thorn' },
      { name: 'Godskin Apostle', note: 'Holds court in a village that is still dancing' },
    ],
    npcs: [
      { name: 'Corhyn', note: 'A monk reading a law that has stopped answering' },
      { name: 'Goldmask', note: 'Standing very still, working something out' },
      { name: 'Millicent', note: 'Resting at the gazing hill, going the same way you are' },
    ],
  },
  {
    id: 'mt-gelmir',
    name: 'Mt. Gelmir',
    epithet: 'The mountain that eats armies',
    stratum: 'surface',
    x: 36,
    y: 42,
    ref: 'I · 06',
    depth: 'Surface · the volcano road',
    glyph: 'flame',
    accent: 'crimson',
    tags: ['Volcano', 'Manor', 'Heresy'],
    description:
      'A volcano with a household. The road up is littered with the armies that tried it, and the manor at the top has turned hospitality into a doctrine. Gelmir is where the archive keeps its heresies: careful, well-catered, and entirely serious about the serpent.',
    survey:
      'Climbed by the pilgrim path. The manor received the survey kindly. The survey declined dinner.',
    places: [
      { name: 'Volcano Manor', note: 'Dining hall, guest book, and a long list of requirements' },
      { name: 'Road of Iniquity', note: 'The approach, lined with unsuccessful visitors' },
      { name: 'Seethewater Cave', note: 'Warm rock and a tenant that does not take questions' },
      { name: 'Hermit Village', note: 'A settlement that stayed after the mountain woke' },
    ],
    bosses: [
      { name: 'Rykard, Lord of Blasphemy', note: 'Fed until he became the argument' },
      { name: 'God-Devouring Serpent', note: 'The appetite, wearing a hall' },
      { name: 'Magma Wyrm', note: 'A dragon that went into the mountain and came back wrong' },
    ],
    npcs: [
      { name: 'Tanith', note: 'Châtelaine, hostess, and true believer' },
      { name: 'Rya', note: 'A scout with excellent manners and a secret' },
      { name: 'Diallos', note: 'A younger son looking for a worthier house' },
      { name: 'Bernahl', note: 'A knight who has stopped pretending to be decent' },
    ],
  },
  {
    id: 'leyndell',
    name: 'Leyndell, Royal Capital',
    epithet: 'The capital that still holds court',
    stratum: 'surface',
    x: 54,
    y: 44,
    ref: 'I · 07',
    depth: 'Surface · the Erdtree terrace',
    glyph: 'gem',
    accent: 'gold',
    tags: ['Capital', 'Order', 'Erdtree'],
    description:
      'The city was built to be looked at from below, and it works. Gold roofs, processional avenues, and an Erdtree burning at the centre of the composition like a lamp nobody dares switch off. Leyndell still conducts its ceremonies to an audience of soldiers and dust, and the plumbing goes down further than the theology admits.',
    survey:
      'Entered through the outer wall, measured the avenue, descended further than instructed.',
    places: [
      { name: 'Erdtree Sanctuary', note: 'The room where the order keeps its instruments' },
      { name: 'Avenue Balcony', note: 'The best view in the capital, and the least safe' },
      { name: 'Divine Bridge', note: 'A crossing to a part of the city that is not there' },
      { name: 'Subterranean Shunning-Grounds', note: 'The capital\'s basement, and its conscience' },
    ],
    bosses: [
      { name: 'Morgott, the Omen King', note: 'Defends a city that never wanted him' },
      { name: 'Godfrey, First Elden Lord', note: 'A golden memory with a very heavy axe' },
      { name: 'Mohg, the Omen', note: 'Kept below, and keeping something worse' },
    ],
    npcs: [
      { name: 'Goldmask', note: 'Arrived at last, and found the flaw' },
      { name: 'The Dung Eater', note: 'Imprisoned below, unrepentant, conversational' },
      { name: 'Melina', note: 'Walks the capital road with you, saying little' },
    ],
  },
  {
    id: 'mountaintops',
    name: 'Mountaintops of the Giants',
    epithet: 'Where the fire was kept',
    stratum: 'surface',
    x: 58,
    y: 20,
    ref: 'I · 08',
    depth: 'Surface · the northern range',
    glyph: 'star',
    accent: 'moon',
    tags: ['Snow', 'Giants', 'Fire'],
    description:
      'The north is a graveyard of a war that the order does not like to describe. Giant corpses make the ridges; a flame that was never meant to go out sits at the top of the climb. The snow keeps the shape of everything that fell here, and the wind has been carrying the same sentence for an age.',
    survey:
      'Reached the forge. The cold is not the difficulty; the quiet is.',
    places: [
      { name: 'Flame Peak', note: 'The forge, and the fire it was built around' },
      { name: 'Castle Sol', note: 'A garrison holding a gate to somewhere that should stay shut' },
      { name: 'Zamor Ruins', note: 'Older than the order, and colder than the snow' },
      { name: 'Forge of the Giants', note: 'The one fire the Erdtree cannot argue with' },
    ],
    bosses: [
      { name: 'Fire Giant', note: 'The last employee of a dead enterprise' },
      { name: 'Commander Niall', note: 'Commands a castle and two very loyal ghosts' },
      { name: 'Borealis the Freezing Fog', note: 'Weather with an opinion about trespass' },
    ],
    npcs: [
      { name: 'Shabriri', note: 'Borrowed a body and is enjoying the climate' },
      { name: 'The Finger Reader', note: 'Reads the cold, and finds it legible' },
    ],
  },
  {
    id: 'consecrated-snowfield',
    name: 'Consecrated Snowfield',
    epithet: 'The white country, unlisted',
    stratum: 'surface',
    x: 47,
    y: 12,
    ref: 'I · 09',
    depth: 'Surface · beyond the hidden path',
    glyph: 'spark',
    accent: 'moon',
    tags: ['Snow', 'Hidden', 'Ordina'],
    description:
      'A blank space on most maps, and a deliberate one. The snowfield is reached by a path that has to be found twice, and it holds a town of albinaurics, a cathedral of the unborn, and the last quiet before the Haligtree. The archive lists it, and notes that listing it is not the same as being welcome.',
    survey:
      'Crossed in whiteout. Every landmark was confirmed twice, and one of them moved.',
    places: [
      { name: 'Ordina, Liturgical Town', note: 'A town performing a ceremony for an absent congregation' },
      { name: 'Apostate Derelict', note: 'Where a very patient traveller finally stops' },
      { name: 'Hidden Path to the Haligtree', note: 'The door that requires the right kind of faith' },
      { name: 'Yelough Anix Ruins', note: 'A tunnel, and something at the bottom of it' },
    ],
    bosses: [
      { name: 'Astel, Stars of Darkness', note: 'The same fall, in a worse place' },
      { name: 'Great Wyrm Theodorix', note: 'A wyrm that has made the cold its business' },
      { name: 'Night\'s Cavalry', note: 'Two riders, one road, no witnesses intended' },
    ],
    npcs: [
      { name: 'Latenna', note: 'Carrying a wolf and an instruction to the end of the world' },
      { name: 'The Albinauric Archers', note: 'Defending a town the order refuses to see' },
    ],
  },

  // ------------------------------------------------------------- underworld
  {
    id: 'siofra-river',
    name: 'Siofra River',
    epithet: 'The river beneath the world',
    stratum: 'underworld',
    x: 34,
    y: 30,
    ref: 'II · 01',
    depth: 'Underworld · first well',
    glyph: 'star',
    accent: 'moon',
    tags: ['Underworld', 'River', 'Eternal City'],
    description:
      'Go down the well and the sky is still there — a false one, patient and enormous, hanging over a river that has been running since before the Erdtree was planted. Siofra is the archive\'s proof that the surface is a lid. Everything down here is older, slower and better lit than it has any right to be.',
    survey:
      'Descended by the well and followed the current. The constellations below do not match the ones above.',
    places: [
      { name: 'Siofra River Well', note: 'The lift, the dark, and the sudden sky' },
      { name: 'Nokron, Eternal City', note: 'A city built for a night that never ends' },
      { name: 'Ancestral Woods', note: 'Where the spirits of a whole people still graze' },
      { name: 'Hallowhorn Grounds', note: 'A shrine that asks for a dance, not a prayer' },
    ],
    bosses: [
      { name: 'Regal Ancestor Spirit', note: 'A memory with antlers and a grievance' },
      { name: 'Valiant Gargoyles', note: 'Two guards, one very narrow bridge' },
      { name: 'Mimic Tear', note: 'Your own habits, given a sword and no supervision' },
    ],
    npcs: [
      { name: 'Blaidd', note: 'Down here on an errand he cannot fully explain' },
      { name: 'The Ancestral Followers', note: 'Still tending a grove for a god who left' },
    ],
  },
  {
    id: 'ainsel-river',
    name: 'Ainsel River',
    epithet: 'The river that remembers a city',
    stratum: 'underworld',
    x: 52,
    y: 44,
    ref: 'II · 02',
    depth: 'Underworld · second well',
    glyph: 'moon',
    accent: 'moon',
    tags: ['Underworld', 'River', 'Rot'],
    description:
      'The second river runs colder and stranger, past a city of silver and a lake that should not exist indoors. Ainsel is where the underground stops being scenery and starts being an argument: rot, dolls, and a small moon carried by hand through the dark.',
    survey:
      'Followed the current to the lake and stopped. The lake was recorded from the bank, at length, and from a safe distance.',
    places: [
      { name: 'Ainsel River Well', note: 'The second descent, and the colder one' },
      { name: 'Nokstella, Eternal City', note: 'Silver streets, and a throne with no one on it' },
      { name: 'Lake of Rot', note: 'A body of water that is technically a diagnosis' },
      { name: 'Grand Cloister', note: 'The last quiet room before the void' },
    ],
    bosses: [
      { name: 'Dragonkin Soldier of Nokstella', note: 'Guards a city that has forgotten why' },
      { name: 'Astel, Naturalborn of the Void', note: 'What came down, and stayed down' },
      { name: 'Baleful Shadow', note: 'A friend, wearing the wrong instructions' },
    ],
    npcs: [
      { name: 'Miniature Ranni', note: 'A doll that answers, and would prefer you did not mention it' },
      { name: 'The Nox', note: 'Silver people waiting for a night that was cancelled' },
    ],
  },
  {
    id: 'deeproot-depths',
    name: 'Deeproot Depths',
    epithet: 'The roots of everything',
    stratum: 'underworld',
    x: 48,
    y: 62,
    ref: 'II · 03',
    depth: 'Underworld · beneath the roots',
    glyph: 'orbit',
    accent: 'verdant',
    tags: ['Underworld', 'Roots', 'Death'],
    description:
      'Below the capital the roots come down in bundles thicker than roads, and the water at the bottom carries everything the surface buried. Deeproot is the archive\'s least favourite room: a place where the order\'s dead are stored, and where one of them is still being argued over.',
    survey:
      'Reached by the waterfall. The roots are warm. Nothing in the notes explains why the roots are warm.',
    places: [
      { name: 'Deeproot Depths', note: 'The floor of the world, and its root system' },
      { name: 'Great Waterfall Crest', note: 'Where the capital\'s runoff becomes a river' },
      { name: 'Roots of the Erdtree', note: 'The part of the tree the sermons leave out' },
      { name: 'Nameless Eternal City', note: 'A city with its name filed off' },
    ],
    bosses: [
      { name: 'Lichdragon Fortissax', note: 'A friend who stayed to fight the infection' },
      { name: 'Fia\'s Champions', note: 'The congregation of a very specific grief' },
      { name: 'Crucible Knight Siluria', note: 'An older oath, still in uniform' },
    ],
    npcs: [
      { name: 'Fia', note: 'Deathbed companion, and the most honest person in the capital' },
      { name: 'Godwyn\'s Remains', note: 'Not a speaker. Filed here anyway.' },
    ],
  },
  {
    id: 'mohgwyn-palace',
    name: 'Mohgwyn Palace',
    epithet: 'The palace under the blood',
    stratum: 'underworld',
    x: 72,
    y: 72,
    ref: 'II · 04',
    depth: 'Underworld · the dynasty road',
    glyph: 'skull',
    accent: 'crimson',
    tags: ['Underworld', 'Blood', 'Dynasty'],
    description:
      'A palace built where no palace should be, lit by a red sky that is not a sky. Mohgwyn is a dynasty of one, waiting on a cocoon and a promise, and the road in is lined with everyone who was invited. The archive records it in crimson and does not recommend the pilgrimage.',
    survey:
      'Arrived by invitation, which is to say by ambush. Left before the ceremony.',
    places: [
      { name: 'Mohgwyn Dynasty Mausoleum', note: 'The throne, the cocoon, and the red' },
      { name: 'Palace Approach Ledge-Road', note: 'The long terrace, and its very attentive tenants' },
      { name: 'Cocoon of the Empyrean', note: 'A crib, guarded by a doctrine' },
    ],
    bosses: [
      { name: 'Mohg, Lord of Blood', note: 'A dynasty of one, and entirely certain' },
      { name: 'Nameless White Mask', note: 'An invitation that has stopped asking' },
    ],
    npcs: [
      { name: 'White Mask Varré', note: 'Recruiter, cheerfully honest about the cost' },
      { name: 'Miquella', note: 'Asleep in the cocoon. Not available for interview.' },
    ],
  },

  // ----------------------------------------------------------------- shadow
  {
    id: 'gravesite-plain',
    name: 'Gravesite Plain',
    epithet: 'The first field past the crossing',
    stratum: 'shadow',
    x: 44,
    y: 62,
    ref: 'III · 01',
    depth: 'Shadow · the entry plain',
    glyph: 'shield',
    accent: 'gold',
    tags: ['DLC', 'Threshold', 'Graves'],
    description:
      'The shadow realm opens on a plain of graves and a tower that should not be standing. Gravesite Plain is gentler than what follows and honest about being a beginning: a burnt church, a settlement built into a ruin, and a beast dancing in a courtyard because nobody told it the festival ended.',
    survey:
      'First crossing. Everything on this plate was charted after the fact, and some of it twice.',
    places: [
      { name: 'Belurat, Tower Settlement', note: 'A tower town, and a theatre at the top' },
      { name: 'Gravesite Plain', note: 'The first field, and the last easy one' },
      { name: 'Three-Path Cross', note: 'A junction with three ways and no good ones' },
      { name: 'Scorched Ruins', note: 'A church that burned without consuming' },
    ],
    bosses: [
      { name: 'Divine Beast Dancing Lion', note: 'A ceremony that has outlived its congregation' },
      { name: 'Blackgaol Knight', note: 'A gaoler still on shift' },
      { name: 'Ghostflame Dragon', note: 'Cold fire, warm temper' },
    ],
    npcs: [
      { name: 'Needle Knight Leda', note: 'Courteous, armed, and keeping a list' },
      { name: 'Hornsent', note: 'Here for a reason he will explain at length' },
    ],
  },
  {
    id: 'scadu-altus',
    name: 'Scadu Altus',
    epithet: 'The high country of the shadow',
    stratum: 'shadow',
    x: 50,
    y: 44,
    ref: 'III · 02',
    depth: 'Shadow · the high road',
    glyph: 'crown',
    accent: 'gold',
    tags: ['DLC', 'Highlands', 'Keep'],
    description:
      'The shadow\'s answer to a capital province: wide grass, a castle at the ford, and a keep that takes up the horizon. Scadu Altus is where the shadow realm stops being a rumour and becomes an administration. Everything here is waiting on the same person, and none of it is on your side.',
    survey:
      'Followed the road north. The keep was measured from the outside, repeatedly, from further away each time.',
    places: [
      { name: 'Castle Ensis', note: 'The ford, the gate, and the twin moons behind it' },
      { name: 'Scadu Altus', note: 'Grass, ruins, and a great deal of sky' },
      { name: 'Cathedral of Manus Metyr', note: 'A cathedral with a very old mother' },
      { name: 'Shadow Keep Approach', note: 'The last road before the garrison' },
    ],
    bosses: [
      { name: 'Rellana, Twin Moon Knight', note: 'Two moons, one knight, no negotiation' },
      { name: 'Golden Hippopotamus', note: 'A river horse promoted beyond its abilities' },
    ],
    npcs: [
      { name: 'Needle Knight Leda', note: 'Still keeping the list, still courteous' },
      { name: 'Freyja', note: 'A soldier looking for a lord worth following' },
    ],
  },
  {
    id: 'shadow-keep',
    name: 'Shadow Keep',
    epithet: 'The keep that keeps a promise',
    stratum: 'shadow',
    x: 58,
    y: 30,
    ref: 'III · 03',
    depth: 'Shadow · the garrison',
    glyph: 'flame',
    accent: 'crimson',
    tags: ['DLC', 'Fortress', 'Flame'],
    description:
      'A fortress built around a room where something is being punished. Shadow Keep is the shadow\'s capital in all but name: storehouse, church district, and a garrison whose soldiers are still following the last order they understood. The archive counted seven ways in and one way out.',
    survey:
      'Entered with the garrison\'s permission, which was granted by a spear. The storehouse was catalogued in full.',
    places: [
      { name: 'Shadow Keep', note: 'The fortress, and the flame at the centre of it' },
      { name: 'Specimen Storehouse', note: 'Everything the shadow collected, and labelled' },
      { name: 'Church District', note: 'A quarter where the prayers are all requests' },
      { name: 'Sunken Chapel', note: 'A nave below the waterline, still in use' },
    ],
    bosses: [
      { name: 'Messmer the Impaler', note: 'The promise the keep was built to keep' },
      { name: 'Golden Hippopotamus', note: 'Guards the approach with enormous enthusiasm' },
    ],
    npcs: [
      { name: 'Sir Ansbach', note: 'A scholar of the shadow, and of what it cost' },
      { name: 'Fire Knight Queelign', note: 'Still on duty, still burning' },
    ],
  },
  {
    id: 'rauh-base',
    name: 'Rauh Base',
    epithet: 'Ruins that measure time',
    stratum: 'shadow',
    x: 64,
    y: 54,
    ref: 'III · 04',
    depth: 'Shadow · the eastern ruins',
    glyph: 'gem',
    accent: 'verdant',
    tags: ['DLC', 'Ruins', 'Bud'],
    description:
      'The shadow\'s oldest architecture, and the least explained: terraces, aqueducts and a basilica growing a saint. Rauh is where the archive stops taking notes about people and starts taking notes about stone. Everything is overgrown, and the overgrowth is winning politely.',
    survey:
      'Charted the terraces from the aqueduct. A basilica was found at the centre, and is not described here.',
    places: [
      { name: 'Ancient Ruins of Rauh', note: 'Terraces, arches, and a great deal of water' },
      { name: 'Church of the Bud', note: 'A basilica that grew its own congregation' },
      { name: 'Rauh Base', note: 'The aqueduct country, and its very old plumbing' },
    ],
    bosses: [
      { name: 'Romina, Saint of the Bud', note: 'A saint who became the garden' },
      { name: 'Curseblade Labirith', note: 'A duelist in a ruin with no audience' },
    ],
    npcs: [
      { name: 'The Bud\'s Attendants', note: 'Still watering, still patient' },
    ],
  },
  {
    id: 'cerulean-coast',
    name: 'Cerulean Coast',
    epithet: 'The coast the colour forgot',
    stratum: 'shadow',
    x: 52,
    y: 78,
    ref: 'III · 05',
    depth: 'Shadow · the southern shore',
    glyph: 'eye',
    accent: 'moon',
    tags: ['DLC', 'Coast', 'Flowers'],
    description:
      'A coastline of pale blue flowers and very quiet water, which would be restful if the rest of the shadow were not visible behind you. The coast is where the realm ends and the archive runs out of destinations. The fissure below it is not a coast at all.',
    survey:
      'Followed the shore south until it stopped. The fissure was entered once, and the notes from it are short.',
    places: [
      { name: 'Cerulean Coast', note: 'Pale flowers, grey water, and no wind' },
      { name: 'Stone Coffin Fissure', note: 'A crack in the world with a floor far below' },
      { name: 'Finger Ruins of Rhia', note: 'Ruins built to a hand that is no longer attached' },
      { name: 'Southern Shore', note: 'The edge of the plate, and of the survey' },
    ],
    bosses: [
      { name: 'Putrescent Knight', note: 'Rides out of the fissure on a very old grudge' },
      { name: 'Ghostflame Dragon', note: 'Wintering on a coast that has no winter' },
    ],
    npcs: [
      { name: 'Thiollier', note: 'A devotee of sleep, awake and unhappy about it' },
      { name: 'St. Trina', note: 'Not here. The flowers are.' },
    ],
  },
  {
    id: 'jagged-peak',
    name: 'Jagged Peak',
    epithet: 'The peak that answers dragons',
    stratum: 'shadow',
    x: 70,
    y: 36,
    ref: 'III · 06',
    depth: 'Shadow · the dragon road',
    glyph: 'swords',
    accent: 'crimson',
    tags: ['DLC', 'Mountain', 'Dragons'],
    description:
      'A mountain with a grudge and a staircase. The road up is a dragon\'s idea of a pilgrimage route: burnt, steep, and lined with the remains of previous attendees. Whatever is at the summit has been waiting a very long time to be impolite to somebody.',
    survey:
      'Climbed to the altar. The peak was not climbed. The distinction matters.',
    places: [
      { name: 'Jagged Peak', note: 'The summit, and the argument it hosts' },
      { name: 'Foot of the Jagged Peak', note: 'The last flat ground, and the first burnt one' },
      { name: 'Grand Altar of Dragon Communion', note: 'Where hearts are eaten and rank is conferred' },
    ],
    bosses: [
      { name: 'Bayle the Dread', note: 'The grudge, with wings' },
      { name: 'Ancient Dragon Senessax', note: 'The mountain\'s other tenant, and its landlord' },
      { name: 'Jagged Peak Drake', note: 'Practising on the road' },
    ],
    npcs: [
      { name: 'Dragon Communion Priestess', note: 'Keeps the altar and the appetite' },
      { name: 'Igon', note: 'A dragon-hunter with more nerve than spine' },
    ],
  },
  {
    id: 'abyssal-woods',
    name: 'Abyssal Woods',
    epithet: 'The wood that keeps its own counsel',
    stratum: 'shadow',
    x: 34,
    y: 40,
    ref: 'III · 07',
    depth: 'Shadow · the closed wood',
    glyph: 'eye',
    accent: 'crimson',
    tags: ['DLC', 'Woods', 'Frenzy'],
    description:
      'The archive has one rule about the Abyssal Woods: do not answer anything. The trees are tall, the paths rearrange themselves, and the local madness is contagious in a way that the survey declined to test. At the centre is a manse that has been waiting for a guest with nothing left to lose.',
    survey:
      'Walked the perimeter. The interior was charted from the treeline, in daylight, with a torch lit.',
    places: [
      { name: 'Abyssal Woods', note: 'Paths that move, and a rule about answering' },
      { name: 'Midra\'s Manse', note: 'A house of study, and of what was studied' },
      { name: 'Manse Hall', note: 'The last room, and its very patient occupant' },
    ],
    bosses: [
      { name: 'Midra, Lord of Frenzied Flame', note: 'A scholar who finished the argument' },
    ],
    npcs: [],
  },
]

/** Region ids that the rest of the app (search, old links) may still use. */
export const regionAliases: Record<string, string> = {
  nokron: 'siofra-river',
  'the-land-of-shadow': 'gravesite-plain',
  'shadow-of-the-erdtree': 'gravesite-plain',
}

export const regionPath = (id: string) => `/world?region=${id}`

export const regionById = (id: string | null | undefined) =>
  regions.find((region) => region.id === id) ?? null

/** Tolerates both `?region=` and the older `?entry=` linking style. */
export const resolveRegion = (value: string | null) => {
  if (!value) return null
  return regionById(value) ?? regionById(regionAliases[value] ?? '')
}

export const regionsOf = (stratum: StratumId) =>
  regions.filter((region) => region.stratum === stratum)

export const stratumOf = (id: StratumId) => strata.find((stratum) => stratum.id === id) ?? strata[0]

export const stratumLabel = (id: StratumId) => stratumOf(id).label

/** Filter chips, derived from the tags actually on this plate. */
export const tagsOf = (stratum: StratumId) => {
  const counts = new Map<string, number>()
  for (const region of regionsOf(stratum)) {
    for (const tag of region.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 5)
    .map(([tag]) => tag)
}

const haystack = (region: AtlasRegion) =>
  [
    region.name,
    region.epithet,
    region.depth,
    ...region.tags,
    ...region.places.map((place) => place.name),
    ...region.bosses.map((boss) => boss.name),
    ...region.npcs.map((npc) => npc.name),
  ]
    .join(' ')
    .toLowerCase()

/** A region matches on its name, its ground, its keepers, its speakers or its tags. */
export const matchesQuery = (region: AtlasRegion, query: string) => {
  const needle = query.trim().toLowerCase()
  return needle ? haystack(region).includes(needle) : true
}

export const matchesTag = (region: AtlasRegion, tag: string | null) =>
  tag ? region.tags.includes(tag) : true

export const regionNeighbours = (region: AtlasRegion) => {
  const list = regionsOf(region.stratum)
  const index = list.findIndex((candidate) => candidate.id === region.id)
  return {
    previous: list[(index - 1 + list.length) % list.length],
    next: list[(index + 1) % list.length],
  }
}

export const atlasTotals = {
  regions: regions.length,
  plates: strata.length,
  underground: regionsOf('underworld').length,
}
