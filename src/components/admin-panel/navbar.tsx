import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { AddButton } from '@/components/admin-panel/add-button'
import { sessionUser } from '@/app/(frontend)/(auth)/_lib/auth'

interface NavbarProps {
  title: string;
}

export async function Navbar({ title }: NavbarProps) {
  const user = await sessionUser();

  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0 flex-1 min-w-0">
          <SheetMenu />
          <h1 className="font-bold truncate text-ellipsis overflow-hidden max-w-[calc(100%-4rem)]">
            {title}
          </h1>
        </div>
        <div className="flex items-center justify-end space-x-2 shrink-0">
          <AddButton />
          <ModeToggle />
          {user && <UserNav user={user}/>}
        </div>
      </div>
    </header>
  );
}
