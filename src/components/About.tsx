import { ArrowUpRight } from 'lucide-react'
import { disciplines } from '../data'
import { DESKTOP, MOTION_OK, gsap, splitWords, useMotion } from '../motion'

const PROFILE_IMAGE = `${import.meta.env.BASE_URL}assets/profile.jpg`

const MANIFESTO =
  'I work where failure modes matter: caches under concurrency, runtimes around untrusted code, and tools that have to stay clear when everything else is on fire. Pressure reveals the architecture — so I design for the pressure first.'

export default function About() {
  const ref = useMotion<HTMLElement>((section, mm) => {
    mm.add(MOTION_OK, () => {
      const heading = section.querySelector<HTMLElement>('.about-title')
      if (heading) {
        gsap.from(heading.children, {
          y: 90,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: { trigger: heading, start: 'top 82%', once: true },
        })
      }

      const paragraph = section.querySelector<HTMLElement>('.about-manifesto')
      if (paragraph) {
        const words = splitWords(paragraph)
        gsap.fromTo(words, { opacity: 0.12 }, {
          opacity: 1,
          stagger: 0.6,
          ease: 'none',
          scrollTrigger: {
            trigger: paragraph,
            start: 'top 78%',
            end: 'bottom 45%',
            scrub: true,
          },
        })
      }

      gsap.from('.about-identity', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-identity', start: 'top 88%', once: true },
      })

      gsap.from('.discipline', {
        y: 56,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.disciplines', start: 'top 82%', once: true },
      })
    })

    mm.add(DESKTOP, () => {
      const move = (event: PointerEvent) => {
        const card = (event.target as HTMLElement).closest<HTMLElement>('.discipline')
        if (!card) return
        const bounds = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${event.clientX - bounds.left}px`)
        card.style.setProperty('--my', `${event.clientY - bounds.top}px`)
      }
      section.addEventListener('pointermove', move, { passive: true })
      return () => section.removeEventListener('pointermove', move)
    })
  })

  return (
    <section className="about" id="about" ref={ref} aria-labelledby="about-title">
      <div className="shell">
        <h2 className="about-title" id="about-title">
          <span>PRESSURE</span>
          <span className="gradient-word">REVEALS</span>
          <span>THE ARCHITECTURE.</span>
        </h2>

        <div className="about-grid">
          <p className="about-manifesto">{MANIFESTO}</p>
          <div className="about-identity">
            <img src={PROFILE_IMAGE} alt="Flying Squirrel avatar" />
            <div>
              <strong>날다람쥐 / Flying Squirrel</strong>
              <span>BACKEND SYSTEMS ENGINEER</span>
              <span>TEAM WICKED — SEOUL, KR</span>
            </div>
          </div>
        </div>

        <div className="disciplines">
          {disciplines.map((discipline) => (
            <article className="discipline" key={discipline.index}>
              <span className="label">{discipline.index}</span>
              <h3>{discipline.title}</h3>
              <p>{discipline.description}</p>
              <ArrowUpRight aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
