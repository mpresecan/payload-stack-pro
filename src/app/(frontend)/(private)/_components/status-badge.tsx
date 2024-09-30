import React from 'react'
import { Session } from '@/payload-types'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon } from 'lucide-react'

interface StatusBadgeProps {
  scheduledAt?: string | null,
  status: Session['status']
  styles?: React.CSSProperties
}

const StatusBadge = ({status, scheduledAt, styles} : StatusBadgeProps) => {
  return (
    <div className='flex justify-center items-center' style={styles}>
      {status === 'cancelled' && (
        <Badge variant="destructive" className="ml-2 mt-1">
          Cancelled
        </Badge>
      )}
      {scheduledAt && (
        <Badge variant="secondary" className="ml-2 mt-1">
          <CalendarIcon className="mr-1 h-3 w-3" />
          {new Date(scheduledAt).toLocaleString()}
        </Badge>
      )}
    </div>
  )
}

export default StatusBadge
