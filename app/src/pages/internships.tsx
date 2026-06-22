import { useListInternships } from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Clock, IndianRupee, Users, ArrowRight, Search, MapPin } from "lucide-react";
import { motion } from "framer-motion";

import { FadeUp, staggerContainer, staggerItem } from "@/components/ui/page-transition";
import { useState } from "react";
import { Input } from "@/components/ui/input";

function InternshipSkeleton() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/70 p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="h-6 w-24 rounded-full animate-shimmer" />
        <div className="h-6 w-20 rounded-full animate-shimmer" />
      </div>
      <div className="h-7 w-3/4 rounded-lg animate-shimmer mb-3" />
      <div className="h-4 w-1/2 rounded-lg animate-shimmer mb-6" />
      <div className="space-y-3 mb-6">
        <div className="h-4 w-full rounded-lg animate-shimmer" />
        <div className="h-4 w-5/6 rounded-lg animate-shimmer" />
        <div className="h-4 w-4/6 rounded-lg animate-shimmer" />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="h-5 w-24 rounded animate-shimmer" />
        <div className="h-5 w-24 rounded animate-shimmer" />
        <div className="col-span-2 h-5 w-full rounded animate-shimmer" />
      </div>
      <div className="pt-4 border-t border-border/50">
        <div className="h-11 w-full rounded-xl animate-shimmer" />
      </div>
    </div>
  );
}

const categoryColors: Record<string, string> = {
  "Software Engineering": "from-blue-500/20 to-blue-500/5 text-blue-600 dark:text-blue-400 border-blue-500/20",
  "Data Science": "from-emerald-500/20 to-emerald-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  "Product Management": "from-purple-500/20 to-purple-500/5 text-purple-600 dark:text-purple-400 border-purple-500/20",
  "Design": "from-pink-500/20 to-pink-500/5 text-pink-600 dark:text-pink-400 border-pink-500/20",
};

export default function Internships() {
  const { data: internships, isLoading } = useListInternships({});
  const [search, setSearch] = useState("");

  const filtered = internships?.filter(
    (i: any) =>
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.description?.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden border-b border-border/40">

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <FadeUp className="max-w-2xl">
            <div className="mb-3 text-sm font-semibold text-primary uppercase tracking-wider">Internship Portal</div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Kickstart your career with <span className="text-gradient-primary">top companies</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Apply for curated internships designed to give you real-world experience and build your resume.
            </p>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Search internships by role, skill, or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-11 rounded-xl border-border/60 bg-card/60 backdrop-blur-sm"
              />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Internships Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <InternshipSkeleton key={i} />)}
            </div>
          ) : filtered?.length === 0 ? (
            <FadeUp>
              <div className="flex flex-col items-center justify-center py-24 rounded-2xl border border-border/60 bg-card/40 text-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-muted/60 flex items-center justify-center">
                  <Briefcase className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold">No internships found</h2>
                <p className="text-muted-foreground max-w-xs">
                  {search ? `No internships match "${search}". Try a different search term.` : "Check back later for new opportunities."}
                </p>
                {search && (
                  <Button variant="outline" onClick={() => setSearch("")} className="mt-2">
                    Clear search
                  </Button>
                )}
              </div>
            </FadeUp>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered?.map((internship: any) => {
                const badgeColor = categoryColors[internship.category] || "from-primary/20 to-primary/5 text-primary border-primary/20";
                
                return (
                  <motion.div key={internship.id} variants={staggerItem}>
                    <div className="group h-full rounded-2xl border border-border/60 bg-card/70 hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col p-6 relative overflow-hidden">
                      {/* Hover gradient bg */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-500 pointer-events-none" />

                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start gap-4 mb-4">
                          <Badge className={`bg-gradient-to-r ${badgeColor} border font-medium px-2.5 py-1 rounded-lg`}>
                            {internship.category}
                          </Badge>
                          {internship.openings > 0 && (
                            <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10 rounded-lg">
                              {internship.openings} Openings
                            </Badge>
                          )}
                        </div>

                        <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors duration-200">
                          {internship.title}
                        </h3>
                        <p className="text-sm font-medium text-muted-foreground mb-4">
                          Mentor: {internship.mentorName || 'TBA'}
                        </p>

                        <p className="text-sm text-muted-foreground mb-6 line-clamp-3 flex-1 leading-relaxed">
                          {internship.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm mb-6 bg-muted/40 p-4 rounded-xl border border-border/40">
                          <div className="flex items-center gap-2 text-foreground font-medium">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{internship.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-foreground font-medium">
                            <IndianRupee className="h-4 w-4 text-muted-foreground" />
                            <span>{internship.stipend || 'Unpaid'}</span>
                          </div>
                          <div className="col-span-2 flex items-center gap-2 text-foreground font-medium">
                            <Users className="h-4 w-4 shrink-0 text-muted-foreground" />
                            <span className="truncate">Skills: {internship.skills}</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-border/50">
                          <Button className="w-full rounded-xl btn-gradient group/btn shadow-md">
                            Apply Now
                            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </div>
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
