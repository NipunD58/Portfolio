import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import appCss from "../styles.css?url";
import { BlueCursor } from "@/components/BlueCursor";
import { ReactLenis } from "lenis/react";

function NotFoundComponent() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(122,92,255,0.12),_transparent_28%)]" />
        <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-between px-6 py-8 md:px-12 md:py-10">
        <header className="flex items-center justify-between gap-4">
          <div>
            <div className="font-mono-label text-muted-foreground">404 / signal lost</div>
            <div className="mt-2 font-display text-2xl text-foreground">Nipun Dhawan</div>
          </div>
          <Link
            to="/"
            className="rounded-full border border-border bg-background/60 px-4 py-2 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
          >
            Home
          </Link>
        </header>

        <main className="grid flex-1 items-center lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div className="max-w-2xl py-16">
            <div className="font-mono-label text-primary">404</div>
            <h1 className="mt-6 font-display text-[18vw] leading-[0.85] md:text-[10rem]">
              page not
              <br />
              found
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
              The page you tried to open does not exist, was moved, or the link is broken.
              Use the links below to get back to the portfolio.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Go home
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center justify-center rounded-full border border-border bg-background/60 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Read the blog
              </Link>
              <Link
                to="/photography"
                className="inline-flex items-center justify-center rounded-full border border-border bg-background/60 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                View photos
              </Link>
            </div>
          </div>

          <aside className="rounded-3xl border border-border bg-background/70 p-6 shadow-2xl backdrop-blur-md md:p-8">
            <div className="font-mono-label text-muted-foreground">Quick links</div>
            <div className="mt-6 grid gap-3">
              <Link
                to="/"
                className="rounded-2xl border border-border/70 bg-muted/30 px-4 py-4 transition-colors hover:border-primary hover:bg-muted/50"
              >
                <div className="font-display text-2xl">Home</div>
                <div className="mt-1 text-sm text-muted-foreground">Back to the main portfolio.</div>
              </Link>
              <Link
                to="/blog"
                className="rounded-2xl border border-border/70 bg-muted/30 px-4 py-4 transition-colors hover:border-primary hover:bg-muted/50"
              >
                <div className="font-display text-2xl">Blog</div>
                <div className="mt-1 text-sm text-muted-foreground">Notes, experiments, and ideas.</div>
              </Link>
              <Link
                to="/photography"
                className="rounded-2xl border border-border/70 bg-muted/30 px-4 py-4 transition-colors hover:border-primary hover:bg-muted/50"
              >
                <div className="font-display text-2xl">Photography</div>
                <div className="mt-1 text-sm text-muted-foreground">A small visual archive.</div>
              </Link>
              <Link
                to="/privacy"
                className="rounded-2xl border border-border/70 bg-muted/30 px-4 py-4 transition-colors hover:border-primary hover:bg-muted/50"
              >
                <div className="font-display text-2xl">Privacy</div>
                <div className="mt-1 text-sm text-muted-foreground">How your data is handled.</div>
              </Link>
              <Link
                to="/terms"
                className="rounded-2xl border border-border/70 bg-muted/30 px-4 py-4 transition-colors hover:border-primary hover:bg-muted/50"
              >
                <div className="font-display text-2xl">Terms</div>
                <div className="mt-1 text-sm text-muted-foreground">Terms &amp; Conditions.</div>
              </Link>
            </div>
          </aside>
        </main>
      </div>
      <BlueCursor />
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
      <BlueCursor />
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Nipun Dhawan" },
      { name: "robots", content: "index,follow" },
      { name: "color-scheme", content: "dark" },
      { name: "theme-color", content: "#1f1c18" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactLenis root>
        <Outlet />
      </ReactLenis>
    </QueryClientProvider>
  );
}
