import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CosmicEclipseProps {
  originPos: { x: number; y: number } | null;
}

export function CosmicEclipse({ originPos }: CosmicEclipseProps) {
  const [maxRadius, setMaxRadius] = useState(1000);

  useEffect(() => {
    if (!originPos) return;
    const endRadius = Math.hypot(
      Math.max(originPos.x, window.innerWidth - originPos.x),
      Math.max(originPos.y, window.innerHeight - originPos.y)
    );
    setMaxRadius(endRadius);
  }, [originPos]);

  if (!originPos) return null;

  return (
    <motion.div
      className="fixed z-[100] pointer-events-none rounded-full"
      style={{
        left: originPos.x,
        top: originPos.y,
        x: "-50%",
        y: "-50%",
        // A sophisticated minimalist halo:
        border: "1px solid rgba(99, 102, 241, 0.4)", // subtle indigo ring
        boxShadow: "inset 0 0 60px rgba(139, 92, 246, 0.15), 0 0 40px rgba(6, 182, 212, 0.1)", // deep violet & electric blue glows
      }}
      initial={{ width: 0, height: 0, opacity: 1 }}
      animate={{ 
        width: maxRadius * 2, 
        height: maxRadius * 2, 
        opacity: [1, 1, 0] // Fades out slowly after reaching full size
      }}
      transition={{ 
        width: { duration: 1.2, ease: "easeInOut" },
        height: { duration: 1.2, ease: "easeInOut" },
        opacity: { duration: 1.6, ease: "easeInOut", times: [0, 0.8, 1] }
      }}
    />
  );
}
