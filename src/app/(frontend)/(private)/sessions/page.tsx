import React, { Suspense } from 'react'
import { SessionFilterProvider } from './_providers/filter'
import SearchInput from './_components/search-input'
import SessionSortBy from './_components/session-sort-by'
import SessionTags from '@/app/(frontend)/(private)/sessions/_components/session-tags'
import PastSessionToggle from '@/app/(frontend)/(private)/sessions/_components/past-session-toggle'
import SessionsList from '@/app/(frontend)/(private)/sessions/_components/sessions-list'
import { getSessionsBySearchParams } from '@/app/(frontend)/(private)/sessions/_lib/get-sessions'
import FetchLoader from '@/app/(frontend)/(private)/sessions/_components/fetch-loader'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import TopDownAnimation from '@/components/animations/top-down'
import ProposeSessionButton from '@/app/(frontend)/(private)/sessions/_components/propose-session-button'
import { Metadata } from 'next'
import { sessionUser } from '@/app/(frontend)/(auth)/_lib/auth'

const domain = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(domain),
  title: "Sessions",
  description: "Vote for the session you would like to participate",
}

const SessionsPage = async () => {

  const sessions = await getSessionsBySearchParams()
  const currentUser = await sessionUser();

  return (
    <ContentLayout title="3th Annual Advent UNconference, Berivoi, Apr 23-27, 2025">
      <div className="container mx-auto p-0 sm:px-8 max-w-4xl xl:px-4">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-black mb-6" style={{ viewTransitionName: `page-session-title` }}>Sessions</h1>
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
            <SessionsList currentUser={currentUser} />
          </SessionFilterProvider>
        </Suspense>
      </div>
    </ContentLayout>

  )
}

export default SessionsPage
