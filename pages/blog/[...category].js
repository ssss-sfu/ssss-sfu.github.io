import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Helmet, HeaderNav, Footer, Button, BlogPostList } from "@components";
import Image from "next/image";
import clock from "../../public/images/blog-page/clock.svg";
import person from "../../public/images/blog-page/person.svg";
import Link from "next/link";

export default function BlogCategory() {
  const router = useRouter();
  const params = router.query.category;
  var category = null;
  var postid = null;
  if (params) {
    category = params[0];
    postid = params[1];
  }

  const [post, setPost] = useState(null);

  useEffect(() => {
    // console.log(category, postid)
    if (postid && category) {
      setPost({});
    } else {
      setPost(null);
    }
  }, [category, postid]);

  let testListA = [
    {
      id: "23001",
      category: "alumni",
      title: "Career Benefits of Choosing Software Systems Major",
      date: "June 6th 2023",
      author: "Jeffrey Leung",
      summary:
        "This blog post captures my trials, triumphs, and enlightening moments, offering an unfiltered glimpse into the rigorous academic odyssey of understanding these fundamental computer science concepts.",
    },
  ];
  let testListB = [
    {
      id: "23002",
      category: "alumni",
      title: "Career Benefits of Choosing Software Systems Major",
      date: "June 6th 2023",
      author: "Jeffrey Leung",
      summary:
        "This blog post captures my trials, triumphs, and enlightening moments, offering an unfiltered glimpse into the rigorous academic odyssey of understanding these fundamental computer science concepts.",
    },
    {
      id: "23003",
      category: "alumni",
      title: "SFU Graduand Surges Forward Into Software Development Career",
      date: "June 6th 2023",
      author: "Jeffrey Leung",
      summary:
        "This blog post captures my trials, triumphs, and enlightening moments, offering an unfiltered glimpse into the rigorous academic odyssey of understanding these fundamental computer science concepts.",
    },
    {
      id: "23004",
      category: "alumni",
      title: "SFU Graduand Surges Forward Into Software Development Career",
      date: "June 6th 2023",
      author: "Jeffrey Leung",
      summary:
        "This blog post captures my trials, triumphs, and enlightening moments, offering an unfiltered glimpse into the rigorous academic odyssey of understanding these fundamental computer science concepts.",
    },
    {
      id: "23005",
      category: "alumni",
      title: "SFU Graduand Surges Forward Into Software Development Career",
      date: "June 6th 2023",
      author: "Jeffrey Leung",
      summary:
        "This blog post captures my trials, triumphs, and enlightening moments, offering an unfiltered glimpse into the rigorous academic odyssey of understanding these fundamental computer science concepts.",
    },
    {
      id: "23006",
      category: "alumni",
      title: "SFU Graduand Surges Forward Into Software Development Career",
      date: "June 6th 2023",
      author: "Jeffrey Leung",
      summary:
        "This blog post captures my trials, triumphs, and enlightening moments, offering an unfiltered glimpse into the rigorous academic odyssey of understanding these fundamental computer science concepts.",
    },
  ];

  const SinglePost = () => {
    return (
      <section className="container single-post">
        <article className="content">
          {/* SAMPLE HTML (to be converted from markdown file) */}
          <h1> Heading 1... </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            nisi lacus, auctor sit amet purus vel, gravida luctus lectus. Aenean
            rhoncus dapibus enim, sit amet faucibus leo ornare vitae.
          </p>
          <h2> Heading 2... </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            nisi lacus, auctor sit amet purus vel, gravida luctus lectus. Aenean
            rhoncus dapibus enim, sit amet faucibus leo ornare vitae.
          </p>
          <h3> Heading 3... </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            nisi lacus, auctor sit amet purus vel, gravida luctus lectus. Aenean
            rhoncus dapibus enim, sit amet faucibus leo ornare vitae.
          </p>
          <h4> Heading 4... </h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            nisi lacus, auctor sit amet purus vel, gravida luctus lectus. Aenean
            rhoncus dapibus enim, sit amet faucibus leo ornare vitae.
          </p>
          <h5> Heading 5... </h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            nisi lacus, auctor sit amet purus vel, gravida luctus lectus. Aenean
            rhoncus dapibus enim, sit amet faucibus leo ornare vitae.
          </p>
          <h6> Heading 6... </h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            nisi lacus, auctor sit amet purus vel, gravida luctus lectus. Aenean
            rhoncus dapibus enim, sit amet faucibus leo ornare vitae.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            nisi lacus, auctor sit amet purus vel, gravida luctus lectus. Aenean
            rhoncus dapibus enim, sit amet faucibus leo ornare vitae. <br />
            <span> span </span>
            <b>Bold word</b>
            <i>italic</i>
            <em>emphasis</em>
            <mark>mark</mark>
            <small> small </small>
            <sub> sub </sub>
            <sup> sup </sup>
            <u> Statements... </u>
            <abbr title="National Aeronautics and Space Administration">
              NASA
            </abbr>
            <strike> strikethrough </strike>
            <span>
              <del> deprecated info </del> <ins> new info </ins>{" "}
            </span>
            <s> not relevant </s>
            <a href="#link">link</a>
            <time dateTime="2020-08-17 08:00">Monday at 8:00 AM</time>
            <br />
            <kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>CANC</kbd>
          </p>
        </article>
      </section>
    );
  };
  const Navigation = () => {
    const link = post === null ? "/blog" : `/blog/${category}`;
    const label =
      post === null ? "return to blog top" : `return to ${category} top`;
    return (
      <section className="container navigation">
        <Link href={link}>
          <a href={link}>
            <Button label={label} type="secondary" />
          </a>
        </Link>
      </section>
    );
  };
  const PostList = () => {
    return (
      <>
        <section className="container">
          <h3>Latest</h3>
          <BlogPostList list={testListA} style={"featured"} />
        </section>
        <section className="container">
          <h3>Read more</h3>
          <BlogPostList list={testListB} style={"wide"} />
        </section>
      </>
    );
  };

  return (
    <div className="blog-category-page">
      <Helmet />
      <HeaderNav />
      <main>
        <header className="container hero">
          {post === null && (
            <>
              <p>Blog</p>
              <h1>{category}</h1>
            </>
          )}
          {post !== null && (
            <>
              <p>{category}</p>
              <h1>Title of the blog post</h1>
              <div className="meta-info">
                <p>
                  <Image src={clock} height={16} width={16} alt="Clock" />
                  <span>Jan 10, 2023</span>
                </p>
                <p>
                  <Image src={person} height={16} width={16} alt="Person" />
                  <span>First Last</span>
                </p>
              </div>
            </>
          )}
        </header>
        {Navigation()}
        {post !== null && SinglePost()}
        {post === null && PostList()}
      </main>
      <Footer />
    </div>
  );
}
