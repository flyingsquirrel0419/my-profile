import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useEffect, useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Smooth scrolling for the whole page, kept in sync with ScrollTrigger. */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled || prefersReducedMotion()) return

    const lenis = new Lenis({ anchors: true, lerp: 0.12 })
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [enabled])
}

/** Scoped gsap.context that only runs when motion is allowed. */
export function useMotion<T extends HTMLElement>(
  setup: (element: T, mm: gsap.MatchMedia) => void,
  deps: unknown[] = [],
) {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return
    const mm = gsap.matchMedia()
    const context = gsap.context(() => setup(element, mm), element)
    return () => {
      mm.revert()
      context.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const DESKTOP = `(min-width: 901px) and ${MOTION_OK}`
export const MOBILE = `(max-width: 900px) and ${MOTION_OK}`

/** Split text into per-word / per-char spans for staggered reveals. */
export function splitChars(element: HTMLElement) {
  const text = element.textContent ?? ''
  element.textContent = ''
  element.setAttribute('aria-label', text)
  const chars: HTMLSpanElement[] = []
  text.split(/(\s+)/).forEach((part) => {
    if (part.trim() === '') {
      if (part.length) element.appendChild(document.createTextNode(' '))
      return
    }
    const word = document.createElement('span')
    word.className = 'split-word'
    word.setAttribute('aria-hidden', 'true')
    for (const char of part) {
      const span = document.createElement('span')
      span.className = 'split-char'
      span.textContent = char
      word.appendChild(span)
      chars.push(span)
    }
    element.appendChild(word)
  })
  return chars
}

export function splitWords(element: HTMLElement) {
  const text = element.textContent ?? ''
  element.textContent = ''
  element.setAttribute('aria-label', text)
  const words: HTMLSpanElement[] = []
  text.split(/\s+/).forEach((part, index) => {
    if (!part) return
    if (index > 0) element.appendChild(document.createTextNode(' '))
    const span = document.createElement('span')
    span.className = 'scrub-word'
    span.setAttribute('aria-hidden', 'true')
    span.textContent = part
    element.appendChild(span)
    words.push(span)
  })
  return words
}
