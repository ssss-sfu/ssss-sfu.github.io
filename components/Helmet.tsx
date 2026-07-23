import Head from "next/head";
import {
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  absoluteURL,
} from "@lib/seo.config";

interface HelmetProps {
  title?: string;
  description?: string;
  path: string; // path of the page "/about", "/blog/post-title"
  image?: string; // unused for now
  type?: "website" | "article";
  noIndex?: boolean;
}

export const Helmet: React.FC<HelmetProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  noIndex = false,
}) => {
  const canonical = absoluteURL(path);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Head>
  );
};

export default Helmet;
