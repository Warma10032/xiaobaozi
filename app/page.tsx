import Hero from '@/components/Hero/Hero'
import StatsBar from '@/components/StatsBar/StatsBar'
import About from '@/components/About/About'
import Academic from '@/components/Academic/Academic'
import Projects from '@/components/Projects/Projects'
import Sites from '@/components/Sites/Sites'
import Feed from '@/components/Feed/Feed'
import Footer from '@/components/Footer/Footer'
import LanguageSwitcher from '@/i18n/LanguageSwitcher'

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <About />
      <Academic />
      <Projects />
      <Sites />
      <Feed />
      <Footer />
      <LanguageSwitcher />
    </>
  )
}
