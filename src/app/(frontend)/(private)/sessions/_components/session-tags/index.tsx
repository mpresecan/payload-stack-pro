import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import React, { Suspense } from 'react'
import TagsSkeleton from '../session-tags/tags-skeleton'
import SessionTagFetcher from '../session-tags/session-tags-fetcher'

const SessionTags = () => {
  return (
    <div className="mb-6 relative">
      <ScrollArea className="w-full whitespace-nowrap pb-1.5">
        <Suspense fallback={<TagsSkeleton />}>
          <SessionTagFetcher />
        </Suspense>
        <ScrollBar orientation="horizontal" className="h-2" />
      </ScrollArea>
    </div>
  )
}

export default SessionTags
