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
import NewSessionForm from '../_components/new-session-form'
import { getTags } from '@/app/(frontend)/(private)/sessions/_lib/get-tags'

const NewSessionPage = async () => {
  const tags = await getTags()

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
            <BreadcrumbPage>New</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <NewSessionForm tags={tags} />
    </ContentLayout>
  )
}

export default NewSessionPage
