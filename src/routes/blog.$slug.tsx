import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useRef } from "react";
import { BlueCursor } from "@/components/BlueCursor";
import { DotsBackground } from "@/components/DotsBackground";
import { getSeo } from "@/lib/seo";
import {
  getArticleBySlug,
  getAdjacentArticles,
  getArticleHeadings,
  getArticleWordCount,
  slugify,
} from "@/lib/articles";
import type { Article, ContentBlock } from "@/lib/articles";

// ─── JSON-LD component ────────────────────────────────────────────────────────

function JsonLd({ article }: { article: Article }) {
  const siteUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : (import.meta.env.VITE_SITE_URL as string | undefined) ?? "https://nipundhawan.me";

  const articleUrl = `${siteUrl}/blog/${article.slug}`;
  const wordCount = getArticleWordCount(article);

  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.summary,
    datePublished: article.dateIso,
    url: articleUrl,
    wordCount,
    author: {
      "@type": "Person",
      name: "Nipun Dhawan",
      url: siteUrl,
    },
    ...(article.organizer
      ? {
        publisher: {
          "@type": "Organization",
          name: article.organizer.name,
          url: article.organizer.url,
        },
      }
      : {}),
    ...(article.coverImage
      ? {
        image: {
          "@type": "ImageObject",
          url: (() => {
            const img = article.coverImage!.src;
            if (/^https?:\/\//i.test(img)) return img;
            return `${siteUrl}${img}`;
          })(),
          description: article.coverImage.alt,
        },
      }
      : {}),
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
        { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ─── Reading Progress Bar ────────────────────────────────────────────────────

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min(100, (scrollTop / docHeight) * 100));
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed left-0 right-0 top-0 z-50 h-0.5"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, oklch(0.55 0.22 255), oklch(0.7 0.18 280))",
        }}
      />
    </div>
  );
}

// ─── Table of Contents ───────────────────────────────────────────────────────

function TableOfContents({ article }: { article: Article }) {
  const headings = getArticleHeadings(article);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 },
    );

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav
      className="hidden xl:block"
      aria-label="Table of contents"
    >
      <div className="sticky top-28">
        <div className="font-mono-label mb-4 text-xs text-muted-foreground">
          On this page
        </div>
        <ul className="space-y-2 border-l border-border pl-4">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`block text-sm transition-colors duration-200 ${h.level === 3 ? "pl-3" : h.level === 4 ? "pl-6" : ""
                  } ${activeId === h.id
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

// ─── Block Renderer ──────────────────────────────────────────────────────────

function BlockRenderer({
  block,
  index,
  articleSlug,
}: {
  block: ContentBlock;
  index: number;
  articleSlug: string;
}) {
  const key = `${articleSlug}-block-${index}`;

  switch (block.type) {
    case "heading": {
      const id = block.id ?? slugify(block.text);
      const Tag = `h${block.level}` as "h2" | "h3" | "h4";
      const sizes = {
        2: "font-display text-3xl md:text-4xl mt-12 mb-4",
        3: "font-display text-2xl md:text-3xl mt-10 mb-3",
        4: "font-display text-xl md:text-2xl mt-8 mb-2",
      };
      return (
        <Tag
          key={key}
          id={id}
          className={`group relative scroll-mt-24 ${sizes[block.level]}`}
        >
          <a
            href={`#${id}`}
            className="absolute -left-6 top-1/2 -translate-y-1/2 text-primary opacity-0 transition-opacity group-hover:opacity-100"
            aria-label={`Link to ${block.text}`}
          >
            #
          </a>
          {block.text}
        </Tag>
      );
    }

    case "paragraph":
      return (
        <p key={key} className="text-foreground/90 leading-relaxed text-lg">
          {block.text}
        </p>
      );

    case "image":
      return (
        <figure
          key={key}
          className="my-8 overflow-hidden rounded-xl border border-border bg-muted/20"
        >
          <img
            src={block.src}
            alt={block.alt}
            loading="lazy"
            className="h-auto w-full object-cover"
          />
          {block.caption && (
            <figcaption className="px-4 py-3 text-sm text-muted-foreground">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "code":
      return <CodeBlock key={key} block={block} />;

    case "quote":
      return (
        <blockquote
          key={key}
          className="my-6 border-l-2 border-primary/60 pl-6 italic"
        >
          <p className="text-lg text-foreground/80 leading-relaxed">
            "{block.text}"
          </p>
          {block.attribution && (
            <cite className="mt-2 block text-sm not-italic text-muted-foreground">
              — {block.attribution}
            </cite>
          )}
        </blockquote>
      );

    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";
      return (
        <ListTag
          key={key}
          className={`my-4 space-y-2 pl-6 text-foreground/90 leading-relaxed text-lg ${block.ordered ? "list-decimal" : "list-disc"
            }`}
        >
          {block.items.map((item, i) => (
            <li key={`${key}-item-${i}`} className="pl-1">
              {item}
            </li>
          ))}
        </ListTag>
      );
    }

    case "table":
      return (
        <div key={key} className="my-8">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {block.headers.map((header, i) => (
                    <th
                      key={`${key}-th-${i}`}
                      className="px-4 py-3 font-mono-label text-xs text-muted-foreground normal-case tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr
                    key={`${key}-row-${ri}`}
                    className="border-b border-border/50 last:border-0 transition-colors hover:bg-muted/20"
                  >
                    {row.map((cell, ci) => (
                      <td
                        key={`${key}-cell-${ri}-${ci}`}
                        className="px-4 py-3 text-foreground/90"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && (
            <p className="mt-2 text-center text-xs text-muted-foreground">
              {block.caption}
            </p>
          )}
        </div>
      );

    case "divider":
      return (
        <div key={key} className="my-10 flex items-center justify-center gap-2">
          <div className="h-px w-8 bg-border" />
          <div className="h-1 w-1 rounded-full bg-primary/50" />
          <div className="h-px w-8 bg-border" />
        </div>
      );

    case "callout": {
      const styles = {
        info: {
          border: "border-blue-500/30",
          bg: "bg-blue-500/5",
          icon: "text-blue-400",
          iconPath: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        },
        warning: {
          border: "border-amber-500/30",
          bg: "bg-amber-500/5",
          icon: "text-amber-400",
          iconPath:
            "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z",
        },
        tip: {
          border: "border-emerald-500/30",
          bg: "bg-emerald-500/5",
          icon: "text-emerald-400",
          iconPath:
            "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18",
        },
      };
      const s = styles[block.variant];
      return (
        <div
          key={key}
          className={`my-6 flex gap-3 rounded-xl border ${s.border} ${s.bg} p-4`}
        >
          <svg
            className={`mt-0.5 h-5 w-5 shrink-0 ${s.icon}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={s.iconPath} />
          </svg>
          <p className="text-sm leading-relaxed text-foreground/80">{block.text}</p>
        </div>
      );
    }

    default:
      return null;
  }
}

// ─── Code Block with Copy button ─────────────────────────────────────────────

function CodeBlock({
  block,
}: {
  block: Extract<ContentBlock, { type: "code" }>;
}) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(block.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable
    }
  }, [block.code]);

  return (
    <div className="group/code relative my-6 overflow-hidden rounded-xl border border-border bg-[oklch(0.12_0.005_60)]">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-border/50 px-4 py-2">
        <div className="flex items-center gap-2">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
          </div>
          {block.filename && (
            <span className="ml-2 font-mono-label text-[0.65rem] text-muted-foreground normal-case tracking-normal">
              {block.filename}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono-label text-[0.6rem] text-muted-foreground/60 normal-case">
            {block.language}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy code"
            className={`rounded-md px-2 py-1 text-xs font-medium transition-all ${copied
                ? "text-emerald-400"
                : "text-muted-foreground/60 opacity-0 group-hover/code:opacity-100 hover:text-foreground"
              }`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Code content */}
      <pre
        ref={codeRef}
        className="overflow-x-auto p-4 text-sm leading-relaxed text-foreground/80"
      >
        <code>{block.code}</code>
      </pre>
    </div>
  );
}

// ─── Route ───────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = getArticleBySlug(params.slug);
    if (!article) throw notFound();
    return { article, ...getAdjacentArticles(params.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [], links: [] };
    const { article } = loaderData;
    return getSeo({
      title: `${article.title} — Nipun Dhawan`,
      description: article.summary,
      path: `/blog/${article.slug}`,
      ogType: "article",
      ogImage: article.ogImage ?? article.coverImage?.src,
      ogImageAlt: article.coverImage?.alt,
      article: {
        publishedTime: article.dateIso,
        tags: article.tags,
      },
    });
  },
  component: BlogDetailPage,
});

// ─── Social Share Button ─────────────────────────────────────────────────────

function ShareButton({
  id,
  label,
  children,
  onClick,
  success,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  onClick: () => void;
  success?: boolean;
}) {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-colors ${success
          ? "border-green-500/60 bg-green-500/10 text-green-400"
          : "border-border text-muted-foreground hover:border-primary hover:text-primary"
        }`}
    >
      {children}
    </button>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

function BlogDetailPage() {
  const { article, prev, next } = Route.useLoaderData();
  const [copied, setCopied] = useState(false);

  const siteUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : (import.meta.env.VITE_SITE_URL as string | undefined) ?? "";

  const articleUrl = `${siteUrl}/blog/${article.slug}`;
  const wordCount = getArticleWordCount(article);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback — clipboard API unavailable
    }
  }, [articleUrl]);

  const handleTwitter = useCallback(() => {
    const text = encodeURIComponent(`"${article.title}" by @nipundhawan`);
    const url = encodeURIComponent(articleUrl);
    window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, "_blank", "noopener");
  }, [article.title, articleUrl]);

  const handleLinkedIn = useCallback(() => {
    const url = encodeURIComponent(articleUrl);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank",
      "noopener",
    );
  }, [articleUrl]);

  return (
    <div className="relative min-h-screen text-foreground">
      <DotsBackground />
      <BlueCursor />
      <ReadingProgress />
      <JsonLd article={article} />

      {/* ── Header ── */}
      <header className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-12">
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground font-display text-lg">
            N
          </div>
          <span className="font-mono-label">Nipun Dhawan</span>
        </div>
        <Link
          to="/blog"
          className="font-mono-label rounded-full border border-border px-4 py-2 transition-colors hover:border-primary hover:text-primary"
        >
          ← All posts
        </Link>
      </header>

      {/* ── Cover Image Hero ── */}
      {article.coverImage && (
        <div className="relative mt-16 h-[40vh] min-h-[280px] overflow-hidden md:h-[50vh]">
          <img
            src={article.coverImage.src}
            alt={article.coverImage.alt}
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
      )}

      {/* ── Layout: Content + TOC sidebar ── */}
      <div
        className={`mx-auto max-w-7xl px-6 md:px-12 ${article.coverImage ? "relative -mt-24" : "pt-32 md:pt-40"
          }`}
      >
        <div className="flex gap-12">
          {/* ── Main Content ── */}
          <main className="max-w-3xl flex-1 pb-32">
            {/* ── Breadcrumbs ── */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 font-mono-label text-xs text-muted-foreground">
                <li>
                  <Link to="/" className="transition-colors hover:text-primary">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link to="/blog" className="transition-colors hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="truncate text-foreground" aria-current="page">
                  {article.title}
                </li>
              </ol>
            </nav>

            {/* ── Article Header ── */}
            <header className="mb-10">
              <div className="font-mono-label text-muted-foreground">Blog post</div>
              <h1 className="mt-4 font-display text-5xl leading-tight md:text-6xl">
                {article.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 font-mono-label text-muted-foreground">
                <time dateTime={article.dateIso}>{article.date}</time>
                <span aria-hidden="true">•</span>
                <span>{article.readTime}</span>
                <span aria-hidden="true">•</span>
                <span>{wordCount} words</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    to="/blog"
                    search={{ tags: tag, q: "", sort: "newest", page: 1 }}
                    className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </header>

            {/* ── Article Body ── */}
            <article className="space-y-6">
              {article.content.map((block, index) => (
                <BlockRenderer
                  key={`${article.slug}-block-${index}`}
                  block={block}
                  index={index}
                  articleSlug={article.slug}
                />
              ))}
            </article>

            {/* ── Social Share ── */}
            <div className="mt-12 border-t border-border pt-10">
              <div className="font-mono-label mb-4 text-xs text-muted-foreground">
                Share this post
              </div>
              <div className="flex flex-wrap gap-3">
                <ShareButton
                  id="share-copy-link"
                  label="Copy link"
                  onClick={handleCopy}
                  success={copied}
                >
                  {copied ? (
                    <>
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                      Copy link
                    </>
                  )}
                </ShareButton>

                <ShareButton id="share-twitter" label="Share on X (Twitter)" onClick={handleTwitter}>
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Share on X
                </ShareButton>

                <ShareButton
                  id="share-linkedin"
                  label="Share on LinkedIn"
                  onClick={handleLinkedIn}
                >
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Share on LinkedIn
                </ShareButton>
              </div>
            </div>

            {/* ── Prev / Next Navigation ── */}
            <nav aria-label="Post navigation" className="mt-12 border-t border-border pt-10">
              <div className="grid gap-4 md:grid-cols-2">
                {prev ? (
                  <Link
                    to="/blog/$slug"
                    params={{ slug: prev.slug }}
                    className="group flex gap-4 rounded-2xl border border-border bg-background/80 p-6 transition-colors hover:border-primary hover:bg-muted/40"
                  >
                    {prev.coverImage && (
                      <div className="hidden h-20 w-20 shrink-0 overflow-hidden rounded-lg sm:block">
                        <img
                          src={prev.coverImage.src}
                          alt={prev.coverImage.alt}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-1">
                      <span className="font-mono-label text-xs text-muted-foreground">← Previous</span>
                      <span className="mt-1 font-display text-xl leading-snug group-hover:text-primary transition-colors">
                        {prev.title}
                      </span>
                      <span className="text-xs text-muted-foreground">{prev.date}</span>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {next ? (
                  <Link
                    to="/blog/$slug"
                    params={{ slug: next.slug }}
                    className="group flex gap-4 rounded-2xl border border-border bg-background/80 p-6 text-right transition-colors hover:border-primary hover:bg-muted/40 md:ml-auto md:flex-row-reverse md:text-left"
                  >
                    {next.coverImage && (
                      <div className="hidden h-20 w-20 shrink-0 overflow-hidden rounded-lg sm:block">
                        <img
                          src={next.coverImage.src}
                          alt={next.coverImage.alt}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-1">
                      <span className="font-mono-label text-xs text-muted-foreground">Next →</span>
                      <span className="mt-1 font-display text-xl leading-snug group-hover:text-primary transition-colors">
                        {next.title}
                      </span>
                      <span className="text-xs text-muted-foreground">{next.date}</span>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </nav>
          </main>

          {/* ── Table of Contents Sidebar ── */}
          <TableOfContents article={article} />
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-border px-6 py-16 md:px-12">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="font-mono-label text-muted-foreground">© Nipun Dhawan — Blog</div>
          <div className="flex items-center gap-6">
            <Link
              to="/blog"
              className="font-mono-label text-muted-foreground transition-colors hover:text-primary"
            >
              All posts
            </Link>
            <Link
              to="/"
              className="font-mono-label text-muted-foreground transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link
              to="/privacy"
              className="font-mono-label text-muted-foreground transition-colors hover:text-primary"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
