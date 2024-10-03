'use client'

import React from 'react'
import { useSessionFilter } from '@/app/(frontend)/(private)/sessions/_providers/filter'
import { AnimatePresence, motion } from 'framer-motion'
import SessionSkeleton from '@/app/(frontend)/(private)/sessions/_components/session-item/session-skeleton'
import Session from '../session-item'
import { User } from '@/payload-types'

const SessionsList = ({topicList = false, currentUser} : {topicList?: boolean, currentUser?: User | null | undefined}) => {
  const { sessionDocs, isLoading } = useSessionFilter()

  return (
    <div className="space-y-4 mb-6">
      <AnimatePresence mode="wait">
        {isLoading && sessionDocs.totalDocs === 0 ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: {duration: 0.1} }}
            className='space-y-4'
          >
            <SessionSkeleton />
            <SessionSkeleton />
            <SessionSkeleton />
          </motion.div>
        ) : sessionDocs.docs.length > 0 ? (
          <motion.div
            layout
            key="sessions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: {duration: 0.1} }}
          >
            <AnimatePresence initial={false}>
              {sessionDocs.docs.map((session, index) => (
                <motion.div
                  key={session.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.1 }}}
                  transition={{ duration: 0.3 }}
                  className='relative'
                  style={{
                    zIndex: sessionDocs.totalDocs - index,
                    isolation: 'isolate'
                  }}
                >
                  <Session session={session} currentUser={currentUser} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="no-sessions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: {duration: 0.1} }}
          >
            <p className="text-center text-gray-500">No {topicList ? 'topics' : 'sessions'} found.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SessionsList
