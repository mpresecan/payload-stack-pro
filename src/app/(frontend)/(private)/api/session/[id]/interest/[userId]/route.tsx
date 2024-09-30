import { NextRequest, NextResponse } from 'next/server'
import { sessionUser } from '@/app/(frontend)/(auth)/_lib/auth'
import { getPayload } from '@/lib/payload'
import { COLLECTION_SLUG_SESSION_INTERESTED_ATTENDEES } from '@/collections/slugs'



export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; userId: string } }
) {
  // Check authentication
  const user = await sessionUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Ensure the authenticated user matches the userId in the route
  if (user.id !== params.userId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id: sessionId, userId } = params

  if(!sessionId || !userId) {
    return NextResponse.json( {error: 'Invalid data'}, { status: 501 })
  }

  try {
    const payload = await getPayload()
    const existingRecord = await payload.find({
      collection: COLLECTION_SLUG_SESSION_INTERESTED_ATTENDEES,
      where: {
        and: [
          {
            session: {
              equals: sessionId
            }
          },
          {
            user: {
              equals: userId
            }
          }
        ]
      }
    })

    if(existingRecord.totalDocs > 0) {
      return NextResponse.json({ message: 'Interest added successfully' }, { status: 200 })
    }

    const newRecord = await payload.create({
      collection: COLLECTION_SLUG_SESSION_INTERESTED_ATTENDEES,
      data: {
        user: userId,
        session: sessionId,
        type: 'interested'
      }
    })

    return NextResponse.json({ message: 'Interest added successfully', user: newRecord.user }, { status: 200 })
  } catch (error) {
    console.error('Error adding interest:', error)
    return NextResponse.json({ error: 'Failed to add interest' }, { status: 500 })
  }
}
