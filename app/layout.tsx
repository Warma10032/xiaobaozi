import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
