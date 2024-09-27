import Features from "../features-vertical";
import Section from "../section";
import { Heart, Users, Calendar } from "lucide-react";

const data = [
  {
    id: 1,
    title: "1. Create a Session Proposal",
    content:
      "Share what's on your heart. Write down your topic and provide details to attract interest in your session-item.",
    image: "/dashboard.png",
    icon: <Heart className="w-6 h-6 text-primary" />,
  },
  {
    id: 2,
    title: "2. Gather Interest",
    content:
      "Community members vote and comment on your proposal. Once enough interest is shown, you can start planning the schedule.",
    image: "/dashboard.png",
    icon: <Users className="w-6 h-6 text-primary" />,
  },
  {
    id: 3,
    title: "3. Schedule Your Session",
    content:
      "Propose dates that work for you. Interested participants will choose the best fit, finalizing your session-item's date and time.",
    image: "/dashboard.png",
    icon: <Calendar className="w-6 h-6 text-primary" />,
  },
];

export default function Component() {
  return (
    <Section title="How it works" subtitle="Just 3 steps to get started">
      <Features data={data} />
    </Section>
  );
}
