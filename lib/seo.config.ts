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

export const SOCIAL_SAME_AS = [
  "https://www.facebook.com/ssss.sfu",
  "https://www.linkedin.com/company/ssss-sfu/",
  "https://www.instagram.com/ssss.sfu/",
  "https://discord.com/invite/whdfmJbVF7",
  "https://github.com/ssss-sfu",
];

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORGANIZATION_NAME,
    alternateName: "SSSS",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    sameAs: SOCIAL_SAME_AS,
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SSSS",
    url: SITE_URL,
  };
}

// JSON-LD for blog posts
type BlogPostingInput = {
  title?: string;
  excerpt?: string;
  slug: { current: string };
  _createdAt: string;
  author?: { name?: string };
};

// JSON-LD for blog posts
export function articleJsonLd(
  post: BlogPostingInput,
  ogImage: string
): Record<string, unknown> {
  const canonical = absoluteURL(`/blog/${post.slug.current}`);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [ogImage],
    datePublished: post._createdAt,
    author: {
      "@type": "Person",
      name: post.author?.name,
    },
    publisher: {
      "@type": "Organization",
      name: "SSSS",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
  };
}
