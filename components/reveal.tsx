"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.style.transitionDelay = `${delay}ms`
            el.classList.remove("opacity-0", "translate-y-4")
            el.classList.add("opacity-100", "translate-y-0")
            io.disconnect()
          }
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={cn("opacity-0 translate-y-4 will-change-transform transition-all duration-700", className)}
    >
      {children}
    </div>
  )
}
