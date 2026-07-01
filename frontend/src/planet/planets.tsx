import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'
import { useLanguage } from '../components/Languagecontext'

type PlanetInfo = {
  name: 'Sun' | 'Mercury' | 'Venus' | 'Earth' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | 'Constellation'
  radius?: number
  distance?: number
  speed?: number
  axisSpeed?: number
  tilt: number
  color: string
  emissive: string
  rings: boolean
  stripes?: boolean
  ringsColor?: string
  description: string
  route?: string
}

const PLANETS: PlanetInfo[] = [
  {
    name: 'Sun', radius: 4, distance: 0, speed: 0, axisSpeed: 0,
    tilt: 0,
    color: '#fff7a0', emissive: '#ff4400',
    rings: false,
    description: 'The Sun is the star at the center of the Solar System. It is a nearly perfect sphere of hot plasma, with internal convective motion that generates a magnetic field via a dynamo process.',
    route: '/sun',
  },
  {
    name: 'Mercury', radius: 0.38, distance: 8, speed: 0.047, axisSpeed: 0.003,
    tilt: 0.03,
    color: '#b5b5b5', emissive: '#2a2a2a',
    rings: false,
    description: 'Smallest planet · No atmosphere · -180°C to 430°C', route: '/mercury',
  },
  {
    name: 'Venus', radius: 0.95, distance: 13, speed: 0.035, axisSpeed: -0.001,
    tilt: 177.4,
    color: '#e8cda0', emissive: '#3d2a00',
    rings: false,
    description: 'Hottest planet · Thick CO₂ atmosphere · 465°C', route: '/venus',
  },
  {
    name: 'Earth', radius: 1.0, distance: 19, speed: 0.029, axisSpeed: 0.02,
    tilt: 23.4,
    color: '#4fa3e0', emissive: '#001a33',
    rings: false,
    description: 'Our home · 1 moon · Perfect for life', route: '/earth',
  },
  {
    name: 'Mars', radius: 0.53, distance: 26, speed: 0.024, axisSpeed: 0.019,
    tilt: 25.2,
    color: '#c1440e', emissive: '#2a0800',
    rings: false,
    description: 'Red Planet · 2 moons · -63°C avg', route: '/mars',
  },
  {
    name: 'Jupiter', radius: 2.5, distance: 40, speed: 0.013, axisSpeed: 0.045,
    tilt: 3.1,
    color: '#c88b3a', emissive: '#1a0800',
    rings: false,
    stripes: true,
    description: 'Largest planet · 95 moons · Great Red Spot', route: '/jupiter',
  },
  {
    name: 'Saturn', radius: 2.1, distance: 55, speed: 0.009, axisSpeed: 0.038,
    tilt: 26.7,
    color: '#e4d191', emissive: '#1a1500',
    rings: true,
    description: 'Lord of the Rings · 146 moons · 687 km/h winds', route: '/saturn',
  },
  {
    name: 'Uranus', radius: 1.6, distance: 68, speed: 0.006, axisSpeed: 0.025,
    tilt: 97.8,
    color: '#7de8e8', emissive: '#002222',
    rings: true, ringsColor: '#7de8e8',
    description: 'Ice giant · Rotates on its side · -224°C', route: '/uranus',
  },
  {
    name: 'Neptune', radius: 1.55, distance: 80, speed: 0.005, axisSpeed: 0.028,
    tilt: 28.3,
    color: '#3f54ba', emissive: '#000a2a',
    rings: false,
    description: 'Windiest planet · 2100 km/h · 14 moons', route: '/neptune',
  },
  {
    name: 'Pluto', radius: 0.18, distance: 90, speed: 0.004, axisSpeed: 0.02,
    tilt: 122.5,
    color: '#c8c8c8', emissive: '#1a1a1a',
    rings: false,
    description: 'Dwarf planet · Icy · -229°C', route: '/pluto',
  },
  {
    name: 'Constellation', tilt: 0,
    color: '#ffffff', emissive: '#000000',
    rings: false,
    description: 'Constellation · Stars · Galaxies', route: '/constellation',
  },
]

// Only planets that actually orbit in the 3D scene.
// Constellation has no radius/distance/speed — it must never enter the
// sphere-building / animation loop, only the sidebar button list below.
const ORBIT_PLANETS = PLANETS.filter(p => p.name !== 'Constellation')

function makePlanetTexture(planet: PlanetInfo): THREE.CanvasTexture {
  const size = 512
  const c = document.createElement('canvas')
  c.width = size; c.height = size
  const ctx = c.getContext('2d')
  if (!ctx) return new THREE.CanvasTexture(c)

  if (planet.stripes) {
    // Jupiter bands
    const bands = [
      '#c88b3a','#e8c97a','#a0622a','#d4a855','#8a5520',
      '#e0b860','#b87838','#d4a040','#c07030','#e8d090',
    ]
    const bh = size / bands.length
    bands.forEach((col, i) => {
      ctx.fillStyle = col
      ctx.fillRect(0, i * bh, size, bh + 1)
    })
    // Great Red Spot
    ctx.save()
    ctx.translate(size * 0.6, size * 0.55)
    const grs = ctx.createRadialGradient(0, 0, 0, 0, 0, 38)
    grs.addColorStop(0, '#cc2200')
    grs.addColorStop(0.5, '#aa3300')
    grs.addColorStop(1, 'rgba(150,60,20,0)')
    ctx.fillStyle = grs
    ctx.scale(1.8, 1)
    ctx.beginPath(); ctx.arc(0, 0, 38, 0, Math.PI * 2); ctx.fill()
    ctx.restore()
  } else if (planet.name === 'Earth') {
    // Ocean base
    ctx.fillStyle = '#1a6090'
    ctx.fillRect(0, 0, size, size)
    // Continents
    const continents = [
      { x: 180, y: 160, rx: 70, ry: 55 },
      { x: 280, y: 220, rx: 55, ry: 70 },
      { x: 100, y: 280, rx: 80, ry: 50 },
      { x: 380, y: 180, rx: 40, ry: 60 },
      { x: 420, y: 300, rx: 50, ry: 35 },
      { x: 200, y: 370, rx: 45, ry: 30 },
      { x: 330, y: 350, rx: 35, ry: 40 },
    ]
    ctx.fillStyle = '#3a8a4a'
    continents.forEach(cont => {
      ctx.beginPath()
      ctx.ellipse(cont.x, cont.y, cont.rx, cont.ry, Math.random(), 0, Math.PI * 2)
      ctx.fill()
    })
    // Ice caps
    ctx.fillStyle = '#e8f4ff'
    ctx.fillRect(0, 0, size, 30)
    ctx.fillRect(0, size - 30, size, 30)
    // Clouds
    ctx.globalAlpha = 0.35
    ctx.fillStyle = '#ffffff'
    for (let i = 0; i < 20; i++) {
      const cx = Math.random() * size
      const cy = Math.random() * size
      ctx.beginPath()
      ctx.ellipse(cx, cy, 30 + Math.random() * 50, 10 + Math.random() * 20, Math.random(), 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1
  } else if (planet.name === 'Mars') {
    ctx.fillStyle = '#c1440e'
    ctx.fillRect(0, 0, size, size)
    // Surface variation
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * size, y = Math.random() * size
      const r = 10 + Math.random() * 40
      const g = ctx.createRadialGradient(x, y, 0, x, y, r)
      g.addColorStop(0, `rgba(${180 + Math.random() * 40|0},${50 + Math.random() * 30|0},${10 + Math.random() * 20|0},0.4)`)
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
    }
    // Polar ice
    ctx.fillStyle = 'rgba(240,240,255,0.7)'
    ctx.beginPath(); ctx.ellipse(size/2, 20, 60, 20, 0, 0, Math.PI * 2); ctx.fill()
  } else if (planet.name === 'Saturn' || planet.name === 'Uranus') {
    const base = planet.name === 'Saturn' ? '#e4d191' : '#7de8e8'
    ctx.fillStyle = base
    ctx.fillRect(0, 0, size, size)
    // Subtle bands
    for (let i = 0; i < 8; i++) {
      const y = (i / 8) * size
      ctx.fillStyle = `rgba(${planet.name === 'Saturn' ? '200,170,80' : '60,200,200'},0.15)`
      ctx.fillRect(0, y, size, size / 16)
    }
  } else if (planet.name === 'Venus') {
    // Thick swirling clouds
    ctx.fillStyle = '#c8a060'
    ctx.fillRect(0, 0, size, size)
    for (let i = 0; i < 12; i++) {
      const y = (i / 12) * size
      ctx.fillStyle = `rgba(240,200,120,0.3)`
      ctx.fillRect(0, y + Math.sin(i) * 10, size, size / 20)
    }
  } else if (planet.name === 'Neptune') {
    ctx.fillStyle = '#3f54ba'
    ctx.fillRect(0, 0, size, size)
    // Storm bands
    for (let i = 0; i < 10; i++) {
      ctx.fillStyle = `rgba(60,80,200,0.2)`
      ctx.fillRect(0, (i / 10) * size, size, size / 15)
    }
    // Dark spot
    const ds = ctx.createRadialGradient(180, 200, 0, 180, 200, 45)
    ds.addColorStop(0, 'rgba(20,20,80,0.8)')
    ds.addColorStop(1, 'rgba(20,20,80,0)')
    ctx.fillStyle = ds; ctx.beginPath(); ctx.arc(180, 200, 45, 0, Math.PI * 2); ctx.fill()
  } else if (planet.name === 'Pluto') {
    // Icy, mottled dwarf-planet surface
    ctx.fillStyle = '#c8c8c8'
    ctx.fillRect(0, 0, size, size)
    for (let i = 0; i < 35; i++) {
      const x = Math.random() * size, y = Math.random() * size
      const r = 8 + Math.random() * 30
      const g = ctx.createRadialGradient(x, y, 0, x, y, r)
      g.addColorStop(0, 'rgba(120,110,100,0.35)')
      g.addColorStop(0.7, 'rgba(120,110,100,0.1)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
    }
    // Bright "heart" patch (Tombaugh Regio nod)
    ctx.fillStyle = 'rgba(240,235,225,0.6)'
    ctx.beginPath()
    ctx.ellipse(size * 0.55, size * 0.6, 70, 50, 0.3, 0, Math.PI * 2)
    ctx.fill()
  } else {
    // Mercury, generic
    ctx.fillStyle = planet.color
    ctx.fillRect(0, 0, size, size)
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * size, y = Math.random() * size
      const r = 5 + Math.random() * 25
      const g = ctx.createRadialGradient(x, y, 0, x, y, r)
      g.addColorStop(0, 'rgba(0,0,0,0.35)')
      g.addColorStop(0.7, 'rgba(0,0,0,0.1)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
    }
  }

  return new THREE.CanvasTexture(c)
}

function makeOrbitLine(radius: number) {
  const pts = []
  for (let i = 0; i <= 128; i++) {
    const a = (i / 128) * Math.PI * 2
    pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius))
  }
  const geo = new THREE.BufferGeometry().setFromPoints(pts)
  return new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0x334466, transparent: true, opacity: 0.35 }))
}

export default function SolarSystem() {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()
  const [selected, setSelected] = useState<PlanetInfo | null>(null)
  const [hovered, setHovered] = useState<PlanetInfo | null>(null)
  const { t } = useLanguage()
  const selectedRef = useRef<PlanetInfo | null>(null)
  const hoveredRef = useRef<PlanetInfo | null>(null)
  const planetMeshesRef = useRef<THREE.Mesh[]>([])
  const copy = t.planets.explorer

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Wait for mount to have dimensions
    if (mount.clientWidth === 0) {
      const ro = new ResizeObserver(() => {
        ro.disconnect()
        // re-trigger effect by forcing re-render is not ideal,
        // so we just init here directly
      })
      ro.observe(mount)
    }

    const W = mount.clientWidth || window.innerWidth
    const H = mount.clientHeight || window.innerHeight
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 2000)
    camera.position.set(0, 55, 100)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x00000a)
    mount.appendChild(renderer.domElement)

    // ── SUN ──────────────────────────────────────────────────
    const sunTex = (() => {
      const c = document.createElement('canvas'); c.width = 256; c.height = 256
      const ctx = c.getContext('2d')
      if (!ctx) return new THREE.CanvasTexture(c)
      const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
      g.addColorStop(0, '#fff7a0')
      g.addColorStop(0.3, '#ffcc00')
      g.addColorStop(0.65, '#ff8800')
      g.addColorStop(1, '#ff4400')
      ctx.fillStyle = g; ctx.fillRect(0, 0, 256, 256)
      return new THREE.CanvasTexture(c)
    })()

    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(4, 64, 64),
      new THREE.MeshBasicMaterial({ map: sunTex })
    )
    scene.add(sun)

    // Sun glow
    const glowTex = (() => {
      const c = document.createElement('canvas'); c.width = 256; c.height = 256
      const ctx = c.getContext('2d')
      if (!ctx) return new THREE.CanvasTexture(c)
      const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
      g.addColorStop(0, 'rgba(255,200,0,0.6)')
      g.addColorStop(0.4, 'rgba(255,120,0,0.2)')
      g.addColorStop(1, 'rgba(255,80,0,0)')
      ctx.fillStyle = g; ctx.fillRect(0, 0, 256, 256)
      return new THREE.CanvasTexture(c)
    })()
    const sunGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, transparent: true, blending: THREE.AdditiveBlending }))
    sunGlow.scale.set(22, 22, 1)
    scene.add(sunGlow)

    // Lighting
    scene.add(new THREE.AmbientLight(0x111122, 1.2))
    const sunLight = new THREE.PointLight(0xfff5cc, 3.5, 500)
    scene.add(sunLight)

    // ── PLANETS ───────────────────────────────────────────────
    const planetMeshes: THREE.Mesh[] = []
    const pivots: THREE.Object3D[] = []
    const glowSprites: THREE.Sprite[] = []

    ORBIT_PLANETS.forEach((p) => {
      // Orbit line
      scene.add(makeOrbitLine(p.distance!))

      // Pivot for orbit
      const pivot = new THREE.Object3D()
      scene.add(pivot)
      pivots.push(pivot)

      // Planet mesh
      const geo = new THREE.SphereGeometry(p.radius!, 48, 48)
      const mat = new THREE.MeshPhongMaterial({
        map: makePlanetTexture(p),
        emissive: new THREE.Color(p.emissive),
        emissiveIntensity: 0.3,
        shininess: p.name === 'Earth' ? 40 : 10,
        specular: new THREE.Color(p.name === 'Earth' ? '#224466' : '#111111'),
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.rotation.z = (p.tilt * Math.PI) / 180
      mesh.position.x = p.distance!
      mesh.userData = { planet: p }
      pivot.add(mesh)
      planetMeshes.push(mesh)
      planetMeshesRef.current.push(mesh)

      // Atmosphere for Earth
      if (p.name === 'Earth') {
        const atmoMesh = new THREE.Mesh(
          new THREE.SphereGeometry(p.radius! * 1.05, 32, 32),
          new THREE.MeshPhongMaterial({
            color: 0x4488ff, transparent: true, opacity: 0.12,
            side: THREE.FrontSide, depthWrite: false,
          })
        )
        mesh.add(atmoMesh)
      }

      // Moon for Earth
      if (p.name === 'Earth') {
        const moonMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.27, 24, 24),
          new THREE.MeshPhongMaterial({ color: 0xaaaaaa, emissive: 0x111111 })
        )
        moonMesh.position.x = 2.2
        moonMesh.userData.isMoon = true
        moonMesh.userData.planet = { name: 'Moon', color: '#aaaaaa', route: '/moon', description: "Earth's only natural satellite · Tidally locked" }
        mesh.add(moonMesh)
        planetMeshes.push(moonMesh)
        planetMeshesRef.current.push(moonMesh)
      }

      // Saturn rings
      if (p.rings && p.name === 'Saturn') {
        const ringGeo = new THREE.RingGeometry(p.radius! * 1.4, p.radius! * 2.6, 80)
        // Fix UV for ring
        const pos = ringGeo.attributes.position
        const uv = ringGeo.attributes.uv
        for (let i = 0; i < pos.count; i++) {
          const v = new THREE.Vector3().fromBufferAttribute(pos, i)
          uv.setXY(i, (v.length() - p.radius! * 1.4) / (p.radius! * 1.2), 0)
        }
        const ringTex = (() => {
          const c = document.createElement('canvas'); c.width = 256; c.height = 4
          const ctx = c.getContext('2d')
          if (!ctx) return new THREE.CanvasTexture(c)
          const g = ctx.createLinearGradient(0, 0, 256, 0)
          g.addColorStop(0, 'rgba(200,180,120,0)')
          g.addColorStop(0.1, 'rgba(220,200,140,0.6)')
          g.addColorStop(0.3, 'rgba(200,180,110,0.9)')
          g.addColorStop(0.5, 'rgba(240,220,160,0.7)')
          g.addColorStop(0.7, 'rgba(210,190,130,0.8)')
          g.addColorStop(0.85, 'rgba(180,160,100,0.5)')
          g.addColorStop(1, 'rgba(160,140,80,0)')
          ctx.fillStyle = g; ctx.fillRect(0, 0, 256, 4)
          return new THREE.CanvasTexture(c)
        })()
        const ringMat = new THREE.MeshBasicMaterial({
          map: ringTex, side: THREE.DoubleSide,
          transparent: true, opacity: 0.88, depthWrite: false,
        })
        const ring = new THREE.Mesh(ringGeo, ringMat)
        ring.rotation.x = Math.PI / 2
        mesh.add(ring)
      }

      // Uranus thin rings
      if (p.rings && p.name === 'Uranus') {
        const rg = new THREE.RingGeometry(p.radius! * 1.5, p.radius! * 1.8, 64)
        const rm = new THREE.MeshBasicMaterial({
          color: 0x7de8e8, side: THREE.DoubleSide, transparent: true, opacity: 0.3
        })
        const r = new THREE.Mesh(rg, rm)
        r.rotation.x = Math.PI / 2
        mesh.add(r)
      }

      // Glow sprite
      const glowC = document.createElement('canvas'); glowC.width = 64; glowC.height = 64
      const gctx = glowC.getContext('2d')
      if (!gctx) return
      const gg = gctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      gg.addColorStop(0, `rgba(255,255,255,0)`)
      gg.addColorStop(0.5, `rgba(255,255,255,0)`)
      gg.addColorStop(0.8, p.color + '44')
      gg.addColorStop(1, p.color + '00')
      gctx.fillStyle = gg; gctx.fillRect(0, 0, 64, 64)
      const glowSp = new THREE.Sprite(new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(glowC), transparent: true, blending: THREE.AdditiveBlending
      }))
      glowSp.scale.set(p.radius! * 4, p.radius! * 4, 1)
      mesh.add(glowSp)
      glowSprites.push(glowSp)
    })

    // ── BACKGROUND STARS ─────────────────────────────────────
    const bgPos = new Float32Array(5000 * 3)
    for (let i = 0; i < 5000 * 3; i++) bgPos[i] = (Math.random() - 0.5) * 800
    const bgGeo = new THREE.BufferGeometry()
    bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3))
    scene.add(new THREE.Points(bgGeo, new THREE.PointsMaterial({
      color: 0xffffff, size: 0.2, transparent: true, opacity: 0.6
    })))

    // ── RAYCASTER for click ───────────────────────────────────
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const getHit = (clientX: number, clientY: number) => {
      const rect = mount.getBoundingClientRect()
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      const hits = raycaster.intersectObjects(planetMeshes)
      return hits.length > 0 ? hits[0].object : null
    }

    const onClick = (e: MouseEvent) => {
      const hit = getHit(e.clientX, e.clientY)
      if (hit) {
        const p = hit.userData.planet
        setSelected(p)
        selectedRef.current = p
      } else {
        setSelected(null)
        selectedRef.current = null
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      const hit = getHit(e.clientX, e.clientY)
      const p = hit ? hit.userData.planet : null
      hoveredRef.current = p
      setHovered(p)
      mount.style.cursor = p ? 'pointer' : 'default'
    }

    mount.addEventListener('click', onClick)
    mount.addEventListener('mousemove', onMouseMove)

    // ── DRAG ROTATE ───────────────────────────────────────────
    let isDragging = false, prevX = 0, prevY = 0
    let camTheta = Math.atan2(100, 0), camPhi = Math.atan2(55, Math.sqrt(100 * 100 + 0))
    let camR = Math.sqrt(55 * 55 + 100 * 100)

    const onDown = (e: MouseEvent) => { isDragging = true; prevX = e.clientX; prevY = e.clientY }
    const onUp = () => { isDragging = false }
    const onMove = (e: MouseEvent) => {
      if (!isDragging) return
      const dx = e.clientX - prevX, dy = e.clientY - prevY
      camTheta -= dx * 0.005
      camPhi = Math.max(0.1, Math.min(Math.PI / 2.1, camPhi - dy * 0.005))
      prevX = e.clientX; prevY = e.clientY
    }
    const onWheel = (e: WheelEvent) => {
      camR = Math.max(25, Math.min(220, camR + e.deltaY * 0.15))
    }

    mount.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('mousemove', onMove)
    mount.addEventListener('wheel', onWheel)

    // ── ANIMATE ───────────────────────────────────────────────
    let frame: number
    let t = 0
    const animate = () => {
      frame = requestAnimationFrame(animate)
      t += 0.5

      // Sun rotation
      sun.rotation.y += 0.003

      // Sun glow pulse
      const pulse = 1 + Math.sin(t * 0.05) * 0.04
      sunGlow.scale.set(22 * pulse, 22 * pulse, 1)

      // Orbit + axis rotation
      pivots.forEach((pivot, i) => {
        pivot.rotation.y += ORBIT_PLANETS[i].speed! * 0.3
        planetMeshes[i].rotation.y += ORBIT_PLANETS[i].axisSpeed!

        // Hover scale
        const isHovered = hoveredRef.current?.name === ORBIT_PLANETS[i].name
        const targetScale = isHovered ? 1.25 : 1.0
        planetMeshes[i].scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08)

        // Moon orbit
        const moon = planetMeshes[i].children.find(c => c.userData?.isMoon)
        if (moon) moon.rotation.y += 0.05
      })

      // Camera
      camera.position.x = camR * Math.sin(camPhi) * Math.sin(camTheta)
      camera.position.y = camR * Math.cos(camPhi)
      camera.position.z = camR * Math.sin(camPhi) * Math.cos(camTheta)
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frame)
      mount.removeEventListener('click', onClick)
      mount.removeEventListener('mousemove', onMouseMove)
      mount.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('mousemove', onMove)
      mount.removeEventListener('wheel', onWheel)
      window.removeEventListener('resize', onResize)
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#00000a', position: 'relative', overflow: 'hidden', fontFamily: 'system-ui, sans-serif' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

      {/* Title */}
      <div style={{ position: 'absolute', top: 28, left: 36, pointerEvents: 'none' }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: 'rgba(220,230,255,0.9)', letterSpacing: '0.05em' }}>{copy.title}</div>
        <div style={{ fontSize: 12, color: 'rgba(140,160,255,0.5)', marginTop: 3, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{copy.subtitle}</div>
      </div>

      {/* Planet buttons sidebar */}
      <div style={{
        position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        {PLANETS.map(p => {
          const isActive = hovered?.name === p.name || selected?.name === p.name
          const isMoonActive = false
          const renderButton = (planet: { name: string; color: string; route?: string }, active: boolean, indent = false) => (
            <button
              key={planet.name}
              onClick={() => {
                if (planet.route) {
                  navigate(planet.route)
                } else {
                  setSelected(planet as PlanetInfo)
                }
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: active ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${active ? planet.color + '88' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 10, padding: '7px 14px',
                cursor: 'pointer', transition: 'all 0.2s',
                color: active ? '#ffffff' : 'rgba(180,190,255,0.55)',
                fontSize: indent ? 11 : 12, letterSpacing: '0.08em',
                backdropFilter: 'blur(6px)',
                whiteSpace: 'nowrap',
                marginLeft: indent ? 16 : 0,
                opacity: indent ? 0.9 : 1,
              }}
            >
              <div style={{
                width: indent ? 7 : 9, height: indent ? 7 : 9, borderRadius: '50%',
                background: planet.color, flexShrink: 0,
                boxShadow: active ? `0 0 8px ${planet.color}` : 'none',
                transition: 'box-shadow 0.2s',
              }} />
              {planet.name}
              {planet.route && (
                <span style={{ marginLeft: 4, opacity: 0.5, fontSize: 10 }}>→</span>
              )}
            </button>
          )

          if (p.name === 'Earth') {
            return (
              <div key={p.name} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {renderButton(p, isActive)}
                {renderButton({ name: copy.moonLabel, color: '#aaaaaa', route: '/moon' }, isMoonActive, true)}
              </div>
            )
          }

          return renderButton(p, isActive)
        })}
      </div>

      {/* Info card for planets without route */}
      {selected && !selected.route && (
        <div style={{
          position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(5,8,25,0.88)', border: '1px solid rgba(100,120,255,0.3)',
          borderRadius: 16, padding: '18px 28px', backdropFilter: 'blur(12px)',
          minWidth: 280, textAlign: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: selected.color }} />
            <span style={{ fontSize: 20, fontWeight: 700, color: '#e8eeff', letterSpacing: '0.05em' }}>{selected.name}</span>
          </div>
          <div style={{ fontSize: 13, color: 'rgba(160,175,255,0.7)', lineHeight: 1.6, marginBottom: 8 }}>{copy.planetDescriptions[selected.name as keyof typeof copy.planetDescriptions] ?? selected.description}</div>
          <div style={{ fontSize: 11, color: 'rgba(120,130,200,0.5)', marginBottom: 12, letterSpacing: '0.05em' }}>
            {copy.comingSoon}
          </div>
          <button
            onClick={() => setSelected(null)}
            style={{
              background: 'none', border: '1px solid rgba(100,120,255,0.3)',
              color: 'rgba(160,175,255,0.6)', borderRadius: 8, padding: '4px 14px',
              fontSize: 12, cursor: 'pointer',
            }}
          >{copy.close}</button>
        </div>
      )}

      {/* Controls hint */}
      <div style={{
        position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)',
        color: 'rgba(120,140,220,0.4)', fontSize: 11, letterSpacing: '0.15em',
        textTransform: 'uppercase', pointerEvents: 'none',
      }}>
        {copy.controlsHint}
      </div>
    </div>
  )
}