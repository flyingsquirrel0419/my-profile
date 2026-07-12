import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../motion'

const HOVER_TARGETS = 'a, button, [data-cursor]'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    setEnabled(fine.matches && !prefersReducedMotion())
    const sync = () => setEnabled(fine.matches && !prefersReducedMotion())
    fine.addEventListener('change', sync)
    return () => fine.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.documentElement.classList.add('has-cursor')
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power2.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power2.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' })

    const move = (event: PointerEvent) => {
      dotX(event.clientX)
      dotY(event.clientY)
      ringX(event.clientX)
      ringY(event.clientY)
    }
    const over = (event: PointerEvent) => {
      const target = (event.target as HTMLElement).closest(HOVER_TARGETS)
      ring.classList.toggle('is-hover', Boolean(target))
      const label = target?.getAttribute('data-cursor') ?? ''
      ring.dataset.label = label
      ring.classList.toggle('has-label', Boolean(label))
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  )
}
