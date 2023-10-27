import { Helmet, HeaderNav, Footer } from "@components";
import { BlogPost } from "components/BlogPostPreview";
import { BlogPostPreviewList } from "components/BlogPostPreviewList";
import { useState, useEffect } from "react";
import { getAllPosts } from "../lib/api";

export default function Blog(props) {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const blogPostObjects = props.allPosts;
    const blogPosts = blogPostObjects.map(BlogPost.fromObject);
    setBlogPosts(blogPosts);
  }, [props]);

  return (
    <div className="blog-page">
      <Helmet />
      <HeaderNav />
      <main>
        <header className="container hero">
          <p>Blog</p>
          <h1>Learn more about Software Systems at SFU</h1>
        </header>
        <section className="container">
          <h3 className="category-title">Featured</h3>
          <div className="posts-list featured">
            <BlogPostPreviewList blogPosts={blogPosts} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
    "category",
    "style",
  ]);

  return {
    props: { allPosts },
  };
};
