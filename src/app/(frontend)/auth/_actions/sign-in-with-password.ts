'use server'

import * as z from 'zod'
import { signInWithPasswordSchema } from '../_validation'
import { getPayload } from '@/lib/payload'
import { COLLECTION_SLUG_USERS } from '@/collections/slugs'

export const signInWithPassword = async (values: z.infer<typeof signInWithPasswordSchema>) => {
  const validatedFields = signInWithPasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    throw new Error(
      'Invalid fields',
      {
        cause: validatedFields.error.issues.map(issue => issue.message).join(', '),
      },
    )
  }

  const { email, password } = validatedFields.data

  const payload = await getPayload()

  const result = await payload.login({
    collection: COLLECTION_SLUG_USERS,
    data: {
      email,
      password,
    },
  })

  console.log('RESULTS FROM SIGNIN WITH PASSWORD', result)

  return
}
