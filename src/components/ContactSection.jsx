import { MessageCircle } from "lucide-react";
import {
  Instagram,
  Facebook,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitch,
  Twitter,
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
          Have a project in mind or want to collaborate? Feel free to reach out.
          I'm always open to discussing new opportunities.
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
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-left">Outlook</h4>
                  <a
                    href="mailto:2021e049@eng.jfn.ac.lk"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    2021e049@eng.jfn.ac.lk
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-left">Phone</h4>
                  <a
                    href="tel:+94761720686"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +94 76 172 0686
                  </a>
                </div>
              </div>

              {/* Whatsapp */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-left">Whatsapp</h4>
                  <a
                    href="https://wa.me/94761720686"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +94 76 172 0686
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
              <div className="flex space-x-4 justify-center">
                <a
                  href="https://www.linkedin.com/in/udara-herath-530006217"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin />
                </a>
                <a
                  href="https://github.com/UdaraChamidu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-6 w-6 text-primary hover:text-primary-dark transition-colors" />
                </a>
                <a
                  href="https://www.facebook.com/udara.chamidu/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-6 w-6 text-primary hover:text-primary-dark transition-colors" />
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
                  placeholder="udara chamidu..."
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
                  placeholder="abc@gmail.com"
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
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2"
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
