import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

const BlogList = () => {
  const postFiles = fs.readdirSync('./src/data/posts');
  const posts = postFiles.map((filename) => {
    const fileContent = fs.readFileSync(`./src/data/posts/${filename}`, 'utf-8');
    const { data } = matter(fileContent);
    return { slug: filename.replace('.md', ''), ...data };
  });

  return (
    <div>
      <h1>📰 AI Blog</h1>
      {posts.map(post => (
        <div key={post.slug}>
          <h2>{post.title}</h2>
          <p>{post.summary}</p>
          <a href={`/blog/${post.slug}`}>Read More</a>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
