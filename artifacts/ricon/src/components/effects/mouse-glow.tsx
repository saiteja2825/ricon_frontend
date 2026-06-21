import { useEffect, useRef } from "react";

export function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500 hover:opacity-100"
      style={{
        background:
          "radial-gradient(circle, hsl(var(--primary) / 0.06) 0%, hsl(var(--accent) / 0.03) 40%, transparent 70%)",
        willChange: "left, top",
        transitionProperty: "left, top",
        transitionDuration: "0ms",
      }}
      aria-hidden="true"
    />
  );
}
