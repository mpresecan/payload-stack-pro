import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { COLLECTION_SLUG_CATEGORIES } from '@/collections/slugs'

const Categories: CollectionConfig = {
  slug: COLLECTION_SLUG_CATEGORIES,
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}

export default Categories
