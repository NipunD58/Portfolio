import { createStart, createMiddleware } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";
import { randomBytes } from "node:crypto";

import { renderErrorPage } from "./lib/error-page";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

const cspMiddleware = createMiddleware().server(async ({ next }) => {
  const nonce = randomBytes(18).toString("base64");
  const policy = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' https://va.vercel-scripts.com https://vitals.vercel-insights.com`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join("; ");

  setResponseHeader("Content-Security-Policy", policy);
  return next({ context: { cspNonce: nonce } });
});

export const startInstance = createStart(() => ({
  requestMiddleware: [cspMiddleware, errorMiddleware],
}));
