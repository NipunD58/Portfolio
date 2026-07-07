// ---------------------------------------------------------------------------
// Content Block System
// ---------------------------------------------------------------------------
// Each block is a discriminated union — add new types by extending this union
// and adding a renderer case in BlogDetailPage's BlockRenderer component.
// ---------------------------------------------------------------------------

export type ContentBlock =
  | { type: "heading"; level: 2 | 3 | 4; text: string; id?: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "code"; language: string; code: string; filename?: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | {
    type: "table";
    headers: string[];
    rows: string[][];
    caption?: string;
  }
  | { type: "divider" }
  | {
    type: "callout";
    variant: "info" | "warning" | "tip";
    text: string;
  };

// ---------------------------------------------------------------------------
// Article Type
// ---------------------------------------------------------------------------

export type Article = {
  slug: string;
  title: string;
  date: string;
  /** ISO 8601 date string for JSON-LD / OG article:published_time */
  dateIso: string;
  readTime: string;
  summary: string;
  tags: string[];
  /** Ordered list of content blocks — the flexible body of the article */
  content: ContentBlock[];
  /** Optional cover image shown on listing cards and as the hero */
  coverImage?: {
    src: string;
    alt: string;
  };
  /** Optional per-article OG image URL (absolute or root-relative) */
  ogImage?: string;
  /** Optional organizer for event / outreach JSON-LD */
  organizer?: {
    name: string;
    url: string;
  };
};

// ---------------------------------------------------------------------------
// Helper: slugify a heading string for anchor IDs
// ---------------------------------------------------------------------------
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ---------------------------------------------------------------------------
// Helper: compute word count from all text-bearing blocks
// ---------------------------------------------------------------------------
export function getArticleWordCount(article: Article): number {
  let words = 0;
  for (const block of article.content) {
    switch (block.type) {
      case "heading":
      case "paragraph":
      case "quote":
      case "callout":
        words += block.text.split(/\s+/).filter(Boolean).length;
        break;
      case "list":
        for (const item of block.items) {
          words += item.split(/\s+/).filter(Boolean).length;
        }
        break;
      case "table":
        for (const row of block.rows) {
          for (const cell of row) {
            words += cell.split(/\s+/).filter(Boolean).length;
          }
        }
        break;
    }
  }
  return words;
}

// ---------------------------------------------------------------------------
// Helper: extract searchable plain text from an article
// ---------------------------------------------------------------------------
export function getArticleSearchText(article: Article): string {
  const parts: string[] = [article.title, article.summary];
  for (const block of article.content) {
    switch (block.type) {
      case "heading":
      case "paragraph":
      case "quote":
      case "callout":
        parts.push(block.text);
        break;
      case "list":
        parts.push(...block.items);
        break;
    }
  }
  return parts.join(" ").toLowerCase();
}

// ---------------------------------------------------------------------------
// Helper: extract headings for a Table of Contents
// ---------------------------------------------------------------------------
export function getArticleHeadings(
  article: Article,
): { level: 2 | 3 | 4; text: string; id: string }[] {
  return article.content
    .filter(
      (b): b is Extract<ContentBlock, { type: "heading" }> =>
        b.type === "heading",
    )
    .map((h) => ({
      level: h.level,
      text: h.text,
      id: h.id ?? slugify(h.text),
    }));
}

// ---------------------------------------------------------------------------
// Articles — edit this list to add or update posts
// ---------------------------------------------------------------------------
// `slug` must be URL-safe (lowercase, hyphens). It becomes the URL segment.
// `dateIso` is used for JSON-LD and OG article:published_time.
// ---------------------------------------------------------------------------

export const articles: Article[] = [
  {
    slug: "making-a-tiny-lab-at-home",
    title: "Making a tiny lab at home",
    date: "May 24, 2026",
    dateIso: "2026-05-24T00:00:00Z",
    readTime: "4 min read",
    summary:
      "How I set up a minimal electronics corner to test ideas fast — tools, layout, and the philosophy behind keeping it simple.",
    tags: ["electronics", "process"],
    coverImage: {
      src: "https://images.unsplash.com/photo-1581092160607-ee67df30e7f2?w=1200&h=630&fit=crop&q=80",
      alt: "A compact electronics workbench with a soldering iron, multimeter, and breadboards",
    },
    content: [
      {
        type: "paragraph",
        text: "I wanted a space that made it easy to prototype without overthinking the setup. So I kept it simple: a desk, a soldering iron, a multimeter, and some essentials like an energy drink.",
      },
      {
        type: "heading",
        level: 2,
        text: "The core philosophy",
      },
      {
        type: "paragraph",
        text: "The trick is keeping the essentials within arm's reach. When the friction goes down, the experiments go up. Every time I had to dig through a drawer or walk to another room, I lost momentum.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "Keep your most-used tools within a 60cm radius of your chair. If you have to stand up to reach something you use daily, reorganize.",
      },
      {
        type: "heading",
        level: 2,
        text: "What's on my bench",
      },
      {
        type: "table",
        headers: ["Tool", "Model", "Why I chose it"],
        rows: [
          [
            "Soldering iron",
            "Pinecil V2",
            "USB-C powered, heats in 6 seconds, portable",
          ],
          [
            "Multimeter",
            "UNI-T UT61E",
            "True RMS, auto-ranging, reliable at this price",
          ],
          [
            "Power supply",
            "RD6006",
            "Programmable, compact, 0-60V / 0-6A output",
          ],
          [
            "Oscilloscope",
            "Rigol DS1054Z",
            "4-channel, upgradeable bandwidth, excellent community support",
          ],
        ],
        caption: "Core bench tools — total cost under $400",
      },
      {
        type: "heading",
        level: 2,
        text: "Layout principles",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Dominant hand side: soldering iron, wire strippers, flush cutters",
          "Center: breadboard area with good lighting",
          "Non-dominant side: multimeter, power supply, component bins",
          "Behind the monitor: oscilloscope (used less frequently)",
        ],
      },
      {
        type: "paragraph",
        text: "This arrangement means the most common action — grabbing a tool, testing a connection, adjusting a value — happens without moving my chair.",
      },
      {
        type: "heading",
        level: 3,
        text: "Lighting matters more than you think",
      },
      {
        type: "paragraph",
        text: "I use a 5000K LED desk lamp with a flexible arm. Cool white light makes solder joints easier to inspect and reduces eye strain during long sessions. Avoid warm lighting for detail work.",
      },
      {
        type: "divider",
      },
      {
        type: "heading",
        level: 2,
        text: "A sample test script",
      },
      {
        type: "paragraph",
        text: "When I'm testing a new sensor, I start with a quick validation script like this:",
      },
      {
        type: "code",
        language: "python",
        filename: "sensor_test.py",
        code: `import time
import board
import analogio

sensor = analogio.AnalogIn(board.A0)

def read_voltage():
    """Convert 16-bit ADC value to voltage (3.3V ref)."""
    return (sensor.value * 3.3) / 65536

while True:
    voltage = read_voltage()
    print(f"Voltage: {voltage:.3f}V")
    time.sleep(0.5)`,
      },
      {
        type: "heading",
        level: 2,
        text: "Final thoughts",
      },
      {
        type: "quote",
        text: "The best workspace is one that disappears. You shouldn't notice the setup — only the work.",
        attribution: "A mentor I once had",
      },
      {
        type: "paragraph",
        text: "A tiny lab doesn't need to be perfect. It needs to be ready. When an idea strikes at 11 PM, the distance between thought and prototype should be measured in seconds, not hours.",
      },
    ],
    organizer: {
      name: "Nipun Dhawan",
      url: "https://nipundhawan.com",
    },
  },
  {
    slug: "what-i-learned-building-a-demo-in-48-hours",
    title: "What I learned building a demo in 48 hours",
    date: "May 06, 2026",
    dateIso: "2026-05-06T00:00:00Z",
    readTime: "5 min read",
    summary:
      "A short sprint pushed me to focus on clarity over perfection. Here's the framework I used and what I'd change next time.",
    tags: ["product", "storytelling"],
    coverImage: {
      src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=630&fit=crop&q=80",
      alt: "A laptop on a desk with sticky notes and sketches during a sprint",
    },
    content: [
      {
        type: "paragraph",
        text: "The goal was to tell a complete story, even if the edges were rough. Every choice came back to the question: does this help the demo land?",
      },
      {
        type: "heading",
        level: 2,
        text: "Why 48 hours?",
      },
      {
        type: "paragraph",
        text: "A tight timeline forces priorities. It also makes the work feel lighter and more honest. There's no room for gold-plating when you have two days.",
      },
      {
        type: "callout",
        variant: "info",
        text: "Constraint breeds creativity. A 48-hour window eliminates scope creep and forces you to identify what actually matters to the audience.",
      },
      {
        type: "heading",
        level: 2,
        text: "The framework I used",
      },
      {
        type: "paragraph",
        text: "I broke the sprint into four phases, each roughly 12 hours:",
      },
      {
        type: "table",
        headers: ["Phase", "Duration", "Goal"],
        rows: [
          ["1. Story", "0–12h", "Define the narrative arc and key moments"],
          [
            "2. Skeleton",
            "12–24h",
            "Build the minimum UI with placeholder data",
          ],
          [
            "3. Polish",
            "24–36h",
            "Replace placeholders, add transitions, fix flow",
          ],
          [
            "4. Rehearse",
            "36–48h",
            "Practice the presentation, trim dead weight",
          ],
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Key decisions",
      },
      {
        type: "heading",
        level: 3,
        text: "Start with the ending",
      },
      {
        type: "paragraph",
        text: 'I wrote the final slide first. "Here\'s what we built and why it matters." Then I worked backwards. This keeps you anchored to the outcome instead of wandering through features.',
      },
      {
        type: "heading",
        level: 3,
        text: "Cut three things you love",
      },
      {
        type: "paragraph",
        text: "If you built something cool but it doesn't serve the story, cut it. I had a real-time visualization that was genuinely impressive, but it added 40 seconds to the flow and confused the narrative. It got cut.",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Real-time data viz — impressive but off-narrative",
          "Custom theme engine — fun to build, invisible to the audience",
          "Multi-language support — unnecessary for a demo with one audience",
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "One transition, used consistently",
      },
      {
        type: "paragraph",
        text: "I used the same fade-slide transition everywhere. Consistency makes a demo feel intentional, even when it's held together with tape.",
      },
      {
        type: "code",
        language: "css",
        filename: "transitions.css",
        code: `.demo-enter {
  opacity: 0;
  transform: translateY(12px);
  transition: all 400ms cubic-bezier(0.22, 1, 0.36, 1);
}
.demo-enter-active {
  opacity: 1;
  transform: translateY(0);
}`,
      },
      {
        type: "divider",
      },
      {
        type: "heading",
        level: 2,
        text: "What I'd change next time",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Record a backup video of the demo in case of live failures",
          "Allocate the first hour purely to outlining — don't touch code yet",
          "Have someone unfamiliar watch a dry run at the 36-hour mark",
          "Prepare two versions: a 3-minute pitch and a 10-minute deep dive",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "The takeaway",
      },
      {
        type: "quote",
        text: "A demo isn't a product walkthrough. It's a story with a beginning, a tension, and a resolution. The product is just the prop.",
      },
      {
        type: "paragraph",
        text: "Building under pressure taught me that clarity beats completeness. An audience remembers how something made them feel, not how many features it had.",
      },
      {
        type: "callout",
        variant: "warning",
        text: "Don't demo features. Demo outcomes. Show the user's life getting better, not your code getting clever.",
      },
    ],
    organizer: {
      name: "Nipun Dhawan",
      url: "https://nipundhawan.com",
    },
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Return an article by its URL slug, or undefined if not found. */
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** Return a deduplicated, sorted list of all tags across all articles. */
export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  for (const article of articles) {
    for (const tag of article.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

/**
 * Given a slug, return the previous and next articles for navigation.
 * Articles are ordered newest-first by default (as they appear in the array).
 */
export function getAdjacentArticles(slug: string): {
  prev: Article | null;
  next: Article | null;
} {
  const index = articles.findIndex((a) => a.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? articles[index - 1] : null,
    next: index < articles.length - 1 ? articles[index + 1] : null,
  };
}
