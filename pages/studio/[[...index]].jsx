import { NextStudio } from "next-sanity/studio";
import { Helmet } from "@components";

export default function StudioPage() {
  const hasSanityConfig =
    Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) &&
    Boolean(process.env.NEXT_PUBLIC_SANITY_DATASET);

  if (!hasSanityConfig) {
    return (
      <>
        <Helmet title="Studio | SSSS" path="/studio" noIndex={true} />
        <div>Sanity Studio is not configured.</div>
      </>
    );
  }

  const config = require("../../sanity.config").default;
  return (
    <>
      <Helmet title="Studio | SSSS" path="/studio" noIndex={true} />
      <NextStudio config={config} />
    </>
  );
}
