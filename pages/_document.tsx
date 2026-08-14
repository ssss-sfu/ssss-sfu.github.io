import Document, { Html, Head, Main, NextScript } from "next/document";

const themeInitScript = `
  (function (){
    try{
      var stored = localStorage.getItem("theme");
      var theme =
        stored === "light" || stored === "dark" ? stored : window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
            ? "light"
            : "dark";
      document.documentElement.setAttribute("data-theme", theme);

    } catch (e) {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  })();
`;

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" data-theme="dark">
        <Head />
        <body>
          {/* dangerouslySetInnerHTML used to inject the theme initialization script into the document */}
          <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}