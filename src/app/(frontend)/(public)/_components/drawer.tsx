
import { buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { siteConfig } from "@/config/app";
import { cn } from "@/utilities/cn";
import Link from "next/link";
import { IoMenuSharp } from "react-icons/io5";
import { Icons } from "./icons";
import { BiSolidChevronsRight } from 'react-icons/bi'

export default function drawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger>
        <IoMenuSharp className="text-2xl" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="px-6">
          <div className="">
            <Link
              href="/"
              title="brand-logo"
              className="relative mr-6 flex items-center"
            >
              <BiSolidChevronsRight size={27} className="text-primary" />
              <span className="text-xl">advent</span><span className="text-xl text-primary">conference</span>
            </Link>
          </div>
          <nav>
            <ul className="mt-7 text-left">
              {siteConfig.header.map((item, index) => (
                <li key={index} className="my-3">
                  {item.trigger ? (
                    <span className="font-semibold">{item.trigger}</span>
                  ) : (
                    <Link href={item.href || ""} className="font-semibold">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </DrawerHeader>
        <DrawerFooter>
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline" })}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full sm:w-auto text-background flex gap-2"
            )}
          >
            <BiSolidChevronsRight className="h-5 w-5" />
            Get Started
          </Link>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
