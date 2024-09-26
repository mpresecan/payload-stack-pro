import React, { Suspense } from 'react'
import SessionTabs from './_components/session-tabs'
import { SessionFilterProvider } from './_providers/filter'
import SearchInput from './_components/search-input'
import SessionSortBy from './_components/session-sort-by'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PlusIcon } from 'lucide-react'
import TagsSkeleton from './_components/session-tags/tags-skeleton'
import SessionTags from '@/app/(frontend)/(private)/sessions/_components/session-tags'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const SessionsPage = () => {

  return (
    <div className="container mx-auto p-4 max-w-4xl mt-12">
      <h1 className="text-3xl font-bold mb-6">Sessions</h1>
      <SessionFilterProvider>
        <SessionTabs />
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <SearchInput />
          <SessionSortBy />
          <Button asChild className='grow md:grow-0'>
            <Link href="#"><PlusIcon className="mr-2 h-4 w-4" />Add Session</Link>
          </Button>
        </div>
        <SessionTags />
      </SessionFilterProvider>
    </div>
  )
}

export default SessionsPage
