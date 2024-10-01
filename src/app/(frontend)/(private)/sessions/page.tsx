import React, { Suspense } from 'react'
import { SessionFilterProvider } from './_providers/filter'
import SearchInput from './_components/search-input'
import SessionSortBy from './_components/session-sort-by'
import { Button } from '@/components/ui/button'
import { Link } from 'next-view-transitions'
import { PlusIcon } from 'lucide-react'
import SessionTags from '@/app/(frontend)/(private)/sessions/_components/session-tags'
import PastSessionToggle from '@/app/(frontend)/(private)/sessions/_components/past-session-toggle'
import SessionsList from '@/app/(frontend)/(private)/sessions/_components/sessions-list'
import { getSessionsBySearchParams } from '@/app/(frontend)/(private)/sessions/_lib/get-sessions'
import FetchLoader from '@/app/(frontend)/(private)/sessions/_components/fetch-loader'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import TopDownAnimation from '@/components/animations/top-down'
import ProposeSessionButton from '@/app/(frontend)/(private)/sessions/_components/propose-session-button'

const SessionsPage = async () => {

  const sessions = await getSessionsBySearchParams()

  return (
    <ContentLayout title="2n Annual Advent UNconference, Berivoi, Oct 16-19, 2024">
      <div className="container mx-auto p-4 sm:px-8 max-w-4xl xl:px-4">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-bold mb-6" style={{ viewTransitionName: `page-session-title` }}>Sessions</h1>
          <ProposeSessionButton />
        </div>
        <Suspense>
          <SessionFilterProvider initialSessionsDoc={sessions}>
            {/*<SessionTabs />*/}
            <TopDownAnimation className="mb-6 flex flex-wrap gap-4 items-center justify-between">
              <SearchInput />
              <div className="flex flex-wrap gap-4 justify-between items-center">
                <SessionSortBy />
                <PastSessionToggle />
              </div>
            </TopDownAnimation>
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
