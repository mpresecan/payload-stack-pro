import React from 'react'
import { getSession } from '@/app/(frontend)/(private)/sessions/_lib/get-session'
import NotFound from '@/app/not-found'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Link } from 'next-view-transitions'
import { Metadata, ResolvingMetadata } from 'next'
import NewOrUpdateSessionForm from '@/app/(frontend)/(private)/session/_components/new-or-update-session-form'
import { getTags } from '@/app/(frontend)/(private)/sessions/_lib/get-tags'
import { sessionUser } from '@/app/(frontend)/(auth)/_lib/auth'
import { User } from '@/payload-types'

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Fetch the session data
  const session = await getSession(params.id)

  // If session doesn't exist, return default metadata
  if (!session) {
    return {
      title: 'Topic Not Found',
    }
  }

  // Generate the metadata based on the session data
  return {
    title: 'Present on ' + session.title,
    description: session.shortDescription || 'Topic',
  }
}

const PresentOnTopicPage = async ({ params }: Props) => {
  const session = await getSession(params.id)

  if (!session) {
    return NotFound()
  }

  const user = await sessionUser();
  const presenters = session.presenters as User[] | undefined;
  if(!user || presenters && presenters.some(presenter => presenter.id === user.id)) {
    return NotFound()
  }

  const tags = await getTags()

  return (
    <ContentLayout title="3th Annual Advent UNconference, Berivoi, Apr 23-27, 2025">
      <Breadcrumb className='mb-8'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/topic-suggestions" style={{ viewTransitionName: `page-topic-suggestion-title` }}>Topic
                Suggestion</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href={`/topic-suggestions/${session.id}`}>{session.title}</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Present</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="container mx-auto p-0 sm:px-8 max-w-4xl xl:px-4">
        <NewOrUpdateSessionForm tags={tags} session={session} isTopicSuggestion={false} fromTopicSuggestion={true} />
      </div>
    </ContentLayout>
  )
}

export default PresentOnTopicPage
