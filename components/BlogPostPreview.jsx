import Image from "next/image";
import clock from "@images/blog-page/clock.svg";
import person from "@images/blog-page/person.svg";
import { Helmet, HeaderNav } from "@components";
import Link from "next/link";

export class BlogPost {
  constructor(
    style = "",
    title,
    date,
    slug,
    author = "Unknown",
    coverImage,
    excerpt,
    category
  ) {
    (this.style = style),
      (this.title = title),
      (this.date = date),
      (this.slug = slug),
      (this.author = author),
      (this.coverImage = coverImage),
      (this.excerpt = excerpt),
      (this.category = category);
  }

  static fromObject(object) {
    return new BlogPost(
      object.style,
      object.title,
      object.date,
      object.slug,
      object.author,
      object.coverImage,
      object.excerpt,
      object.category
    );
  }
}

/**
 * @param {BlogPost} blogPost - blogPost class
 * @returns Preview of the blog post
 */
export const BlogPostPreview = ({ post }) => {
  return (
    <div
      className={`posts-list ${style === "wide" ? "wide" : ""}${
        style === "regular" ? "regular" : ""
      }${style === "featured" ? "featured" : ""}`}
    >
      <div className="post">
        <Helmet />
        <HeaderNav />
        <Link as={`/blog/${slug}`} href="/blog/[slug]">
          <article className="post">
            <div className="thumbnail">
              <Image src={coverImage} alt="thumbnail" layout="fill" />
              <div className="overlay"></div>
            </div>
            <div className="text">
              <div className="title">{title}</div>
              <div className="meta-info">
                <Image src={clock} height={16} width={16} alt="Clock" />
                <div>{date.toString()}</div>
                <Image src={person} height={16} width={16} alt="Person" />
                <div>{author.name}</div>
              </div>
              <div className="summary">{excerpt}</div>
            </div>
          </article>
        </Link>
      </div>
    </div>
  );
};
