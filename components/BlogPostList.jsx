import { useRouter } from "next/router";
import Image from "next/image";
import clock from "../public/images/blog-page/clock.svg";
import person from "../public/images/blog-page/person.svg";

// for testing purpose only. to be replace dynamically loaded from list of post info.
import thumbnailSample from "../public/images/blog-page/hero-blog.jpg";
import thumbnailSample1 from "../public/images/blog-page/uploads/post-thumbnail-sample1.jpg";
import thumbnailSample2 from "../public/images/blog-page/uploads/post-thumbnail-sample2.jpg";
import thumbnailSample3 from "../public/images/blog-page/uploads/post-thumbnail-sample3.jpg";

export const BlogPostList = ({ list, style }) => {
  const router = useRouter();
  const redirectSinglePost = (e) => {
    const category = e.currentTarget.dataset.category;
    const postid = e.currentTarget.dataset.postid;
    if (category && postid) {
      let path = `/blog/${category}/${postid}`;
      router.push(path);
    } else {
      alert(
        "Sorry something went wrong. This post is not available at the moment."
      );
    }
  };
  return (
    <div
      className={`posts-list ${style === "wide" ? "wide" : ""}${
        style === "regular" ? "regular" : ""
      }${style === "featured" ? "featured" : ""}`}
    >
      {list.map((post) => (
        <article
          className="post"
          data-category={post.category}
          data-postid={post.id}
          onClick={redirectSinglePost}
        >
          <div className="thumbnail">
            <Image src={thumbnailSample} alt="thumbnail" />
            <div className="overlay"></div>
          </div>
          <div className="text">
            <h4 className="title">{post.title}</h4>
            <div className="meta-info">
              <Image src={clock} height={16} width={16} alt="Clock" />
              <p>{post.date}</p>
              <Image src={person} height={16} width={16} alt="Person" />
              <p>{post.author}</p>
            </div>
            <p className="summary">{post.summary}</p>
          </div>
        </article>
      ))}
    </div>
  );
};
