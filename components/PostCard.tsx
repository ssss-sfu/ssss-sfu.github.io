import Image from "next/image";
import { urlForImage } from "@lib/sanity.image";
import { formatDate } from "utils/index";
import clock from "@images/blog-page/clock.svg";
import Link from "next/link";
import { type Post } from "@lib/sanity.queries";

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="post">
      <Link
        as={`/blog/${post.slug.current}`}
        href="/blog/[slug]"
        className="post-link"
      >
        <article className="post">
          <div className="thumbnail">
            {post.mainImage ? (
              <Image
                src={urlForImage(post!.mainImage)!
                  .width(500)!
                  .height(300)!
                  .url()}
                alt="thumbnail"
                layout="fill"
              />
            ) : (
              <div className="post__cover--none" />
            )}

            <div className="overlay"></div>
          </div>
          <div className="text">
            <div className="title">{post.title}</div>
            <div className="meta-info">
              <Image src={clock} height={16} width={16} alt="Clock" />
              <div>{formatDate(post._createdAt)}</div>
            </div>
            <div className="summary">{post.excerpt}</div>
          </div>
        </article>
      </Link>
    </div>
  );
};
