import { create } from 'zustand'

export type UserRole = 'admin' | 'viewer'
export type Department = 'health' | 'agriculture' | 'education'

interface DepartmentConfig {
  name: string
  theme: {
    primary: string
    secondary: string
  }
  icon: string
}

export const departmentConfigs: Record<Department, DepartmentConfig> = {
  health: {
    name: 'Ministry of Health',
    theme: {
      primary: 'rgb(34, 197, 94)',
      secondary: 'rgb(134, 239, 172)',
    },
    icon: '🏥',
  },
  agriculture: {
    name: 'Ministry of Agriculture',
    theme: {
      primary: 'rgb(251, 146, 60)',
      secondary: 'rgb(254, 215, 170)',
    },
    icon: '🌾',
  },
  education: {
    name: 'Ministry of Education',
    theme: {
      primary: 'rgb(59, 130, 246)',
      secondary: 'rgb(147, 197, 253)',
    },
    icon: '📚',
  },
}

interface AppState {
  // UI State
  sidebarOpen: boolean
  aiPanelOpen: boolean
  commandPaletteOpen: boolean
  darkMode: boolean
  
  // User State
  userRole: UserRole
  department: Department
  
  // Data State
  filters: Record<string, string>
  searchQuery: string
  
  // Navigation State
  activeSection: 'dashboard' | 'data-explorer' | 'analytics' | 'reports' | 'users' | 'security' | 'settings' | 'help'
  
  // Actions
  toggleSidebar: () => void
  toggleAIPanel: () => void
  setCommandPaletteOpen: (open: boolean) => void
  toggleDarkMode: () => void
  setUserRole: (role: 'admin' | 'viewer') => void
  setDepartment: (dept: 'health' | 'agriculture' | 'education') => void
  setFilters: (filters: Record<string, string>) => void
  clearFilters: () => void
  setSearchQuery: (query: string) => void
  setActiveSection: (section: 'dashboard' | 'data-explorer' | 'analytics' | 'reports' | 'users' | 'security' | 'settings' | 'help') => void
}

export const useStore = create<AppState>((set) => ({
  // UI State
  sidebarOpen: true,
  aiPanelOpen: false,
  commandPaletteOpen: false,
  darkMode: false,
  
  // User State
  userRole: 'admin',
  department: 'health',
  
  // Data State
  filters: {},
  searchQuery: '',
  
  // Navigation State
  activeSection: 'dashboard',
  
  // Actions
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleAIPanel: () => set((state) => ({ aiPanelOpen: !state.aiPanelOpen })),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setUserRole: (role) => set({ userRole: role }),
  setDepartment: (dept) => set({ department: dept }),
  setFilters: (filters) => set({ filters }),
  clearFilters: () => set({ filters: {} }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveSection: (section) => set({ activeSection: section }),
}))
