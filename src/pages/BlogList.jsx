import { Link } from "react-router-dom";

export default function BlogList() {
  const posts = [
    {
      slug: "ai-trends-2025",
      title: "🚀 AI Trends for 2025",
      summary:
        "Discover the top AI breakthroughs shaping the future of technology.",
      date: "July 25, 2025",
    },
    {
      slug: "ml-latest-research",
      title: "📊 ML Research Highlights",
      summary:
        "Explore recent advancements in machine learning from global labs.",
      date: "July 24, 2025",
    },
  ];

  return (
    <section id="blog" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Blog</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="gradient-border p-6 rounded-xl transition-transform hover:scale-[1.015] card-hover"
            >
              <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
              <h3 className="text-xl font-semibold text-primary mb-2">
                {post.title}
              </h3>
              <p className="text-muted-foreground mb-4">{post.summary}</p>
              <Link
                to={`/blog/${post.slug}`}
                className="text-primary underline hover:text-primary/80 transition"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
