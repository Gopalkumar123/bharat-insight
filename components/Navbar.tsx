'use client'

import { motion } from 'framer-motion'
import { Search, Command, User, Settings } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { DepartmentSwitcher } from './DepartmentSwitcher'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  const { userRole, toggleAIPanel, setCommandPaletteOpen, setActiveSection } = useStore()

  const handleSettingsClick = () => {
    setActiveSection('settings')
    console.log('Settings clicked - navigating to settings section')
  }

  const handleSearchClick = () => {
    setCommandPaletteOpen(true)
    console.log('Search clicked - opening command palette')
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/10 dark:bg-black/10 backdrop-blur-lg border-b border-white/20 dark:border-gray-800/20 sticky top-0 z-50"
    >
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Bharat Insight</h1>
            <DepartmentSwitcher />
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
            >
              <Command className="w-4 h-4 text-gray-700 dark:text-white/70" />
              <span className="text-gray-700 dark:text-white/70 text-sm">Cmd+K</span>
            </button>

            <button 
              onClick={handleSearchClick}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              <Search className="w-5 h-5 text-gray-700 dark:text-white/70" />
            </button>

            <button
              onClick={toggleAIPanel}
              className="px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-medium hover:shadow-lg transition-all"
            >
              AI Insights
            </button>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="text-gray-900 dark:text-white text-sm font-medium">Admin User</div>
                <div className="text-gray-500 dark:text-white/50 text-xs capitalize">{userRole}</div>
              </div>
            </div>

            <button 
              onClick={handleSettingsClick}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-700 dark:text-white/70" />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
