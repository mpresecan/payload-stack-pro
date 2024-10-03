import React from 'react'
import { User } from '@/payload-types'
import { Link } from 'next-view-transitions'
import UserAvatar from '@/app/(frontend)/(private)/_components/user-avatar'

const Presenters = ({presenters, styles} : {presenters?: (string | User)[] | null, styles: React.CSSProperties}) => {
  const presentersUser: User[] = presenters as User[]

  if(!presenters) {
    return;
  }

  return (
    <div className="text-sm text-muted-foreground mt-1" style={styles}>
      {presentersUser.length > 0 && (typeof presenters.at(0) !== 'string') ? presentersUser.map((presenter: User, index) => (
        <span key={index} className="inline-flex items-center mr-2">
          <UserAvatar user={presenter} className="w-5 h-5 mr-1" numberOfInitials={1} />
          <Link href={`/user/${presenter.handle}`}>{presenter.name}</Link>
        </span>
      )) : (<span className="italic">No presenters</span>)}
    </div>
  )
}

export default Presenters
