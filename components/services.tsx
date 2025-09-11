"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("opacity-100", "translate-y-0")
          }
        })
      },
      { threshold: 0.15 },
    )
    node.querySelectorAll("[data-reveal]").forEach((el) => {
      el.classList.add("opacity-0", "translate-y-6", "transition", "duration-700")
      io.observe(el)
    })
    return () => io.disconnect()
  }, [])
  return ref
}

export function Services() {
  const ref = useReveal()
  const items = [
    {
      title: "Piling Design & Execution",
      desc: "Bored cast-in-situ, driven piles, and micro piles. End-to-end planning, rig mobilization, and QA/QC.",
      img: "/images/b3.png",
    },
    {
      title: "Soil Investigation & Lab Testing",
      desc: "SPT, CPT, plate load tests, triaxial, consolidation and chemical tests with detailed reports.",
      img: "/images/b3.png",
    },
    {
      title: "Load Testing & Integrity",
      desc: "Static/dynamic load tests, PDA, sonic integrity and CSL to verify capacity and continuity.",
      img: "/images/b3.png",
    },
  ]

  return (
    <section id="services" className="bg-white px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-semibold text-slate-900 sm:text-3xl">Our Services</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-slate-600">
          Comprehensive geotechnical solutions powered by modern equipment and AI‑assisted analytics.
        </p>

        <div ref={ref} className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((s, i) => (
            <Card key={i} data-reveal className="overflow-hidden">
              <CardHeader className="p-0">
                <img
                  src={s.img || "/placeholder.svg"}
                  alt={`${s.title} reference layout`}
                  className="h-40 w-full object-cover"
                />
              </CardHeader>
              <CardContent className="p-5">
                <CardTitle className="text-slate-900">{s.title}</CardTitle>
                <p className="mt-2 text-slate-600">{s.desc}</p>
                <Button variant="link" className="mt-2 p-0 text-sky-600">
                  Read More →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
