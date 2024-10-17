import React from 'react'
import { SessionEvent, SessionTag, User } from '@/payload-types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import StatusBadge from '@/app/(frontend)/(private)/_components/status-badge'
import { Badge } from '@/components/ui/badge'
import InterestComponent from '@/app/(frontend)/(private)/_components/interest-component'
import RichText from '@/components/RichText'
import SuggestedBy from '@/app/(frontend)/(private)/sessions/_components/session-item/sugessted-by'
import { Link } from 'next-view-transitions'
import UserAvatar from '@/app/(frontend)/(private)/_components/user-avatar'
import { sessionUser } from '@/app/(frontend)/(auth)/_lib/auth'
import SessionEditOptions from '@/app/(frontend)/(private)/session/_components/session-edit-options'
import SessionOptions from '@/app/(frontend)/(private)/session/_components/session-options'


const SessionDetails = async ({ session, topic = false }: { session: SessionEvent, topic?: boolean }) => {
  const user = await sessionUser();
  const presenters = session.presenters as User[] | undefined;
  const suggestedBy = session.suggestedBy as User | undefined;
  const isProposedTopic = session.status === 'wished';
  const allowMultiplePresenters = session.allowMultiplePresenters || false;
console.log("allowMultiplePresenters", allowMultiplePresenters)
  console.log("isProposedTopic", isProposedTopic)
  console.log('user id', user && user.id)
  console.log('presenters', presenters && presenters.map(presenter => presenter.id))
  console.log("Presenter user", presenters && user && presenters.some(presenter => presenter.id === user.id))
  return (
    <Card className="w-full max-w-4xl mx-auto" style={{viewTransitionName: `card-session-${session.id}`}} standAlone >
      <CardHeader className="space-y-6" standAlone >
        <div className="flex justify-between items-start">
          <CardTitle className="text-3xl font-bold pr-4" style={{viewTransitionName: `session-title-${session.id}`}}>{session.title}</CardTitle>
          {user &&
            (
              (!isProposedTopic && presenters && presenters.some(presenter => presenter.id === user.id) ) ||
              (isProposedTopic && suggestedBy && suggestedBy.id === user.id)
            ) &&
            <SessionEditOptions session={session} allowCancel={!isProposedTopic} setRemovePresenter={presenters && presenters.at(0)?.id !== user.id} />}
          {user && session.allowMultiplePresenters === true && !isProposedTopic && presenters && !presenters.some(presenter => presenter.id === user.id) &&
            <SessionOptions session={session} />}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {session.status === 'wished' && <SuggestedBy suggestedBy={session.suggestedBy} styles={{ viewTransitionName: `session-suggested-by-${session.id}` }} />}
          <div className="flex flex-wrap items-center gap-4" style={{viewTransitionName: `session-presenters-${session.id}`}}>
            {session.status !== 'wished' && session.presenters && session.presenters.map((sessionPresenter, index) => {
              return (<div key={`presenter-${ index }`} className="flex items-center gap-2">
                <UserAvatar user={sessionPresenter} />
                <span className="font-medium">
                  {typeof sessionPresenter === 'string' ? 'Deleted User' : (<Link href={`/user/${sessionPresenter.handle}`}>{sessionPresenter.name}</Link>)}
                </span>
              </div>)
            })}
          </div>
          <StatusBadge status={session.status} scheduledAt={session.scheduledAt} styles={{viewTransitionName: `session-status-badge-${session.id}`}} />
        </div>
        <div className="flex flex-wrap gap-2">
          {session.tags.map(sessionTag => {
            const tag = sessionTag as SessionTag
            return (<Badge key={tag.id} variant="secondary" className="px-3 py-1">{tag.name}</Badge>)
          })}
        </div>
      </CardHeader>
      <CardContent className="space-y-6" standAlone>
        <div className="relative z-10">
          <InterestComponent
            session={session}
            showPresentButton={topic}
            bigButton={true} user={user}
            showCoPresentButton={allowMultiplePresenters && !isProposedTopic && presenters && user && !presenters.some(presenter => presenter.id === user.id)}
          />
        </div>

        <div className="space-y-4 relative z-0 mt-16">
          <h3 className="text-xl font-semibold">Description</h3>
          <p className="" style={{viewTransitionName: `session-short-description-${session.id}`}}>{session.shortDescription}</p>
          {session.fullDescription && (
            <>
              <h3 className="text-xl font-semibold">Detailed Content</h3>
              <div className="whitespace-pre-line">
                <RichText content={session.fullDescription ?? {}} enableGutter={false} />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default SessionDetails
