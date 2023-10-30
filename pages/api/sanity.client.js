import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "./sanity.api";

export function getClient(preview = false) {
  console.log("LAH", apiVersion, dataset, projectId, useCdn);
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: "published",
  });
  if (preview) {
    if (!preview.token) {
      throw new Error("You must provide a token to preview drafts");
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: "previewDrafts",
    });
  }
  return client;
}
