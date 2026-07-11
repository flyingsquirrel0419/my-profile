import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Instagram,
  Mail,
  Menu,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { disciplines, projects, type Project } from './data'

const EMAIL = 'flying_squirrel__@teamwicked.me'
const PROFILE_IMAGE = `${import.meta.env.BASE_URL}assets/profile.jpg`
const HERO_VIDEO = 'https://cdn.sceneai.art/Hero%20Section%20Video/c653421c-6cd9-472a-811a-b833dd320372.mp4'
const filters = ['All', 'TypeScript', 'Python', 'Rust'] as const
const accentColors = {
  acid: '#c7f05d',
  blue: '#6f94ff',
  orange: '#ff9f43',
  red: '#ff5c64',
} as const

type ProjectFilter = (typeof filters)[number]

function usePageMotion() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })

    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}

function BrandMark() {
  return (
    <svg className="h-7 w-auto" fill="none" viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 6.5 16.8 3l12.8 3.5v9.2l-12.8 3.6L4 15.7V6.5Z" fill="#a855f7" />
      <path d="m4 15.7 12.8 3.6 12.8-3.6v7.1l-12.8 3.7L4 22.8v-7.1Z" fill="#7e22ce" />
      <path d="m4 22.8 12.8 3.7 12.8-3.7v4.7L16.8 31 4 27.5v-4.7Z" fill="#0a0a0a" />
      <path d="M16.8 3v28" stroke="#eeeeee" strokeOpacity=".7" strokeWidth="1" />
    </svg>
  )
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return createPortal(
    <div className="mobile-menu fixed inset-0 bg-[#eeeeee]/95 backdrop-blur-xl z-[100] md:hidden">
      <div className="flex items-center justify-between px-6 pt-6">
        <a className="portfolio-brand" href="#top" onClick={onClose}><BrandMark /><span>Flying Squirrel</span></a>
        <button className="mobile-menu-trigger" type="button" aria-label="Close menu" onClick={onClose}><X /></button>
      </div>
      <nav className="mobile-menu-links" aria-label="Mobile navigation">
        {[['work', 'Work'], ['profile', 'Profile'], ['principles', 'Principles'], ['contact', 'Contact']].map(([id, label], index) => (
          <a key={id} href={`#${id}`} onClick={onClose}><span>0{index + 1}</span>{label}<ArrowUpRight /></a>
        ))}
      </nav>
      <div className="mobile-menu-footer">
        <span>Seoul, KR</span>
        <a href="https://github.com/flyingsquirrel0419" target="_blank" rel="noreferrer">GitHub <Github /></a>
      </div>
    </div>,
    document.body,
  )
}

function Header() {
  const [open, setOpen] = useState(false)

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
    <header className="w-full relative z-50 pt-6 px-6 lg:px-12 flex items-center justify-between animate-on-load delay-100">
      <a className="portfolio-brand" href="#top" aria-label="Flying Squirrel home">
        <BrandMark />
        <span>Flying Squirrel</span>
      </a>
      <nav className="hidden md:flex items-center gap-8 lg:gap-11" aria-label="Primary navigation">
        <a href="#work">Work</a>
        <a href="#profile">Profile</a>
        <a href="#principles">Principles</a>
      </nav>
      <div className="hidden md:flex items-center gap-6">
        <a className="nav-github" href="https://github.com/flyingsquirrel0419" target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a>
        <a className="nav-contact" href={`mailto:${EMAIL}`}>Let's talk</a>
      </div>
      <button className="mobile-menu-trigger md:hidden" type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
        <Menu />
      </button>
      {open ? <MobileMenu onClose={() => setOpen(false)} /> : null}
    </header>
  )
}

function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPlayback = () => {
      if (!videoRef.current) return
      if (motion.matches) videoRef.current.pause()
      else void videoRef.current.play()
    }

    syncPlayback()
    motion.addEventListener('change', syncPlayback)
    return () => motion.removeEventListener('change', syncPlayback)
  }, [])

  return (
    <section className="hero-stage relative min-h-[92svh] flex flex-col w-full overflow-hidden bg-[#eeeeee] text-black" id="top" aria-labelledby="hero-title">
      <Header />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0" aria-hidden="true">
        <div className="hero-video-container relative w-[150%] aspect-square max-w-[800px] md:w-[800px] md:h-[800px] flex-shrink-0">
          <video ref={videoRef} autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover" tabIndex={-1}>
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="hero-content relative z-10 flex-1 flex flex-col items-center justify-end px-6 text-center pb-8 md:pb-10 pt-24 mt-auto">
        <div className="animate-on-load delay-200 bg-white border border-black/10 hover:border-black/20 rounded-full px-1.5 py-1.5 pr-4 mb-7 md:mb-9 shadow-sm inline-flex items-center gap-3 max-w-full">
          <span className="bg-black text-white rounded-full px-2.5 py-1 text-[10px] uppercase font-bold flex-shrink-0">New</span>
          <span className="text-black text-[9px] sm:text-[10px] uppercase tracking-widest font-medium truncate">2026 systems portfolio is live</span>
        </div>

        <h1 className="hero-display animate-on-load delay-300 text-black text-[36px] md:text-[44px] lg:text-[56px] font-medium leading-[1.1] tracking-[-0.02em] max-w-[800px]" id="hero-title">
          I build systems that keep<br className="hidden md:block" /> their shape.
        </h1>
        <p className="hero-subheadline animate-on-load delay-400 text-black/60 text-[16px] md:text-[18px] font-light mt-6 mb-8 md:mb-10 max-w-[600px]">
          Backend infrastructure, developer tools, and language runtimes, engineered for the difficult parts.
        </p>
        <a className="group animate-on-load delay-500 bg-[#7e22ce] hover:bg-[#6b21a8] text-white border border-transparent pl-6 pr-2 py-2 rounded-full font-medium text-[15px] flex items-center gap-4 shadow-xl hover:shadow-2xl transition-all duration-300" href="#work" aria-label="Explore selected systems">
          Explore the systems
          <span className="w-8 h-8 rounded-full bg-white text-[#7e22ce] grid place-items-center">
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </a>
      </div>
    </section>
  )
}

function ProofRail() {
  return (
    <section className="proof-rail" aria-label="Selected engineering results">
      <div className="page-shell proof-rail-grid">
        <div><span>Cache stampede</span><strong>100 misses / 1 origin</strong></div>
        <div><span>Runtime conformance</span><strong>5,060 scoped / 100%</strong></div>
        <div><span>Package surface</span><strong>39 utilities / 3.11 KB</strong></div>
      </div>
    </section>
  )
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (!project || !ref.current) return
    if (!ref.current.open) ref.current.showModal()
    document.body.classList.add('dialog-open')
    return () => document.body.classList.remove('dialog-open')
  }, [project])

  return (
    <dialog ref={ref} className="project-dialog" onClose={onClose} onClick={(event) => event.target === event.currentTarget && event.currentTarget.close()}>
      {project ? (
        <div className="dialog-shell">
          <button className="dialog-close" type="button" onClick={() => ref.current?.close()} aria-label="Close project details"><X /></button>
          <figure className={project.imageFit === 'contain' ? 'contain' : ''}><img src={project.image} alt={project.imageAlt} /></figure>
          <div className="dialog-copy">
            <p className="mono">{project.category} / {project.language} / {project.year}</p>
            <h2>{project.name}</h2>
            <p className="dialog-headline">{project.headline}</p>
            <p className="dialog-summary">{project.summary}</p>
            <ol>{project.caseNotes.map((note) => <li key={note}>{note}</li>)}</ol>
            <a className="button button--primary" href={project.href} target="_blank" rel="noreferrer">{project.linkLabel} <ArrowUpRight /></a>
          </div>
        </div>
      ) : null}
    </dialog>
  )
}

function ProjectShowcase() {
  const [filter, setFilter] = useState<ProjectFilter>('All')
  const [activeId, setActiveId] = useState(projects[0].id)
  const [dialogProject, setDialogProject] = useState<Project | null>(null)
  const visible = filter === 'All' ? projects : projects.filter((project) => project.language === filter)
  const active = visible.find((project) => project.id === activeId) ?? visible[0]

  const selectFilter = (nextFilter: ProjectFilter) => {
    const nextProjects = nextFilter === 'All' ? projects : projects.filter((project) => project.language === nextFilter)
    setFilter(nextFilter)
    setActiveId(nextProjects[0].id)
  }

  const accentStyle = { '--project-accent': accentColors[active.accent] } as CSSProperties

  return (
    <section className="projects" id="work" aria-labelledby="projects-title">
      <div className="page-shell">
        <div className="section-heading">
          <h2 id="projects-title">Selected work</h2>
          <p>Systems shaped around pressure, limits, and the person operating them.</p>
        </div>

        <div className="project-filters" role="tablist" aria-label="Filter projects by language" data-reveal>
          {filters.map((item) => (
            <button key={item} type="button" role="tab" aria-selected={filter === item} onClick={() => selectFilter(item)}>{item}</button>
          ))}
        </div>

        <div className="project-stage" style={accentStyle} data-reveal>
          <div className="project-rail" role="list" aria-label="Projects">
            {visible.map((project, index) => (
              <button
                key={project.id}
                type="button"
                className={project.id === active.id ? 'is-active' : ''}
                onClick={() => setActiveId(project.id)}
                aria-pressed={project.id === active.id}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{project.name}</strong>
                <em>{project.language}</em>
                <ArrowRight />
              </button>
            ))}
          </div>

          <article className="project-focus" key={active.id}>
            <div className="project-focus-copy">
              <p className="mono">{active.category} / {active.year}</p>
              <h3>{active.name}</h3>
              <p className="project-headline">{active.headline}</p>
              <p className="project-summary">{active.summary}</p>
              <div className="project-impact"><span>{active.signalLabel}</span><strong>{active.impactLine}</strong></div>
              <div className="tech-line">{active.tech.map((item) => <span key={item}>{item}</span>)}</div>
              <button className="text-action" type="button" onClick={() => setDialogProject(active)}>Read case notes <ArrowUpRight /></button>
            </div>
            <button className={`project-visual ${active.imageFit === 'contain' ? 'contain' : ''}`} type="button" onClick={() => setDialogProject(active)} aria-label={`Open ${active.name} case notes`}>
              <span className="visual-index">{active.id.toUpperCase()}</span>
              <img src={active.image} alt={active.imageAlt} />
              <span className="visual-scan" aria-hidden="true" />
            </button>
          </article>
        </div>

        <a className="all-repos" href="https://github.com/flyingsquirrel0419?tab=repositories" target="_blank" rel="noreferrer">Browse all repositories <ArrowUpRight /></a>
      </div>
      <ProjectDialog project={dialogProject} onClose={() => setDialogProject(null)} />
    </section>
  )
}

function Profile() {
  return (
    <section className="profile" id="profile" aria-labelledby="profile-title">
      <div className="manifesto page-shell">
        <div className="manifesto-title" data-reveal>
          <h2 id="profile-title"><span>Pressure reveals</span><span>the architecture.</span></h2>
          <p>I work where failure modes matter: caches under concurrency, runtimes around untrusted code, and tools that have to be clear at 2 a.m.</p>
        </div>
        <div className="manifesto-identity" data-reveal>
          <img src={PROFILE_IMAGE} alt="Flying Squirrel avatar" />
          <div><strong>날다람쥐 / Flying Squirrel</strong><span>Backend systems engineer</span><span>Team WICKED, Seoul</span></div>
        </div>
      </div>

      <div className="discipline-band" id="principles">
        <div className="page-shell discipline-list">
          {disciplines.map((discipline) => (
            <article key={discipline.index} data-reveal>
              <span>{discipline.index}</span>
              <h3>{discipline.title}</h3>
              <p>{discipline.description}</p>
              <ArrowUpRight />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

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

function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL) } catch { copyFallback(EMAIL) }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <footer className="contact" id="contact">
      <div className="contact-marquee" aria-hidden="true"><span>BUILD THE DIFFICULT THING / BUILD THE DIFFICULT THING /&nbsp;</span></div>
      <div className="page-shell contact-grid">
        <h2 data-reveal>Bring me the<br /><em>hard part.</em></h2>
        <div className="contact-copy" data-reveal>
          <p>Open to ambitious backend, developer tooling, and runtime work.</p>
          <a className="email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <button className="copy-button" type="button" onClick={copy}>{copied ? <Check /> : <Copy />}{copied ? 'Copied' : 'Copy email'}</button>
        </div>
        <nav className="footer-links" aria-label="Social links">
          <a href="https://github.com/flyingsquirrel0419" target="_blank" rel="noreferrer">GitHub <Github /></a>
          <a href="https://instagram.com/flyingsquirrel0419" target="_blank" rel="noreferrer">Instagram <Instagram /></a>
          <a href={`mailto:${EMAIL}`}>Email <Mail /></a>
          <span>© 2026 / Seoul</span>
          <a href="#top">Back to top <ArrowUpRight /></a>
        </nav>
      </div>
    </footer>
  )
}

export default function App() {
  usePageMotion()
  return (
    <div className="portfolio-app relative min-h-screen flex flex-col w-full overflow-x-hidden bg-[#eeeeee] text-black">
      <a className="skip-link" href="#work">Skip to projects</a>
      <main><Hero /><ProofRail /><ProjectShowcase /><Profile /></main>
      <Contact />
    </div>
  )
}
