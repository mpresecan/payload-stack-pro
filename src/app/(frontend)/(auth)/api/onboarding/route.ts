import { createPayloadRequest, headersWithCors } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { COLLECTION_SLUG_USERS } from '@/collections/slugs'
import { onboardingSchema } from '../../_validation'
import * as z from 'zod'
import { getUserById, updateUser } from '../../_lib/user'
import { generatePayloadCookie, refreshOperation } from 'payload'

export const POST = async (request: Request) => {
  try {
    const req = await createPayloadRequest({
      config: configPromise,
      request,
    })

    const collection = req.payload.collections?.[COLLECTION_SLUG_USERS]

    if (!collection) {
      throw new Error('Collection not found')
    }

    const values = await request.json() as z.infer<typeof onboardingSchema>
    const validatedFields = onboardingSchema.safeParse(values)

    if (!validatedFields.success) {
      throw new Error('Invalid fields')
    }

    const existingUser = await getUserById(req.user?.id)

    if (!existingUser) {
      throw new Error('User not found!')
    }

    const headers = headersWithCors({
      headers: new Headers(),
      req,
    })

    const updatedUser = await updateUser({ ...existingUser, ...validatedFields.data })

    if(!updatedUser) {
      throw new Error('User not updated!')
    }

    return Response.json({
      success: updatedUser.name ? `Thank you ${updatedUser.name}!` : 'Success!',
      description: 'Welcome on board!',
      user: updatedUser,
    }, {
      headers,
      status: 200,
    })

  } catch (error) {
    console.error('ERROR CAUGHT in /api/onboarding route:', error)

    return Response.json({
      error: 'Something went wrong',
      description: error.message || 'Please try again.',
    }, {
      status: 500,
    })
  }
}
