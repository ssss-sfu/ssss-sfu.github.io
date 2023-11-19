import { BlogPostPreview } from "./BlogPostPreview";

// TODO refactor to be used or remove this
export const BlogPostPreviewList = ({ blogPosts }) =>
  blogPosts.length > 0 ? (
    blogPosts.map((post) => (
      <BlogPostPreview key={post.title} blogPost={post} />
    ))
  ) : (
    <div>No blog post is listed at the moment</div>
  );
