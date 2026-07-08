# ADR-001: Stack Selection

**Status:** Accepted  
**Date:** 2026-07  
**Author:** Nipun Dhawan

---

## Context

Needed to build a personal portfolio with:
- Server-side rendering for SEO (blog posts need full-page meta)
- Zero operational burden (no servers to manage)
- TypeScript throughout
- Fast iteration with hot module replacement

## Decision

**TanStack Start** (React-based meta-framework) deployed to **Vercel Edge**.

### Alternatives considered

| Option | Why rejected |
|---|---|
| Next.js | Heavier framework lock-in; TanStack router is more ergonomic |
| Astro | Less familiar React ecosystem for islands; overkill for this size |
| Remix | Good option, but TanStack Start offers type-safe routing |
| Pure Vite SPA | No SSR → poor SEO for blog routes |

## Consequences

- **Positive:** Type-safe file-based routing, SSR for blog SEO, zero-config Vercel deployment
- **Positive:** TanStack Query for potential future data-fetching without boilerplate
- **Negative:** TanStack Start is still maturing; API surface may change
- **Mitigation:** Pin minor versions and review on upgrades

---

## Deployment Target

Vercel Edge Network. The `nitro` adapter is configured in `vite.config.ts`:

```ts
nitro({ preset: process.env.VERCEL ? 'vercel' : undefined })
```

This means local dev uses the default Nitro server and production uses the Vercel preset automatically.
