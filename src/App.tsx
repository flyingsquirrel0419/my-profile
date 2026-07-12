import { useState } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import Cursor from './components/Cursor'
import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Preloader from './components/Preloader'
import Stats from './components/Stats'
import Work from './components/Work'
import { MOTION_OK, gsap, useMotion, useSmoothScroll } from './motion'

export default function App() {
  const [ready, setReady] = useState(false)
  useSmoothScroll(ready)

  const ref = useMotion<HTMLDivElement>((root, mm) => {
    mm.add(MOTION_OK, () => {
      gsap.to('.scroll-progress span', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 0.4 },
      })
    })
  })

  return (
    <div className="app" ref={ref}>
      <a className="skip-link" href="#work">Skip to projects</a>
      {!ready ? <Preloader onDone={() => setReady(true)} /> : null}
      <Cursor />
      <div className="scroll-progress" aria-hidden="true"><span /></div>
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <Stats />
        <Work />
        <About />
      </main>
      <Contact />
    </div>
  )
}
