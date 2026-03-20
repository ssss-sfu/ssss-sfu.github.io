import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

import { dataset, projectId } from "../env";

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

  return imageBuilder?.image(source).auto("format").fit("max");
};
