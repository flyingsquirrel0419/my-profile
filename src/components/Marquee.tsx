import { MOTION_OK, ScrollTrigger, gsap, useMotion } from '../motion'

const ITEMS = ['BACKEND SYSTEMS', 'CACHE INFRASTRUCTURE', 'LANGUAGE RUNTIMES', 'DEVELOPER TOOLS']

function Row({ reverse }: { reverse?: boolean }) {
  return (
    <div className={`marquee-row${reverse ? ' is-reverse' : ''}`} aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-chunk" key={copy}>
            {ITEMS.map((item) => (
              <span key={item}>{item}<i className="marquee-star">✦</i></span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  const ref = useMotion<HTMLDivElement>((root, mm) => {
    mm.add(MOTION_OK, () => {
      const tweens = Array.from(root.querySelectorAll<HTMLElement>('.marquee-track')).map((track, index) =>
        gsap.fromTo(track,
          { xPercent: index % 2 ? -50 : 0 },
          { xPercent: index % 2 ? 0 : -50, duration: 26, ease: 'none', repeat: -1 },
        ),
      )

      const trigger = ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = gsap.utils.clamp(-2400, 2400, self.getVelocity())
          const boost = 1 + Math.abs(velocity) / 700
          tweens.forEach((tween) => gsap.to(tween, { timeScale: boost, duration: 0.4, overwrite: true }))
          gsap.to(root, {
            skewY: gsap.utils.clamp(-3, 3, velocity / 900),
            duration: 0.4,
            overwrite: 'auto',
          })
        },
      })

      return () => trigger.kill()
    })
  })

  return (
    <div className="marquee" ref={ref} role="presentation">
      <Row />
      <Row reverse />
    </div>
  )
}
