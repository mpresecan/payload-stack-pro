import Marquee from '@/components/magicui/marquee'
import Image from 'next/image'
import { Link } from 'next-view-transitions'

const companies = [
  {
    img: 'brand-advent-homesteads-fw',
    link: 'https://adventhomesteads.com',
  },
  {
    img: 'brand-advent-leaders-fw',
    link: 'https://adventleaders.com',
  },
  {
    img: 'brand-advent-truths-fw',
    link: 'https://adventtruths.com',
  },
  {
    img: 'brand-advent-life-fw',
    link: 'https://adventlife.com',
  },
  {
    img: 'brand-advent-outposts-fw',
    link: 'https://adventoutposts.com',
  },
  {
    img: 'brand-advent-outreach-fw',
    link: 'https://adventoutreach.com',
  },
]

export default function Logos() {
  return (
    <section id="logos">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <h3 className="text-center text-sm font-semibold text-gray-500">
          PART OF THE ADVENT ECOSYSTEM
        </h3>
        <div className="relative mt-6">
          <Marquee className="max-w-full [--duration:40s]">
            {companies.map((logo, idx) => (
              <Link href={logo.link} key={idx} target='_blank'>
                <Image
                  key={idx}
                  width={112}
                  height={40}
                  src={`/${logo.img}.png`}
                  className="h-14 w-44 opacity-60 hover:opacity-100 transition-all duration-400 ease-in-out saturate-0 hover:saturate-100"
                  alt={logo.img}
                />
              </Link>
            ))}
          </Marquee>
          <div
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/3 bg-gradient-to-r from-background"></div>
          <div
            className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/3 bg-gradient-to-l from-background"></div>
        </div>
      </div>
    </section>
  )
}
