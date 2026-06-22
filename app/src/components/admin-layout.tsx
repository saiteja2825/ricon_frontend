import { Link, useLocation } from "wouter";
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  BookOpen,
  Briefcase,
  FileText,
  ChevronLeft,
  ChevronRight,
  Bell,
  Settings,
  Menu,
} from "lucide-react";
import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/students", label: "Students", icon: Users, exact: false },
  { href: "/admin/courses", label: "Courses", icon: BookOpen, exact: false },
  { href: "/admin/internships", label: "Internships", icon: Briefcase, exact: false },
  { href: "/admin/applications", label: "Applications", icon: FileText, exact: false },
];

function SidebarItem({
  item,
  isActive,
  collapsed,
}: {
  item: (typeof navItems)[number];
  isActive: boolean;
  collapsed: boolean;
}) {
  const content = (
    <Link
      href={item.href}
      className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 group ${
        isActive
          ? "text-primary-foreground"
          : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="admin-active-bg"
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-accent opacity-90 shadow-sm"
          style={{ zIndex: -1 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <item.icon className={`h-4.5 w-4.5 shrink-0 transition-transform group-hover:scale-110 ${isActive ? "text-white" : ""}`} />
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className={`overflow-hidden whitespace-nowrap ${isActive ? "text-white" : ""}`}
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right" className="font-medium">
          {item.label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (item: (typeof navItems)[number]) =>
    item.exact ? location === item.href : location.startsWith(item.href);

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className={`flex h-16 items-center border-b border-sidebar-border px-4 ${collapsed ? "justify-center" : "gap-2.5"}`}>
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-sm">
            <GraduationCap className="h-4.5 w-4.5 text-white" />
          </div>
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap text-lg font-bold"
              >
                Ricon<span className="text-gradient-primary">Admin</span>
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => (
          <SidebarItem
            key={item.href}
            item={item}
            isActive={isActive(item)}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* Settings + collapse toggle */}
      <div className="border-t border-sidebar-border p-3 space-y-1">
        <SidebarItem
          item={{ href: "/admin", label: "Settings", icon: Settings, exact: false }}
          isActive={false}
          collapsed={collapsed}
        />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-200"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4 shrink-0" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 shrink-0" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-mesh">
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden md:flex flex-col border-r border-sidebar-border bg-sidebar/95 backdrop-blur-md shrink-0 sticky top-0 h-screen overflow-hidden"
      >
        {sidebarContent}
      </motion.aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border/50 bg-background/80 backdrop-blur-md px-4 md:px-6">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden rounded-lg h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-sidebar border-sidebar-border">
              {sidebarContent}
            </SheetContent>
          </Sheet>

          {/* Breadcrumb current page */}
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-muted-foreground">
              {navItems.find(isActive)?.label ?? "Admin"}
            </h2>
          </div>

          {/* Topbar actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-lg h-9 w-9 relative" aria-label="Notifications">
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
            </Button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-white shadow-sm">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
