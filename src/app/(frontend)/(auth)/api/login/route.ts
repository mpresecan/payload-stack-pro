import configPromise from '@payload-config'
import { createPayloadRequest, headersWithCors } from '@payloadcms/next/utilities'
import { COLLECTION_SLUG_USERS } from '@/collections/slugs'
import { loginOperation, generatePayloadCookie, AuthenticationError } from 'payload'
import { isNumber } from 'payload/shared'

export const POST = async (request: Request) => {
  try {
    const req = await createPayloadRequest({
      config: configPromise,
      request,
    })
throw new Error('Not implemented')
    const collection = req.payload.collections?.[COLLECTION_SLUG_USERS]

    if (!collection) {
      throw new Error('Collection not found')
    }

    const { searchParams } = req
    const depth = searchParams.get('depth')

    const body = await request.json()
    const { email, password, username } = body

    const authData =
      collection.config.auth?.loginWithUsername !== false
        ? {
          email: typeof email === 'string' ? email : '',
          password: typeof password === 'string' ? password : '',
          username: typeof username === 'string' ? username : '',
        }
        : {
          email: typeof email === 'string' ? email : '',
          password: typeof password === 'string' ? password : '',
        }

    const result = await loginOperation({
      collection,
      data: authData,
      depth: isNumber(depth) ? Number(depth) : undefined,
      req,
    })

    const cookie = generatePayloadCookie({
      collectionConfig: collection.config,
      payload: req.payload,
      token: result.token as string,
    })

    if (collection.config.auth.removeTokenFromResponses) {
      delete result.token
    }

    return Response.json(
      {
        success: result.user.name ? `Hi ${result.user.name}!` : 'Success!',
        description: result.user.name ? 'It is nice to see you back.' : 'Welcome to our community!',
        user: result.user,
      },
      {
        headers: headersWithCors({
          headers: new Headers({
            'Set-Cookie': cookie,
          }),
          req,
        }),
        status: 200,
      },
    )


  } catch (error) {
    console.error('ERROR CAUGHT in /api/login route:', error)
    // for debugging purposes
    return Response.json({
      error: error.message,
      description: error.stack || 'Please try again.',
    })

    if (error instanceof AuthenticationError) {
      return Response.json({
        error: 'Invalid credentials',
        description: 'Please try again.',
      }, {
        status: 401,
      })
    }

    return Response.json({
      error: 'Something went wrong',
      description: error.message || 'Please try again.',
    }, {
      status: 500,
    })
  }
}
