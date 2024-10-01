import React from 'react'
import { User } from '@/payload-types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/utilities/getInitials'
import { Link } from 'next-view-transitions'

const SuggestedBy = ({suggestedBy, styles} : {suggestedBy: string | User | null | undefined, styles: React.CSSProperties}) => {
  const suggestedByUser: User = suggestedBy as User

  if(!suggestedByUser) {
    return;
  }

  return (
    <div className="text-sm text-muted-foreground mt-1" style={styles}>
      {suggestedByUser.id ? (
        <span key={suggestedByUser.id} className="inline-flex items-center mr-2">
          <span className='italic mr-2'>Suggested by{' '}</span>
          <Avatar className="w-5 h-5 mr-1">
            <AvatarImage src={suggestedByUser.avatarUrl!} alt={suggestedByUser.name!} />
            <AvatarFallback>{getInitials(suggestedByUser.name, 1)}</AvatarFallback>
          </Avatar>
          <Link href={`/p/${suggestedByUser.handle}`}>{suggestedByUser.name}</Link>
        </span>
      ) : (<span className="italic">Suggested by admin</span>)}
    </div>
  )
}

export default SuggestedBy
