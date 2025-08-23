import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fm from "front-matter";

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const req = require.context("../public/blogs", false, /\.md$/);
        const files = req.keys();

        const loaded = [];
        for (const file of files) {
          const res = await fetch(`/public/blogs/${file.replace("./", "")}`);
          const raw = await res.text();
          const { attributes: data, body: content } = fm(raw);

          loaded.push({
            slug: file.replace("./", "").replace(".md", ""),
            title: data?.title ?? "Untitled Post",
            summary: data?.summary ?? content.slice(0, 120) + "...",
            date: data?.date ?? "Unknown",
          });
        }

        // Sort newest first
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
    <section id="blog" className="py-24 px-4 relative">
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
                           bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                           text-white shadow-lg"
              >
                <p className="text-sm mb-2 opacity-80">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>

                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="opacity-90 mb-4">{post.summary}</p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="underline hover:opacity-80 transition"
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
