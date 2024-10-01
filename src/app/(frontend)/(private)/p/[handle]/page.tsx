import React from 'react'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import { getPayload } from '@/lib/payload'
import { COLLECTION_SLUG_USERS } from '@/collections/slugs'
import NotFound from '@/app/not-found'
import { User } from '@/payload-types'
import UserProfile from '@/app/(frontend)/(private)/p/[handle]/_components/user-profile'

const ProfilePage = async ({ params : {handle} }: { params: { handle: string } }) => {

  const payload = await getPayload();
  const results = await payload.find({
    collection: COLLECTION_SLUG_USERS,
    where: {
      handle: {
        equals: handle
      }
    }
  })

  if(results.totalDocs === 0) {
    return NotFound();
  }

  const user = results.docs.at(0) as User;

  return (
    <ContentLayout title="2n Annual Advent UNconference, Berivoi, Oct 16-19, 2024">
      <UserProfile user={user} />
    </ContentLayout>
  )
}

export default ProfilePage
