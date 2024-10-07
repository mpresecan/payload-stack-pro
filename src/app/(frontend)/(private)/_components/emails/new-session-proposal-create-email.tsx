import { siteConfig } from '@/config/app'
import { absoluteUrl } from '@/utilities/absoluteUrl'
import { Button, Link, Section, SmallText, Text } from '@/components/email/components'
import { EmailTemplate, emailTemplateText } from '@/components/email/email-template'
import React, { JSX } from 'react'
import { SessionEvent, SessionTag, User } from '@/payload-types'
import { arrayJoin } from '@/utilities/array-join'
import RichText from '@/components/RichText'

interface NewSuggestionTopicCreatedEmailProps {
  session: SessionEvent
  user: User,
}

export function NewSessionProposalCreatedEmail({
                                                 session,
                                                 user,
                                               }: Readonly<NewSuggestionTopicCreatedEmailProps>): JSX.Element {
  const previewText = `${siteConfig.name} New Session.`
  const sessionLink = absoluteUrl(`/session/${session.id}`)
  const presenter = session.presenters?.at(0) as User
  const sessionTags = session.tags as SessionTag[]

  return (
    <EmailTemplate
      headingContent={<>New Session: <strong>{session.title}</strong> - Vote {session.allowMultiplePresenters ? 'or Co-present' : 'if interested'}!</>}
      previewText={previewText}
      greetingName={user.name}
    >
      <>
        <Text>
          <>
            <strong>{presenter.name}</strong> proposed new seesion: <strong>”{session.title}”</strong>, and we think it could be right up your alley!
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
              <strong>Summary:</strong> {session.shortDescription}<br /><br />
              {session.fullDescription && (<><strong>Description:</strong> <RichText content={session.fullDescription} /><br /><br /></>)}
              <strong>Tag{sessionTags.length > 1 ? 's' : ''}:</strong> {arrayJoin(sessionTags.map(t => t.name))}<br />
            </td>
          </tr>
          </tbody>
        </table>
        <Text>
          Want to attend {session.allowMultiplePresenters ? 'or support ' : ''}this session?<br />
          <strong>Vote now</strong> to show your interest{session.allowMultiplePresenters ? ', or if you’d like to share the stage, you can co-present with the speaker' : ''}!
        </Text>
        <Section>
          <Button href={sessionLink} label={`Vote Now${session.allowMultiplePresenters ? ' or Co-present' : ''}`} />
        </Section>
        <SmallText>
          <>
            or copy and paste this URL into your browser:{' '}
            <Link href={sessionLink}>
              {sessionLink}
            </Link>
          </>
        </SmallText>
        <Text>
          Let’s make this session happen!
        </Text>
        <Text>
          Cheers,<br />
          The {siteConfig.name} Team
        </Text>
      </>
    </EmailTemplate>
  )
}

export const newSessionProposalCreatedEmailText = ({
                                                     user,
                                                     session,
                                                   }: Readonly<NewSuggestionTopicCreatedEmailProps>,
) => {
  const sessionLink = absoluteUrl(`/session/${session.id}`)
  const presenter = session.presenters?.at(0) as User
  const sessionTags = session.tags as SessionTag[]
  const generalText = emailTemplateText()

  return `
        Hi ${user.name},\r\n\r\n
        ${presenter.name} proposed new session: ”${session.title}”, and we think it could be right up your alley!\r\n\r\n
        Summary: ${session.shortDescription}\r\n\r\n
        Tags: ${arrayJoin(sessionTags.map(t => t.name))}\r\n\r\n
        Want to attend ${session.allowMultiplePresenters ? 'or support ' : ''}this session?\r\n
        Vote now to show your interest${session.allowMultiplePresenters ? ', or if you’d like to share the stage, you can co-present with the speaker' : ''}!\r\n\r\n
        Vote Now${session.allowMultiplePresenters ? ' or Co-present' : ''}:\r\n
        ${sessionLink}\r\n\r\n
        Cheers,\r\n
        The ${siteConfig.name} Team\r\n\r\n
        ${generalText}
    `
}
