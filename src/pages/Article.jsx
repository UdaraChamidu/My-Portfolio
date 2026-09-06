import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { DynamicBackground } from "../components/DynamicBackground";
import { StarBackground } from "../components/StarBackground";
import { WritingHeader } from "../components/WritingHeader";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";

export const Article = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [status, setStatus] = useState("loading");
  useDocumentMetadata(
    article ? `${article.title} | Udara Herath` : "Writing | Udara Herath",
    article?.metaDescription
  );

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    fetch(`/api/articles?slug=${encodeURIComponent(slug)}`, { signal: controller.signal })
      .then((response) => {
        if (response.status === 404) {
          setStatus("not-found");
          return null;
        }
        if (!response.ok) throw new Error("Unable to load article.");
        return response.json();
      })
      .then((data) => {
        if (data) {
          setArticle(data.article);
          setStatus("ready");
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") setStatus("error");
      });

    return () => controller.abort();
  }, [slug]);

  if (status === "not-found") return <Navigate to="/writing" replace />;

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <DynamicBackground />
      <div className="pointer-events-none fixed inset-0 z-[5]"><StarBackground /></div>
      <div className="relative z-10">
        <WritingHeader backTo="/writing" backLabel="All writing" />
        <main className="container max-w-4xl py-16 text-left md:py-24">
          {status === "loading" && <p className="text-muted-foreground">Loading article...</p>}
          {status === "error" && <p className="text-muted-foreground">This article could not be loaded right now.</p>}
          {article && (
            <article>
              <time className="text-sm font-medium text-primary" dateTime={article.publishedAt}>
                {new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(new Date(article.publishedAt))}
              </time>
              <h1 className="mt-3 text-4xl font-bold leading-tight md:text-6xl">{article.title}</h1>
              <p className="mt-6 text-xl leading-8 text-muted-foreground">{article.summary}</p>
              <div className="article-markdown mt-12 border-t border-border pt-10">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
              </div>
            </article>
          )}
        </main>
      </div>
    </div>
  );
};
