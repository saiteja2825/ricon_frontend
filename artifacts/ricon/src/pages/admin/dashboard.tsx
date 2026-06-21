import { useGetAdminDashboard } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Users, BookOpen, Briefcase, IndianRupee, TrendingUp,
  BarChart, Activity
} from "lucide-react";
import {
  BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { FadeUp, staggerContainer, staggerItem } from "@/components/ui/page-transition";
import { motion } from "framer-motion";


const COLORS = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

export default function AdminDashboard() {
  const { data: dashboard, isLoading } = useGetAdminDashboard();

  if (isLoading || !dashboard) {
    return (
      <div className="p-8 space-y-8">
        <Skeleton className="h-10 w-64 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-36 w-full rounded-2xl" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-96 w-full rounded-2xl" />
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  const statCards = [
    { title: "Total Revenue", value: `₹${dashboard.totalRevenue.toLocaleString()}`, subvalue: `+₹${dashboard.monthlyRevenue.toLocaleString()} this month`, icon: IndianRupee, color: "text-amber-500", bg: "bg-amber-500/10" },
    { title: "Total Students", value: dashboard.totalStudents.toLocaleString(), subvalue: `+${dashboard.newStudentsThisMonth} this month`, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Active Programs", value: dashboard.activeCourses + dashboard.activeInternships, subvalue: `${dashboard.activeCourses} Courses, ${dashboard.activeInternships} Internships`, icon: BookOpen, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Placement Rate", value: `${dashboard.placementRate}%`, subvalue: "Of eligible candidates", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

      </div>
      <div className="relative z-10 p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
        <FadeUp>
          <h1 className="text-3xl font-extrabold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Real-time metrics and platform analytics.</p>
        </FadeUp>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {statCards.map((stat, idx) => (
          <motion.div key={idx} variants={staggerItem}>
            <Card className="border-border/60 shadow-sm bg-card/60 backdrop-blur-sm overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-primary/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-colors duration-500" />
              <CardContent className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-extrabold tracking-tight">{stat.value}</p>
                  </div>
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/60 text-xs font-medium text-muted-foreground">
                  {stat.subvalue}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <motion.div variants={staggerItem}>
          <Card className="col-span-1 border-border/60 shadow-sm bg-card/60 backdrop-blur-sm h-full flex flex-col">
            <CardHeader className="border-b border-border/40 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart className="h-5 w-5 text-primary" />
                Revenue By Source
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col pt-6">
              <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dashboard.revenueBySource}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="amount"
                      nameKey="source"
                      stroke="none"
                    >
                      {dashboard.revenueBySource.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => `₹${value.toLocaleString()}`} 
                      contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--foreground))' }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36} 
                      iconType="circle" 
                      wrapperStyle={{ color: "hsl(var(--foreground))", fontSize: "14px", fontWeight: "500" }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card className="col-span-1 border-border/60 shadow-sm bg-card/60 backdrop-blur-sm h-full flex flex-col">
            <CardHeader className="border-b border-border/40 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 flex-1">
              <div className="space-y-6">
                {dashboard.recentActivity.map((activity: any, index: number) => (
                  <div key={index} className="flex items-start gap-4 relative">
                    {index !== dashboard.recentActivity.length - 1 && (
                      <div className="absolute left-5 top-10 bottom-[-24px] w-px bg-border" />
                    )}
                    <div className="h-10 w-10 shrink-0 bg-background border border-border shadow-sm rounded-full flex items-center justify-center z-10">
                      {activity.type === 'enrollment' ? <BookOpen className="h-4 w-4 text-emerald-500" /> : 
                       activity.type === 'application' ? <Briefcase className="h-4 w-4 text-amber-500" /> : 
                       <Users className="h-4 w-4 text-blue-500" />}
                    </div>
                    <div className="pt-1 bg-muted/30 px-4 py-3 rounded-xl border border-border/40 flex-1">
                      <p className="text-sm font-medium leading-snug mb-1">{activity.description}</p>
                      <p className="text-xs text-muted-foreground font-medium">
                        {new Date(activity.timestamp).toLocaleDateString(undefined, { 
                          month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
      </div>
    </div>
  );
}
