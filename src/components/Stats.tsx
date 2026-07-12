import { MOTION_OK, gsap, useMotion } from '../motion'

type Stat = {
  value: number
  decimals?: number
  suffix?: string
  label: string
  detail: string
}

const STATS: Stat[] = [
  { value: 100, suffix: ' → 1', label: 'CACHE STAMPEDE', detail: '100 concurrent misses, one origin call' },
  { value: 5060, label: 'TEST262 CASES', detail: 'scoped runtime conformance at 100%' },
  { value: 3.11, decimals: 2, suffix: ' KB', label: 'PACKAGE SURFACE', detail: '39 typed date utilities, zero deps' },
  { value: 96000, suffix: '+', label: 'FUZZ ITERATIONS', detail: 'panic-audited VM paths in safe Rust' },
]

const format = (value: number, decimals = 0) =>
  value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

export default function Stats() {
  const ref = useMotion<HTMLElement>((section, mm) => {
    mm.add(MOTION_OK, () => {
      const numbers = section.querySelectorAll<HTMLElement>('.stat-number')
      numbers.forEach((element, index) => {
        const stat = STATS[index]
        const counter = { value: 0 }
        gsap.to(counter, {
          value: stat.value,
          duration: 1.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
          onUpdate: () => {
            element.textContent = format(counter.value, stat.decimals) + (stat.suffix ?? '')
          },
        })
      })
      gsap.from(section.querySelectorAll('.stat'), {
        y: 44,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 85%', once: true },
      })
    })
  })

  return (
    <section className="stats" ref={ref} aria-label="Engineering results">
      <div className="shell stats-grid">
        {STATS.map((stat) => (
          <div className="stat" key={stat.label}>
            <strong className="stat-number">{format(stat.value, stat.decimals)}{stat.suffix ?? ''}</strong>
            <span className="stat-label">{stat.label}</span>
            <p className="stat-detail">{stat.detail}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
