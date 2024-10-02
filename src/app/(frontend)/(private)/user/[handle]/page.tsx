import React from 'react'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import NotFound from '@/app/not-found'
import UserProfile from '@/app/(frontend)/(private)/user/[handle]/_components/user-profile'
import { Metadata, ResolvingMetadata } from 'next'
import { getUserByHandle } from '../_lib/get-user'

type Props = { params: { handle: string } }

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  // Generate the metadata based on the user data
  return {
    title: '@' + params.handle,
    description: 'Profile',
  }
}

const ProfilePage = async ({ params : {handle} }: Props) => {

  const user = await getUserByHandle(handle);

  if(!user) {
    return NotFound();
  }

  return (
    <ContentLayout title="2n Annual Advent UNconference, Berivoi, Oct 16-19, 2024">
      <UserProfile user={user} />
    </ContentLayout>
  )
}

export default ProfilePage
