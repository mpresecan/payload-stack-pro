import { CollectionAfterChangeHook } from 'payload'
import { User } from '@/payload-types'
import { COLLECTION_SLUG_USERS } from '@/collections/slugs'
import { render } from '@react-email/render'
import {
  NewSessionProposalCreatedEmail,
  newSessionProposalCreatedEmailText,
} from '@/app/(frontend)/(private)/_components/emails/new-session-proposal-create-email'
import { getResend, ResendEmailBulk } from '@/lib/resend'
import {
  NewSuggestionTopicCreatedEmail,
  newSuggestionTopicCreatedEmailText,
} from '@/app/(frontend)/(private)/_components/emails/new-topic-suggestion-created-email'

export const notifyPotentialParticipantsOnSessionCreate: CollectionAfterChangeHook = async (props) => {
  const { req, operation, doc } = props

  if (operation === 'create' && doc.status === 'proposed') {
    const presenters = doc.presenters as User[]
    if (presenters.length === 0) {
      return
    }
    try {

      const potentialParticipants = await req.payload.find({
        collection: COLLECTION_SLUG_USERS,
        where: {
          and: [
            {
              id: {
                not_in: presenters.map(p => p.id),
              },
            },
            {
              status: {
                equals: 'active',
              },
            },
          ],
        },
      })

      const bulkEmails: ResendEmailBulk = []
      for (const potentialParticipant of potentialParticipants.docs) {
        bulkEmails.push({
          from: `Advent Conference <${process.env.RESEND_DEFAULT_EMAIL}>`,
          to: potentialParticipant.email,
          subject: `New Session Proposed: ${doc.title} – Vote now${doc.allowMultiplePresenters ? ' or Co-present' : ''}!`,
          html: await render(NewSessionProposalCreatedEmail({ session: doc, user: potentialParticipant })),
          text: newSessionProposalCreatedEmailText({ session: doc, user: potentialParticipant }),
        })
      }
      const resend = getResend()
      await resend.batch.send(bulkEmails)
    } catch (error) {
      req.payload.logger.error(error)
    }
  }
}

export const notifyPotentialPresentersOnTopicSuggestionCreate: CollectionAfterChangeHook = async (props) => {
  const { req, doc, operation } = props

  if (operation === 'create' && doc.status === 'wished') {
    // get all users except the current user
    const suggestedBy = doc.suggestedBy as User
    // send a notification to all users except the suggestedBy user

    try {
      const potentialInterestedUsers = await req.payload.find({
        collection: COLLECTION_SLUG_USERS,
        where: {
          and: [
            {
              id: {
                not_equals: suggestedBy.id,
              },
            },
            {
              status: {
                equals: 'active',
              },
            },
          ],
        },
        limit: 9999999,
      })

      const bulkEmails: ResendEmailBulk = []
      for (const user of potentialInterestedUsers.docs) {
        bulkEmails.push({
          from: `Advent Conference <${process.env.RESEND_DEFAULT_EMAIL}>`,
          to: user.email,
          subject: `New Topic Suggestion: ${suggestedBy.name} – Vote or Lead the Session!`,
          html: await render(NewSuggestionTopicCreatedEmail({ session: doc, user: user })),
          text: newSuggestionTopicCreatedEmailText({ session: doc, user: user }),
        })
      }

      const resend = getResend()
      await resend.batch.send(bulkEmails)
    } catch (error) {
      req.payload.logger.error(error)
    }
  }
}
