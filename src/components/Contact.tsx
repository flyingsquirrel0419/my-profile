import { Check, Copy, Github, Instagram, Mail } from 'lucide-react'
import { useState } from 'react'
import { DESKTOP, MOTION_OK, gsap, useMotion } from '../motion'

const EMAIL = 'flying_squirrel__@teamwicked.me'

function copyFallback(value: string) {
  const area = document.createElement('textarea')
  area.value = value
  area.style.position = 'fixed'
  area.style.opacity = '0'
  document.body.appendChild(area)
  area.select()
  document.execCommand('copy')
  area.remove()
}

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL) } catch { copyFallback(EMAIL) }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const ref = useMotion<HTMLElement>((footer, mm) => {
    mm.add(MOTION_OK, () => {
      gsap.timeline({
        scrollTrigger: { trigger: footer, start: 'top 90%', end: 'top 20%', scrub: 1 },
      })
        .fromTo('.contact-line-a', { xPercent: -14 }, { xPercent: 0, ease: 'none' }, 0)
        .fromTo('.contact-line-b', { xPercent: 14 }, { xPercent: 0, ease: 'none' }, 0)
        .fromTo('.contact-glow', { opacity: 0 }, { opacity: 1, ease: 'none' }, 0)
    })

    mm.add(DESKTOP, () => {
      const magnet = footer.querySelector<HTMLElement>('.magnet')
      if (!magnet) return
      const x = gsap.quickTo(magnet, 'x', { duration: 0.4, ease: 'power3.out' })
      const y = gsap.quickTo(magnet, 'y', { duration: 0.4, ease: 'power3.out' })
      const move = (event: PointerEvent) => {
        const bounds = magnet.getBoundingClientRect()
        const dx = event.clientX - (bounds.left + bounds.width / 2)
        const dy = event.clientY - (bounds.top + bounds.height / 2)
        const within = Math.abs(dx) < bounds.width && Math.abs(dy) < bounds.height * 2
        x(within ? dx * 0.28 : 0)
        y(within ? dy * 0.28 : 0)
      }
      window.addEventListener('pointermove', move, { passive: true })
      return () => window.removeEventListener('pointermove', move)
    })
  })

  return (
    <footer className="contact" id="contact" ref={ref}>
      <div className="contact-glow" aria-hidden="true" />
      <div className="shell">
        <p className="label contact-eyebrow">OPEN FOR AMBITIOUS BACKEND, TOOLING, AND RUNTIME WORK</p>
        <h2 className="contact-title">
          <span className="contact-line-a">BRING ME THE</span>
          <span className="contact-line-b"><em>HARD PART.</em></span>
        </h2>

        <div className="contact-actions">
          <a className="magnet cta-primary contact-email" href={`mailto:${EMAIL}`} data-cursor="SAY HI">
            {EMAIL}
          </a>
          <button className="cta-ghost copy-button" type="button" onClick={copy}>
            {copied ? <Check /> : <Copy />} {copied ? 'Copied' : 'Copy email'}
          </button>
        </div>

        <nav className="footer-links" aria-label="Social links">
          <a href="https://github.com/flyingsquirrel0419" target="_blank" rel="noreferrer"><Github /> GitHub</a>
          <a href="https://instagram.com/flyingsquirrel0419" target="_blank" rel="noreferrer"><Instagram /> Instagram</a>
          <a href={`mailto:${EMAIL}`}><Mail /> Email</a>
          <span>© 2026 FLYING SQUIRREL — SEOUL</span>
          <a href="#top">Back to top ↑</a>
        </nav>
      </div>
    </footer>
  )
}
