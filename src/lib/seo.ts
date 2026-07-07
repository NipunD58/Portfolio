type SeoOptions = {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
  /** Per-page OG image. Overrides the VITE_OG_IMAGE env var when provided. */
  ogImage?: string;
  /** Alt text for the per-page OG image */
  ogImageAlt?: string;
  /** Article-specific metadata (only relevant when ogType = "article") */
  article?: {
    publishedTime: string; // ISO 8601
    tags?: string[];
  };
  icons?: {
    icon: string;
    sizes?: string;
    type?: string;
  };
};

const resolveUrl = (input: string | undefined, base: string | undefined) => {
  if (!input) return undefined;
  if (/^https?:\/\//i.test(input)) return input;
  if (!base) return undefined;
  return new URL(input, base).toString();
};

export const getSeo = ({
  title,
  description,
  path,
  ogType = "website",
  ogImage: ogImageOverride,
  ogImageAlt,
  article,
  icons,
}: SeoOptions) => {
  const siteUrl = import.meta.env.VITE_SITE_URL as string | undefined;
  const defaultOgImage = import.meta.env.VITE_OG_IMAGE as string | undefined;

  const canonicalUrl = resolveUrl(path, siteUrl);
  // Prefer per-page override, fall back to the global env var
  const ogImageUrl = resolveUrl(ogImageOverride ?? defaultOgImage, siteUrl);
  const twitterCard = ogImageUrl ? "summary_large_image" : "summary";

  const articleMeta =
    ogType === "article" && article
      ? [
        { property: "article:published_time", content: article.publishedTime },
        ...(article.tags ?? []).map((tag) => ({
          property: "article:tag",
          content: tag,
        })),
      ]
      : [];

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
      ...(ogImageUrl && ogImageAlt
        ? [{ property: "og:image:alt", content: ogImageAlt }]
        : []),
      { name: "twitter:card", content: twitterCard },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      ...(canonicalUrl ? [{ name: "twitter:url", content: canonicalUrl }] : []),
      ...(ogImageUrl ? [{ name: "twitter:image", content: ogImageUrl }] : []),
      ...articleMeta,
    ],
    links: [
      ...(canonicalUrl ? [{ rel: "canonical", href: canonicalUrl }] : []),
      ...(icons ? [{ rel: "icon", href: icons.icon, sizes: icons.sizes, type: icons.type }] : []),
    ],
  };
};
