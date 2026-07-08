# ADR-002: Content Strategy — Hardcoded in articles.ts

**Status:** Accepted  
**Date:** 2026-07  
**Author:** Nipun Dhawan

---

## Context

Needed a content authoring model for blog posts that:
- Has zero build-time external API dependencies
- Works offline and in local dev without credentials
- Is fully type-safe (TypeScript, not Markdown frontmatter strings)
- Is searchable and filterable without a database

## Decision

Content is authored directly in **`src/lib/articles.ts`** as a typed array of `Article` objects using a discriminated-union `ContentBlock` system.

```ts
export type ContentBlock =
  | { type: "heading"; level: 2 | 3 | 4; text: string }
  | { type: "paragraph"; text: string }
  | { type: "code"; language: string; code: string }
  // ...
```

### Alternatives considered

| Option | Why rejected |
|---|---|
| MDX files | Loses TypeScript type-checking on content structure |
| Contentful / Sanity | External dependency, requires API keys, adds latency |
| Local Markdown + gray-matter | Less structured; harder to add rich block types |
| Notion API | Fragile; rate-limited; no offline support |

## Consequences

- **Positive:** Zero external dependencies at runtime; fully type-safe content
- **Positive:** Content changes go through Git (versioned, reviewable, diffable)
- **Positive:** No CMS credentials or API keys needed
- **Negative:** Non-technical collaborators cannot edit content without a code editor
- **Negative:** At large scale (50+ articles), a single file becomes unwieldy

## Future Migration Path

If content volume grows beyond ~20 articles, the `Article` type and `ContentBlock` union are stable contracts — a CMS migration only requires updating the data source, not the rendering layer.
