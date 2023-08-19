import { Helmet, HeaderNav, Footer, Button, BlogPostList } from "@components";
import Link from "next/link.js";

// for testing purpose only. to be replace dynamically loaded from list of post info.
import thumbnailSample from "../public/images/blog-page/hero-blog.jpg";

// TEST DATASETS
let featured = [
  {
    id: "23012",
    category: "alumni",
    title: "What Makes Software Systems Major Special?",
    thumbnail: thumbnailSample,
    date: "June 6th 2023",
    author: "First Last",
    summary:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummr se the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

let testListA = [
  {
    id: "00000",
    category: "co-op-exp",
    title: "Career Benefits of Choosing Software Systems Major",
    date: "June 6th 2023",
    author: "Jeffrey Leung",
    summary:
      "This blog post captures my trials, triumphs, and enlightening moments, offering an unfiltered glimpse into the rigorous academic odyssey of understanding these fundamental computer science concepts.",
  },
  {
    id: "23008",
    category: "co-op-exp",
    title: "SFU Graduand Surges Forward Into Software Development Career",
    date: "June 6th 2023",
    author: "Jeffrey Leung",
    summary:
      "This blog post captures my trials, triumphs, and enlightening moments, offering an unfiltered glimpse into the rigorous academic odyssey of understanding these fundamental computer science concepts.",
  },
];
let testListB = [
  {
    id: "23009",
    category: "alumni",
    title: "Career Benefits of Choosing Software Systems Major",
    date: "June 6th 2023",
    author: "Jeffrey Leung",
    summary:
      "This blog post captures my trials, triumphs, and enlightening moments, offering an unfiltered glimpse into the rigorous academic odyssey of understanding these fundamental computer science concepts.",
  },
  {
    id: "23010",
    category: "alumni",
    title: "SFU Graduand Surges Forward Into Software Development Career",
    date: "June 6th 2023",
    author: "Jeffrey Leung",
    summary:
      "This blog post captures my trials, triumphs, and enlightening moments, offering an unfiltered glimpse into the rigorous academic odyssey of understanding these fundamental computer science concepts.",
  },
  {
    id: "23011",
    category: "alumni",
    title: "SFU Graduand Surges Forward Into Software Development Career",
    date: "June 6th 2023",
    author: "Jeffrey Leung",
    summary:
      "This blog post captures my trials, triumphs, and enlightening moments, offering an unfiltered glimpse into the rigorous academic odyssey of understanding these fundamental computer science concepts.",
  },
];

export default function Blog() {
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
            <BlogPostList list={featured} style={"featured"} />
          </div>
        </section>
        <section className="container">
          <h3 className="category-title">Alumni</h3>
          <BlogPostList list={testListB} style={"regular"} />
          <p className="see-more">
            <Link href="/blog/alumni">See more</Link>
          </p>
        </section>
        <section className="container">
          <h3 className="category-title">Co-op Experience</h3>
          <BlogPostList list={testListA} style={"wide"} />
          <p className="see-more">
            <Link href="/blog/co-op-exp">See more</Link>
          </p>
        </section>
        <section className="container">
          <h3 className="category-title">Undergraduate Study</h3>
          <BlogPostList list={testListB} style={"regular"} />
          <p className="see-more">
            <Link href="/blog/undergrad-study">See more</Link>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
