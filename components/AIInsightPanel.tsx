'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, X, Loader2, Brain } from 'lucide-react'
import { useStore } from '@/store/useStore'

// Mock AI responses for testing
const mockResponses = {
  health: [
    "• Health data shows 15% improvement in rural healthcare access over the last 5 years\n• Urban centers have 2x better hospital infrastructure compared to rural areas\n• Southern states lead in health indices with Kerala topping at 74.5\n• Recommendation: Focus on rural healthcare infrastructure and telemedicine initiatives",
    "• Maternal mortality rate decreased by 23% since 2015\n• Doctor-to-patient ratio improved from 1:2500 to 1:1800\n• Government health schemes benefited over 50 million citizens\n• Recommendation: Increase medical college seats in underserved regions",
    "• Vaccination coverage reached 95% for routine immunization\n• Health insurance penetration increased to 35% of population\n• Private sector accounts for 70% of healthcare services\n• Recommendation: Strengthen public healthcare system for equitable access"
  ],
  agriculture: [
    "• Agricultural output grew by 4.2% annually despite climate challenges\n• Punjab and Haryana contribute 40% of national food grain production\n• Organic farming adoption increased by 300% in last 3 years\n• Recommendation: Invest in climate-resilient farming techniques",
    "• Irrigation coverage improved to 48% of cultivated land\n• Mechanization level reached 45% with 600,000+ tractors sold annually\n• Crop diversification reduced rice-wheat cycle dependency by 15%\n• Recommendation: Promote micro-irrigation and precision farming",
    "• Food grain production reached 305 million tonnes in 2022-23\n• Horticulture exports crossed $5 billion mark\n• Agricultural credit disbursed: ₹18 lakh crore to farmers\n• Recommendation: Strengthen cold chain infrastructure for perishable produce"
  ],
  education: [
    "• Literacy rate improved to 77.7% with female literacy at 70.3%\n• Gross enrollment ratio in higher education reached 27.1%\n• Digital education initiatives reached 250 million students\n• Recommendation: Focus on reducing gender gap in rural education",
    "• School dropout rate decreased by 40% at elementary level\n• Teacher-student ratio improved to 1:26 nationally\n• STEM enrollment increased by 35% in last 5 years\n• Recommendation: Enhance vocational training and skill development programs",
    "• National Education Policy 2020 implementation in 65% of states\n• Online learning platforms saw 300% growth during pandemic\n• Research output increased with 1,400+ new publications daily\n• Recommendation: Strengthen industry-academia collaboration for better outcomes"
  ]
}

export function AIInsightPanel() {
  const { aiPanelOpen, toggleAIPanel, filters, department } = useStore()
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [reasoning, setReasoning] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    console.log('AI Query submitted:', query)
    console.log('Current department:', department)

    setIsLoading(true)
    setIsThinking(true)
    setResponse('')
    setReasoning('')

    try {
      const filterContext = Object.keys(filters)
        .map(key => `${key}: ${filters[key]}`)
        .join(', ')

      // Simulate reasoning process
      const reasoningText = `Analyzing ${department} dataset with current filters: ${filterContext || 'none'}. Processing query about "${query}"...`
      setReasoning(reasoningText)
      console.log('Reasoning set:', reasoningText)
      
      setTimeout(() => {
        setIsThinking(false)
        setReasoning('')
        console.log('Thinking phase ended')
      }, 2000)

      // Get mock response based on department
      setTimeout(() => {
        console.log('Available departments:', Object.keys(mockResponses))
        console.log('Current department type:', typeof department)
        console.log('Department value:', department)
        
        let selectedResponse = 'Default response: This is a test response to verify the AI panel is working.'
        
        if (department && mockResponses[department as keyof typeof mockResponses]) {
          const responses = mockResponses[department as keyof typeof mockResponses]
          selectedResponse = responses[Math.floor(Math.random() * responses.length)]
          console.log('Department-specific response selected')
        } else {
          console.log('Using default response - department not found')
        }
        
        console.log('Final response to set:', selectedResponse)
        setResponse(selectedResponse)
        setIsLoading(false)
        console.log('Response set, loading ended')
      }, 3000)

    } catch (error) {
      console.error('AI Query Error:', error)
      setResponse('Sorry, I encountered an error. Please try again.')
      setIsLoading(false)
    }
  }

  if (!aiPanelOpen) return null

  return (
    <motion.aside
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      exit={{ x: 400 }}
      className="fixed right-0 top-16 h-full w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-lg z-40 flex flex-col"
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">AI Insights</h2>
          </div>
          <button
            onClick={toggleAIPanel}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
            <h3 className="text-gray-900 dark:text-white font-medium mb-2">Current Context</h3>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              <p>Department: {department}</p>
              {Object.keys(filters).length > 0 && (
                <p>Filters: {Object.keys(filters).map(k => `${k}: ${filters[k]}`).join(', ')}</p>
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isThinking && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border border-blue-200 dark:border-blue-700 mb-4"
            >
              <div className="flex items-start space-x-3">
                <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 animate-pulse" />
                <div className="flex-1">
                  <h3 className="text-gray-900 dark:text-white font-medium mb-2">AI Reasoning</h3>
                  <div className="text-gray-600 dark:text-gray-400 text-sm italic">
                    {reasoning}
                  </div>
                  <div className="flex items-center space-x-2 mt-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">Processing...</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 mb-4"
            >
              <h3 className="text-gray-900 dark:text-white font-medium mb-2">AI Analysis</h3>
              <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm">
                {response}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading && !isThinking && (
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-4">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Generating response...</span>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400 text-xs">Current Context</span>
              <span className="text-blue-600 dark:text-blue-400 text-xs font-medium">{department}</span>
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-xs">
              {Object.keys(filters).length > 0 
                ? `Filters: ${Object.keys(filters).map(k => `${k}: ${filters[k]}`).join(', ')}`
                : 'No active filters'
              }
            </div>
          </div>
          
          <div className="relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about the data... (e.g., 'What are the trends in population growth?')"
              className="w-full h-24 px-3 py-2 pr-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
              disabled={isLoading}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-2 top-2 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {query.length}/500 characters
            </div>
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>{isLoading ? 'Analyzing...' : 'Get Insights'}</span>
            </button>
          </div>
        </form>
      </div>
    </motion.aside>
  )
}
