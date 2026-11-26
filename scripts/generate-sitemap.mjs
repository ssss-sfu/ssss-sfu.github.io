// Script to generate a sitemap.xml file for the website
// It helps search engines index the website
import { writeFile } from "node:fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://sfussss.org";
const STATIC_PATHS = [
  "/",
  "/about",
  "/events",
  "/get-involved",
  "/resources",
  "/courses",
  "/blog",
];

// escape XML characters to avoid parsing errors
function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function fetchBlogPosts() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-06-21";

  if (!projectId || !dataset) {
    console.warn(
      "Sanity env not set; sitemap will include static routes only."
    );
    return [];
  }

  const query = encodeURIComponent(
    `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
  );
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;

  // configured but failing: throw (main exits 1) rather than ship a sitemap without posts
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Sanity query failed (${res.status})`);
  }
  const json = await res.json();
  return Array.isArray(json.result) ? json.result : [];
}

function buildXml(urls) {
  const body = urls
    .map(
      // Google ignores <priority>, and ignores <lastmod> on sites where it's
      // always "today", so only real dates (blog _updatedAt) are written
      ({ loc, lastmod }) => `  <url>
    <loc>${escapeXml(loc)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

async function main() {
  const posts = await fetchBlogPosts();

  const urls = [
    ...STATIC_PATHS.map((path) => ({
      loc: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    })),
    ...posts
      .filter((post) => post?.slug)
      .map((post) => {
        const path = `/blog/${post.slug}`;
        return {
          loc: `${SITE_URL}${path}`,
          lastmod: post._updatedAt && String(post._updatedAt).slice(0, 10),
        };
      }),
  ];

  const xml = buildXml(urls);
  const outPath = join(__dirname, "..", "public", "sitemap.xml");
  await writeFile(outPath, xml, "utf8");
  console.log(`Wrote ${urls.length} URLs to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
