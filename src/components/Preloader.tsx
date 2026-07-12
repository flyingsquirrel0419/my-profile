import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../motion'

export default function Preloader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (prefersReducedMotion()) {
      doneRef.current()
      return
    }

    const counter = { value: 0 }
    const digits = root.querySelector<HTMLElement>('.preloader-count')
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ onComplete: () => doneRef.current() })
      timeline
        .from('.preloader-name .split', {
          yPercent: 110,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.out',
        })
        .to(counter, {
          value: 100,
          duration: 1.35,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (digits) digits.textContent = String(Math.round(counter.value)).padStart(3, '0')
          },
        }, '<')
        .to('.preloader-inner', { yPercent: -30, opacity: 0, duration: 0.45, ease: 'power2.in' })
        .to(root, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 0.75,
          ease: 'power4.inOut',
        }, '-=0.15')
    }, root)

    return () => context.revert()
  }, [])

  return (
    <div className="preloader" ref={rootRef} aria-hidden="true">
      <div className="preloader-inner">
        <p className="preloader-name">
          <span className="split">FLYING</span> <span className="split">SQUIRREL</span>
        </p>
        <p className="preloader-count">000</p>
        <p className="preloader-tag">NIGHT GLIDE / 2026</p>
      </div>
    </div>
  )
}
