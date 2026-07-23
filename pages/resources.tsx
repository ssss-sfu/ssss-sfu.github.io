import React, { FC } from "react";
import { Dropdown, Hero } from "@components";
import HeroImage from "@images/resources-page/hero-laptop.jpeg";
import linkGroups from "@jsons/links.json";
import faqs from "@jsons/faqs.json";

interface ResourceLink {
  title: string;
  description: string;
  href: string;
}

interface LinkGroup {
  title: string;
  links: ResourceLink[];
}

interface FAQ {
  title: string;
  content: string;
}

type ResourceRow =
  | { type: "single"; group: LinkGroup }
  | { type: "pair"; groups: [LinkGroup, LinkGroup] };

/** Pair consecutive one-link groups so they sit side by side on wide screens. */
function buildResourceRows(groups: LinkGroup[]): ResourceRow[] {
  const rows: ResourceRow[] = [];
  let i = 0;

  while (i < groups.length) {
    const current = groups[i];
    const next = groups[i + 1];

    if (current.links.length === 1 && next?.links.length === 1) {
      rows.push({ type: "pair", groups: [current, next] });
      i += 2;
      continue;
    }

    rows.push({ type: "single", group: current });
    i += 1;
  }

  return rows;
}

const ResourceGroup: FC<{ group: LinkGroup }> = ({ group }) => (
  <section className="resources-group">
    <h2>{group.title}</h2>
    <ul className="resources-links">
      {group.links.map(({ title, description, href }) => (
        <li key={href}>
          <a href={href} target="_blank" rel="noreferrer">
            <span className="resources-links__title">{title}</span>
            <span className="resources-links__description">{description}</span>
          </a>
        </li>
      ))}
    </ul>
  </section>
);

const ResourcesPage: FC = () => {
  const rows = buildResourceRows(linkGroups as LinkGroup[]);

  return (
    <div className="page resources-page">
      <Hero
        title="Useful links and software"
        subtitle="Resources"
        backgroundImage={HeroImage.src}
      />
      <main className="container">
        {rows.map((row) =>
          row.type === "pair" ? (
            <div
              key={row.groups.map((group) => group.title).join("-")}
              className="resources-groups-pair"
            >
              {row.groups.map((group) => (
                <ResourceGroup key={group.title} group={group} />
              ))}
            </div>
          ) : (
            <ResourceGroup key={row.group.title} group={row.group} />
          )
        )}

        <section className="resources-faqs">
          <h2>FAQs</h2>
          <div>
            {(faqs as FAQ[]).map(({ title, content }, id) => (
              <Dropdown
                key={title}
                id={id.toString()}
                title={title}
                content={content}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ResourcesPage;
