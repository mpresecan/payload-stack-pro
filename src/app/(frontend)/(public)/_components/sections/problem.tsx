import BlurFade from "@/components/magicui/blur-fade";
import Section from "../section";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Lightbulb, Users } from "lucide-react";

const problems = [
  {
    title: "Participant-Driven Events",
    description:
      "Shape the topics and discussions that matter most to you and your faith journey.",
    icon: Calendar,
  },
  {
    title: "Community Connection",
    description:
      "Connect with like-minded believers committed to hastening Christ's return.",
    icon: Users,
  },
  {
    title: "Practical Spiritual Growth",
    description:
      "Gain insights on country living, health, and missional business to align your life with God's plan.",
    icon: Lightbulb,
  },
];

export default function Component() {
  return (
    <Section
      title="MOTIVATION"
      subtitle="Why join advent UNconference?"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {problems.map((problem, index) => (
          <BlurFade key={index} delay={0.2 + index * 0.2} inView>
            <Card className="bg-background border-none shadow-none">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <problem.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{problem.title}</h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}
