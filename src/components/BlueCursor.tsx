import { useEffect, useState } from "react";

export function BlueCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const t = e.target as HTMLElement | null;
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

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-white/40 transition-[width,height,opacity] duration-200 ease-out"
        style={{
          width: size,
          height: size,
          background: hover ? "oklch(0.6 0.24 255 / 0.85)" : "oklch(0.6 0.24 255 / 0.55)",
          boxShadow: "0 0 24px oklch(0.6 0.24 255 / 0.6)",
          transform: `translate(${pos.x - size / 2}px, ${pos.y - size / 2}px) scale(${scale})`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full"
        style={{
          background: "oklch(0.95 0.05 255)",
          transform: `translate(${pos.x - 3}px, ${pos.y - 3}px)`,
        }}
      />
    </>
  );
}