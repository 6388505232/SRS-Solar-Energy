"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export function QuoteForm() {
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    // demo behavior: pretend to submit
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    alert("Thanks! We will contact you soon.")
  }

  return (
    <section id="quote" className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 py-16 md:grid-cols-2">
      <div className="relative overflow-hidden rounded-xl">
        <img src="/images/a4.png" alt="Aerial site reference image" className="h-full w-full object-cover" />
      </div>
      <form onSubmit={onSubmit} className="rounded-xl bg-slate-50 p-6">
        <h3 className="text-2xl font-semibold text-slate-900">Get a Free Quote</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input placeholder="Name" required aria-label="Name" />
          <Input type="email" placeholder="Email" required aria-label="Email" />
          <Input placeholder="Mobile" required aria-label="Mobile" />
          <Select>
            <SelectTrigger aria-label="Select a service">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="piling">Piling</SelectItem>
              <SelectItem value="soil">Soil Investigation</SelectItem>
              <SelectItem value="load">Load Testing</SelectItem>
            </SelectContent>
          </Select>
          <div className="md:col-span-2">
            <Textarea placeholder="Special Note" aria-label="Special Note" />
          </div>
        </div>
        <Button type="submit" disabled={loading} className="mt-5 rounded-full bg-sky-600 text-white hover:bg-sky-700">
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </section>
  )
}
