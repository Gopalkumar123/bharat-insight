import { NextRequest, NextResponse } from 'next/server'
import { streamAIInsight } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const { query, department, filters } = await request.json()
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }

    // Create enhanced prompt with context
    const filterContext = Object.keys(filters || {})
      .map(key => `${key}: ${filters[key]}`)
      .join(', ')

    const enhancedPrompt = `
      Analyze ${department} dataset with current filters: ${filterContext || 'none'}.
      User question: ${query}
      
      Provide insights in bullet points focusing on:
      - Key trends and patterns
      - Notable outliers or anomalies  
      - Actionable recommendations
    `

    // Stream the response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamAIInsight(enhancedPrompt)) {
            const encoder = new TextEncoder()
            controller.enqueue(encoder.encode(chunk))
          }
          controller.close()
        } catch (error) {
          console.error('Streaming error:', error)
          const encoder = new TextEncoder()
          controller.enqueue(encoder.encode('Sorry, I encountered an error. Please try again.'))
          controller.close()
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process AI request' },
      { status: 500 }
    )
  }
}
