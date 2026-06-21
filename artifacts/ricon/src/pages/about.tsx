import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Target, Users, Zap, Heart, Shield, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { FadeUp, staggerContainer, staggerItem } from "@/components/ui/page-transition";

import { MagneticCard } from "@/components/effects/magnetic-card";

const values = [
  {
    icon: Target,
    title: "Precision Focus",
    description: "No fluff. We focus on exactly what you need to know to clear interviews and excel on the job.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Users,
    title: "Community First",
    description: "Learning is collaborative. We build strong cohorts that support each other through the journey.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: Zap,
    title: "Action Oriented",
    description: "Theory without practice is useless. Our platform emphasizes building, shipping, and doing.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Heart,
    title: "Empathy",
    description: "We understand the student struggle and design every feature to reduce friction and anxiety.",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    icon: Shield,
    title: "Verified Trust",
    description: "All our mentors, courses, and internships are thoroughly vetted for highest quality.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Connecting talented students with opportunities beyond their immediate geography.",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden border-b border-border/40">

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <FadeUp className="max-w-3xl mx-auto text-center">
            <div className="mb-6 inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-gradient-to-br from-primary to-accent shadow-xl shadow-primary/20">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Bridging the gap between <span className="text-gradient-primary">academia and industry</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We exist to transform raw academic knowledge into deployable engineering talent, giving every student the career they deserve.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <h2 className="text-3xl font-bold tracking-tight mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                We believe every engineering student has the potential to excel in the tech industry, provided they get the right guidance, practical skills, and opportunities. Ricon Technology is the bridge that makes this transition seamless.
              </p>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
                className="space-y-4"
              >
                {[
                  "Industry-aligned curriculum taught by active practitioners",
                  "Real-world internship experiences over theoretical projects",
                  "1-on-1 mentorship for career roadmapping and interview prep",
                  "Direct placement assistance with partner companies"
                ].map((item, index) => (
                  <motion.div key={index} variants={staggerItem} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/60 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                    <div className="mt-0.5 bg-primary/10 p-1.5 rounded-full text-primary shrink-0">
                      <Zap className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </FadeUp>
            
            <FadeUp delay={0.2} className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <div className="relative bg-card/60 backdrop-blur-md rounded-3xl border border-border/60 aspect-square md:aspect-[4/3] flex flex-col items-center justify-center p-8 text-center shadow-xl overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <GraduationCap className="h-24 w-24 text-primary/40 mb-6" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">Empowering Students</h3>
                <p className="text-muted-foreground max-w-sm">Building the next generation of world-class engineers and innovators.</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-muted/30 border-t border-border/40">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <FadeUp className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every feature we build and every student we mentor.
            </p>
          </FadeUp>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {values.map((val, idx) => (
              <motion.div key={idx} variants={staggerItem} className="h-full">
                <MagneticCard className="h-full rounded-2xl bg-card/70 border border-border/60 hover:border-border transition-colors">
                  <div className="p-8 text-center flex flex-col items-center h-full">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${val.bg} ${val.color}`}>
                      <val.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-bold text-xl mb-3">{val.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </MagneticCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
