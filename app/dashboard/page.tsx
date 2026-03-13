'use client'

import { useEffect } from 'react'
import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { SimpleDataGrid } from '@/components/SimpleDataGrid'
import { SectionContent } from '@/components/SectionContent'
import { AIInsightPanel } from '@/components/AIInsightPanel'
import { CommandPalette } from '@/components/CommandPalette'
import { useStore } from '@/store/useStore'

export default function DashboardPage() {
  const { sidebarOpen, aiPanelOpen, commandPaletteOpen, setCommandPaletteOpen, activeSection } = useStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [setCommandPaletteOpen])

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <SimpleDataGrid />
      default:
        return <SectionContent section={activeSection} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} ${aiPanelOpen ? 'mr-96' : ''} bg-gray-100 dark:bg-gray-950`}>
          <div className="p-6">
            {activeSection === 'dashboard' ? (
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h1>
                <p className="text-gray-600 dark:text-white/70">Explore and analyze government datasets with AI-powered insights</p>
              </div>
            ) : null}
            
            {renderContent()}
          </div>
        </main>
        
        {aiPanelOpen && <AIInsightPanel />}
      </div>
      
      {commandPaletteOpen && <CommandPalette />}
    </div>
  )
}
