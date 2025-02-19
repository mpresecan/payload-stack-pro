type HeaderItemBase = {
  trigger?: string;
  href?: string;
  label?: string;
  newTab?: boolean;
};

type HeaderItemWithTrigger = HeaderItemBase & {
  trigger: string;
  content: {
    main?: {
      icon: React.ReactNode;
      title: string;
      description: string;
      href: string;
    };
    items: Array<{
      href: string;
      title: string;
      description: string;
    }>;
  };
};

type HeaderItemWithoutTrigger = HeaderItemBase & {
  trigger?: undefined;
  href: string;
  label: string;
};

type HeaderItem = HeaderItemWithTrigger | HeaderItemWithoutTrigger;


const links = {
  github:
    "https://github.com/mpresecan/payloadstack",
  twitter: "https://twitter.com/michaelpresecan",
  linkedin: "https://www.linkedin.com/in/michaelpresecan",
  discord: "",
  authorsWebsite: "https://michaelpresecan.com",
  authorsGitHub: "https://github.com/mpresecan",
  openGraphImage: "https://saasyland.com/images/opengraph-image.png",
  email: 'info@adventconference.com'
}

const companyLegals = {
  name: 'Fortbit d.o.o',
  address: 'Gradiščak 31 A, Gradiščak, 40313, Sveti Martin na Muri, Croatia',
}

const logo = {
  png: "https://forgotten-pillar.s3.us-east-2.amazonaws.com/Group+9.jpg",
  svg: "/images/logo.svg",
}

export const siteConfig = {
  name: "Advent Conference",
  description:
    "Hastening Christ's return",
  links,
  logo,
  url: "https://adventconference.com",
  supportEmail: "info@adventconference.com",
  ogImage: links.openGraphImage,
  author: "mpresecan",
  hostingRegion: "fra1",
  keywords: ["Seventh-day Adventists", "SDA", "Conference", "UNconference", "Adventist", "Advent", "Advent Conference", "hastening Christ's return"],
  companyLegals,
  header: [
    // {
    //   trigger: "Features",
    //   content: {
    //     main: {
    //       icon: '',
    //       title: "AI-Powered Automation",
    //       description: "Streamline your workflow with intelligent automation.",
    //       href: "#",
    //     },
    //     items: [
    //       {
    //         href: "#",
    //         title: "Task Automation",
    //         description: "Automate repetitive tasks and save time.",
    //       },
    //       {
    //         href: "#",
    //         title: "Workflow Optimization",
    //         description: "Optimize your processes with AI-driven insights.",
    //       },
    //       {
    //         href: "#",
    //         title: "Intelligent Scheduling",
    //         description: "AI-powered scheduling for maximum efficiency.",
    //       },
    //     ],
    //   },
    // },
    // {
    //   trigger: "Solutions",
    //   content: {
    //     items: [
    //       {
    //         title: "For Small Businesses",
    //         href: "#",
    //         description: "Tailored automation solutions for growing companies.",
    //       },
    //       {
    //         title: "Enterprise",
    //         href: "#",
    //         description: "Scalable AI automation for large organizations.",
    //       },
    //       {
    //         title: "Developers",
    //         href: "#",
    //         description: "API access and integration tools for developers.",
    //       },
    //       {
    //         title: "Healthcare",
    //         href: "#",
    //         description: "Specialized automation for healthcare workflows.",
    //       },
    //       {
    //         title: "Finance",
    //         href: "#",
    //         description: "AI-driven process automation for financial services.",
    //       },
    //       {
    //         title: "Education",
    //         href: "#",
    //         description:
    //           "Streamline administrative tasks in educational institutions.",
    //       },
    //     ],
    //   },
    // },
    // {
    //   href: "https://adventleaders.com/unconference",
    //   label: "3th Annual Advent UNconference",
    //   newTab: false,
    // },
  ] as HeaderItem[],
  footer: [
    {
      title: "Product",
      links: [
        { href: "#", text: "Features", icon: null },
        { href: "#", text: "Pricing", icon: null },
        { href: "#", text: "Documentation", icon: null },
        { href: "#", text: "API", icon: null },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "#", text: "About Us", icon: null },
        { href: "#", text: "Careers", icon: null },
        { href: "#", text: "Blog", icon: null },
        { href: "#", text: "Press", icon: null },
        { href: "#", text: "Partners", icon: null },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "#", text: "Community", icon: null },
        { href: "#", text: "Contact", icon: null },
        { href: "#", text: "Support", icon: null },
        { href: "#", text: "Status", icon: null },
      ],
    },
    {
      title: "Social",
      links: [
        {
          href: "#",
          text: "Twitter",
        },
        {
          href: "#",
          text: "Instagram",
        },
        {
          href: "#",
          text: "Youtube",
        },
      ],
    },
  ],
}
