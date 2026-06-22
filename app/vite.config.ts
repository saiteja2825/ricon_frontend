import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const rawPort = process.env.PORT;
const port = rawPort ? Number(rawPort) : 3000;
const basePath = process.env.BASE_PATH ?? "/";

// Only load runtime error overlay (safe to use locally)
const plugins: any[] = [react(), tailwindcss()];

// Only load Replit-specific plugins when running on Replit
if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
  try {
    const runtimeErrorOverlay = await import("@replit/vite-plugin-runtime-error-modal");
    plugins.push(runtimeErrorOverlay.default());
    const cartographer = await import("@replit/vite-plugin-cartographer");
    plugins.push(
      cartographer.cartographer({
        root: path.resolve(import.meta.dirname, ".."),
      })
    );
    const devBanner = await import("@replit/vite-plugin-dev-banner");
    plugins.push(devBanner.devBanner());
  } catch {
    // Replit plugins not available locally — that's fine
  }
}

export default defineConfig({
  base: basePath,
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: false,
    host: "0.0.0.0",
    allowedHosts: true as any,
    fs: {
      strict: false,
    },
    proxy: {
      "/api": {
        target: "https://ricon-project.onrender.com",
        changeOrigin: true,
      },
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true as any,
  },
});

