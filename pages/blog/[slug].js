import React from "react";
import { useRouter } from "next/router";
import { Helmet, HeaderNav, Footer } from "@components";
import Image from "next/image";
import clock from "../../public/images/blog-page/clock.svg";
import person from "../../public/images/blog-page/person.svg";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import markdownToHtml from "./markdownconversion";

export default function BlogCategory(post) {
  const slug_post = post.post;
  const router = useRouter();
  if (!router.isFallback && !slug_post?.slug) {
    return console.log(slug_post);
  }

  function createMarkup(text) {
    return { __html: text };
  }

  return (
    <div className="blog-category-page">
      <Helmet />
      <HeaderNav />
      <main>
        <header className="container hero">
          <p>{slug_post.category}</p>
          <h1>{slug_post.title}</h1>
          <div className="meta-info">
            <p>
              <Image src={clock} height={16} width={16} alt="Clock" />
              <span>{slug_post.date}</span>
            </p>
            <p>
              <Image src={person} height={16} width={16} alt="Person" />
              <span>{slug_post.author.name}</span>
            </p>
          </div>
        </header>
        <section
          className="container blog-content"
          dangerouslySetInnerHTML={createMarkup(slug_post.content)}
        />
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "coverImage",
    "category",
  ]);

  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
