import { useEffect, useRef } from 'react'
import { ArrowLeft, ExternalLink, Move3d, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'

const STARS = [
  [-2.8, 1.7, 0.3], [-1.45, 1.0, -0.1], [0, 1.45, 0.2], [1.55, 0.95, -0.2],
  [2.7, 1.75, 0.15], [-1.2, -0.55, 0.2], [0.15, -0.9, -0.15], [1.5, -0.55, 0.18],
  [0.05, 2.75, -0.15],
] as const

const LINKS = [[0, 1], [1, 2], [2, 3], [3, 4], [1, 5], [5, 6], [6, 7], [2, 6], [2, 8]]

function CancerScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const canvas = document.createElement('canvas')
    const webglAvailable = Boolean(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    if (!webglAvailable) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 0.2, 10)
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch (error) {
      console.warn('WebGL unavailable for Cancer scene:', error)
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const constellation = new THREE.Group()
    scene.add(constellation)

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x8cb7e8, transparent: true, opacity: 0.65 })
    LINKS.forEach(([from, to]) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...STARS[from]), new THREE.Vector3(...STARS[to]),
      ])
      constellation.add(new THREE.Line(geometry, lineMaterial))
    })

    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xdcecff })
    STARS.forEach(([x, y, z], index) => {
      const star = new THREE.Mesh(new THREE.SphereGeometry(index === 2 ? 0.13 : 0.08, 16, 16), starMaterial)
      star.position.set(x, y, z)
      constellation.add(star)
    })

    const cluster = new THREE.Group()
    for (let i = 0; i < 70; i += 1) {
      const angle = i * 2.399
      const radius = 0.15 + Math.sqrt(i / 70) * 0.62
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(i % 9 === 0 ? 0.035 : 0.018, 8, 8),
        new THREE.MeshBasicMaterial({ color: i % 9 === 0 ? 0xffe7a8 : 0x9ab9e8, transparent: true, opacity: 0.8 }),
      )
      dot.position.set(0.15 + Math.cos(angle) * radius, -0.15 + Math.sin(angle) * radius, 0.1)
      cluster.add(dot)
    }
    constellation.add(cluster)

    const dust = new THREE.BufferGeometry()
    const dustPositions = new Float32Array(900)
    for (let i = 0; i < dustPositions.length; i += 1) dustPositions[i] = (Math.random() - 0.5) * 26
    dust.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3))
    scene.add(new THREE.Points(dust, new THREE.PointsMaterial({ color: 0x9fb8d8, size: 0.025, transparent: true, opacity: 0.55 })))

    let frame = 0
    let dragging = false
    let previousX = 0
    let previousY = 0
    const onPointerDown = (event: PointerEvent) => { dragging = true; previousX = event.clientX; previousY = event.clientY }
    const onPointerUp = () => { dragging = false }
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return
      constellation.rotation.y += (event.clientX - previousX) * 0.006
      constellation.rotation.x += (event.clientY - previousY) * 0.002
      previousX = event.clientX; previousY = event.clientY
    }
    mount.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointermove', onPointerMove)

    const animate = () => {
      frame = requestAnimationFrame(animate)
      if (!dragging) constellation.rotation.y += 0.0018
      cluster.rotation.z -= 0.002
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const width = mount.clientWidth
      const height = mount.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frame)
      mount.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="cancer-scene" aria-label="Тривимірна модель сузір'я Рака"><div className="cancer-webgl-fallback">♋<span>3D-графіка недоступна, але сторінка працює</span></div></div>
}

export default function Cancer() {
  const navigate = useNavigate()

  return (
    <main className="cancer-page">
      <div className="cancer-glow" />
      <header className="cancer-header">
        <button className="cancer-back" onClick={() => navigate('/planets')}><ArrowLeft size={16} /> Сонячна система</button>
        <div className="cancer-kicker"><Star size={14} /> ЗОДІАК / 04</div>
      </header>

      <section className="cancer-layout">
        <div className="cancer-copy">
          <p className="cancer-eyebrow">Cancer · ♋</p>
          <h1>Рак</h1>
          <p className="cancer-lead">Невелике, майже непомітне сузір’я між Близнюками та Левом.</p>
          <div className="cancer-facts">
            <div><span>Період</span><strong>21 червня — 22 липня</strong></div>
            <div><span>Найяскравіша зоря</span><strong>Альтарф · β Cnc</strong></div>
            <div><span>Відстань</span><strong>≈ 290 світлових років</strong></div>
          </div>
          <p className="cancer-note">У центрі моделі видно Ясла (M44) — відкрите зоряне скупчення, яке можна побачити неозброєним оком у темному небі.</p>
          <div className="cancer-actions">
            <button onClick={() => navigate('/constellation')}><Move3d size={16} /> Усі знаки зодіаку</button>
            <a href="https://en.wikipedia.org/wiki/Cancer_(constellation)" target="_blank" rel="noreferrer"><ExternalLink size={15} /> Джерела</a>
          </div>
        </div>
        <div className="cancer-visual"><CancerScene /><div className="cancer-caption">Потягніть, щоб повернути карту · M44 позначено золотими зорями</div></div>
      </section>

      <style>{`
        .cancer-page { min-height:100vh; overflow:hidden; position:relative; color:#e7f0ff; background:#050a14; font-family:Georgia, 'Times New Roman', serif; }
        .cancer-page:before { content:''; position:absolute; inset:0; opacity:.28; background-image:radial-gradient(#b8d5ff 1px, transparent 1px); background-size:53px 53px; }
        .cancer-glow { position:absolute; width:55vw; height:55vw; right:-14vw; top:8vh; border-radius:50%; background:radial-gradient(circle, rgba(58,104,168,.28), transparent 68%); filter:blur(12px); }
        .cancer-header { position:relative; z-index:1; display:flex; justify-content:space-between; align-items:center; padding:30px clamp(22px, 6vw, 88px); font-family:system-ui, sans-serif; }
        .cancer-back, .cancer-actions button, .cancer-actions a { display:inline-flex; align-items:center; gap:8px; border:1px solid rgba(165,196,235,.28); border-radius:5px; padding:10px 14px; color:#c8dcfa; background:rgba(10,22,40,.72); text-decoration:none; cursor:pointer; font:500 13px system-ui, sans-serif; }
        .cancer-back:hover, .cancer-actions button:hover, .cancer-actions a:hover { border-color:#a9c9f4; background:rgba(26,49,79,.82); }
        .cancer-kicker, .cancer-eyebrow { color:#9cbbe3; letter-spacing:.16em; font:600 12px system-ui, sans-serif; }
        .cancer-kicker { display:flex; align-items:center; gap:7px; }
        .cancer-layout { position:relative; z-index:1; display:grid; grid-template-columns:minmax(280px, .8fr) minmax(420px, 1.2fr); gap:3vw; align-items:center; max-width:1280px; min-height:calc(100vh - 100px); margin:auto; padding:20px 6vw 60px; }
        .cancer-copy { max-width:450px; }
        .cancer-eyebrow { margin:0 0 16px; }
        .cancer-copy h1 { margin:0; color:#f3f7ff; font-size:clamp(64px, 10vw, 132px); font-weight:400; line-height:.84; letter-spacing:-.04em; }
        .cancer-lead { margin:30px 0 26px; color:#b9c8dc; font-size:22px; line-height:1.35; }
        .cancer-facts { border-top:1px solid rgba(160,190,225,.22); border-bottom:1px solid rgba(160,190,225,.22); }
        .cancer-facts div { display:flex; justify-content:space-between; gap:18px; padding:13px 0; border-bottom:1px solid rgba(160,190,225,.12); font:13px system-ui, sans-serif; }
        .cancer-facts div:last-child { border:0; }
        .cancer-facts span { color:#7790ad; } .cancer-facts strong { color:#d8e6fa; font-weight:500; text-align:right; }
        .cancer-note { color:#91a6c0; font:14px/1.65 system-ui, sans-serif; }
        .cancer-actions { display:flex; flex-wrap:wrap; gap:10px; margin-top:26px; }
        .cancer-visual { min-width:0; }
        .cancer-scene { height:min(68vh, 680px); min-height:400px; cursor:grab; } .cancer-scene:active { cursor:grabbing; }
        .cancer-webgl-fallback { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#dcecff; font:120px Georgia, serif; text-shadow:0 0 35px #8cb7e8; }
        .cancer-webgl-fallback span { display:block; max-width:280px; margin-top:18px; color:#91a6c0; text-align:center; font:13px system-ui, sans-serif; text-shadow:none; }
        .cancer-caption { color:#7891ae; text-align:center; font:12px system-ui, sans-serif; }
        @media (max-width: 800px) { .cancer-layout { grid-template-columns:1fr; padding-top:30px; } .cancer-copy { max-width:none; } .cancer-copy h1 { font-size:78px; } .cancer-lead { font-size:18px; margin:20px 0; } .cancer-scene { min-height:300px; height:45vh; } }
      `}</style>
    </main>
  )
}import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../components/Languagecontext'

const navigation = [
  { name: 'Planets', element: <Link to="/planets" /> },
  { name: 'Constellation', element: <Link to="/constellation" /> },

  { name: 'Move to another constellations', element: <Link to="/mars" /> },
]

 export function LegacyCancer() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useLanguage()
  const copy = t.planets.pages.earth

  const navLabel = (name: string) => {
    if (name === 'Planets') return t.planets.ui.planets
    if (name === 'Constellation') return t.planets.ui.constellation
    if (name === 'Move to another constellations') return t.planets.ui.moveToAnotherPlanet
    return name
  }

  return (
    <div className="bg-black min-h-screen">

      {/* Відео на фоні */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 opacity-90"
      >
        <source src="/assets/earth2.mp4" type="video/mp4" />
      </video>

      {/* Темний оверлей */}
      <div className="fixed inset-0 bg-black/40 z-[1]" />

      {/* Весь контент поверх відео */}
      <div className="relative z-10">

        <header className="absolute inset-x-0 top-0 z-50">
          <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">

            {/* Логотип */}
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Cancer</span>
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white&shade=400"
                  className="h-8 w-auto"
                />
              </a>
            </div>

            {/* Бургер на мобільному */}
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Навігація на десктопі */}
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.element.props.to}
                  className="text-sm/6 font-semibold text-white hover:text-indigo-300 transition-colors"
                >
                  {navLabel(item.name)}
                </Link>
              ))}
            </div>
            {/* Log in десктоп */}
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Link
                to="/settings"
                className="text-sm/6 font-semibold text-white hover:text-indigo-300 transition-colors"
              >
                {t.settings.title} <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

          </nav>

          {/* Мобільне меню */}
          <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
            <div className="fixed inset-0 z-50" />
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Earth</span>
                  <img
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white&shade=400"
                    className="h-8 w-auto"
                  />
                </a>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-white"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-white/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.element.props.to}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/10"
                      >
                        {navLabel(item.name)}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    <Link
                      to="/settings"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/10"
                    >
                      {t.settings.title}
                    </Link>
                  </div>
                </div>
              </div>

            </DialogPanel>
          </Dialog>
        </header>

        {/* Hero секція — текст зліва */}
        <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen flex items-center">
          <div className="max-w-xl lg:max-w-2xl lg:ml-24 py-32 sm:py-48 lg:py-56">
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl leading-tight">
              {copy.intro}{' '}
              <span className="#40A0DB">Cancer</span>{' '}
              {' '}
              <span className="#40A0DB">constellation</span>
            </h1>
            <p className="mt-8 text-lg font-medium text-gray-300 sm:text-xl/8">
              {copy.description}
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 transition-colors"
              >
                {copy.primaryAction}
              </a>
              <a
                href="#"
                className="text-sm/6 font-semibold text-white hover:text-indigo-300 transition-colors"
              >
                {copy.secondaryAction}
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}