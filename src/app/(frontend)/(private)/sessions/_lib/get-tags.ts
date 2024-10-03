import { cache } from 'react'
import { getPayload } from '@/lib/payload'
import { COLLECTION_SLUG_SESSION_TAGS } from '@/collections/slugs'

export const getTags = cache(async () => {
  const payload = await getPayload()
  const result = await payload.find({
    collection: COLLECTION_SLUG_SESSION_TAGS,
    sort: 'createdAt',
    depth: 0,
  })
  return result.docs;
});
