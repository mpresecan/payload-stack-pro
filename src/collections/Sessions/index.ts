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
import { revalidatePath, revalidateTag } from 'next/cache'
import { BoldFeature, ItalicFeature, lexicalEditor, UnderlineFeature, OrderedListFeature, UnorderedListFeature, LinkFeature, BlockquoteFeature, HeadingFeature } from '@payloadcms/richtext-lexical'
import { render } from '@react-email/render'
import { UserActivatedEmail } from '@/app/(frontend)/(auth)/_components/emails/user-activated-email'
import {
  newSuggestionTopicCreatedEmailText,
  NewSuggestionTopicCreatedEmail,
} from '@/app/(frontend)/(private)/_components/emails/new-topic-suggestion-created-email'
import { User } from '@/payload-types'
import {
  NewSessionProposalCreatedEmail, newSessionProposalCreatedEmailText,
} from '@/app/(frontend)/(private)/_components/emails/new-session-proposal-create-email'

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
              editor: lexicalEditor({
                features: [
                  UnderlineFeature(),
                  BoldFeature(),
                  ItalicFeature(),
                  OrderedListFeature(),
                  UnorderedListFeature(),
                  LinkFeature(),
                  BlockquoteFeature(),
                  HeadingFeature(),
                ]
              }),
              validate: (_) => {
                return true;
              }
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
                      label: 'Wished',
                      value: 'wished',
                    },
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
                {
                  name: 'suggestedBy',
                  type: 'relationship',
                  relationTo: COLLECTION_SLUG_USERS,
                  required: true,
                  admin: {
                    condition: (_, siblingData) => siblingData.status === 'wished',
                    width: '50%',
                  }
                }
              ]
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'presenters',
                  type: 'relationship',
                  relationTo: COLLECTION_SLUG_USERS,
                  hasMany: true,
                  required: false,
                  // validate: TODO: Check if the user is a presenter
                  admin: {
                    width: '50%',
                  }
                },
                {
                  name: 'allowMultiplePresenters',
                  type: 'checkbox',
                  required: false,
                  admin: {
                    width: '50%'
                  }
                }
              ]
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
                hidden: false,
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
  ],
  hooks: {
    afterChange: [
      async () => {
        revalidateTag('sessions')
      },
      async ({req, doc, operation}) => {
        if(operation === 'create' && doc.status === 'wished') {
          // get all users except the current user
          const suggestedBy = doc.suggestedBy;
          // send a notification to all users except the suggestedBy user

          const potentialInterestedUsers = await req.payload.find({
            collection: COLLECTION_SLUG_USERS,
            where: {
              id: {
                not_equals: suggestedBy.id
              }
            },
            limit: 9999999
          });

          for (const user of potentialInterestedUsers.docs) {
            await req.payload.sendEmail({
              to: user.email,
              subject: `New Topic Suggestion: ${suggestedBy.name} – Vote or Lead the Session!`,
              html: await render(NewSuggestionTopicCreatedEmail({ session: doc, user: user })),
              text: newSuggestionTopicCreatedEmailText({ session: doc, user: user }),
            })
          }
        }
      },
      async ({ req, operation, doc, previousDoc }) => {
        if(operation === 'create' && doc.status === 'proposed') {
          const presenters = doc.presenters as User[]
          if(presenters.length === 0) {
            return
          }
          const potentialPresenters = await req.payload.find({
            collection: COLLECTION_SLUG_USERS,
            where: {
              id: {
                not_in: presenters.map(p => p.id)
              }
            }
          })

          for (const presenter of potentialPresenters.docs) {
            await req.payload.sendEmail({
              to: presenter.email,
              subject: `New Session Proposed: ${doc.title} – Vote now${doc.allowMultiplePresenters ? ' or Co-present' : ''}!`,
              html: await render(NewSessionProposalCreatedEmail({ session: doc, user: presenter })),
              text: newSessionProposalCreatedEmailText({ session: doc, user: presenter }),
            })
          }
        }
      }
    ]
  }
}
