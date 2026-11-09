import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { SceneSlot } from './SceneSlot'
import { GoldDust } from './GoldDust'
import { Action } from '../ui/Action'
import { scrollToId } from '../../lib/scroll'
import { lineRise, staggerLine } from '../../lib/motion'

/**
 * Full-bleed threshold.
 *
 * The centre of this section is a reserved stage (`SceneSlot`). Until the
 * Spline Erdtree is wired in, `/scene/erdtree.svg` carries the atmosphere —
 * the slot sits exactly where the tree will be, so dropping the scene in
 * later does not move a single piece of type.
 */
export function Hero() {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const backdropY = useTransform(scrollY, [0, 900], [0, 90])
  const contentY = useTransform(scrollY, [0, 900], [0, 60])
  const fade = useTransform(scrollY, [0, 520], [1, 0])

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
      aria-label="Elden Ring — an interactive encyclopaedia"
    >
      {/* temporary atmospheric backdrop */}
      <motion.div
        aria-hidden
        style={reduced ? undefined : { y: backdropY }}
        className="absolute inset-x-0 -top-[10%] -z-20 h-[120%]"
      >
        <img
          src="/scene/erdtree.svg"
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-[50%_58%]"
          draggable={false}
        />
      </motion.div>

      {/* ink wash that keeps the type legible over the light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_52%_46%_at_50%_48%,rgba(5,5,4,0.82)_0%,rgba(5,5,4,0.52)_55%,rgba(5,5,4,0.12)_80%,rgba(5,5,4,0)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[22vh] bg-gradient-to-b from-ink via-ink/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[26vh] bg-gradient-to-t from-ink via-ink/70 to-transparent"
      />

      {/* the reserved stage for the Erdtree scene */}
      <SceneSlot />

      <GoldDust />

      <motion.div
        style={reduced ? undefined : { y: contentY }}
        className="relative z-10 flex w-full max-w-[92rem] -translate-y-4 flex-col items-center px-6 pb-32 pt-24 text-center sm:-translate-y-6 sm:pb-32"
      >
        <motion.div
          variants={staggerLine(0.13, 0.32)}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div variants={lineRise} className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold/30 sm:w-16" aria-hidden />
            <span className="eyebrow text-gold/70">Volume I · The Shattering</span>
            <span className="h-px w-10 bg-gold/30 sm:w-16" aria-hidden />
          </motion.div>

          <h1 className="mt-8 font-inscribed text-[clamp(2.05rem,8.4vw,7rem)] font-normal uppercase leading-[1.02] tracking-[0.14em] text-transparent [text-wrap:balance] sm:mt-10">
            <motion.span variants={lineRise} className="wordmark block">
              Elden Ring
            </motion.span>
          </h1>

          <motion.p
            variants={lineRise}
            className="mt-7 max-w-[24rem] text-balance font-inscribed text-[9px] uppercase leading-[2.2] tracking-[0.32em] text-ash/80 [text-wrap:balance] sm:mt-9 sm:max-w-none sm:text-[10.5px]"
          >
            <span className="block sm:inline">The Lands Between</span>
            <span className="mx-2 hidden text-gold/60 sm:inline">—</span>
            <span className="mt-1.5 block sm:mt-0 sm:inline">an interactive encyclopaedia</span>
          </motion.p>

          <motion.div variants={lineRise} className="mt-11 sm:mt-14">
            <Action
              variant="solid"
              size="lg"
              to="/world"
              className="px-9 shadow-[0_28px_60px_-24px_rgba(0,0,0,0.95)] sm:px-11"
              ariaLabel="Enter the Lands Between — go to the World chapter"
            >
              Enter the Lands Between
              <ArrowRight
                size={15}
                strokeWidth={1.5}
                className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
              />
            </Action>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 1.1 }}
        style={reduced ? undefined : { opacity: fade }}
        className="absolute inset-x-0 bottom-7 z-10 flex justify-center sm:bottom-9"
      >
        <button
          type="button"
          onClick={() => scrollToId('world')}
          className="group flex flex-col items-center gap-3"
          aria-label="Scroll to the introduction"
        >
          <span className="font-inscribed text-[8px] uppercase tracking-[0.34em] text-ash/70 transition-colors duration-500 group-hover:text-gold">
            Scroll
          </span>
          <span className="relative block h-11 w-px overflow-hidden bg-gold/30" aria-hidden>
            <span className="animate-scroll-cue absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-gold to-transparent" />
          </span>
          <ChevronDown
            size={13}
            strokeWidth={1.2}
            className="text-gold/50 transition-transform duration-500 ease-out-expo group-hover:translate-y-0.5"
          />
        </button>
      </motion.div>

    </section>
  )
}
