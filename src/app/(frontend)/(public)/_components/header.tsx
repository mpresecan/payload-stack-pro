'use client'

import { buttonVariants } from '@/components/ui/button'

import { cn } from '@/utilities/cn'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Drawer from './drawer'
import { LOGIN_PAGE, SIGNUP_PAGE } from '@/app/(frontend)/(auth)/_config/routes'
import { BiSolidChevronsRight } from 'react-icons/bi'
import { Link } from 'next-view-transitions'
import Menu from '../_components/menu'

const ease = [0.16, 1, 0.3, 1];

export default function Header({ className }: { className?: string }) {
  const [addBorder, setAddBorder] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setAddBorder(true)
      } else {
        setAddBorder(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={cn('sticky top-0 z-50 py-2 bg-background/60 backdrop-blur', className)}
    >
      <motion.div
        className="flex justify-between items-center container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1, ease }}
      >
        <Link
          href="/"
          title="brand-logo"
          className="relative mr-6 flex items-center justify-center"
        >
          <BiSolidChevronsRight size={27} className="text-primary" />
          <span className="text-xl">advent</span><span className="text-xl text-primary">conference</span>
        </Link>

        <div className="hidden lg:block">
          <div className="flex items-center ">
            <nav className="mr-10">
              <Menu />
            </nav>

            <div className="gap-2 flex">
              <Link
                href={LOGIN_PAGE}
                className={buttonVariants({ variant: 'outline' })}
              >
                Login
              </Link>
              <Link
                href={SIGNUP_PAGE}
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'w-full sm:w-auto text-background flex gap-2',
                )}
              >
                <BiSolidChevronsRight className="h-5 w-5" />
                Get Started
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-2 cursor-pointer block lg:hidden">
          <Drawer />
        </div>
      </motion.div>
      <hr
        className={cn(
          'absolute w-full bottom-0 transition-opacity duration-300 ease-in-out',
          addBorder ? 'opacity-100' : 'opacity-0',
        )}
      />
    </header>
  )
}
