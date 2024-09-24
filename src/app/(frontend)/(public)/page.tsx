import { generateMetadata } from '@/app/(frontend)/(public)/[slug]/page'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { sessionUser } from '@/app/(frontend)/(auth)/_lib/auth'
import { ArrowRight, Calendar, Lightbulb, Users } from 'lucide-react'
export { generateMetadata }

const Page = async () => {

  const user = await sessionUser()

  return (
    <main className="flex-grow">
      <section className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{`Hastening Christ's Return`}</h1>
          <p className="text-xl md:text-2xl mb-8">Join our community-driven unconferences to deepen your faith and
            hasten His coming.</p>
          <Button size="lg" asChild>
            <Link href="/register">
              Register Now <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">What is an Advent UNconference?</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube-nocookie.com/embed/your-video-id"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join AdventConference?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Calendar className="mx-auto mb-4 h-12 w-12 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Participant-Driven Events</h3>
              <p>Shape the topics and discussions that matter most to you and your faith journey.</p>
            </div>
            <div className="text-center">
              <Users className="mx-auto mb-4 h-12 w-12 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Community Connection</h3>
              <p>Connect with like-minded believers committed to hastening Christ's return.</p>
            </div>
            <div className="text-center">
              <Lightbulb className="mx-auto mb-4 h-12 w-12 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Practical Spiritual Growth</h3>
              <p>Gain insights on country living, health, and missional business to align your life with God's plan.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary text-secondary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Faith Journey?</h2>
          <p className="text-xl mb-8">Join us at the next Advent UNconference in Berivoi, Romania, October 16-19.</p>
          <Button size="lg" variant="outline" asChild>
            <Link href="/register">
              Register Now <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

export default Page
