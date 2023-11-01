import Image from "next/image";

import { urlForImage } from "../pages/api/sanity.image";
// import { type Post } from '~/lib/sanity.queries'
// import { formatDate } from '~/utils'
import clock from "@images/blog-page/clock.svg";
import Link from "next/link";

export default function Card({ post }) {
  console.log("post", post);
  return (
    <div className="posts-list featured">
      <div className="post">
        <Link as={`/post/${post.slug.current}`} href="/post/[slug]">
          <article className="post">
            <div className="thumbnail">
              <Image
                src={urlForImage(post.mainImage).width(500).height(300).url()}
                alt="thumbnail"
                layout="fill"
              />
              <div className="overlay"></div>
            </div>
            <div className="text">
              <div className="title">{post.title}</div>
              <div className="meta-info">
                <Image src={clock} height={16} width={16} alt="Clock" />
                <div>{post._createdAt}</div>
              </div>
              <div className="summary">{post.excerpt}</div>
            </div>
          </article>
        </Link>
      </div>
    </div>
  );
}
