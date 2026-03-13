'use client'

import { useState, useEffect } from 'react'
import { useStore } from '@/store/useStore'

// Generate department-specific data
function generateDepartmentData(department: string, size = 100000) {
  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Puducherry'
  ]

  const data = []
  for (let i = 0; i < size; i++) {
    const stateIndex = i % states.length
    const year = 2015 + Math.floor(Math.random() * 9)
    
    if (department === 'health') {
      data.push({
        id: i + 1,
        state: states[stateIndex],
        year: year,
        population: Math.floor(Math.random() * 100000000) + 1000000,
        healthIndex: Math.round((Math.random() * 40 + 50) * 10) / 10,
        hospitals: Math.floor(Math.random() * 500) + 50,
        doctors: Math.floor(Math.random() * 10000) + 1000,
        beds: Math.floor(Math.random() * 5000) + 500,
        vaccinationRate: Math.round((Math.random() * 30 + 60) * 10) / 10,
        infantMortality: Math.round((Math.random() * 50 + 10) * 10) / 10,
        maternalMortality: Math.floor(Math.random() * 200) + 50,
      })
    } else if (department === 'agriculture') {
      data.push({
        id: i + 1,
        state: states[stateIndex],
        year: year,
        population: Math.floor(Math.random() * 100000000) + 1000000,
        agricultureOutput: Math.floor(Math.random() * 500000) + 10000,
        cropYield: Math.round((Math.random() * 5 + 2) * 100) / 100,
        farmland: Math.floor(Math.random() * 1000000) + 100000,
        irrigationCoverage: Math.round((Math.random() * 60 + 30) * 10) / 10,
        fertilizerUse: Math.floor(Math.random() * 1000) + 100,
        tractorCount: Math.floor(Math.random() * 100000) + 10000,
        rainfall: Math.round((Math.random() * 1000 + 500) * 10) / 10,
        temperature: Math.round((Math.random() * 15 + 20) * 10) / 10,
      })
    } else if (department === 'education') {
      data.push({
        id: i + 1,
        state: states[stateIndex],
        year: year,
        population: Math.floor(Math.random() * 100000000) + 1000000,
        educationIndex: Math.round((Math.random() * 30 + 60) * 10) / 10,
        schools: Math.floor(Math.random() * 10000) + 1000,
        colleges: Math.floor(Math.random() * 500) + 50,
        universities: Math.floor(Math.random() * 50) + 5,
        literacyRate: Math.round((Math.random() * 30 + 60) * 10) / 10,
        enrollmentRate: Math.round((Math.random() * 40 + 50) * 10) / 10,
        dropoutRate: Math.round((Math.random() * 30 + 5) * 10) / 10,
        teacherStudentRatio: Math.round((Math.random() * 30 + 10) * 10) / 10,
      })
    }
  }
  
  return data
}

export function useSimpleData() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { department } = useStore()

  useEffect(() => {
    setLoading(true)
    // Simulate loading time
    const timer = setTimeout(() => {
      const largeData = generateDepartmentData(department, 100000)
      setData(largeData)
      setLoading(false)
    }, 2000) // 2 seconds loading

    return () => clearTimeout(timer)
  }, [department])

  return { data, loading }
}
