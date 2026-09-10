import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as THREE from 'three'
import { ZODIAC_SIGNS } from './zodiacData'
import type { ZodiacSign } from './zodiacData'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const SHAPES = [
  [[20, 70], [38, 55], [55, 45], [70, 35], [82, 25]], [[50, 20], [35, 35], [65, 35], [25, 55], [75, 55]],
  [[25, 15], [22, 40], [20, 65], [70, 12], [68, 38], [66, 62]], [[50, 15], [30, 40], [70, 40], [50, 60], [35, 85], [65, 85]],
  [[20, 35], [22, 18], [38, 12], [50, 22], [42, 40], [30, 50], [65, 45], [88, 50]], [[15, 20], [30, 35], [25, 55], [45, 45], [55, 30], [70, 50], [85, 80]],
  [[50, 15], [25, 55], [75, 55], [35, 85], [65, 85]], [[15, 25], [25, 18], [35, 25], [40, 40], [45, 55], [55, 65], [68, 68], [78, 60]],
  [[20, 45], [35, 30], [55, 28], [70, 40], [68, 60], [50, 65], [32, 60], [80, 35]], [[15, 35], [40, 20], [70, 25], [85, 55], [55, 75], [25, 60]],
  [[20, 20], [35, 35], [25, 50], [45, 55], [60, 45], [55, 65], [75, 75]], [[15, 25], [30, 40], [42, 55], [50, 70], [58, 55], [70, 40], [85, 25]],
] as const
const LINKS = [[0, 1], [1, 2], [2, 3], [3, 4], [1, 3], [3, 5], [5, 6], [6, 7]] as const

function ZodiacScene({ points }: { points: readonly (readonly [number, number])[] }) {
  const mountRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const probe = document.createElement('canvas')
    if (!probe.getContext('webgl') && !probe.getContext('experimental-webgl')) return
    let renderer: THREE.WebGLRenderer
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' }) } catch { return }
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, 1, .1, 100)
    camera.position.z = 8
    const group = new THREE.Group()
    scene.add(group)
    const material = new THREE.LineBasicMaterial({ color: 0x91a8ff, transparent: true, opacity: .7 })
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffedb0 })
    const scale = .075
    const point = ([x, y]: readonly [number, number]) => new THREE.Vector3(x * scale - 3.75, -(y - 50) * scale, 0)
    LINKS.forEach(([a, b]) => { if (points[a] && points[b]) group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([point(points[a]), point(points[b])]), material)) })
    points.forEach((value, index) => { const star = new THREE.Mesh(new THREE.SphereGeometry(index === 0 ? .13 : .07, 14, 14), starMaterial); star.position.copy(point(value)); group.add(star) })
    const resize = () => { const w = mount.clientWidth || 600; const h = mount.clientHeight || 420; camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h, false) }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); mount.appendChild(renderer.domElement); resize(); window.addEventListener('resize', resize)
    let frame = 0
    const animate = () => { frame = requestAnimationFrame(animate); group.rotation.y += .0018; renderer.render(scene, camera) }
    animate()
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); renderer.dispose(); if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement) }
  }, [points])
  return <div ref={mountRef} className="zodiac-3d-scene"><span className="zodiac-scene-fallback">✦</span></div>
}

export default function ZodiacSignPage() {
  const { sign } = useParams<{ sign: string }>()
  const navigate = useNavigate()
  const fallback = ZODIAC_SIGNS.find((item) => item.id === sign)
  const [data, setData] = useState<ZodiacSign | null>(fallback || null)
  const [apiStatus, setApiStatus] = useState<'loading' | 'ready' | 'offline'>('loading')
  const index = Math.max(0, ZODIAC_SIGNS.findIndex((item) => item.id === sign))
  const next = ZODIAC_SIGNS[(index + 1) % ZODIAC_SIGNS.length]
  const points = useMemo(() => SHAPES[index] || SHAPES[0], [index])

  useEffect(() => {
    if (!sign) return
    fetch(`${API_URL}/api/zodiac/${sign}`).then((response) => { if (!response.ok) throw new Error('Not found'); return response.json() }).then((result) => { setData(result.data); setApiStatus('ready') }).catch(() => setApiStatus('offline'))
  }, [sign])

  if (!data) return <main className="zodiac-page"><Link to="/constellation">← До знаків зодіаку</Link><h1>Знак не знайдено</h1></main>

  return (
    <main className="zodiac-dossier">
      <header className="dossier-header"><Link to="/constellation">← Атлас сузір’їв</Link><span>FIELD NOTE / {String(index + 1).padStart(2, '0')}</span></header>
      <section className="dossier-grid">
        <div className="dossier-copy">
          <p className="dossier-kicker">{data.constellation} · ЗОДІАК</p>
          <div className="dossier-sign">{data.symbol}</div>
          <h1>{data.name}</h1>
          <p className="dossier-subtitle">{data.description}</p>
          <div className="dossier-facts">
            <div><span>Період знака</span><strong>{data.dates}</strong></div>
            <div><span>Найкраще шукати</span><strong>{index < 6 ? 'навесні та на початку літа' : 'восени та взимку'}</strong></div>
            <div><span>Стихія</span><strong>{data.element}</strong></div>
          </div>
          <p className="dossier-note">Це не буквальний портрет, а умовний малюнок, який люди століттями складали з віддалених одна від одної зірок. У темному небі його легше знайти поруч із сусідніми сузір’ями.</p>
          <div className="dossier-actions"><button onClick={() => navigate(`/zodiac/${next.id}`)}>Наступний знак →</button><span>{apiStatus === 'ready' ? 'Дані синхронізовано' : 'Показано локальні дані'}</span></div>
        </div>
        <div className="dossier-sky"><div className="dossier-sky-label">ЗОРЯНА СХЕМА · LIVE</div><ZodiacScene points={points} /><p>Схема обертається повільно. Перейдіть до атласу, щоб обрати інше сузір’я.</p></div>
      </section>
    </main>
  )
}
