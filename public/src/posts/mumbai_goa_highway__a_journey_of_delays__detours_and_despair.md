const input = $input.item.json;

const markdown = `---
title: "${input.title}"
date: "${new Date(input.publishedDate).toISOString().split("T")[0]}"
summary: "${input.description}"
category: "${input.category}"
country: "${input.country}"
---

## ${input.title}

${input.description}

[Read more](https://example.com)
`;

return {
  fileName: `public/posts/${input.filename}.md`,
  fileContent: markdown,
  title: input.title,
  url: "https://example.com", // Replace this if you have the actual article URL
  category: input.category,
  country: input.country,
  date: new Date(input.publishedDate).toISOString().split("T")[0],
};
