'use client'

import { useQuery } from '@tanstack/react-query'
import { useStore } from '@/store/useStore'
import { generateLargeDataset, type DataRow } from '@/lib/largeDataset'

export function useDataQuery() {
  const { department, filters, searchQuery } = useStore()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['dataset', department, filters, searchQuery],
    queryFn: () => {
      // Generate dataset client-side to avoid serialization issues
      const fullDataset = generateLargeDataset(100000)
      
      // Apply filters
      let filteredData = fullDataset.filter((item: DataRow) => {
        // Department-specific filtering
        if (department === 'health') {
          return item.healthIndex !== undefined
        } else if (department === 'agriculture') {
          return item.agricultureOutput !== undefined
        } else if (department === 'education') {
          return item.educationIndex !== undefined
        }
        return true
      })

      // Apply search filters
      Object.keys(filters).forEach(key => {
        const value = filters[key]
        if (value) {
          filteredData = filteredData.filter((item: DataRow) => 
            String(item[key as keyof DataRow]).toLowerCase().includes(value.toLowerCase())
          )
        }
      })

      return filteredData
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  })

  return {
    data: data || [],
    isLoading,
    error,
    refetch,
  }
}

export function useStatsQuery() {
  const { department } = useStore()

  return useQuery({
    queryKey: ['stats', department],
    queryFn: () => {
      // Mock stats data
      return {
        totalRecords: 100000,
        activeUsers: 247,
        avgResponseTime: '1.2s',
        dataFreshness: '2 hours ago',
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useDepartmentStats() {
  const { department } = useStore()

  return useQuery({
    queryKey: ['department-stats', department],
    queryFn: () => {
      // Mock department-specific stats
      const stats = {
        health: {
          totalRecords: 45000,
          avgHealthIndex: 68.5,
          statesCovered: 29,
          lastUpdated: '2024-01-15',
        },
        agriculture: {
          totalRecords: 35000,
          avgOutput: 125000,
          statesCovered: 29,
          lastUpdated: '2024-01-14',
        },
        education: {
          totalRecords: 20000,
          avgIndex: 72.3,
          statesCovered: 29,
          lastUpdated: '2024-01-13',
        },
      }
      
      return stats[department] || stats.health
    },
    staleTime: 5 * 60 * 1000,
  })
}
