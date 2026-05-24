import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { BlueCursor } from "@/components/BlueCursor";
import { DotsBackground } from "@/components/DotsBackground";
import { getSeo } from "@/lib/seo";

type Article = {
  title: string;
  date: string;
  readTime: string;
  summary: string;
  tags: string[];
  body: string[];
  images?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
};

// Edit this list to add or update posts.
// For images, set `images` with URLs or `new URL("../photos/FILE.jpg", import.meta.url).href`.
const articles: Article[] = [
  {
    title: "Making a tiny lab at home",
    date: "May 24, 2026",
    readTime: "4 min read",
    summary: "How I set up a minimal electronics corner to test ideas fast.",
    tags: ["electronics", "process"],
    body: [
      "I wanted a space that made it easy to prototype without overthinking the setup. So I kept it simple: a desk, a soldering iron, a multimeter and some essentals like an energy drink..",
      "The trick is keeping the essentials within arm's reach. When the friction goes down, the experiments go up.",
    ],
  },
  
  {
    title: "What I learned building a demo in 48 hours",
    date: "May 06, 2026",
    readTime: "5 min read",
    summary: "A short sprint pushed me to focus on clarity over perfection.",
    tags: ["product", "storytelling"],
    body: [
      "The goal was to tell a complete story, even if the edges were rough. Every choice came back to the question: does this help the demo land?",
      "A tight timeline forces priorities. It also makes the work feel lighter and more honest.",
    ],
  },
];

function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="font-mono-label text-muted-foreground">{children}</div>;
}

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () =>
    getSeo({
      title: "Blog — Nipun Dhawan",
      description: "Short essays on electronics, design, and the tiny decisions that make products feel right.",
      path: "/blog",
    }),
});

function BlogPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openArticle = openIndex !== null ? articles[openIndex] : null;

  useEffect(() => {
    const shouldLock = openIndex !== null;
    document.body.style.overflow = shouldLock ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    if (shouldLock) {
      window.addEventListener("keydown", onKey);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex]);

  return (
    <div className="relative min-h-screen text-foreground">
      <DotsBackground />
      <BlueCursor />

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

      <section className="relative flex min-h-screen items-center px-6 pt-32 md:px-12">
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
        </div>
      </section>

      <section className="border-t border-border px-6 py-24 md:px-12 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <SectionLabel>Latest</SectionLabel>
          <p className="font-display text-3xl leading-tight md:text-5xl">
            Short essays on electronics, design, and the tiny decisions that make products feel right.
          </p>
        </div>

        <div className="mt-16 grid gap-12">
          {articles.map((article, index) => (
            <button
              key={article.title}
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group rounded-2xl border border-border bg-background/80 p-8 text-left shadow-lg backdrop-blur-sm transition-colors hover:bg-muted/40"
            >
              <div className="flex flex-wrap items-center gap-3 font-mono-label text-muted-foreground">
                <span>{article.date}</span>
                <span aria-hidden="true">•</span>
                <span>{article.readTime}</span>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <h2 className="font-display text-4xl md:text-5xl">{article.title}</h2>
                <span className="font-mono-label text-muted-foreground transition-colors group-hover:text-primary">
                  Read ↗
                </span>
              </div>
              <p className="mt-4 text-muted-foreground">{article.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="border-t border-border px-6 py-24 md:px-12">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <SectionLabel>Write</SectionLabel>
          <p className="font-display text-3xl leading-tight md:text-5xl">
            I like to write because it helps me organize my thoughts and share what I've learned.
          </p>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-16 md:px-12">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="font-mono-label text-muted-foreground">© Nipun Dhawan — Blog</div>
          <Link to="/" className="font-mono-label text-muted-foreground transition-colors hover:text-primary">
            Back to home
          </Link>
        </div>
      </footer>

      <BlogModal article={openArticle} onClose={() => setOpenIndex(null)} />
    </div>
  );
}

function BlogModal({
  article,
  onClose,
}: {
  article: Article | null;
  onClose: () => void;
}) {
  const open = !!article;
  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[90] flex items-end justify-center transition-opacity duration-300 md:items-center ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <button
        type="button"
        aria-label="Close article"
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
      />

      <div
        className={`relative z-10 m-4 max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl transition-all duration-300 ${
          open ? "translate-y-0" : "translate-y-8"
        }`}
      >
        {article && (
          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <div className="font-mono-label text-muted-foreground">Blog post</div>
                <h2 className="mt-4 font-display text-5xl leading-tight md:text-6xl">
                  {article.title}
                </h2>
                <div className="mt-4 flex flex-wrap items-center gap-3 font-mono-label text-muted-foreground">
                  <span>{article.date}</span>
                  <span aria-hidden="true">•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="font-mono-label rounded-full border border-border px-4 py-2 hover:border-primary hover:text-primary transition-colors"
              >
                Close ✕
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            {article.images && article.images.length > 0 && (
              <div className="mt-6 grid gap-6">
                {article.images.map((image, index) => (
                  <figure
                    key={`${article.title}-image-${index}`}
                    className="overflow-hidden rounded-xl border border-border bg-muted/20"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-auto w-full object-cover"
                      loading="lazy"
                    />
                    {image.caption && (
                      <figcaption className="px-4 py-3 text-sm text-muted-foreground">
                        {image.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}

            <div className="mt-8 space-y-5 text-foreground/90">
              {article.body.map((paragraph, index) => (
                <p key={`${article.title}-body-${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
