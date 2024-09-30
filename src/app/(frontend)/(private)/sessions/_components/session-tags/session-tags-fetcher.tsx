import React, { cache } from 'react'
import { getPayload } from '@/lib/payload'
import { COLLECTION_SLUG_SESSION_TAGS } from '@/collections/slugs'
import SessionTagsClient from '@/app/(frontend)/(private)/sessions/_components/session-tags/session-tags.client'

const getTags = cache(async () => {
  const payload = await getPayload()
  return await payload.find({
    collection: COLLECTION_SLUG_SESSION_TAGS,
    sort: 'createdAt',
    depth: 0,
  })
});

const SessionTagFetcher = async () => {
  const tags = await getTags()

  // wait for 2 seconds
  await new Promise(resolve => setTimeout(resolve, 2000))

  return (
    <SessionTagsClient tags={tags.docs} />
  )
}

export default SessionTagFetcher
