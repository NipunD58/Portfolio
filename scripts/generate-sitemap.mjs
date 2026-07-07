#!/usr/bin/env node
/**
 * generate-sitemap.mjs
 * Generates public/sitemap.xml from the articles list.
 * Run: node scripts/generate-sitemap.mjs
 * Also called automatically during `npm run build` via the prebuild script.
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ── Article data (duplicated from src/lib/articles.ts to avoid TS transpile) ──
const articles = [
  {
    slug: "making-a-tiny-lab-at-home",
    dateIso: "2026-05-24T00:00:00Z",
  },
  {
    slug: "what-i-learned-building-a-demo-in-48-hours",
    dateIso: "2026-05-06T00:00:00Z",
  },
];

const SITE_URL = process.env.VITE_SITE_URL ?? "https://nipundhawan.me";

function buildUrl(path) {
  return new URL(path, SITE_URL).toString();
}

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const today = new Date().toISOString().split("T")[0];

const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly", lastmod: today },
  { path: "/blog", priority: "0.9", changefreq: "weekly", lastmod: today },
  { path: "/photography", priority: "0.8", changefreq: "monthly", lastmod: today },
  { path: "/privacy", priority: "0.3", changefreq: "yearly", lastmod: today },
  { path: "/terms", priority: "0.3", changefreq: "yearly", lastmod: today },
];

const urlElements = [
  ...staticRoutes.map(
    ({ path, priority, changefreq, lastmod }) => `
  <url>
    <loc>${escapeXml(buildUrl(path))}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  ),
  ...articles.map(
    (article) => `
  <url>
    <loc>${escapeXml(buildUrl(`/blog/${article.slug}`))}</loc>
    <lastmod>${article.dateIso.split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
  ),
].join("");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlElements}
</urlset>`;

mkdirSync(join(ROOT, "public"), { recursive: true });
const outputPath = join(ROOT, "public", "sitemap.xml");
writeFileSync(outputPath, xml, "utf-8");
console.log(`✓ sitemap.xml written to ${outputPath}`);
