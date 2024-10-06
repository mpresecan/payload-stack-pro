import { siteConfig } from '@/config/app'
import { absoluteUrl } from '@/utilities/absoluteUrl'
import { Button, Link, Section, SmallText, Text } from '@/components/email/components'
import { EmailTemplate, emailTemplateText } from '@/components/email/email-template'
import React, { JSX } from 'react'
import { COLLECTION_SLUG_USERS } from '@/collections/slugs'
import { SessionEvent, SessionTag, User } from '@/payload-types'
import { arrayJoin } from '@/utilities/array-join'

interface NewSuggestionTopicCreatedEmailProps {
  session: SessionEvent
  user: User,
}

export function NewSuggestionTopicCreatedEmail({
                                                 session,
                                                 user,
                                               }: Readonly<NewSuggestionTopicCreatedEmailProps>): JSX.Element {
  const previewText = `${siteConfig.name} New Topic Suggestion.`
  const topicSuggestionLink = absoluteUrl(`/suggested-topic/${session.id}`)
  const suggestedBy = session.suggestedBy as User
  const sessionTags = session.tags as SessionTag[]

  return (
    <EmailTemplate
      headingContent={<>New Topic Suggestion: <strong>{session.title}</strong> - Vote or Lead the Session!</>}
      previewText={previewText}
      greetingName={user.name}
    >
      <>
        <Text>
          <>
            <strong>{suggestedBy.name}</strong> suggested a new topic: <strong>”{session.title}”</strong>, and we think you might be
            interested!
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
              <strong>Summary:</strong> {session.shortDescription}<br />
              <strong>Tag{sessionTags.length === 0 ? '' : 's'}:</strong> {arrayJoin(sessionTags.map(t => t.name))}<br />
            </td>
          </tr>
          </tbody>
        </table>
        <Text>
          Would you like to see this topic presented?<br />
          <strong>Vote</strong> to show your interest or <strong>step up to lead the session</strong> if you’re
          passionate about presenting on this subject!
        </Text>
        <Section>
          <Button href={topicSuggestionLink} label="Vote Now or Lead the Session" />
        </Section>
        <SmallText>
          <>
            or copy and paste this URL into your browser:{' '}
            <Link href={topicSuggestionLink}>
              {topicSuggestionLink}
            </Link>
          </>
        </SmallText>
        <Text>
          Cheers,<br />
          The {siteConfig.name} Team
        </Text>
      </>
    </EmailTemplate>
  )
}

export const newSuggestionTopicCreatedEmailText = ({
                                                 user,
                                                 session,
                                               }: Readonly<NewSuggestionTopicCreatedEmailProps>,
) => {
  const topicSuggestionLink = absoluteUrl(`/suggested-topic/${session.id}`)
  const suggestedBy = session.suggestedBy as User
  const sessionTags = session.tags as SessionTag[]
  const generalText = emailTemplateText()

  return `
        Hi ${user.name},\r\n\r\n
        ${suggestedBy.name} suggested a new topic, ”${session.title}”, and we think you might be interested!\r\n\r\n
        Summary: ${session.shortDescription}\r\n\r\n
        Tags: ${arrayJoin(sessionTags.map(t => t.name))}\r\n\r\n
        Would you like to see this topic presented?\r\n
        Vote to show your interest or step up to lead the session if you’re passionate about presenting on this subject!\r\n\r\n
        Vote Now or Lead the Session:\r\n
        ${topicSuggestionLink}\r\n\r\n
        Cheers,\r\n
        The ${siteConfig.name} Team\r\n\r\n
        ${generalText}
    `
}
