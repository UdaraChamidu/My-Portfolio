import {
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
    <section id="contact" className="section-shell">
      <div className="section-inner max-w-5xl">
        <div className="section-header">
          <p className="section-kicker">Start a Conversation</p>
          <h2 className="section-title">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="section-description">
            Have a project, collaboration, or engineering opportunity in mind?
            Send a message and include a little context about what you need.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-8">
          {/* Contact Information */}
          <div className="surface-card space-y-6 p-6 md:p-7">
            <h3 className="border-b border-border pb-4 text-left text-xl font-semibold md:text-2xl">
              Contact Information
            </h3>

            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="icon-tile">
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
                <div className="icon-tile">
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
                <div className="icon-tile">
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
            <div className="border-t border-border pt-5 text-center">
              <h4 className="font-medium mb-4">Connect With Me</h4>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://www.linkedin.com/in/udara-herath-530006217"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  title="LinkedIn"
                  className="icon-button"
                >
                  <Linkedin className="h-6 w-6 text-primary hover:text-primary/70 transition-colors" />
                </a>
                <a
                  href="https://github.com/UdaraChamidu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  title="GitHub"
                  className="icon-button"
                >
                  <Github className="h-6 w-6 text-primary hover:text-primary/70 transition-colors" />
                </a>
                <a
                  href="https://medium.com/@chamiduudara321"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Medium profile"
                  title="Medium"
                  className="icon-button"
                >
                  <span className="font-serif text-xl font-black leading-none">M</span>
                </a>
              </div>
            </div>
          </div>

          {/* Send a Message */}
          <div className="surface-card p-6 md:p-8">
            <h3 className="mb-6 border-b border-border pb-4 text-left text-xl font-semibold md:text-2xl">
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
                  className="form-control"
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
                  className="form-control"
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
                  className="form-control resize-y"
                  placeholder="Tell me about your project, goals, and timeline."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "button-primary w-full"
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
