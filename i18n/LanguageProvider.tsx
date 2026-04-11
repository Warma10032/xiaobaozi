'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { Language, getLanguageFromAcceptLanguage } from './translations'

interface LanguageContextValue {
  lang: Language
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'preferred-language'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('zh')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null
    if (stored === 'zh' || stored === 'en') {
      setLang(stored)
    } else {
      setLang(getLanguageFromAcceptLanguage(navigator.language))
    }
    setMounted(true)
  }, [])

  const toggleLanguage = () => {
    const next = lang === 'zh' ? 'en' : 'zh'
    setLang(next)
    localStorage.setItem(STORAGE_KEY, next)
  }

  if (!mounted) return null

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
