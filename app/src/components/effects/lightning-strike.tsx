import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LightningStrikeProps {
  originPos: { x: number; y: number } | null;
  onFlash?: () => void;
}

function generateLightningPaths(startX: number, startY: number, endY: number) {
  const paths = [];
  
  // Main bolt
  let currentX = startX;
  let currentY = startY;
  let pathString = `M ${startX} ${startY}`;
  
  while (currentY < endY) {
    const nextY = currentY + (Math.random() * 40 + 20);
    const nextX = currentX + (Math.random() * 80 - 40);
    pathString += ` L ${nextX} ${nextY}`;
    
    // Add branches
    if (Math.random() > 0.6) {
      let branchX = nextX;
      let branchY = nextY;
      let branchPath = `M ${nextX} ${nextY}`;
      
      for (let i = 0; i < 3; i++) {
        branchY += (Math.random() * 30 + 10);
        branchX += (Math.random() * 60 - 30);
        branchPath += ` L ${branchX} ${branchY}`;
      }
      paths.push(branchPath);
    }
    
    currentX = nextX;
    currentY = nextY;
  }
  
  // Add main bolt at the beginning
  paths.unshift(pathString);
  return paths;
}

export function LightningStrike({ originPos, onFlash }: LightningStrikeProps) {
  const [paths, setPaths] = useState<string[]>([]);
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    if (!originPos) return;

    // Generate paths from origin to bottom of screen
    const newPaths = generateLightningPaths(originPos.x, originPos.y, window.innerHeight + 100);
    setPaths(newPaths);

    // Trigger flash when lightning reaches the bottom (approx 400ms)
    const flashTimer = setTimeout(() => {
      setShowFlash(true);
      if (onFlash) onFlash();
    }, 450);

    return () => clearTimeout(flashTimer);
  }, [originPos, onFlash]);

  if (!originPos) return null;

  return (
    <>
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-[100]" preserveAspectRatio="none">
        {/* Glow filters */}
        <defs>
          <filter id="lightning-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {paths.map((path, idx) => (
          <motion.path
            key={idx}
            d={path}
            fill="transparent"
            stroke={idx === 0 ? "#ffffff" : "rgba(200, 230, 255, 0.7)"}
            strokeWidth={idx === 0 ? 4 : 2}
            filter="url(#lightning-glow)"
            initial={{ pathLength: 0, opacity: 1 }}
            animate={{ 
              pathLength: 1, 
              opacity: [1, 1, 0, 1, 0],
            }}
            transition={{ 
              pathLength: { duration: 0.3, ease: "easeIn" },
              opacity: { delay: 0.3, duration: 0.4, times: [0, 0.1, 0.2, 0.4, 1] }
            }}
          />
        ))}
      </svg>

      {/* Screen flash */}
      {showFlash && (
        <motion.div
          className="fixed inset-0 bg-white z-[99] pointer-events-none"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      )}
    </>
  );
}
