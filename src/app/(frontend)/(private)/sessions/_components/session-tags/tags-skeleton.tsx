import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const TagsSkeleton = () => {
  return (
    <div className="flex overflow-x-auto scrollbar-hide">
      {[...Array(5)].map((_, index) => (
        <Skeleton
          key={index}
          className="h-6 w-32 rounded-full mr-2 shrink-0"
        />
      ))}
    </div>
  )
}

export default TagsSkeleton
