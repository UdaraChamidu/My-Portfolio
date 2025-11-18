import { Rocket, Target, BookOpen, Lightbulb } from "lucide-react";

const plans = [
  {
    id: 1,
    title: "Master Agentic AI",
    description: "Deepen expertise in building autonomous multi agent systems and complex reasoning workflows using LangChain and LangGraph.",
    icon: <Target className="w-6 h-6 text-primary" />,
  },
  {
    id: 2,
    title: "Contribute to Open Source",
    description: "Actively contribute to major AI/ML repositories (like Hugging Face or LangChain) to give back to the community.",
    icon: <Rocket className="w-6 h-6 text-primary" />,
  },
  {
    id: 3,
    title: "Complete the Internship",
    description: "The internship on Software Engineering + AI/ML with Idea8 Pvt Ltd completing with hands on knowledge and experiences.",
    icon: <BookOpen className="w-6 h-6 text-primary" />,
  },
  {
    id: 4,
    title: "Launch an AI SaaS",
    description: "Develop and deploy a full scale, production ready AI SaaS product that solves a specific real world problem.",
    icon: <Lightbulb className="w-6 h-6 text-primary" />,
  },
];

export const FuturePlansSection = () => {
  return (
    <section id="future-plans" className="py-24 px-4 relative bg-secondary/20">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Future <span className="text-primary">Plans</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="group bg-card p-6 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  {plan.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {plan.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {plan.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};