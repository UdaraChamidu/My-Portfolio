export const getBlogImage = (imageUrl) => {
  return imageUrl || "/blogs/2026-04-16-ai-ml-news-cover.jpg";
};

export const cleanMarkdownPreview = (value = "", limit = 165) => {
  const clean = value
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^[-*_]{3,}\s*$/gm, " ")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/[*_`>#~|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (clean.length <= limit) return clean;
  return `${clean.slice(0, limit).trimEnd()}...`;
};

export const formatBlogDate = (value, options = {}) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";
  return date.toLocaleDateString("en-US", options);
};
