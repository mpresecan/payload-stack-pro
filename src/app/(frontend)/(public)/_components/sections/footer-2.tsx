import { Link } from 'next-view-transitions'
import { BiSolidChevronsRight } from 'react-icons/bi'

const footerLinks: { id: number; title: string; url: string }[][] = [
  [
    { id: 1, title: '2nd Annual Advent UNconference', url: 'https://adventleaders.com/unconference' },
    { id: 2, title: 'Operation HASTEN', url: 'https://adventleaders.com/operation-hasten' },
    { id: 3, title: 'Travel Guide', url: 'https://adventleaders.com/unconference/location' },
    { id: 4, title: 'Tribe of Issachar', url: 'https://adventleaders.com/think-tank' },
  ],
]

export function Footer() {

  return (
    <footer className="px-7 py-10 md:px-10">
      <div
        className=" mx-auto flex max-w-6xl flex-col gap-x-5 gap-y-10 md:items-start md:justify-between lg:flex-row lg:px-10 xl:px-0">
        <div className="flex w-full flex-col items-start justify-start gap-y-5 md:w-1/2 lg:w-1/3">
          <Link href="/" className="flex items-center">
            <BiSolidChevronsRight size={27} className="text-primary" />
            <span className="text-xl">advent</span><span className="text-xl text-primary">conference</span>
          </Link>
          <p className="tracking-tight text-neutral-900 dark:text-white">
            Hastening Christ&apos;s Return
          </p>
          <p className="text-muted-foreground text-sm italic">All right reserved</p>
        </div>

        <div className="mt-2.5 flex items-center justify-start gap-x-10">
          {footerLinks.map((column, columnIndex) => (
            <ul key={columnIndex} className="flex flex-col gap-y-2">
              {column.map((link) => (
                <li
                  key={link.id}
                  className="text-[15px]/normal font-medium text-neutral-400 transition-all duration-100 ease-linear hover:text-neutral-900 hover:underline hover:underline-offset-4 dark:font-medium dark:text-neutral-400 hover:dark:text-neutral-100"
                >
                  <Link href={link.url} target='_blank'>{link.title}</Link>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className="mt-2.5 flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <p className="text-lg font-bold">Contact us</p>
            <p className="font-normal text-neutral-500 dark:font-medium">
              Reach us through email
            </p>
            <div className="flex items-center gap-x-2 pt-2">
              <Link href='mailto:info@adventconference.com' className='italic'>info@adventconference.com</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
