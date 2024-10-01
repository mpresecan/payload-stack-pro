import type { CollectionConfig } from 'payload'
import { COLLECTION_SLUG_SESSION_TAGS, GROUP_SLUG_SESSIONS } from '@/collections/slugs'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import { slugField } from '@/fields/slug'

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
    ...slugField('name', {slugOverrides: {required: true}}),
    {
      name: 'occurrences',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        readOnly: true,
      }
    }
  ],
}
