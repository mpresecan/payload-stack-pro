import 'server-only'
import { getPayload } from '@/lib/payload'
import { COLLECTION_SLUG_USERS } from '@/collections/slugs'

export const getUserByHandle = async (handle: string) => {
  try {
    const payload = await getPayload();
    const results = await payload.find({
      collection: COLLECTION_SLUG_USERS,
      where: {
        handle: {
          equals: handle
        }
      }
    })

    return results.totalDocs === 0 ? null : results.docs.at(0)
  } catch (error) {
    console.error(error)
    return null
  }
}
