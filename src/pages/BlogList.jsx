import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fm from "front-matter"; // ✅ NEW: use front-matter

export default function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const fileList = ["the-future-of-ai.md", "react-tips-and-tricks.md"]; // ✅ Example file list
      const loaded = [];

      for (const file of fileList) {
        try {
          const res = await fetch(`/posts/${file}`);
          const raw = await res.text();
          const { attributes: data, body: content } = fm(raw); // ✅ front-matter style

          console.log("✅ Loaded post:", { data, content });

          loaded.push({
            slug: file.replace(".md", ""),
            title: data?.title ?? "Untitled Post",
            summary: data?.summary ?? content.slice(0, 100) + "...",
            date: data?.date ?? "Unknown",
          });
        } catch (err) {
          console.error(`Error loading ${file}`, err);
        }
      }

      setPosts(loaded);
    }

    loadPosts();
  }, []);

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
              <p className="text-sm text-muted-foreground mb-2">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

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
