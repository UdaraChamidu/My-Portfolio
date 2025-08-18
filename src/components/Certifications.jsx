import { ExternalLink } from "lucide-react";

const certifications = [
  {
    id: 1,
    title: "Deep Learning Specialization",
    issuer: "Coursera (Andrew Ng)",
    date: "2024",
    image: "/certifications/deep-learning.png", // put your certificate image in public/certifications
    verifyUrl: "https://coursera.org/verify/xxxxxx",
  },
  {
    id: 2,
    title: "Generative AI with LLMs",
    issuer: "DeepLearning.AI",
    date: "2024",
    image: "/certifications/genai.png",
    verifyUrl: "https://coursera.org/verify/yyyyyy",
  },
  {
    id: 3,
    title: "Machine Learning",
    issuer: "Stanford Online",
    date: "2023",
    image: "/certifications/ml.png",
    verifyUrl: "https://example.com",
  },
];

export const Certifications = () => {
  return (
    <section id="certifications" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Certifications <span className="text-primary"> & Achievements </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of the certifications I’ve earned to strengthen my skills in
          AI, Machine Learning, and related technologies.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-40 overflow-hidden flex justify-center items-center bg-secondary/20">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold mb-1">{cert.title}</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  {cert.issuer}
                </p>
                <p className="text-xs text-muted-foreground mb-4">{cert.date}</p>

                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary flex items-center gap-1 hover:underline"
                >
                  Verify <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
