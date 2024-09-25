import Marquee from "@/components/magicui/marquee";
import Image from "next/image";

const companies = [
  "brand-advent-homesteads-fw",
  "brand-advent-leaders-fw",
  "brand-advent-truths-fw",
  "brand-advent-life-fw",
  "brand-advent-outposts-fw",
  "brand-advent-outreach-fw",
];

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
              <Image
                key={idx}
                width={112}
                height={40}
                src={`/${logo}.png`}
                className="h-14 w-44 opacity-60 hover:opacity-100 transition-all duration-400 ease-in-out saturate-0 hover:saturate-100"
                alt={logo}
              />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/3 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/3 bg-gradient-to-l from-background"></div>
        </div>
      </div>
    </section>
  );
}
