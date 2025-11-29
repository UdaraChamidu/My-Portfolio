import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fm from "front-matter";
import { Home } from "lucide-react";

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const indexRes = await fetch("/blogs/blogs.json");
        
        if (!indexRes.ok) {
          throw new Error(`Failed to fetch blogs.json: ${indexRes.status} ${indexRes.statusText}`);
        }
        
        const files = await indexRes.json();
 
        if (!Array.isArray(files)) {
          throw new Error("blogs.json does not contain an array");
        }

        // Filter out blogs.json and only process .md files
        const mdFiles = files.filter(file => file.endsWith('.md'));

        const loaded = [];
        for (const file of mdFiles) {
          try {
            const res = await fetch(`/blogs/${file}`);
            
            if (!res.ok) {
              console.warn(`Failed to fetch ${file}: ${res.status}`);
              continue;
            }
            
            const raw = await res.text();
            
            if (!raw || raw.trim().length === 0) {
              console.warn(`Empty content for ${file}`);
              continue;
            }
            
            let data = {};
            let content = raw;
            
            try {
              const parsed = fm(raw);
              data = parsed.attributes || {};
              content = parsed.body || raw;
            } catch (parseErr) {
              console.warn(`Failed to parse front-matter for ${file}:`, parseErr);
              // Continue with empty data
            }

            loaded.push({
              slug: file.replace(".md", ""),
              title: data?.title ?? "Untitled Post",
              summary: data?.summary ?? (content ? content.slice(0, 120) + "..." : "No content"),
              date: data?.date ?? "Unknown",
              topics: Array.isArray(data?.topics) ? data.topics : [],
              imageUrl: data?.imageUrl ?? "",
            });
          } catch (fileErr) {
            console.warn(`Error loading blog file ${file}:`, fileErr);
            // Continue loading other files even if one fails
          }
        }

        loaded.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          // Handle invalid dates
          if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
            return 0;
          }
          return dateB - dateA;
        });
        setPosts(loaded);
      } catch (err) {
        console.error("Error loading blog posts:", err);
        setPosts([]); // Ensure posts is set even on error
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  // Generate image URL based on title or use provided imageUrl
  const getImageUrl = (title, imageUrl) => {
    if (imageUrl) return imageUrl;
    // Using a hash-based approach for consistent images per title
    const seed = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `https://picsum.photos/seed/${seed}/800/400`;
  };

  return (
    <section id="blog" className="py-24 px-4 relative bg-background min-h-screen">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 text-center md:text-left">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              My <span className="text-primary">Blog</span>
            </h2>
            <p className="text-lg opacity-70 max-w-2xl md:max-w-xl">
              Stay updated with the latest AI/ML news and insights. Blogs are automatically generated daily using AI.
            </p>
          </div>
          <div className="flex justify-center md:justify-end gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300"
            >
              <span>Contact Me</span>
            </a>
          </div>
        </div>
 
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden"
              >
                <div className="h-48 bg-gray-300 dark:bg-gray-600"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg opacity-70">No blog posts found.</p>
            <p className="text-sm opacity-50 mt-2">Check the browser console for errors.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group block"
              >
                <article className="h-full rounded-2xl overflow-hidden 
                                  bg-background/80 dark:bg-background/30
                                  border border-primary/20 dark:border-primary/40
                                  shadow-lg hover:shadow-xl
                                  transition-all duration-300
                                  hover:scale-[1.02] hover:-translate-y-1
                                  flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
                    <img
                      src={getImageUrl(post.title, post.imageUrl)}
                      alt={post.title}
                      className="w-full h-full object-cover 
                               group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-primary/80">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-xs opacity-50">•</span>
                      <span className="text-xs opacity-60">
                        {post.topics?.[0] ?? "AI/ML News"}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm opacity-80 mb-4 line-clamp-3 flex-1">
                      {post.summary}
                    </p>

                    {post.topics && post.topics.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.topics.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center text-primary font-medium text-sm mt-auto">
                      Read More
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
