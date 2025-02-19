import {
  Users,
  Settings,
  LucideIcon, NotebookText, Info, Flame, ChevronsDown, Navigation, User, CalendarIcon, ShoppingBasket,
} from 'lucide-react'

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  newTab?: boolean;
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
        {
          href: "/schedule",
          label: "Schedule",
          active: pathname.includes("/schedule"),
          icon: CalendarIcon,
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
          href: "",
          label: "Watch before event!",
          active: pathname.includes("/operation-hasten"),
          icon: ChevronsDown,
          submenus: [
            {
              href: "https://www.youtube.com/watch?v=mklJ7c4AeRI&list=PL0r24EXiF0h2fEofH6KM--aNY8UBf43tZ",
              label: 'Outpost Planning Workshop',
              active: false,
              newTab: true,
            },
            {
              href: "https://adventleaders.com/operation-hasten",
              label: 'Operation HASTEN',
              active: false,
              newTab: true,
            },
          ],
          newTab: true,
        },
        {
          href: "",
          label: "Travel Guide",
          active: pathname.includes("/location"),
          icon: Navigation,
          submenus: [
            {
              href: "https://adventleaders.com/unconference/location",
              label: 'How to get to Berivoi',
              active: false,
              newTab: true,
            },
            {
              href: "https://docs.google.com/document/d/18YtcmNVoIvpNb012-tuogije2bE1prWzbTHb-bm2Xz0/edit?usp=sharing",
              label: 'Tourism Options',
              active: false,
              newTab: true,
            }
          ],
          newTab: true,
        },
        {
          href: "https://docs.google.com/document/d/16K6tivEV3_rIOctsLXJrss78zFvxrzrrcjFEVPRX2Co/edit?usp=sharing",
          label: 'Shopping List',
          active: pathname.includes("/shopping-list"),
          newTab: true,
          icon: ShoppingBasket,
          submenus: []
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
