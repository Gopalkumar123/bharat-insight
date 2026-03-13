'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Command } from 'cmdk'
import { 
  Search, 
  BarChart3, 
  Database, 
  Settings, 
  Users, 
  Brain,
  Filter,
  ArrowRight,
  X
} from 'lucide-react'
import { useStore, departmentConfigs, type Department } from '@/store/useStore'

interface CommandItem {
  id: string
  title: string
  description?: string
  icon: any
  action: () => void
  category: 'navigation' | 'department' | 'action'
}

export function CommandPalette() {
  const { 
    commandPaletteOpen, 
    setCommandPaletteOpen, 
    setDepartment, 
    toggleAIPanel, 
    clearFilters,
    setActiveSection,
    department 
  } = useStore()
  
  const [search, setSearch] = useState('')

  const commands: CommandItem[] = [
    {
      id: 'dashboard',
      title: 'Go to Dashboard',
      description: 'Navigate to the main dashboard',
      icon: BarChart3,
      action: () => {
        setActiveSection('dashboard')
        setCommandPaletteOpen(false)
      },
      category: 'navigation',
    },
    {
      id: 'data-explorer',
      title: 'Go to Data Explorer',
      description: 'Navigate to data explorer section',
      icon: Database,
      action: () => {
        setActiveSection('data-explorer')
        setCommandPaletteOpen(false)
      },
      category: 'navigation',
    },
    {
      id: 'analytics',
      title: 'Go to Analytics',
      description: 'Navigate to analytics section',
      icon: BarChart3,
      action: () => {
        setActiveSection('analytics')
        setCommandPaletteOpen(false)
      },
      category: 'navigation',
    },
    {
      id: 'reports',
      title: 'Go to Reports',
      description: 'Navigate to reports section',
      icon: Database,
      action: () => {
        setActiveSection('reports')
        setCommandPaletteOpen(false)
      },
      category: 'navigation',
    },
    {
      id: 'users',
      title: 'Go to Users',
      description: 'Navigate to user management',
      icon: Users,
      action: () => {
        setActiveSection('users')
        setCommandPaletteOpen(false)
      },
      category: 'navigation',
    },
    {
      id: 'security',
      title: 'Go to Security',
      description: 'Navigate to security settings',
      icon: Settings,
      action: () => {
        setActiveSection('security')
        setCommandPaletteOpen(false)
      },
      category: 'navigation',
    },
    {
      id: 'settings',
      title: 'Go to Settings',
      description: 'Navigate to settings',
      icon: Settings,
      action: () => {
        setActiveSection('settings')
        setCommandPaletteOpen(false)
      },
      category: 'navigation',
    },
    {
      id: 'help',
      title: 'Go to Help',
      description: 'Navigate to help section',
      icon: Settings,
      action: () => {
        setActiveSection('help')
        setCommandPaletteOpen(false)
      },
      category: 'navigation',
    },
    {
      id: 'ai-panel',
      title: 'Open AI Panel',
      description: 'Toggle AI insights panel',
      icon: Brain,
      action: () => {
        toggleAIPanel()
        setCommandPaletteOpen(false)
      },
      category: 'action',
    },
    {
      id: 'clear-filters',
      title: 'Clear Filters',
      description: 'Remove all active filters',
      icon: Filter,
      action: () => {
        clearFilters()
        setCommandPaletteOpen(false)
      },
      category: 'action',
    },
    {
      id: 'data-explorer',
      title: 'Open Data Explorer',
      description: 'Browse and filter datasets',
      icon: Database,
      action: () => {
        setCommandPaletteOpen(false)
      },
      category: 'navigation',
    },
    {
      id: 'ai-panel',
      title: 'Open AI Panel',
      description: 'Get AI-powered insights',
      icon: Brain,
      action: () => {
        toggleAIPanel()
        setCommandPaletteOpen(false)
      },
      category: 'action',
    },
    {
      id: 'clear-filters',
      title: 'Clear Filters',
      description: 'Reset all active filters',
      icon: Filter,
      action: () => {
        clearFilters()
        setCommandPaletteOpen(false)
      },
      category: 'action',
    },
    ...Object.keys(departmentConfigs).map((key) => {
      const config = departmentConfigs[key as Department]
      return ({
      id: `dept-${key}`,
      title: `Switch to ${config.name}`,
      description: `View ${config.name.toLowerCase()} data`,
      icon: () => <span className="text-lg">{config.icon}</span>,
      action: () => {
        setDepartment(key as Department)
        setCommandPaletteOpen(false)
      },
      category: 'department' as const,
    })
    }),
  ]

  const filteredCommands = commands.filter(command =>
    command.title.toLowerCase().includes(search.toLowerCase()) ||
    command.description?.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false)
      }
    }

    if (commandPaletteOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [commandPaletteOpen, setCommandPaletteOpen])

  if (!commandPaletteOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh]"
        onClick={() => setCommandPaletteOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.95, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: -20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl mx-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="p-4 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <Search className="w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-white/50 outline-none"
                autoFocus
              />
              <button
                onClick={() => setCommandPaletteOpen(false)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white/50" />
              </button>
            </div>
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            <Command className="p-2">
              <Command.Empty className="text-white/50 text-center py-4">
                No commands found.
              </Command.Empty>

              {['navigation', 'department', 'action'].map(category => {
                const categoryCommands = filteredCommands.filter(cmd => cmd.category === category)
                if (categoryCommands.length === 0) return null

                return (
                  <div key={category} className="mb-4">
                    <div className="text-white/50 text-xs font-medium mb-2 px-2 uppercase tracking-wider">
                      {category}
                    </div>
                    {categoryCommands.map(command => (
                      <Command.Item
                        key={command.id}
                        onSelect={command.action}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <command.icon className="w-5 h-5" />
                        <div className="flex-1">
                          <div className="text-white">{command.title}</div>
                          {command.description && (
                            <div className="text-white/50 text-sm">{command.description}</div>
                          )}
                        </div>
                      </Command.Item>
                    ))}
                  </div>
                )
              })}
            </Command>
          </div>

          <div className="p-2 border-t border-white/20">
            <div className="flex items-center justify-between text-xs text-white/50">
              <div className="flex items-center space-x-4">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>Powered by</span>
                <Brain className="w-3 h-3" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
