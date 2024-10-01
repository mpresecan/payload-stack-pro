import React from 'react'
import { User } from '@/payload-types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/utilities/getInitials'

const Presenters = ({presenters, styles} : {presenters?: (string | User)[] | null, styles: React.CSSProperties}) => {
  const presentersUser: User[] = presenters as User[]

  if(!presenters) {
    return;
  }

  return (
    <div className="text-sm text-muted-foreground mt-1" style={styles}>
      {presentersUser.length > 0 && (typeof presenters.at(0) !== 'string') ? presentersUser.map((presenter: User, index) => (
        <span key={index} className="inline-flex items-center mr-2">
          <Avatar className="w-5 h-5 mr-1">
            <AvatarImage src={presenter.avatarUrl!} alt={presenter.name!} />
            <AvatarFallback>{getInitials(presenter.name, 1)}</AvatarFallback>
          </Avatar>
          {presenter.name}
        </span>
      )) : (<span className="italic">No presenters</span>)}
    </div>
  )
}

export default Presenters
