import { useEffect, useRef, useState } from 'react'
import Animated_Loader from '../components/Loader'

type Props = {
  onClose: () => void
}

type Phase = 'loading' | 'video' | 'ending'

export default function MarsEasterEgg({ onClose }: Props) {
  const [phase, setPhase] = useState<Phase>('loading')
  const [isClosing, setIsClosing] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const closeTimerRef = useRef<number | null>(null)

  const closeMission = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
    setIsClosing(true)
    closeTimerRef.current = window.setTimeout(onClose, 420)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMission()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
    }
  }, [])

  const startMissionFilm = () => {
    setPhase('video')
    window.setTimeout(() => {
      videoRef.current?.play().catch(() => undefined)
    }, 80)
  }

  const finishMissionFilm = () => {
    setPhase('ending')
  }

  if (phase === 'loading') {
    return (
      <Animated_Loader onComplete={startMissionFilm}>
        <div className="min-h-screen bg-[#02030b]" aria-hidden="true" />
      </Animated_Loader>
    )
  }

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden bg-black transition-opacity duration-500 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
      role="dialog"
      aria-modal="true"
      aria-label="SpaceX Future Mars Mission"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={finishMissionFilm}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          filter: phase === 'ending' ? 'brightness(0.24) saturate(0.65)' : 'brightness(0.72) saturate(0.9)',
          transform: 'scale(1.01)',
          transition: 'filter 2200ms ease-in-out',
        }}
      >
        <source src="/assets/marseaster.mp4" type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.34),transparent_28%,transparent_64%,rgba(0,0,0,.7))]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_32%,rgba(0,0,0,.48)_100%)]" />

      <div className={`absolute left-5 top-5 z-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-white/65 transition-opacity duration-700 sm:left-8 sm:top-8 ${phase === 'ending' ? 'opacity-0' : 'opacity-100'}`}>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400" />
        </span>
        SpaceX · Mars Mission Film
      </div>

      <button
        type="button"
        onClick={closeMission}
        className={`absolute right-5 top-5 z-20 rounded-full border border-white/25 bg-black/25 px-4 py-2 text-sm font-semibold text-white/80 backdrop-blur-md transition hover:border-white/70 hover:bg-white/15 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/70 sm:right-8 sm:top-8 ${phase === 'ending' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label="Close mission film"
      >
        Close <span aria-hidden="true">×</span>
      </button>

      <div
        className={`absolute inset-0 z-10 flex items-center justify-center px-6 text-center transition-all duration-[1800ms] ease-out ${phase === 'ending' ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0 pointer-events-none'}`}
        style={{ transitionDelay: phase === 'ending' ? '550ms' : '0ms' }}
      >
        <div className="relative max-w-3xl">
          <div className="mx-auto mb-7 h-px w-24 bg-gradient-to-r from-transparent via-red-300 to-transparent opacity-80" />
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.58em] text-red-200/90 sm:text-xs">Mission accomplished · Mars · 2047</p>
          <h1 className="font-sans text-6xl font-semibold tracking-[-0.06em] text-white drop-shadow-[0_0_30px_rgba(255,255,255,.2)] sm:text-8xl md:text-9xl">SpaceX</h1>
          <div className="mx-auto mt-5 h-px w-40 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
          <p className="mt-6 text-xl font-light tracking-[0.18em] text-white/85 sm:text-3xl">Future Mars Mission</p>
          <p className="mt-5 text-[10px] uppercase tracking-[0.42em] text-white/45 sm:text-xs">A new world begins with one step</p>
          <button
            type="button"
            onClick={closeMission}
            className="mt-10 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/80 backdrop-blur transition hover:border-white hover:bg-white/15 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/70"
          >
            Return to Mars
          </button>
        </div>
      </div>

      <div className={`absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-center text-[9px] uppercase tracking-[0.35em] text-white/45 transition-opacity duration-700 sm:bottom-8 sm:text-[10px] ${phase === 'ending' ? 'opacity-0' : 'opacity-100'}`}>
        Live mission transmission
      </div>
    </div>
  )
}
