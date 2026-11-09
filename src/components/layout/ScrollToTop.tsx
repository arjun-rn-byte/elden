import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Every route starts at its own top; hashes keep native scroll behaviour. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}
