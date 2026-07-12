import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const EMAIL = 'flying_squirrel__@teamwicked.me'

const LINKS = [
  ['work', 'Work'],
  ['about', 'About'],
  ['contact', 'Contact'],
] as const

function BrandMark() {
  return (
    <svg className="brand-mark" fill="none" viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 6.5 16.8 3l12.8 3.5v9.2l-12.8 3.6L4 15.7V6.5Z" fill="url(#brand-a)" />
      <path d="m4 15.7 12.8 3.6 12.8-3.6v7.1l-12.8 3.7L4 22.8v-7.1Z" fill="#8b5cf6" opacity=".55" />
      <path d="m4 22.8 12.8 3.7 12.8-3.7v4.7L16.8 31 4 27.5v-4.7Z" fill="#8b5cf6" opacity=".25" />
      <path d="M16.8 3v28" stroke="#f5f2ff" strokeOpacity=".6" strokeWidth="1" />
      <defs>
        <linearGradient id="brand-a" x1="4" y1="3" x2="29.6" y2="19.3" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8b5cf6" />
          <stop offset=".55" stopColor="#e879f9" />
          <stop offset="1" stopColor="#ffb054" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return createPortal(
    <div className="mobile-menu">
      <div className="mobile-menu-top">
        <a className="brand" href="#top" onClick={onClose}><BrandMark /><span>Flying Squirrel</span></a>
        <button className="icon-button" type="button" aria-label="Close menu" onClick={onClose}><X /></button>
      </div>
      <nav className="mobile-menu-links" aria-label="Mobile navigation">
        {LINKS.map(([id, label], index) => (
          <a key={id} href={`#${id}`} onClick={onClose}>
            <span>0{index + 1}</span>{label}<ArrowUpRight />
          </a>
        ))}
        <a href={`mailto:${EMAIL}`}><span>04</span>Let's talk<ArrowUpRight /></a>
      </nav>
      <div className="mobile-menu-footer">
        <span>SEOUL, KR — NIGHT GLIDE 2026</span>
        <a href="https://github.com/flyingsquirrel0419" target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </div>,
    document.body,
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    document.body.classList.toggle('menu-open', open)
    window.addEventListener('keydown', close)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', close)
    }
  }, [open])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <a className="brand" href="#top" aria-label="Flying Squirrel home">
        <BrandMark />
        <span>Flying Squirrel</span>
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        {LINKS.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>
      <div className="site-actions">
        <a className="nav-github" href="https://github.com/flyingsquirrel0419" target="_blank" rel="noreferrer">
          GitHub <ArrowUpRight />
        </a>
        <a className="nav-cta" href={`mailto:${EMAIL}`}>Let's talk</a>
      </div>
      <button className="icon-button menu-trigger" type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
        <Menu />
      </button>
      {open ? <MobileMenu onClose={() => setOpen(false)} /> : null}
    </header>
  )
}
