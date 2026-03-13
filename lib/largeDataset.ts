import { useState, useEffect } from 'react'

export interface DataRow {
  id: number
  state: string
  year: number
  population: number
  agricultureOutput: number
  healthIndex: number
  educationIndex: number
  infrastructure: number
  employmentRate: number
  gdpGrowth: number
}

export function generateLargeDataset(size = 100000): DataRow[] {
  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Puducherry'
  ]

  const data: DataRow[] = []
  for (let i = 0; i < size; i++) {
    const stateIndex = i % states.length
    const year = 2015 + Math.floor(Math.random() * 9)
    
    data.push({
      id: i + 1,
      state: states[stateIndex],
      year: year,
      population: Math.floor(Math.random() * 100000000) + 1000000,
      agricultureOutput: Math.floor(Math.random() * 500000) + 10000,
      healthIndex: Math.round((Math.random() * 40 + 50) * 10) / 10,
      educationIndex: Math.round((Math.random() * 30 + 60) * 10) / 10,
      infrastructure: Math.floor(Math.random() * 1000) + 100,
      employmentRate: Math.round((Math.random() * 30 + 60) * 10) / 10,
      gdpGrowth: Math.round((Math.random() * 10 + 2) * 100) / 100
    })
  }
  
  return data
}

export function useLargeDataset() {
  const [data, setData] = useState<DataRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    // Simulate loading time
    const timer = setTimeout(() => {
      const generatedData = generateLargeDataset(100000)
      setData(generatedData)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return { data, loading }
}
