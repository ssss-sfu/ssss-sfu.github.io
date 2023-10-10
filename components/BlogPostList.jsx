import { useRouter } from "next/router";
import Image from "next/image";
import clock from "../public/images/blog-page/clock.svg";
import person from "../public/images/blog-page/person.svg";
import { Helmet, HeaderNav, Footer } from "@components";
import Link from "next/link";

export const BlogPostList = ({
  style,
  title,
  date,
  slug,
  author,
  coverImage,
  excerpt,
  category,
}) => {
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
