import { ArrowUpRight, X } from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { accentHex, projects, type Project } from '../data'
import { DESKTOP, MOBILE, ScrollTrigger, gsap, useMotion } from '../motion'

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (!project || !ref.current) return
    if (!ref.current.open) ref.current.showModal()
    document.body.classList.add('dialog-open')
    return () => document.body.classList.remove('dialog-open')
  }, [project])

  return (
    <dialog
      ref={ref}
      className="project-dialog"
      onClose={onClose}
      onClick={(event) => event.target === event.currentTarget && event.currentTarget.close()}
      style={project ? ({ '--accent': accentHex[project.accent] } as CSSProperties) : undefined}
    >
      {project ? (
        <div className="dialog-shell">
          <button className="dialog-close" type="button" onClick={() => ref.current?.close()} aria-label="Close project details"><X /></button>
          <figure className={project.imageFit === 'contain' ? 'contain' : ''}>
            <img src={project.image} alt={project.imageAlt} />
          </figure>
          <div className="dialog-copy">
            <p className="label">{project.category} / {project.language} / {project.year}</p>
            <h2>{project.name}</h2>
            <p className="dialog-headline">{project.headline}</p>
            <p className="dialog-summary">{project.summary}</p>
            <ol>{project.caseNotes.map((note) => <li key={note}>{note}</li>)}</ol>
            <a className="cta-primary" href={project.href} target="_blank" rel="noreferrer">
              {project.linkLabel} <ArrowUpRight />
            </a>
          </div>
        </div>
      ) : null}
    </dialog>
  )
}

export default function Work() {
  const [dialogProject, setDialogProject] = useState<Project | null>(null)

  const ref = useMotion<HTMLElement>((section, mm) => {
    mm.add(DESKTOP, () => {
      section.classList.add('is-glide')
      const track = section.querySelector<HTMLElement>('.glide-track')
      const progress = section.querySelector<HTMLElement>('.glide-progress span')
      if (!track) return () => section.classList.remove('is-glide')

      const distance = () => track.scrollWidth - window.innerWidth
      const glide = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progress) progress.style.transform = `scaleX(${self.progress})`
          },
        },
      })

      section.querySelectorAll<HTMLElement>('.glide-card').forEach((card) => {
        const accent = card.dataset.accent ?? '#8b5cf6'
        ScrollTrigger.create({
          trigger: card,
          containerAnimation: glide,
          start: 'left 70%',
          end: 'right 30%',
          onToggle: (self) => {
            if (self.isActive) gsap.to(section, { '--ambient': accent, duration: 0.8, overwrite: 'auto' })
          },
        })

        const image = card.querySelector('img')
        if (image) {
          gsap.fromTo(image, { xPercent: -7 }, {
            xPercent: 7,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              containerAnimation: glide,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          })
        }

        gsap.from(card.querySelectorAll('.glide-card-copy > *'), {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, containerAnimation: glide, start: 'left 78%', once: true },
        })
      })

      return () => section.classList.remove('is-glide')
    })

    mm.add(MOBILE, () => {
      section.querySelectorAll<HTMLElement>('.glide-card').forEach((card) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        })
      })
    })
  })

  return (
    <section className="work" id="work" ref={ref} aria-labelledby="work-title">
      <div className="work-ambient" aria-hidden="true" />
      <div className="glide-viewport">
        <div className="glide-track">
          <div className="glide-intro">
            <p className="label">SELECTED WORK — 2026</p>
            <h2 id="work-title">SIX<br />SYSTEMS<br /><em>IN FLIGHT</em></h2>
            <p className="glide-intro-copy">
              Systems shaped around pressure, limits, and the person operating them.
              <span className="glide-only"> Keep scrolling — the page glides sideways.</span>
            </p>
            <span className="glide-hint" aria-hidden="true">SCROLL →</span>
          </div>

          {projects.map((project, index) => (
            <article
              className="glide-card"
              key={project.id}
              data-accent={accentHex[project.accent]}
              style={{ '--accent': accentHex[project.accent] } as CSSProperties}
            >
              <span className="glide-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div className="glide-card-copy">
                <p className="label">{project.category} / {project.language} / {project.year}</p>
                <h3>{project.name}</h3>
                <p className="glide-headline">{project.headline}</p>
                <p className="glide-impact">{project.impactLine}</p>
                <div className="tech-line">{project.tech.map((item) => <span key={item}>{item}</span>)}</div>
                <div className="glide-card-actions">
                  <button className="text-action" type="button" onClick={() => setDialogProject(project)} data-cursor="OPEN">
                    Case notes <ArrowUpRight />
                  </button>
                  <a className="text-action" href={project.href} target="_blank" rel="noreferrer">
                    {project.linkLabel} <ArrowUpRight />
                  </a>
                </div>
              </div>
              <button
                className={`glide-visual${project.imageFit === 'contain' ? ' contain' : ''}`}
                type="button"
                onClick={() => setDialogProject(project)}
                aria-label={`Open ${project.name} case notes`}
                data-cursor="OPEN"
              >
                <img src={project.image} alt={project.imageAlt} loading="lazy" />
              </button>
            </article>
          ))}

          <div className="glide-outro">
            <p className="label">MORE ON GITHUB</p>
            <a className="cta-primary" href="https://github.com/flyingsquirrel0419?tab=repositories" target="_blank" rel="noreferrer">
              Browse all repositories <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>
      <div className="glide-progress" aria-hidden="true"><span /></div>
      <ProjectDialog project={dialogProject} onClose={() => setDialogProject(null)} />
    </section>
  )
}
