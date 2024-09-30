'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDownIcon, ChevronUpIcon, TagIcon, ThumbsUpIcon } from 'lucide-react'
import { Session, SessionInterestedAttendee, SessionTag, User } from '@/payload-types'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useAuth } from '@/app/(frontend)/(auth)/_providers/auth'

import Presenters from './presenters'
import StatusBadge from '@/app/(frontend)/(private)/_components/status-badge'
import InterestComponent from '@/app/(frontend)/(private)/_components/interest-component'
import Link from 'next/link'


const SessionComponent = ({ session }: { session: Session }) => {
  const { user: currentUser } = useAuth()
  const [showMore, setShowMore] = useState(false)

  const voters: User[] = session.interestedUsers?.docs?.map(voter => (voter as SessionInterestedAttendee).user as User) || []
  const tags: SessionTag[] = session.tags.map(tag => tag as SessionTag)

  return (
    <Card className="overflow-hidden mb-4">
      <CardContent className="p-4">
        <div className="flex flex-wrap justify-between items-start mb-2">
          <div>
            <Link href={`/session/${session.id}`}>
              <h2 className="text-lg font-semibold">{session.title}</h2>
            </Link>
            <Presenters presenters={session.presenters} />
          </div>
          <StatusBadge status={session.status} scheduledAt={session.scheduledAt} />
        </div>
        <InterestComponent session={session} refetchSessions={true} />
        <div className="mt-2">
          <AnimatePresence initial={false}>
            <motion.div
              key={`description-${session.id}`}
              initial="collapsed"
              animate={showMore ? 'expanded' : 'collapsed'}
              exit="collapsed"
              variants={{
                expanded: { height: 'auto', opacity: 1 },
                collapsed: { height: '2.5em', opacity: 1 },
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="relative overflow-hidden"
            >
              <p className="text-sm text-muted-foreground">
                {session.shortDescription}
              </p>
              {!showMore && (
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-background to-transparent" />
              )}
            </motion.div>
          </AnimatePresence>
          <Button
            variant="ghost"
            size="sm"
            className="mt-1 p-0 h-auto text-muted-foreground hover:text-foreground"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? (
              <>
                Read less
                <ChevronUpIcon className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Read more
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-2 bg-muted/50">
        <div className="flex items-center text-xs text-muted-foreground">
          <TagIcon className="mr-2 h-3 w-3" />
          {tags.map((tag, index) => (
            <span key={index} className="mr-2">
                              {tag.name}{index < tags.length - 1 ? ',' : ''}
                            </span>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}

export default SessionComponent
