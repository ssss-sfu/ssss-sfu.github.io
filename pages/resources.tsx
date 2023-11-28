import React, { FC } from "react";
import { Dropdown } from "@components";
import links from "@jsons/links.json";
import faqs from "@jsons/faqs.json";

interface Link {
  text: string;
  href: string;
}

interface FAQ {
  title: string;
  content: string;
}

const ResourcesPage: FC = () => {
  return (
    <div className="page resources-page">
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
            {links.map(({ text, href }: Link, id: number) => (
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
            {faqs.map(({ title, content }: FAQ, id: number) => (
              <Dropdown
                key={id}
                id={id.toString()}
                title={title}
                content={content}
              />
            ))}
          </div>
        </article>
      </main>
    </div>
  );
};

export default ResourcesPage;
