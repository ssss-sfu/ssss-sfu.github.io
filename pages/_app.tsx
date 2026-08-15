import React, { FC } from "react";
import { HeaderNav, Footer, Helmet, JsonLd } from "@components";
import { useRouter } from "next/router";
import "../styles/main.scss";
import type { AppProps } from "next/app";
import { organizationJsonLd, PAGE_SEO, websiteJsonLd } from "@lib/seo.config";

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const path = router.asPath.split("?")[0]; // remove query parameters
  const lookup = PAGE_SEO[router.pathname]; // get the SEO configuration for the page

  return (
    <>
      <Helmet
        title={lookup?.title}
        description={lookup?.description}
        path={path}
      />
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      <HeaderNav />
      <Component {...pageProps} key={router.asPath} />
      <Footer />
    </>
  );
};

export default MyApp;
