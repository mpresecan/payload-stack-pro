import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Link } from 'next-view-transitions'
import { Card, CardHeader } from '@/components/ui/card'
import { Editor } from '@/components/editor'
import { ContentLayout } from '@/components/admin-panel/content-layout'

const NewSessionPage = () => {
  return (
    <ContentLayout title="2n Annual Advent UNconference, Berivoi, Oct 16-19, 2024">
      <Breadcrumb className='mb-8'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/sessions" style={{viewTransitionName: `page-session-title`}}>Sessions</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>New</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="container mx-auto p-4 sm:px-8 max-w-4xl xl:px-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <Editor />
          </CardHeader>
        </Card>
      </div>
    </ContentLayout>
  )
}

export default NewSessionPage
