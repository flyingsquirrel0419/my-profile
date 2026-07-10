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
import { useEffect, useRef, useState } from 'react'
import { disciplines, projects, type Project } from './data'

const EMAIL = 'flying_squirrel__@teamwicked.me'
const filters = ['All', 'TypeScript', 'Python', 'Rust'] as const
type ProjectFilter = (typeof filters)[number]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return

    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Flying Squirrel home">
        <img src="/assets/profile-avatar.png" alt="" />
        <span>Flying Squirrel</span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="#work">Projects</a>
        <a href="#profile">Profile</a>
        <a href="#contact">Contact</a>
      </nav>

      <a
        className="header-icon-button"
        href="https://github.com/flyingsquirrel0419"
        target="_blank"
        rel="noreferrer"
        aria-label="Open GitHub profile"
        title="GitHub"
      >
        <Github aria-hidden="true" />
      </a>

      <button
        className="header-icon-button menu-button"
        type="button"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      <nav
        id="mobile-navigation"
        className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}
        aria-label="Mobile navigation"
      >
        <a href="#work" onClick={closeMenu}>Projects</a>
        <a href="#profile" onClick={closeMenu}>Profile</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
        <a
          href="https://github.com/flyingsquirrel0419"
          target="_blank"
          rel="noreferrer"
          onClick={closeMenu}
        >
          GitHub <ArrowUpRight aria-hidden="true" />
        </a>
      </nav>
    </header>
  )
}

function Intro() {
  return (
    <section className="intro page-shell" id="top" aria-labelledby="intro-title">
      <div className="intro-identity">
        <img src="/assets/profile-avatar.png" alt="Flying Squirrel pixel avatar" />
        <div>
          <h1 id="intro-title">Flying Squirrel</h1>
          <p>날다람쥐 · Team WICKED</p>
        </div>
      </div>

      <p className="intro-lead">
        I build backend systems, developer tools, and language runtimes that
        turn difficult infrastructure into software people can actually use.
      </p>

      <div className="intro-footer">
        <div className="intro-facts" aria-label="Profile facts">
          <span>Seoul, KR</span>
          <span>TypeScript · Python · Rust</span>
          <span>35 public repositories</span>
        </div>

        <div className="intro-actions">
          <a
            className="button button--dark"
            href="https://github.com/flyingsquirrel0419"
            target="_blank"
            rel="noreferrer"
          >
            <Github aria-hidden="true" />
            GitHub
          </a>
          <a className="button button--light" href={`mailto:${EMAIL}`}>
            <Mail aria-hidden="true" />
            Email
          </a>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: (project: Project) => void
}) {
  return (
    <article className={`project-card project-card--${project.accent}`}>
      <button
        className={`project-media ${project.imageFit === 'contain' ? 'project-media--contain' : ''}`}
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Open ${project.name} project details`}
      >
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
        />
        <span className="project-media-action" aria-hidden="true">
          <ArrowUpRight />
        </span>
      </button>

      <div className="project-card-meta">
        <span>{project.category}</span>
        <span>{project.language} · {project.year}</span>
      </div>

      <h3>{project.name}</h3>
      <p className="project-card-headline">{project.headline}</p>
      <p className="project-card-summary">{project.summary}</p>

      <div className="project-card-footer">
        <ul aria-label={`${project.name} technology stack`}>
          {project.tech.slice(0, 3).map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <button type="button" onClick={() => onOpen(project)}>
          Case notes <ArrowRight aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !project) return

    dialog.showModal()
    document.body.classList.add('dialog-open')

    return () => {
      document.body.classList.remove('dialog-open')
      if (dialog.open) dialog.close()
    }
  }, [project])

  return (
    <dialog
      className={`project-dialog ${project ? `project-dialog--${project.accent}` : ''}`}
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close()
      }}
    >
      {project ? (
        <div className="project-dialog-shell">
          <div className="project-dialog-header">
            <div>
              <span>{project.category}</span>
              <span>{project.language} · {project.year}</span>
            </div>
            <button
              className="dialog-close"
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close project details"
              title="Close"
            >
              <X aria-hidden="true" />
            </button>
          </div>

          <div className="project-dialog-grid">
            <figure
              className={`project-dialog-media ${project.imageFit === 'contain' ? 'project-dialog-media--contain' : ''}`}
            >
              <img src={project.image} alt={project.imageAlt} decoding="async" />
            </figure>

            <div className="project-dialog-copy">
              <h2>{project.name}</h2>
              <p className="dialog-headline">{project.headline}</p>
              <p className="dialog-summary">{project.summary}</p>

              <dl>
                <div>
                  <dt>What it solves</dt>
                  <dd>{project.problem}</dd>
                </div>
                <div>
                  <dt>What I built</dt>
                  <dd>{project.build}</dd>
                </div>
                <div>
                  <dt>Evidence</dt>
                  <dd>{project.proof}</dd>
                </div>
              </dl>

              <ul className="dialog-stack" aria-label={`${project.name} full technology stack`}>
                {project.tech.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>

              <a
                className="button button--dark dialog-link"
                href={project.href}
                target="_blank"
                rel="noreferrer"
              >
                {project.linkLabel}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </dialog>
  )
}

function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectFilter>('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const visibleProjects =
    filter === 'All' ? projects : projects.filter((project) => project.language === filter)

  return (
    <section className="projects-section page-shell" id="work" aria-labelledby="projects-title">
      <div className="section-heading">
        <div>
          <p>Selected projects</p>
          <h2 id="projects-title">Work with a reason to exist.</h2>
        </div>
        <p>
          Every project below names the constraint, the implementation, and the
          evidence. Pick one for the full case notes.
        </p>
      </div>

      <div className="project-toolbar">
        <div className="filter-tabs" role="tablist" aria-label="Filter projects by language">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <span>{visibleProjects.length} projects</span>
      </div>

      <div className="project-grid" aria-live="polite">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />
        ))}
      </div>

      <a
        className="repository-link"
        href="https://github.com/flyingsquirrel0419?tab=repositories"
        target="_blank"
        rel="noreferrer"
      >
        <span>More source, experiments, and active work</span>
        <strong>Browse all repositories</strong>
        <ArrowUpRight aria-hidden="true" />
      </a>

      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}

function ProfileSection() {
  return (
    <section className="profile-section" id="profile" aria-labelledby="profile-title">
      <div className="page-shell">
        <div className="profile-heading">
          <p>Profile</p>
          <h2 id="profile-title">From runtime limits to the command people type.</h2>
          <p>
            I work across the whole path: core behavior, failure recovery,
            packaging, documentation, and the interface around it.
          </p>
        </div>

        <div className="discipline-grid">
          {disciplines.map((discipline) => (
            <article key={discipline.index}>
              <span>{discipline.index}</span>
              <h3>{discipline.title}</h3>
              <p>{discipline.description}</p>
            </article>
          ))}
        </div>

        <div className="team-panel">
          <img src="/assets/team-wicked.png" alt="Team WICKED logo" />
          <div>
            <span>Team WICKED</span>
            <h3>Discord systems and production services, built with the team.</h3>
            <p>
              Member and developer contributing to infrastructure and public-facing
              projects, including Iodine V2 with Ingwannu.
            </p>
          </div>
          <a
            href="https://namu.wiki/w/Team%20Wicked"
            target="_blank"
            rel="noreferrer"
          >
            Team profile <ArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <div className="public-links">
          <p>Elsewhere</p>
          <a href="https://github.com/flyingsquirrel0419" target="_blank" rel="noreferrer">
            <span>GitHub</span>
            <strong>Source, issues, and active experiments</strong>
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a href="https://dev.to/flyingsquirrel0419" target="_blank" rel="noreferrer">
            <span>DEV.to</span>
            <strong>Development notes and release writing</strong>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

function copyTextFallback(value: string) {
  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
}

function ContactSection() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    let clipboardWriteSucceeded = false

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(EMAIL)
        clipboardWriteSucceeded = true
      } catch {
        clipboardWriteSucceeded = false
      }
    }

    if (!clipboardWriteSucceeded) {
      copyTextFallback(EMAIL)
    }

    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <footer className="contact-section" id="contact">
      <div className="page-shell">
        <div className="contact-copy">
          <p>Contact</p>
          <h2>Let&apos;s talk about a system.</h2>
          <p>Project questions, collaboration, and source discussions are welcome by email.</p>
        </div>

        <div className="email-row">
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <button
            type="button"
            onClick={copyEmail}
            aria-label={copied ? 'Email copied' : 'Copy email address'}
            title={copied ? 'Copied' : 'Copy email'}
          >
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          </button>
        </div>
        <span className="copy-status" aria-live="polite">
          {copied ? 'Copied to clipboard' : ''}
        </span>

        <nav className="social-links" aria-label="Social links">
          <a href="https://github.com/flyingsquirrel0419" target="_blank" rel="noreferrer">
            <Github aria-hidden="true" /> GitHub
          </a>
          <a href="https://dev.to/flyingsquirrel0419" target="_blank" rel="noreferrer">
            <span className="dev-mark" aria-hidden="true">DEV</span> DEV
          </a>
          <a href="https://instagram.com/flyingsquirrel0419" target="_blank" rel="noreferrer">
            <Instagram aria-hidden="true" /> Instagram
          </a>
          <a href={`mailto:${EMAIL}`}>
            <Mail aria-hidden="true" /> Email
          </a>
        </nav>

        <div className="footer-line">
          <span>© 2026 Flying Squirrel · Seoul, KR</span>
          <a href="#top">Back to top <ArrowUpRight aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <>
      <a className="skip-link" href="#work">Skip to projects</a>
      <Header />
      <main>
        <Intro />
        <ProjectsSection />
        <ProfileSection />
      </main>
      <ContactSection />
    </>
  )
}

export default App
