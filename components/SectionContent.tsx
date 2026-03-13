'use client'

import { Database, TrendingUp, FileText, Users, Shield, Settings, HelpCircle, BarChart3 } from 'lucide-react'

interface SectionContentProps {
  section: string
}

export function SectionContent({ section }: SectionContentProps) {
  const renderContent = () => {
    switch (section) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Dashboard Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                  <div className="text-blue-600 dark:text-blue-400 text-sm font-medium">Total Records</div>
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">100,000+</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-700">
                  <div className="text-green-600 dark:text-green-400 text-sm font-medium">Active Users</div>
                  <div className="text-2xl font-bold text-green-900 dark:text-green-100">247</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                  <div className="text-purple-600 dark:text-purple-400 text-sm font-medium">AI Queries</div>
                  <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">1,842</div>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'data-explorer':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Explorer</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Available Datasets</h3>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Health Records (2015-2023)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Agricultural Statistics (2015-2023)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span>Education Metrics (2015-2023)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      <span>Population Demographics (2015-2023)</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">Data Quality</h3>
                  <div className="space-y-3 text-blue-700 dark:text-blue-300">
                    <div className="flex justify-between">
                      <span>Completeness:</span>
                      <span className="font-medium">98.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accuracy:</span>
                      <span className="font-medium">99.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Timeliness:</span>
                      <span className="font-medium">Real-time</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Trend Analysis</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Health Index</span>
                      <span className="text-green-600 dark:text-green-400 font-medium">+15% growth</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Agriculture Output</span>
                      <span className="text-green-600 dark:text-green-400 font-medium">+4.2% YoY</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Education Rate</span>
                      <span className="text-green-600 dark:text-green-400 font-medium">+8.3% improvement</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Key Insights</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span className="text-gray-600 dark:text-gray-400">Southern states lead in health metrics</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                      <span className="text-gray-600 dark:text-gray-400">Rural-urban gap narrowing</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2"></span>
                      <span className="text-gray-600 dark:text-gray-400">Digital adoption accelerating</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'reports':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h2>
              </div>
              <div className="space-y-4">
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Annual Report 2023</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Comprehensive analysis of government initiatives</p>
                  <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">Download PDF</button>
                </div>
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Health Sector Review</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Quarterly performance metrics</p>
                  <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">Download PDF</button>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'users':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Active Users</h3>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">247</div>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p>• Admin Users: 12</p>
                    <p>• Viewers: 235</p>
                    <p>• New this month: 18</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'security':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-red-600 dark:text-red-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Security</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-700">
                  <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Security Status</h3>
                  <p className="text-green-700 dark:text-green-300">All systems operational</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Recent Activity</h3>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p>• Last login: 2 hours ago</p>
                    <p>• Failed attempts: 0</p>
                    <p>• Active sessions: 3</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Settings className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Preferences</h3>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
                      <div className="relative">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </div>
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-gray-700 dark:text-gray-300">Notifications</span>
                      <div className="relative">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </div>
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-gray-700 dark:text-gray-300">Auto-refresh</span>
                      <div className="relative">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Account Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                      <input 
                        type="email" 
                        defaultValue="admin@bharatinsight.gov.in"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-2">Role</label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                        <option>Administrator</option>
                        <option>Viewer</option>
                        <option>Analyst</option>
                      </select>
                    </div>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'help':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Help & Support</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
                  <div className="space-y-3">
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline block">User Guide</a>
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline block">API Documentation</a>
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline block">Contact Support</a>
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline block">FAQ</a>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Support Resources</h3>
                  <div className="space-y-3 text-gray-600 dark:text-gray-400">
                    <p>• 24/7 Email Support</p>
                    <p>• Live Chat Available</p>
                    <p>• Video Tutorials</p>
                    <p>• Community Forum</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      default:
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Section Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400">The requested section is not available.</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen">
      {renderContent()}
    </div>
  )
}
