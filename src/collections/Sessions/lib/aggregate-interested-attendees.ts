import { PayloadRequest } from 'payload'
import { Session } from '@/payload-types'
import { COLLECTION_SLUG_SESSION_INTERESTED_ATTENDEES, COLLECTION_SLUG_SESSIONS } from '@/collections/slugs'

export const aggregateInterestedAttendees = async (req: PayloadRequest, session: Session | string) => {
  const sessionId = typeof session === 'string' ? session : session.id

  try {
    const {totalDocs: count} = await req.payload.count({
      collection: COLLECTION_SLUG_SESSION_INTERESTED_ATTENDEES,
      where: {
        session: {
          equals: sessionId,
        }
      },
      req,
    })

    await req.payload.update({
      collection: COLLECTION_SLUG_SESSIONS,
      id: sessionId,
      data: {
        interestedAttendeesCount: count,
      },
      req
    })
  }
  catch (error) {
    req.payload.logger.error(error)
    return
  }

}
