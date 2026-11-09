import { Sigil } from '../components/ui/Sigil'
import { cn } from '../lib/cn'

/** Shown while WebGL warms up, or in its place when 3D is disabled. */
export function SigilFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn('relative flex h-full w-full items-center justify-center', className)}
      aria-hidden
    >
      <div
        className="absolute h-[26rem] w-[26rem] rounded-full blur-[70px]"
        style={{
          background:
            'radial-gradient(circle, rgba(198,164,90,0.12) 0%, rgba(198,164,90,0.03) 45%, rgba(9,9,9,0) 70%)',
        }}
      />
      <Sigil size={210} className="animate-breathe opacity-30" />
    </div>
  )
}
