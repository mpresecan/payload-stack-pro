'use client'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import React from 'react'
import { SessionTag } from '@/payload-types'
import { useSessionFilter } from '@/app/(frontend)/(private)/sessions/_providers/filter'
import { Badge } from '@/components/ui/badge'

const SessionTagsClient = ({ tags }: { tags: SessionTag[] }) => {
  const { selectedTags, setSelectedTags } = useSessionFilter()

  return (
    <>
      {tags.map(tag => (
        <Badge
          key={tag.id}
          variant={selectedTags.includes(tag.id) ? 'default' : 'outline'}
          className="cursor-pointer mr-2 whitespace-nowrap"
          onClick={() => setSelectedTags(selectedTags.includes(tag.id) ? selectedTags.filter(t => t !== tag.id) : [...selectedTags, tag.id])}
        >
          {tag.name}
        </Badge>
      ))}
    </>
  )
}

export default SessionTagsClient
