'use client'

import { useState, useMemo } from 'react'
import { useStore } from '@/store/useStore'
import { useSimpleData } from '@/lib/workingData'

export function SimpleDataGrid() {
  const { userRole, filters, department: currentDepartment } = useStore()
  const { data, loading } = useSimpleData()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [editingId, setEditingId] = useState<number | null>(null)

  const itemsPerPage = 50

  const handleEdit = (id: number) => {
    console.log('Edit clicked for ID:', id)
    setEditingId(id)
    // Add edit logic here
  }

  const handleDelete = (id: number) => {
    console.log('Delete clicked for ID:', id)
    if (confirm('Are you sure you want to delete this record?')) {
      // Add delete logic here
      console.log('Record deleted:', id)
    }
  }

  // Always call useMemo, even during loading
  const filteredData = useMemo(() => {
    if (loading) return []
    
    let filtered = data.filter(item => {
      const matchesSearch = item.state.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = !filters.state || item.state.toLowerCase().includes(filters.state.toLowerCase())
      return matchesSearch && matchesFilter
    })

    // Pagination
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filtered.slice(startIndex, endIndex)
  }, [data, searchTerm, filters, currentPage, loading])

  const totalPages = useMemo(() => {
    if (loading) return 1
    return Math.ceil(data.length / itemsPerPage)
  }, [data, loading])

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading {currentDepartment} data...</p>
      </div>
    )
  }

  // Get columns based on department
  const getDepartmentColumns = () => {
    if (currentDepartment === 'health') {
      return [
        { key: 'state', label: 'State' },
        { key: 'year', label: 'Year' },
        { key: 'population', label: 'Population', format: (val: any) => val.toLocaleString() },
        { key: 'healthIndex', label: 'Health Index' },
        { key: 'hospitals', label: 'Hospitals', format: (val: any) => val.toLocaleString() },
        { key: 'doctors', label: 'Doctors', format: (val: any) => val.toLocaleString() },
        { key: 'beds', label: 'Beds', format: (val: any) => val.toLocaleString() },
        { key: 'vaccinationRate', label: 'Vaccination Rate (%)' },
        { key: 'infantMortality', label: 'Infant Mortality' },
      ]
    } else if (currentDepartment === 'agriculture') {
      return [
        { key: 'state', label: 'State' },
        { key: 'year', label: 'Year' },
        { key: 'population', label: 'Population', format: (val: any) => val.toLocaleString() },
        { key: 'agricultureOutput', label: 'Agriculture Output', format: (val: any) => val.toLocaleString() },
        { key: 'cropYield', label: 'Crop Yield (tons/ha)' },
        { key: 'farmland', label: 'Farmland (hectares)', format: (val: any) => val.toLocaleString() },
        { key: 'irrigationCoverage', label: 'Irrigation Coverage (%)' },
        { key: 'fertilizerUse', label: 'Fertilizer Use (tons)', format: (val: any) => val.toLocaleString() },
        { key: 'tractorCount', label: 'Tractor Count', format: (val: any) => val.toLocaleString() },
        { key: 'rainfall', label: 'Rainfall (mm)' },
      ]
    } else if (currentDepartment === 'education') {
      return [
        { key: 'state', label: 'State' },
        { key: 'year', label: 'Year' },
        { key: 'population', label: 'Population', format: (val: any) => val.toLocaleString() },
        { key: 'educationIndex', label: 'Education Index' },
        { key: 'schools', label: 'Schools', format: (val: any) => val.toLocaleString() },
        { key: 'colleges', label: 'Colleges', format: (val: any) => val.toLocaleString() },
        { key: 'universities', label: 'Universities', format: (val: any) => val.toLocaleString() },
        { key: 'literacyRate', label: 'Literacy Rate (%)' },
        { key: 'enrollmentRate', label: 'Enrollment Rate (%)' },
        { key: 'dropoutRate', label: 'Dropout Rate (%)' },
      ]
    }
    return []
  }

  const columns = getDepartmentColumns()

  return (
    <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
      {/* Search and Info */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search states..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
          />
          <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            Total Records: {data.length.toLocaleString()} | Showing: {filteredData.length}
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto border border-gray-200 dark:border-gray-600 rounded-lg">
        <table className="w-full bg-white dark:bg-gray-900">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="text-left p-3 text-gray-900 dark:text-white font-semibold border-r border-gray-200 dark:border-gray-600 last:border-r-0">
                  {col.label}
                </th>
              ))}
              {userRole === 'admin' && (
                <th className="text-left p-3 text-gray-900 dark:text-white font-semibold">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="p-3 text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600 last:border-r-0">
                    {col.format ? col.format(item[col.key] || 0) : (item[col.key] || 'N/A')}
                  </td>
                ))}
                {userRole === 'admin' && (
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(item.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors shadow-sm"
                      >
                        {editingId === item.id ? 'Editing...' : 'Edit'}
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors shadow-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 transition-colors border border-gray-300 dark:border-gray-600"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 transition-colors border border-gray-300 dark:border-gray-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
