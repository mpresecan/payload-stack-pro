'use client'

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
          key={tag.slug}
          variant={selectedTags && selectedTags.includes(tag.slug) ? 'default' : 'outline'}
          className="cursor-pointer mr-2 whitespace-nowrap"
          onClick={() => {
            if (selectedTags && selectedTags.includes(tag.slug)) {
              setSelectedTags(selectedTags.filter(t => t !== tag.slug))
            } else {
              setSelectedTags([...selectedTags, tag.slug])
            }
          }}
        >
          {tag.name}
        </Badge>
      ))}
    </>
  )
}

export default SessionTagsClient
