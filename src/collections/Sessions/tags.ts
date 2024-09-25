import type { CollectionConfig } from 'payload'
import { COLLECTION_SLUG_SESSION_TAGS, COLLECTION_SLUG_SESSIONS, GROUP_SLUG_SESSIONS } from '@/collections/slugs'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const SessionTags: CollectionConfig = {
  slug: COLLECTION_SLUG_SESSION_TAGS,
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    group: GROUP_SLUG_SESSIONS,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'sessions',
      type: 'join',
      collection: COLLECTION_SLUG_SESSIONS,
      on: 'tags',
    }
  ],
}
