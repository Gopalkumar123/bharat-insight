import { Hero } from '@/components/Hero'
import { BentoGrid } from '@/components/BentoGrid'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Hero />
      
      <BentoGrid />
      
      {/* Authentication Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Get Started Today
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto">
            Join thousands of professionals using Bharat Insight for data-driven decision making.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/auth/login">
              <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all">
                Sign In
              </button>
            </Link>
            
            <Link href="/auth/signup">
              <button className="bg-white/10 backdrop-blur-lg text-white px-8 py-4 rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-all">
                Create Account
              </button>
            </Link>
          </div>
          
          <div className="mt-8 text-white/50 text-sm">
            Demo credentials available on login page
          </div>
        </div>
      </section>
      
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 to-slate-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Dashboard Preview
          </h2>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-5xl mx-auto">
            <div className="bg-slate-800 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-white/70 text-sm">bharat-insight.app/dashboard</div>
              </div>
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="bg-slate-700 rounded p-3">
                  <div className="text-white/50 text-xs mb-1">Total Records</div>
                  <div className="text-white font-bold">100,000+</div>
                </div>
                <div className="bg-slate-700 rounded p-3">
                  <div className="text-white/50 text-xs mb-1">Departments</div>
                  <div className="text-white font-bold">3</div>
                </div>
                <div className="bg-slate-700 rounded p-3">
                  <div className="text-white/50 text-xs mb-1">AI Insights</div>
                  <div className="text-white font-bold">24/7</div>
                </div>
                <div className="bg-slate-700 rounded p-3">
                  <div className="text-white/50 text-xs mb-1">Performance</div>
                  <div className="text-white font-bold">100ms</div>
                </div>
              </div>
              <div className="bg-slate-700 rounded p-4">
                <div className="flex space-x-4 mb-3">
                  <div className="h-2 bg-purple-500 rounded flex-1"></div>
                  <div className="h-2 bg-blue-500 rounded flex-1"></div>
                  <div className="h-2 bg-green-500 rounded flex-1"></div>
                </div>
                <div className="grid grid-cols-6 gap-2 text-xs text-white/70">
                  <div>State</div>
                  <div>Year</div>
                  <div>Population</div>
                  <div>Agriculture</div>
                  <div>Health</div>
                  <div>Actions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start Exploring Data
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Join thousands of analysts leveraging AI-powered insights for better decision making
          </p>
          <Link href="/dashboard">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all">
              Get Started Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
