import {
  BriefcaseBusiness,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;

    const serviceId = "service_qp0jrov";
    const userToYouTemplateId = "template_agqr49w";
    const autoReplyTemplateId = "template_zja5mq3";
    const publicKey = "TqR-vRWKOgnaZq2aA";

    const formData = {
      user_name: form.user_name.value,
      user_email: form.user_email.value,
      message: form.message.value,
    };

    // Send message to you
    emailjs
      .send(serviceId, userToYouTemplateId, formData, publicKey)
      .then(() => {
        // Send auto-reply to user
        return emailjs.send(
          serviceId,
          autoReplyTemplateId,
          formData,
          publicKey
        );
      })
      .then(() => {
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        });
        setIsSubmitting(false);
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        setIsSubmitting(false);
        toast({
          title: "Something went wrong",
          description: "Please try again later.",
          variant: "destructive",
        });
      });
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary"> Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Have a project, collaboration, or engineering opportunity in mind?
          Send a message and include a little context about what you need.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-card p-8 rounded-lg shadow-md space-y-8">
            <h3 className="text-2xl font-semibold mb-6 border-b border-muted-foreground pb-2">
              Contact Information
            </h3>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-left">Email</h4>
                  <a
                    href="mailto:chamiduudara321@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    chamiduudara321@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-left">Business</h4>
                  <a
                    href="https://veloxdy.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Veloxdy.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-left">Location</h4>
                  <a
                    href="https://www.google.com/maps/place/Kuliyapitiya,+Sri+Lanka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Kuliyapitiya, Sri Lanka
                  </a>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="pt-8 text-center">
              <h4 className="font-medium mb-4">Connect With Me</h4>
              <div className="flex items-center space-x-5 justify-center">
                <a
                  href="https://www.linkedin.com/in/udara-herath-530006217"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  title="LinkedIn"
                >
                  <Linkedin className="h-6 w-6 text-primary hover:text-primary/70 transition-colors" />
                </a>
                <a
                  href="https://github.com/UdaraChamidu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  title="GitHub"
                >
                  <Github className="h-6 w-6 text-primary hover:text-primary/70 transition-colors" />
                </a>
                <a
                  href="https://www.upwork.com/freelancers/~012b58cc3d56501f62?mp_source=share"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Upwork profile"
                  title="Upwork"
                >
                  <BriefcaseBusiness className="h-6 w-6 text-primary hover:text-primary/70 transition-colors" />
                </a>
                <a
                  href="https://medium.com/@chamiduudara321"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Medium profile"
                  title="Medium"
                  className="inline-flex h-6 w-7 items-center justify-center text-primary hover:text-primary/70 transition-colors"
                >
                  <span className="font-serif text-xl font-black leading-none">M</span>
                </a>
              </div>
            </div>
          </div>

          {/* Send a Message */}
          <div className="bg-card p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-6 border-b border-muted-foreground pb-2">
              Send a Message
            </h3>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  autoComplete="name"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-y"
                  placeholder="Tell me about your project, goals, and timeline."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
