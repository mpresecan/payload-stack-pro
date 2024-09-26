import type { CollectionConfig } from 'payload'
import {
  COLLECTION_SLUG_SESSION_INTERESTED_ATTENDEES,
  COLLECTION_SLUG_PAGES,
  COLLECTION_SLUG_SESSION_TAGS,
  COLLECTION_SLUG_SESSIONS,
  COLLECTION_SLUG_USERS, GROUP_SLUG_SESSIONS,
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
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
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
          label: 'Settings',
          fields: [
            {
              type: 'row',
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
                  ],
                  required: true,
                  defaultValue: 'online',
                },
                {
                  name: 'onSiteEvent',
                  type: 'relationship',
                  relationTo: COLLECTION_SLUG_PAGES,
                  required: true,
                  admin: {
                    condition: (_, siblingData) => siblingData.type === 'onsite',
                  }
                },
              ]
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'status',
                  type: 'select',
                  options: [
                    {
                      label: 'Proposed',
                      value: 'proposed',
                    },
                    {
                      label: 'Scheduling',
                      value: 'scheduling',
                    },
                    {
                      label: 'Scheduled',
                      value: 'scheduled',
                    },
                    {
                      label: 'Live',
                      value: 'live',
                    },
                    {
                      label: 'Finished',
                      value: 'finished',
                    },
                    {
                      label: 'Cancelled',
                      value: 'cancelled',
                    },
                  ],
                  required: true,
                  defaultValue: 'proposed',
                },
                {
                  name: 'scheduledAt',
                  type: 'date',
                  admin: {
                    condition: (_, siblingData) => ['scheduled', 'live', 'finished', 'cancelled'].includes(siblingData.status),
                    date: {
                      pickerAppearance: 'dayAndTime'
                    },
                    width: '50%',
                  },
                  hooks: {
                    afterChange: [
                      async ({ value }) => {
                        // TODO: Send a notification to all interested users
                        // TODO: Schedule Actions
                        return value
                      }
                    ]
                  }
                },
              ]
            },
            {
              name: 'presenters',
              type: 'relationship',
              relationTo: COLLECTION_SLUG_USERS,
              hasMany: true,
              required: true,
            },
            {
              name: 'tags',
              type: 'relationship',
              relationTo: COLLECTION_SLUG_SESSION_TAGS,
              hasMany: true,
              required: true,
              admin: {
                position: 'sidebar',
              }
            },
            {
              name: 'interestedAttendeesCount',
              type: 'number',
              required: true,
              defaultValue: 0,
              admin: {
                readOnly: true,
                hidden: true,
              }
            }
          ]
        },
        {
          label: 'Interested Users',
          fields: [
            {
              name: 'interestedUsers',
              type: 'join',
              collection: COLLECTION_SLUG_SESSION_INTERESTED_ATTENDEES,
              on: 'session',
            }
          ]
        }
      ]
    },
  ]
}
