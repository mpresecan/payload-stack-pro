import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { Suspense } from 'react'
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
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from 'next/link'

const Session = async ({ params }: { params: { id: string } }) => {
  const session = await getSession(params.id)

  if (!session) {
    return NotFound()
  }

  return (
    <ContentLayout title="2n Annual Advent UNconference, Berivoi, Oct 16-19, 2024">
      <Breadcrumb className='mb-8'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/sessions">Sessions</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{session.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="container mx-auto p-4 sm:px-8 max-w-4xl xl:px-4">
        <Card className="w-full max-w-4xl mx-auto">
          {/*<Suspense>*/}
            <SessionDetails session={session} />
          {/*</Suspense>*/}
        </Card>
      </div>

    </ContentLayout>
  )
}

export default Session
