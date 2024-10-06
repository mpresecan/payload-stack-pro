import { siteConfig } from '@/config/app'
import { absoluteUrl } from '@/utilities/absoluteUrl'
import { Button, Link, Section, Text } from '@/components/email/components'
import { EmailTemplate, emailTemplateText } from '@/components/email/email-template'
import React, { JSX } from 'react'
import { COLLECTION_SLUG_USERS } from '@/collections/slugs'
import { User } from '@/payload-types'

interface AdminNewUserRegisteredEmailProps {
  user: User
}

export function AdminNewUserRegisteredEmail({
                                           user,
                                         }: Readonly<AdminNewUserRegisteredEmailProps>): JSX.Element {
  const previewText = `${siteConfig.name} New User Registered - Pending Approval.`
  const userLink = absoluteUrl(`/admin/collections/${COLLECTION_SLUG_USERS}/${user.id}`)

  return (
    <EmailTemplate
      headingContent={<>New User Registration - <strong>Pending Approval</strong></>}
      previewText={previewText}
      greetingName="admin"
    >
      <>
        <Text>
          <>
            We wanted to inform you that a new user has just registered on the platform and is currently on the waiting
            list. Below are the details of the new user:
          </>
        </Text>
        <table style={{
          width: '100%',
          fontStyle: 'italic',
          fontSize: '14px',
        }}>
          <tbody>
          <tr
            style={{
              backgroundColor: '#f0f8ff',
            }}
          >
            <td
              style={{
                paddingTop: '15px',
                paddingBottom: '15px',
                paddingRight: '18px',
                paddingLeft: '18px',
              }}
            >
              <strong>Name:</strong> {user.name}<br />
              <strong>Email:</strong> {user.email}<br />
              <strong>Phone Number:</strong> {user.phone}<br />
              <strong>Bio:</strong> {user.bio}<br />
            </td>
          </tr>
          </tbody>
        </table>
        <Text>
          To approve and set the user status to “Active,” please follow the link to the backend:
        </Text>
        <Section>
          <Button href={userLink} label={`Activate ${user.name}`} />
        </Section>
        <Text>
          <>
            or copy and paste this URL into your browser:{' '}
            <Link href={userLink}>
              {userLink}
            </Link>
          </>
        </Text>
        <Text>
          Once you have reviewed the details and activated the account, the user will have full access to the platform.
        </Text>
        <Text>
          <em>Thank you for your attention to this matter.</em>.
        </Text>
        <Text>
          Best regards,<br />
          The {siteConfig.name} Automated Service
        </Text>
      </>
    </EmailTemplate>
  )
}

export const adminNewUserRegistrationText = ({
                                               user,
                                             }: Readonly<AdminNewUserRegisteredEmailProps>,
) => {
  const userLink = absoluteUrl(`/admin/${COLLECTION_SLUG_USERS}/${user.id}`)
  const generalText = emailTemplateText()

  return `
        Hi Admin,\r\n\r\n
        We wanted to inform you that a new user has just registered on the platform and is currently on the waiting
        list. Below are the details of the new user:\r\n\r\n
        Name: ${user.name}\r\n\r\n
        Email: ${user.email}\r\n\r\n
        Phone Number: ${user.phone}\r\n\r\n
        Bio: ${user.bio}\r\n\r\n
        To approve and set the user status to “Active,” please follow the link to the backend:\r\n\r\n
        ${userLink}\r\n\r\n
        Once you have reviewed the details and activated the account, the user will have full access to the platform.\r\n\r\n
        Thank you for your attention to this matter.\r\n\r\n
        Best regards,\r\n
        The ${siteConfig.name} Automated Service\r\n\r\n
        ${generalText}
    `
}
