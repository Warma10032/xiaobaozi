import type { Metadata } from 'next'
import { Inter, Lora, Noto_Sans_SC } from 'next/font/google'
import './globals.css'
import 'yet-another-react-lightbox/styles.css'
import 'lxgw-wenkai-screen-webfont/lxgwwenkaiscreen.css'
import { LanguageProvider } from '@/i18n/LanguageProvider'
import { ThemeProvider } from '@/i18n/ThemeProvider'
import SwitcherStack from '@/i18n/SwitcherStack'

const notoSans = Noto_Sans_SC({
  weight: ['400', '500', '600', '700'],
  preload: false,
  variable: '--font-sans',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-ui',
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: '一只小包子 | Warma10032',
  description: '东南大学学生 / 全栈开发 / AI爱好者',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${notoSans.variable} ${inter.variable} ${lora.variable}`}>
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <SwitcherStack />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
