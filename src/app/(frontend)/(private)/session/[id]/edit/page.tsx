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
      title: 'Session Not Found',
    }
  }

  // Generate the metadata based on the session data
  return {
    title: 'Edit ' + session.title,
    description: session.shortDescription || 'Session',
  }
}

const EditSessionPage = async ({ params }: Props) => {
  const session = await getSession(params.id)

  if (!session) {
    return NotFound()
  }

  const user = await sessionUser();
  const presenters = session.presenters as User[]
  if(!user || !presenters.some(presenter => presenter.id == user.id)) {
    return NotFound()
  }

  const tags = await getTags()

  return (
    <ContentLayout title="3th Annual Advent UNconference, Berivoi, Apr 23-27, 2025">
      <Breadcrumb className='sm:mb-8'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/sessions" style={{viewTransitionName: `page-session-title`}}>Sessions</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className='hidden sm:block'>
            <Link href={`/session/${session.id}`}>{session.title}</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator className='hidden sm:block' />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="container mx-auto p-0 sm:px-8 max-w-4xl xl:px-4">
        <NewOrUpdateSessionForm tags={tags} session={session}/>
      </div>
    </ContentLayout>
  )
}

export default EditSessionPage
