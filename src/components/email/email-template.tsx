import * as React from 'react'
import { Container, Logo, Text, Hr, SmallText, Heading, Link, Body } from '@/components/email/components'
import { Html } from '@react-email/html'
import { Head } from '@react-email/head'
import { Preview } from '@react-email/preview'
import { emailConfig } from '@/config/email'
import { siteConfig } from '@/config/app'
import { absoluteUrl } from '@/utilities/absoluteUrl'
import { PRIVACY_PAGE } from '@/app/(frontend)/(auth)/_config/routes'

interface EmailTemplateProps {
  previewText?: string
  headingContent?: string | React.ReactNode,
  greetingName?: string | null,
  children?: React.ReactNode,
}

const baseUrl = absoluteUrl()

export const EmailTemplate = ({
                                previewText = emailConfig.defaultEmailTemplate.previewText,
                                headingContent,
                                greetingName = 'there',
                                children,
                              }: EmailTemplateProps) => {

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body>
        <Container>
          <Logo height="58" width="373" />
          <Heading>
            {headingContent}
          </Heading>
          <Text>
            Hi {greetingName},
          </Text>
          {children}
          <Hr />
          <SmallText align="left" italic>
            {siteConfig.name} will never email you and ask you to disclose or verify your password, credit card, or
            banking account number.
          </SmallText>
          <Hr marginBottom={0} marginTop={0} />
          <SmallText>
            This message was produced and distributed
            by {siteConfig.companyLegals.name}, {siteConfig.companyLegals.address}.
            © {new Date().getFullYear()}, <Link href={baseUrl}>{siteConfig.companyLegals.name}</Link>. All
            rights reserved. View our <Link href={PRIVACY_PAGE}>privacy policy</Link>.
          </SmallText>
        </Container>
      </Body>
    </Html>
  )
}

export const emailTemplateText = () => {
  return ` ---- Saas Toolkit will never email you and ask you to disclose or verify your password, credit card, or banking account number ---- This message was produced and distributed by ${siteConfig.companyLegals.name}, ${siteConfig.companyLegals.address}. © ${new Date().getFullYear()}, ${siteConfig.companyLegals.name}. All rights reserved. View our privacy policy: ${PRIVACY_PAGE}.`
}
