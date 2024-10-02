'use client'

import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { motion, useInView } from 'framer-motion'

import { cn } from '@/utilities/cn'
import { MdOutlineFormatQuote } from 'react-icons/md'
import Section from '@/app/(frontend)/(public)/_components/section'
import FlickeringGrid from '@/components/magicui/flickering-grid'

type TopicDataProps = {
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
      As <span className="bg-primary text-primary-foreground">the right hand of the third angel&apos;s message</span>, God&apos;s
      methods of treating disease will open doors for the entrance of present truth.
    </p>),
    source: '7T 59.1',
    subtitle: 'Utilizing God’s methods to treat disease and sin',
  },
  {
    title: 'Evangelism',
    quote: (<p className="text-balance">
      By <span className="text-primary">giving the gospel</span> to the world it is in our <span
      className="text-primary-foreground bg-primary">power to hasten</span> our Lord&apos;s return
    </p>),
    source: 'DA 633.3',
    subtitle: `The proclamation of the three angels’ messages`,
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
    subtitle: 'Seeking to make it approachable, actionable & sustainable.',
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


type AccordionItemProps = {
  children: React.ReactNode;
  className?: string;
} & Accordion.AccordionItemProps;

function AccordionItem({
                         children,
                         className,
                         ...props
                       }: AccordionItemProps & React.ComponentPropsWithoutRef<typeof Accordion.Item>) {
  return (
    <Accordion.Item
      className={cn(
        'mt-px overflow-hidden focus-within:relative focus-within:z-10',
        className,
      )}
      {...props}
    >
      {children}
    </Accordion.Item>
  )
}

type AccordionTriggerProps = {
  children: React.ReactNode;
  className?: string;
};

function AccordionTrigger({
                            children,
                            className,
                            ...props
                          }: AccordionTriggerProps & React.ComponentPropsWithoutRef<typeof Accordion.Trigger>) {
  return (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className={cn(
          'group flex h-[45px] flex-1 cursor-pointer items-center justify-between px-5 text-[15px] leading-none outline-none',
          className,
        )}
        {...props}
      >
        {children}
      </Accordion.Trigger>
    </Accordion.Header>
  )
}

type AccordionContentProps = {
  children: ReactNode;
  className?: string;
} & Accordion.AccordionContentProps;

function AccordionContent({
                            children,
                            className,
                            ...props
                          }: AccordionContentProps & React.ComponentPropsWithoutRef<typeof Accordion.Content>) {
  return (
    <Accordion.Content
      className={cn(
        'overflow-hidden text-[15px] font-medium data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down',
        className,
      )}
      {...props}
    >
      <div className="px-5 py-2">{children}</div>
    </Accordion.Content>
  )
}

type FeatureProps = {
  collapseDelay?: number;
  ltr?: boolean;
  linePosition?: 'left' | 'right';
};

const Feature = ({
                   collapseDelay = 5000,
                   ltr = false,
                   linePosition = 'left',
                 }: FeatureProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(-1)

  const carouselRef = useRef<HTMLUListElement>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    amount: 0.5,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isInView) {
        setCurrentIndex(0)
      } else {
        setCurrentIndex(-1)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [isInView])

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const card = carouselRef.current.querySelectorAll('.card')[index]
      if (card) {
        const cardRect = card.getBoundingClientRect()
        const carouselRect = carouselRef.current.getBoundingClientRect()
        const offset =
          cardRect.left -
          carouselRect.left -
          (carouselRect.width - cardRect.width) / 2

        carouselRef.current.scrollTo({
          left: carouselRef.current.scrollLeft + offset,
          behavior: 'smooth',
        })
      }
    }
  }

  // interval for changing images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex !== undefined ? (prevIndex + 1) % topics.length : 0,
      )
    }, collapseDelay)

    return () => clearInterval(timer)
  }, [currentIndex])

  useEffect(() => {
    const handleAutoScroll = () => {
      const nextIndex =
        (currentIndex !== undefined ? currentIndex + 1 : 0) % topics.length
      scrollToIndex(nextIndex)
    }

    const autoScrollTimer = setInterval(handleAutoScroll, collapseDelay)

    return () => clearInterval(autoScrollTimer)
  }, [currentIndex])

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      const handleScroll = () => {
        const scrollLeft = carousel.scrollLeft
        const cardWidth = carousel.querySelector('.card')?.clientWidth || 0
        const newIndex = Math.min(
          Math.floor(scrollLeft / cardWidth),
          topics.length - 1,
        )
        setCurrentIndex(newIndex)
      }

      carousel.addEventListener('scroll', handleScroll)
      return () => carousel.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Section
      title='Topics'
      subtitle='Are you able to contribute in these areas?'
    >
      <div className="mx-auto my-12 grid h-full max-w-5xl grid-cols-6 gap-x-5">
        <div
          className={`col-span-2 hidden md:flex ${
            ltr ? 'md:order-2 md:justify-end' : 'justify-start'
          }`}
        >
          <Accordion.Root
            className="w-[300px]"
            type="single"
            defaultValue={`item-${currentIndex}`}
            value={`item-${currentIndex}`}
            onValueChange={(value) =>
              setCurrentIndex(Number(value.split('-')[1]))
            }
          >
            {topics.map((topic, index) => (
              <AccordionItem
                key={index}
                className="relative mb-8 last:mb-0"
                value={`item-${index}`}
              >
                <div
                  className={`absolute bottom-0 top-0 h-full w-0.5 overflow-hidden rounded-lg bg-neutral-300/50 dark:bg-neutral-300/30 ${
                    linePosition === 'right'
                      ? 'left-auto right-0'
                      : 'left-0 right-auto'
                  }`}
                >
                  <div
                    className={`absolute left-0 top-0 w-full ${
                      currentIndex === index ? 'h-full' : 'h-0'
                    } origin-top bg-neutral-500 transition-all ease-linear dark:bg-white`}
                    style={{
                      transitionDuration:
                        currentIndex === index
                          ? `${collapseDelay}ms`
                          : '0s',
                    }}
                  ></div>
                </div>
                <AccordionTrigger className="text-xl font-bold">
                  {topic.title}
                </AccordionTrigger>
                <AccordionContent>{topic.subtitle}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion.Root>
        </div>
        <div
          className={`relative overflow-hidden col-span-6 h-[350px] min-h-[200px] w-auto md:col-span-4 ${
            ltr && 'md:order-1'} h-full`}
        >
          {topics[currentIndex]?.quote && (
            <motion.div
              key={currentIndex}
              className="aspect-auto h-full w-full flex flex-col justify-center items-center border rounded-lg border-border/70 p-8"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <FlickeringGrid
                className="z-0 absolute inset-0 [mask:radial-gradient(circle_at_center,#fff_400px,transparent_0)]"
                squareSize={4}
                gridGap={6}
                color="#000"
                maxOpacity={0.1}
                flickerChance={0.1}
                height={800}
                width={800}
              />
              <MdOutlineFormatQuote className="text-7xl text-muted-foreground my-4 mx-auto self-start" />
              <div className='text-xl text-muted-foreground text-center'>
                {topics[currentIndex]?.quote}
              </div>
              <div className='italic text-muted-foreground text-xl text-center mt-8'>
                {topics[currentIndex]?.source}
              </div>
            </motion.div>
          )}
        </div>

        <ul
          ref={carouselRef}
          className="col-span-5 flex h-full snap-x flex-nowrap overflow-x-auto py-10 [-ms-overflow-style:none] [-webkit-mask-image:linear-gradient(90deg,transparent,black_20%,white_80%,transparent)] [mask-image:linear-gradient(90deg,transparent,black_20%,white_80%,transparent)] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden snap-mandatory"
          style={{
            padding: '50px calc(50%)',
          }}
        >
          {topics.map((topic, index) => (
            <a
              key={index}
              className="card relative mr-8 grid h-full max-w-60 shrink-0 items-start justify-center py-4 last:mr-0"
              onClick={() => setCurrentIndex(index)}
              style={{
                scrollSnapAlign: 'center',
              }}
            >
              <div
                className="absolute bottom-0 left-0 right-auto top-0 h-0.5 w-full overflow-hidden rounded-lg bg-neutral-300/50 dark:bg-neutral-300/30">
                <div
                  className={`absolute left-0 top-0 h-full ${
                    currentIndex === index ? 'w-full' : 'w-0'
                  } origin-top bg-neutral-500 transition-all ease-linear dark:bg-white`}
                  style={{
                    transitionDuration:
                      currentIndex === index ? `${collapseDelay}ms` : '0s',
                  }}
                ></div>
              </div>
              <h2 className="text-xl font-bold">{topic.title}</h2>
              <p className="mx-0 max-w-sm text-balance text-sm">
                {topic.subtitle}
              </p>
            </a>
          ))}
        </ul>
      </div>
    </Section>
  )
}

export default function Topics() {
  return <Feature collapseDelay={5000} linePosition="left" />
}
