import 'server-only'
import { getPayload } from '@/lib/payload'
import { COLLECTION_SLUG_USERS } from '@/collections/slugs'
import { User } from '@/payload-types'

export const getUserById = async (id?: string) => {
  if(!id) return null

  try {
    const payload = await getPayload();
    return await payload.findByID({ id, collection: COLLECTION_SLUG_USERS });
  } catch (error) {
    console.error(error)
    return null
  }
}

export const updateUser = async (user?: User)=> {
  if(!user) return null

  try {
    const payload = await getPayload();
    return await payload.update({
      collection: COLLECTION_SLUG_USERS,
      id: user.id,
      data: {
        ...user
      }
    })
  } catch (error) {
    console.error(error)
    return null
  }
}
