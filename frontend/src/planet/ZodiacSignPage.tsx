import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ZODIAC_SIGNS } from './zodiacData'
import type { ZodiacSign } from './zodiacData'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function ZodiacSignPage() {
  const { sign } = useParams<{ sign: string }>()
  const fallback = ZODIAC_SIGNS.find((item) => item.id === sign)
  const [data, setData] = useState<ZodiacSign | null>(fallback || null)
  const [apiStatus, setApiStatus] = useState<'loading' | 'ready' | 'offline'>('loading')

  useEffect(() => {
    if (!sign) return
    fetch(`${API_URL}/api/zodiac/${sign}`)
      .then((response) => {
        if (!response.ok) throw new Error('Not found')
        return response.json()
      })
      .then((result) => {
        setData(result.data)
        setApiStatus('ready')
      })
      .catch(() => setApiStatus('offline'))
  }, [sign])

  if (!data) {
    return <main className="zodiac-page"><Link to="/constellation">← До знаків зодіаку</Link><h1>Знак не знайдено</h1></main>
  }

  return (
    <main className="zodiac-page">
      <Link className="zodiac-back" to="/constellation">← Усі знаки зодіаку</Link>
      <section className="zodiac-hero">
        <div className="zodiac-symbol">{data.symbol}</div>
        <div>
          <p className="zodiac-eyebrow">ЗОДІАК / {data.constellation}</p>
          <h1>{data.name}</h1>
          <p className="zodiac-dates">{data.dates}</p>
          <p className="zodiac-description">{data.description}</p>
        </div>
      </section>
      <div className="zodiac-facts">
        <div><span>Стихія</span><strong>{data.element}</strong></div>
        <div><span>Сузір’я</span><strong>{data.constellation}</strong></div>
        <div><span>Дані</span><strong>{apiStatus === 'ready' ? 'Backend online' : apiStatus === 'offline' ? 'Локальні дані' : 'Завантаження…'}</strong></div>
      </div>
      <Link className="zodiac-next" to="/constellation">Обрати інший знак →</Link>
    </main>
  )
}
