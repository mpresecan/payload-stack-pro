import React, { Suspense } from 'react'
import { SessionFilterProvider } from '../sessions/_providers/filter'
import SearchInput from '../sessions/_components/search-input'
import SessionSortBy from '../sessions/_components/session-sort-by'
import SessionTags from '@/app/(frontend)/(private)/sessions/_components/session-tags'
import SessionsList from '@/app/(frontend)/(private)/sessions/_components/sessions-list'
import { getSessionsBySearchParams } from '@/app/(frontend)/(private)/sessions/_lib/get-sessions'
import FetchLoader from '@/app/(frontend)/(private)/sessions/_components/fetch-loader'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import TopDownAnimation from '@/components/animations/top-down'
import SuggestTopicButton from '@/app/(frontend)/(private)/topic-suggestions/_components/suggest-topic-button'
import { Metadata } from 'next'
import { sessionUser } from '../../(auth)/_lib/auth'

const domain = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(domain),
  title: "Topic Suggestions",
  description: "Vote for the topics which interest you",
}

const SessionsPage = async () => {

  const sessions = await getSessionsBySearchParams()
  const user = await sessionUser();

  return (
    <ContentLayout title="3th Annual Advent UNconference, Berivoi, Apr 23-27, 2025">
      <div className="container mx-auto p-0 sm:px-8 max-w-4xl xl:px-4">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-black mb-6" style={{ viewTransitionName: `page-topic-suggestion-title` }}>Topic Suggestions</h1>
          <SuggestTopicButton />
        </div>
        <Suspense>
          <SessionFilterProvider initialSessionsDoc={sessions} wished={true} >
            <TopDownAnimation className="mb-6 flex flex-wrap gap-4 items-center justify-between">
              <SearchInput />
              <div className="flex flex-wrap gap-4 justify-between items-center">
                <SessionSortBy />
              </div>
            </TopDownAnimation>
            <SessionTags />
            <FetchLoader />
            <SessionsList topicList={true} currentUser={user}/>
          </SessionFilterProvider>
        </Suspense>
      </div>
    </ContentLayout>

  )
}

export default SessionsPage
