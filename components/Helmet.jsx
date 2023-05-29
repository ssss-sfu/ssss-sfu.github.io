import Head from "next/head";

export const Helmet = ({ pageTitle = "" }) => {
  if (pageTitle.includes(" ")) {
    pages = pageTitle.split(" ");
    pages
      .map((page) => {
        return page[0].toUpperCase() + page.substring(1);
      })
      .join(" ");
    pageTitle = pages;
  }
  pageTitle = pageTitle.replace("/", "");
  pageTitle = pageTitle.replace("-", " ");
  pageTitle.toUpperCase();

  const defaultTitle = "Software Systems Student Society";
  const title = `${pageTitle} | SSSS`;
  const hasPageTitle = pageTitle.trim() !== "";

  return (
    <Head>
      <title>{hasPageTitle ? title : defaultTitle}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
};
