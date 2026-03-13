'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useStore, departmentConfigs, type Department } from '@/store/useStore'

export function DepartmentSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const { department, setDepartment, userRole, setUserRole } = useStore()
  const currentConfig = departmentConfigs[department]

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
      >
        <span className="text-lg">{currentConfig.icon}</span>
        <span className="text-gray-900 dark:text-white text-sm font-medium">{currentConfig.name}</span>
        <ChevronDown className={`w-4 h-4 text-gray-700 dark:text-white/70 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-black/90 backdrop-blur-lg border border-gray-200 dark:border-white/20 rounded-lg shadow-lg z-[100]">
          <div className="py-2">
            {Object.keys(departmentConfigs).map((key) => {
              const config = departmentConfigs[key as Department]
              return (
              <button
                key={key}
                onClick={() => {
                  setDepartment(key as Department)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors ${
                  department === key ? 'bg-gray-100 dark:bg-white/20' : ''
                }`}
              >
                <span className="text-lg">{config.icon}</span>
                <div className="text-left">
                  <div className="text-gray-900 dark:text-white text-sm font-medium">{config.name}</div>
                  <div className="text-gray-600 dark:text-white/50 text-xs">View {config.name.toLowerCase()} data</div>
                </div>
              </button>
              )
            })}
          </div>
          
          <div className="border-t border-gray-200 dark:border-white/20 p-2">
            <div className="text-xs text-gray-600 dark:text-white/50 mb-2">Role Access</div>
            <div className="flex space-x-2">
              <button
                onClick={() => setUserRole('viewer')}
                className={`flex-1 px-2 py-1 text-xs rounded transition-colors ${
                  userRole === 'viewer' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20'
                }`}
              >
                Viewer
              </button>
              <button
                onClick={() => setUserRole('admin')}
                className={`flex-1 px-2 py-1 text-xs rounded transition-colors ${
                  userRole === 'admin' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20'
                }`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
