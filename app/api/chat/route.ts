import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const messages = body?.messages ?? []

    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        "AI is not configured. Add OPENAI_API_KEY in Project Settings to enable the Geotech AI assistant.",
        { status: 500 },
      )
    }

    const result = await streamText({
      model: openai("gpt-4o-mini"),
      system:
        "You are a civil/geotechnical engineering expert for piling and soil testing. Be concise, practical, and safe. If asked for cost, give ballpark ranges with disclaimers.",
      messages,
    })

    return result.toDataStreamResponse()
  } catch (err) {
    return new Response("AI request failed.", { status: 500 })
  }
}
