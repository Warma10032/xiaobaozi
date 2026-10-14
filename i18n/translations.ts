export const translations = {
  hero: {
    name: '一只小包子',
    nameEn: 'ZeroTang05',
    tagline: '东南大学 · 全栈开发 · AI爱好者',
    taglineEn: 'Southeast University · Full-stack Developer · AI Enthusiast',
  },
  about: {
    header: 'About',
    content: [
      '东南大学学生，对技术充满热情，专注于全栈开发和人工智能领域。喜欢折腾各种有趣的项目，从大模型应用开发到浏览器插件制作。',
      '在互联网各个角落都有我的痕迹：写博客记录学习心得，做开源项目分享代码，偶尔也会在 B 站发发视频。如果你也有有趣的想法，欢迎联系我！',
    ],
    contentEn: [
      'Student at Southeast University, passionate about technology, focusing on full-stack development and artificial intelligence. Enjoys working on interesting projects, from LLM application development to browser extensions.',
      "You'll find me all across the internet: writing blogs to share learning insights, creating open-source projects, and occasionally posting videos on Bilibili. Feel free to reach out if you have interesting ideas!",
    ],
  },
  academic: {
    header: 'Academic',
    selectedPublications: 'Selected Publications',
  },
  feed: {
    header: 'Feed',
    loading: 'Loading...',
    empty: '暂无动态',
    emptyEn: 'No recent activity',
  },
  projects: {
    header: 'Projects',
  },
  footer: {
    copyright: '© {year} 一只小包子',
    copyrightEn: '© {year} ZeroTang05',
  },
  site: {
    header: 'Sites',
  },
} as const

export type Language = 'zh' | 'en'

export function getLanguageFromAcceptLanguage(acceptLanguage: string | null): Language {
  if (!acceptLanguage) return 'zh'
  const lang = acceptLanguage.toLowerCase()
  if (lang.includes('zh')) return 'zh'
  return 'en'
}
