import React from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const SessionSkeleton = () => (
  <Card className="overflow-hidden">
    <CardContent className="p-4">
      <div className="flex flex-wrap justify-between items-start mb-2">
        <div>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-6 w-24" />
      </div>
      <div className="flex flex-wrap items-center justify-between mb-2">
        <Skeleton className="h-8 w-24 mr-2" />
        <div className="flex">
          <Skeleton className="h-8 w-8 rounded-full mr-1" />
          <Skeleton className="h-8 w-8 rounded-full mr-1" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mt-2" />
      <Skeleton className="h-4 w-full mt-2" />
    </CardContent>
    <CardFooter className="px-4 py-2 bg-muted/50">
      <Skeleton className="h-4 w-32" />
    </CardFooter>
  </Card>
)

export default SessionSkeleton
