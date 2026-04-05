import Hero from '@/components/Hero/Hero'
import StatsBar from '@/components/StatsBar/StatsBar'
import About from '@/components/About/About'
import Projects from '@/components/Projects/Projects'
import Sites from '@/components/Sites/Sites'
import Feed from '@/components/Feed/Feed'
import Footer from '@/components/Footer/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <About />
      <Projects />
      <Sites />
      <Feed />
      <Footer />
    </>
  )
}
