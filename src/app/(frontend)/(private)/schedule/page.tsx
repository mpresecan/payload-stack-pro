import React from 'react'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { FaGoogle } from 'react-icons/fa6'
import { ImCalendar } from 'react-icons/im'
import { Metadata } from 'next'
import ProposeSessionButton from '@/app/(frontend)/(private)/sessions/_components/propose-session-button'

const domain = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(domain),
  title: "Schedule",
  description: "Event Schedule",
}

const SchedulePage = () => {
  return (
    <ContentLayout title="3th Annual Advent UNconference, Berivoi, Apr 23-27, 2025">
      <div className="container mx-auto p-0 max-w-3xl">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-black mb-6">Schedule</h1>
        </div>
        <Card className="sm:mb-8" standAlone>
          <CardHeader standAlone className="space-y-4">
            <p className="text-muted-foreground text-sm italic">To keep up with the fluid nature of our UNconference,
              please import the dynamic schedule directly to your Google calendar using the link below.</p>
            <div className="flex gap-2 mb-4">
              <Button variant="outline" className="" asChild>
                <Link
                  href="https://calendar.google.com/calendar/u/0?cid=Njk2YjRhNTBkY2FjMDE3M2Q1MzExNTc4Y2NmMjhlYjRjYTljM2NjZTNkY2Y3OGJhMTBkYzU0ZmUyZmIyZWY4OUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
                  target="_blank" rel="noopener noreferrer"
                >
                  <FaGoogle className="mr-2" />
                  Sharable Google Calendar
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link
                  href='https://calendar.google.com/calendar/embed?src=696b4a50dcac0173d5311578ccf28eb4ca9c3cce3dcf78ba10dc54fe2fb2ef89%40group.calendar.google.com&ctz=Europe%2FBucharest&bgcolor=%23ffffff&mode=WEEK'
                  target="_blank" rel="noopener noreferrer"
                >
                  <Calendar size={20} className="mr-2" />
                  Public URL
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link
                  href='https://calendar.google.com/calendar/ical/696b4a50dcac0173d5311578ccf28eb4ca9c3cce3dcf78ba10dc54fe2fb2ef89%40group.calendar.google.com/public/basic.ics'
                  target="_blank" rel="noopener noreferrer"
                >
                  <ImCalendar size={20} className="mr-2" />
                  iCal
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent standAlone className="pt-2">
            <iframe
              src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FBucharest&bgcolor=%23ffffff&mode=WEEK&src=696b4a50dcac0173d5311578ccf28eb4ca9c3cce3dcf78ba10dc54fe2fb2ef89%40group.calendar.google.com"
              style={{ border: 0 }} width="720" height="600" frameBorder="0" scrolling="no"></iframe>
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  )
}

export default SchedulePage
