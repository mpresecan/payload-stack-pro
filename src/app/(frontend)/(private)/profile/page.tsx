import React from 'react'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import { getPayload } from '@/lib/payload'
import { COLLECTION_SLUG_USERS } from '@/collections/slugs'
import NotFound from '@/app/not-found'
import { User } from '@/payload-types'
import UserProfile from '@/app/(frontend)/(private)/user/[handle]/_components/user-profile'
import { sessionUser } from '@/app/(frontend)/(auth)/_lib/auth'
import { Metadata } from 'next'

const domain = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(domain),
  title: "My Profile",
  description: "Your profile",
}

const UserProfilePage = async () => {

  const currentUser = await sessionUser();

  if(!currentUser) {
    return NotFound();
  }

  const payload = await getPayload();
  const results = await payload.find({
    collection: COLLECTION_SLUG_USERS,
    where: {
      handle: {
        equals: currentUser?.handle
      }
    }
  })

  if(results.totalDocs === 0) {
    return NotFound();
  }

  const user = results.docs.at(0) as User;

  return (
    <ContentLayout title="3th Annual Advent UNconference, Berivoi, Apr 23-27, 2025">
      <UserProfile user={user} />
    </ContentLayout>
  )
}

export default UserProfilePage
