# Portfolio Website

A modern personal portfolio website built to showcase my projects, skills, achievements, and design approach. The website focuses on clean visuals, performance, accessibility, and creating a smooth browsing experience across all devices.

## Overview

This portfolio serves as both a personal brand website and a central hub for my work. It highlights selected projects, technical skills, case studies, and professional experience in an interactive and visually polished format.

The goal of the project was to create a fast, scalable, and aesthetically refined portfolio that reflects my approach to frontend development and UI/UX design.

---

## Project Information

| Category | Details |
|----------|----------|
| **Project Name** | Portfolio Website |
| **Role** | Solo Project |
| **Year** | 2026 |
| **Industry** | Web Development · Design |
| **Status** | Live |
| **Deployment** | Vercel |

---

## Brief

A personal website designed to showcase projects, technical skills, achievements, and creative work through a modern and responsive interface. The platform combines performance-focused engineering with thoughtful design to provide an engaging experience for visitors, recruiters, and potential collaborators.

---

# Features

- Fully responsive layout optimised for desktop, tablet, and mobile devices.
- Minimal and modern UI with smooth animations and transitions.
- Project showcase section with detailed case studies.
- Performance-focused architecture for fast loading times.
- Interactive user experience with accessible navigation.
- SEO optimisation for improved discoverability.
- Dark-themed visual design with consistent branding.
- Optimised image loading and asset management.
- Analytics and traffic monitoring integration.
- Bot logging and request tracking using Vercel features.

---

# Highlights

## Modern UI/UX Design

The interface was designed with simplicity and usability in mind. A clean visual hierarchy, consistent spacing system, modern typography, and subtle animations help create a polished and professional experience.

## Responsive Development

The website adapts seamlessly across different screen sizes and resolutions, ensuring accessibility and usability on mobile phones, tablets, laptops, and large displays.

## Performance Optimisation

Special attention was given to performance and loading speed by implementing:

- Optimised assets and image compression
- Lazy loading for media content
- Efficient component rendering
- Lightweight animations
- Code splitting and optimisation
- Fast deployment pipeline using Vercel

## Detailed Project Case Studies

Each featured project includes a structured breakdown covering:

- Problem statement
- Design process
- Development approach
- Technologies used
- Final solution
- Outcome and impact

This allows visitors to understand both the technical and creative aspects of the work.

---

# Tech Stack

## Deployment & Infrastructure

- Vercel
- GitHub
- Analytics & Monitoring Tools

---

# Design Goals

The primary design goals for the project were:

- Create a professional online presence
- Maintain high performance scores
- Build a scalable and maintainable codebase
- Ensure accessibility and responsiveness
- Present projects in a clear and engaging way
- Deliver smooth and intuitive interactions

---

# Performance

The website was built with a strong focus on frontend optimisation and user experience.

### Optimisations Implemented

- Optimised font loading
- Image optimisation
- Static asset caching
- Lazy loading
- Reduced layout shifts
- Improved accessibility structure
- SEO metadata optimisation

---

# Deployment

The project is deployed and managed using **Vercel**, providing:

- Fast global CDN delivery
- Automatic deployments
- Preview environments
- Speed analytics
- Bot detection and logging
- Traffic monitoring

---

# Future Improvements

Planned improvements and future additions include:

- Blog section for articles and tutorials
- CMS integration for easier content management
- Interactive project filtering
- Advanced animations and transitions
- Multi-language support
- More detailed analytics dashboard

---

# Learning Outcomes

This project helped strengthen skills in:

- Frontend architecture
- Responsive web design
- UI/UX design principles
- Performance optimisation
- Deployment workflows
- Accessibility best practices
- Modern React ecosystem development

---

# Conclusion

This portfolio website represents a combination of design, development, and performance engineering. The project was built to create a professional digital presence while also serving as a platform to showcase technical skills, creativity, and problem-solving ability.
It continues to evolve with new features, projects, and improvements over time.

---

# Development

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server (Vite HMR) |
| `npm run typecheck` | TypeScript type-check without output |
| `npm run lint` | ESLint check |
| `npm run check` | Typecheck + lint (run before committing) |
| `npm run build` | Production build (runs sitemap generation first) |
| `npm run preview` | Preview the production build locally |

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_SITE_URL` | Recommended | Canonical URL (e.g. `https://nipundhawan.me`). Used for OG and canonical meta tags. |
| `VITE_OG_IMAGE` | Optional | Default OG image URL for pages without a specific one. |

Set these in Vercel → Project Settings → Environment Variables for production.

---

# Production Checklist

Before deploying:

- [ ] `npm run check` passes (typecheck + lint)
- [ ] `npm run build` succeeds
- [ ] `VITE_SITE_URL` is set in Vercel environment variables
- [ ] Custom domain is configured in Vercel
- [ ] `vercel.json` security headers are deployed (verify with [securityheaders.com](https://securityheaders.com))
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev) — target 95+ on all metrics
- [ ] Run [WAVE accessibility tool](https://wave.webaim.org) on all 4 routes

---

# Architecture & Docs

See the [`docs/`](./docs/) directory for:

- [ADR-001: Stack Selection](./docs/ADR-001-stack.md)
- [ADR-002: Content Strategy](./docs/ADR-002-content.md)
- [Architecture Overview](./docs/architecture.md)
