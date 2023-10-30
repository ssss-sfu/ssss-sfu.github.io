// import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from "next-sanity/preview";

import Card from "components/Card";
// import Container from '~/components/Container'
// import Welcome from '~/components/Welcome'
import { readToken } from "./api/sanity.api";
import { getClient } from "./api/sanity.client";
import { getPosts, postsQuery } from "./api/sanity.queries";
import { Helmet, HeaderNav, Footer } from "@components";
import { BlogPost } from "components/BlogPostPreview";
import { BlogPostPreviewList } from "components/BlogPostPreviewList";
import { useState, useEffect } from "react";
import { getAllPosts } from "../lib/api";
// import type { SharedPageProps } from '~/pages/_app'

export const getStaticProps = async ({ draftMode = false }) => {
  console.log("readToken", readToken);
  const client = getClient(draftMode ? { token: readToken } : undefined);
  const posts = await getPosts(client);

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : "",
      posts,
    },
  };
};

export default function Post(props) {
  console.log("HELLO", props);
  console.log("postsQuery", postsQuery);

  const [posts] = useLiveQuery(props.posts, postsQuery);
  console.log("posts", posts);
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
          {posts.length ? (
            <div>
              <h3 className="category-title">Featured</h3>
              <div className="posts-list featured">
                {posts.map((post) => (
                  <Card key={post._id} post={post} />
                ))}
              </div>
            </div>
          ) : (
            <div>No post at the moment</div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
