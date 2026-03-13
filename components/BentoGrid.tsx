'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain, Building, Database, Filter, TrendingUp, Users } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI Insights',
    description: 'Get intelligent analysis and predictions powered by Google Gemini AI',
    gradient: 'from-purple-600 to-blue-600',
  },
  {
    icon: Building,
    title: 'Multi-Tenant Departments',
    description: 'Switch between Health, Agriculture, and Education ministries seamlessly',
    gradient: 'from-green-600 to-teal-600',
  },
  {
    icon: Database,
    title: '100k+ Row Performance',
    description: 'Lightning-fast virtualization handles massive datasets with ease',
    gradient: 'from-orange-600 to-red-600',
  },
  {
    icon: Filter,
    title: 'Smart Filters & Search',
    description: 'Fuzzy search and advanced filtering for quick data discovery',
    gradient: 'from-blue-600 to-indigo-600',
  },
  {
    icon: TrendingUp,
    title: 'Real-time Analytics',
    description: 'Live data streaming and real-time dashboard updates',
    gradient: 'from-pink-600 to-purple-600',
  },
  {
    icon: Users,
    title: 'Role-Based Access',
    description: 'Admin and viewer roles with appropriate permissions',
    gradient: 'from-teal-600 to-green-600',
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="relative group"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
      <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 h-full">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4`}>
          <feature.icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
        <p className="text-white/70">{feature.description}</p>
      </div>
    </motion.div>
  )
}

export function BentoGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Platform Features
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            Powerful tools and insights for modern data analysis
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
