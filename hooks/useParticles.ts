import { useEffect, useRef, RefObject } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  opacity: number
  targetOpacity: number
}

function makeParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    r: Math.random() * 1.5 + 0.3,
    opacity: Math.random() * 0.5 + 0.1,
    targetOpacity: Math.random() * 0.5 + 0.1,
  }
}

export function useParticles(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  count = 80,
  disabled = false,
) {
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef   = useRef<number | null>(null)

  useEffect(() => {
    if (disabled) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = (canvas.width  = window.innerWidth)
    let H = (canvas.height = window.innerHeight)
    const particles = Array.from({ length: count }, () => makeParticle(W, H))

    const onMove   = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    const onResize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', onMove,   { passive: true })
    window.addEventListener('resize',    onResize, { passive: true })

    // #C8A84B = rgb(200, 168, 75)
    const GOLD_RGB = '200,168,75'

    function draw() {
      ctx!.clearRect(0, 0, W, H)

      for (const p of particles) {
        const dx   = mouseRef.current.x - p.x
        const dy   = mouseRef.current.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        if (dist < 180) {
          p.vx += (dx / dist) * 0.025
          p.vy += (dy / dist) * 0.025
        }

        p.vx *= 0.97
        p.vy *= 0.97
        p.x  += p.vx
        p.y  += p.vy

        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0

        p.opacity += (p.targetOpacity - p.opacity) * 0.015
        if (Math.abs(p.opacity - p.targetOpacity) < 0.01) {
          p.targetOpacity = Math.random() * 0.5 + 0.1
        }

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${GOLD_RGB},${p.opacity.toFixed(2)})`
        ctx!.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize',    onResize)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [canvasRef, count, disabled])
}
