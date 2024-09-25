import Section from '../section'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { siteConfig } from '@/config/app'

const faqs = [
  {
    question: 'What is the Advent UNconference?',
    answer: (
      <span>
          The Advent UNconference is a participant-driven event designed to foster collaboration and spiritual growth within the Seventh-day Adventist community. Unlike traditional conferences with pre-set agendas, the topics at the UNconference are proposed by attendees and voted on each day, allowing for dynamic discussions and practical workshops that align with the participants’ interests.
        </span>
    ),
  },
  {
    question: 'Who can attend the Advent UNconference?',
    answer: (
      <span>
          The Advent UNconference is open to all members of the Seventh-day Adventist community who are passionate about deepening their faith and preparing for Christ’s return. It is especially suited for innovators, thought leaders, and early adopters who are already taking action and want to engage in meaningful discussions on topics such as sustainable living, health, education, and missional business.
        </span>
    ),
  },
  {
    question: 'What topics are discussed at the UNconference?',
    answer: (
      <span>
        Topics are proposed by attendees and can range widely, but they often focus on areas like <strong>Country Living, Health & Healing, Missional Business, True Education, and Outposts governance</strong>. The format ensures that the discussions are relevant and directly applicable to the challenges facing the community today.
        </span>
    ),
  },
  {
    question: 'Where and when is the next Advent UNconference?',
    answer: (
      <span>
        The next Advent UNconference will be held in-person at <strong>Advent Center, Berivoi, Romania, from October 16-19</strong>. Participants are encouraged to register in advance to secure their spot and to contribute to shaping the event by proposing discussion topics.
        </span>
    ),
  },
  {
    question: 'How can I get involved in the AdventConference.com community?',
    answer: (
      <span>
          To get involved, you can start by applying to join the community. Once accepted, you can introduce yourself, share your spiritual journey, and participate in planning and attending the next UNconference. You can also stay connected and contribute by engaging in ongoing discussions with fellow attendees.
        </span>
    ),
  },
]

export default function FAQ() {
  return (
    <Section title="FAQ" subtitle="Frequently asked questions">
      <div className="mx-auto my-12 md:max-w-[800px]">
        <Accordion
          type="single"
          collapsible
          className="flex w-full flex-col items-center justify-center space-y-2"
        >
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={faq.question}
              className="w-full border rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <h4 className="mb-12 text-center text-sm font-medium tracking-tight text-foreground/80">
        Still have questions? Email us at{' '}
        <a href={`mailto:${siteConfig.links.email}`} className="underline">
          {siteConfig.links.email}
        </a>
      </h4>
    </Section>
  )
}
