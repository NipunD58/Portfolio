import { T as reactExports, K as jsxRuntimeExports } from "./worker-entry-BCz2n-Un.js";
function BlueCursor() {
  const [pos, setPos] = reactExports.useState({ x: -100, y: -100 });
  const [hover, setHover] = reactExports.useState(false);
  const [down, setDown] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      const t = e.target;
      setHover(!!t?.closest("a, button, [role='button'], input, textarea, select, [data-hover]"));
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", dn);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", dn);
      window.removeEventListener("mouseup", up);
    };
  }, []);
  const size = hover ? 44 : 16;
  const scale = down ? 0.8 : 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "aria-hidden": true,
        className: "pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-white/40 transition-[width,height,opacity] duration-200 ease-out",
        style: {
          width: size,
          height: size,
          background: hover ? "oklch(0.6 0.24 255 / 0.85)" : "oklch(0.6 0.24 255 / 0.55)",
          boxShadow: "0 0 24px oklch(0.6 0.24 255 / 0.6)",
          transform: `translate(${pos.x - size / 2}px, ${pos.y - size / 2}px) scale(${scale})`
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "aria-hidden": true,
        className: "pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full",
        style: {
          background: "oklch(0.95 0.05 255)",
          transform: `translate(${pos.x - 3}px, ${pos.y - 3}px)`
        }
      }
    )
  ] });
}
function DotsBackground() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "aria-hidden": true,
      className: "pointer-events-none fixed inset-0 -z-10",
      style: {
        backgroundColor: "var(--color-background)",
        backgroundImage: "radial-gradient(oklch(0.85 0.05 85 / 0.18) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        backgroundPosition: "0 0",
        maskImage: "radial-gradient(ellipse at 50% 40%, black 30%, transparent 90%)",
        WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, black 30%, transparent 90%)"
      }
    }
  );
}
export {
  BlueCursor as B,
  DotsBackground as D
};
