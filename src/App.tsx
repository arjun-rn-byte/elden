import { useCallback, useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { Atmosphere } from './components/atmosphere/Atmosphere'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { SiteHeader } from './components/layout/SiteHeader'
import { SiteFooter } from './components/layout/SiteFooter'
import { SearchDialog } from './components/search/SearchDialog'
import { HomePage } from './pages/HomePage'
import { ChapterPage } from './pages/ChapterPage'
import { WorldPage } from './pages/WorldPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { chapterPath, getChapter } from './lib/chapters'
import { entries } from './lib/data'

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false)
  const navigate = useNavigate()

  const openSearch = useCallback(() => setSearchOpen(true), [])

  const searchEntry = useCallback(
    (id: string) => {
      const entry = entries.find((candidate) => candidate.id === id)
      setSearchOpen(false)
      if (entry) navigate(`${chapterPath(entry.category)}?entry=${entry.id}`)
    },
    [navigate],
  )

  const searchSection = useCallback(
    (id: string) => {
      setSearchOpen(false)
      navigate(id === 'home' ? '/' : `/${id}`)
    },
    [navigate],
  )

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen((value) => !value)
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:border focus:border-gold/50 focus:bg-ink focus:px-4 focus:py-2 focus:font-inscribed focus:text-[10px] focus:uppercase focus:tracking-[0.2em] focus:text-gold"
      >
        Skip to the content
      </a>

      <ScrollToTop />
      <Atmosphere />

      <div className="relative flex min-h-screen flex-col">
        <SiteHeader onOpenSearch={openSearch} />

        <main id="main" className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* The world chapter is an atlas of its own, not a leaf index. */}
            <Route path="/world" element={<WorldPage />} />
            <Route path="/:chapter" element={<ChapterPageRoute />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <SiteFooter onOpenSearch={openSearch} />
      </div>

      <SearchDialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectEntry={searchEntry}
        onSelectSection={searchSection}
      />
    </MotionConfig>
  )
}

/** Validates the `:chapter` slug before rendering a chapter page. */
function ChapterPageRoute() {
  const { chapter: slug } = useParams()
  const chapter = getChapter(slug)
  if (!chapter) return <NotFoundPage />
  return <ChapterPage chapter={chapter} key={chapter.id} />
}
