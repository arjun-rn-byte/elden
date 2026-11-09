import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Search, X } from 'lucide-react'
import { categories } from '../../lib/data'
import { useActiveSection, useScrollProgress, useScrolled } from '../../hooks/useArchive'
import { scrollToId } from '../../lib/scroll'
import { cn } from '../../lib/cn'
import { MobileMenu } from './MobileMenu'

export function SiteHeader({ onOpenSearch }: { onOpenSearch: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolled(24)
  const progress = useScrollProgress()
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const activeSection = useActiveSection(['home', ...categories.map((category) => category.id)])

  // On the home page the header follows the reading position; elsewhere it
  // follows the route.
  const activeId = onHome ? activeSection : pathname.replace(/^\//, '')

  const items = [
    { id: 'home', label: 'Home', to: '/' },
    ...categories.map((category) => ({
      id: category.id,
      label: category.label,
      to: `/${category.id}`,
    })),
  ]

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-700',
          scrolled || menuOpen || !onHome
            ? 'border-b border-gold/12 bg-ink/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="mx-auto flex h-[68px] w-full max-w-[94rem] items-center justify-between gap-4 px-5 sm:px-8 lg:h-[76px] lg:gap-8 lg:px-12">
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-3"
            aria-label="Elden Ring — back to the home page"
          >
            <span className="relative flex h-7 w-7 items-center justify-center" aria-hidden>
              <span className="absolute inset-0 rotate-45 border border-gold/40 transition-transform duration-[1400ms] ease-out-expo group-hover:rotate-[135deg]" />
              <span className="h-1 w-1 rotate-45 bg-gold/80" />
            </span>
            <span className="flex flex-col">
              <span className="font-inscribed text-[10px] uppercase leading-none tracking-[0.3em] text-bone transition-colors duration-500 group-hover:text-gold sm:text-[11px]">
                Elden&nbsp;Ring
              </span>
              <span className="mt-1.5 hidden text-[7.5px] uppercase tracking-[0.3em] text-mute lg:block">
                An interactive encyclopaedia
              </span>
            </span>
          </Link>

          <nav aria-label="Chapters" className="hidden items-center gap-5 lg:flex xl:gap-8">
            {items.map((item) => (
              <Link
                key={item.id}
                to={item.to}
                aria-current={activeId === item.id ? 'page' : undefined}
                onClick={() => {
                  if (item.id === 'home' && onHome) scrollToId('home')
                }}
                className={cn(
                  'link-vein relative py-2 font-inscribed text-[9.5px] uppercase tracking-[0.2em] transition-colors duration-500 xl:text-[10px] xl:tracking-[0.24em]',
                  activeId === item.id ? 'text-gold' : 'text-ash/70 hover:text-bone',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onOpenSearch}
              className="group hidden h-9 items-center gap-2.5 border border-gold/15 px-3.5 text-ash/70 transition-colors duration-500 hover:border-gold/40 hover:text-gold lg:flex"
              aria-label="Search the encyclopaedia"
            >
              <Search size={13} strokeWidth={1.3} />
              <span className="font-inscribed text-[9px] uppercase tracking-[0.22em]">Search</span>
              <kbd className="ml-1 hidden rounded-[1px] border border-gold/15 px-1.5 py-[1px] font-sans text-[9px] tracking-normal text-mute xl:block">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search the encyclopaedia"
              className="flex h-9 w-9 items-center justify-center border border-gold/15 text-ash/70 transition-colors hover:border-gold/40 hover:text-gold lg:hidden"
            >
              <Search size={14} strokeWidth={1.3} />
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="flex h-9 w-9 items-center justify-center border border-gold/15 text-ash/80 transition-colors hover:border-gold/40 hover:text-gold lg:hidden"
            >
              {menuOpen ? <X size={15} strokeWidth={1.4} /> : <Menu size={15} strokeWidth={1.4} />}
            </button>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden bg-gold/10" aria-hidden>
          <div
            className="h-full bg-[linear-gradient(90deg,rgba(198,164,90,0.15),#c6a45a_70%,#eddbb0)] transition-[width] duration-150 ease-linear"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onOpenSearch={onOpenSearch} />
    </>
  )
}
