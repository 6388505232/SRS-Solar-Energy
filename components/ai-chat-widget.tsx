"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Msg = { id: string; role: "user" | "assistant"; content: string }

export function AIChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "hello",
      role: "assistant",
      content: "Hi! I’m your Geotech AI assistant. Ask me about piling types, soil tests, or request a quick estimate.",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return

    const user: Msg = { id: crypto.randomUUID(), role: "user", content: input.trim() }
    setMessages((prev) => [...prev, user])
    setInput("")
    await sendToAI([...messages, user])
  }

  async function sendToAI(history: Msg[]) {
    setIsLoading(true)
    // create an empty assistant message and progressively append content
    const assistantId = crypto.randomUUID()
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }])

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      })

      if (!res.ok || !res.body) {
        const errorText =
          (await res.text().catch(() => "")) ||
          "The AI service is unavailable. Please add OPENAI_API_KEY in Project Settings and try again."
        setMessages((prev) => prev.map((m) => (m.id === assistantId ? { ...m, content: errorText } : m)))
        return
      }

      // Read and parse SSE lines produced by ai SDK's DataStreamResponse
      const reader = res.body.getReader()
      const decoder = new TextDecoder("utf-8")
      let buffer = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })

        // Process complete SSE events separated by double newlines
        let idx: number
        while ((idx = buffer.indexOf("\n\n")) !== -1) {
          const chunk = buffer.slice(0, idx).trim()
          buffer = buffer.slice(idx + 2)

          // Only parse data: lines
          if (chunk.startsWith("data:")) {
            const json = chunk.replace(/^data:\s*/, "")
            if (json === "[DONE]") continue
            try {
              const evt = JSON.parse(json)
              // Common event: { type: "text-delta", textDelta: "..." }
              if (evt?.type === "text-delta" && typeof evt.textDelta === "string") {
                setMessages((prev) =>
                  prev.map((m) => (m.id === assistantId ? { ...m, content: (m.content || "") + evt.textDelta } : m)),
                )
              }
              // Optional final content
              if (evt?.type === "message" && typeof evt.message?.content === "string") {
                setMessages((prev) =>
                  prev.map((m) => (m.id === assistantId ? { ...m, content: evt.message.content } : m)),
                )
              }
            } catch {
              // ignore malformed lines
            }
          }
        }
      }
    } catch (err) {
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, content: "Network error. Please try again in a moment." } : m)),
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Toggle button */}
      <button
        aria-label="Open AI Assistant"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 rounded-full bg-red-600 px-4 py-3 text-white shadow-lg transition hover:bg-red-700"
      >
        {open ? "Close AI" : "Ask AI"}
      </button>

      {/* Panel */}
      <div
        className={`fixed bottom-20 right-5 z-50 w-[92vw] max-w-md transform overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl transition-all ${
          open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="AI Assistant"
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">Geotech AI Assistant</p>
            <p className="text-xs text-slate-500">Streaming via SSE</p>
          </div>
          <Button size="sm" variant="outline" onClick={() => setOpen(false)} className="border-red-500 text-red-600">
            Close
          </Button>
        </div>

        <div className="max-h-[50vh] space-y-3 overflow-y-auto p-4">
          {messages.map((m) => (
            <div key={m.id} className="text-sm">
              <span className={`mb-1 block text-xs ${m.role === "user" ? "text-red-600" : "text-sky-600"}`}>
                {m.role === "user" ? "You" : "AI"}
              </span>
              <p className="whitespace-pre-wrap text-slate-700">{m.content}</p>
            </div>
          ))}
          {isLoading && <p className="text-xs text-slate-500">Thinking…</p>}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2 border-t p-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about piling capacity, SPT, load tests…"
            aria-label="Message"
          />
          <Button className="bg-sky-600 text-white hover:bg-sky-700" type="submit" disabled={isLoading}>
            Send
          </Button>
        </form>
      </div>
    </>
  )
}
