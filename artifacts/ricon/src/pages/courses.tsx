import { useListCourses } from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { BookOpen, Clock, Users, ArrowRight, Search } from "lucide-react";
import { motion } from "framer-motion";

import { MagneticCard } from "@/components/effects/magnetic-card";
import { FadeUp, staggerContainer, staggerItem } from "@/components/ui/page-transition";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const levelColors: Record<string, string> = {
  beginner: "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-900",
  intermediate: "bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-900",
  advanced: "bg-rose-500/10 text-rose-600 border-rose-200 dark:border-rose-900",
};

function CourseCardSkeleton() {
  return (
    <div className="rounded-3xl border border-border/40 bg-card overflow-hidden h-full flex flex-col">
      <div className="h-48 animate-shimmer" />
      <div className="p-6 space-y-4 flex-1">
        <div className="flex gap-2">
          <div className="h-5 w-20 rounded-full animate-shimmer" />
          <div className="h-5 w-24 rounded-full animate-shimmer" />
        </div>
        <div className="h-7 w-3/4 rounded-lg animate-shimmer" />
        <div className="h-4 w-full rounded-lg animate-shimmer" />
        <div className="h-4 w-2/3 rounded-lg animate-shimmer" />
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="h-6 w-16 rounded animate-shimmer" />
          <div className="h-10 w-28 rounded-xl animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

export default function Courses() {
  const { data: courses, isLoading } = useListCourses({});
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filtered = courses?.filter(
    (c: any) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-background">
      {/* ─── HEADER ────────────────────────────────────────────── */}
      <section className="relative pt-16 pb-12 overflow-hidden border-b border-border/40">

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <FadeUp className="max-w-3xl mx-auto text-center">
            <div className="mb-3 text-sm font-bold text-primary uppercase tracking-widest">Course Catalog</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Select Your <span className="text-gradient-primary">Trajectory</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Explore our premium engineering curriculum, crafted by industry experts to bridge the gap between academia and production.
            </p>

            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Search modules..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-14 text-lg rounded-2xl border-border/60 bg-card/80 backdrop-blur-sm shadow-sm hover:border-primary/30 transition-colors focus-visible:ring-primary/20"
              />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── BENTO GRID ────────────────────────────────────────── */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {[...Array(8)].map((_, i) => <CourseCardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <FadeUp>
              <div className="flex flex-col items-center justify-center py-24 rounded-3xl border border-border/40 bg-card/40 text-center gap-4">
                <div className="h-20 w-20 rounded-2xl bg-muted/60 flex items-center justify-center">
                  <BookOpen className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-bold">No modules found</h2>
                <p className="text-muted-foreground max-w-md">
                  We couldn't find any courses matching your search. Try adjusting your parameters.
                </p>
                {search && (
                  <Button variant="outline" onClick={() => setSearch("")} className="mt-4 rounded-xl">
                    Clear Filters
                  </Button>
                )}
              </div>
            </FadeUp>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            >
              {filtered.slice(0, showAll ? undefined : 8).map((course: any) => (
                <motion.div key={course.id} variants={staggerItem} className="h-full">
                  <Link href={`/courses/${course.id}`}>
                    <MagneticCard className="group h-full rounded-3xl border border-border/40 bg-card overflow-hidden transition-colors flex flex-col cursor-pointer">
                      {/* Image Area */}
                      <div className="relative h-40 md:h-48 overflow-hidden bg-muted">
                        {course.imageUrl ? (
                          <img
                            src={course.imageUrl}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/5">
                            <BookOpen className="h-12 w-12 text-primary/30 group-hover:scale-110 transition-transform duration-500" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        
                        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                          <Badge className="bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-md">
                            {course.status}
                          </Badge>
                          <Badge className={`backdrop-blur-md border ${levelColors[course.level] || "bg-black/40 text-white border-white/20"} capitalize`}>
                            {course.level}
                          </Badge>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-5 md:p-6 flex flex-col flex-1">
                        <h3 className="font-bold text-xl mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-muted-foreground text-xs md:text-sm mb-5 line-clamp-2 flex-1">
                          {course.description}
                        </p>

                        <div className="flex items-center gap-5 text-sm font-medium text-muted-foreground mb-6">
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            {course.duration}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users className="h-4 w-4" />
                            {course.enrollmentCount} Enrolled
                          </span>
                        </div>

                        <div className="flex items-center justify-end pt-5 border-t border-border/50 mt-auto">
                          <Button
                            size="sm"
                            className="h-10 px-6 rounded-xl gap-1.5 btn-gradient shadow-md shadow-primary/20 group/btn"
                          >
                            Explore Module
                            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </div>
                      </div>
                    </MagneticCard>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {!isLoading && !showAll && filtered.length > 8 && (
            <FadeUp className="mt-12 flex justify-center">
              <Button 
                onClick={() => setShowAll(true)}
                variant="outline"
                size="lg"
                className="rounded-xl border-border/60 hover:bg-card hover:border-primary/50 transition-all font-semibold"
              >
                Show All Modules
              </Button>
            </FadeUp>
          )}
        </div>
      </section>
    </div>
  );
}
