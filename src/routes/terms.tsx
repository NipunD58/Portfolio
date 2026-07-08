import { createFileRoute, Link } from "@tanstack/react-router";
import { BlueCursor } from "@/components/BlueCursor";
import { DotsBackground } from "@/components/DotsBackground";
import { getSeo } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () =>
    getSeo({
      title: "Terms & Conditions — Nipun Dhawan",
      description:
        "Terms governing your use of this personal portfolio website.",
      path: "/terms",
    }),
});

function TermsPage() {
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
              Terms & Conditions
            </li>
          </ol>
        </nav>

        <div className="font-mono-label text-muted-foreground">Legal</div>
        <h1 className="mt-4 font-display text-5xl leading-tight md:text-6xl">
          Terms &amp; Conditions
        </h1>
        <p className="mt-4 font-mono-label text-xs text-muted-foreground">
          Last updated: July 2026
        </p>

        <div className="mt-12 space-y-10 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="font-display text-2xl mb-3">Acceptance of terms</h2>
            <p>
              By accessing or using {siteUrl} (the "Site"), you agree to be bound by these Terms
              &amp; Conditions. If you do not agree, please stop using the Site immediately.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">Content ownership</h2>
            <p>
              All text, images, design, and code on this Site are the property of Nipun Dhawan
              unless otherwise noted. You may not reproduce, distribute, or create derivative works
              from any content on this Site without express written permission.
            </p>
            <p className="mt-3">
              Quoting short excerpts for non-commercial commentary or review purposes, with clear
              attribution and a link back to the original page, is permitted.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">No warranties</h2>
            <p>
              This Site is provided "as is" without warranties of any kind, express or implied.
              While I aim to keep all content accurate and up to date, I make no guarantees
              regarding accuracy, completeness, or fitness for a particular purpose.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">Limitation of liability</h2>
            <p>
              To the fullest extent permitted by applicable law, Nipun Dhawan's total liability
              for any claim arising out of or relating to this Site or its content shall not
              exceed ₹0 (zero rupees), as this Site is a free personal portfolio with no
              commercial transaction. In no event shall Nipun Dhawan be liable for any indirect,
              incidental, special, consequential, or punitive damages, regardless of the cause of
              action or the theory of liability, even if advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">Dispute resolution &amp; arbitration</h2>
            <p>
              Any dispute, controversy, or claim arising out of or in connection with these Terms,
              or the breach, termination, or invalidity thereof, shall first be attempted to be
              resolved through good-faith negotiation between the parties.
            </p>
            <p className="mt-3">
              If negotiation fails, disputes shall be submitted to binding arbitration in
              accordance with the Arbitration and Conciliation Act, 1996 (India). The seat of
              arbitration shall be New Delhi, India. The language of arbitration shall be English.
              The arbitral award shall be final and binding. Each party shall bear its own costs
              unless the arbitrator determines otherwise.
            </p>
            <p className="mt-3">
              <strong>Class action waiver:</strong> You agree that any dispute resolution
              proceedings will be conducted only on an individual basis and not in a class,
              consolidated, or representative action.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">External links</h2>
            <p>
              The Site may contain links to third-party websites. These links are provided for
              convenience only. I do not control, and am not responsible for, the content or
              privacy practices of any linked site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">Analytics</h2>
            <p>
              This Site uses Vercel Analytics and Vercel Speed Insights to understand site usage.
              These tools collect anonymous, aggregated data. For full details, see the{" "}
              <Link to="/privacy" className="text-primary underline-offset-2 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">No artificial intelligence</h2>
            <p>
              All written content, design, and code on this Site is created by Nipun Dhawan. No
              AI-generated text, AI-generated images, or AI-driven personalisation is used on
              this Site. If this changes in the future, it will be clearly disclosed.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">Governing law</h2>
            <p>
              These terms are governed by the laws of India, without regard to its conflict of
              law provisions. Subject to the arbitration clause above, you consent to the exclusive
              jurisdiction of courts located in New Delhi, India for any matters not subject to
              arbitration.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">Changes</h2>
            <p>
              I reserve the right to update these terms at any time. Material changes will be
              reflected in the "Last updated" date above. Continued use of the Site after any
              change constitutes your acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">Contact</h2>
            <p>
              If you have questions about these terms, please reach out via the contact details on
              the{" "}
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
              search={{ q: "", tags: "", sort: "newest", page: 1 }}
              className="font-mono-label text-muted-foreground transition-colors hover:text-primary"
            >
              Blog
            </Link>
            <Link
              to="/privacy"
              className="font-mono-label text-muted-foreground transition-colors hover:text-primary"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
