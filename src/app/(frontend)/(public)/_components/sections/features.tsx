import Topics from "../topics-horizontal";
import Section from "../section";
import { ReactNode } from 'react'

export type TopicDataProps = {
  title: string;
  quote: ReactNode;
  source: string;
  subtitle: string;
}

const topics: TopicDataProps[] = [
  {
    title: 'True Education',
    quote: (<p className="text-balance">
      <span className="text-primary">Now,</span> as never before,
      <span
        className="text-primary-foreground bg-primary">we need to understand the true science of education.</span>
      <span
        className="underline">If we fail to understand this, we shall never have a place in the kingdom of God.</span>
    </p>),
    source: '12LtMs, Ms 76, 1897, par. 5',
    subtitle: 'Preparing a generation to Live the Gospel',
  },
  {
    title: 'Missional Business',
    quote: (<p className="text-balance">
      You have felt that business is business, religion is religion, but I tell you that these cannot be divorced… You
      are not to put asunder that which <span className="bg-primary text-primary-foreground">God has joined—business and religion</span>.
    </p>),
    source: '19MR 17.1',
    subtitle: 'Inspiring & Empowering Missional Entrepreneurship',
  },
  {
    title: 'Medical Ministry',
    quote: (<p className="text-balance">
      <span className="text-primary">Medical missionary work</span> is <span
      className="text-primary-foreground bg-primary">the right hand of the gospel</span>. It is necessary to the
      advancement of the cause of God... Every city is to be entered by workers trained to do medical missionary work.
      As <span className="bg-primary text-primary-foreground">the right hand of the third angel's message</span>, God's
      methods of treating disease will open doors for the entrance of present truth.
    </p>),
    source: '7T 59.1',
    subtitle: 'Healing from disease and sin',
  },
  {
    title: 'Evangelism',
    quote: (<p className="text-balance">
      By <span className="text-primary">giving the gospel</span> to the world it is in our <span
      className="text-primary-foreground bg-primary">power to hasten</span> our Lord's return
    </p>),
    source: 'DA 633.3',
    subtitle: `Most solemn import - the proclamation of the three angels’ messages`,
  },
  // {
  //   title: 'Agriculture',
  //   quote: (<p className='text-balance'>
  //     I have been shown that <span className='text-primary-foreground bg-primary'>study in agricultural lines</span> should be the A B and C of the educational work of our school. This is <span className='text-primary'>the very first work that must be entered upon</span>.
  //   </p>),
  //   source: '13LtMs, Ms 105, 1898, par. 2',
  //   subtitle: 'Self-Sufficiency & Character Building',
  // }
  {
    title: 'Country Living',
    quote: (<p className="text-balance">
      The Lord desires His people to <span className="text-primary-foreground bg-primary">move into the country</span>,
      where they can settle on the land, and <span className="text-primary">raise their own fruit and vegetables</span>,
      and where their children can be brought in direct contact with the works of God in nature. <span
      className="text-primary-foreground bg-primary">Take your families away from the cities</span>, is my message.
    </p>),
    source: '1MR 253.1',
    subtitle: 'Seeking to make country living approachable, actionable & sustainable.',
  },
  {
    title: 'Church Support',
    quote: (<p className="text-balance">
      <span className="bg-primary text-primary-foreground">God has a church upon the earth</span>, made up of his
      chosen, <span className="bg-primary text-primary-foreground">commandment-keeping people</span>. He is leading not
      to stray offshoots, not one here and there, but a people. The truth is a sanctifying power, but <span
      className="text-primary">the church militant is not the church triumphant</span>.
    </p>),
    source: 'EA 103.1',
    subtitle: 'Guiding the church through the shaking time',
  },
]

export default function Component() {
  return (
    <Section title="Topics" subtitle="Are you able to contribute in these areas?">
      <Topics collapseDelay={5000} linePosition="bottom" topics={topics} />
    </Section>
  );
}
