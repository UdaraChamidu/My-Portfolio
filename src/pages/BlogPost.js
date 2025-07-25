import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import fs from 'fs';

const BlogPost = () => {
  const { slug } = useParams();
  const file = fs.readFileSync(`./src/data/posts/${slug}.md`, 'utf-8');
  const { content, data } = matter(file);

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.date}</p>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default BlogPost;
