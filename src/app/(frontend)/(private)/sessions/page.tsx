import React, { Suspense } from 'react'
import SessionTabs from './_components/session-tabs'
import { SessionFilterProvider } from './_providers/filter'
import SearchInput from './_components/search-input'
import SessionSortBy from './_components/session-sort-by'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PlusIcon } from 'lucide-react'
import SessionTags from '@/app/(frontend)/(private)/sessions/_components/session-tags'
import PastSessionToggle from '@/app/(frontend)/(private)/sessions/_components/past-session-toggle'
import SessionsList from '@/app/(frontend)/(private)/sessions/_components/sessions-list'
import { getSessionsBySearchParams } from '@/app/(frontend)/(private)/sessions/_lib/get-sessions'
import FetchLoader from '@/app/(frontend)/(private)/sessions/_components/fetch-loader'
import { ContentLayout } from '@/components/admin-panel/content-layout'

const SessionsPage = async () => {

  const sessions = await getSessionsBySearchParams()

  return (
    <ContentLayout title="2n Annual Advent Conference, Berivoi, Oct 16-19, 2024">
      <div className="container mx-auto p-4 sm:px-8 max-w-4xl xl:px-4">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-bold mb-6">Sessions</h1>
          <Button asChild className="grow-0 ms-8">
            <Link href="#"><PlusIcon className="mr-2 h-4 w-4" />Propose Session</Link>
          </Button>
        </div>
        <Suspense>
          <SessionFilterProvider initialSessionsDoc={sessions}>
            {/*<SessionTabs />*/}
            <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
              <SearchInput />
              <div className="flex flex-wrap gap-4 justify-between items-center">
                <SessionSortBy />
                <PastSessionToggle />
              </div>
            </div>
            <SessionTags />
            <FetchLoader />
            <SessionsList />
          </SessionFilterProvider>
        </Suspense>
      </div>
    </ContentLayout>

  )
}

export default SessionsPage
