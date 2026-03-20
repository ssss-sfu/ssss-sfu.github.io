import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "./sanity.api";

function getImageBuilder() {
  if (!projectId || !dataset) {
    return null;
  }

  return createImageUrlBuilder({
    projectId,
    dataset,
  });
}

export const urlForImage = (source: Image) => {
  const imageBuilder = getImageBuilder();

  if (!imageBuilder) {
    return undefined;
  }

  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder?.image(source).auto("format");
};
