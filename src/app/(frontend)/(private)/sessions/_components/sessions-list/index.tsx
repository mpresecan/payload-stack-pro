'use client'

import React from 'react'
import { useSessionFilter } from '@/app/(frontend)/(private)/sessions/_providers/filter'
import { AnimatePresence, motion } from 'framer-motion'
import SessionSkeleton from '@/app/(frontend)/(private)/sessions/_components/session-item/session-skeleton'
import Session from '../session-item'

const SessionsList = () => {
  const { sessionDocs, isLoading, initialLoad } = useSessionFilter()

  return (
    <div className="space-y-4 mb-6">
      <AnimatePresence>
        {isLoading && initialLoad ? (
          <>
            <SessionSkeleton />
            <SessionSkeleton />
            <SessionSkeleton />
          </>
        ): (
          <motion.div layout>
            <AnimatePresence initial={false}>
              {sessionDocs.docs.map((session) => (
                <motion.div
                  key={session.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.1 }}}
                  transition={{ duration: 0.3 }}
                >
                  <Session session={session} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SessionsList
