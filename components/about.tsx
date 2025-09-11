import { Button } from "@/components/ui/button"

export function About() {
  return (
    <section id="about" className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 py-16 md:grid-cols-2">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100 md:aspect-auto md:h-[420px]">
        <img
          src="/images/a2.png"
          alt="Engineers handling panels (layout reference)"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center">
        <p className="mb-2 text-sm font-semibold text-sky-600">About Us</p>
        <h2 className="text-balance text-2xl font-semibold text-slate-900 sm:text-3xl">
          10+ Years in Geotechnical & Pile Foundations
        </h2>
        <p className="mt-3 text-slate-600">
          From soil investigation to static/dynamic load testing, we deliver end‑to‑end piling solutions for industrial,
          infrastructure, and commercial projects. Our team leverages AI‑driven analysis alongside lab results to
          produce faster, data‑backed recommendations—reducing over‑design and unexpected ground risk.
        </p>
        <div className="mt-6">
          <Button className="rounded-full bg-red-600 text-white hover:bg-red-700">Learn More</Button>
        </div>
      </div>
    </section>
  )
}
