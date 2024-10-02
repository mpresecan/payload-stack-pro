import React from 'react'
import { SessionEvent, SessionTag, User } from '@/payload-types'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/utilities/getInitials'
import StatusBadge from '@/app/(frontend)/(private)/_components/status-badge'
import { Badge } from '@/components/ui/badge'
import InterestComponent from '@/app/(frontend)/(private)/_components/interest-component'
import RichText from '@/components/RichText'
import SuggestedBy from '@/app/(frontend)/(private)/sessions/_components/session-item/sugessted-by'
import { Link } from 'next-view-transitions'

const SessionDetails = ({ session, topic = false }: { session: SessionEvent, topic?: boolean }) => {
  return (
    <>
      <CardHeader className="space-y-6">
        <div className="flex justify-between items-start">
          <CardTitle className="text-3xl font-bold pr-4" style={{viewTransitionName: `session-title-${session.id}`}}>{session.title}</CardTitle>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {session.status === 'wished' && <SuggestedBy suggestedBy={session.suggestedBy} styles={{ viewTransitionName: `session-suggested-by-${session.id}` }} />}
          <div className="flex flex-wrap items-center gap-4" style={{viewTransitionName: `session-presenters-${session.id}`}}>
            {session.status !== 'wished' && session.presenters && session.presenters.map(sessionPresenter => {
              // TODO: when user is deleted only old ID is stored here
              const presenter = sessionPresenter as User
              return (<div key={presenter.id} className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={presenter.avatarUrl!} alt={presenter.name!} />
                  <AvatarFallback>{getInitials(presenter.name)}</AvatarFallback>
                </Avatar>
                <span className="font-medium"><Link href={`/user/${presenter.handle}`}>{presenter.name}</Link></span>
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
      <CardContent className="space-y-6">
        <div className="relative z-10">
          <InterestComponent session={session} bigButton={true} />
        </div>

        <div className="space-y-4 relative z-0 mt-16">
          <h3 className="text-xl font-semibold">Description</h3>
          <p className="" style={{viewTransitionName: `session-short-description-${session.id}`}}>{session.shortDescription}</p>
          <h3 className="text-xl font-semibold">Detailed Content</h3>
          <div className="whitespace-pre-line">
            <RichText content={session.fullDescription ?? {}} enableGutter={false} />
          </div>
        </div>
      </CardContent>
    </>
  )
}

export default SessionDetails
