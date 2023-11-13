import Head from "next/head";

interface HelmetProps {
  pageTitle?: string;
}

export const Helmet: React.FC<HelmetProps> = ({ pageTitle = "" }) => {
  pageTitle = pageTitle.replace("/", "");
  pageTitle = pageTitle.replace("-", " ");
  pageTitle = capitalizeWords(pageTitle);

  const defaultTitle: string = "Software Systems Student Society";
  const title: string = `${pageTitle} | SSSS`;
  const hasPageTitle: boolean = pageTitle.trim() !== "";

  function capitalizeWords(item: string): string {
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

export default Helmet;
