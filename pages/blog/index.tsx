import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { readToken } from "@lib/sanity.api";
import { getClient } from "@lib/sanity.client";
import { getPosts, type Post } from "@lib/sanity.queries";
import { PostCard } from "@components";

export const getStaticProps: GetStaticProps<{
  posts: Post[];
}> = async ({ draftMode = false }) => {
  let posts: Post[] = [];
  try {
    const client = getClient(draftMode ? { token: readToken } : undefined);
    posts = await getPosts(client);
  } catch (_) {
    // Sanity not configured; return empty posts
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : "",
      posts,
    },
  };
};

export default function BlogPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const posts = props.posts;

  return (
    <div className="blog-page">
      <main>
        <header className="container hero">
          <p>Blog</p>
          <h1>Learn more about Software Systems at SFU</h1>
        </header>
        <section className="container">
          {posts.length ? (
            <div>
              <h2 className="category-title">Featured</h2>
              <div className="posts-list featured">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            </div>
          ) : (
            <div>No posts found. This probably means Sanity is not set up.</div>
          )}
        </section>
      </main>
    </div>
  );
}
