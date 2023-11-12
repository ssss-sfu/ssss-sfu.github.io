import Head from "next/head";

export const Helmet = ({ pageTitle = "" }) => {
  pageTitle = pageTitle.replace("/", "");
  pageTitle = pageTitle.replace("-", " ");
  pageTitle = capitalizeWords(pageTitle);

  const defaultTitle = "Software Systems Student Society";
  const title = `${pageTitle} | SSSS`;
  const hasPageTitle = pageTitle.trim() !== "";

  function capitalizeWords(item) {
    return item
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  }

  return (
    <Head>
      <title>{hasPageTitle ? title : defaultTitle}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
};
