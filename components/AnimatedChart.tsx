'use client'

import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useEffect, useState } from 'react'

const generateData = () => [
  { name: 'Jan', value: 4000, growth: 2400 },
  { name: 'Feb', value: 3000, growth: 1398 },
  { name: 'Mar', value: 2000, growth: 9800 },
  { name: 'Apr', value: 2780, growth: 3908 },
  { name: 'May', value: 1890, growth: 4800 },
  { name: 'Jun', value: 2390, growth: 3800 },
  { name: 'Jul', value: 3490, growth: 4300 },
]

export function AnimatedChart() {
  const [data, setData] = useState(generateData())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setData(generateData().map(item => ({
        ...item,
        value: item.value + Math.random() * 1000 - 500,
        growth: item.growth + Math.random() * 1000 - 500,
      })))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
    >
      <h3 className="text-white font-semibold mb-4">Live Data Stream</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
          <YAxis stroke="rgba(255,255,255,0.5)" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(0,0,0,0.8)', 
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#8b5cf6" 
            strokeWidth={2}
            dot={false}
            animationDuration={1000}
          />
          <Line 
            type="monotone" 
            dataKey="growth" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={false}
            animationDuration={1200}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
