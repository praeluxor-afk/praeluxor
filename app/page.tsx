import Navbar    from '@/components/Navbar'
import Hero      from '@/components/Hero'
import Stats     from '@/components/Stats'
import Manifesto from '@/components/Manifesto'
import Services  from '@/components/Services'
import Studio    from '@/components/Studio'
import Portfolio from '@/components/Portfolio'
import CTA       from '@/components/CTA'
import Footer    from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Manifesto />
        <Services />
        <Studio />
        <Portfolio />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
