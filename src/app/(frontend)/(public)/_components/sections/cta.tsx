import { Icons } from "../icons";
import Section from "../section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utilities/cn";
import Link from "next/link";
import { REGISTRATION_PAGE } from '@/app/(frontend)/(auth)/_config/routes'

export default function CtaSection() {
  return (
    <Section
      id="cta"
      title="Ready to get started?"
      subtitle="Signup for the waiting list, or register for the 2nd annual unconference."
      className="bg-primary/10 rounded-xl py-16"
    >
      <div className="flex flex-col w-full sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
        <Link
          href={REGISTRATION_PAGE}
          className={cn(
            buttonVariants({ variant: "default" }),
            "w-full sm:w-auto text-background flex gap-2"
          )}
        >
          <Icons.logo className="h-6 w-6" />
          Get started
        </Link>
      </div>
    </Section>
  );
}
