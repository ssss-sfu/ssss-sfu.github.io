export function resolveHref(documentType, ProjectSlugRoute) {
  switch (documentType) {
    case "home":
      return "/";
    case "page":
      return slug ? `/${slug}` : undefined;
    case "project":
      return slug ? `/projects/${slug}` : undefined;
    default:
      console.warn("Invalid document type:", documentType);
      return undefined;
  }
}
