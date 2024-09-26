import type {CollectionConfig} from 'payload'
import {
  COLLECTION_SLUG_SESSION_INTERESTED_ATTENDEES,
  COLLECTION_SLUG_SESSIONS,
  COLLECTION_SLUG_USERS,
  GROUP_SLUG_SESSIONS,
} from '@/collections/slugs'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import { aggregateInterestedAttendees } from '@/collections/Sessions/lib/aggregate-interested-attendees'

export const interestedAttendees: CollectionConfig = {
  slug: COLLECTION_SLUG_SESSION_INTERESTED_ATTENDEES,
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
    },
    {
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'Interested',
          value: 'interested',
        },
        {
          label: 'Attending',
          value: 'attending',
        },
        {
          label: 'Cancelled',
          value: 'cancelled',
        },
        {
          label: 'Attended',
          value: 'attended',
        }
      ],
      required: true,
      defaultValue: 'interested',
    }
  ],
  hooks: {
    afterChange: [
      async ({ operation, doc, req, collection}) => {
        if (operation === 'create') {
          await aggregateInterestedAttendees(req, doc.session)
        }
        return doc;
      }
    ],
    afterDelete: [
      async ({req, collection, doc}) => {
        await aggregateInterestedAttendees(req, doc.session)
      }
    ]
  }
}
