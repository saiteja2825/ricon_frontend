import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useGetPlatformStats, useListTestimonials } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Map,
  Target,
  Zap,
  Star,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
  Sparkles,
  BrainCircuit,
  Code,
  Binary,
  GitBranch,
  Database,
  Cpu,
} from "lucide-react";

import { AnimatedCounter } from "@/components/ui/animated-counter";
import { FadeUp, staggerContainer, staggerItem, fadeIn } from "@/components/ui/page-transition";

const floatingBadges = [
  { name: "AI / ML", icon: BrainCircuit },
  { name: "Full Stack", icon: Code },
  { name: "DSA", icon: Binary },
  { name: "DevOps", icon: GitBranch },
  { name: "System Design", icon: Database },
  { name: "Cloud", icon: Cpu },
];

const features = [
  {
    title: "Premium Courses",
    description: "Industry-aligned curriculum taught by experienced practitioners, complete with real-world projects.",
    icon: BookOpen,
    href: "/courses",
    color: "from-violet-500 to-primary",
    badge: "50+ Courses",
  },
  {
    title: "Verified Internships",
    description: "Direct access to internship opportunities at top tech companies to build your resume.",
    icon: Briefcase,
    href: "/internships",
    color: "from-cyan-500 to-accent",
    badge: "200+ Companies",
  },
  {
    title: "Career Roadmaps",
    description: "Structured, step-by-step guides for mastering domains like AI/ML, Full Stack, and DSA.",
    icon: Map,
    href: "/roadmaps",
    color: "from-emerald-500 to-teal-400",
    badge: "10+ Domains",
  },
  {
    title: "Placement Prep",
    description: "Dedicated resources and mentorship to help you clear technical interviews and secure offers.",
    icon: Target,
    href: "/placements",
    color: "from-amber-500 to-orange-400",
    badge: "95% Success",
  },
];

const subtextVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 1.6 } 
  }
};

const ctasVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 1.8 } 
  }
};

export default function Home() {
  const { data: stats, isLoading: statsLoading } = useGetPlatformStats();
  const { data: testimonials, isLoading: testimonialsLoading } = useListTestimonials();

  const chartData = stats
    ? [
        { name: "Students", value: stats.totalStudents },
        { name: "Courses", value: stats.activeCourses * 100 },
        { name: "Placed", value: stats.studentsPlaced },
      ]
    : [];

  const statItems = [
    { label: "Placement Rate", value: stats?.placementSuccessRate ?? 0, suffix: "%", icon: TrendingUp, color: "text-emerald-400" },
    { label: "Completions", value: stats?.courseCompletions ?? 0, suffix: "+", icon: Award, color: "text-primary" },
    { label: "Internships", value: stats?.internshipsAvailable ?? 0, suffix: "", icon: Briefcase, color: "text-accent" },
    { label: "Students Placed", value: stats?.studentsPlaced ?? 0, suffix: "+", icon: Users, color: "text-amber-400" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center pt-8 pb-20 overflow-hidden bg-gradient-hero">
        {/* Subtle grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025] z-0"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='1'%3E%3Cpath d='M0 0h40v1H0zM0 0v40h1V0z'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center lg:-translate-x-12 xl:-translate-x-24 transition-transform duration-500"
          >
            {/* Badge */}
            <motion.div variants={fadeIn} className="mb-8 inline-flex">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-sm font-medium text-primary backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                Accelerate your engineering career
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ filter: "blur(8px)", opacity: 0.4 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 1.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-[1.05]"
            >
              The{" "}
              <span className="whitespace-nowrap">
                <span className="relative inline-flex">
                  <motion.span
                  className="absolute left-0 top-0 text-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    y: [-800, -90, -180, 0], 
                    x: [-150, -100, -50, 0], 
                    rotate: [-45, 15, -15, 0],
                    opacity: [0, 1, 1, 1],
                    scale: [0.8, 1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 1.4,
                    times: [0, 0.4, 0.7, 1],
                    ease: [[0.42, 0, 1, 1], [0.25, 0.1, 0.25, 1], [0.42, 0, 1, 1]],
                    delay: 0.2 
                  }}
                >
                  C
                </motion.span>
                {/* Invisible placeholder to maintain layout width */}
                <span className="opacity-0 select-none">C</span>
              </span>
              <span className="relative inline-block overflow-hidden">
                ockpit
                {/* Highlight Sweep */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-primary/30 to-transparent skew-x-12"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 1, ease: [0.42, 0, 0.58, 1], delay: 1.4 }}
                />
              </span>
              </span>{" "}
              of Your <br className="hidden md:block" />
              <span className="text-gradient-primary">Engineering Career</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={subtextVariant}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Bridge the gap between academics and industry. Access premium courses, verified internships,
              and elite placement guidance — all in one platform.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={ctasVariant}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto sm:max-w-none px-4 sm:px-0"
            >
              <Link href="/register" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="h-14 px-8 text-base font-semibold w-full rounded-xl btn-gradient shadow-lg shadow-primary/20 group"
                >
                  Join RiconTech
                  <ChevronRight className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/courses" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-base font-semibold w-full rounded-xl border-border/60 glass hover:border-primary/40 transition-all duration-300 group"
                >
                  Explore Courses
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={ctasVariant}
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-sm text-muted-foreground"
            >
              <div className="flex -space-x-2">
                {["A", "B", "C", "D", "E"].map((l, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      background: `hsl(${240 + i * 30} 70% 60%)`,
                    }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <span>
                <span className="font-semibold text-foreground">2,400+</span> students already enrolled
              </span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1 font-medium text-foreground">4.9</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative floating chips - Infinite Vertical Scroll */}
        <div 
          className="pointer-events-none absolute top-12 bottom-12 right-0 lg:right-4 xl:right-12 2xl:right-24 hidden lg:flex flex-col overflow-hidden w-44" 
          style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}
        >
          <motion.div
            className="flex flex-col gap-4 py-2"
            animate={{ y: ["0%", "-50%"] }}
            transition={{
              duration: 15,
              ease: "linear" as const,
              repeat: Infinity,
            }}
          >
            {[...floatingBadges, ...floatingBadges].map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-card border border-border/80 shadow-sm text-sm font-semibold text-foreground whitespace-nowrap"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <badge.icon className="h-4 w-4" />
                </div>
                {badge.name}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Stats */}
            <div>
              <FadeUp>
                <div className="mb-2 text-sm font-semibold text-primary uppercase tracking-wider">Platform Metrics</div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Numbers that speak for themselves
                </h2>
                <p className="text-muted-foreground mb-10 leading-relaxed">
                  We measure our success by your success. Our platform has consistently delivered results for
                  ambitious engineering students.
                </p>
              </FadeUp>

              <div className="grid grid-cols-2 gap-6">
                {statItems.map((stat, i) => (
                  <FadeUp key={stat.label} delay={i * 0.08}>
                    <div className="group p-5 rounded-2xl border border-border/60 bg-card/60 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                      <div className={`${stat.color} mb-3`}>
                        <stat.icon className="h-5 w-5" />
                      </div>
                      <div className="text-3xl font-extrabold mb-1">
                        {statsLoading ? (
                          <Skeleton className="h-9 w-24" />
                        ) : (
                          <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                        )}
                      </div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>

            {/* Right - Chart */}
            <FadeUp delay={0.2}>
              <div className="h-[380px] w-full rounded-2xl border border-border/60 bg-card/60 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base font-semibold">Platform Growth</h3>
                  <span className="text-xs text-muted-foreground px-2.5 py-1 rounded-full bg-muted/60">
                    Live data
                  </span>
                </div>
                {statsLoading ? (
                  <div className="space-y-3 mt-4">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} className="h-8 w-full rounded-lg" />
                    ))}
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={chartData} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="name"
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        width={40}
                      />
                      <Tooltip
                        cursor={{ fill: "hsl(var(--muted) / 0.4)", radius: 6 }}
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          borderColor: "hsl(var(--border))",
                          borderRadius: "12px",
                          fontSize: "12px",
                          boxShadow: "var(--shadow-lg)",
                        }}
                      />
                      <Bar
                        dataKey="value"
                        fill="url(#barGrad)"
                        radius={[8, 8, 0, 0]}
                        maxBarSize={64}
                      />
                      <defs>
                        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.9} />
                          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0.7} />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─────────────────────────────────────────── */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <FadeUp className="text-center max-w-3xl mx-auto mb-16">
            <div className="mb-3 text-sm font-semibold text-primary uppercase tracking-wider">What We Offer</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Everything you need to{" "}
              <span className="text-gradient-primary">succeed</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              A comprehensive ecosystem designed specifically for engineering students looking to bridge the
              gap to industry.
            </p>
          </FadeUp>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {features.map((feature: any, idx: any) => (
              <motion.div key={idx} variants={staggerItem}>
                <Link href={feature.href}>
                  <div className="group relative h-full rounded-2xl border border-border/60 bg-card/70 p-8 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
                    {/* Hover gradient bg */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-accent/0 group-hover:from-primary/5 group-hover:to-accent/3 transition-all duration-500 rounded-2xl" />

                    <div className="relative">
                      {/* Icon */}
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>

                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                        <span className="shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
                          {feature.badge}
                        </span>
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-5">{feature.description}</p>

                      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                        <span>Explore</span>
                        <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-b from-muted/20 to-transparent border-t border-border/40">
        <div className="container mx-auto px-4 md:px-8">
          <FadeUp className="text-center max-w-3xl mx-auto mb-16">
            <div className="mb-3 text-sm font-semibold text-primary uppercase tracking-wider">Success Stories</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Students who made it
            </h2>
            <p className="text-lg text-muted-foreground">
              Hear from students who transformed their careers with Ricon Technology.
            </p>
          </FadeUp>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonialsLoading
              ? [1, 2, 3].map((i) => (
                  <div key={i} className="h-72 rounded-2xl border border-border/60 overflow-hidden">
                    <div className="animate-shimmer h-full w-full" />
                  </div>
                ))
              : testimonials?.slice(0, 3).map((testimonial) => (
                  <motion.div key={testimonial.id} variants={staggerItem}>
                    <div className="group h-full rounded-2xl border border-border/60 bg-card/70 p-7 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col">
                      {/* Stars */}
                      <div className="flex gap-0.5 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-muted fill-transparent"}`}
                          />
                        ))}
                      </div>

                      <p className="text-muted-foreground mb-6 flex-1 leading-relaxed">
                        "{testimonial.content}"
                      </p>

                      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/50">
                        <Avatar className="h-10 w-10 border-2 border-background ring-2 ring-primary/20">
                          {testimonial.avatarUrl && <AvatarImage src={testimonial.avatarUrl} />}
                          <AvatarFallback className="bg-primary/20 text-primary font-bold text-sm">
                            {testimonial.studentName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm truncate">{testimonial.studentName}</div>
                          <div className="text-xs text-muted-foreground truncate">{testimonial.college}</div>
                          {testimonial.company && (
                            <div className="text-xs font-semibold text-emerald-500 mt-0.5">
                              → {testimonial.company}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="py-24 border-t border-border/40">
        <div className="container mx-auto px-4 md:px-8">
          <FadeUp>
            <div className="relative rounded-3xl overflow-hidden p-10 md:p-20 text-center">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-accent" />
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/30" />

              {/* Blobs */}
              <div className="absolute top-0 right-0 h-80 w-80 translate-x-1/3 -translate-y-1/3 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-60 w-60 -translate-x-1/3 translate-y-1/3 rounded-full bg-black/10 blur-3xl" />

              <div className="relative z-10 max-w-3xl mx-auto">
                <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-semibold backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  Join 2,400+ students
                </div>
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
                  Ready to launch your career?
                </h2>
                <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed">
                  Join thousands of students who have accelerated their journey from campus to leading tech companies.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/register">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="h-14 px-8 text-base font-bold w-full sm:w-auto rounded-xl shadow-xl"
                    >
                      Create Free Account
                    </Button>
                  </Link>
                  <Link href="/chat">
                    <Button
                      size="lg"
                      className="h-14 px-8 text-base font-semibold w-full sm:w-auto rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm transition-all duration-300"
                    >
                      Talk to AI Mentor
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
