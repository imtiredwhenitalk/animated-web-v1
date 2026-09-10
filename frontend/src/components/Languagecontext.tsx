import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { translations, type LanguageCode, type Translation } from './translation'

const STORAGE_KEY = 'app-language'

function detectInitialLanguage(): LanguageCode {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY) as LanguageCode | null
    if (stored && stored in translations) return stored
  } catch {
    // Storage may be disabled; fall back to browser language.
  }

  const browserLang = typeof navigator !== 'undefined' ? navigator.language.slice(0, 2) : 'uk'
  if (browserLang in translations) return browserLang as LanguageCode

  return 'uk'
}

interface LanguageContextValue {
  language: LanguageCode
  setLanguage: (lang: LanguageCode) => void
  t: Translation
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(detectInitialLanguage)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language)
    } catch {
      // Continue without persistence when browser storage is unavailable.
    }
    document.documentElement.lang = language
  }, [language])

  const setLanguage = (lang: LanguageCode) => setLanguageState(lang)

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, t: translations[language] }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a <LanguageProvider>')
  }
  return ctx
}