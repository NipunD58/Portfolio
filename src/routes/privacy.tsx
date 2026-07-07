import { createFileRoute, Link } from "@tanstack/react-router";
import { BlueCursor } from "@/components/BlueCursor";
import { DotsBackground } from "@/components/DotsBackground";
import { getSeo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () =>
    getSeo({
      title: "Privacy Policy — Nipun Dhawan",
      description:
        "How this website collects and uses data, including Vercel Analytics.",
      path: "/privacy",
    }),
});

function PrivacyPage() {
  const siteUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : (import.meta.env.VITE_SITE_URL as string | undefined) ?? "https://nipundhawan.me/";

  return (
    <div className="relative min-h-screen text-foreground">
      <DotsBackground />
      <BlueCursor />

      {/* ── Header ── */}
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

      {/* ── Content ── */}
      <main className="mx-auto max-w-3xl px-6 pb-32 pt-36 md:px-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 font-mono-label text-xs text-muted-foreground">
            <li>
              <Link to="/" className="transition-colors hover:text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground" aria-current="page">
              Privacy Policy
            </li>
          </ol>
        </nav>

        <div className="font-mono-label text-muted-foreground">Legal</div>
        <h1 className="mt-4 font-display text-5xl leading-tight md:text-6xl">Privacy Policy</h1>
        <p className="mt-4 font-mono-label text-xs text-muted-foreground">
          Last updated: July 2026
        </p>

        <div className="mt-12 space-y-10 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="font-display text-2xl mb-3">Overview</h2>
            <p>
              This website ({siteUrl}) is a personal portfolio maintained by Nipun Dhawan. I take
              your privacy seriously and aim to be transparent about what data is collected and
              why.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">Data collected by Vercel Analytics</h2>
            <p className="mb-4">
              This site uses{" "}
              <a
                href="https://vercel.com/analytics"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-2 hover:underline"
              >
                Vercel Analytics
              </a>{" "}
              and{" "}
              <a
                href="https://vercel.com/docs/speed-insights"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-2 hover:underline"
              >
                Vercel Speed Insights
              </a>{" "}
              to understand how visitors use the site and to measure performance. These tools
              collect the following information automatically:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Page views</strong> — which pages are visited and how often.
              </li>
              <li>
                <strong>Referrer</strong> — the URL you came from (e.g. a search engine or social
                network).
              </li>
              <li>
                <strong>Country / region</strong> — derived from your IP address at the server
                edge. The full IP address is never stored.
              </li>
              <li>
                <strong>Browser and operating system</strong> — general device type inferred from
                the user-agent string.
              </li>
              <li>
                <strong>Web vitals</strong> — performance metrics such as LCP, FID, and CLS.
              </li>
            </ul>
            <p className="mt-4">
              Vercel Analytics is designed to be privacy-friendly: it does not use cookies, does
              not track individuals across sessions, and does not build advertising profiles. Data
              is processed by Vercel, Inc. For full details, see{" "}
              <a
                href="https://vercel.com/docs/analytics/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-2 hover:underline"
              >
                Vercel's Privacy Policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">No cookies</h2>
            <p>
              This site does not set any first-party cookies. The analytics tools listed above do
              not use cookies either.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">Third-party services</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Google Fonts</strong> — typefaces are loaded from Google's CDN. Google may
                log your IP for serving these assets. See{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-2 hover:underline"
                >
                  Google's Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong>Vercel (hosting)</strong> — this site is hosted on Vercel. Vercel may log
                standard web server data (IP, request path, timestamps) for infrastructure
                purposes.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">Your rights</h2>
            <p>
              Because this site does not collect personal data beyond what is described above, and
              no data is stored in a user-identifiable way, there is no data for me to provide,
              correct, or delete on request. If you have questions, feel free to reach out.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">Changes to this policy</h2>
            <p>
              If the data practices described here change materially, this page will be updated
              with a new date. Continued use of the site after such changes constitutes acceptance
              of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">Contact</h2>
            <p>
              For any privacy-related questions, you can reach me via the contact details on the{" "}
              <Link to="/" className="text-primary underline-offset-2 hover:underline">
                home page
              </Link>
              .
            </p>
          </section>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-border px-6 py-16 md:px-12">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="font-mono-label text-muted-foreground">© Nipun Dhawan</div>
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="font-mono-label text-muted-foreground transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link
              to="/blog"
              className="font-mono-label text-muted-foreground transition-colors hover:text-primary"
            >
              Blog
            </Link>
            <Link
              to="/terms"
              className="font-mono-label text-muted-foreground transition-colors hover:text-primary"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
