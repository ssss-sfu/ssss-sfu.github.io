import { Helmet, HeaderNav, Footer, Button, BlogPostList } from "@components";
import Link from "next/link.js";
import { getAllPosts } from "../lib/api";

export default function Blog(props) {
  const heroPost = props.allPosts[0];
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
            <BlogPostList
              title={heroPost.title}
              date={heroPost.date}
              slug={heroPost.slug}
              author={heroPost.author}
              coverImage={heroPost.coverImage}
              excerpt={heroPost.excerpt}
              category={heroPost.category}
            />
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
  ]);

  return {
    props: { allPosts },
  };
};
