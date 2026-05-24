export function DotsBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        backgroundColor: "var(--color-background)",
        backgroundImage:
          "radial-gradient(oklch(0.85 0.05 85 / 0.18) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        backgroundPosition: "0 0",
        maskImage:
          "radial-gradient(ellipse at 50% 40%, black 30%, transparent 90%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at 50% 40%, black 30%, transparent 90%)",
      }}
    />
  );
}