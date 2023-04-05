import { Helmet } from "@components";
import Header from "../components/header.js";
import Footer from "../components/footer.js";
import { Dropdown } from "components/Dropdown.jsx";

const links = [
  { text: "Software Systems Program page", href: "" },
  { text: "Constitution", href: "" },
  { text: "Looking to enroll in Software Systems", href: "" },
  { text: "SoSy 101", href: "" },
  { text: "Academic Repo", href: "" },
  { text: "SFU Free Software", href: "" },
];

const faqs = [
  { title: "What is Software Systems?", content: "Lorem Lorem Lorem" },
  {
    title:
      "What is the difference between Computer Science and Software Systems?",
    content: "Lorem Lorem Lorem",
  },
  { title: "How do I get on co-op?", content: "Lorem Lorem Lorem" },
];

export default function ResourcesPage() {
  return (
    <div className="resources-page">
      <Helmet />
      <Header />
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
                <a href={href} target="_blank">
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </article>

        <article className="container">
          <header>
            <h2>FAQ</h2>
          </header>

          <div>
            {faqs.map(({ title, content }, id) => (
              <Dropdown id={id} title={title} content={content} />
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
