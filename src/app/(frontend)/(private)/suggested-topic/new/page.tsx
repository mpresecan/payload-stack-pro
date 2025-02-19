import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Link } from 'next-view-transitions'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import { getTags } from '@/app/(frontend)/(private)/sessions/_lib/get-tags'
import NewOrUpdateSessionForm from '../../session/_components/new-or-update-session-form'
import { Metadata } from 'next'

const domain = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(domain),
  title: "New Topic",
  description: "What would you like to learn about?",
}

const NewSessionPage = async () => {
  const tags = await getTags()

  return (
    <ContentLayout title="3th Annual Advent UNconference, Berivoi, Apr 23-27, 2025">
      <Breadcrumb className="sm:mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/topic-suggestions" style={{viewTransitionName: `page-topic-suggestion-title`}}>Topic Suggestion</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>New</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <NewOrUpdateSessionForm tags={tags} isTopicSuggestion={true} />
    </ContentLayout>
  )
}

export default NewSessionPage
