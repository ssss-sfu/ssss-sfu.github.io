import { Helmet, HeaderNav, Footer } from "@components";
import { Dropdown } from "components/Dropdown.jsx";

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
        <article className="container">First container</article>
        <article className="container">Second container</article>
      </main>
      <Footer />
    </div>
  );
}
