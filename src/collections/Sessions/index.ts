import type { CollectionConfig } from 'payload'
import {
  COLLECTION_SLUG_SESSION_INTERESTED_USERS,
  COLLECTION_SLUG_PAGES,
  COLLECTION_SLUG_SESSION_TAGS,
  COLLECTION_SLUG_SESSIONS,
  COLLECTION_SLUG_USERS, GROUP_SLUG_SESSIONS, COLLECTION_SLUG_SESSION_ATTENDEES,
} from '@/collections/slugs'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const Sessions: CollectionConfig = {
  slug: COLLECTION_SLUG_SESSIONS,
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    group: GROUP_SLUG_SESSIONS,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Description',
          fields: [
            {
              name: 'shortDescription',
              label: 'Short Description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'fullDescription',
              type: 'richText',
            },
          ]
        },
        {
          label: 'Interested Users',
          fields: [
            {
              name: 'interestedUsers',
              type: 'join',
              collection: COLLECTION_SLUG_SESSION_INTERESTED_USERS,
              on: 'session',
            }
          ]
        },
        {
          label: 'Attendees',
          fields: [
            {
              name: 'attendees',
              type: 'join',
              collection: COLLECTION_SLUG_SESSION_ATTENDEES,
              on: 'session',
            }
          ]
        },
        {
          label: 'Settings',
          fields: [
            {
              name: 'type',
              type: 'select',
              options: [
                {
                  label: 'Online',
                  value: 'online',
                },
                {
                  label: 'On-site',
                  value: 'onsite',
                }
              ]
            },
            {
              name: 'onSiteEvent',
              type: 'relationship',
              relationTo: COLLECTION_SLUG_PAGES,
              admin: {
                condition: (_, siblingData) => siblingData.type === 'onsite',
              }
            },
          ]
        }
      ]
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      }
    },
    {
      name: 'presenters',
      type: 'relationship',
      relationTo: COLLECTION_SLUG_USERS,
      hasMany: true,
      required: true,
      admin: {
        position: 'sidebar',
      }
    },
    {
      name: 'dateTime',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime'
        },
        position: 'sidebar',
      }
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: COLLECTION_SLUG_SESSION_TAGS,
      admin: {
        position: 'sidebar',
      }
    }
  ]
}
