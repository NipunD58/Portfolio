# Architecture — Nipun Dhawan Portfolio

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Vercel Edge Network                      │
│                                                                   │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐   │
│  │  CDN / Cache │    │  Edge SSR    │    │  Analytics Edge  │   │
│  │  (static     │    │  (TanStack   │    │  (cookie-free,   │   │
│  │   assets)    │    │   Start +    │    │   IP-anonymised) │   │
│  └──────────────┘    │   Nitro)     │    └──────────────────┘   │
│                       └──────────────┘                           │
└─────────────────────────────────────────────────────────────────┘
              ▲                   ▲
              │ HTTP/2            │ HTTP/2
              │                  │
        ┌─────┴──────────────────┴──────┐
        │          Browser               │
        │  React 19 (hydrated SPA after │
        │  first SSR paint)             │
        └───────────────────────────────┘
```

## Request Flow

```
User → Vercel Edge CDN
           │
           ├─ Static asset? → Serve from CDN cache (immutable, 1yr)
           │
           └─ Page request? → Nitro SSR handler
                                    │
                                    ├─ TanStack Router matches route
                                    ├─ Route loader runs (data from articles.ts)
                                    ├─ React renders to HTML string
                                    ├─ SEO meta injected via getSeo()
                                    └─ HTML + hydration script → Browser
```

## Data Flow

```
articles.ts (hardcoded TypeScript)
      │
      ├─ getAllArticles()      → /blog index
      ├─ getArticleBySlug()   → /blog/:slug
      └─ Article[]            → JSON-LD structured data
```

## Third-Party Services

| Service | Purpose | Data shared | Privacy-friendly? |
|---|---|---|---|
| Vercel Analytics | Page view counting | Anonymised IP, UA string | ✅ No cookies, no cross-site tracking |
| Vercel Speed Insights | Core Web Vitals | Performance timings | ✅ No PII |
| Google Fonts | Font delivery | IP address (CDN request) | ⚠️ Disclosed in Privacy Policy |

## Security Posture

| Layer | Control |
|---|---|
| Transport | HTTPS enforced via HSTS (`max-age=63072000; preload`) |
| Clickjacking | `X-Frame-Options: DENY` |
| MIME sniffing | `X-Content-Type-Options: nosniff` |
| Script injection | `Content-Security-Policy` — allowlist only |
| Feature access | `Permissions-Policy` — camera/mic/geo disabled |
| Referrer leakage | `Referrer-Policy: strict-origin-when-cross-origin` |
| DDoS / abuse | Vercel Edge (infrastructure-level) |

## Routing

```
/                     → NipunDhawanSite (home portfolio)
/blog                 → BlogIndexPage (article listing)
/blog/:slug           → BlogDetailPage (SSR article)
/photography          → PhotographyPage
/privacy              → PrivacyPage
/terms                → TermsPage
* (404)               → NotFoundComponent
```

## Environment Variables

| Variable | Required? | Purpose |
|---|---|---|
| `VITE_SITE_URL` | Recommended | Canonical URL base for OG/Twitter meta |
| `VITE_OG_IMAGE` | Optional | Default OG image for pages without a specific one |
