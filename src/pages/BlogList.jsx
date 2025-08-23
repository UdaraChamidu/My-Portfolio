import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fm from "front-matter";

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const indexRes = await fetch("/blogs/blogs.json");
        const files = await indexRes.json();

        const loaded = [];
        for (const file of files) {
          const res = await fetch(`/blogs/${file}`);
          const raw = await res.text();
          const { attributes: data, body: content } = fm(raw);

          loaded.push({
            slug: file.replace(".md", ""),
            title: data?.title ?? "Untitled Post",
            summary: data?.summary ?? content.slice(0, 120) + "...",
            date: data?.date ?? "Unknown",
          });
        }

        loaded.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(loaded);
      } catch (err) {
        console.error("Error loading blog posts:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  return (
    <section id="blog" className="py-24 px-4 relative bg-background">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary">Blog</span>
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-200 dark:bg-gray-700 h-48 rounded-xl"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <div
                key={post.slug}
                className="p-6 rounded-xl transition-transform hover:scale-[1.015]
                           bg-background/80 dark:bg-background/30
                           border border-primary/20 dark:border-primary/40
                           text-foreground shadow-md"
              >
                <p className="text-sm mb-2 opacity-70">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>

                <h3 className="text-xl font-semibold mb-2 text-primary">
                  {post.title}
                </h3>
                <p className="opacity-90 mb-4">{post.summary}</p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="underline text-primary hover:opacity-80 transition"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
