import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { BlueCursor } from "@/components/BlueCursor";
import { DotsBackground } from "@/components/DotsBackground";
import { getSeo } from "@/lib/seo";
import { articles, getAllTags, getArticleSearchText } from "@/lib/articles";

// ─── Types ────────────────────────────────────────────────────────────────────

type BlogSearch = {
  q: string;
  tags: string;
  sort: "newest" | "oldest";
  page: number;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 6;
const ALL_TAGS = getAllTags();

// ─── Helpers ─────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="font-mono-label text-muted-foreground">{children}</div>;
}

function encodeTags(tags: string[]): string {
  return tags.join(",");
}

function decodeTags(str: string): string[] {
  if (!str) return [];
  return str
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

// Manual validateSearch — avoids any Zod/coercion issues with URL string params
function validateSearch(raw: Record<string, unknown>): BlogSearch {
  const q = typeof raw.q === "string" ? raw.q : "";
  const tags = typeof raw.tags === "string" ? raw.tags : "";
  const sort = raw.sort === "oldest" ? ("oldest" as const) : ("newest" as const);
  const rawPage = raw.page;
  const page =
    typeof rawPage === "number"
      ? Math.max(1, Math.floor(rawPage))
      : typeof rawPage === "string"
        ? Math.max(1, parseInt(rawPage, 10) || 1)
        : 1;
  return { q, tags, sort, page };
}

// ─── JSON-LD for the listing page ────────────────────────────────────────────

function BlogListJsonLd() {
  const siteUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : (import.meta.env.VITE_SITE_URL as string | undefined) ?? "https://nipundhawan.me";

  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog — Nipun Dhawan",
    description:
      "Short essays on electronics, design, and the tiny decisions that make products feel right.",
    url: `${siteUrl}/blog`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${siteUrl}/blog/${a.slug}`,
        name: a.title,
      })),
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
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

// ─── Route ───────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/blog/")({
  validateSearch,
  component: BlogPage,
  head: () =>
    getSeo({
      title: "Blog — Nipun Dhawan",
      description:
        "Short essays on electronics, design, and the tiny decisions that make products feel right.",
      path: "/blog",
    }),
});

// ─── Search Icon ─────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg
      className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

// ─── Open-in-new-tab Icon ────────────────────────────────────────────────────

function ExternalLinkIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"
      />
    </svg>
  );
}

// ─── Article Card ────────────────────────────────────────────────────────────

function ArticleCard({
  article,
}: {
  article: (typeof articles)[number];
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-background/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
      {/* Cover Image */}
      {article.coverImage && (
        <Link
          to="/blog/$slug"
          params={{ slug: article.slug }}
          className="block overflow-hidden"
        >
          <div className="relative aspect-[2.2/1] overflow-hidden">
            <img
              src={article.coverImage.src}
              alt={article.coverImage.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          </div>
        </Link>
      )}

      {/* Content */}
      <div className="p-6 md:p-8">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 font-mono-label text-muted-foreground">
          <time dateTime={article.dateIso}>{article.date}</time>
          <span aria-hidden="true">•</span>
          <span>{article.readTime}</span>
        </div>

        {/* Title + open-in-new-tab */}
        <div className="mt-4 flex items-start justify-between gap-4">
          <Link
            to="/blog/$slug"
            params={{ slug: article.slug }}
            className="block flex-1"
          >
            <h2 className="font-display text-3xl leading-tight transition-colors group-hover:text-primary md:text-4xl">
              {article.title}
            </h2>
          </Link>

          {/* Explicit new-tab button */}
          <a
            href={`/blog/${article.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in new tab"
            aria-label={`Open "${article.title}" in a new tab`}
            className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:border-primary hover:bg-primary/10 hover:text-primary"
          >
            <ExternalLinkIcon />
          </a>
        </div>

        {/* Summary */}
        <Link
          to="/blog/$slug"
          params={{ slug: article.slug }}
          className="block"
        >
          <p className="mt-3 text-muted-foreground leading-relaxed">
            {article.summary}
          </p>
        </Link>

        {/* Tags + Read link */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link
            to="/blog/$slug"
            params={{ slug: article.slug }}
            className="font-mono-label text-muted-foreground transition-colors group-hover:text-primary"
          >
            Read ↗
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

function BlogPage() {
  const navigate = useNavigate({ from: "/blog" });
  const { q, tags: tagsParam, sort, page } = Route.useSearch();

  const selectedTags = decodeTags(tagsParam);

  // Local state for search input (debounced before pushing to URL)
  const [searchInput, setSearchInput] = useState(q);

  useEffect(() => {
    setSearchInput(q);
  }, [q]);

  // Debounce search into URL
  useEffect(() => {
    const id = setTimeout(() => {
      if (searchInput !== q) {
        void navigate({
          search: (prev) => ({ ...prev, q: searchInput, page: 1 }),
        });
      }
    }, 300);
    return () => clearTimeout(id);
  }, [searchInput, q, navigate]);

  // ── Filter + Sort ──────────────────────────────────────────────────────────

  const filtered = articles.filter((a) => {
    const query = q.toLowerCase();
    const matchesSearch = !query || getArticleSearchText(a).includes(query);
    const matchesTags =
      selectedTags.length === 0 || selectedTags.every((t) => a.tags.includes(t));
    return matchesSearch && matchesTags;
  });

  const sorted = [...filtered].sort((a, b) => {
    return sort === "oldest"
      ? new Date(a.dateIso).getTime() - new Date(b.dateIso).getTime()
      : new Date(b.dateIso).getTime() - new Date(a.dateIso).getTime();
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const paginated = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  // ── Callbacks ──────────────────────────────────────────────────────────────

  const toggleTag = useCallback(
    (tag: string) => {
      const next = selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag];
      void navigate({
        search: (prev) => ({ ...prev, tags: encodeTags(next), page: 1 }),
      });
    },
    [selectedTags, navigate],
  );

  const clearFilters = useCallback(() => {
    void navigate({
      search: (prev) => ({ ...prev, q: "", tags: "", page: 1 }),
    });
    setSearchInput("");
  }, [navigate]);

  const setSort = useCallback(
    (value: "newest" | "oldest") => {
      void navigate({
        search: (prev) => ({ ...prev, sort: value, page: 1 }),
      });
    },
    [navigate],
  );

  const setPage = useCallback(
    (p: number) => {
      void navigate({
        search: (prev) => ({ ...prev, page: p }),
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [navigate],
  );

  const hasActiveFilters = !!q || selectedTags.length > 0;

  return (
    <div className="relative min-h-screen text-foreground">
      <DotsBackground />
      <BlueCursor />
      <BlogListJsonLd />

      {/* ── Header ── */}
      <header className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-12">
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground font-display text-lg">
            N
          </div>
          <span className="font-mono-label">Nipun Dhawan</span>
        </div>
        <Link
          to="/"
          className="font-mono-label rounded-full border border-border px-4 py-2 transition-colors hover:border-primary hover:text-primary"
        >
          Back home
        </Link>
      </header>

      {/* ── Hero ── */}
      <section className="relative flex min-h-[70vh] items-center px-6 pt-32 md:px-12">
        <div className="max-w-5xl">
          <SectionLabel>Blog</SectionLabel>
          <h1 className="mt-8 font-display text-[12vw] leading-[0.9] md:text-[8vw]">
            thoughts, <em className="text-primary">notes</em>, and
            <br />
            experiments
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            A space to write, share, and track what I am learning as I build.
          </p>

          {/* Scroll indicator */}
          <div className="mt-12 flex items-center gap-3 text-muted-foreground/50">
            <div className="h-8 w-px bg-gradient-to-b from-muted-foreground/50 to-transparent" />
            <span className="font-mono-label text-[0.65rem]">Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <section className="border-t border-border px-6 py-10 md:px-12">
        <div className="flex flex-col gap-6">
          {/* Search + Sort row */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative flex-1" style={{ minWidth: "200px", maxWidth: "400px" }}>
              <SearchIcon />
              <input
                id="blog-search"
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search posts…"
                aria-label="Search blog posts"
                className="h-10 w-full rounded-full border border-border bg-background/80 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground backdrop-blur focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="font-mono-label text-xs text-muted-foreground">Sort:</span>
              <div className="flex gap-1 rounded-full border border-border bg-background/80 p-1">
                {(["newest", "oldest"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSort(s)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${sort === s
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                      }`}
                    aria-pressed={sort === s}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear all */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="font-mono-label rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
              >
                Clear all ✕
              </button>
            )}
          </div>

          {/* Tag chips */}
          {ALL_TAGS.length > 0 && (
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
              {ALL_TAGS.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    aria-pressed={active}
                    className={`rounded-full border px-3 py-1 text-xs uppercase tracking-widest transition-all duration-200 ${active
                        ? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/20"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                      }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Post List ── */}
      <section className="border-t border-border px-6 pb-24 pt-12 md:px-12 md:pb-32">
        <div className="mb-8 flex items-center justify-between">
          <SectionLabel>
            {sorted.length === 0
              ? "No posts found"
              : `${sorted.length} post${sorted.length !== 1 ? "s" : ""}`}
          </SectionLabel>
        </div>

        {paginated.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border/60 bg-muted/20">
              <svg
                className="h-7 w-7 text-muted-foreground/50"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <p className="text-muted-foreground">No posts match your filters.</p>
            <button
              type="button"
              onClick={clearFilters}
              className="font-mono-label rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            {paginated.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setPage(safePage - 1)}
              disabled={safePage <= 1}
              aria-label="Previous page"
              className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-30"
            >
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                aria-current={p === safePage ? "page" : undefined}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${p === safePage
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage(safePage + 1)}
              disabled={safePage >= totalPages}
              aria-label="Next page"
              className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-30"
            >
              Next →
            </button>
          </div>
        )}
      </section>

      {/* ── Write section ── */}
      <section className="border-t border-border px-6 py-24 md:px-12">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <SectionLabel>Write</SectionLabel>
          <p className="font-display text-3xl leading-tight md:text-5xl">
            I like to write because it helps me organize my thoughts and share what I've learned.
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border px-6 py-16 md:px-12">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="font-mono-label text-muted-foreground">© Nipun Dhawan — Blog</div>
          <div className="flex items-center gap-6">
            <Link to="/" className="font-mono-label text-muted-foreground transition-colors hover:text-primary">
              Back to home
            </Link>
            <Link to="/privacy" className="font-mono-label text-muted-foreground transition-colors hover:text-primary">
              Privacy
            </Link>
            <Link to="/terms" className="font-mono-label text-muted-foreground transition-colors hover:text-primary">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
