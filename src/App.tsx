import {
  ArrowDown,
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
import { disciplines, projects, type Project } from './data'
import SystemField from './SystemField'

const EMAIL = 'flying_squirrel__@teamwicked.me'
const PROFILE_IMAGE = `${import.meta.env.BASE_URL}assets/profile.jpg`
const filters = ['All', 'TypeScript', 'Python', 'Rust'] as const
const accentColors = {
  acid: '#d7ff2b',
  blue: '#6f94ff',
  orange: '#ff9f43',
  red: '#ff5c64',
} as const

type ProjectFilter = (typeof filters)[number]

function usePageMotion() {
  useEffect(() => {
    const root = document.documentElement
    let ticking = false
    const updateProgress = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight
      root.style.setProperty('--scroll-progress', `${available > 0 ? window.scrollY / available : 0}`)
      ticking = false
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(updateProgress)
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })

    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element))
    updateProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
}

function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Flying Squirrel home">
        <span className="brand-mark" aria-hidden="true">FS</span>
        <span>Flying Squirrel</span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="#work">Work</a>
        <a href="#profile">Profile</a>
        <a href="#contact">Contact</a>
      </nav>
      <a className="github-link" href="https://github.com/flyingsquirrel0419" target="_blank" rel="noreferrer">
        <Github /> <span>GitHub</span> <ArrowUpRight />
      </a>
      <button className="menu-button" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {open ? <X /> : <Menu />}
      </button>
      <nav className={`mobile-nav ${open ? 'is-open' : ''}`} aria-label="Mobile navigation">
        {['work', 'profile', 'contact'].map((id) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {id === 'work' ? 'Work' : id[0].toUpperCase() + id.slice(1)} <ArrowUpRight />
          </a>
        ))}
      </nav>
      <div className="scroll-progress" aria-hidden="true"><span /></div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <SystemField />
      <div className="hero-grid page-shell">
        <div className="hero-copy">
          <h1 id="hero-title">
            <span>I build</span>
            <span>systems</span>
            <span>that <em>hold.</em></span>
          </h1>
          <div className="hero-support">
            <p>Backend systems, developer tools, and language runtimes, engineered in Seoul.</p>
            <div className="hero-actions">
              <a className="button button--primary" href="#work">Explore work <ArrowDown /></a>
              <a className="button button--line" href="https://github.com/flyingsquirrel0419" target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a>
            </div>
          </div>
        </div>

        <div className="hero-identity" aria-label="Flying Squirrel profile">
          <div className="identity-coordinates"><span>37.5665 N</span><span>126.9780 E</span></div>
          <div className="identity-image">
            <img src={PROFILE_IMAGE} alt="Flying Squirrel pixel avatar" />
            <span className="image-cursor" aria-hidden="true" />
          </div>
          <div className="identity-label"><strong>Flying Squirrel</strong><span>Team WICKED / Seoul</span></div>
        </div>

        <div className="signal-rail" aria-label="Selected engineering signals">
          <div><span>Cache stampede</span><strong>100 misses / 1 origin</strong></div>
          <div><span>Runtime conformance</span><strong>5,060 scoped / 100%</strong></div>
          <div><span>Package surface</span><strong>39 utilities / 3.11 KB</strong></div>
        </div>
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

      <div className="discipline-band">
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
    <>
      <a className="skip-link" href="#work">Skip to projects</a>
      <Header />
      <main><Hero /><ProjectShowcase /><Profile /></main>
      <Contact />
    </>
  )
}
