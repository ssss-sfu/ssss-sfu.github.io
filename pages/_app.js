import { HeaderNav, Footer, Helmet } from "@components";
import { useRouter } from "next/router";
import "../styles/main.scss";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Helmet pageTitle={router.pathname} />
      <HeaderNav />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
