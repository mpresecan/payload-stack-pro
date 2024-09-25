
const links = {
  github:
    "https://github.com/mpresecan/payloadstack",
  twitter: "https://twitter.com/michaelpresecan",
  linkedin: "https://www.linkedin.com/in/michaelpresecan",
  discord: "",
  authorsWebsite: "https://michaelpresecan.com",
  authorsGitHub: "https://github.com/mpresecan",
  openGraphImage: "https://saasyland.com/images/opengraph-image.png",
}

const companyLegals = {
  name: 'ACME Inc.',
  address: '1234 Main St, Springfield, IL 62701',
}

const logo = {
  png: "https://react-email-demo-7s5r0trkn-resend.vercel.app/static/yelp-logo.png",
  svg: "/images/logo.svg",
}

export const siteConfig = {
  name: "Payload Stack",
  description:
    "NextJS on rails boiler place by Payload Stack.",
  links,
  logo,
  url: "https://payloadstack.com",
  supportEmail: "info@payloadstack.com",
  ogImage: links.openGraphImage,
  author: "mpresecan",
  hostingRegion: "fra1",
  keywords: ["SaaS", "Next.js", "Template", "Boilerplate"],
  companyLegals,
  header: [
    {
      trigger: "Features",
      content: {
        main: {
          icon: '',
          title: "AI-Powered Automation",
          description: "Streamline your workflow with intelligent automation.",
          href: "#",
        },
        items: [
          {
            href: "#",
            title: "Task Automation",
            description: "Automate repetitive tasks and save time.",
          },
          {
            href: "#",
            title: "Workflow Optimization",
            description: "Optimize your processes with AI-driven insights.",
          },
          {
            href: "#",
            title: "Intelligent Scheduling",
            description: "AI-powered scheduling for maximum efficiency.",
          },
        ],
      },
    },
    {
      trigger: "Solutions",
      content: {
        items: [
          {
            title: "For Small Businesses",
            href: "#",
            description: "Tailored automation solutions for growing companies.",
          },
          {
            title: "Enterprise",
            href: "#",
            description: "Scalable AI automation for large organizations.",
          },
          {
            title: "Developers",
            href: "#",
            description: "API access and integration tools for developers.",
          },
          {
            title: "Healthcare",
            href: "#",
            description: "Specialized automation for healthcare workflows.",
          },
          {
            title: "Finance",
            href: "#",
            description: "AI-driven process automation for financial services.",
          },
          {
            title: "Education",
            href: "#",
            description:
              "Streamline administrative tasks in educational institutions.",
          },
        ],
      },
    },
    {
      href: "/blog",
      label: "Blog",
    },
  ],
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
