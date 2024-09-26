'use client'

import React from 'react'
import { useSessionFilter } from '../_providers/filter'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchIcon, XIcon } from 'lucide-react'

const SearchInput = () => {
  const { search, setSearch } = useSessionFilter()

  return (
    <div className="flex-1 min-w-[200px] xs:min-w-[500px]">
      <Label htmlFor="search" className="sr-only">Search</Label>
      <div className="relative">
        <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          id="search"
          placeholder="Search sessions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8 pr-8"
        />
        {search && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1 h-7 w-7 p-0"
            onClick={() => setSearch('')}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

export default SearchInput
