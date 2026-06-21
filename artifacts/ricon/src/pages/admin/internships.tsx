import { useListInternships } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Briefcase, IndianRupee, Clock, Search, MapPin } from "lucide-react";
import { FadeUp } from "@/components/ui/page-transition";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const categoryColors: Record<string, string> = {
  "Software Engineering": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  "Data Science": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  "Product Management": "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  "Design": "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
};

export default function AdminInternships() {
  const { data: internships, isLoading } = useListInternships({});
  const [search, setSearch] = useState("");

  const filteredInternships = internships?.filter(i => 
    i.title.toLowerCase().includes(search.toLowerCase()) || 
    i.category.toLowerCase().includes(search.toLowerCase()) ||
    (i.mentorName && i.mentorName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      <FadeUp>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">Internships Directory</h1>
            <p className="text-muted-foreground">Manage active internship opportunities and mentorship programs.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input 
                type="search" 
                placeholder="Search programs..." 
                className="pl-10 h-11 rounded-xl bg-card/60 backdrop-blur-sm border-border/60 shadow-sm" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button className="h-11 px-5 rounded-xl btn-gradient shadow-md shrink-0 gap-2">
              <Plus className="h-4.5 w-4.5" />
              Create Program
            </Button>
          </div>
        </div>
      </FadeUp>

      <FadeUp delay={0.1}>
        <Card className="border-border/60 shadow-sm overflow-hidden bg-card/60 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="hover:bg-transparent border-border/50">
                    <TableHead className="py-4 font-semibold text-foreground">Program Details</TableHead>
                    <TableHead className="py-4 font-semibold text-foreground">Category</TableHead>
                    <TableHead className="py-4 font-semibold text-foreground">Compensation & Duration</TableHead>
                    <TableHead className="py-4 font-semibold text-foreground">Mentor</TableHead>
                    <TableHead className="py-4 font-semibold text-foreground text-right pr-6">Openings</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    [1, 2, 3, 4, 5].map(i => (
                      <TableRow key={i} className="border-border/50">
                        <TableCell className="py-4"><div className="flex gap-3"><Skeleton className="h-10 w-10 rounded-lg" /><div><Skeleton className="h-5 w-48 mb-1.5" /><Skeleton className="h-3 w-32" /></div></div></TableCell>
                        <TableCell className="py-4"><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                        <TableCell className="py-4"><Skeleton className="h-5 w-24 mb-1.5" /><Skeleton className="h-3 w-20" /></TableCell>
                        <TableCell className="py-4"><Skeleton className="h-5 w-32" /></TableCell>
                        <TableCell className="py-4 text-right pr-6"><Skeleton className="h-6 w-16 ml-auto rounded-full" /></TableCell>
                      </TableRow>
                    ))
                  ) : filteredInternships?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-48 text-center text-muted-foreground">
                        <div className="flex flex-col items-center justify-center">
                          <Briefcase className="h-10 w-10 mb-3 opacity-20" />
                          <p>No internships found matching your search.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredInternships?.map((internship) => {
                      const badgeColor = categoryColors[internship.category] || "bg-primary/10 text-primary border-primary/20";
                      return (
                        <TableRow key={internship.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                          <TableCell className="py-4">
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center shrink-0">
                                <Briefcase className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="font-semibold text-[15px] mb-1 line-clamp-1 group-hover:text-primary transition-colors">{internship.title}</div>
                                <div className="text-xs text-muted-foreground font-medium line-clamp-1 max-w-xs">{internship.description}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <Badge 
                              variant="outline"
                              className={`px-2.5 py-0.5 rounded-full font-semibold border text-xs ${badgeColor}`}
                            >
                              {internship.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center gap-1.5 font-semibold text-sm mb-1">
                              <IndianRupee className="h-3.5 w-3.5 text-muted-foreground" />
                              {internship.stipend || <span className="text-muted-foreground font-medium">Unpaid</span>}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                              <Clock className="h-3 w-3" />
                              {internship.duration}
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="font-medium text-sm">
                              {internship.mentorName || <span className="text-muted-foreground italic">To be assigned</span>}
                            </div>
                          </TableCell>
                          <TableCell className="py-4 text-right pr-6">
                            <Badge 
                              variant="secondary"
                              className="px-2.5 py-1 rounded-lg font-bold text-sm bg-muted/60"
                            >
                              {internship.openings}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </FadeUp>
    </div>
  );
}
