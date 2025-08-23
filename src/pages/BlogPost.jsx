import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import fm from "front-matter";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

export default function BlogPost() {
  const { slug } = useParams();
  const [content, setContent] = useState("");
  const [meta, setMeta] = useState({ title: "", date: "" });

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/content/blogs/${slug}.md`);
        const text = await res.text();
        const { attributes: data, body } = fm(text);

        setMeta({
          title: data?.title ?? slug,
          date: data?.date ?? "Unknown",
        });
        setContent(body);
      } catch (error) {
        setContent("⚠️ Error loading post.");
        setMeta({ title: "Post Not Found", date: "" });
      }
    }

    fetchPost();
  }, [slug]);

  return (
    <section className="min-h-screen py-24 px-4 bg-background text-foreground">
      <div className="container max-w-3xl mx-auto">
        <Link
          to="/blog"
          className="inline-block mb-6 text-primary underline hover:text-primary/80"
        >
          ← Back to Blog List
        </Link>
        {meta.title ? (
          <>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              {meta.title}
            </h1>
            <p className="text-sm text-muted-foreground mb-6">{meta.date}</p>
            <div className="prose max-w-none text-foreground prose-headings:text-primary prose-a:text-primary hover:prose-a:text-primary/80">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </>
        ) : (
          <p className="text-center text-xl text-red-500">Loading post...</p>
        )}
      </div>
    </section>
  );
}
