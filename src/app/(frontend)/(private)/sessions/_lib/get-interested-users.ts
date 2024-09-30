import { User } from '@/payload-types'
import { getPayload } from '@/lib/payload'
import { COLLECTION_SLUG_SESSION_INTERESTED_ATTENDEES } from '@/collections/slugs'

export const getInterestedUsers = async (sessionId: string) => {
  try {
    const payload = await getPayload()
    const interestedAttendees = await payload.find({
      collection: COLLECTION_SLUG_SESSION_INTERESTED_ATTENDEES,
      where: {
        session: {
          equals: sessionId
        }
      },
      depth: 1,
      limit: 9999999999
    })

    return interestedAttendees.docs.map((attendee) => attendee.user)

  } catch (error) {
    console.error('Error fetching interested users:', error)
    return []
  }
}
