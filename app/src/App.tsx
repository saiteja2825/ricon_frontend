import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import NotFound from "@/pages/not-found";
import Layout from "./components/layout";
import AdminLayout from "./components/admin-layout";
import { CommandPalette } from "./components/ui/command-palette";
import { WeatherThemeProvider } from "./components/effects/weather-theme-provider";
import { WeatherOverlay } from "./components/effects/weather-overlay";

import Home from "./pages/home";
import Courses from "./pages/courses";
import CourseDetail from "./pages/course-detail";
import Internships from "./pages/internships";
import Roadmaps from "./pages/roadmaps";
import RoadmapDetail from "./pages/roadmap-detail";
import Placements from "./pages/placements";
import Chat from "./pages/chat";
import Register from "./pages/register";
import About from "./pages/about";

import AdminDashboard from "./pages/admin/dashboard";
import AdminStudents from "./pages/admin/students";
import AdminCourses from "./pages/admin/courses";
import AdminInternships from "./pages/admin/internships";
import AdminApplications from "./pages/admin/applications";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: true,
      refetchIntervalInBackground: false,
      retry: 2,
    },
  },
});

function AdminRoutes() {
  return (
    <AdminLayout>
      <Switch>
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/students" component={AdminStudents} />
        <Route path="/admin/courses" component={AdminCourses} />
        <Route path="/admin/internships" component={AdminInternships} />
        <Route path="/admin/applications" component={AdminApplications} />
        <Route component={NotFound} />
      </Switch>
    </AdminLayout>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/admin/*" component={AdminRoutes} />
      <Route path="/admin" component={AdminRoutes} />

      <Route path="*">
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/courses" component={Courses} />
            <Route path="/courses/:id" component={CourseDetail} />
            <Route path="/internships" component={Internships} />
            <Route path="/roadmaps" component={Roadmaps} />
            <Route path="/roadmaps/:id" component={RoadmapDetail} />
            <Route path="/placements" component={Placements} />
            <Route path="/chat" component={Chat} />
            <Route path="/register" component={Register} />
            <Route path="/about" component={About} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <WeatherThemeProvider>
          <TooltipProvider delayDuration={300}>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
              <CommandPalette />
              <WeatherOverlay />
            </WouterRouter>
            {/* Premium Sonner toaster */}
            <Toaster
              position="bottom-right"
              toastOptions={{
                classNames: {
                  toast:
                    "glass-strong border border-border/60 shadow-lg rounded-xl font-sans",
                  title: "font-semibold text-sm",
                  description: "text-xs text-muted-foreground",
                },
              }}
            />
          </TooltipProvider>
        </WeatherThemeProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
