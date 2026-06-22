import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useWeatherTheme } from "./effects/weather-theme-provider";
import {
  Moon,
  Sun,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Search,
  X,
  Zap,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const routes = [
  { href: "/courses", label: "Courses" },
  { href: "/internships", label: "Internships" },
  { href: "/roadmaps", label: "Roadmaps" },
  { href: "/placements", label: "Placements" },
  { href: "/chat", label: "AI Mentor" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [location] = useLocation();
  const { theme } = useTheme();
  const { toggleTheme } = useWeatherTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Glassmorphism bar */}
      <div className="glass-strong border-b border-border/50 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-sm group-hover:shadow-md transition-shadow">
              <GraduationCap className="h-5 w-5 text-white" />
              {/* Shimmer effect */}
              <div className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="animate-shimmer absolute inset-0" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight">
              Ricon<span className="text-gradient-primary">Tech</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {routes.map((route) => {
              const isActive = location.startsWith(route.href);
              return (
                <Link key={route.href} href={route.href}>
                  <div className="relative px-3 py-2 rounded-lg group">
                    <span
                      className={`text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {route.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-lg bg-muted"
                        style={{ zIndex: -1 }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Right side Container */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              {/* Command palette trigger */}
              <button
                onClick={() => {
                  const e = new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true });
                  document.dispatchEvent(e);
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/70 bg-muted/50 text-xs text-muted-foreground hover:text-foreground hover:border-border transition-all duration-200"
              >
                <Search className="h-3.5 w-3.5" />
                <span>Search</span>
                <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border/80 bg-background px-1.5 py-0.5 font-mono text-[10px]">
                  ⌘K
                </kbd>
              </button>

              <Link href="/admin">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-muted-foreground hover:text-foreground"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Admin
                </Button>
              </Link>

              <Link href="/register">
                <Button className="h-9 px-4 btn-gradient rounded-lg font-semibold shadow-sm">
                  <Zap className="h-3.5 w-3.5 mr-1.5" />
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Theme toggle - Visible on all screens */}
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 rounded-lg"
              onClick={(e) => toggleTheme(e)}
              aria-label="Toggle theme"
            >
              <motion.div
                key={theme}
                initial={{ rotate: -30, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-center"
              >
                {theme === "dark" ? (
                  <Sun className="h-4.5 w-4.5" />
                ) : (
                  <Moon className="h-4.5 w-4.5" />
                )}
              </motion.div>
            </Button>

            {/* Mobile hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden relative h-9 w-9 rounded-lg">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={mobileOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {mobileOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-80 glass-strong border-l border-border/50">
              <div className="flex flex-col gap-6 pt-4">
                <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-sm">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold tracking-tight">
                    Ricon<span className="text-gradient-primary">Tech</span>
                  </span>
                </Link>

                <nav className="flex flex-col gap-1">
                  {routes.map((route, i) => {
                    const isActive = location.startsWith(route.href);
                    return (
                      <motion.div
                        key={route.href}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                      >
                        <Link
                          href={route.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          {route.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                  <div className="my-2 h-px bg-border/50" />
                  <Link
                    href="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Admin Dashboard
                  </Link>
                </nav>

                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-border/50">
                  <Link href="/register" onClick={() => setMobileOpen(false)} className="w-full">
                    <Button className="w-full btn-gradient">Get Started</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
