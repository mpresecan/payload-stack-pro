import { NextRequest, NextResponse } from 'next/server'
import { getInterestedUsers } from '@/app/(frontend)/(private)/sessions/_lib/get-interested-users'


export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const sessionId = params.id

  try {
    const interestedUsers = await getInterestedUsers(sessionId)

    return NextResponse.json(interestedUsers, { status: 200 })
  } catch (error) {
    console.error('Error fetching interested users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch interested users' },
      { status: 500 }
    )
  }
}
