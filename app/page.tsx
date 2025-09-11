import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { QuoteForm } from "@/components/quote-form"
import { AIChatWidget } from "@/components/ai-chat-widget"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* A1 - Hero */}
      <Hero />
      {/* A2 - About */}
      <About />
      {/* B3 - Services */}
      <Services />
      {/* A4 - Quote Form */}
      <QuoteForm />
      {/* Floating AI assistant */}
      <AIChatWidget />
    </main>
  )
}
