import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp, Check } from 'lucide-react'
import { categories } from '../../lib/data'
import { actionClass } from '../ui/Action'
import { Ornament } from '../ui/Ornament'

export function SiteFooter({ onOpenSearch }: { onOpenSearch: () => void }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const columnLink =
    'group inline-flex items-baseline gap-2 text-[12px] leading-none text-ash/65 transition-colors duration-500 hover:text-gold'

  return (
    <footer className="relative border-t border-gold/12">
      <div className="mx-auto w-full max-w-[94rem] px-5 pb-10 pt-16 sm:px-8 lg:px-12 lg:pt-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3.5">
              <span className="relative flex h-9 w-9 items-center justify-center" aria-hidden>
                <span className="absolute inset-0 rotate-45 border border-gold/40" />
                <span className="h-1.5 w-1.5 rotate-45 bg-gold/80" />
              </span>
              <div>
                <p className="font-inscribed text-[11px] uppercase leading-none tracking-[0.3em] text-bone/95">
                  Elden&nbsp;Ring
                </p>
                <p className="mt-2 text-[8px] uppercase tracking-[0.28em] text-mute">
                  An interactive encyclopaedia
                </p>
              </div>
            </div>

            <p className="mt-7 max-w-[38ch] text-[13px] leading-[1.9] text-ash/70">
              An independent reading room for the Lands Between — kept in ink, gold leaf and a little
              stubbornness. No adverts, no rankings, no tier lists.
            </p>

            <p className="mt-6 font-inscribed text-[8.5px] uppercase tracking-[0.3em] text-mute/80">
              The Lands Between · MMXXVI · Six Chapters
            </p>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9">
            <h2 className="font-display text-[1.6rem] leading-none text-bone">Keep the vigil</h2>
            <p className="mt-3 text-[12.5px] leading-[1.8] text-ash/70">
              One chapter, each new moon. No ravens wasted, no tidings sold.
            </p>

            {sent ? (
              <div
                role="status"
                className="mt-6 flex items-start gap-3 border border-gold/25 bg-gold/[0.04] px-4 py-3.5"
              >
                <Check size={14} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                <p className="text-[12px] leading-[1.7] text-bone/80">
                  Your name is entered in the ledger. Watch the eastern sky.
                </p>
              </div>
            ) : (
              <form
                className="mt-6"
                onSubmit={(event) => {
                  event.preventDefault()
                  if (!email.trim()) return
                  setSent(true)
                }}
              >
                <label htmlFor="vigil-email" className="sr-only">
                  Your email address
                </label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    id="vigil-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="your.name@holdfast"
                    className="h-11 min-w-0 flex-1 border border-gold/20 bg-ink/40 px-4 text-[12.5px] tracking-[0.02em] text-bone placeholder:text-mute/60 transition-colors duration-500 focus:border-gold/55 focus:outline-none"
                  />
                  <button type="submit" className={`${actionClass('solid', 'md', 'h-11 shrink-0')}`}>
                    Inscribe
                  </button>
                </div>
                <p className="mt-3 text-[10px] leading-relaxed text-mute/60">
                  A single letter, never a ledger of your habits.
                </p>
              </form>
            )}
          </div>
        </div>

        <Ornament className="mt-16 opacity-70" />

        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          <div>
            <h3 className="eyebrow text-mute">The Chapters</h3>
            <ul className="mt-5 space-y-3.5">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/${category.id}`} className={columnLink}>
                    <span className="font-inscribed text-[9px] tracking-[0.16em] text-gold/35">
                      {category.numeral}
                    </span>
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-mute">The Archive</h3>
            <ul className="mt-5 space-y-3.5">
              <li>
                <Link to="/world" className={columnLink}>
                  The World
                </Link>
              </li>
              <li>
                <Link to="/lore" className={columnLink}>
                  Lore &amp; the ages
                </Link>
              </li>
              <li>
                <button type="button" onClick={onOpenSearch} className={columnLink}>
                  Search the encyclopaedia
                </button>
              </li>
              <li>
                <Link to="/" className={columnLink}>
                  Return to the threshold
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-mute">Colophon</h3>
            <ul className="mt-5 space-y-3.5 text-[12px] leading-[1.6] text-ash/55">
              <li>Set in Cinzel, Cormorant Garamond &amp; Inter.</li>
              <li>Built with React, TypeScript and Tailwind.</li>
              <li>The Erdtree stage is reserved for a Spline scene.</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-gold/10 pt-7 sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-[64ch] text-[10px] leading-[1.85] text-mute/70">
            An unofficial fan work, made for the love of the world and not for profit. Elden Ring and
            all related names are trademarks of FromSoftware, Inc. and Bandai Namco Entertainment.
            This encyclopaedia is not affiliated with, sponsored by or endorsed by either.
          </p>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group inline-flex shrink-0 items-center gap-2.5 self-start font-inscribed text-[8.5px] uppercase tracking-[0.26em] text-mute transition-colors duration-500 hover:text-gold"
          >
            Back to the threshold
            <ArrowUp
              size={12}
              strokeWidth={1.3}
              className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-1"
            />
          </button>
        </div>
      </div>
    </footer>
  )
}
