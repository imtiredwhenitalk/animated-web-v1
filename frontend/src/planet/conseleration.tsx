import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as THREE from 'three'
import { ZODIAC_SIGNS } from './zodiacData'

const SHAPES = [
  [[20, 70], [38, 55], [55, 45], [70, 35], [82, 25]],
  [[50, 20], [35, 35], [65, 35], [25, 55], [75, 55], [15, 75], [85, 75]],
  [[25, 15], [22, 40], [20, 65], [18, 88], [70, 12], [68, 38], [66, 62], [64, 86]],
  [[50, 15], [30, 40], [70, 40], [50, 60], [35, 85], [65, 85]],
  [[20, 35], [22, 18], [38, 12], [50, 22], [42, 40], [30, 50], [65, 45], [88, 50], [70, 70]],
  [[15, 20], [30, 35], [25, 55], [45, 45], [55, 30], [70, 50], [85, 80]],
  [[50, 15], [25, 55], [75, 55], [35, 85], [65, 85]],
  [[15, 25], [25, 18], [35, 25], [40, 40], [45, 55], [55, 65], [68, 68], [78, 60], [85, 45], [80, 30]],
  [[20, 45], [35, 30], [55, 28], [70, 40], [68, 60], [50, 65], [32, 60], [80, 35]],
  [[15, 35], [40, 20], [70, 25], [85, 55], [55, 75], [25, 60]],
  [[20, 20], [35, 35], [25, 50], [45, 55], [60, 45], [55, 65], [75, 75], [85, 60]],
  [[15, 25], [30, 40], [42, 55], [50, 70], [58, 55], [70, 40], [85, 25]],
] as const

const EDGES = [[0, 1], [1, 2], [2, 3], [3, 4], [1, 3], [3, 5], [5, 6], [6, 7], [7, 8], [8, 9]] as const

function AtlasScene({ points }: { points: readonly (readonly [number, number])[] }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = ref.current
    if (!mount) return
    const probe = document.createElement('canvas')
    if (!probe.getContext('webgl') && !probe.getContext('experimental-webgl')) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.set(0, 0, 8)
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)
    const material = new THREE.LineBasicMaterial({ color: 0x8ea7ff, transparent: true, opacity: 0.55 })
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffedb0 })
    const scale = 0.075
    const offset = -3.75

    EDGES.forEach(([a, b]) => {
      if (!points[a] || !points[b]) return
      const line = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(points[a][0] * scale + offset, -(points[a][1] - 50) * scale, 0),
        new THREE.Vector3(points[b][0] * scale + offset, -(points[b][1] - 50) * scale, 0),
      ])
      group.add(new THREE.Line(line, material))
    })

    points.forEach(([x, y], index) => {
      const star = new THREE.Mesh(new THREE.SphereGeometry(index === 0 ? 0.12 : 0.07, 12, 12), starMaterial)
      star.position.set(x * scale + offset, -(y - 50) * scale, 0)
      group.add(star)
    })

    const resize = () => {
      const width = mount.clientWidth || 600
      const height = mount.clientHeight || 500
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    }
    resize()
    window.addEventListener('resize', resize)
    let frame = 0
    const animate = () => {
      frame = requestAnimationFrame(animate)
      group.rotation.y += 0.0015
      group.rotation.z = Math.sin(Date.now() * 0.00025) * 0.025
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      group.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          if (Array.isArray(object.material)) object.material.forEach((item) => item.dispose())
          else object.material.dispose()
        }
        if (object instanceof THREE.Line) {
          object.geometry.dispose()
          object.material.dispose()
        }
      })
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [points])

  return (
    <div ref={ref} className="atlas-scene" aria-label="Інтерактивна карта сузір'я">
      <div className="atlas-fallback-stars" aria-hidden="true">✦</div>
    </div>
  )
}

export default function Constellation() {
  const navigate = useNavigate()
  const [active, setActive] = useState(3)
  const sign = ZODIAC_SIGNS[active]
  const points = useMemo(() => SHAPES[active], [active])

  return (
    <main className="atlas-page">
      <header className="atlas-header">
        <button className="atlas-back" onClick={() => navigate('/')}>← Сонячна система</button>
        <span className="atlas-mark">NIGHT ATLAS · 2026</span>
      </header>

      <section className="atlas-intro">
        <p className="atlas-kicker">ЗОДІАК · НЕБЕСНА КАРТА</p>
        <h1>Те, що видно<br /><em>між зірками.</em></h1>
        <p className="atlas-lead">Дванадцять сузір’їв уздовж екліптики. Обери знак, щоб розглянути його форму та відкрити окрему сторінку.</p>
      </section>

      <section className="atlas-workspace">
        <div className="atlas-visual">
          <div className="atlas-visual-label">{String(active + 1).padStart(2, '0')} / 12 · {sign.constellation}</div>
          <AtlasScene points={points} />
          <div className="atlas-visual-caption">Наведи / обери знак у списку праворуч</div>
        </div>
        <aside className="atlas-index">
          <div className="atlas-index-heading"><span>Знаки</span><span>12</span></div>
          <div className="atlas-list">
            {ZODIAC_SIGNS.map((item, index) => (
              <button key={item.id} className={`atlas-item ${active === index ? 'is-selected' : ''}`} onClick={() => setActive(index)}>
                <span className="atlas-item-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="atlas-item-symbol">{item.symbol}</span>
                <span className="atlas-item-name">{item.name}</span>
                <span className="atlas-item-element">{item.element}</span>
              </button>
            ))}
          </div>
          <div className="atlas-detail">
            <p>{sign.dates}</p>
            <h2>{sign.name}</h2>
            <span>{sign.description}</span>
            <Link to={`/zodiac/${sign.id}`}>Відкрити досьє знака <b>↗</b></Link>
          </div>
        </aside>
      </section>
    </main>
  )
}