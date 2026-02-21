import { Brain, Code, Zap, BarChart3, Bot, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: <Brain className="w-8 h-8 text-primary" />,
    title: "AI-Powered Applications",
    description: "Custom AI solutions including Gen AI, NLP, RAG systems and multimodal AI applications for real world problems.",
    features: ["Computer Vision (ViT, CNN)", "RAG & LLM Integration", "Multimodal AI", "Medical AI Diagnostics"]
  },
  {
    icon: <Code className="w-8 h-8 text-primary" />,
    title: "Full-Stack Web Development",
    description: "Modern web applications with MERN stack, FastAPI backends and scalable cloud deployments on AWS and Vercel.",
    features: ["MERN Stack", "FastAPI + React", "Cloud Deployment", "Real time Applications"]
  },
  {
    icon: <Bot className="w-8 h-8 text-primary" />,
    title: "AI Agents & Automation",
    description: "Intelligent agents and automation workflows using LangChain, LangGraph, n8n and Telegram bot integrations.",
    features: ["LangGraph Agents", "n8n Workflows", "Telegram Bots", "API Integrations"]
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
    title: "Machine Learning Solutions",
    description: "ML models for prediction, classification and data analysis with deployment ready web interfaces.",
    features: ["Predictive Models", "Classification Systems", "Data Analysis", "ML Web Apps"]
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Computer Vision Solutions",
    description: "Advanced computer vision solutions using ViT, YOLOv8, CNN and Deep Learning techniques for image analysis and processing.",
    features: ["Object Detection (YOLOv8)", "Medical Image Analysis", "Video Processing", "Real time Classification"]
  },
  {
    icon: <Globe className="w-8 h-8 text-primary" />,
    title: "SaaS Solutions",
    description: "End-to-end SaaS development from discovery and design to deployment and scaling with multi-tenant architectures.",
    features: ["Multi-tenant Systems", "Subscription Integration", "Scalable Cloud Infra", "API First Design"]
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

