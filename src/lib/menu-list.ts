import {
  Users,
  Settings,
  LucideIcon, NotebookText, Info, Flame, ChevronsDown, Navigation, User,
} from 'lucide-react'

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
  submenus: Submenu[];
  newTab?: boolean;
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/sessions",
          label: "Sessions",
          active: pathname.includes("/sessions"),
          icon: NotebookText,
          submenus: []
        },
        {
          href: "/topic-suggestions",
          label: "Topic Suggestions",
          active: pathname.includes("/topic-suggestions"),
          icon: Flame,
          submenus: []
        },
        {
          href: "/attendees",
          label: "Attendees",
          active: pathname.includes("/attendees"),
          icon: Users,
          submenus: []
        },
      ]
    },
    {
      groupLabel: "Info",
      menus: [
        {
          href: "https://adventleaders.com/unconference",
          label: "About UNconference",
          active: pathname.includes("/info"),
          icon: Info,
          submenus: [],
          newTab: true,
        },
        {
          href: "https://adventleaders.com/operation-hasten",
          label: "Operation HASTEN",
          active: pathname.includes("/operation-hasten"),
          icon: ChevronsDown,
          submenus: [],
          newTab: true,
        },
        {
          href: "https://adventleaders.com/unconference/location",
          label: "Travel Guide",
          active: pathname.includes("/location"),
          icon: Navigation,
          submenus: [],
          newTab: true,
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/profile",
          label: "My Profile",
          active: pathname.includes("/profile"),
          icon: User,
          submenus: []
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: []
        }
      ]
    }
  ];
}
