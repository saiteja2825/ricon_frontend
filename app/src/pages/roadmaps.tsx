import { useListRoadmaps } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Map, ArrowRight, Layers, LayoutTemplate, BrainCircuit, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

import { FadeUp, staggerContainer, staggerItem } from "@/components/ui/page-transition";

function RoadmapSkeleton() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/70 overflow-hidden">
      <div className="p-6">
        <div className="h-14 w-14 rounded-xl animate-shimmer mb-5" />
        <div className="h-6 w-3/4 rounded-lg animate-shimmer mb-3" />
        <div className="h-4 w-full rounded-lg animate-shimmer mb-2" />
        <div className="h-4 w-2/3 rounded-lg animate-shimmer mb-6" />
        <div className="h-4 w-1/2 rounded-lg animate-shimmer" />
      </div>
      <div className="p-6 pt-0">
        <div className="h-11 w-full rounded-xl animate-shimmer" />
      </div>
    </div>
  );
}

const getIconForRoadmap = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('frontend') || t.includes('web')) return LayoutTemplate;
  if (t.includes('backend') || t.includes('stack')) return Layers;
  if (t.includes('ai') || t.includes('data') || t.includes('machine')) return BrainCircuit;
  return Map;
};

export default function Roadmaps() {
  const { data: roadmaps, isLoading } = useListRoadmaps();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden border-b border-border/40">

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <FadeUp className="max-w-3xl mx-auto text-center">
            <div className="mb-4 inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/20">
              <Map className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              <span className="relative inline-block">
                <motion.div
                  initial={{ y: -400, opacity: 0, rotate: -45 }}
                  animate={{ y: -38, x: -12, opacity: 1, rotate: -15 }}
                  transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 10,
                    delay: 0.4
                  }}
                  className="absolute top-0 left-0 z-20 pointer-events-none text-4xl md:text-5xl"
                >
                  🎓
                </motion.div>
                C
              </span>areer <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Roadmaps</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
              Step-by-step guides to mastering domains and achieving your career goals. 
              Follow our structured paths designed by industry experts.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Roadmaps Grid */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-4 md:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => <RoadmapSkeleton key={i} />)}
            </div>
          ) : roadmaps?.length === 0 ? (
            <FadeUp>
              <div className="flex flex-col items-center justify-center py-24 rounded-2xl border border-border/60 bg-card/40 text-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-muted/60 flex items-center justify-center">
                  <Map className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold">No roadmaps available</h2>
                <p className="text-muted-foreground max-w-xs">We're currently building our career guides.</p>
              </div>
            </FadeUp>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {roadmaps?.map((roadmap: any) => {
                const Icon = getIconForRoadmap(roadmap.title);
                const themeColor = roadmap.color || 'var(--primary)';
                
                return (
                  <motion.div key={roadmap.id} variants={staggerItem}>
                    <div 
                      className="group flex flex-col h-full rounded-2xl border border-border/60 bg-card/70 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                      style={{ borderTopColor: themeColor, borderTopWidth: '4px' }}
                    >
                      {/* Hover gradient bg */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-500 pointer-events-none" />
                      
                      <div className="p-6 pb-0 flex-1 relative z-10">
                        <div 
                          className="h-14 w-14 rounded-xl mb-6 flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                          style={{ backgroundColor: themeColor }}
                        >
                          <Icon className="h-7 w-7" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors">
                          {roadmap.title}
                        </h3>
                        <p className="text-muted-foreground line-clamp-3 leading-relaxed text-sm mb-6">
                          {roadmap.description}
                        </p>
                      </div>
                      
                      <div className="p-6 pt-2 relative z-10">
                        <Link href={`/roadmaps/${roadmap.id}`} className="block w-full">
                          <Button variant="outline" className="w-full group/btn rounded-xl bg-background/50 backdrop-blur-sm border-border/60 hover:bg-muted/50 hover:border-border transition-all">
                            View Learning Path
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
