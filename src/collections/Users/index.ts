import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { COLLECTION_SLUG_USERS } from '@/collections/slugs'
import { VerificationEmail } from '@/app/(frontend)/(auth)/_components/emails/verification-email'
import { render } from '@react-email/render'
import { ForgotPasswordEmail } from '@/app/(frontend)/(auth)/_components/emails/forgot-password-email'

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
    verify: {
      generateEmailHTML: ({ token, user}) => {
        return render(VerificationEmail({emailVerificationToken: token, user}))
      }
    },
    forgotPassword: {
      // @ts-ignore
      generateEmailHTML: ({ token, user }) => {
        return render(ForgotPasswordEmail({ resetPasswordToken: token, userName: user?.name }))
      }
    }
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: false,
      saveToJWT: true,
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
          saveToJWT: true
        }
      ]
    },

  ],
  timestamps: true,
}

export default Users
