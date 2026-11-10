import type { GlyphId } from './data'

export type CharacterType = 'God' | 'Demigod' | 'Empyrean' | 'Lord' | 'Tarnished' | 'Champion' | 'Vessel'

export type Faction =
  | 'Golden Order'
  | 'Carian Royalty'
  | 'Haligtree'
  | 'Volcano Manor'
  | 'Dynasty of Blood'
  | 'Roundtable Hold'
  | 'Independent'

export interface CharacterRelationship {
  targetId: string
  relation: string
  note: string
}

export interface CharacterSpoiler {
  label: string
  text: string
}

export interface CharacterEntry {
  id: string
  name: string
  title: string
  epithet: string
  type: CharacterType
  faction: Faction
  quote: string
  summary: string
  background: string
  history: string
  affiliations: string[]
  quest: string
  relationships: CharacterRelationship[]
  spoilers: CharacterSpoiler[]
  sigil: GlyphId
  accent: 'gold' | 'crimson' | 'moon' | 'verdant'
  family: {
    generation: number // 0 = Divine progenitor, 1 = First Demigods, 2 = Twin prodigies/descendants, 3 = Companions
    parents?: string[]
    consorts?: string[]
    children?: string[]
    siblings?: string[]
  }
}

export const characters: CharacterEntry[] = [
  {
    id: 'marika',
    name: 'Queen Marika',
    title: 'Queen Marika the Eternal',
    epithet: 'Vessel of the Elden Ring',
    type: 'God',
    faction: 'Golden Order',
    quote: 'In Marika’s own words: O Radagon, leal hound of the Golden Order. Thou’rt yet to become me. Thou’rt yet to become a god.',
    summary: 'The divine sovereign of the Lands Between, vessel of the Elden Ring and mother of the demigods, who shattered the Ring she was chosen to bear.',
    background: 'Hailing from the shaman village in the Land of Shadow, Marika was chosen by the Greater Will through the Two Fingers to ascend to godhood, sealing away Destined Death to establish the Golden Order.',
    history: 'Reigned across ages alongside first Elden Lord Godfrey and later King Consort Radagon. After the murder of Godwyn in the Night of Black Knives, she shattered the Elden Ring with her hammer and was imprisoned inside the Erdtree by the Greater Will.',
    affiliations: ['The Greater Will', 'The Golden Order', 'Two Fingers', 'Shaman Heritage'],
    quest: 'Though imprisoned within the impenetrable thorns of the Erdtree, her scattered sites of grace and guidance guide the Tarnished back to the Lands Between to brandish the Elden Ring.',
    relationships: [
      { targetId: 'radagon', relation: 'Other Self / Second Consort', note: 'Two aspects of a single divine being, locked in metaphysical conflict.' },
      { targetId: 'godfrey', relation: 'First Consort', note: 'Her champion during the conquest of the Giants, later stripped of grace and exiled as the first Tarnished.' },
      { targetId: 'godwyn', relation: 'Beloved Son', note: 'Firstborn of the Golden Lineage, whose death broke her faith in the Order.' },
      { targetId: 'morgott', relation: 'Son', note: 'Born an omen and cast into the royal sewers, yet remained unconditionally loyal.' },
      { targetId: 'mohg', relation: 'Son', note: 'Omen twin who embraced the Formless Mother deep beneath the earth.' },
      { targetId: 'malenia', relation: 'Daughter', note: 'Empyrean born of Marika and Radagon, afflicted with the Scarlet Rot.' },
      { targetId: 'miquella', relation: 'Son', note: 'Empyrean born with eternal youth, who divested himself of all gold to create a new unalloyed order.' },
      { targetId: 'melina', relation: 'Daughter / Kindling', note: 'Given her purpose at the foot of the Erdtree to act as kindling for the flame.' },
    ],
    spoilers: [
      {
        label: 'True Identity',
        text: 'Marika and Radagon are one and the same person. When Marika shattered the Elden Ring, Radagon attempted to mend it with the same hammer. Their body is impaled inside the Erdtree with the spear of Destined Death.',
      },
      {
        label: 'Motivations for the Shattering',
        text: 'Disillusioned by the cruelty of the Golden Order, the Hornsent jar-fleshing ritual done to her people, and the tragic death of Godwyn, Marika deliberately engineered the Shattering and summoned the Tarnished back to slay a god.',
      },
    ],
    sigil: 'crown',
    accent: 'gold',
    family: {
      generation: 0,
      consorts: ['godfrey', 'radagon'],
      children: ['godwyn', 'morgott', 'mohg', 'malenia', 'miquella', 'melina'],
    },
  },
  {
    id: 'radagon',
    name: 'Radagon',
    title: 'Radagon of the Golden Order',
    epithet: 'The Second Elden Lord',
    type: 'God',
    faction: 'Golden Order',
    quote: 'Radagon is Marika.',
    summary: 'The red-haired champion of the Golden Order who wed Queen Rennala of Caria before being summoned to the capital to become Marika’s consort and Second Elden Lord.',
    background: 'A master of golden fundamentalist incantations who believed order could be perfected through scholarship and supreme devotion, concealing his shared identity with Marika.',
    history: 'Led the Golden Order’s armies into Liurnia, settled the wars through his marriage to Rennala at the Church of Vows, fathered three great demigods, then abruptly abandoned Caria to become Queen Marika’s consort in Leyndell.',
    affiliations: ['The Golden Order', 'Fundamentalist Scholars', 'Erdtree Orthodoxy'],
    quest: 'Stands as the penultimate barrier within the Elden Throne room inside the Erdtree, wielding the hammer that broke and sought to repair the Ring.',
    relationships: [
      { targetId: 'marika', relation: 'Other Self / Consort', note: 'The orthodox half of the dual deity who fiercely defended the Elden Ring.' },
      { targetId: 'radahn', relation: 'Son', note: 'Inherited his father’s crimson hair and titanic martial discipline.' },
      { targetId: 'ranni', relation: 'Daughter', note: 'Left her the amber egg and moon sorcery heritage, which she later rebelled against.' },
      { targetId: 'rykard', relation: 'Son', note: 'Praetor who later fed himself to the blasphemous serpent of Gelmir.' },
      { targetId: 'malenia', relation: 'Daughter', note: 'Twin prodigy born of single godhood, inheriting unalloyed prowess.' },
      { targetId: 'miquella', relation: 'Son', note: 'Studied fundamentalism together until Miquella abandoned it to heal rot.' },
    ],
    spoilers: [
      {
        label: 'The Sculptor’s Secret',
        text: 'The sculptor who created Radagon’s colossal statue in Leyndell discovered his secret: casting Law of Regression before the statue reveals the inscription “Radagon is Marika.”',
      },
      {
        label: 'The Final Vessel',
        text: 'Upon his defeat in the burning Erdtree, the Elden Beast draws Radagon’s blackened spine from his body and transforms it into the Sacred Relic Sword.',
      },
    ],
    sigil: 'gem',
    accent: 'gold',
    family: {
      generation: 0,
      consorts: ['marika'],
      children: ['radahn', 'rykard', 'ranni', 'malenia', 'miquella'],
    },
  },
  {
    id: 'godfrey',
    name: 'Godfrey',
    title: 'Godfrey, First Elden Lord',
    epithet: 'Chieftain of the Badlands (Hoarah Loux)',
    type: 'Lord',
    faction: 'Golden Order',
    quote: 'A crown is warranted with strength!',
    summary: 'The peerless warlord who conquered the Fire Giants and the Storm Lord to establish Marika’s reign, grafting the Beast Regent Serosh upon his back to quell his bloodlust.',
    background: 'Born Hoarah Loux, chieftain of the Badlands, he took the name Godfrey upon becoming Queen Marika’s first husband and progenitor of the Golden Lineage.',
    history: 'When his last worthy foe fell, the golden light faded from his eyes. Marika stripped him and his warriors of their grace, sending them out into exile as the first Tarnished to die and grow stronger across distant seas.',
    affiliations: ['The Golden Lineage', 'The Tarnished', 'Badlands Tribes', 'Beast Regent Serosh'],
    quest: 'Returns to the foot of the Erdtree guided by his own site of grace to claim the throne before the Tarnished protagonist arrives.',
    relationships: [
      { targetId: 'marika', relation: 'First Wife / Goddess', note: 'Marika bestowed his lordly crown, then banished him in calculated design.' },
      { targetId: 'godwyn', relation: 'Firstborn Son', note: 'The golden golden prince whose burial beneath the roots broke Godfrey’s legacy.' },
      { targetId: 'morgott', relation: 'Son', note: 'Cradled Morgott’s dying body on the throne room terrace with solemn grief.' },
      { targetId: 'mohg', relation: 'Son', note: 'Omen son banished to the subterranean depths.' },
      { targetId: 'godrick', relation: 'Distant Descendant', note: 'A distant sprout of his golden branch who pathetically grafted limbs to imitate his strength.' },
    ],
    spoilers: [
      {
        label: 'Hoarah Loux Unleashed',
        text: 'During phase two of his battle at the Elden Throne, Godfrey slays his beast regent Serosh with bare hands to fight once more as Hoarah Loux, Warrior, wrestling with earth-shaking shockwaves.',
      },
    ],
    sigil: 'shield',
    accent: 'gold',
    family: {
      generation: 0,
      consorts: ['marika'],
      children: ['godwyn', 'morgott', 'mohg'],
    },
  },
  {
    id: 'godwyn',
    name: 'Godwyn the Golden',
    title: 'Godwyn the Golden',
    epithet: 'Prince of Death',
    type: 'Demigod',
    faction: 'Golden Order',
    quote: 'He should have died a true death, as the first of the demigods to die.',
    summary: 'The radiant firstborn of Queen Marika and Godfrey, whose tragic assassination on the Night of Black Knives initiated the unraveling of the Elden Ring.',
    background: 'Famed for defeating the ancient dragon Fortissax in battle and subsequently befriending him, forging the Dragon Cult of Leyndell without desecrating the Golden Order.',
    history: 'Carved with the Cursemark of Death by the Black Knife Assassins while his soul alone perished, leaving his soulless divine flesh to mutate and fester within Deeproot Depths as Deathroot spread throughout the Lands Between.',
    affiliations: ['The Golden Lineage', 'Dragon Cult of the Capital', 'Those Who Live in Death'],
    quest: 'Resting in the heart of Deeproot Depths, Godwyn is tended by Fia, who conceives the Mending Rune of the Death-Prince from his hallowed corpse.',
    relationships: [
      { targetId: 'marika', relation: 'Mother', note: 'Her firstborn and most revered son; his death caused her to shatter the Ring.' },
      { targetId: 'godfrey', relation: 'Father', note: 'Inherited his father’s majestic bearing and martial excellence.' },
      { targetId: 'ranni', relation: 'Half-Sister / Slayer', note: 'Ranni orchestrated his murder to slay her own flesh concurrently with his soul.' },
      { targetId: 'fia', relation: 'Deathbed Companion', note: 'Gave him comfort in death, seeking to birth an age welcoming Those Who Live in Death.' },
      { targetId: 'godrick', relation: 'Descendant', note: 'Godrick represents the diluted, desperate dregs of Godwyn’s lineage.' },
    ],
    spoilers: [
      {
        label: 'The Cursemark of Death',
        text: 'Because Ranni died in body at the exact same moment Godwyn died in soul, each received only half of the Cursemark of the Centipede. Godwyn became the soulless father of Those Who Live in Death.',
      },
      {
        label: 'Malignant Face of Death',
        text: 'Godwyn’s grotesque, monstrous surrogate face has grown beneath Stormveil Castle, spreading corruption through roots across all continents.',
      },
    ],
    sigil: 'spark',
    accent: 'gold',
    family: {
      generation: 1,
      parents: ['marika', 'godfrey'],
      siblings: ['morgott', 'mohg'],
    },
  },
  {
    id: 'morgott',
    name: 'Morgott',
    title: 'Morgott, the Omen King',
    epithet: 'Grace-Given Lord of Leyndell',
    type: 'Demigod',
    faction: 'Golden Order',
    quote: 'Wilful traitors, all. Thy kindled courage and thy flame of ambition... let it be put to rest.',
    summary: 'The horned Omen demigod who loved an Order that reviled him, protecting the Royal Capital through the Shattering while hiding his royal identity under the guise of Margit, the Fell Omen.',
    background: 'Born an Omen with accursed horns alongside twin Mohg, cast into the subterranean shunning-grounds beneath the capital, yet chose to love the Erdtree and defend it against all usurpers.',
    history: 'Turned back General Radahn and Rykard’s assaults during the Sieges of Leyndell. Sealed his cursed blood into a walking stick cane and remained the solitary sovereign guardian of the throne.',
    affiliations: ['The Golden Order', 'Night’s Cavalry', 'Capital Guard'],
    quest: 'Bars the Tarnished at the gates of Stormveil Castle as Margit, and later defends the impassable Elden Throne in royal Leyndell.',
    relationships: [
      { targetId: 'marika', relation: 'Mother', note: 'Loved her Erdtree unconditionally, though she locked him in a dungeon at birth.' },
      { targetId: 'godfrey', relation: 'Father', note: 'Godfrey honored his sacrifice as he passed into golden dust.' },
      { targetId: 'mohg', relation: 'Twin Brother', note: 'Shared identical origins in the sewers, but severed ties when Mohg embraced blasphemy.' },
      { targetId: 'radahn', relation: 'Sibling / Rival', note: 'Repelled Radahn’s army during the first defense of Leyndell.' },
      { targetId: 'godrick', relation: 'Relative', note: 'Humiliated Godrick when he attempted to flee the capital disguised as a woman.' },
    ],
    spoilers: [
      {
        label: 'The Thorns’ Denial',
        text: 'Even Morgott, who sacrificed his entire existence defending the Erdtree, was rejected by the impenetrable thorns of the Elden Ring, leaving him to rule over ash and duty alone.',
      },
    ],
    sigil: 'swords',
    accent: 'gold',
    family: {
      generation: 1,
      parents: ['marika', 'godfrey'],
      siblings: ['godwyn', 'mohg'],
    },
  },
  {
    id: 'mohg',
    name: 'Mohg',
    title: 'Mohg, Lord of Blood',
    epithet: 'The Luminary of the Dynasty',
    type: 'Demigod',
    faction: 'Dynasty of Blood',
    quote: 'Welcome, honoured guest, to the birthplace of our dynasty!',
    summary: 'The twin Omen prince who embraced his cursed blood, communed with the outer god known as the Formless Mother, and founded a bloodsoaked underground dynasty.',
    background: 'Banished beneath Leyndell with Morgott, Mohg uncovered the Formless Mother in the subterranean abyss, realizing his cursed blood ignited into sacred bloodflame when wounded.',
    history: 'During the Shattering, Mohg infiltrated the Haligtree, severed Miquella’s cocoon from the roots, and sequestered him deep within Mohgwyn Palace to become his consort and monarch of a new age.',
    affiliations: ['The Formless Mother', 'The Mohgwyn Dynasty', 'Bloody Fingers'],
    quest: 'Defeated at the grand mausoleum terrace before the slumbering cocoon of Empyrean Miquella.',
    relationships: [
      { targetId: 'morgott', relation: 'Twin Brother', note: 'His twin who chose orthodox duty while Mohg chose blasphemous ascension.' },
      { targetId: 'marika', relation: 'Mother', note: 'Rejected her golden sovereignty in favor of the Formless Mother.' },
      { targetId: 'miquella', relation: 'Abducted Consort', note: 'Obsessed with awakening Miquella’s divinity through sharing his accursed blood.' },
      { targetId: 'malenia', relation: 'Half-Sister / Nemesis', note: 'Stole Miquella while Malenia was comatose following the battle of Aeonia.' },
    ],
    spoilers: [
      {
        label: 'Miquella’s Charm',
        text: 'Mohg did not merely kidnap Miquella of his own volition: Miquella deliberately charmed and bewitched Mohg to use his palace and body as a gateway to the Land of Shadow.',
      },
      {
        label: 'Gateway to the Shadow Realm',
        text: 'Interacting with Miquella’s withered arm protruding from the cocoon after defeating Mohg transports the Tarnished into the Shadow of the Erdtree.',
      },
    ],
    sigil: 'flame',
    accent: 'crimson',
    family: {
      generation: 1,
      parents: ['marika', 'godfrey'],
      siblings: ['godwyn', 'morgott'],
    },
  },
  {
    id: 'malenia',
    name: 'Malenia',
    title: 'Malenia, Blade of Miquella',
    epithet: 'Goddess of Rot',
    type: 'Empyrean',
    faction: 'Haligtree',
    quote: 'I am Malenia, Blade of Miquella. And I have never known defeat.',
    summary: 'The undefeated swordswoman afflicted from birth with the Scarlet Rot, whose unyielding devotion to twin brother Miquella defined her life and wars.',
    background: 'Born an Empyrean twin to Marika and Radagon. In exchange for prosthetic gold limbs crafted by Miquella to hold the rot at bay, she pledged herself as his personal blade.',
    history: 'Marched across the Lands Between in the Shattering, fighting General Radahn to a standstill at Caelid before releasing the Scarlet Aeonia flower that rotted the eastern continent.',
    affiliations: ['The Haligtree', 'Cleanrot Knights', 'Miquella’s Retinue'],
    quest: 'Slumbers within the roots of the Haligtree until challenged by the Tarnished in one of the game’s legendary pinnacle duels.',
    relationships: [
      { targetId: 'miquella', relation: 'Twin Brother / Beloved Lord', note: 'Her reason for existence; she defended his dream of a haven for the rejected.' },
      { targetId: 'radahn', relation: 'Half-Brother / Rival', note: 'Fought in the greatest clash of the Shattering, unleashing rot when outmatched.' },
      { targetId: 'radagon', relation: 'Father', note: 'Gifted her the golden craftsmanship that Miquella later elevated into unalloyed gold.' },
      { targetId: 'marika', relation: 'Mother', note: 'Born of single godhood, bearing the curse of an outer god.' },
      { targetId: 'millicent', relation: 'Daughter / Offshoot', note: 'Born from the red bloom at Aeonia, carrying her severed dignity and pride.' },
    ],
    spoilers: [
      {
        label: 'The Third Bloom',
        text: 'Malenia has bloomed twice: first in Caelid against Radahn, second in her boss fight as Goddess of Rot. Ancient prophecy states that with her third bloom, she shall ascend as a true, irrevocable Goddess of Rot.',
      },
    ],
    sigil: 'swords',
    accent: 'crimson',
    family: {
      generation: 2,
      parents: ['marika', 'radagon'],
      siblings: ['miquella'],
      children: ['millicent'],
    },
  },
  {
    id: 'miquella',
    name: 'Miquella',
    title: 'Miquella the Kind',
    epithet: 'St. Trina / The Unalloyed',
    type: 'Empyrean',
    faction: 'Haligtree',
    quote: 'Lord brother, at last you are returned. A vow was made... we shall be god and lord.',
    summary: 'The beloved prodigy cursed with eternal childhood, who created unalloyed gold to purge rot and grew the Haligtree to shelter the downtrodden.',
    background: 'Born with absolute charisma and divine insight, he abandoned golden fundamentalism because it could not cure Malenia’s rot, developing needlework that wards off outer gods.',
    history: 'Cocooned himself into the sap of the Haligtree to attain adulthood, was stolen away by Mohg into the depths, and subsequently divested his flesh and doubts to travel to the Land of Shadow.',
    affiliations: ['The Haligtree', 'Unalloyed Gold Artisans', 'St. Trina Cult'],
    quest: 'Traced through the Shadow of the Erdtree as he sheds his golden eyes, flesh, and love to ascend to divine godhood.',
    relationships: [
      { targetId: 'malenia', relation: 'Twin Sister', note: 'Crafted the unalloyed needles and prosthetics that preserved her sanity.' },
      { targetId: 'radahn', relation: 'Promised Consort', note: 'Made a childhood vow asking Radahn to become his lord when he ascended as god.' },
      { targetId: 'mohg', relation: 'Captor / Vessel', note: 'Charmed Mohg to utilize his blood-rite and body as an anchor to cross worlds.' },
      { targetId: 'marika', relation: 'Mother', note: 'Followed her path to godhood at the Gate of Divinity, seeking a world of kindness.' },
    ],
    spoilers: [
      {
        label: 'St. Trina Discarded',
        text: 'St. Trina, the enigmatic saint of slumber, was Miquella’s female half and his capacity for love. In the Fissure of the Shadow Realm, he cast her aside into the abyss.',
      },
      {
        label: 'Ascension and Fall',
        text: 'At the Gate of Divinity in Enir-Ilim, Miquella resurrects Radahn’s soul inside Mohg’s vessel and ascends to godhood, but is slain alongside his promised consort.',
      },
    ],
    sigil: 'spark',
    accent: 'gold',
    family: {
      generation: 2,
      parents: ['marika', 'radagon'],
      siblings: ['malenia'],
    },
  },
  {
    id: 'radahn',
    name: 'General Radahn',
    title: 'Starscourge Radahn',
    epithet: 'General of the Redmanes',
    type: 'Demigod',
    faction: 'Golden Order',
    quote: 'Leonard, my trusty steed... the stars shall stay fixed till our march is done.',
    summary: 'The mighty general of Caelid who mastered gravitational magic to freeze the stars in place, saving the town of Sellia and holding fate at bay.',
    background: 'Son of Radagon and Rennala, he idolized First Elden Lord Godfrey and his father Radagon, adorning his massive armor with golden lions and red crests.',
    history: 'Fought Malenia during the Shattering until infected by the Scarlet Rot. Though his brain rotted away, he wandered the battlefield dunes of Caelid gnawing corpses while holding back the heavens with gravity.',
    affiliations: ['Redmane Knights', 'Town of Sellia', 'Alabaster Gravity Sorcerers'],
    quest: 'Celebrated at the Radahn Festival in Redmane Castle, where warriors gather to grant him an honorable death in battle.',
    relationships: [
      { targetId: 'radagon', relation: 'Father', note: 'Proud of his red hair inherited from Radagon, symbolizing supreme battle prowess.' },
      { targetId: 'ranni', relation: 'Sister', note: 'Holding back the stars inadvertently arrested Ranni’s dark moon destiny.' },
      { targetId: 'rykard', relation: 'Brother', note: 'Maintained fraternal respect before Rykard succumbed to the God-Devouring Serpent.' },
      { targetId: 'malenia', relation: 'Adversary', note: 'Their fateful duel destroyed Caelid and left both heroes broken.' },
      { targetId: 'alexander', relation: 'Admirer', note: 'Alexander journeyed to Caelid specifically to participate in the general’s festival.' },
      { targetId: 'miquella', relation: 'Vowed Lord', note: 'The chosen consort for Miquella’s new age in the Land of Shadow.' },
    ],
    spoilers: [
      {
        label: 'Unfreezing the Stars',
        text: 'Upon Radahn’s defeat, a meteor immediately strikes Limgrave, opening the crater passage into Nokron, the Eternal City, releasing Ranni’s halted fate.',
      },
      {
        label: 'Promised Consort',
        text: 'In the Land of Shadow, Miquella revives Radahn in his prime youth inside Mohg’s transformed body, serving as the final boss: Consort Radahn.',
      },
    ],
    sigil: 'orbit',
    accent: 'crimson',
    family: {
      generation: 1,
      parents: ['radagon'],
      siblings: ['ranni', 'rykard'],
    },
  },
  {
    id: 'ranni',
    name: 'Ranni the Witch',
    title: 'Lunar Princess Ranni',
    epithet: 'The Snow Witch',
    type: 'Empyrean',
    faction: 'Carian Royalty',
    quote: 'I stole the Rune of Death, slew mine own Empyrean flesh, and cast aside the guidance of the Two Fingers.',
    summary: 'The Carian princess who rejected the Greater Will, took the Night of Black Knives into her own hands, and seeks to inaugurate the cold, free Age of the Stars.',
    background: 'Chosen as an Empyrean by her Two Fingers, Ranni refused to be a puppet of external gods, learning cold dark moon sorcery from a secret Snow Witch mentor.',
    history: 'Stole a fragment of the Rune of Death, slew her body with black flame while Godwyn died in soul, and inhabited a four-armed porcelain doll modelled after her mentor.',
    affiliations: ['Carian Royal Family', 'Dark Moon', 'Blaidd & Iji'],
    quest: 'Her expansive storyline sends the Tarnished into the underground Eternal Cities to retrieve the Fingerslayer Blade, concluding at the Moonlight Altar.',
    relationships: [
      { targetId: 'radagon', relation: 'Father', note: 'Her father whose abandonment of Caria fractured her mother’s heart.' },
      { targetId: 'radahn', relation: 'Brother', note: 'Loved her brother, though his arresting of the stars halted her destiny.' },
      { targetId: 'rykard', relation: 'Brother', note: 'Entrusted Rykard with the Blasphemous Claw as a failsafe against Maliketh.' },
      { targetId: 'blaidd', relation: 'Shadowbound Beast', note: 'Created as her guardian stepbrother, bound to her service by the Two Fingers.' },
      { targetId: 'godwyn', relation: 'Half-Brother / Target', note: 'Sacrificed Godwyn’s soul to divest herself of her own Empyrean flesh.' },
    ],
    spoilers: [
      {
        label: 'The Architect of the Night',
        text: 'Ranni admits freely to the Tarnished that she was the true mastermind behind the Black Knife Assassins and the theft of Destined Death.',
      },
      {
        label: 'Age of the Stars Ending',
        text: 'Summoning Ranni after defeating the Elden Beast replaces the Golden Order with the Age of the Stars, carrying order far into the dark cosmos so humanity can feel neither god nor rule.',
      },
    ],
    sigil: 'moon',
    accent: 'moon',
    family: {
      generation: 1,
      parents: ['radagon'],
      siblings: ['radahn', 'rykard'],
    },
  },
  {
    id: 'rykard',
    name: 'Praetor Rykard',
    title: 'Rykard, Lord of Blasphemy',
    epithet: 'The God-Devouring Serpent',
    type: 'Demigod',
    faction: 'Volcano Manor',
    quote: 'Join the Serpent King, as family... Together, we will devour the very gods!',
    summary: 'The former chief judicial Praetor of Leyndell who rebelled against the Erdtree, establishing Volcano Manor and feeding his living body to an immortal subterranean serpent.',
    background: 'Son of Radagon and Rennala, he developed magma sorceries on Mt. Gelmir and despised the hypocrisy of the Two Fingers and Golden Order justice.',
    history: 'During the Shattering, he allowed the colossal elder serpent beneath Mt. Gelmir to swallow him whole. His consciousness merged with the serpent, growing millions of writhing limbs from devoured champions.',
    affiliations: ['Volcano Manor Recusants', 'Gelmir Magma Sorcerers', 'The Great Serpent'],
    quest: 'Located at the heart of Volcano Manor, fought with the mythical Serpent-Hunter spear left by ancient warriors.',
    relationships: [
      { targetId: 'radagon', relation: 'Father', note: 'Inherited ambitious red vigor, which he twisted into volcanic heretical rage.' },
      { targetId: 'radahn', relation: 'Brother', note: 'Maintained alliances prior to his descent into the serpent’s belly.' },
      { targetId: 'ranni', relation: 'Sister', note: 'Supported Ranni’s plot against the gods, holding the Blasphemous Claw.' },
    ],
    spoilers: [
      {
        label: 'Tanith’s Feast',
        text: 'After defeating Rykard, his consort Lady Tanith can be found feasting upon his severed head in the boss arena, desperately attempting to rebirth him inside her womb.',
      },
    ],
    sigil: 'skull',
    accent: 'crimson',
    family: {
      generation: 1,
      parents: ['radagon'],
      siblings: ['radahn', 'ranni'],
    },
  },
  {
    id: 'godrick',
    name: 'Godrick the Grafted',
    title: 'Godrick the Grafted',
    epithet: 'Lord of Stormveil',
    type: 'Demigod',
    faction: 'Golden Order',
    quote: 'I command thee, kneel! I am the Lord of all that is golden!',
    summary: 'The insecure and cowardly demigod of Stormveil Castle, whose pathetic heritage led him to graft the limbs of slaughtered Tarnished onto his own body.',
    background: 'A distant descendant of Godwyn and Godfrey, born with so little divine blood that he was mocked by his fellow demigods and defeated in every skirmish.',
    history: 'Fled Leyndell disguised as a woman, insulted Malenia and was forced to lick her boots, and entrenched himself at Stormveil to hunt Tarnished for grafting.',
    affiliations: ['The Golden Lineage', 'Stormveil Garrison', 'Grafted Scions'],
    quest: 'The first Great Rune bearer encountered by most Tarnished, guarding the passage between Limgrave and Liurnia.',
    relationships: [
      { targetId: 'godfrey', relation: 'Ancestor', note: 'Hero-worships Godfrey, crying out to his forefather while amputating his own arm to graft a dragon’s head.' },
      { targetId: 'godwyn', relation: 'Forebear', note: 'The proud golden prince whose glory Godrick could never replicate.' },
      { targetId: 'morgott', relation: 'Cousin / Defeater', note: 'Thoroughly trounced by Morgott when attempting to claim the capital.' },
      { targetId: 'malenia', relation: 'Humiliator', note: 'Begged for mercy at Malenia’s feet when her army crossed Limgrave.' },
    ],
    spoilers: [
      {
        label: 'Grafted Dragon',
        text: 'In his second phase, Godrick chops off his own left forearm and attaches a dead dragon’s head, unleashing streams of roaring flame.',
      },
    ],
    sigil: 'orbit',
    accent: 'verdant',
    family: {
      generation: 2,
      parents: ['godwyn'],
    },
  },
  {
    id: 'melina',
    name: 'Melina',
    title: 'Melina',
    epithet: 'The Kindling Maiden',
    type: 'Vessel',
    faction: 'Independent',
    quote: 'Shall I share with you my wisdom? The wisdom of Queen Marika...',
    summary: 'The mysterious, spirit-like maiden who offers an accord to the Tarnished at the Gatefront Ruins, acting as a finger maiden to turn runes into strength.',
    background: 'Burned and bodiless, she exists only as a spectral projection, carrying the mission bestowed upon her by her mother inside the Erdtree.',
    history: 'Guides the Tarnished across the Lands Between, provides the spectral steed Torrent, and leads them to the Forge of the Giants in the far north.',
    affiliations: ['Queen Marika', 'Spectral Steed Torrent', 'The Erdtree'],
    quest: 'Sacrifices her ethereal form at the Forge of the Giants to ignite the Flame of Ruin and burn the Erdtree’s thorns.',
    relationships: [
      { targetId: 'marika', relation: 'Mother / Creator', note: 'Born at the base of the Erdtree, given her duty by Queen Marika.' },
      { targetId: 'messmer', relation: 'Older Brother', note: 'Shares her flaming vision and one sealed eye with Messmer the Impaler.' },
    ],
    spoilers: [
      {
        label: 'The Kindling Maiden',
        text: 'Melina’s true purpose is to be the kindling that feeds the Giants’ Flame to burn the Erdtree. If the player embraces the Frenzied Flame instead, she abandons them and vows to hunt them down.',
      },
      {
        label: 'The Gloam-Eyed Seal',
        text: 'In the Lord of Frenzied Flame ending, Melina unseals her closed eye, revealing a violet gloam eye and swearing to deliver Destined Death to the player.',
      },
    ],
    sigil: 'flame',
    accent: 'gold',
    family: {
      generation: 1,
      parents: ['marika'],
    },
  },
  {
    id: 'blaidd',
    name: 'Blaidd',
    title: 'Blaidd the Half-Wolf',
    epithet: 'Shadowbound Beast of Ranni',
    type: 'Champion',
    faction: 'Carian Royalty',
    quote: 'Whatever happens, I’m on her side. Ranni’s side. Even if the Two Fingers command otherwise.',
    summary: 'The noble, chivalrous wolf-man warrior created by the Two Fingers as Ranni’s faithful shadow, whose loyalty proved stronger than his biological programming.',
    background: 'Shadowbound beasts are gifted to Empyreans as guardians, but are hard-wired with a fail-safe madness protocol to kill their master should they turn against the Two Fingers.',
    history: 'Aided Ranni’s quest faithfully from the Mistwood to the Radahn Festival and down into the Nokron crater, fighting off madness until the very end.',
    affiliations: ['Princess Ranni', 'War Counselor Iji', 'Carian Vassals'],
    quest: 'Met in the Mistwood howling from the ruins, joins the festival of Radahn, and is sadly confronted outside Ranni’s Rise.',
    relationships: [
      { targetId: 'ranni', relation: 'Adopted Sister / Sworn Mistress', note: 'Grew up together in Caria; Blaidd loved her with absolute, unwavering loyalty.' },
      { targetId: 'radahn', relation: 'Festival Comrade', note: 'Joined hands with the Tarnished and Alexander to grant Radahn an honorable end.' },
    ],
    spoilers: [
      {
        label: 'Tragic Inevitability',
        text: 'When Ranni slays her Two Fingers, the curse activates, driving Blaidd mad. He fights off the Black Knife Assassins sent to kill Ranni before tragically attacking the Tarnished outside her tower.',
      },
    ],
    sigil: 'eye',
    accent: 'moon',
    family: {
      generation: 3,
    },
  },
  {
    id: 'alexander',
    name: 'Iron Fist Alexander',
    title: 'Iron Fist Alexander',
    epithet: 'Warrior Jar of the Redmanes',
    type: 'Champion',
    faction: 'Independent',
    quote: 'All men dream of glory, and I am a warrior jar! A champion in the making!',
    summary: 'The hearty, boisterous living jar who travels across the continent stuffing defeated warriors into his belly to forge himself into a legendary champion.',
    background: 'Living jars are filled with the flesh of fallen champions to absorb their battle vigor; Alexander yearns to be the greatest warrior jar in history.',
    history: 'Freed from potholes across Limgrave and Liurnia, fought heroically against General Radahn in Caelid, tempered himself in the magma of Mt. Gelmir, and journeyed to Crumbling Farum Azula.',
    affiliations: ['Radahn Festival Champions', 'Jarburg Clan'],
    quest: 'A memorable questline culminating in a mutual, respectful duel to the death atop the floating ruins of Farum Azula.',
    relationships: [
      { targetId: 'radahn', relation: 'Inspiration', note: 'Worships Radahn’s indomitable might, collecting his soldiers’ remains into his vessel.' },
    ],
    spoilers: [
      {
        label: 'Alexander’s Innards',
        text: 'Upon defeating Alexander in Farum Azula, he shatters with pride and bequeaths his innards, which can be delivered to Jar Bairn in Jarburg to inspire the next generation.',
      },
    ],
    sigil: 'circle',
    accent: 'gold',
    family: {
      generation: 3,
    },
  },
  {
    id: 'millicent',
    name: 'Millicent',
    title: 'Millicent',
    epithet: 'Daughter of the Rot',
    type: 'Vessel',
    faction: 'Haligtree',
    quote: 'I would rather rot away into nothingness as myself than blossom into someone I am not.',
    summary: 'A red-haired maiden suffering from rotting amnesia in Caelid’s Church of the Plague, who journeys to the Haligtree to return Malenia’s lost dignity.',
    background: 'One of several daughters born from the Scarlet Aeonia bloom left by Malenia in Caelid, fostered by the manipulative sage Gowry to serve as a successor.',
    history: 'Cured of her rotting stupor by the player with the Unalloyed Gold Needle, she receives a Valkyrie’s prosthetic arm and follows Malenia’s footsteps to the Mountaintops and Haligtree.',
    affiliations: ['The Haligtree', 'Gowry’s Pests', 'Malenia’s Heritage'],
    quest: 'Defends herself against her traitorous sisters at the Haligtree, choosing death over becoming an unholy puppet of rot.',
    relationships: [
      { targetId: 'malenia', relation: 'Mother / Genetic Progenitor', note: 'Carries Malenia’s severed sense of self, dignity, and unyielding will.' },
      { targetId: 'miquella', relation: 'Unalloyed Benefactor', note: 'Preserved by the unalloyed gold needle crafted originally for her mother.' },
    ],
    spoilers: [
      {
        label: 'Defying the Rot Bloom',
        text: 'Gowry intended for the player to betray Millicent so her grief would trigger a magnificent scarlet bloom. By siding with her, she pulls out the needle herself to die with human dignity.',
      },
    ],
    sigil: 'swords',
    accent: 'crimson',
    family: {
      generation: 3,
      parents: ['malenia'],
    },
  },
  {
    id: 'fia',
    name: 'Fia',
    title: 'Fia, Deathbed Companion',
    epithet: 'Mother of Those Who Live in Death',
    type: 'Tarnished',
    faction: 'Roundtable Hold',
    quote: 'I am a Deathbed Companion. Will you let me hold you, if only for a moment?',
    summary: 'The tender Deathbed Companion of the Roundtable Hold who takes vigor from the living to bestow second life upon dead lords.',
    background: 'Exiled from her homeland where companions lay with nobles to transfer their warmth to deceased royalty, she fled to the Lands Between as a Tarnished.',
    history: 'Offered quiet embraces in the Roundtable Hold, assassinated D, Hunter of the Dead, and retreated to Deeproot Depths to lay with Godwyn’s mutated corpse.',
    affiliations: ['Those Who Live in Death', 'Godwyn the Golden', 'Roundtable Hold'],
    quest: 'Giving her the Cursemark of Death from Ranni’s corpse allows her to birth the Mending Rune of the Death-Prince in Godwyn’s chamber.',
    relationships: [
      { targetId: 'godwyn', relation: 'Chosen Lord', note: 'Sought to birth his reborn soul and establish a peaceful place for Those Who Live in Death.' },
      { targetId: 'ranni', relation: 'Indirect Accomplice', note: 'Required the other half of the Cursemark created during Ranni’s death.' },
    ],
    spoilers: [
      {
        label: 'The Dragon’s Dream',
        text: 'Entering Fia’s Deathbed Dream allows the player to battle Lichdragon Fortissax, Godwyn’s noble dragon companion who fought within his decaying soul to prevent corruption.',
      },
    ],
    sigil: 'eye',
    accent: 'moon',
    family: {
      generation: 3,
    },
  },
  {
    id: 'dung-eater',
    name: 'The Dung Eater',
    title: 'The Loathsome Dung Eater',
    epithet: 'Bearer of the Omen Curse',
    type: 'Tarnished',
    faction: 'Roundtable Hold',
    quote: 'I will defile you, and your children, and their children, for ever and ever.',
    summary: 'A depraved, bloodthirsty Tarnished knight adorned in sun-crested armor with sawed-off horns, whose soul-consuming curse defiles the cycle of rebirth.',
    background: 'Deeply connected to the suffering of the Omens, he seeks to afflict all living things with defilement so that no person will ever be ostracized again.',
    history: 'Imprisoned in the Leyndell sewer gaols for horrific massacres, he projects a phantom into the Roundtable Hold seeking Seedbed Curses.',
    affiliations: ['The Omen Curse', 'Roundtable Outcasts'],
    quest: 'Fed five Seedbed Curses in his physical cell beneath Leyndell to extract the Mending Rune of the Fell Curse.',
    relationships: [
      { targetId: 'morgott', relation: 'Ideological Foil', note: 'Where Morgott hid his omen horns in shame and duty, Dung Eater glorifies the defilement.' },
    ],
    spoilers: [
      {
        label: 'The Blessing of Despair Ending',
        text: 'Mending the Elden Ring with the Dung Eater’s rune curses all future generations of the Lands Between to be born with painful, horn-ridden omen afflictions, forever severed from Erdtree grace.',
      },
      {
        label: 'Puppet of Seluvis',
        text: 'The player can alternatively administer Seluvis’s potion to the Dung Eater while tied up in the sewers, turning this fearsome monster into a spirit ash puppet.',
      },
    ],
    sigil: 'skull',
    accent: 'crimson',
    family: {
      generation: 3,
    },
  },
]

export const characterById = (id: string | null | undefined): CharacterEntry | null =>
  characters.find((c) => c.id === id) ?? null

export const charactersByFaction = (faction: Faction): CharacterEntry[] =>
  characters.filter((c) => c.faction === faction)

export const charactersByType = (type: CharacterType): CharacterEntry[] =>
  characters.filter((c) => c.type === type)

export const characterFactions: Faction[] = [
  'Golden Order',
  'Carian Royalty',
  'Haligtree',
  'Volcano Manor',
  'Dynasty of Blood',
  'Roundtable Hold',
  'Independent',
]

export const characterTypes: CharacterType[] = [
  'God',
  'Demigod',
  'Empyrean',
  'Lord',
  'Tarnished',
  'Champion',
  'Vessel',
]
