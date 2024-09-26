'use client'

import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSessionFilter } from '@/app/(frontend)/(private)/sessions/_providers/filter'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const SessionTabs = () => {
  const { tab, setTab } = useSessionFilter()

  return (
    <Tabs value={tab} onValueChange={setTab} className="mb-6">
      <ScrollArea className="w-full whitespace-nowrap pb-1.5">
        <TabsList className="w-full">
          <TabsTrigger value="all" className='w-1/2 md:w-1/5'>All</TabsTrigger>
          <TabsTrigger value="proposals" className='w-1/2 md:w-1/5'>Proposals</TabsTrigger>
          <TabsTrigger value="scheduled" className='w-1/2 md:w-1/5'>Scheduled</TabsTrigger>
          <TabsTrigger value="interested" className='w-1/2 md:w-1/5'>Interested</TabsTrigger>
          <TabsTrigger value="my-sessions" className='w-1/2 md:w-1/5'>My Sessions</TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" className='h-2' />
      </ScrollArea>
    </Tabs>
  )
}

export default SessionTabs
