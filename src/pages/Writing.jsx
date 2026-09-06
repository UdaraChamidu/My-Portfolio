import { ArrowRight, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DynamicBackground } from "../components/DynamicBackground";
import { StarBackground } from "../components/StarBackground";
import { WritingHeader } from "../components/WritingHeader";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";

export const Writing = () => {
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState("loading");
  useDocumentMetadata(
    "Writing | Udara Herath",
    "Articles by Udara Herath about AI, automation, software engineering, and digital products."
  );

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/articles", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load articles.");
        return response.json();
      })
      .then((data) => {
        setArticles(Array.isArray(data.articles) ? data.articles : []);
        setStatus("ready");
      })
      .catch((error) => {
        if (error.name !== "AbortError") setStatus("error");
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <DynamicBackground />
      <div className="pointer-events-none fixed inset-0 z-[5]"><StarBackground /></div>
      <div className="relative z-10">
        <WritingHeader />
        <main className="container max-w-5xl py-16 text-left md:py-24">
          <p className="section-kicker">Ideas and field notes</p>
          <h1 className="text-4xl font-bold md:text-6xl">Writing</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Practical notes on AI, automation, software engineering, and building useful digital products.
          </p>

          <div className="mt-12 grid gap-5">
            {status === "loading" && <p className="text-muted-foreground">Loading articles...</p>}
            {status === "error" && (
              <p className="rounded-lg border border-border bg-card p-5 text-muted-foreground">
                Articles could not be loaded right now. Please try again shortly.
              </p>
            )}
            {status === "ready" && articles.length === 0 && (
              <div className="surface-card p-8 text-center">
                <FileText className="mx-auto mb-4 text-primary" size={34} aria-hidden="true" />
                <p className="font-medium">The first article is coming soon.</p>
              </div>
            )}
            {articles.map((article) => (
              <article key={article.slug} className="surface-card surface-card-interactive p-6 md:p-8">
                <time className="text-sm text-muted-foreground" dateTime={article.publishedAt}>
                  {new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(new Date(article.publishedAt))}
                </time>
                <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
                  <Link className="hover:text-primary" to={`/writing/${article.slug}`}>{article.title}</Link>
                </h2>
                <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{article.summary}</p>
                <Link className="mt-5 inline-flex items-center gap-2 font-medium text-primary" to={`/writing/${article.slug}`}>
                  Read article <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
