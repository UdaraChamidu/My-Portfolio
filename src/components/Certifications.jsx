import { ExternalLink } from "lucide-react";

const certifications = [
  {
    id: 1,
    title: "Fundamentals of Agents",
    issuer: "Hugging Face",
    date: "2025",
    image: "/projects/c1.png", // put your certificate image in public/certifications
    verifyUrl:
      "https://cas-bridge.xethub.hf.co/xet-bridge-us/67a47037749ea2c4b9fafd4b/cef95ca0b7b7f075f901ec8051139e8df9c46887a4c3390ad537e289fb20c01a?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=cas%2F20250819%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250819T094755Z&X-Amz-Expires=3600&X-Amz-Signature=d1a4525a64f2cf9100979b4dbc7f0996c68b1e93d68aacf614fd8679e5834767&X-Amz-SignedHeaders=host&X-Xet-Cas-Uid=67f60673ecc5206d295ea9a2&response-content-disposition=inline%3B+filename*%3DUTF-8%27%272025-06-04.png%3B+filename%3D%222025-06-04.png%22%3B&response-content-type=image%2Fpng&x-id=GetObject&Expires=1755600475&Policy=eyJTdGF0ZW1lbnQiOlt7IkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc1NTYwMDQ3NX19LCJSZXNvdXJjZSI6Imh0dHBzOi8vY2FzLWJyaWRnZS54ZXRodWIuaGYuY28veGV0LWJyaWRnZS11cy82N2E0NzAzNzc0OWVhMmM0YjlmYWZkNGIvY2VmOTVjYTBiN2I3ZjA3NWY5MDFlYzgwNTExMzllOGRmOWM0Njg4N2E0YzMzOTBhZDUzN2UyODlmYjIwYzAxYSoifV19&Signature=V2Z-xC1USQRyJJYHwHENibvLrnyYSSQZAdvf7W5TbfUYsFseAyK0KSzOjFCKhHgDgDwzFkoKg3dEZdLNza5sCR6d-n1cW6reeqXaIfFcoefnU9lWgmz9Jm3Tn69n6dh-Ye2rMcRSJMAeTIj8ioGsJ%7EuKhhCvCEYgSQQGRqwpe2inbF8cUHZMl2ozIrjPNQiFFLXGuytNjNritm7nOizMiNJLN4wkv6Kv4LRVDlzKHMVY%7EMpkFF457Eqjn8df7DofF28bZs6J3guTTeCY4bxBg6sWcAa66FFVRML3S7pYgwk7b8DOdO2JrNU0kNIyTZbf6Nf-MfsOVEPmMgEqnGOnQA__&Key-Pair-Id=K2L8F4GPSG1IFC",
  },
  {
    id: 2,
    title: "Docker for Beginners",
    issuer: "KodeKloud",
    date: "2025",
    image: "/projects/c2.png",
    verifyUrl:
      "https://learn.kodekloud.com/user/certificate/a14ac195-3b98-4efb-9177-34b764c3d581",
  },
  {
    id: 3,
    title: "H2O AI Agents",
    issuer: "udemy",
    date: "2023",
    image: "/projects/c3.png",
    verifyUrl:
      "https://www.udemy.com/certificate/UC-8636b9b8-0665-4060-81e2-bfeed286146a/",
  },
  {
    id: 1,
    title: "Introduction to Model Context Protocol",
    issuer: "Anthropic",
    date: "2025",
    image: "/projects/c4.png", // put your certificate image in public/certifications
    verifyUrl: "https://verify.skilljar.com/c/v5gqbrcjunk2",
  },
  {
    id: 2,
    title: "AI/ML Engineer Stage 1",
    issuer: "SLIIT UNI",
    date: "2023",
    image: "/projects/c5.png",
    verifyUrl: "https://code.sliit.org/certificates/bbfgksmufy",
  },
  {
    id: 3,
    title: "AI/ML Engineer Stage 2",
    issuer: "SLIIT UNI",
    date: "2023",
    image: "/projects/c6.png",
    verifyUrl: "https://code.sliit.org/certificates/ycxfp9tcgp",
  },
  {
    id: 1,
    title: "Introduction to Artificial Intelligence",
    issuer: "Simplilearn",
    date: "2023",
    image: "/projects/c7.png", // put your certificate image in public/certifications
    verifyUrl: "https://lms.simplilearn.com/dashboard",
  },
  {
    id: 2,
    title: "Python for Beginners",
    issuer: "University of Moratuwa",
    date: "2022",
    image: "/projects/c8.png",
    verifyUrl: "https://open.uom.lk/lms/mod/customcert/verify_certificate.php",
  },
  {
    id: 3,
    title: "Web Design for Beginners",
    issuer: "University of Moratuwa",
    date: "2022",
    image: "/projects/c9.jpg",
    verifyUrl: "https://open.uom.lk/lms/mod/customcert/verify_certificate.php",
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
          Here are some of the certifications I’ve earned to strengthen my
          skills in AI, Machine Learning, and related technologies.
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
                <p className="text-xs text-muted-foreground mb-4">
                  {cert.date}
                </p>

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
