import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Instagram,
  Mail,
  Menu,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { disciplines, projects, type Project } from './data'

const EMAIL = 'flying_squirrel__@teamwicked.me'
const PROFILE_IMAGE = `${import.meta.env.BASE_URL}assets/profile.jpg`
const filters = ['All', 'TypeScript', 'Python', 'Rust'] as const
type ProjectFilter = (typeof filters)[number]

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
        <img src={PROFILE_IMAGE} alt="" />
        <span>Flying Squirrel</span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="#work">Projects <ArrowUpRight /></a>
        <a href="#profile">Profile <ArrowUpRight /></a>
        <a href="#contact">Contact <ArrowUpRight /></a>
      </nav>
      <a className="github-link" href="https://github.com/flyingsquirrel0419" target="_blank" rel="noreferrer">
        <Github /> <span>GitHub</span>
      </a>
      <button className="menu-button" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>
      <nav className={`mobile-nav ${open ? 'is-open' : ''}`} aria-label="Mobile navigation">
        {['work', 'profile', 'contact'].map((id) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{id === 'work' ? 'Projects' : id[0].toUpperCase() + id.slice(1)} <ArrowUpRight /></a>
        ))}
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero page-shell" id="top" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title">I build systems<br />that stay fast<br />when things get <em>difficult.</em></h1>
        <p>Backend systems, developer tools, and language runtimes — engineered in Seoul.</p>
        <div className="hero-actions">
          <a className="button button--acid" href="#work">Explore projects <ArrowDown /></a>
          <a className="button button--ghost" href="https://github.com/flyingsquirrel0419" target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a>
        </div>
        <div className="availability"><span />Available for ambitious systems work</div>
      </div>

      <div className="hero-art" aria-label="Flying Squirrel pixel avatar">
        <div className="orbit orbit--one" />
        <div className="orbit orbit--two" />
        <div className="avatar-frame">
          <span className="corner corner--tl">+</span><span className="corner corner--tr">+</span>
          <span className="corner corner--bl">+</span><span className="corner corner--br">+</span>
          <img src={PROFILE_IMAGE} alt="Flying Squirrel pixel avatar" />
        </div>
      </div>

      <div className="hero-facts" aria-label="Profile facts">
        <span>⌖ Seoul, KR</span>
        <span>&lt;/&gt; TypeScript · Python · Rust</span>
        <span>▣ 35 public repositories</span>
      </div>
    </section>
  )
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (!project || !ref.current) return
    ref.current.showModal()
    document.body.classList.add('dialog-open')
    return () => document.body.classList.remove('dialog-open')
  }, [project])

  return (
    <dialog ref={ref} className="project-dialog" onClose={onClose} onClick={(event) => event.target === event.currentTarget && event.currentTarget.close()}>
      {project && <div className="dialog-shell">
        <button className="dialog-close" type="button" onClick={() => ref.current?.close()} aria-label="Close project details"><X /></button>
        <figure className={project.imageFit === 'contain' ? 'contain' : ''}><img src={project.image} alt={project.imageAlt} /></figure>
        <div className="dialog-copy">
          <p className="mono">{project.category} · {project.language} · {project.year}</p>
          <h2>{project.name}</h2>
          <p className="dialog-headline">{project.headline}</p>
          <p className="dialog-summary">{project.summary}</p>
          <dl>
            <div><dt>What it solves</dt><dd>{project.problem}</dd></div>
            <div><dt>What I built</dt><dd>{project.build}</dd></div>
            <div><dt>Evidence</dt><dd>{project.proof}</dd></div>
          </dl>
          <a className="button button--acid" href={project.href} target="_blank" rel="noreferrer">{project.linkLabel} <ArrowUpRight /></a>
        </div>
      </div>}
    </dialog>
  )
}

function ProjectFeature({ project, index, onOpen }: { project: Project; index: number; onOpen: (project: Project) => void }) {
  return (
    <article className={`project-feature project-feature--${index}`}>
      <div className="project-intro">
        <span className="project-number">0{index + 1}</span>
        <button type="button" className="project-title" onClick={() => onOpen(project)}>{project.name} <ArrowUpRight /></button>
        <p>{project.headline}</p>
        <div className="project-meta"><span>{project.language}</span><i />{project.year}</div>
      </div>
      <button className={`project-image ${project.imageFit === 'contain' ? 'contain' : ''}`} type="button" onClick={() => onOpen(project)} aria-label={`Open ${project.name} details`}>
        <img src={project.image} alt={project.imageAlt} />
        <span>View case notes <ArrowUpRight /></span>
      </button>
      {index === 0 && <p className="project-proof">› <strong>{project.proof.split(' · ')[1]}</strong> · {project.proof.split(' · ').slice(2).join(' · ')}</p>}
    </article>
  )
}

function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>('All')
  const [selected, setSelected] = useState<Project | null>(null)
  const visible = filter === 'All' ? projects : projects.filter((project) => project.language === filter)
  const featured = visible.slice(0, 3)
  const indexed = visible.slice(3)

  return (
    <section className="projects page-shell" id="work" aria-labelledby="projects-title">
      <div className="section-top"><h2 id="projects-title">Selected work</h2><span>0{visible.length} projects</span></div>
      <div className="project-toolbar" role="tablist" aria-label="Filter projects by language">
        {filters.map((item) => <button key={item} type="button" role="tab" aria-selected={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
      </div>
      <div className="featured-list" aria-live="polite">
        {featured.map((project, index) => <ProjectFeature key={project.id} project={project} index={index} onOpen={setSelected} />)}
      </div>
      {indexed.length > 0 && <div className="project-index">
        {indexed.map((project, index) => <button key={project.id} type="button" onClick={() => setSelected(project)}>
          <span>0{index + 4}</span><strong>{project.name}</strong><p>{project.headline}</p><em>{project.language} · {project.year}</em><ArrowUpRight />
        </button>)}
      </div>}
      <a className="all-repos" href="https://github.com/flyingsquirrel0419?tab=repositories" target="_blank" rel="noreferrer">Browse all repositories <ArrowUpRight /></a>
      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

function Profile() {
  return (
    <section className="profile page-shell" id="profile" aria-labelledby="profile-title">
      <div className="profile-intro">
        <div className="profile-heading">
          <p className="section-label">Profile</p>
          <h2 id="profile-title">I turn infrastructure problems into small, dependable tools.</h2>
          <p>I work across the whole path—from core behavior and failure recovery to packaging, documentation, and the command people type.</p>
        </div>
        <div className="profile-identity">
          <img src={PROFILE_IMAGE} alt="Flying Squirrel avatar" />
          <div>
            <span>Flying Squirrel</span>
            <strong>날다람쥐 · Team WICKED</strong>
            <p>Backend systems engineer<br />Seoul, South Korea</p>
          </div>
        </div>
      </div>

      <div className="discipline-list">
        {disciplines.map((discipline) => <article key={discipline.index}>
          <span>{discipline.index}</span>
          <h3>{discipline.title}</h3>
          <p>{discipline.description}</p>
          <ArrowUpRight />
        </article>)}
      </div>
    </section>
  )
}

function copyFallback(value: string) {
  const area = document.createElement('textarea')
  area.value = value; area.style.position = 'fixed'; area.style.opacity = '0'
  document.body.appendChild(area); area.select(); document.execCommand('copy'); area.remove()
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL) } catch { copyFallback(EMAIL) }
    setCopied(true); window.setTimeout(() => setCopied(false), 1800)
  }
  return (
    <footer className="contact" id="contact">
      <div className="contact-orbit" aria-hidden="true" />
      <div className="page-shell">
        <h2>Let&apos;s build<br />something difficult.</h2>
        <p>Open to ambitious backend, developer tooling,<br />and runtime work.</p>
        <a className="email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <button className="copy-button" type="button" onClick={copy}>{copied ? <Check /> : <Copy />}{copied ? 'Copied!' : 'Copy email'} <ArrowUpRight /></button>
        <nav className="footer-links" aria-label="Social links">
          <div><a href="https://github.com/flyingsquirrel0419" target="_blank" rel="noreferrer">GitHub <Github /></a><a href="https://instagram.com/flyingsquirrel0419" target="_blank" rel="noreferrer">Instagram <Instagram /></a><a href={`mailto:${EMAIL}`}>Email <Mail /></a></div>
          <span>© 2026 Flying Squirrel</span><span>Built in Seoul</span><a href="#top">Back to top ↑</a>
        </nav>
      </div>
    </footer>
  )
}

export default function App() {
  return <><a className="skip-link" href="#work">Skip to projects</a><Header /><main><Hero /><Projects /><Profile /></main><Contact /></>
}
