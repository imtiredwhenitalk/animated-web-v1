import { Router } from 'express'
import { zodiacSigns } from '../data/zodiac.data.js'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ success: true, data: zodiacSigns })
})

router.get('/:id', (req, res) => {
  const sign = zodiacSigns.find((item) => item.id === req.params.id.toLowerCase())
  if (!sign) {
    res.status(404).json({ success: false, error: 'Знак зодіаку не знайдено' })
    return
  }
  res.json({ success: true, data: sign })
})

export default router
