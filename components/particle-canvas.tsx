"use client"

import { useEffect, useRef } from "react"

type Particle = { x: number; y: number; vx: number; vy: number; r: number; c: string }

export function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      const { clientWidth, clientHeight } = canvas
      canvas.width = clientWidth * DPR
      canvas.height = clientHeight * DPR
    }
    const colors = [
      "rgba(14,165,233,0.85)", // light blue
      "rgba(239,68,68,0.9)", // red
      "rgba(255,255,255,0.9)", // white
    ]

    resize()
    window.addEventListener("resize", resize)

    const P: Particle[] = []
    const COUNT = Math.max(36, Math.floor((canvas.width * canvas.height) / (14000 * DPR)))
    for (let i = 0; i < COUNT; i++) {
      P.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4 * DPR,
        vy: (Math.random() - 0.5) * 0.4 * DPR,
        r: Math.random() * (2.2 * DPR) + 0.8 * DPR,
        c: colors[(Math.random() * colors.length) | 0],
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // connection lines
      for (let i = 0; i < P.length; i++) {
        for (let j = i + 1; j < P.length; j++) {
          const dx = P[i].x - P[j].x
          const dy = P[i].y - P[j].y
          const d2 = dx * dx + dy * dy
          const max = 140 * DPR
          if (d2 < max * max) {
            const alpha = 1 - Math.sqrt(d2) / max
            ctx.strokeStyle = `rgba(255,255,255,${0.15 * alpha})`
            ctx.lineWidth = 0.6 * DPR
            ctx.beginPath()
            ctx.moveTo(P[i].x, P[i].y)
            ctx.lineTo(P[j].x, P[j].y)
            ctx.stroke()
          }
        }
      }

      // particles
      for (const p of P) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.fillStyle = p.c
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}
