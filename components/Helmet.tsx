import Head from "next/head";
import {
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  absoluteURL,
} from "@lib/seo.config";

interface HelmetProps {
  title?: string;
  description?: string;
  path: string; // path of the page "/about", "/blog/post-title"
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

export const Helmet: React.FC<HelmetProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image,
  type = "website",
  noIndex = false,
}) => {
  const canonical = absoluteURL(path);
  const ogImage = image ?? DEFAULT_OG_IMAGE;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:site_name" content={DEFAULT_TITLE} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_CA" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="google-site-verification" content="SN3sAlX7OnA_eUivT3q1mOAzlUroosCjWRmjjjtnXlw" />
    </Head>
  );
};

export default Helmet;
