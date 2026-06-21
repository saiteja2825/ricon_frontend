import { useGetRoadmap, getGetRoadmapQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, CheckCircle2, Map, BookMarked, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { FadeUp, staggerContainer, staggerItem } from "@/components/ui/page-transition";


interface RoadmapStep {
  title: string;
  description: string;
  resources?: string[];
}

export default function RoadmapDetail() {
  const { id } = useParams<{ id: string }>();
  const roadmapId = parseInt(id || "0", 10);

  const { data: roadmap, isLoading } = useGetRoadmap(roadmapId, {
    query: {
      enabled: !!roadmapId,
      queryKey: getGetRoadmapQueryKey(roadmapId)
    }
  });

  if (isLoading) {
    return (
      <div className="container py-10 px-4 md:px-8 max-w-4xl mx-auto">
        <Skeleton className="h-4 w-32 mb-8" />
        <Skeleton className="h-16 w-16 rounded-2xl mb-6" />
        <Skeleton className="h-12 w-2/3 mb-4" />
        <Skeleton className="h-6 w-full mb-16" />
        <div className="space-y-12 pl-4 border-l-2 border-border/50 ml-4 md:ml-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="relative pl-8 md:pl-12">
              <Skeleton className="absolute -left-[20px] md:-left-[28px] top-1 h-10 w-10 rounded-full border-4 border-background" />
              <div className="rounded-2xl border border-border/60 bg-card/40 p-6">
                <Skeleton className="h-8 w-1/3 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-6" />
                <Skeleton className="h-20 w-full rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">

        <div className="relative z-10">
          <div className="h-20 w-20 rounded-3xl bg-muted/50 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-border/50">
            <Map className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-3xl font-extrabold mb-3 tracking-tight">Roadmap Not Found</h2>
          <p className="text-muted-foreground mb-8 text-lg max-w-md mx-auto">The career path you are looking for does not exist or has been moved.</p>
          <Link href="/roadmaps">
            <Button size="lg" className="rounded-xl px-8 h-12 btn-gradient">Browse All Roadmaps</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Parse steps JSON safely
  let steps: RoadmapStep[] = [];
  try {
    if (roadmap.steps) {
      steps = JSON.parse(roadmap.steps);
    }
  } catch (e) {
    console.error("Failed to parse roadmap steps", e);
  }

  const themeColor = roadmap.color || 'hsl(var(--primary))';

  return (
    <div className="min-h-screen relative pb-20">
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-muted/30 to-transparent pointer-events-none" />
      
      <div className="container pt-12 px-4 md:px-8 max-w-4xl mx-auto relative z-10">
        <Link href="/roadmaps" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-10 group">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Roadmaps
        </Link>

        <FadeUp className="mb-16">
          <div 
            className="h-20 w-20 rounded-2xl mb-8 flex items-center justify-center text-white shadow-lg relative"
            style={{ backgroundColor: themeColor }}
          >
            <div className="absolute inset-0 rounded-2xl bg-white/20 blur-xl scale-110 -z-10" style={{ backgroundColor: themeColor, opacity: 0.3 }} />
            <Map className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5">{roadmap.title}</h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">{roadmap.description}</p>
        </FadeUp>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative border-l-2 ml-4 md:ml-8 pl-8 md:pl-16 space-y-12"
          style={{ borderColor: `color-mix(in srgb, ${themeColor} 20%, transparent)` }}
        >
          {steps.length > 0 ? (
            steps.map((step, index) => (
              <motion.div key={index} variants={staggerItem} className="relative group">
                <div 
                  className="absolute -left-[51px] md:-left-[83px] top-2 flex h-10 w-10 items-center justify-center rounded-full border-4 border-background text-white shadow-md transition-transform duration-300 group-hover:scale-110 z-10"
                  style={{ backgroundColor: themeColor }}
                >
                  <span className="text-sm font-bold">{index + 1}</span>
                </div>
                
                {/* Connector line glow */}
                <div className="absolute -left-[51px] md:-left-[83px] top-12 bottom-[-48px] w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: themeColor }} />

                <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/60 p-6 md:p-8 shadow-sm group-hover:shadow-md group-hover:border-border transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{step.description}</p>
                  
                  {step.resources && step.resources.length > 0 && (
                    <div className="mt-6 p-5 rounded-xl bg-muted/40 border border-border/40">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                        <BookMarked className="h-3.5 w-3.5" />
                        Recommended Resources
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {step.resources.map((resource, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm font-medium p-2.5 rounded-lg hover:bg-background/80 transition-colors border border-transparent hover:border-border/50">
                            <CheckCircle2 className="h-4.5 w-4.5 shrink-0 mt-0.5" style={{ color: themeColor }} />
                            <span className="leading-snug">{resource}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-muted-foreground py-12 px-6 rounded-2xl border border-dashed border-border/60 text-center bg-muted/10">
              <Terminal className="h-8 w-8 mx-auto mb-3 opacity-20" />
              Detailed steps for this roadmap are currently being constructed.
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
