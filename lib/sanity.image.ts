import createImageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";
import type { Image } from "sanity";
import { useNextSanityImage } from "next-sanity-image";
import { dataset, projectId } from "./sanity.api";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export const urlForImage = (source: Image) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder?.image(source).auto("format");
};

const configuredSanityClient = createClient({
  projectId: projectId || "",
  dataset: dataset || "",
  useCdn: true,
});

export const getImageProps = (source: Image) =>
  useNextSanityImage(configuredSanityClient, source);
