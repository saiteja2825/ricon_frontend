import { useListApplications, useUpdateApplication } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CheckCircle2, Clock, FileText, Inbox } from "lucide-react";
import { FadeUp } from "@/components/ui/page-transition";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function AdminApplications() {
  const { data: applications, isLoading, refetch } = useListApplications({});
  const updateApplication = useUpdateApplication();
  const [search, setSearch] = useState("");

  const handleStatusChange = (id: number, status: string) => {
    updateApplication.mutate({
      id,
      data: { status: status as any }
    }, {
      onSuccess: () => {
        toast.success("Status Updated", { 
          description: "Application status has been updated successfully.",
          icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />
        });
        refetch();
      },
      onError: () => {
        toast.error("Update Failed", { 
          description: "Could not update the application status. Please try again."
        });
      }
    });
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'reviewing': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'approved': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'allocated': return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      case 'completed': return 'bg-primary/10 text-primary border-primary/20';
      case 'rejected': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground border-border/60';
    }
  };

  const filteredApps = applications?.filter((a: any) => 
    a.studentName.toLowerCase().includes(search.toLowerCase()) || 
    a.internshipTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      <FadeUp>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">Applications</h1>
            <p className="text-muted-foreground">Review and manage student internship applications.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input 
              type="search" 
              placeholder="Search by student or internship..." 
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
                    <TableHead className="py-4 font-semibold text-foreground">Applicant</TableHead>
                    <TableHead className="py-4 font-semibold text-foreground">Internship Program</TableHead>
                    <TableHead className="py-4 font-semibold text-foreground">Applied On</TableHead>
                    <TableHead className="py-4 font-semibold text-foreground">Status</TableHead>
                    <TableHead className="py-4 font-semibold text-foreground text-right pr-6">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    [1, 2, 3, 4, 5].map((i: any) => (
                      <TableRow key={i} className="border-border/50">
                        <TableCell className="py-4"><div className="flex items-center gap-3"><Skeleton className="h-9 w-9 rounded-full" /><Skeleton className="h-5 w-32" /></div></TableCell>
                        <TableCell className="py-4"><Skeleton className="h-5 w-48 mb-1.5" /><Skeleton className="h-3 w-32" /></TableCell>
                        <TableCell className="py-4"><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell className="py-4"><Skeleton className="h-7 w-24 rounded-full" /></TableCell>
                        <TableCell className="py-4 text-right pr-6"><Skeleton className="h-9 w-32 rounded-xl ml-auto" /></TableCell>
                      </TableRow>
                    ))
                  ) : filteredApps?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-48 text-center text-muted-foreground">
                        <div className="flex flex-col items-center justify-center">
                          <Inbox className="h-10 w-10 mb-3 opacity-20" />
                          <p>No applications found.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredApps?.map((application: any) => (
                      <TableRow key={application.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                        <TableCell className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-foreground font-semibold border border-border/60">
                              {application.studentName.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-semibold text-[15px]">{application.studentName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="font-semibold text-[15px] mb-0.5">{application.internshipTitle}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <FileText className="h-3 w-3" />
                            ID: #{application.id.toString().padStart(4, '0')}
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            {new Date(application.appliedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <Badge 
                            variant="outline" 
                            className={`px-2.5 py-1 rounded-full font-semibold border text-xs capitalize ${getStatusStyles(application.status)}`}
                          >
                            {application.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4 text-right pr-6">
                          <Select 
                            defaultValue={application.status} 
                            onValueChange={(val) => handleStatusChange(application.id, val)}
                            disabled={updateApplication.isPending}
                          >
                            <SelectTrigger className="w-36 h-10 text-sm rounded-xl border-border/60 shadow-sm ml-auto bg-background/50 backdrop-blur-sm focus:ring-primary/20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-border/60 shadow-xl">
                              <SelectItem value="applied" className="rounded-lg my-1">Applied</SelectItem>
                              <SelectItem value="reviewing" className="rounded-lg my-1">Reviewing</SelectItem>
                              <SelectItem value="approved" className="rounded-lg my-1 text-emerald-600 dark:text-emerald-400 font-medium">Approved</SelectItem>
                              <SelectItem value="allocated" className="rounded-lg my-1 text-purple-600 dark:text-purple-400 font-medium">Allocated</SelectItem>
                              <SelectItem value="completed" className="rounded-lg my-1 text-primary font-medium">Completed</SelectItem>
                              <SelectItem value="rejected" className="rounded-lg my-1 text-destructive font-medium">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
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
