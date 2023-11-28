import createImageUrlBuilder from "@sanity/image-url";

import { dataset, projectId } from "../env";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export const urlForImage = (source: SanityImageSource) => {
  return imageBuilder?.image(source).auto("format").fit("max");
};
