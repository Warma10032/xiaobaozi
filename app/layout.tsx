import type { Metadata } from 'next'
import { Instrument_Sans } from 'next/font/google'
import './globals.css'

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-instrument-sans',
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
    <html lang="zh-CN">
      <body className={instrumentSans.className}>{children}</body>
    </html>
  )
}
