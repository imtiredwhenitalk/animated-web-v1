import { useState, useEffect } from 'react'
import './Loader.css'

function Animated_Loader({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'fadeout' | 'done'>('loading')

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); return 100 }
        return prev + 1
      })
    }, 28)
    const timer = setTimeout(() => startExit(), 3000)
    return () => { clearInterval(interval); clearTimeout(timer) }
  }, [])

  useEffect(() => {
    const skip = () => { if (phase === 'loading') startExit() }
    window.addEventListener('keydown', skip)
    return () => window.removeEventListener('keydown', skip)
  }, [phase])

  const startExit = () => {
    if (phase !== 'loading') return
    setPhase('fadeout')
    setTimeout(() => setPhase('done'), 1200)
  }

  return (
    <>
      {/* ── Планета — тільки під час лоадера ── */}
      {phase !== 'done' && (
        <div
          className="fixed z-[9998] pointer-events-none"
          style={
            phase === 'loading'
              ? {
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '400px',
                  height: '400px',
                  transition: 'none',
                  opacity: 1,
                }
              : {
                  top: '-15%',
                  right: '-10%',
                  left: 'auto',
                  transform: 'none',
                  width: '1000px',
                  height: '1000px',
                  transition: 'all 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: 0,
                }
          }
        >
          <video
            autoPlay muted loop playsInline
            className="w-full h-full object-contain"
          >
            <source src="/assets/planet.webm" type="video/webm" />
            <source src="/assets/planet.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      {/* ── Головний сайт ── */}
      <div
        style={{
          transition: 'opacity 1000ms ease-in-out, filter 1000ms ease-in-out, transform 1000ms ease-in-out',
          opacity: phase === 'loading' ? 0 : 1,
          filter: phase === 'loading' ? 'blur(4px)' : 'blur(0px)',
          transform: phase === 'loading' ? 'scale(1.02)' : 'scale(1)',
          pointerEvents: phase === 'loading' ? 'none' : 'auto',
        }}
      >
        {children}
      </div>

      {/* ── Лоадер фон + UI ── */}
      {phase !== 'done' && (
        <div
          className="fixed inset-0 z-[9997] overflow-hidden"
          style={{
            opacity: phase === 'fadeout' ? 0 : 1,
            transition: 'opacity 1200ms ease-in-out',
            pointerEvents: phase === 'fadeout' ? 'none' : 'auto',
          }}
        >
          {/* Космос */}
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/assets/cosmos.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/50" />

          {/* UI */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8">

            {/* Місце планети */}
            <div style={{ width: 400, height: 400 }} />

            {/* Текст */}
            <div className="text-center -mt-2">
              <p className="text-white/90 text-sm font-semibold tracking-[0.25em] uppercase mb-2">
                Loading
                <span className="loader-dot text-emerald-400">.</span>
                <span className="loader-dot loader-dot-2 text-emerald-400">.</span>
                <span className="loader-dot loader-dot-3 text-emerald-400">.</span>
              </p>
              <p className="text-white/30 text-xs tracking-widest uppercase">
                Preparing your experience
              </p>
            </div>

            {/* Прогрес */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-600 to-emerald-300 rounded-full transition-all duration-100"
                  style={{
                    width: `${progress}%`,
                    boxShadow: '0 0 6px rgba(110,231,183,0.7)',
                  }}
                />
              </div>
              <span className="text-white/30 text-[11px] font-mono">{progress}%</span>
            </div>
          </div>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/20 text-[11px] tracking-widest uppercase animate-pulse">
            Press any key to skip
          </p>
        </div>
      )}
    </>
  )
}

export default Animated_Loader