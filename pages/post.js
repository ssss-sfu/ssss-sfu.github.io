import { useLiveQuery } from "next-sanity/preview";

import Card from "components/Card";
import { readToken } from "./api/sanity.api";
import { getClient } from "./api/sanity.client";
import { getPosts, postsQuery } from "./api/sanity.queries";
import { Helmet, HeaderNav, Footer } from "@components";
import { useRouter } from "next/router";

export const getStaticProps = async ({ draftMode = false }) => {
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
  const router = useRouter();
  const [posts] = useLiveQuery(props.posts, postsQuery);
  return (
    <div className="blog-page">
      <Helmet pageTitle={router.pathname} />
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
