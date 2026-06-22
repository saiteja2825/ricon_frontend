import { useListPlacements, useGetPlacementsSummary } from "@workspace/api-client-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, TrendingUp, Building2, GraduationCap, MapPin, Star, Award } from "lucide-react";
import { motion } from "framer-motion";

import { FadeUp, staggerContainer, staggerItem } from "@/components/ui/page-transition";
import { AnimatedCounter } from "@/components/ui/animated-counter";

function PlacementCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/70 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-primary to-accent" />
      <div className="p-6">
        <div className="flex items-center gap-4 mb-5">
          <div className="h-14 w-14 rounded-full animate-shimmer" />
          <div className="space-y-2 flex-1">
            <div className="h-5 w-1/2 rounded animate-shimmer" />
            <div className="h-4 w-1/3 rounded animate-shimmer" />
          </div>
        </div>
        <div className="space-y-4 pt-4 border-t border-border/50">
          <div className="space-y-1.5">
            <div className="h-3 w-16 rounded animate-shimmer" />
            <div className="h-5 w-3/4 rounded animate-shimmer" />
          </div>
          <div className="space-y-1.5">
            <div className="h-3 w-12 rounded animate-shimmer" />
            <div className="h-4 w-1/2 rounded animate-shimmer" />
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="space-y-1.5">
              <div className="h-3 w-16 rounded animate-shimmer" />
              <div className="h-6 w-20 rounded animate-shimmer" />
            </div>
            <div className="space-y-1.5 flex flex-col items-end">
              <div className="h-3 w-10 rounded animate-shimmer" />
              <div className="h-4 w-12 rounded animate-shimmer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Placements() {
  const { data: placements, isLoading: isLoadingPlacements } = useListPlacements();
  const { data: summary, isLoading: isLoadingSummary } = useGetPlacementsSummary();

  const statsCards = [
    { label: "Highest Package", value: summary?.highestPackageLpa ?? 0, suffix: " LPA", icon: Trophy, color: "text-amber-500", gradient: "from-amber-500/20 to-amber-500/5" },
    { label: "Average Package", value: summary?.averagePackageLpa ?? 0, suffix: " LPA", icon: TrendingUp, color: "text-emerald-500", gradient: "from-emerald-500/20 to-emerald-500/5" },
    { label: "Students Placed", value: summary?.studentsPlaced ?? 0, suffix: "+", icon: GraduationCap, color: "text-blue-500", gradient: "from-blue-500/20 to-blue-500/5" },
    { label: "Top Companies", value: summary?.topCompanies.length ?? 0, suffix: "", icon: Building2, color: "text-purple-500", gradient: "from-purple-500/20 to-purple-500/5", isTop: true },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden border-b border-border/40">

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <FadeUp className="max-w-3xl mx-auto text-center">
            <div className="mb-4 inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Placement <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Wall of Fame</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Celebrating the success of Ricon Technology alumni who have secured positions at top tech companies around the globe.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="py-12 -mt-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsCards.map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.1}>
                <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm hover:shadow-md transition-shadow group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm font-semibold text-muted-foreground">{stat.label}</div>
                      <div className={`h-10 w-10 rounded-xl bg-background flex items-center justify-center border border-border/50 shadow-sm ${stat.color}`}>
                        <stat.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="mt-auto">
                      {isLoadingSummary ? (
                        <Skeleton className="h-9 w-24" />
                      ) : stat.isTop ? (
                        <div className="text-sm font-semibold leading-tight line-clamp-2" title={summary?.topCompanies.join(", ")}>
                          {summary?.topCompanies.slice(0, 3).join(", ")}
                          {summary?.topCompanies && summary.topCompanies.length > 3 && ", ..."}
                        </div>
                      ) : (
                        <div className="text-3xl font-extrabold">
                          <AnimatedCounter value={stat.value as number} suffix={stat.suffix} decimals={stat.label.includes('Average') ? 1 : 0} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Cards */}
      <section className="py-8 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          {isLoadingPlacements ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => <PlacementCardSkeleton key={i} />)}
            </div>
          ) : placements?.length === 0 ? (
            <FadeUp>
              <div className="flex flex-col items-center justify-center py-24 rounded-2xl border border-border/60 bg-card/40 text-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-muted/60 flex items-center justify-center">
                  <Award className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold">No placement records yet</h2>
                <p className="text-muted-foreground max-w-xs">
                  Placement season is currently underway. Check back soon for updates!
                </p>
              </div>
            </FadeUp>
          ) : (
            <div className="relative w-full overflow-hidden py-4 -mx-4 px-4 md:-mx-8 md:px-8">
              {/* Subtle edge fades for premium feel */}
              <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
              
              <motion.div
                className="flex w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  ease: "linear",
                  duration: Math.max(30, (placements?.length || 10) * 4), // Dynamic duration based on count
                  repeat: Infinity,
                }}
                whileHover={{ animationPlayState: "paused" }} // Optional: could pause on hover if implemented via CSS, but Framer Motion handles it differently.
              >
                {[...(placements || []), ...(placements || [])].map((placement: any, idx: number) => (
                  <div key={`${placement.id}-${idx}`} className="w-[320px] md:w-[380px] flex-none pr-6">
                    <div className="group h-full relative rounded-2xl border border-border/60 bg-card/70 overflow-hidden hover:border-primary/40 hover:shadow-xl transition-all duration-300">
                    {/* Top gradient bar */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-primary via-accent to-primary background-animate" />
                    
                    {/* Confetti sparkle on hover (CSS pseudo-elements handling this implicitly via transition) */}
                    
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-5">
                        <Avatar className="h-14 w-14 border-2 border-background shadow-sm ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
                          {placement.avatarUrl && <AvatarImage src={placement.avatarUrl} alt={placement.studentName} />}
                          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary font-bold">
                            {placement.studentName.split(' ').map((n: any) => n[0]).join('').substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg truncate group-hover:text-primary transition-colors">{placement.studentName}</h3>
                          <p className="text-xs font-medium text-muted-foreground truncate flex items-center gap-1 mt-0.5">
                            <GraduationCap className="h-3 w-3" />
                            {placement.college}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-4 pt-4 border-t border-border/50">
                        <div>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Company</p>
                          <p className="font-semibold text-lg flex items-center gap-2 leading-tight">
                            <div className="h-6 w-6 rounded-md bg-muted/60 flex items-center justify-center">
                              <Building2 className="h-3.5 w-3.5 text-foreground" />
                            </div>
                            {placement.company}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Role</p>
                          <p className="font-medium text-sm text-foreground/90">{placement.role}</p>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-1.5 text-center">
                            <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-0.5">Package</p>
                            <p className="font-extrabold text-emerald-600 dark:text-emerald-400 text-lg leading-none">{placement.packageLpa} <span className="text-xs">LPA</span></p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Class of</p>
                            <p className="font-semibold">{placement.year}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
