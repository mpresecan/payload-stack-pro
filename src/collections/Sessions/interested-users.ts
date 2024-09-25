import type {CollectionConfig} from 'payload'
import {
  COLLECTION_SLUG_SESSION_INTERESTED_USERS,
  COLLECTION_SLUG_SESSIONS,
  COLLECTION_SLUG_USERS,
  GROUP_SLUG_SESSIONS,
} from '@/collections/slugs'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const interestedUsers: CollectionConfig = {
  slug: COLLECTION_SLUG_SESSION_INTERESTED_USERS,
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    hidden: false,
    group: GROUP_SLUG_SESSIONS,
  },
  fields: [
    {
      name: 'session',
      type: 'relationship',
      relationTo: COLLECTION_SLUG_SESSIONS,
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: COLLECTION_SLUG_USERS,
      required: true,
    }
  ]
}
