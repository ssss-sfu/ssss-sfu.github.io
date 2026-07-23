/**
 * Central SEO configuration for the static site.
 */

export const SITE_URL = "https://sfussss.org";
export const DEFAULT_TITLE = "Software Systems Student Society";
export const DEFAULT_DESCRIPTION =
  "Official site of the Software Systems Student Society (SSSS) at SFU — events, resources, blog, and ways to get involved.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;
export const DEFAULT_LOCALE = "en_CA";
export const ORGANIZATION_NAME = "Software Systems Student Society";

export type PageSEO = {
  title: string;
  description: string;
};

// SEO configuration for the website
export const seoConfig = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  siteUrl: SITE_URL,
  locale: DEFAULT_LOCALE,
  openGraph: {
    type: "website" as const,
    locale: DEFAULT_LOCALE,
    url: SITE_URL,
    siteName: ORGANIZATION_NAME,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: ORGANIZATION_NAME,
      },
    ],
  },
};

export const PAGE_SEO: Record<string, PageSEO> = {
  "/": {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  "/about": {
    title: "About | SSSS",
    description:
      "Meet the Software Systems Student Society exec team and learn our mission at SFU.",
  },
  "/events": {
    title: "Events | SSSS",
    description:
      "Upcoming and annual SSSS events for Software Systems students at SFU.",
  },
  "/get-involved": {
    title: "Get Involved | SSSS",
    description:
      "Run for SSSS elections, join committees, and get involved in the Software Systems community.",
  },
  "/resources": {
    title: "Resources | SSSS",
    description:
      "Useful links, tools, and software resources for Software Systems students.",
  },
  "/courses": {
    title: "Courses | SSSS",
    description:
      "Course requirements and descriptions for the SFU Software Systems major.",
  },
  "/blog": {
    title: "Blog | SSSS",
    description:
      "Articles and updates from the Software Systems Student Society at SFU.",
  },
};

export function absoluteURL(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/") {
    return SITE_URL;
  }
  return `${SITE_URL}${clean}`;
}
