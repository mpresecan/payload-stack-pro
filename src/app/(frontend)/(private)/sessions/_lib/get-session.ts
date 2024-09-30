import 'server-only'
import { getPayload } from '@/lib/payload'
import { COLLECTION_SLUG_SESSIONS } from '@/collections/slugs'

export const getSession = async (sessionId: string, depth = 1) => {
  try {
    const payload = await getPayload();

    return await payload.findByID({
      collection: COLLECTION_SLUG_SESSIONS,
      id: sessionId,
      depth,
    })
  } catch (error) {
    console.error('Error fetching session:', error)
    return null
  }
}
