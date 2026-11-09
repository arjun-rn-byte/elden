# Elden Ring — An Interactive Encyclopaedia

A cinematic, dark-fantasy encyclopaedia for Elden Ring. Near-black stone, engraved gold, fog
and gold dust: a full-screen threshold, then six chapters, each with its own page.

Built with **Vite + React 19 + TypeScript + Tailwind CSS v4**, React Router, Framer Motion and Lucide.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # tsc -b && vite build
npm run lint     # oxlint
```

## Routes

| Route | Page | Content |
| --- | --- | --- |
| `/` | `HomePage` | Hero, world introduction, the four featured chapters, lore ledger, items |
| `/world` | `ChapterPage` | Leyndell, Caelid, Nokron, the Land of Shadow |
| `/characters` | `ChapterPage` | Malenia, Radahn, Ranni, Godfrey |
| `/bosses` | `ChapterPage` | The Elden Beast, Astel, Placidusax |
| `/weapons` | `ChapterPage` | Moonveil, Rivers of Blood, Blasphemous Blade, Dark Moon Greatsword |
| `/lore` | `ChapterPage` | The Elden Ring, The Two Fingers |
| `/items` | `ChapterPage` | Golden Seed, Sacred Tear, Mimic Tear Ashes |
| anything else | `NotFoundPage` | “The page you sought is sealed.” |

An entry is addressable on its own: `/weapons?entry=moonveil` opens that chapter with its
detail panel already open, so the panel is back/forward-navigable and shareable. `Esc` closes
it, `←` / `→` step to the previous or next leaf.

## Chapter page anatomy

Every chapter page is built from the same parts, in the same order:

1. **Breadcrumbs** — `The Archive / Characters`
2. **Masthead** — numeral, chapter name, lede, leaf count and a drawn chapter sigil
3. **About this chapter** — two paragraphs of framing plus a facts rail
4. **The leaves** — inline search, tag filters, and a responsive card grid
5. **The plates** — three engraved plates with a keyboard-accessible lightbox
6. **Chapter to chapter** — previous / next links that close the loop

## Reusable components

| Component | File | Used by |
| --- | --- | --- |
| Navigation bar | `layout/SiteHeader.tsx` | every route (route-aware; follows the reading line on `/`) |
| Footer | `layout/SiteFooter.tsx` | every route |
| Breadcrumbs | `layout/Breadcrumbs.tsx` | chapter pages, detail panel |
| Section heading | `ui/SectionHeading.tsx` | homepage chapters, chapter pages |
| Page masthead | `chapters/PageHeading.tsx` | all six chapter pages |
| Information card | `ui/InfoCard.tsx` | chapter leaf grids |
| Search bar | `ui/SearchBar.tsx` | chapter leaf grids (inline filter) |
| Search dialog | `search/SearchDialog.tsx` | header, drawer, footer (`⌘K` / `Ctrl-K`) |
| Filter controls | `ui/FilterBar.tsx` | chapter pages — chips derived from the tags actually present |
| Detail panel | `ui/DetailPanel.tsx` | chapter pages, driven by `?entry=` |
| Image gallery | `ui/Gallery.tsx` | chapter pages — drawn plates + lightbox |
| Cards / rows | `chapters/EntryPlate.tsx`, `chapters/EntryRow.tsx` | homepage |
| Sigils | `ui/ArcaneSigilField.tsx`, `ui/Glyph.tsx` | anywhere art would otherwise be a photo |

## Content

All copy lives in two files, so real Elden Ring information can replace placeholders without
touching a component:

- `src/lib/data.ts` — the six categories and the 20 entries. Each entry carries `name`,
  `epithet`, `inscription`, `summary`, `lore`, `locus`, `era`, `standing`, `tags`, `glyph`,
  `accent` and an optional `sealed` flag.
- `src/lib/chapters.ts` — per-chapter intros, plate captions, and the derivations
  (`entriesOf`, `filtersOf`, `chapterBefore` / `chapterAfter`).

Filter chips, counts, breadcrumbs, prev/next links and the search index are all derived, so
adding an entry to `data.ts` adds it to the chapter grid, the filters, the search dialog and
the detail panel in one edit.

## Motion & accessibility

`Reveal` fades, lifts and de-blurs each block; hero dust and parallax run on CSS/rAF. Every
panel and lightbox traps its own scroll, restores focus, closes on `Esc`, and is labelled with
`role="dialog"`. All motion collapses under `prefers-reduced-motion`. There is a skip link, and
the header marks the current chapter with `aria-current="page"`.

## The Erdtree stage

The centre of the hero is a reserved rectangle — `SceneSlot` — sized **72rem × 62vh** at the
42% line. Until the Spline scene exists, `public/scene/erdtree.svg` (procedural, ~8 KB) holds
the atmosphere: dark sky, dawn behind a ridge, broken ramparts, mist, a lone figure. The art is
composed around the slot, so the scene can be dropped in without moving a single piece of type.

To wire the real thing:

```bash
npm i @splinetool/react-spline @splinetool/runtime
```

Then follow the four-line swap documented at the top of `src/three/SplineSlot.tsx` and set
`VITE_SPLINE_SCENE_URL`. `src/three/README.md` covers the same hand-off, plus the older
react-three-fiber scene (`SceneStage`, `CanvasStage`, `HeroSanctum`) that is kept — unused and
code-split away — as the alternative if you would rather build the tree in R3F.

## Structure

```
src/
  App.tsx                    router shell, ⌘K listener, search → navigation
  main.tsx                   BrowserRouter
  pages/                     HomePage, ChapterPage, NotFoundPage
  components/
    hero/                    Hero, SceneSlot, GoldDust
    world/WorldSection.tsx   introduction + regions
    chapters/                ChapterSection, PageHeading, EntryPlate, EntryRow
    lore/LoreSection.tsx     quote band + ages ledger
    layout/                  SiteHeader, MobileMenu, SiteFooter, Breadcrumbs, ScrollToTop
    search/SearchDialog.tsx  ⌘K search over 20 entries and 6 chapters
    ui/                      Action, Reveal, SectionHeading, InfoCard, SearchBar,
                             FilterBar, DetailPanel, Gallery, Glyph,
                             ArcaneSigilField, Ornament, Counter
  lib/data.ts                6 categories, 20 entries, ages, ledger
  lib/chapters.ts            chapter intros, plates, derived helpers
  index.css                  tokens, primitives, atmosphere, keyframes
public/scene/erdtree.svg     temporary hero key art
```

## Design tokens

`src/index.css` (`@theme`): `ink #090909`, `coal #171717`, `stone #2a2823`, `gold #c6a45a`,
`gold-bright #eddbb0`, `bronze #6a5027`, `crimson #7c2622`, `bone #ece5d6`, `ash #a49c8d`,
`mute #6e6a61`. Type: **Cinzel** for the wordmark and inscribed caps, **Cormorant Garamond**
for headings, **Inter** for body.

## Notes

- No raster artwork ships: the sigils, plates and the hero key art are all drawn (SVG/CSS).
- The four old wing components (`CompassSection`, `VaultSection`) and their data views remain in
  `src/components/` unused, superseded by the chapter pages.
- Fan work; Elden Ring and all related names belong to FromSoftware and Bandai Namco.
