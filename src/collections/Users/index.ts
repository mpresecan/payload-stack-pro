import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { COLLECTION_SLUG_USERS } from '@/collections/slugs'

const Users: CollectionConfig = {
  slug: COLLECTION_SLUG_USERS,
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['fullName', 'email'],
    useAsTitle: 'fullName',
  },
  auth: {
    verify: true,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      saveToJWT: true,
    },
    {
      name: 'role',
      type: 'select',
      options: ['user', 'admin'],
      defaultValue: 'user',
      required: true,
      saveToJWT: true,
    }
  ],
  timestamps: true,
}

export default Users
