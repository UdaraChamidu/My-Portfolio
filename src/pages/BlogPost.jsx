import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { slug } = useParams();

  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-4">Blog: {slug.replaceAll("-", " ")}</h1>
      <p className="text-muted-foreground">This is a placeholder post for <strong>{slug}</strong>.</p>
      <p className="mt-4">Later this will load .md content or AI-written blog posts.</p>
    </div>
  );
}
