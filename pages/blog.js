import { Helmet, HeaderNav, Footer } from "@components";
import Image from "next/image";
import clock from "../public/images/blog-page/clock.svg";
import person from "../public/images/blog-page/person.svg";

// for testing purpose only. to be replace dynamically loaded from list of post info.
import thumbnailSample from "../public/images/blog-page/hero-blog.jpg";
import thumbnailSample1 from "../public/images/blog-page/uploads/post-thumbnail-sample1.jpg";
import thumbnailSample2 from "../public/images/blog-page/uploads/post-thumbnail-sample2.jpg";
import thumbnailSample3 from "../public/images/blog-page/uploads/post-thumbnail-sample3.jpg";

export default function ResourcesPage() {
  return (
    <div className="blog-page">
      <Helmet />
      <HeaderNav />
      <main>
        <header className="container hero">
          <p>Blog</p>
          <h1>Learn more about Software Systems at SFU</h1>
        </header>
        <section className="container">
          <h3 className="category-title">Featured</h3>
          <div className="posts-list featured">
            <article className="post">
              <div className="thumbnail">
                <Image src={thumbnailSample} alt="thumbnail" />
                <div className="overlay"></div>
              </div>
              <div className="text">
                <h4 className="title">
                  What Makes Software Systems Major Special?
                </h4>
                <div className="meta-info">
                  <Image src={clock} height={16} width={16} alt="Clock" />
                  <p>June 6th 2023</p>
                  <Image src={person} height={16} width={16} alt="Person" />
                  <p>First Last</p>
                </div>
                <p className="summary">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummr se the 1500s, when an unknown printer took a
                  galley of type and scrambled it to make a type specimen book.
                </p>
              </div>
            </article>
          </div>
        </section>
        <section className="container">
          <h3 className="category-title">Alumni</h3>
          <div className="posts-list col-3">
            <article className="post">
              <div className="thumbnail">
                <Image src={thumbnailSample2} alt="thumbnail" />
                <div className="overlay"></div>
              </div>
              <div className="text">
                <h4 className="title">Title of the blog post</h4>
                <div className="meta-info">
                  <Image src={clock} height={16} width={16} alt="Clock" />
                  <p>June 6th 2023</p>
                  <Image src={person} height={16} width={16} alt="Person" />
                  <p>First Last</p>
                </div>
                <p className="summary">
                  Lorem Ipsum is simply dummy text of the printing and typeser
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </p>
              </div>
            </article>
            <article className="post">
              <div className="thumbnail">
                <Image src={thumbnailSample3} alt="thumbnail" />
                <div className="overlay"></div>
              </div>
              <div className="text">
                <h4 className="title">Title of the blog post</h4>
                <div className="meta-info">
                  <Image src={clock} height={16} width={16} alt="Clock" />
                  <p>June 6th 2023</p>
                  <Image src={person} height={16} width={16} alt="Person" />
                  <p>First Last</p>
                </div>
                <p className="summary">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting induorem Ipsum has been the industry's standard
                  dummy text ever since the 1500s, when an unknown printer took
                  a galley of type and scrambled it to make a type specimen
                  book.
                </p>
              </div>
            </article>
            <article className="post">
              <div className="thumbnail">
                <Image src={thumbnailSample2} alt="thumbnail" />
                <div className="overlay"></div>
              </div>
              <div className="text">
                <h4 className="title">Title of the blog post</h4>
                <div className="meta-info">
                  <Image src={clock} height={16} width={16} alt="Clock" />
                  <p>June 6th 2023</p>
                  <Image src={person} height={16} width={16} alt="Person" />
                  <p>First Last</p>
                </div>
                <p className="summary">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorempsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </article>
          </div>
          <p className="see-more">
            <button>See more</button>
          </p>
        </section>
        <section className="container">
          <h3 className="category-title">Co-op Experience</h3>
          <div className="posts-list col-1">
            <article className="post">
              <div className="thumbnail">
                <Image src={thumbnailSample3} alt="thumbnail" />
                <div className="overlay"></div>
              </div>
              <div className="text">
                <h4 className="title">Title of the blog post</h4>
                <div className="meta-info">
                  <Image src={clock} height={16} width={16} alt="Clock" />
                  <p>June 6th 2023</p>
                  <Image src={person} height={16} width={16} alt="Person" />
                  <p>First Last</p>
                </div>
                <p className="summary">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting in Lorem Ipsum has been the industry's standard
                  dummy text ever since the 1500s, when an unknown printer took
                  a galley of type and scrambled it to make a type specimen
                  book.
                </p>
              </div>
            </article>
            <article className="post">
              <div className="thumbnail">
                <Image src={thumbnailSample2} alt="thumbnail" />
                <div className="overlay"></div>
              </div>
              <div className="text">
                <h4 className="title">Title of the blog post</h4>
                <div className="meta-info">
                  <Image src={clock} height={16} width={16} alt="Clock" />
                  <p>June 6th 2023</p>
                  <Image src={person} height={16} width={16} alt="Person" />
                  <p>First Last</p>
                </div>
                <p className="summary">
                  Lorem Ipsum is simply dummy text of the printing and standard
                  dummy text ever since the 1500s, when an unknown printer took
                  a galley of type and scrambled it to make a type specimen
                  book.
                </p>
              </div>
            </article>
          </div>
          <p className="see-more">
            <button>See more</button>
          </p>
        </section>
        <section className="container">
          <h3 className="category-title">Undergraduate Study</h3>
          <div className="posts-list col-3">
            <article className="post">
              <div className="thumbnail">
                <Image src={thumbnailSample3} alt="thumbnail" />
                <div className="overlay"></div>
              </div>
              <div className="text">
                <h4 className="title">Title of the blog post</h4>
                <div className="meta-info">
                  <Image src={clock} height={16} width={16} alt="Clock" />
                  <p>June 6th 2023</p>
                  <Image src={person} height={16} width={16} alt="Person" />
                  <p>First Last</p>
                </div>
                <p className="summary">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy tver since the 1500s, when an unknown printer
                  took a galley of type and scrambled it to make a type specimen
                  book.
                </p>
              </div>
            </article>
            <article className="post">
              <div className="thumbnail">
                <Image src={thumbnailSample1} alt="thumbnail" />
                <div className="overlay"></div>
              </div>
              <div className="text">
                <h4 className="title">Title of the blog post</h4>
                <div className="meta-info">
                  <Image src={clock} height={16} width={16} alt="Clock" />
                  <p>June 6th 2023</p>
                  <Image src={person} height={16} width={16} alt="Person" />
                  <p>First Last</p>
                </div>
                <p className="summary">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's r
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </p>
              </div>
            </article>
            <article className="post">
              <div className="thumbnail">
                <Image src={thumbnailSample2} alt="thumbnail" />
                <div className="overlay"></div>
              </div>
              <div className="text">
                <h4 className="title">Title of the blog post</h4>
                <div className="meta-info">
                  <Image src={clock} height={16} width={16} alt="Clock" />
                  <p>June 6th 2023</p>
                  <Image src={person} height={16} width={16} alt="Person" />
                  <p>First Last</p>
                </div>
                <p className="summary">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting e 1500s, when an unknown printer took a galley of
                  type and scrambled it to make a type specimen book.
                </p>
              </div>
            </article>
          </div>
          <p className="see-more">
            <button>See more</button>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
