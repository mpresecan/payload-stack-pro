import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import {
  COLLECTION_SLUG_SESSION_INTERESTED_ATTENDEES,
  COLLECTION_SLUG_USERS,
} from '@/collections/slugs'
import { VerificationEmail } from '@/app/(frontend)/(auth)/_components/emails/verification-email'
import { render } from '@react-email/render'
import { ForgotPasswordEmail } from '@/app/(frontend)/(auth)/_components/emails/forgot-password-email'
import {
  AdminNewUserRegisteredEmail,
  adminNewUserRegistrationText,
} from '@/app/(frontend)/(auth)/_components/emails/admin-new-user-registered'
import {
  UserActivatedEmail,
  userActivatedEmailText,
} from '@/app/(frontend)/(auth)/_components/emails/user-activated-email'

const Users: CollectionConfig = {
  slug: COLLECTION_SLUG_USERS,
  access: {
    admin: authenticated,
    create: () => true,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: {
    verify: false,
    // verify: {
    //   generateEmailHTML: ({ token, user }) => {
    //     return render(VerificationEmail({ emailVerificationToken: token, user }))
    //   },
    // },
    forgotPassword: {
      // @ts-ignore
      generateEmailHTML: ({ token, user }) => {
        return render(ForgotPasswordEmail({ resetPasswordToken: token, userName: user?.name }))
      },
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Settings',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: false,
                  saveToJWT: true,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'handle',
                  type: 'text',
                  required: false,
                  saveToJWT: true,
                  admin: {
                    width: '50%',
                    placeholder: '@',
                  },
                  unique: true,
                  minLength: 3,
                  maxLength: 50,
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'role',
                  type: 'select',
                  options: ['user', 'admin'],
                  defaultValue: 'user',
                  required: true,
                  saveToJWT: true,
                },
                {
                  name: 'status',
                  type: 'select',
                  options: ['active', 'suspended', 'waiting-list', 'deleted'],
                  defaultValue: 'waiting-list',
                  required: true,
                  saveToJWT: true,
                },
              ],
            },
            {
              name: 'avatarUrl',
              type: 'text',
            },
            {
              name: 'phone',
              type: 'text',
            },
            {
              name: 'bio',
              type: 'textarea',
            },
          ],
        },
        {
          label: 'Interested Sessions',
          fields: [
            {
              name: 'interestedSessions',
              type: 'join',
              collection: COLLECTION_SLUG_SESSION_INTERESTED_ATTENDEES,
              on: 'user',
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
  hooks: { //cascade delete
    afterDelete: [
      async ({ req, id }) => {
        await req.payload.delete({
          collection: COLLECTION_SLUG_SESSION_INTERESTED_ATTENDEES,
          where: {
            user: {
              equals: id,
            }
          },
        })
      },
    ],
    afterChange: [
      async ({ req, doc, operation, previousDoc}) => {
        if(operation === 'update' && doc.name && !previousDoc?.name) {
          // get all admins
          const admins = await req.payload.find({
            collection: COLLECTION_SLUG_USERS,
            where: {
              role: {
                equals: 'admin',
              }
            },
            limit: 99999999
          })

          for (const admin of admins.docs) {
            // send email to each admin
            await req.payload.sendEmail({
              to: admin.email,
              subject: `New User Registered - ${doc.name} - Pending Approval`,
              html: await render(AdminNewUserRegisteredEmail({ user: doc })),
              text: adminNewUserRegistrationText({ user: doc }),
            })
          }
        }
      },
      async ({ req, doc, operation, previousDoc }) => {
        if(operation === 'update' && doc.status === 'active' && previousDoc?.status === 'waiting-list') {
          await req.payload.sendEmail({
            to: doc.email,
            subject: 'Welcome Aboard! Your Account is Now Active 🎉',
            html: await render(UserActivatedEmail({ user: doc })),
            text: userActivatedEmailText({ user: doc }),
          })
        }
      }
    ]
  },
}

export default Users
