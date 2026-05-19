'use client'

import ThemeSwitcher from './ThemeSwitcher'
import LanguageSwitcher from './LanguageSwitcher'
import styles from './SwitcherStack.module.css'

export default function SwitcherStack() {
  return (
    <div className={styles.stack}>
      <ThemeSwitcher />
      <LanguageSwitcher />
    </div>
  )
}
