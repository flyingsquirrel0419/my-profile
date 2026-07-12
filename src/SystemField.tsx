import { useEffect, useRef } from 'react'

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  phase: number
}

const TAU = Math.PI * 2

function createNodes(width: number, height: number): Node[] {
  const count = Math.max(26, Math.min(58, Math.round((width * height) / 18500)))
  return Array.from({ length: count }, (_, index) => {
    const column = index % 9
    const row = Math.floor(index / 9)
    const phase = (index * 2.399963) % TAU
    return {
      x: ((column + 0.45 + Math.sin(phase) * 0.18) / 9) * width,
      y: ((row + 0.55 + Math.cos(phase) * 0.2) / Math.ceil(count / 9)) * height,
      vx: Math.cos(phase) * (0.08 + (index % 4) * 0.025),
      vy: Math.sin(phase) * (0.08 + (index % 3) * 0.02),
      size: index % 11 === 0 ? 2.4 : 1.25,
      phase,
    }
  })
}

export default function SystemField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: 0, y: 0, active: false }
    let width = 0
    let height = 0
    let nodes: Node[] = []
    let animationFrame = 0
    let previousTime = 0
    let running = true

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, bounds.width)
      height = Math.max(1, bounds.height)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      nodes = createNodes(width, height)
      if (reducedMotion) window.requestAnimationFrame(() => draw())
    }

    const draw = (time = 0) => {
      const delta = Math.min(32, time - previousTime || 16)
      previousTime = time
      context.clearRect(0, 0, width, height)

      context.strokeStyle = 'rgba(139, 92, 246, 0.07)'
      context.lineWidth = 1
      for (let x = 0; x < width; x += 72) {
        context.beginPath()
        context.moveTo(x + 0.5, 0)
        context.lineTo(x + 0.5, height)
        context.stroke()
      }
      for (let y = 0; y < height; y += 72) {
        context.beginPath()
        context.moveTo(0, y + 0.5)
        context.lineTo(width, y + 0.5)
        context.stroke()
      }

      if (!reducedMotion) {
        nodes.forEach((node) => {
          node.x += node.vx * delta
          node.y += node.vy * delta
          if (node.x < -12) node.x = width + 12
          if (node.x > width + 12) node.x = -12
          if (node.y < -12) node.y = height + 12
          if (node.y > height + 12) node.y = -12

          if (pointer.active) {
            const dx = node.x - pointer.x
            const dy = node.y - pointer.y
            const distance = Math.hypot(dx, dy)
            if (distance > 1 && distance < 150) {
              const force = (150 - distance) / 2600
              node.x += (dx / distance) * force * delta
              node.y += (dy / distance) * force * delta
            }
          }
        })
      }

      for (let index = 0; index < nodes.length; index += 1) {
        const node = nodes[index]
        for (let nextIndex = index + 1; nextIndex < nodes.length; nextIndex += 1) {
          const next = nodes[nextIndex]
          const distance = Math.hypot(node.x - next.x, node.y - next.y)
          if (distance > 142) continue
          const alpha = (1 - distance / 142) * 0.28
          context.strokeStyle = `rgba(167, 139, 250, ${alpha})`
          context.beginPath()
          context.moveTo(node.x, node.y)
          context.lineTo(next.x, next.y)
          context.stroke()
        }
      }

      nodes.forEach((node, index) => {
        const pulse = reducedMotion ? 1 : 0.62 + Math.sin(time * 0.0018 + node.phase) * 0.25
        context.fillStyle = index % 7 === 0
          ? `rgba(255, 176, 84, ${pulse})`
          : `rgba(238, 232, 255, ${pulse * 0.7})`
        context.beginPath()
        context.arc(node.x, node.y, node.size, 0, TAU)
        context.fill()
      })

      const scanY = reducedMotion ? height * 0.44 : (time * 0.055) % Math.max(height, 1)
      context.strokeStyle = 'rgba(232, 121, 249, 0.22)'
      context.beginPath()
      context.moveTo(0, scanY + 0.5)
      context.lineTo(width, scanY + 0.5)
      context.stroke()

      if (!reducedMotion && running) animationFrame = window.requestAnimationFrame(draw)
    }

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect()
      pointer.x = event.clientX - bounds.left
      pointer.y = event.clientY - bounds.top
      pointer.active = pointer.x >= 0 && pointer.x <= width && pointer.y >= 0 && pointer.y <= height
    }
    const onPointerLeave = () => { pointer.active = false }
    const onVisibilityChange = () => {
      running = !document.hidden
      if (running && !reducedMotion) animationFrame = window.requestAnimationFrame(draw)
      else window.cancelAnimationFrame(animationFrame)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('mouseleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      running = false
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('mouseleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return <canvas ref={canvasRef} className="system-field" aria-hidden="true" />
}
