"use client"
import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    const particles: { x: number; y: number; vx: number; vy: number }[] = []
    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
    const colorPrimary = "#0ea5e9" // light blue (primary)
    const colorAccent = "#ef4444" // red (accent)

    function resize() {
      const { clientWidth, clientHeight } = canvas
      canvas.width = clientWidth * DPR
      canvas.height = clientHeight * DPR
      ctx.scale(DPR, DPR)
    }

    function initParticles() {
      particles.length = 0
      const { clientWidth, clientHeight } = canvas
      const count = Math.floor((clientWidth * clientHeight) / 14000) + 24
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * clientWidth,
          y: Math.random() * clientHeight,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
        })
      }
    }

    function step() {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)

      // draw lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.strokeStyle = dist < 60 ? colorAccent : colorPrimary
            ctx.globalAlpha = dist < 60 ? 0.25 : 0.15
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }

      // draw dots + move
      ctx.fillStyle = colorPrimary
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(step)
    }

    function onResize() {
      resize()
      initParticles()
    }

    resize()
    initParticles()
    step()
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <section className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden bg-white px-4 py-16 md:py-24">
      <img
        src="/images/a1.png"
        alt="Reference hero layout (for design inspiration)"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-10"
      />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 -z-10 h-full w-full" aria-hidden="true" />
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 font-medium text-sky-600">Piling • Soil Investigation • Load Testing</p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          Reliable Piling & Soil Testing with AI‑assisted Precision
        </h1>
        <p className="mt-4 text-pretty text-slate-600">
          We combine field expertise with AI insights to optimize foundation design, reduce risk, and accelerate project
          timelines.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button className="bg-sky-600 text-white hover:bg-sky-700" asChild>
            <a href="#quote">Get a Free Quote</a>
          </Button>
          <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50 bg-transparent" asChild>
            <a href="#services">Explore Services</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
