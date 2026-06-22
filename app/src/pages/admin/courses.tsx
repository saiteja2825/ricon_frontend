import { useListCourses } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Plus, BookOpen, Clock, Users, Search } from "lucide-react";
import { FadeUp } from "@/components/ui/page-transition";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function AdminCourses() {
  const { data: courses, isLoading } = useListCourses({});
  const [search, setSearch] = useState("");

  const filteredCourses = courses?.filter((c: any) => 
    c.title.toLowerCase().includes(search.toLowerCase()) || 
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      <FadeUp>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">Courses Directory</h1>
            <p className="text-muted-foreground">Manage course catalog, pricing, and enrollments.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input 
                type="search" 
                placeholder="Search courses..." 
                className="pl-10 h-11 rounded-xl bg-card/60 backdrop-blur-sm border-border/60 shadow-sm" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button className="h-11 px-5 rounded-xl btn-gradient shadow-md shrink-0 gap-2">
              <Plus className="h-4.5 w-4.5" />
              Create Course
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
                    <TableHead className="py-4 font-semibold text-foreground">Course Details</TableHead>
                    <TableHead className="py-4 font-semibold text-foreground">Category</TableHead>
                    <TableHead className="py-4 font-semibold text-foreground">Status</TableHead>
                    <TableHead className="py-4 font-semibold text-foreground">Pricing</TableHead>
                    <TableHead className="py-4 font-semibold text-foreground text-right pr-6">Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    [1, 2, 3, 4, 5].map((i: any) => (
                      <TableRow key={i} className="border-border/50">
                        <TableCell className="py-4"><div className="flex gap-3"><Skeleton className="h-12 w-16 rounded-lg" /><div><Skeleton className="h-5 w-48 mb-1.5" /><Skeleton className="h-3 w-32" /></div></div></TableCell>
                        <TableCell className="py-4"><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell className="py-4"><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                        <TableCell className="py-4"><Skeleton className="h-5 w-16" /></TableCell>
                        <TableCell className="py-4 text-right pr-6"><Skeleton className="h-5 w-16 ml-auto" /></TableCell>
                      </TableRow>
                    ))
                  ) : filteredCourses?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-48 text-center text-muted-foreground">
                        <div className="flex flex-col items-center justify-center">
                          <BookOpen className="h-10 w-10 mb-3 opacity-20" />
                          <p>No courses found matching your search.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCourses?.map((course: any) => (
                      <TableRow key={course.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                        <TableCell className="py-4">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-16 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center overflow-hidden shrink-0">
                              {course.imageUrl ? (
                                <img src={course.imageUrl} alt={course.title} className="h-full w-full object-cover" />
                              ) : (
                                <BookOpen className="h-5 w-5 text-primary/50" />
                              )}
                            </div>
                            <div>
                              <div className="font-semibold text-[15px] mb-1 line-clamp-1">{course.title}</div>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                                <span className="flex items-center gap-1 bg-muted/50 px-1.5 py-0.5 rounded-md capitalize">
                                  {course.level}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {course.duration}
                                </span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <span className="font-medium">{course.category}</span>
                        </TableCell>
                        <TableCell className="py-4">
                          <Badge 
                            variant="outline"
                            className={`px-2.5 py-0.5 rounded-full font-semibold border text-xs capitalize ${
                              course.status === 'ongoing' 
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                                : 'bg-muted text-muted-foreground border-border/60'
                            }`}
                          >
                            {course.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4 font-semibold">
                          {course.price === 0 ? (
                            <span className="text-emerald-500">Free</span>
                          ) : (
                            `₹${course.price.toLocaleString()}`
                          )}
                        </TableCell>
                        <TableCell className="py-4 text-right pr-6">
                          <div className="inline-flex items-center gap-1.5 text-sm font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-lg">
                            <Users className="h-3.5 w-3.5" />
                            {course.enrollmentCount}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
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
