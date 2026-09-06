import { timingSafeEqual } from "node:crypto";
import { list, put } from "@vercel/blob";

/* global Buffer, process */

const REQUIRED_FIELDS = [
  "title",
  "slug",
  "summary",
  "content",
  "metaDescription",
];
const MAX_LENGTHS = {
  title: 160,
  slug: 100,
  summary: 500,
  content: 200_000,
  metaDescription: 320,
};
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const getApiKey = (request) => {
  const authorization = request.headers.authorization;
  if (typeof authorization === "string" && authorization.startsWith("Bearer ")) {
    return authorization.slice(7).trim();
  }

  const headerKey = request.headers["x-api-key"];
  return typeof headerKey === "string" ? headerKey.trim() : "";
};

const keysMatch = (provided, expected) => {
  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);
  return (
    providedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(providedBuffer, expectedBuffer)
  );
};

const validateArticle = (body) => {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return "The request body must be a JSON object.";
  }

  for (const field of REQUIRED_FIELDS) {
    if (typeof body[field] !== "string" || !body[field].trim()) {
      return `${field} is required and must be a non-empty string.`;
    }
    if (body[field].trim().length > MAX_LENGTHS[field]) {
      return `${field} must be ${MAX_LENGTHS[field]} characters or fewer.`;
    }
  }

  if (!SLUG_PATTERN.test(body.slug.trim())) {
    return "slug must contain only lowercase letters, numbers, and single hyphens.";
  }

  return null;
};

const getSiteOrigin = (request) => {
  const configuredOrigin = process.env.PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (configuredOrigin) return configuredOrigin;

  const protocol = request.headers["x-forwarded-proto"] || "https";
  const host = request.headers["x-forwarded-host"] || request.headers.host;
  return host ? `${protocol}://${host}` : "";
};

const fetchArticle = async (blob) => {
  const response = await fetch(`${blob.url}?v=${blob.uploadedAt.getTime()}`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Unable to read ${blob.pathname}.`);
  return response.json();
};

const getArticleBlobs = async () => {
  const blobs = [];
  let cursor;

  do {
    const page = await list({ prefix: "articles/", cursor, limit: 1000 });
    blobs.push(...page.blobs.filter((blob) => blob.pathname.endsWith(".json")));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  return blobs;
};

const handleGet = async (request, response) => {
  const slug = typeof request.query.slug === "string" ? request.query.slug.trim() : "";
  const blobs = await getArticleBlobs();

  if (slug) {
    if (!SLUG_PATTERN.test(slug)) {
      return response.status(400).json({ error: "Invalid article slug." });
    }

    const blob = blobs.find((item) => item.pathname === `articles/${slug}.json`);
    if (!blob) return response.status(404).json({ error: "Article not found." });

    response.setHeader("Cache-Control", "public, max-age=0, s-maxage=60");
    return response.status(200).json({ article: await fetchArticle(blob) });
  }

  const articles = await Promise.all(blobs.map(fetchArticle));
  articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  response.setHeader("Cache-Control", "public, max-age=0, s-maxage=60");
  return response.status(200).json({
    articles: articles.map((article) => ({
      title: article.title,
      slug: article.slug,
      summary: article.summary,
      metaDescription: article.metaDescription,
      publishedAt: article.publishedAt,
    })),
  });
};

const handlePost = async (request, response) => {
  const expectedKey = process.env.ARTICLE_API_KEY?.trim();
  const providedKey = getApiKey(request);

  if (!expectedKey) {
    return response.status(503).json({ error: "Article publishing is not configured." });
  }
  if (!providedKey || !keysMatch(providedKey, expectedKey)) {
    return response.status(401).json({ error: "Unauthorized." });
  }

  const validationError = validateArticle(request.body);
  if (validationError) return response.status(400).json({ error: validationError });

  const article = Object.fromEntries(
    REQUIRED_FIELDS.map((field) => [field, request.body[field].trim()])
  );
  article.publishedAt = new Date().toISOString();

  await put(`articles/${article.slug}.json`, JSON.stringify(article), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json; charset=utf-8",
    cacheControlMaxAge: 60,
  });

  const url = `${getSiteOrigin(request)}/writing/${article.slug}`;
  return response.status(201).json({ success: true, url });
};

export default async function handler(request, response) {
  try {
    if (request.method === "GET") return await handleGet(request, response);
    if (request.method === "POST") return await handlePost(request, response);

    response.setHeader("Allow", "GET, POST");
    return response.status(405).json({ error: "Method not allowed." });
  } catch (error) {
    console.error("Article API failed:", error);
    return response.status(500).json({ error: "The article service is unavailable." });
  }
}
