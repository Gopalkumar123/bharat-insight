export function SkeletonLoader() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
    </div>
  )
}

export function TableSkeletonLoader() {
  return (
    <div className="space-y-2">
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-shimmer"></div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-shimmer" style={{ animationDelay: `${i * 0.1}s` }}></div>
      ))}
    </div>
  )
}

export function CardSkeletonLoader() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  )
}

export function DataGridSkeletonLoader() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-64 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-shimmer"></div>
            <div className="w-32 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-shimmer"></div>
          </div>
          <div className="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-shimmer"></div>
        </div>
      </div>
      
      <div className="h-[600px] overflow-auto">
        <div className="space-y-1">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="flex space-x-4 p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-shimmer"></div>
              <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-shimmer"></div>
              <div className="w-40 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-shimmer"></div>
              <div className="w-36 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-shimmer"></div>
              <div className="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-shimmer"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
