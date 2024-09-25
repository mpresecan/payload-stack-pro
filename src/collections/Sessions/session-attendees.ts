import type { CollectionConfig } from 'payload'
import { COLLECTION_SLUG_SESSION_ATTENDEES, GROUP_SLUG_SESSIONS } from '@/collections/slugs'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const SessionAttendees: CollectionConfig = {
  slug: COLLECTION_SLUG_SESSION_ATTENDEES,
  admin: {
    hidden: false,
    group: GROUP_SLUG_SESSIONS,
  },
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'session',
      type: 'relationship',
      relationTo: 'sessions',
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    }
  ]
}
