import { Helmet, HeaderNav, Footer } from "@components";
import { Dropdown } from "components/Dropdown.jsx";
import { useRouter } from "next/router";
import links from "@jsons/links.json";
import faqs from "@jsons/faqs.json";

export default function ResourcesPage() {
  const router = useRouter();
  return (
    <div className="resources-page">
      <Helmet pageTitle={router.pathname} />
      <HeaderNav />
      <main>
        <header className="container hero">
          <p>Resources</p>
          <h1>Useful links and software</h1>
        </header>

        <article className="container">
          <header>
            <h2>Resources</h2>
          </header>
          <br />
          <ul className="resources-links">
            {links.map(({ text, href }, id) => (
              <li key={id}>
                <a href={href} target="_blank" rel="noreferrer">
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </article>

        <article className="container">
          <header>
            <h2>FAQs</h2>
          </header>

          <div>
            {faqs.map(({ title, content }, id) => (
              <Dropdown key={id} id={id} title={title} content={content} />
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
