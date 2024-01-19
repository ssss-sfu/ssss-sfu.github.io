import { PortableText } from "@portabletext/react";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import { useLiveQuery } from "next-sanity/preview";
import { getImageDimensions } from "@sanity/asset-utils";
import { readToken } from "../../lib/sanity.api";
import { getClient } from "@lib/sanity.client";
import { urlForImage } from "@lib/sanity.image";
import { Helmet } from "@components";
import {
  getPost,
  type Post,
  postBySlugQuery,
  postSlugsQuery,
} from "@lib/sanity.queries";
import React from "react";
import clock from "../../public/images/blog-page/clock.svg";
import person from "../../public/images/blog-page/person.svg";
import { formatDate } from "utils/index";

interface Query {
  [key: string]: string;
}

export const getStaticProps: GetStaticProps<
  {
    post: Post;
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
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

// Barebones lazy-loaded image component
const SanityImage = ({ value }: { value: any }) => {
  const { width, height } = getImageDimensions(value);
  return (
    <Image
      className="post__image"
      src={urlForImage(value)!.width(400).fit("max").auto("format").url()}
      height={height * (400 / width)} // Adjust height based on the new width to maintain aspect ratio
      width={400}
      alt="Post Image"
    />
  );
};

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const [post] = useLiveQuery(props.post, postBySlugQuery, {
    slug: props.post.slug.current,
  });

  // const { width, height } = useNextSanityImage
  return (
    <div className="blog-category-page">
      <Helmet pageTitle={post.title} />
      <main>
        <header className="container hero">
          {post.mainImage ? (
            <SanityImage value={post.mainImage} />
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
              <span>{formatDate(post._createdAt)}</span>
            </p>
            <p>
              <Image src={person} height={16} width={16} alt="Person" />
              <span>{post.author.name}</span>
            </p>
          </div>
        </header>
        <div className="container blog-content">
          <PortableText
            value={post.body}
            components={{
              types: {
                image: SanityImage,
              },
            }}
          />
        </div>
      </main>
    </div>
  );
}

export const getStaticPaths = async () => {
  const client = getClient();
  const slugs: Post[] = await client.fetch(postSlugsQuery);
  const paths = slugs?.map((slug) => ({ params: { slug } })) || [];

  return {
    paths,
    fallback: false,
  };
};
