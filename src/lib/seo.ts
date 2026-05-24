type SeoOptions = {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
};

const resolveUrl = (input: string | undefined, base: string | undefined) => {
  if (!input) return undefined;
  if (/^https?:\/\//i.test(input)) return input;
  if (!base) return undefined;
  return new URL(input, base).toString();
};

export const getSeo = ({ title, description, path, ogType = "website" }: SeoOptions) => {
  const siteUrl = import.meta.env.VITE_SITE_URL as string | undefined;
  const ogImage = import.meta.env.VITE_OG_IMAGE as string | undefined;
  const canonicalUrl = resolveUrl(path, siteUrl);
  const ogImageUrl = resolveUrl(ogImage, siteUrl);
  const twitterCard = ogImageUrl ? "summary_large_image" : "summary";

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: ogType },
      { property: "og:site_name", content: "Nipun Dhawan" },
      { property: "og:locale", content: "en_US" },
      ...(canonicalUrl ? [{ property: "og:url", content: canonicalUrl }] : []),
      ...(ogImageUrl ? [{ property: "og:image", content: ogImageUrl }] : []),
      { name: "twitter:card", content: twitterCard },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      ...(canonicalUrl ? [{ name: "twitter:url", content: canonicalUrl }] : []),
      ...(ogImageUrl ? [{ name: "twitter:image", content: ogImageUrl }] : []),
    ],
    links: canonicalUrl ? [{ rel: "canonical", href: canonicalUrl }] : [],
  };
};
