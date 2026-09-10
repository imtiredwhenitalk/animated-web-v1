export type ZodiacSign = {
  id: string
  name: string
  symbol: string
  dates: string
  element: string
  description: string
  constellation: string
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { id: 'aries', name: 'Овен', symbol: '♈', dates: '21 березня – 19 квітня', element: 'Вогонь', constellation: 'Aries', description: 'Енергійний знак початку, сміливості та нових ідей.' },
  { id: 'taurus', name: 'Телець', symbol: '♉', dates: '20 квітня – 20 травня', element: 'Земля', constellation: 'Taurus', description: 'Стабільний і практичний знак, який цінує красу та комфорт.' },
  { id: 'gemini', name: 'Близнюки', symbol: '♊', dates: '21 травня – 20 червня', element: 'Повітря', constellation: 'Gemini', description: 'Допитливий знак спілкування, руху та різноманіття.' },
  { id: 'cancer', name: 'Рак', symbol: '♋', dates: '21 червня – 22 липня', element: 'Вода', constellation: 'Cancer', description: 'Чутливий та турботливий знак із сильною інтуїцією.' },
  { id: 'leo', name: 'Лев', symbol: '♌', dates: '23 липня – 22 серпня', element: 'Вогонь', constellation: 'Leo', description: 'Яскравий знак творчості, щедрості та впевненості.' },
  { id: 'virgo', name: 'Діва', symbol: '♍', dates: '23 серпня – 22 вересня', element: 'Земля', constellation: 'Virgo', description: 'Уважний знак порядку, аналізу та корисних справ.' },
  { id: 'libra', name: 'Терези', symbol: '♎', dates: '23 вересня – 22 жовтня', element: 'Повітря', constellation: 'Libra', description: 'Знак гармонії, дипломатії та пошуку справедливості.' },
  { id: 'scorpio', name: 'Скорпіон', symbol: '♏', dates: '23 жовтня – 21 листопада', element: 'Вода', constellation: 'Scorpio', description: 'Глибокий знак сили, пристрасті та внутрішньої трансформації.' },
  { id: 'sagittarius', name: 'Стрілець', symbol: '♐', dates: '22 листопада – 21 грудня', element: 'Вогонь', constellation: 'Sagittarius', description: 'Вільний знак подорожей, знань і великих цілей.' },
  { id: 'capricorn', name: 'Козеріг', symbol: '♑', dates: '22 грудня – 19 січня', element: 'Земля', constellation: 'Capricorn', description: 'Наполегливий знак відповідальності, планування та результату.' },
  { id: 'aquarius', name: 'Водолій', symbol: '♒', dates: '20 січня – 18 лютого', element: 'Повітря', constellation: 'Aquarius', description: 'Незалежний знак винахідливості, дружби та змін.' },
  { id: 'pisces', name: 'Риби', symbol: '♓', dates: '19 лютого – 20 березня', element: 'Вода', constellation: 'Pisces', description: 'Мрійливий знак співчуття, уяви та духовності.' },
]
