import { ArrowDown } from 'lucide-react'
import SystemField from '../SystemField'
import { DESKTOP, MOTION_OK, gsap, splitChars, useMotion } from '../motion'

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useMotion<HTMLElement>((section, mm) => {
    if (!ready) return

    mm.add(MOTION_OK, () => {
      // The gradient line stays unsplit: background-clip text breaks across nested spans.
      const lines = Array.from(section.querySelectorAll<HTMLElement>('.hero-line:not(.hero-line-alt)'))
      const chars = lines.flatMap((line) => splitChars(line))

      gsap.timeline()
        .from(chars, {
          yPercent: 130,
          rotate: 8,
          duration: 1.1,
          stagger: 0.032,
          ease: 'power4.out',
        })
        .from('.hero-line-alt', {
          yPercent: 118,
          duration: 1.15,
          ease: 'power4.out',
        }, 0.22)
        .from('.hero-eyebrow, .hero-tagline, .hero-copy, .hero-actions', {
          y: 28,
          opacity: 0,
          duration: 0.8,
          stagger: 0.09,
          ease: 'power3.out',
        }, '-=0.55')
        .from('.hero-cue', { opacity: 0, duration: 0.6 }, '-=0.3')

      gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
      })
        .to('.hero-inner', { yPercent: -16, opacity: 0.15, ease: 'none' }, 0)
        .to('.hero-aurora', { yPercent: 22, ease: 'none' }, 0)
        .to('.hero-cue', { opacity: 0, ease: 'none' }, 0)
    })

    mm.add(DESKTOP, () => {
      const glow = section.querySelector<HTMLElement>('.hero-pointer-glow')
      if (!glow) return
      const x = gsap.quickTo(glow, 'x', { duration: 0.7, ease: 'power3.out' })
      const y = gsap.quickTo(glow, 'y', { duration: 0.7, ease: 'power3.out' })
      const move = (event: PointerEvent) => {
        const bounds = section.getBoundingClientRect()
        x(event.clientX - bounds.left)
        y(event.clientY - bounds.top)
      }
      section.addEventListener('pointermove', move, { passive: true })
      return () => section.removeEventListener('pointermove', move)
    })
  }, [ready])

  return (
    <section className="hero" id="top" ref={ref} aria-labelledby="hero-title">
      <div className="hero-sky" aria-hidden="true">
        <SystemField />
        <div className="hero-aurora aurora-a" />
        <div className="hero-aurora aurora-b" />
        <div className="hero-aurora aurora-c" />
        <div className="hero-pointer-glow" />
      </div>

      <div className="hero-inner">
        <p className="hero-eyebrow">
          <span className="pulse-dot" aria-hidden="true" />
          날다람쥐 — BACKEND SYSTEMS ENGINEER, SEOUL
        </p>
        <h1 className="hero-title" id="hero-title">
          <span className="hero-line-mask"><span className="hero-line">FLYING</span></span>
          <span className="hero-line-mask"><span className="hero-line hero-line-alt">SQUIRREL</span></span>
        </h1>
        <p className="hero-tagline">I build systems that keep their shape.</p>
        <p className="hero-copy">
          Cache infrastructure, sandboxed runtimes, and developer tools — engineered
          for the parts that fail at 2 a.m.
        </p>
        <div className="hero-actions">
          <a className="cta-primary" href="#work" data-cursor="GLIDE">
            Glide through the work <ArrowDown />
          </a>
          <a className="cta-ghost" href="https://github.com/flyingsquirrel0419" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </div>
      </div>

      <div className="hero-cue" aria-hidden="true">
        <span>SCROLL</span>
        <span className="hero-cue-line" />
      </div>
    </section>
  )
}
