import { NextRequest, NextResponse } from 'next/server'
import { getSessionsBySearchParams } from '@/app/(frontend)/(private)/sessions/_lib/get-sessions'
import { sessionUser } from '@/app/(frontend)/(auth)/_lib/auth'

export const GET = async (request: NextRequest) => {
  try {
    const user = await sessionUser(request)

    // Parse the search params from the request URL
    const searchParams = request.nextUrl.searchParams

    // Convert searchParams to an object if getSessionsBySearchParams expects an object
    const paramsObject = Object.fromEntries(searchParams.entries())

    // Fetch sessions using the provided function
    const sessions = await getSessionsBySearchParams(paramsObject, user)

    // Return the sessions as JSON
    return NextResponse.json(sessions)
  } catch (error) {
    console.error('Error fetching sessions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    )
  }
}
