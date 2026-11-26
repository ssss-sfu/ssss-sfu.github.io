import next from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [".next/**", "out/**", "node_modules/**", "public/**"],
  },
  ...next,
  {
    rules: {
      // we intentionally use plain <img> for static-export pages
      "@next/next/no-img-element": "off",
    },
  },
];

export default config;
