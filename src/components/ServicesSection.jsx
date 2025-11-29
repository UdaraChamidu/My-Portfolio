import { Brain, Code, Zap, BarChart3, Bot, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: <Brain className="w-8 h-8 text-primary" />,
    title: "AI & Machine Learning Solutions",
    description: "Custom AI models, predictive analytics, computer vision, and NLP applications tailored to your business needs.",
    features: ["Neural Networks", "Computer Vision", "Natural Language Processing", "Predictive Analytics"]
  },
  {
    icon: <Code className="w-8 h-8 text-primary" />,
    title: "Full-Stack Web Development",
    description: "Modern web applications built with MERN stack, responsive design, and scalable architecture.",
    features: ["React/Next.js", "Node.js/Express", "MongoDB", "RESTful APIs"]
  },
  {
    icon: <Bot className="w-8 h-8 text-primary" />,
    title: "AI Automation & Agents",
    description: "Intelligent automation solutions using LangChain, n8n, and custom AI agents for workflow optimization.",
    features: ["Workflow Automation", "AI Agents", "Integration Solutions", "Process Optimization"]
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
    title: "Data Analysis & Visualization",
    description: "Transform your data into actionable insights with advanced analytics and interactive dashboards.",
    features: ["Data Processing", "Statistical Analysis", "Interactive Dashboards", "Business Intelligence"]
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Rapid Prototyping",
    description: "Quick MVP development and proof-of-concept projects to validate your ideas before full-scale development.",
    features: ["MVP Development", "Proof of Concept", "Technical Feasibility", "Quick Iterations"]
  },
  {
    icon: <Globe className="w-8 h-8 text-primary" />,
    title: "Consultation & Strategy",
    description: "Technical consultation, architecture planning, and strategic guidance for your digital transformation.",
    features: ["Tech Strategy", "System Architecture", "Code Review", "Technology Selection"]
  }
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What I Can <span className="text-primary">Build For You</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Leveraging my expertise in AI, ML, and software engineering to create innovative solutions
            that drive your business forward. Let's turn your ideas into reality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl border bg-card hover:bg-card/80 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold ml-4">{service.title}</h3>
              </div>

              <p className="text-muted-foreground mb-4 leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-primary">Key Capabilities:</h4>
                <ul className="space-y-1">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-muted-foreground flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Have a specific project in mind? Let's discuss how we can bring it to life.
          </p>
          <a href="#contact" className="cosmic-button">
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
};