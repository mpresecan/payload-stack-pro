import { Icons } from "../icons";
import Section from "../section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utilities/cn";
import { SIGNUP_PAGE } from '@/app/(frontend)/(auth)/_config/routes'
import { Link } from "next-view-transitions";
import { BiSolidChevronsRight } from 'react-icons/bi'

export default function CtaSection() {
  return (
    <Section
      id="cta"
      title="Ready to get started?"
      subtitle="Signup for the waiting list, or register for the 3th annual unconference."
      className="bg-primary/10 rounded-xl py-16"
    >
      <div className="flex flex-col w-full sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
        <Link
          href={SIGNUP_PAGE}
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "w-full sm:w-auto text-background flex gap-2"
          )}
        >
          <BiSolidChevronsRight size={27} className="h-6 w-6" />
          Get started
        </Link>
      </div>
    </Section>
  );
}
