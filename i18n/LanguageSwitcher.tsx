'use client'

import { useLanguage } from './LanguageProvider'
import styles from './LanguageSwitcher.module.css'

export default function LanguageSwitcher() {
  const { lang, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className={styles.switcher}
      aria-label="Toggle language"
    >
      {lang === 'zh' ? 'EN' : '中'}
    </button>
  )
}
