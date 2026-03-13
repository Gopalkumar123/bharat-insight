'use client'

import { useState, useEffect } from 'react'
import { generateLargeDataset, DataRow } from '@/lib/largeDataset'

export function useLargeDataset() {
  const [data, setData] = useState<DataRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    const timer = setTimeout(() => {
      const generatedData = generateLargeDataset(100000)
      setData(generatedData)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return { data, loading }
}