import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

interface MagneticCardProps {
  children: React.ReactNode;
  className?: string;
}

export function MagneticCard({ children, className = "" }: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for precise, raw mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring configuration for premium, physical feel
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  
  // Spring-smoothed mouse coordinates
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseX, springConfig); // Wait, this should be mouseY! Fix below.

  const smoothY = useSpring(mouseY, springConfig);

  // Magnetic translation limits (3px to 8px max as requested)
  const translateX = useTransform(smoothMouseX, [-0.5, 0.5], [-6, 6]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);

  // 3D Tilt limits (3° to 6° max as requested)
  // RotateX is driven by Y axis (up/down mouse movement tilts on X axis)
  // RotateY is driven by X axis (left/right mouse movement tilts on Y axis)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate relative mouse position inside the card (0 to 1)
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;

    // Normalize to range [-0.5, 0.5] where 0 is center
    mouseX.set(relX - 0.5);
    mouseY.set(relY - 0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smoothly return to center
    mouseX.set(0);
    mouseY.set(0);
  };

  // Dynamic percentage values for the radial gradient
  const gradX = useTransform(smoothMouseX, [-0.5, 0.5], [0, 100]);
  const gradY = useTransform(smoothY, [-0.5, 0.5], [0, 100]);
  
  // Construct the CSS string using motion values natively
  const backgroundHighlight = useMotionTemplate`radial-gradient(circle 200px at ${gradX}% ${gradY}%, rgba(255,255,255,0.06), transparent 80%)`;

  return (
    <motion.div
      ref={ref}
      className={`relative rounded-[inherit] ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ scale: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0px 20px 40px -10px rgba(0,0,0,0.3), 0 0 20px rgba(99, 102, 241, 0.15)"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{
        x: translateX,
        y: translateY,
        rotateX,
        rotateY,
        transformPerspective: 1000,
        zIndex: isHovered ? 10 : 1,
      }}
    >
      {/* Dynamic Highlight Gradient */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-50 rounded-[inherit] transition-opacity duration-300 ease-in-out"
        style={{
          opacity: isHovered ? 1 : 0,
          background: backgroundHighlight
        }}
      />
      
      {/* Animated Border Flow System */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <defs>
          <linearGradient id="magnetic-glow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect
          x="0" y="0" width="100%" height="100%"
          rx="24"
          fill="none"
          stroke="url(#magnetic-glow-gradient)"
          strokeWidth="3.5"
          pathLength="100"
          strokeDasharray="15 35"
          className="animate-border-flow transition-opacity duration-500"
          style={{ opacity: isHovered ? 1 : 0.3 }}
        />
      </svg>

      {children}
    </motion.div>
  );
}
