'use client'

import { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel, 
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import Fuse from 'fuse.js'
import { Search, Filter, ArrowUpDown, Edit, Trash2 } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { useLargeDataset, type DataRow } from '@/lib/simpleDataset'

export function DataGrid() {
  const { userRole, filters, searchQuery, setFilters, clearFilters } = useStore()
  const { data: dataset, loading } = useLargeDataset()
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo<ColumnDef<DataRow>[]>(() => [
    {
      accessorKey: 'state',
      header: 'State',
      cell: ({ row }) => (
        <div className="font-medium text-gray-900 dark:text-white min-w-[120px]">{row.getValue('state')}</div>
      ),
    },
    {
      accessorKey: 'year',
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="flex items-center space-x-1 text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
        >
          <span>Year</span>
          <ArrowUpDown className="w-4 h-4" />
        </button>
      ),
      cell: ({ row }) => <div className="text-gray-700 dark:text-gray-300 min-w-[80px]">{row.getValue('year')}</div>,
    },
    {
      accessorKey: 'population',
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="flex items-center space-x-1 text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
        >
          <span>Population</span>
          <ArrowUpDown className="w-4 h-4" />
        </button>
      ),
      cell: ({ row }) => (
        <div className="text-gray-700 dark:text-gray-300 min-w-[100px]">
          {parseInt(row.getValue('population')).toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: 'agricultureOutput',
      header: 'Agriculture Output',
      cell: ({ row }) => (
        <div className="text-gray-700 dark:text-gray-300 min-w-[100px]">
          {parseInt(row.getValue('agricultureOutput')).toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: 'healthIndex',
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="flex items-center space-x-1 text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
        >
          <span>Health Index</span>
          <ArrowUpDown className="w-4 h-4" />
        </button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <div className="text-gray-700 dark:text-gray-300">{row.getValue('healthIndex')}</div>
          <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-600"
              style={{ width: `${row.getValue('healthIndex')}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'educationIndex',
      header: 'Education Index',
      cell: ({ row }) => (
        <div className="text-gray-700 dark:text-gray-300 min-w-[100px]">
          {row.getValue('educationIndex')}
        </div>
      ),
    },
    {
      accessorKey: 'infrastructure',
      header: 'Infrastructure',
      cell: ({ row }) => (
        <div className="text-gray-700 dark:text-gray-300 min-w-[100px]">
          {parseInt(row.getValue('infrastructure')).toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: 'employmentRate',
      header: 'Employment Rate',
      cell: ({ row }) => (
        <div className="text-gray-700 dark:text-gray-300 min-w-[100px]">
          {row.getValue('employmentRate')}%
        </div>
      ),
    },
    {
      accessorKey: 'gdpGrowth',
      header: 'GDP Growth',
      cell: ({ row }) => (
        <div className="text-gray-700 dark:text-gray-300 min-w-[100px]">
          {row.getValue('gdpGrowth')}%
        </div>
      ),
    },
    ...(userRole === 'admin' ? [
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }: { row: any }) => (
          <div className="flex items-center space-x-2">
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded transition-colors">
              <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded transition-colors">
              <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
            </button>
          </div>
        ),
      },
    ] : []),
  ], [userRole])

  const fuse = useMemo(() => new Fuse(dataset, {
    keys: ['state', 'year'],
    threshold: 0.3,
  }), [])

  const filteredData = useMemo(() => {
    let data = dataset

    // Apply global search first
    if (globalFilter) {
      const results = fuse.search(globalFilter)
      data = results.map(result => result.item)
    }

    // Then apply column filters
    Object.keys(filters).forEach((key) => {
      const value = filters[key]
      if (value) {
        data = data.filter((item: DataRow) => 
          String(item[key as keyof DataRow]).toLowerCase().includes(value.toLowerCase())
        )
      }
    })

    return data
  }, [globalFilter, filters, fuse])

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const [tableContainerRef, setTableContainerRef] = useState<HTMLDivElement | null>(null)
  const rows = table.getRowModel().rows

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef,
    estimateSize: () => 50,
    overscan: 10,
  })

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading 100,000 records...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-white/50" />
              <input
                type="text"
                placeholder="Search states, years..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 w-64"
              />
            </div>
            
            <button 
              onClick={() => {
                setGlobalFilter('')
                clearFilters()
              }}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Filter className="w-4 h-4" />
              <span>Clear Filters</span>
            </button>
          </div>

          <div className="text-gray-700 dark:text-white/70 text-sm">
            {filteredData.length} of {dataset.length} records
          </div>
        </div>
      </div>

      <div 
        ref={setTableContainerRef}
        className="h-[600px] overflow-auto"
      >
        <table className="w-full">
          <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 z-10">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white" style={{ width: header.getSize() }}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-3 text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600 last:border-r-0">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </>
      )}
    </div>
  )
}
