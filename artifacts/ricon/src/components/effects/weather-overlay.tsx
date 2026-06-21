import { useWeatherTheme } from "./weather-theme-provider";
import { LightningStrike } from "./lightning-strike";
import { CosmicEclipse } from "./cosmic-eclipse";
import { motion, AnimatePresence } from "framer-motion";

export function WeatherOverlay() {
  const { isTransitioning, transitionType, originPos } = useWeatherTheme();

  return (
    <AnimatePresence>
      {isTransitioning && transitionType === "to-light" && (
        <motion.div 
          key="to-light"
          className="fixed inset-0 z-[100] pointer-events-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LightningStrike originPos={originPos} />
        </motion.div>
      )}

      {isTransitioning && transitionType === "to-dark" && (
        <motion.div 
          key="to-dark"
          className="fixed inset-0 z-[100] pointer-events-none"
        >
          <CosmicEclipse originPos={originPos} />
        </motion.div>
      )}

      {/* Cosmic glow effect that lingers after dark transition finishes */}
      {!isTransitioning && transitionType === "to-dark" && (
        <motion.div
          key="cosmic-glow"
          className="fixed inset-0 z-[80] pointer-events-none bg-indigo-500/10 mix-blend-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      )}

      {/* Sun glow effect that lingers after light transition finishes */}
      {!isTransitioning && transitionType === "to-light" && (
        <motion.div
          key="sun-glow"
          className="fixed inset-0 z-[80] pointer-events-none bg-amber-500/10 mix-blend-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      )}
    </AnimatePresence>
  );
}
