import { NextStudio } from "next-sanity/studio";

export default function StudioPage() {
  const hasSanityConfig =
    Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) &&
    Boolean(process.env.NEXT_PUBLIC_SANITY_DATASET);

  if (!hasSanityConfig) {
    return <div>Sanity Studio is not configured.</div>;
  }

  const config = require("../../sanity.config").default;
  return <NextStudio config={config} />;
}
