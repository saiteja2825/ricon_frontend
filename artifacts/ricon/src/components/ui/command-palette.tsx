import { useEffect, useState, useCallback } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Home,
  BookOpen,
  Briefcase,
  Map,
  Trophy,
  MessageCircle,
  UserPlus,
  Info,
  LayoutDashboard,
  Users,
  FileText,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useWeatherTheme } from "../effects/weather-theme-provider";

const navItems = [
  { href: "/", label: "Home", icon: Home, group: "Pages" },
  { href: "/courses", label: "Courses", icon: BookOpen, group: "Pages" },
  { href: "/internships", label: "Internships", icon: Briefcase, group: "Pages" },
  { href: "/roadmaps", label: "Roadmaps", icon: Map, group: "Pages" },
  { href: "/placements", label: "Placements", icon: Trophy, group: "Pages" },
  { href: "/chat", label: "AI Mentor", icon: MessageCircle, group: "Pages" },
  { href: "/register", label: "Register", icon: UserPlus, group: "Pages" },
  { href: "/about", label: "About", icon: Info, group: "Pages" },
  { href: "/admin", label: "Admin Dashboard", icon: LayoutDashboard, group: "Admin" },
  { href: "/admin/students", label: "Students", icon: Users, group: "Admin" },
  { href: "/admin/applications", label: "Applications", icon: FileText, group: "Admin" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [, navigate] = useLocation();
  const { theme } = useTheme();
  const { toggleTheme } = useWeatherTheme();

  const toggle = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [toggle]);

  const handleSelect = (href: string) => {
    setOpen(false);
    navigate(href);
  };

  const groups = ["Pages", "Admin"];

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search pages, actions..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {groups.map((group) => (
          <CommandGroup key={group} heading={group}>
            {navItems
              .filter((item) => item.group === group)
              .map((item) => (
                <CommandItem
                  key={item.href}
                  onSelect={() => handleSelect(item.href)}
                  className="gap-2 cursor-pointer"
                >
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                  {item.label}
                </CommandItem>
              ))}
          </CommandGroup>
        ))}
        <CommandSeparator />
        <CommandGroup heading="Theme">
          <CommandItem
            onSelect={() => {
              toggleTheme();
              setOpen(false);
            }}
            className="gap-2 cursor-pointer"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Moon className="h-4 w-4 text-muted-foreground" />
            )}
            Toggle {theme === "dark" ? "Light" : "Dark"} Mode
            <CommandShortcut>⌘T</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
