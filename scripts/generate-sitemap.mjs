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

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function priorityForPath(path) {
  if (path === "/") return "1.0";
  if (path.startsWith("/blog/")) return "0.6";
  return "0.8";
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

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`Sanity query failed (${res.status}); static routes only.`);
      return [];
    }
    const json = await res.json();
    return Array.isArray(json.result) ? json.result : [];
  } catch (err) {
    console.warn("Sanity fetch error; static routes only.", err.message);
    return [];
  }
}

function buildXml(urls) {
  const body = urls
    .map(
      ({ loc, lastmod, priority }) => `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
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
  const today = todayIsoDate();
  const posts = await fetchBlogPosts();

  const urls = [
    ...STATIC_PATHS.map((path) => ({
      loc: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
      lastmod: today,
      priority: priorityForPath(path),
    })),
    ...posts
      .filter((post) => post?.slug)
      .map((post) => {
        const path = `/blog/${post.slug}`;
        return {
          loc: `${SITE_URL}${path}`,
          lastmod: post._updatedAt
            ? String(post._updatedAt).slice(0, 10)
            : today,
          priority: priorityForPath(path),
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
