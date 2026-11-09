import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Search } from 'lucide-react'
import { categories, countByCategory } from '../../lib/data'
import { EASE } from '../../lib/motion'
import { useLockBodyScroll } from '../../hooks/useArchive'
import { cn } from '../../lib/cn'
import { actionClass } from '../ui/Action'
import { Diamond } from '../ui/Ornament'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  onOpenSearch: () => void
}

export function MobileMenu({ open, onClose, onOpenSearch }: MobileMenuProps) {
  useLockBodyScroll(open)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-40 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Chapter navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/93 backdrop-blur-2xl"
          />

          <motion.div
            className="relative flex h-full flex-col overflow-y-auto px-6 pb-10 pt-20"
            initial={{ y: -14 }}
            animate={{ y: 0 }}
            exit={{ y: -10 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="flex items-center gap-3">
              <Diamond />
              <span className="eyebrow">The Encyclopaedia · Six Chapters</span>
            </div>

            <nav aria-label="Chapters">
              <ul className="mt-6 border-t border-gold/12">
                <li className="border-b border-gold/12">
                  <Link
                    to="/"
                    onClick={onClose}
                    className="group flex w-full items-baseline justify-between gap-4 py-3.5 text-left"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-inscribed text-[10px] tracking-[0.2em] text-gold/45 transition-colors group-hover:text-gold">
                        ✦
                      </span>
                      <span className="font-display text-[1.5rem] leading-none text-bone/90 transition-colors duration-300 group-hover:text-gold">
                        Home
                      </span>
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-mute">
                        Top
                      </span>
                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.2}
                        className="text-gold/40 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
                      />
                    </span>
                  </Link>
                </li>
                {categories.map((category, index) => (
                  <motion.li
                    key={category.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.05 * index }}
                    className="border-b border-gold/12"
                  >
                    <Link
                      to={`/${category.id}`}
                      onClick={onClose}
                      className="group flex w-full items-baseline justify-between gap-4 py-3.5 text-left"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-inscribed text-[10px] tracking-[0.2em] text-gold/45 transition-colors group-hover:text-gold">
                          {category.numeral}
                        </span>
                        <span className="font-display text-[1.5rem] leading-none text-bone/90 transition-colors duration-300 group-hover:text-gold">
                          {category.label}
                        </span>
                      </span>
                      <span className="flex items-center gap-3">
                        <span className="font-sans text-[10px] tracking-[0.18em] text-mute">
                          {String(countByCategory(category.id)).padStart(2, '0')}
                        </span>
                        <ArrowUpRight
                          size={15}
                          strokeWidth={1.2}
                          className="text-gold/40 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
                        />
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.32 }}
              className="mt-auto pt-10"
            >
              <button
                type="button"
                onClick={() => {
                  onClose()
                  window.setTimeout(onOpenSearch, 260)
                }}
                className={cn(actionClass('outline', 'lg'), 'w-full')}
              >
                <Search size={14} strokeWidth={1.3} />
                Search the encyclopaedia
              </button>
              <p className="mt-5 text-center font-inscribed text-[8.5px] uppercase tracking-[0.3em] text-mute">
                The Lands Between · MMXXVI
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
