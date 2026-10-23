import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

export function SiteNav() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY && y > 80);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const mobileLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Research", href: "/#research" },
    { label: "Contact", href: "/#contact" },
    { label: "Photography", href: "/photography" },
  ];

  return (
    <>
    <header className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 transition-[transform,opacity] duration-300 md:px-12 ${hidden && !menuOpen ? "pointer-events-none -translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}>
      <Link to="/" className="flex items-center gap-3" aria-label="Nipun Dhawan home">
        <img src="/favicon.png" alt="N" width={32} height={32} className="h-8 w-8 shrink-0 object-contain" />
        <span aria-hidden={menuOpen} className={`font-mono-label transition-opacity duration-200 ${menuOpen ? "opacity-0 lg:opacity-100" : "opacity-100"}`}>
          Nipun Dhawan
        </span>
      </Link>
      <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
        {["About", "Research", "Contact"].map((item) => (
          <a key={item} href={`/#${item.toLowerCase()}`} className="font-mono-label transition-colors hover:text-primary">
            {item}
          </a>
        ))}
        <Link to="/blog" search={{ q: "", tags: "", sort: "newest", page: 1 }} className="font-mono-label transition-colors hover:text-primary">
          Blog
        </Link>
        <Link to="/photography" className="font-mono-label transition-colors hover:text-primary">
          Photography
        </Link>
      </nav>
      <a href="mailto:dhawannipun58@gmail.com" className="hidden font-mono-label rounded-full border border-border px-4 py-2 transition-colors hover:border-primary hover:text-primary lg:inline-flex">
        Let’s talk
      </a>
      <button
        type="button"
        className="relative z-50 grid h-11 w-11 place-items-center rounded-full border border-border bg-background/90 text-foreground shadow-lg backdrop-blur transition-colors hover:border-primary lg:hidden"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className={`absolute h-px w-4 bg-current transition-transform duration-300 ${menuOpen ? "rotate-45" : "-translate-y-1"}`} />
        <span className={`absolute h-px w-4 bg-current transition-transform duration-300 ${menuOpen ? "-rotate-45" : "translate-y-1"}`} />
      </button>
    </header>
    <div
      id="mobile-navigation"
      aria-hidden={!menuOpen}
      className={`fixed inset-0 z-40 grid place-items-center overflow-hidden bg-background px-8 backdrop-blur-xl transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] lg:hidden ${menuOpen ? "" : "pointer-events-none"}`}
      style={{ clipPath: menuOpen ? "circle(150% at calc(100% - 3.4rem) 3.4rem)" : "circle(0% at calc(100% - 3.4rem) 3.4rem)" }}
      inert={!menuOpen}
    >
      <div
        className="absolute left-8 top-8 font-mono-label text-muted-foreground transition-[opacity,transform] duration-500"
        style={{ opacity: menuOpen ? 1 : 0, transform: menuOpen ? "translateY(0)" : "translateY(-0.5rem)", transitionDelay: menuOpen ? "220ms" : "0ms" }}
      >
        Menu / Navigation
      </div>
      <nav className="w-full max-w-md" aria-label="Mobile navigation">
        <ol className="divide-y divide-border border-y border-border">
          {mobileLinks.map((item, index) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
                className="group flex items-baseline gap-5 py-5 font-display text-5xl transition-[opacity,transform,color] duration-500 hover:text-primary"
                style={{ opacity: menuOpen ? 1 : 0, transform: menuOpen ? "translateY(0)" : "translateY(1rem)", transitionDelay: menuOpen ? `${180 + index * 75}ms` : "0ms" }}
              >
                <span className="font-mono-label text-xs text-primary">0{index + 1}</span>
                {item.label}
                <span className="ml-auto text-2xl text-primary opacity-0 transition-opacity group-hover:opacity-100">↗</span>
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/blog"
              search={{ q: "", tags: "", sort: "newest", page: 1 }}
              onClick={closeMenu}
              tabIndex={menuOpen ? 0 : -1}
              className="group flex items-baseline gap-5 py-5 font-display text-5xl transition-[opacity,transform,color] duration-500 hover:text-primary"
              style={{ opacity: menuOpen ? 1 : 0, transform: menuOpen ? "translateY(0)" : "translateY(1rem)", transitionDelay: menuOpen ? "480ms" : "0ms" }}
            >
              <span className="font-mono-label text-xs text-primary">06</span>
              Blog
              <span className="ml-auto text-2xl text-primary opacity-0 transition-opacity group-hover:opacity-100">↗</span>
            </Link>
          </li>
        </ol>
        <a href="mailto:dhawannipun58@gmail.com" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1} className="mt-8 inline-flex font-mono-label text-muted-foreground transition-colors hover:text-primary">
          Let’s talk ↗
        </a>
      </nav>
    </div>
    </>
  );
}
