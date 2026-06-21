import { useListStudents } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Search, UserCircle, GraduationCap, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/ui/page-transition";

export default function AdminStudents() {
  const { data: students, isLoading } = useListStudents();
  const [search, setSearch] = useState("");

  const filteredStudents = students?.filter((s: any) => 
    s.fullName.toLowerCase().includes(search.toLowerCase()) || 
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    s.college.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      <FadeUp>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">Students Directory</h1>
            <p className="text-muted-foreground">Manage and view all registered students on the platform.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input 
              type="search" 
              placeholder="Search by name, email, or college..." 
              className="pl-10 h-11 rounded-xl bg-card/60 backdrop-blur-sm border-border/60 shadow-sm" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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
                    <TableHead className="py-4 font-semibold text-foreground">Name</TableHead>
                    <TableHead className="py-4 font-semibold text-foreground">Contact</TableHead>
                    <TableHead className="py-4 font-semibold text-foreground">Academic Profile</TableHead>
                    <TableHead className="py-4 font-semibold text-foreground">Role</TableHead>
                    <TableHead className="py-4 font-semibold text-foreground text-right">Joined Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    [1, 2, 3, 4, 5, 6].map((i: any) => (
                      <TableRow key={i} className="border-border/50">
                        <TableCell className="py-4"><div className="flex items-center gap-3"><Skeleton className="h-10 w-10 rounded-full" /><Skeleton className="h-5 w-32" /></div></TableCell>
                        <TableCell className="py-4"><Skeleton className="h-4 w-40 mb-1.5" /><Skeleton className="h-3 w-24" /></TableCell>
                        <TableCell className="py-4"><Skeleton className="h-4 w-48 mb-1.5" /><Skeleton className="h-3 w-32" /></TableCell>
                        <TableCell className="py-4"><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                        <TableCell className="py-4 text-right"><Skeleton className="h-4 w-24 ml-auto" /></TableCell>
                      </TableRow>
                    ))
                  ) : filteredStudents?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-48 text-center text-muted-foreground">
                        <div className="flex flex-col items-center justify-center">
                          <UserCircle className="h-10 w-10 mb-3 opacity-20" />
                          <p>No students found matching your search.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents?.map((student: any) => (
                      <TableRow key={student.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                        <TableCell className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary font-bold border border-primary/20">
                              {student.fullName.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-bold">{student.fullName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="text-sm font-medium mb-0.5">{student.email}</div>
                          <div className="text-xs text-muted-foreground">{student.phone}</div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="text-sm font-medium mb-0.5 flex items-center gap-1.5">
                            <GraduationCap className="h-3.5 w-3.5 text-muted-foreground" />
                            {student.college}
                          </div>
                          <div className="text-xs text-muted-foreground pl-5">{student.degree} • Class of {student.graduationYear}</div>
                        </TableCell>
                        <TableCell className="py-4">
                          <Badge 
                            variant="outline"
                            className={`px-2.5 py-0.5 rounded-full font-semibold border text-xs capitalize ${
                              student.role === 'admin' 
                                ? 'bg-destructive/10 text-destructive border-destructive/20' 
                                : student.role === 'mentor' 
                                  ? 'bg-primary/10 text-primary border-primary/20' 
                                  : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                            }`}
                          >
                            {student.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4 text-right">
                          <div className="inline-flex items-center justify-end gap-1.5 text-sm text-muted-foreground font-medium">
                            <Clock className="h-3.5 w-3.5" />
                            {new Date(student.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
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
