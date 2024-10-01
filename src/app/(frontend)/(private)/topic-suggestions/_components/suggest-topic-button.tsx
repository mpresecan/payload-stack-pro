import React from 'react'
import { Link } from 'next-view-transitions'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import TopDown from '@/components/animations/top-down'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const SuggestTopicButton = () => {
  return (
    <TopDown delay={0.1}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button asChild className="grow-0 ms-8">
              <Link href="#"><PlusIcon className="mr-2 h-4 w-4" />Suggest Topic</Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            I want to learn about...
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </TopDown>
  )
}

export default SuggestTopicButton
