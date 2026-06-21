import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { useTheme } from "next-themes";

export type TransitionType = "to-light" | "to-dark" | null;

interface WeatherThemeContextType {
  isTransitioning: boolean;
  transitionType: TransitionType;
  originPos: { x: number; y: number } | null;
  toggleTheme: (e?: React.MouseEvent) => void;
}

const WeatherThemeContext = createContext<WeatherThemeContextType | undefined>(undefined);

export function WeatherThemeProvider({ children }: { children: ReactNode }) {
  const { theme, setTheme, systemTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState<TransitionType>(null);
  const [originPos, setOriginPos] = useState<{ x: number; y: number } | null>(null);

  // Handle system preference when theme is 'system'
  const currentTheme = theme === "system" ? systemTheme : theme;

  const toggleTheme = useCallback((e?: React.MouseEvent) => {
    if (isTransitioning) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setTheme(currentTheme === "dark" ? "light" : "dark");
      return;
    }

    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    const type = nextTheme === "light" ? "to-light" : "to-dark";
    
    // Get click position for lightning origin
    let x = window.innerWidth - 40;
    let y = 40;
    if (e) {
      x = e.clientX;
      y = e.clientY;
    }
    setOriginPos({ x, y });

    setTransitionType(type);
    setIsTransitioning(true);

    // Timings
    const domSwitchDelay = type === "to-light" ? 600 : 900; // Portal fully covers screen around 900ms
    const totalDuration = type === "to-light" ? 1800 : 2000;

    // Switch the actual DOM theme
    if (type === "to-dark" && "startViewTransition" in document) {
      // @ts-ignore
      const transition = document.startViewTransition(() => {
        setTheme(nextTheme);
      });

      transition.ready.then(() => {
        const endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );

        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 1200,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    } else {
      setTimeout(() => {
        setTheme(nextTheme);
      }, domSwitchDelay);
    }

    // Cleanup transition state
    setTimeout(() => {
      setIsTransitioning(false);
      setTransitionType(null);
      setOriginPos(null);
    }, totalDuration);

  }, [currentTheme, isTransitioning, setTheme, originPos]);

  return (
    <WeatherThemeContext.Provider value={{ isTransitioning, transitionType, originPos, toggleTheme }}>
      {children}
    </WeatherThemeContext.Provider>
  );
}

export function useWeatherTheme() {
  const context = useContext(WeatherThemeContext);
  if (context === undefined) {
    throw new Error("useWeatherTheme must be used within a WeatherThemeProvider");
  }
  return context;
}
