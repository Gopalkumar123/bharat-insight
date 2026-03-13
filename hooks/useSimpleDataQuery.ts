'use client'

import { useState, useEffect } from 'react'
import { useStore } from '@/store/useStore'
import { generateLargeDataset, type DataRow } from '@/lib/simpleDataset'

export function useDataQuery() {
  const { department, filters, searchQuery } = useStore()
  const [data, setData] = useState<DataRow[]>([])
  const [loading, setLoading] = useState(true)

  const processData = () => {
    setLoading(true)
    
    // Generate dataset
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

    setData(filteredData)
    setLoading(false)
  }

  useEffect(() => {
    processData()
  }, [department, filters, searchQuery])

  return {
    data,
    loading,
    refetch: processData,
  }
}

export function useStatsQuery() {
  const { department } = useStore()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    // Mock stats data
    const stats = {
      totalRecords: 100000,
      activeUsers: 247,
      avgResponseTime: '1.2s',
      dataFreshness: '2 hours ago',
    }
    
    setTimeout(() => {
      setData(stats)
      setLoading(false)
    }, 500)
  }, [department])

  return { data, loading }
}

export function useDepartmentStats() {
  const { department } = useStore()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
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
    
    setTimeout(() => {
      setData(stats[department] || stats.health)
      setLoading(false)
    }, 500)
  }, [department])

  return { data, loading }
}
