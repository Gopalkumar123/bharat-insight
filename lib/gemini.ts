import { GoogleGenerativeAI } from '@google/generative-ai'

// Check if API key is available
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY

export function isGeminiConfigured(): boolean {
  return !!(API_KEY && API_KEY !== 'your-gemini-api-key-here' && API_KEY !== 'your-api-key-here')
}

export async function generateAIInsight(prompt: string): Promise<string> {
  console.log('Gemini API Key:', API_KEY ? 'Present' : 'Missing')
  console.log('Is Configured:', isGeminiConfigured())
  
  if (!isGeminiConfigured()) {
    return `⚠️ Gemini AI Not Configured

API Key Status: ${API_KEY ? 'Present but invalid' : 'Missing'}

To enable real AI responses:

1. Get your free Gemini API key from: https://makersuite.google.com/app/apikey
2. Update .env.local file with:
   NEXT_PUBLIC_GEMINI_API_KEY=your-actual-api-key-here
3. Restart the development server

Current Query: ${prompt}

Mock Response (for demo):
• Health data shows 15% improvement in rural areas
• Urban centers have 2x better healthcare access
• Recommendation: Focus on rural healthcare infrastructure`
  }

  try {
    console.log('Initializing Gemini AI...')
    const genAI = new GoogleGenerativeAI(API_KEY!)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    
    const enhancedPrompt = `
    You are an AI assistant analyzing Indian government data. 
    Provide concise, data-driven insights in bullet points.
    Focus on trends, patterns, and actionable insights.
    
    User Query: ${prompt}
    
    Response format:
    • Key insight 1
    • Key insight 2  
    • Key insight 3
    • Recommendation
    `

    console.log('Generating content...')
    const result = await model.generateContent(enhancedPrompt)
    const response = await result.response
    console.log('Response received:', response.text())
    return response.text()
  } catch (error) {
    console.error('Gemini API Error:', error)
    return `AI Error: ${error instanceof Error ? error.message : 'Unknown error'}`
  }
}

export async function* streamAIInsight(prompt: string): AsyncGenerator<string> {
  if (!isGeminiConfigured()) {
    const mockResponse = `⚠️ Gemini AI Not Configured

To enable real AI responses:

1. Get your free Gemini API key from: https://makersuite.google.com/app/apikey
2. Create a .env.local file with:
   NEXT_PUBLIC_GEMINI_API_KEY=your-actual-api-key-here
3. Restart the development server

Current Query: ${prompt}

Mock Response (for demo):
• Health data shows 15% improvement in rural areas
• Urban centers have 2x better healthcare access
• Recommendation: Focus on rural healthcare infrastructure`

    // Stream the mock response character by character
    for (const char of mockResponse) {
      yield char
      await new Promise(resolve => setTimeout(resolve, 20))
    }
    return
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY!)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    
    const enhancedPrompt = `
    You are an AI assistant analyzing Indian government data. 
    Provide concise, data-driven insights in bullet points.
    Focus on trends, patterns, and actionable insights.
    
    User Query: ${prompt}
    
    Response format:
    • Key insight 1
    • Key insight 2  
    • Key insight 3
    • Recommendation
    `

    const result = await model.generateContentStream(enhancedPrompt)
    
    for await (const chunk of result.stream) {
      const chunkText = chunk.text()
      if (chunkText) {
        yield chunkText
      }
    }
  } catch (error) {
    console.error('Gemini Streaming Error:', error)
    yield 'AI service temporarily unavailable. Please try again.'
  }
}
