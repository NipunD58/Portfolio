import { T as reactExports, K as jsxRuntimeExports } from "./worker-entry-BCz2n-Un.js";
import { L as Link } from "./router-DcEWlLGX.js";
import { D as DotsBackground, B as BlueCursor } from "./DotsBackground-_pb5XP7f.js";
import "node:events";
import "node:stream";
import "node:async_hooks";
import "node:stream/web";
const articles = [{
  title: "Making a tiny lab at home",
  date: "May 24, 2026",
  readTime: "4 min read",
  summary: "How I set up a minimal electronics corner to test ideas fast.",
  tags: ["electronics", "process"],
  body: ["I wanted a space that made it easy to prototype without overthinking the setup. So I kept it simple: a desk, a soldering iron, a multimeter and some essentals like an energy drink..", "The trick is keeping the essentials within arm's reach. When the friction goes down, the experiments go up."]
}, {
  title: "What I learned building a demo in 48 hours",
  date: "May 06, 2026",
  readTime: "5 min read",
  summary: "A short sprint pushed me to focus on clarity over perfection.",
  tags: ["product", "storytelling"],
  body: ["The goal was to tell a complete story, even if the edges were rough. Every choice came back to the question: does this help the demo land?", "A tight timeline forces priorities. It also makes the work feel lighter and more honest."]
}];
function SectionLabel({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono-label text-muted-foreground", children });
}
function BlogPage() {
  const [openIndex, setOpenIndex] = reactExports.useState(null);
  const openArticle = openIndex !== null ? articles[openIndex] : null;
  reactExports.useEffect(() => {
    const shouldLock = openIndex !== null;
    document.body.style.overflow = shouldLock ? "hidden" : "";
    const onKey = (e) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    if (shouldLock) {
      window.addEventListener("keydown", onKey);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DotsBackground, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BlueCursor, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground font-display text-lg", children: "N" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono-label", children: "Nipun Dhawan" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "font-mono-label rounded-full border border-border px-4 py-2 transition-colors hover:border-primary hover:text-primary", children: "Back home" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative flex min-h-screen items-center px-6 pt-32 md:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Blog" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-8 font-display text-[12vw] leading-[0.9] md:text-[8vw]", children: [
        "thoughts, ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "text-primary", children: "notes" }),
        ", and",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "experiments"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl", children: "A space to write, share, and track what I am learning as I build." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "border-t border-border px-6 py-24 md:px-12 md:py-32", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-12 md:grid-cols-[1fr_2fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Latest" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl leading-tight md:text-5xl", children: "Short essays on electronics, design, and the tiny decisions that make products feel right." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid gap-12", children: articles.map((article, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setOpenIndex(index), className: "group rounded-2xl border border-border bg-background/80 p-8 text-left shadow-lg backdrop-blur-sm transition-colors hover:bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 font-mono-label text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: article.date }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: article.readTime })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl", children: article.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono-label text-muted-foreground transition-colors group-hover:text-primary", children: "Read ↗" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: article.summary }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex flex-wrap gap-2", children: article.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-border px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground", children: tag }, tag)) })
      ] }, article.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border px-6 py-24 md:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-12 md:grid-cols-[1fr_2fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Write" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl leading-tight md:text-5xl", children: "I like to write because it helps me organize my thoughts and share what I've learned." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border px-6 py-16 md:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-between gap-4 md:flex-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono-label text-muted-foreground", children: "© Nipun Dhawan — Blog" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "font-mono-label text-muted-foreground transition-colors hover:text-primary", children: "Back to home" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BlogModal, { article: openArticle, onClose: () => setOpenIndex(null) })
  ] });
}
function BlogModal({
  article,
  onClose
}) {
  const open = !!article;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "aria-hidden": !open, className: `fixed inset-0 z-[90] flex items-end justify-center transition-opacity duration-300 md:items-center ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Close article", onClick: onClose, className: "absolute inset-0 bg-background/80 backdrop-blur-md" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `relative z-10 m-4 max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl transition-all duration-300 ${open ? "translate-y-0" : "translate-y-8"}`, children: article && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 md:p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono-label text-muted-foreground", children: "Blog post" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-5xl leading-tight md:text-6xl", children: article.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-3 font-mono-label text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: article.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: article.readTime })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "font-mono-label rounded-full border border-border px-4 py-2 hover:border-primary hover:text-primary transition-colors", children: "Close ✕" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-wrap gap-2", children: article.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-border px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground", children: tag }, tag)) }),
      article.images && article.images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-6", children: article.images.map((image, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "overflow-hidden rounded-xl border border-border bg-muted/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: image.src, alt: image.alt, className: "h-auto w-full object-cover", loading: "lazy" }),
        image.caption && /* @__PURE__ */ jsxRuntimeExports.jsx("figcaption", { className: "px-4 py-3 text-sm text-muted-foreground", children: image.caption })
      ] }, `${article.title}-image-${index}`)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 space-y-5 text-foreground/90", children: article.body.map((paragraph, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: paragraph }, `${article.title}-body-${index}`)) })
    ] }) })
  ] });
}
export {
  BlogPage as component
};
