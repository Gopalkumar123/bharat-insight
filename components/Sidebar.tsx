'use client'

import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Database, 
  Settings, 
  Users, 
  FileText, 
  TrendingUp,
  Shield,
  HelpCircle
} from 'lucide-react'
import { useStore } from '@/store/useStore'
import Link from 'next/link'

const menuItems = [
  { icon: BarChart3, label: 'Dashboard', href: '/dashboard' },
  { icon: Database, label: 'Data Explorer', href: '/dashboard' },
  { icon: TrendingUp, label: 'Analytics', href: '/dashboard' },
  { icon: FileText, label: 'Reports', href: '/dashboard' },
  { icon: Users, label: 'Users', href: '/dashboard', adminOnly: true },
  { icon: Shield, label: 'Security', href: '/dashboard', adminOnly: true },
  { icon: Settings, label: 'Settings', href: '/dashboard' },
  { icon: HelpCircle, label: 'Help', href: '/dashboard' },
]

export function Sidebar() {
  const { sidebarOpen, userRole, setActiveSection } = useStore()

  if (!sidebarOpen) return null

  const handleMenuClick = (label: string) => {
    console.log(`Clicked: ${label}`)
    // Map menu labels to section names
    const sectionMap: Record<string, any> = {
      'Dashboard': 'dashboard',
      'Data Explorer': 'data-explorer',
      'Analytics': 'analytics',
      'Reports': 'reports',
      'Users': 'users',
      'Security': 'security',
      'Settings': 'settings',
      'Help': 'help'
    }
    setActiveSection(sectionMap[label] || 'dashboard')
  }

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      className="fixed left-0 top-16 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg z-40 flex flex-col"
    >
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            if (item.adminOnly && userRole !== 'admin') return null
            
            return (
              <div key={item.label}>
                <motion.button
                  onClick={() => handleMenuClick(item.label)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                    index === 0 
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              </div>
            )
          })}
        </nav>

        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Total Records</span>
              <span className="text-gray-900 dark:text-white font-medium">100,000+</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Active Users</span>
              <span className="text-gray-900 dark:text-white font-medium">247</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">AI Queries</span>
              <span className="text-gray-900 dark:text-white font-medium">1,842</span>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}
