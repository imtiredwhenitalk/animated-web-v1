import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Simplified but recognizable zodiac star-map patterns.
// Coordinates are in a local 0–100 viewBox per constellation.
const ZODIAC = [
  {
    name: 'Aries', symbol: '♈', dates: '21 березня – 19 квітня', element: 'Вогонь',
    desc: 'Овен · Сузір\'я барана · Першоі знак зодіаку, відкриває весняний цикл.',
    stars: [[20, 70], [38, 55], [55, 45], [70, 35], [82, 25]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
    bright: [2, 3],
  },
  {
    name: 'Taurus', symbol: '♉', dates: '20 квітня – 20 травня', element: 'Земля',
    desc: 'Телець · Голова бика з V-подібним скупченням Гіад та яскравою зіркою Альдебаран.',
    stars: [[50, 20], [35, 35], [65, 35], [25, 55], [75, 55], [15, 75], [85, 75]],
    lines: [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6]],
    bright: [0, 3, 4],
  },
  {
    name: 'Gemini', symbol: '♊', dates: '21 травня – 20 червня', element: 'Повітря',
    desc: 'Близнюки · Дві паралельні лінії зірок, що символізують братів Кастора і Поллукса.',
    stars: [[25, 15], [22, 40], [20, 65], [18, 88], [70, 12], [68, 38], [66, 62], [64, 86]],
    lines: [[0, 1], [1, 2], [2, 3], [4, 5], [5, 6], [6, 7], [1, 5]],
    bright: [0, 4],
  },
  {
    name: 'Cancer', symbol: '♋', dates: '21 червня – 22 липня', element: 'Вода',
    desc: 'Рак · Найтьмяніше сузір\'я зодіаку, нагадує перевернуту літеру Y з розсіяним скупченням Ясла в центрі.',
    stars: [[50, 15], [30, 40], [70, 40], [50, 60], [35, 85], [65, 85]],
    lines: [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5]],
    bright: [3],
  },
  {
    name: 'Leo', symbol: '♌', dates: '23 липня – 22 серпня', element: 'Вогонь',
    desc: 'Лев · Виразний "серп" (дзеркальний знак питання) утворює голову та гриву, трикутник — задню частину.',
    stars: [[20, 35], [22, 18], [38, 12], [50, 22], [42, 40], [30, 50], [65, 45], [88, 50], [70, 70]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [4, 6], [6, 7], [7, 8], [8, 4]],
    bright: [3, 7],
  },
  {
    name: 'Virgo', symbol: '♍', dates: '23 серпня – 22 вересня', element: 'Земля',
    desc: 'Діва · Найбільше сузір\'я зодіаку, ламана лінія зірок з яскравою Спікою в основі.',
    stars: [[15, 20], [30, 35], [25, 55], [45, 45], [55, 30], [70, 50], [85, 80]],
    lines: [[0, 1], [1, 2], [1, 3], [3, 4], [3, 5], [5, 6]],
    bright: [6],
  },
  {
    name: 'Libra', symbol: '♎', dates: '23 вересня – 22 жовтня', element: 'Повітря',
    desc: 'Терези · Єдиний неживий знак зодіаку — чотирикутник, що зображує шальки терезів правосуддя.',
    stars: [[50, 15], [25, 55], [75, 55], [35, 85], [65, 85]],
    lines: [[0, 1], [0, 2], [1, 3], [2, 4], [1, 2]],
    bright: [0],
  },
  {
    name: 'Scorpio', symbol: '♏', dates: '23 жовтня – 21 листопада', element: 'Вода',
    desc: 'Скорпіон · Виразний вигнутий хвіст із жалом, голова позначена рядом зірок, серце — червоний Антарес.',
    stars: [[15, 25], [25, 18], [35, 25], [40, 40], [45, 55], [55, 65], [68, 68], [78, 60], [85, 45], [80, 30]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]],
    bright: [3],
  },
  {
    name: 'Sagittarius', symbol: '♐', dates: '22 листопада – 21 грудня', element: 'Вогонь',
    desc: 'Стрілець · Найвідоміший астеризм "чайник" — носик, ручка та кришка з ламаних ліній.',
    stars: [[20, 45], [35, 30], [55, 28], [70, 40], [68, 60], [50, 65], [32, 60], [80, 35]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0], [2, 7]],
    bright: [2],
  },
  {
    name: 'Capricorn', symbol: '♑', dates: '22 грудня – 19 січня', element: 'Земля',
    desc: 'Козеріг · Трикутна форма, що нагадує човен, символізує морського козла з риб\'ячим хвостом.',
    stars: [[15, 35], [40, 20], [70, 25], [85, 55], [55, 75], [25, 60]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]],
    bright: [2],
  },
  {
    name: 'Aquarius', symbol: '♒', dates: '20 січня – 18 лютого', element: 'Повітря',
    desc: 'Водолій · Ламана лінія зірок-«хвилі» струменя води, що ллється з глека водоноса.',
    stars: [[20, 20], [35, 35], [25, 50], [45, 55], [60, 45], [55, 65], [75, 75], [85, 60]],
    lines: [[0, 1], [1, 2], [1, 3], [3, 4], [3, 5], [5, 6], [6, 7]],
    bright: [1],
  },
  {
    name: 'Pisces', symbol: '♓', dates: '19 лютого – 20 березня', element: 'Вода',
    desc: 'Риби · Дві риби, з\'єднані «шнуром» зірок, що сходяться у V-подібний вузол.',
    stars: [[15, 25], [30, 40], [42, 55], [50, 70], [58, 55], [70, 40], [85, 25]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]],
    bright: [3],
  },
]

export default function Constellation() {
  const navigate = useNavigate()
  const [active, setActive] = useState<number | null>(null)

  return (
    <div style={{
      minHeight: '100vh', width: '100%', background: '#00000a',
      fontFamily: 'system-ui, sans-serif', color: '#e8eeff',
      padding: '40px 5vw 80px', position: 'relative', overflowX: 'hidden',
    }}>
      {/* faint static starfield backdrop */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.5) 0, transparent 100%), radial-gradient(1px 1px at 70% 60%, rgba(255,255,255,0.4) 0, transparent 100%), radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.3) 0, transparent 100%), radial-gradient(2px 2px at 85% 15%, rgba(255,255,255,0.4) 0, transparent 100%), radial-gradient(1px 1px at 10% 90%, rgba(255,255,255,0.3) 0, transparent 100%)',
        backgroundSize: '100% 100%',
      }} />

      <button
        onClick={() => navigate('/')}
        style={{
          background: 'none', border: '1px solid rgba(120,140,255,0.3)',
          color: 'rgba(180,190,255,0.7)', borderRadius: 8, padding: '6px 16px',
          fontSize: 13, cursor: 'pointer', marginBottom: 28,
        }}
      >← Сонячна система</button>

      <div style={{ fontSize: 38, fontWeight: 700, letterSpacing: '0.04em', marginBottom: 6 }}>
        Сузір'я Зодіаку
      </div>
      <div style={{ fontSize: 14, color: 'rgba(150,165,255,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 40 }}>
        Наведи курсор на сузір'я, щоб побачити знак та дати
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 28,
        position: 'relative',
      }}>
        {ZODIAC.map((z, idx) => {
          const isActive = active === idx
          return (
            <div
              key={z.name}
              onMouseEnter={() => setActive(idx)}
              onMouseLeave={() => setActive(null)}
              style={{
                position: 'relative',
                borderRadius: 20,
                border: `1px solid ${isActive ? 'rgba(140,160,255,0.6)' : 'rgba(255,255,255,0.08)'}`,
                background: isActive
                  ? 'radial-gradient(circle at 50% 30%, rgba(80,90,200,0.18), rgba(5,8,25,0.9))'
                  : 'rgba(255,255,255,0.02)',
                boxShadow: isActive ? '0 0 50px rgba(110,130,255,0.25)' : 'none',
                transition: 'all 0.3s ease',
                transform: isActive ? 'scale(1.04)' : 'scale(1)',
                padding: '22px 20px 26px',
                cursor: 'default',
                minHeight: 340,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: 200, overflow: 'visible' }}>
                {z.lines.map(([a, b], i) => {
                  const [x1, y1] = z.stars[a]
                  const [x2, y2] = z.stars[b]
                  return (
                    <line
                      key={i}
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={isActive ? 'rgba(160,180,255,0.9)' : 'rgba(140,160,255,0.4)'}
                      strokeWidth={isActive ? 0.6 : 0.4}
                      style={{ transition: 'all 0.3s ease' }}
                    />
                  )
                })}
                {z.stars.map(([x, y], i) => {
                  const isBright = z.bright?.includes(i)
                  const r = isBright ? (isActive ? 3.4 : 2.6) : (isActive ? 2 : 1.5)
                  return (
                    <circle
                      key={i}
                      cx={x} cy={y} r={r}
                      fill={isBright ? '#fff7d8' : '#cfe0ff'}
                      style={{
                        transition: 'all 0.3s ease',
                        filter: isActive
                          ? `drop-shadow(0 0 ${isBright ? 6 : 3}px ${isBright ? '#ffe9a8' : '#9fc0ff'})`
                          : 'none',
                      }}
                    />
                  )
                })}
              </svg>

              <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                <div style={{
                  fontSize: isActive ? 54 : 34, lineHeight: 1, transition: 'all 0.3s ease',
                  marginBottom: 8, color: isActive ? '#fff3c4' : 'rgba(220,230,255,0.5)',
                  textShadow: isActive ? '0 0 24px rgba(255,230,160,0.6)' : 'none',
                }}>
                  {z.symbol}
                </div>
                <div style={{
                  fontSize: isActive ? 24 : 18, fontWeight: 700, letterSpacing: '0.04em',
                  transition: 'all 0.25s ease',
                  color: isActive ? '#ffffff' : 'rgba(210,220,255,0.8)',
                }}>
                  {z.name}
                </div>

                {isActive && (
                  <div style={{ marginTop: 10, animation: 'fadeIn 0.25s ease' }}>
                    <div style={{ fontSize: 16, color: 'rgba(180,200,255,0.85)', fontWeight: 600, marginBottom: 4 }}>
                      {z.dates}
                    </div>
                    <div style={{
                      fontSize: 12, color: 'rgba(150,165,255,0.6)', letterSpacing: '0.1em',
                      textTransform: 'uppercase', marginBottom: 10,
                    }}>
                      Стихія: {z.element}
                    </div>
                    <div style={{
                      fontSize: 13.5, lineHeight: 1.6, color: 'rgba(200,210,255,0.75)',
                      maxWidth: 280, margin: '0 auto',
                    }}>
                      {z.desc}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}