import Link from 'next/link'
import { LOGIN_PAGE, SIGNUP_PAGE, REVERIFY_EMAIL_PAGE } from '@/app/(frontend)/(auth)/_config/routes'
import { cn } from '@/utilities/cn'
import { buttonVariants } from '@/components/ui/button'
import { MoveLeft } from 'lucide-react'

export const ErrorCallToAction = () => {
  return (
    <div className="grid gap-2">
      <Link
        aria-label="Go back to sign in page"
        href={SIGNUP_PAGE}
        className={cn(buttonVariants({variant: "secondary"}), "w-full")}
      >
        <MoveLeft className="mr-2 h-4 w-4"/>
        <span className="sr-only">Try again</span>
        Try again
      </Link>
      <Link
        aria-label="Go back to sign in page"
        href={REVERIFY_EMAIL_PAGE}
        className={buttonVariants({variant: "outline"})}
      >
        <span className="sr-only">Resend verification email</span>
        Resent verification email
      </Link>
    </div>
  );
}

export const SuccessCallToAction = () => {
  return (
    <div className="grid gap-2">
      <Link
        aria-label="Go back to sign in page"
        href={LOGIN_PAGE}
        className={buttonVariants()}
      >
        <span className="sr-only">Go to Sign In page</span>
        Go to Sign In page
      </Link>
    </div>
  );
}
