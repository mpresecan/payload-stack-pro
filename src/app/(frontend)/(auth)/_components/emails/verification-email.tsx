import * as React from "react"
import {Button, Text, Link, Section} from "@/components/email/components"
import {siteConfig} from "@/config/app"
import {EmailTemplate, emailTemplateText} from "@/components/email/email-template";
import {absoluteUrl} from "@/utilities/absoluteUrl";
import { EMAIL_VERIFICATION_PAGE } from '@/app/(frontend)/(auth)/_config/routes'
import { User } from '@/payload-types'
import { JSX } from "react";

interface EmailVerificationEmailProps {
  emailVerificationToken: string,
  user?: User
}

export function VerificationEmail({
                                    emailVerificationToken,
                                    user,
                                  }: Readonly<EmailVerificationEmailProps>) : JSX.Element {
  const previewText = `${siteConfig.name} email verification.`
  const verificationUrl = absoluteUrl(`${EMAIL_VERIFICATION_PAGE}?token=${emailVerificationToken}`);
  return (
    <EmailTemplate
      headingContent={<>Verify your <strong>email address</strong></>}
      previewText={previewText}
      greetingName={user?.name}
    >
      <>
        <Text>
          <>Thanks for signing up for <strong>{siteConfig.name}</strong>. We want to make sure it&apos;s really
            you. Please click the link below to confirm your email address. If you don&apos;t want to create an
            account, you can ignore this message.
          </>
        </Text>
        <Section>
          <Button href={verificationUrl} label="Verify your email"/>
        </Section>
        <Text>
          <>
            or copy and paste this URL into your browser:{" "}
            <Link href={verificationUrl}>
              {verificationUrl}
            </Link>
          </>
        </Text>
      </>
    </EmailTemplate>
  )
}

export const verificationEmailText = ({emailVerificationToken}: Readonly<EmailVerificationEmailProps>) => {
  const verificationUrl = absoluteUrl(`${EMAIL_VERIFICATION_PAGE}?token=${emailVerificationToken}`);
  const generalText = emailTemplateText();

  return `
        Thanks for signing up for ${siteConfig.name}. We want to make sure it's really you. Please click the link
        below to confirm your email address. If you don&apos;t want to create an account, you can ignore this message.\r\n\r\n
        \r\n\r\n
        You can copy and paste this URL into your browser: ${verificationUrl}\r\n\r\n
        \r\n\r\n
        Thanks,\r\n\r\n
        The {siteConfig.name} Team\r\n\r\n
        \r\n\r\n
        ${generalText}
    `;
}
