'use server'

import { getPayload } from '@/lib/payload'
import { COLLECTION_SLUG_SESSIONS } from '@/collections/slugs'

export const testSubmit = async (data: any) => {

  const payload = await getPayload();
  const result = await payload.update({
    collection: COLLECTION_SLUG_SESSIONS,
    id: '66fbf27df49183084106b100',
    data: {
      fullDescription: JSON.parse(data.content)
    }
  })
  console.log(result);
}
