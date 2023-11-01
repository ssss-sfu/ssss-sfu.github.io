import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { useLiveQuery } from "next-sanity/preview";

import { readToken } from "../api/sanity.api";
import { getClient } from "../api/sanity.client";
import { urlForImage } from "../api/sanity.image";
import { Helmet, HeaderNav, Footer } from "@components";
import {
  getPost,
  postBySlugQuery,
  postSlugsQuery,
} from "../api/sanity.queries";
import React from "react";
import { useRouter } from "next/router";
import clock from "../../public/images/blog-page/clock.svg";
import person from "../../public/images/blog-page/person.svg";

export const getStaticProps = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined);
  const post = await getPost(client, params.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : "",
      post,
    },
  };
};

export default function ProjectSlugRoute(props) {
  const [post] = useLiveQuery(props.post, postBySlugQuery, {
    slug: props.post.slug.current,
  });
  console.log("post", post);

  return (
    <div className="blog-category-page">
      <Helmet />
      <HeaderNav />
      <main>
        <header className="container hero">
          {post.mainImage ? (
            <Image
              className="post__cover"
              src={urlForImage(post.mainImage).url()}
              height={231}
              width={367}
              alt=""
            />
          ) : (
            <div className="post__cover--none" />
          )}
          <div>
            <h1 className="post__title">{post.title}</h1>
            <p className="post__excerpt">{post.excerpt}</p>
          </div>
          <div className="meta-info">
            <p>
              <Image src={clock} height={16} width={16} alt="Clock" />
              <span>{post._createdAt}</span>
            </p>
            <p>
              <Image src={person} height={16} width={16} alt="Person" />
              <span>{post.author.name}</span>
            </p>
          </div>
        </header>
        <div className="container blog-content">
          <PortableText value={post.body} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export const getStaticPaths = async () => {
  const client = getClient();
  const slugs = await client.fetch(postSlugsQuery);

  return {
    paths: slugs ? slugs.map(({ slug }) => `/post/${slug}`) : [],
    fallback: "blocking",
  };
};
