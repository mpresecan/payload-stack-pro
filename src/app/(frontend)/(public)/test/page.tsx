'use client'

import React from 'react'
import { Button } from '@/components/ui/button'

const Page = () => {
  const handleClick = async () => {
    await fetch('/auth/api/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: 'm_presecan@yahoo.com',
        password: 'kkxtaoxfer2',
      })
    })
  }

  return (
    <div>
      Hello all

      <Button onClick={handleClick}>Click me</Button>
    </div>
  )
}

export default Page
