import { useEffect } from "react";

/**
 * Adds `is-visible` to any element with `data-reveal` (or the `.reveal` class)
 * when it scrolls into view. Pair with the `.reveal` utility in styles.css.
 */
export function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
}