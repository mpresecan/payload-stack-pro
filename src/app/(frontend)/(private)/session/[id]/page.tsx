import { Card } from '@/components/ui/card'
import React from 'react'
import { getSession } from '@/app/(frontend)/(private)/sessions/_lib/get-session'
import NotFound from '@/app/not-found'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import SessionDetails from '@/app/(frontend)/(private)/session/_components/session-details'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Link } from 'next-view-transitions'
import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
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
    title: session.title,
    description: session.shortDescription || 'Session',
  }
}

const Session = async ({ params }: Props) => {
  const session = await getSession(params.id)

  if (!session) {
    return NotFound()
  }

  return (
    <ContentLayout title="2n Annual Advent UNconference, Berivoi, Oct 16-19, 2024">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/sessions" style={{ viewTransitionName: `page-session-title` }}>Sessions</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{session.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="container mx-auto p-0 sm:px-8 max-w-4xl xl:px-4">
        <SessionDetails session={session} />
      </div>
    </ContentLayout>
  )
}

export default Session
