import { cn } from '../../lib/cn'

/** The archive's mark: a compass rose held inside a broken ring. */
export function Sigil({ className, size = 34 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={cn('text-gold', className)}
      aria-hidden
    >
      <circle cx="32" cy="32" r="25" stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.9" />
      <circle cx="32" cy="32" r="29" stroke="currentColor" strokeOpacity="0.16" strokeWidth="0.7" />
      <path
        d="M32 3v7M32 54v7M3 32h7M54 32h7"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="0.9"
      />
      <circle
        cx="32"
        cy="32"
        r="18"
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeWidth="0.8"
        strokeDasharray="1 5"
      />
      <path
        d="M32 13.5 36.4 27.6 49 32l-12.6 4.4L32 50.5 27.6 36.4 15 32l12.6-4.4Z"
        stroke="currentColor"
        strokeOpacity="0.85"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      <path
        d="M32 21.5 34.6 29.4 42 32l-7.4 2.6L32 42.5 29.4 34.6 22 32l7.4-2.6Z"
        fill="currentColor"
        fillOpacity="0.9"
      />
      <circle cx="32" cy="32" r="2.4" fill="#090909" />
    </svg>
  )
}
