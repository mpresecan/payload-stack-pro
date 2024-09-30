import React from 'react'
import { Session, SessionTag, User } from '@/payload-types'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/utilities/getInitials'
import StatusBadge from '@/app/(frontend)/(private)/_components/status-badge'
import { Badge } from '@/components/ui/badge'
import InterestComponent from '@/app/(frontend)/(private)/_components/interest-component'
import RichText from '@/components/RichText'

const SessionDetails = ({ session }: { session: Session }) => {
  return (
    <>
      <CardHeader className="space-y-6">
        <div className="flex justify-between items-start">
          <CardTitle className="text-3xl font-bold pr-4">{session.title}</CardTitle>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {session.presenters.map(sessionPresenter => {
              const presenter = sessionPresenter as User
              return (<div key={presenter.id} className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={presenter.avatarUrl!} alt={presenter.name!} />
                  <AvatarFallback>{getInitials(presenter.name)}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{presenter.name}</span>
              </div>)
            })}
          </div>
          <StatusBadge status={session.status} scheduledAt={session.scheduledAt} />
        </div>
        <div className="flex flex-wrap gap-2">
          {session.tags.map(sessionTag => {
            const tag = sessionTag as SessionTag
            return (<Badge key={tag.id} variant="secondary" className="px-3 py-1">{tag.name}</Badge>)
          })}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <InterestComponent session={session} />

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Description</h3>
          <p className="">{session.shortDescription}</p>
          <h3 className="text-xl font-semibold">Detailed Content</h3>
          <p className="whitespace-pre-line">
            <RichText content={session.fullDescription ?? {}} enableGutter={false} />
          </p>
        </div>
      </CardContent>
    </>
  )
}

export default SessionDetails
