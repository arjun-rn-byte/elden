/**
 * Fixed atmospheric bed for the whole site: base ink, cinematic vignette,
 * two drifting fog banks and a film-grain plate above everything.
 */
export function Atmosphere() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink" aria-hidden>
        <div className="vignette absolute inset-0" />

        <div
          className="absolute -left-[18%] top-[-6%] h-[46rem] w-[46rem] rounded-full blur-[110px] sm:h-[60rem] sm:w-[60rem]"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(198,164,90,0.11) 0%, rgba(198,164,90,0.03) 42%, rgba(9,9,9,0) 70%)',
            animation: 'fog-drift-a 54s ease-in-out infinite',
          }}
        />
        <div
          className="absolute -right-[22%] top-[30%] h-[42rem] w-[42rem] rounded-full blur-[120px] sm:h-[52rem] sm:w-[52rem]"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(124,38,34,0.13) 0%, rgba(124,38,34,0.04) 45%, rgba(9,9,9,0) 72%)',
            animation: 'fog-drift-b 72s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-[-14%] left-[18%] h-[38rem] w-[38rem] rounded-full blur-[130px] sm:h-[48rem] sm:w-[48rem]"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(90,104,126,0.09) 0%, rgba(9,9,9,0) 68%)',
            animation: 'fog-drift-a 88s ease-in-out infinite reverse',
          }}
        />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      </div>

      <div className="film-grain" aria-hidden />
    </>
  )
}
