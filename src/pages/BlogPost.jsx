import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import fm from "front-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Home, Sparkles, Tag } from "lucide-react";
import { cleanMarkdownPreview, formatBlogDate, getBlogImage } from "@/lib/blog";

const RELATED_POST_SCAN_LIMIT = 30;

export default function BlogPost() {
  const { slug } = useParams();
  const [content, setContent] = useState("");
  const [meta, setMeta] = useState({ title: "", date: "", topics: [], imageUrl: "" });
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadRelated(topics) {
      try {
        setRelatedLoading(true);
        const indexRes = await fetch("/blogs/blogs.json");
        if (!indexRes.ok) {
          throw new Error(`Failed to fetch blogs index: ${indexRes.status}`);
        }
        const files = await indexRes.json();
        if (!Array.isArray(files)) {
          throw new Error("blogs.json does not contain an array");
        }

        const candidates = [];

        for (const file of files.slice(0, RELATED_POST_SCAN_LIMIT)) {
          if (!file.endsWith(".md")) continue;
          const fileSlug = file.replace(".md", "");
          if (fileSlug === slug) continue;

          const res = await fetch(`/blogs/${file}`);
          if (!res.ok) continue;

          const raw = await res.text();
          const { attributes, body: relatedBody } = fm(raw);

          const relatedTopics = Array.isArray(attributes?.topics) ? attributes.topics : [];
          const hasOverlap = Array.isArray(topics) && topics.length > 0
            ? relatedTopics.some((topic) => topics.includes(topic))
            : true;

          candidates.push({
            slug: fileSlug,
            title: attributes?.title ?? fileSlug,
            date: attributes?.date ?? "Unknown",
            imageUrl: attributes?.imageUrl ?? "",
            topics: relatedTopics,
            summary: cleanMarkdownPreview(attributes?.summary ?? relatedBody, 140),
            overlap: hasOverlap ? 1 : 0,
          });

          if (candidates.length >= 8) {
            break;
          }
        }

        const getTime = (value) => {
          const ts = Date.parse(value);
          return Number.isNaN(ts) ? 0 : ts;
        };

        candidates.sort((a, b) => {
          if (b.overlap !== a.overlap) {
            return b.overlap - a.overlap;
          }
          return getTime(b.date) - getTime(a.date);
        });

        if (isMounted) {
          setRelatedPosts(candidates.slice(0, 3));
        }
      } catch (error) {
        console.warn("Failed to load related posts:", error);
        if (isMounted) {
          setRelatedPosts([]);
        }
      } finally {
        if (isMounted) {
          setRelatedLoading(false);
        }
      }
    }

    async function fetchPost() {
      try {
        setLoading(true);
        setRelatedPosts([]);
        setRelatedLoading(true);
        const res = await fetch(`/blogs/${slug}.md`);
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        const text = await res.text();
        const { attributes: data, body } = fm(text);

        const topics = Array.isArray(data?.topics) ? data.topics : [];

        if (isMounted) {
          setMeta({
            title: data?.title ?? slug,
            date: data?.date ?? "Unknown",
            topics,
            imageUrl: data?.imageUrl ?? "",
          });
          setContent(body);
          loadRelated(topics);
        }
      } catch (error) {
        console.error("Error loading post:", error);
        if (isMounted) {
          setContent("This post could not be loaded.");
          setMeta({ title: "Post Not Found", date: "", topics: [], imageUrl: "" });
          setRelatedPosts([]);
          setRelatedLoading(false);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchPost();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <section className="min-h-screen py-24 px-4 bg-background text-foreground">
        <div className="container max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-12 md:py-24 px-4 bg-background text-foreground">
      <div className="container max-w-5xl mx-auto">
        {/* Navigation Buttons */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </div>

        {meta.title ? (
          <article>
            {/* Header */}
            <header className="max-w-3xl mx-auto space-y-5 text-left">
              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-bold leading-tight text-foreground">
                {meta.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/70">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {formatBlogDate(meta.date, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                {meta.topics && meta.topics.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="w-4 h-4" />
                    {meta.topics.slice(0, 3).map((topic, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </header>

            {/* Featured Image */}
            <div className="relative w-full aspect-[16/8] max-h-[480px] mt-8 overflow-hidden border-y md:border border-border md:rounded-lg bg-card">
              <img
                src={getBlogImage(meta.imageUrl)}
                alt={meta.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto py-10 text-left">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, ...props }) => <h2 {...props} className="mt-10 mb-5 text-2xl md:text-3xl font-bold leading-tight text-foreground" />,
                  h2: ({ node, ...props }) => <h2 {...props} className="mt-10 mb-4 text-xl md:text-2xl font-semibold leading-snug text-foreground" />,
                  h3: ({ node, ...props }) => <h3 {...props} className="mt-8 mb-3 text-lg md:text-xl font-semibold text-foreground" />,
                  p: ({ node, ...props }) => <p {...props} className="my-5 text-[1.05rem] leading-8 text-foreground/85" />,
                  a: ({ node, ...props }) => <a {...props} className="font-medium text-primary underline underline-offset-4 hover:text-primary/75" target="_blank" rel="noopener noreferrer" />,
                  strong: ({ node, ...props }) => <strong {...props} className="font-semibold text-foreground" />,
                  ul: ({ node, ...props }) => <ul {...props} className="my-5 ml-6 list-disc space-y-2 text-foreground/85 marker:text-primary" />,
                  ol: ({ node, ...props }) => <ol {...props} className="my-5 ml-6 list-decimal space-y-2 text-foreground/85 marker:font-semibold marker:text-primary" />,
                  li: ({ node, ...props }) => <li {...props} className="pl-1 leading-7" />,
                  blockquote: ({ node, ...props }) => <blockquote {...props} className="my-7 border-l-4 border-primary bg-primary/5 px-5 py-1 italic text-foreground/80" />,
                  hr: () => <hr className="my-10 border-border" />,
                  code: ({ node, className, children, ...props }) => className
                    ? <code {...props} className={`${className} text-sm`}>{children}</code>
                    : <code {...props} className="rounded bg-primary/10 px-1.5 py-0.5 text-sm text-primary">{children}</code>,
                  pre: ({ node, ...props }) => <pre {...props} className="my-7 overflow-x-auto rounded-md border border-border bg-card p-5 text-left" />,
                  table: ({ node, ...props }) => <div className="my-7 overflow-x-auto"><table {...props} className="w-full border-collapse text-sm" /></div>,
                  th: ({ node, ...props }) => <th {...props} className="border border-border bg-card px-4 py-3 text-left font-semibold" />,
                  td: ({ node, ...props }) => <td {...props} className="border border-border px-4 py-3 align-top leading-6" />,
                }}
              >
                {content}
              </ReactMarkdown>
            </div>

            {(relatedLoading || relatedPosts.length > 0) && (
              <section className="max-w-4xl mx-auto border-t border-border pt-10">
                <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span>Related Reading</span>
                </h2>
                {relatedLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...Array(2)].map((_, i) => (
                      <div
                        key={i}
                        className="animate-pulse border border-primary/20 rounded-2xl overflow-hidden bg-background/60"
                      >
                        <div className="h-36 bg-gray-200 dark:bg-gray-700"></div>
                        <div className="p-5 space-y-3">
                          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {relatedPosts.map((post) => (
                      <Link key={post.slug} to={`/blog/${post.slug}`} className="group block">
                        <article className="h-full rounded-2xl overflow-hidden border border-primary/20 bg-background/80 hover:border-primary/40 shadow-md hover:shadow-lg transition-all duration-300">
                          <div className="h-40 overflow-hidden">
                            <img
                              src={getBlogImage(post.imageUrl)}
                              alt={post.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                          <div className="p-5 space-y-3">
                            <div className="flex items-center gap-2 text-xs text-foreground/60">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>
                                {new Date(post.date).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            {post.summary && (
                              <p className="text-sm text-foreground/70 line-clamp-3">{post.summary}</p>
                            )}
                            {post.topics && post.topics.length > 0 && (
                              <div className="flex flex-wrap gap-2 pt-1">
                                {post.topics.slice(0, 2).map((topic) => (
                                  <span
                                    key={topic}
                                    className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                                  >
                                    {topic}
                                  </span>
                                ))}
                              </div>
                            )}
                            <div className="flex items-center text-primary font-medium text-sm">
                              Continue Reading
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Footer */}
            <div className="max-w-4xl mx-auto mt-10 pt-8 border-t border-primary/20 flex flex-wrap items-center gap-5">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>View All Posts</span>
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors font-medium"
              >
                <Home className="w-4 h-4" />
                <span>Go to Home</span>
              </Link>
            </div>
          </article>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-red-500 mb-4">Post Not Found</p>
            <Link
              to="/blog"
              className="text-primary hover:underline"
            >
              Return to Blog List
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
