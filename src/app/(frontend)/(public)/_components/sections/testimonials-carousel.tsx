import BlurFade from "@/components/magicui/blur-fade";
import Section from "../section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// import Image from "next/image";
import { MdOutlineFormatQuote } from "react-icons/md";

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Netflix",
  "YouTube",
  "Instagram",
  "Uber",
  "Spotify",
];

const testimonies = [
  {
    text: 'The Advent UNconference touched my heart in ways I didn\'t expect. Connecting with others who share the same passion and urgency for Christ\'s return filled me with a renewed sense of purpose and hope. The personal stories, the shared struggles, and the collective prayers created a powerful atmosphere that moved me deeply. I left feeling not only inspired but profoundly connected to a community that truly understands the times we\'re living in.',
    name: 'Danella Taylor',
    position: 'UNconference Attendee'
  },
  {
    text: 'At the event practical, actionable strategies were discussed in detail. The emphasis on collaboration and real-world application made it clear how we can effectively hasten the Lord\'s return through coordinated efforts. This event isn\'t just about theory—it\'s about results. The insights gained here have already begun to bear fruit in my ministry.',
    name: 'Rob Bertholf',
    position: 'UNconference Attendee'
  },
  {
    text: 'Engaging with like-minded individuals who are equally committed to living and sharing the truth in these last days has strengthened my faith and sharpened my focus. This experience is essential for anyone serious about their spiritual growth and leadership in these times.',
    name: 'Mihcael Presecan',
    position: 'UNconference Attendee'
  }
]

export default function Component() {
  return (
    <Section
      title="Testimonial Highlight"
      subtitle="What our participants are saying"
    >
      <Carousel>
        <div className="max-w-2xl mx-auto">
          <CarouselContent>
            {testimonies.map((testimony, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className=" text-center">
                    <MdOutlineFormatQuote className="text-4xl text-themeDarkGray my-4 mx-auto" />
                    <BlurFade delay={0.25} inView>
                      <h4 className="text-1xl font-semibold">
                        {testimony.text}
                      </h4>
                    </BlurFade>
                    {/*<BlurFade delay={0.25 * 2} inView>*/}
                    {/*  <div className="mt-8">*/}
                    {/*    <Image*/}
                    {/*      width={0}*/}
                    {/*      height={40}*/}
                    {/*      key={index}*/}
                    {/*      src={`https://cdn.magicui.design/companies/${*/}
                    {/*        companies[index % companies.length]*/}
                    {/*      }.svg`}*/}
                    {/*      alt={`${companies[index % companies.length]} Logo`}*/}
                    {/*      className="mx-auto w-auto h-[40px] grayscale opacity-30"*/}
                    {/*    />*/}
                    {/*  </div>*/}
                    {/*</BlurFade>*/}
                    <div className="">
                      <BlurFade delay={0.25 * 2} inView>
                        <h4 className="text-1xl font-semibold my-2">
                          {testimony.name}
                        </h4>
                      </BlurFade>
                    </div>
                    <BlurFade delay={0.25 * 3} inView>
                      <div className=" mb-3">
                        <span className="text-sm text-themeDarkGray">
                          {testimony.position}
                        </span>
                      </div>
                    </BlurFade>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
        <div className="md:block hidden">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </Section>
  );
}
