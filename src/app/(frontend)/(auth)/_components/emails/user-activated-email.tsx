import { siteConfig } from '@/config/app'
import { absoluteUrl } from '@/utilities/absoluteUrl'
import { Button, Link, Section, Text } from '@/components/email/components'
import { EmailTemplate, emailTemplateText } from '@/components/email/email-template'
import React, { JSX } from 'react'
import { User } from '@/payload-types'
import { LOGIN_PAGE } from '@/app/(frontend)/(auth)/_config/routes'

interface UserActivatedEmailProps {
  user: User
}

export function UserActivatedEmail({
                                           user,
                                         }: Readonly<UserActivatedEmailProps>): JSX.Element {
  const previewText = `${siteConfig.name} - Your account is now active!.`

  return (
    <EmailTemplate
      headingContent={<>Welcome Aboard! <strong>Your Account is Now Active</strong> 🎉</>}
      previewText={previewText}
      greetingName={user.name}
    >
      <>
        <Text>
          <>
            Amazing news – your account is now active! 🎉 Welcome to {siteConfig.name}, and congrats on being one of the very first users to join us!
          </>
        </Text>
        <Text>
          You can now dive in, explore topics that interest you, propose your own session to present, and even vote on sessions others have suggested. We’re super excited to see what you’ll bring to the community!
        </Text>
        <Text>
          Ready to get started?
        </Text>
        <Section>
          <Button href={absoluteUrl(LOGIN_PAGE)} label={`Login to ${siteConfig.name}`} />
        </Section>
        <Text>
          <>
            or copy and paste this URL into your browser:{' '}
            <Link href={absoluteUrl(LOGIN_PAGE)}>
              {absoluteUrl(LOGIN_PAGE)}
            </Link>
          </>
        </Text>
        <Text>
          If you have any questions, feel free to reach out – we’re here to help!
        </Text>
        <Text>
          Cheers,<br />
          The {siteConfig.name} Team
        </Text>
      </>
    </EmailTemplate>
  )
}

export const userActivatedEmailText = ({
                                               user,
                                             }: Readonly<UserActivatedEmailProps>,
) => {
  const generalText = emailTemplateText()

  return `
        Hi ${user.name},\r\n\r\n
        Amazing news – your account is now active! 🎉 Welcome to ${siteConfig.name}, and congrats on being one of the
        very first users to join us!\r\n\r\n
        You can now dive in, explore topics that interest you, propose your own session to present, and even vote on
        sessions others have suggested. We’re super excited to see what you’ll bring to the community!\r\n\r\n
        Ready to get started? Login here:\r\n\r\n
        ${absoluteUrl(LOGIN_PAGE)}\r\n\r\n
        If you have any questions, feel free to reach out – we’re here to help!\r\n\r\n
        Cheers,\r\n
        The ${siteConfig.name} Team\r\n\r\n
        ${generalText}
    `
}
