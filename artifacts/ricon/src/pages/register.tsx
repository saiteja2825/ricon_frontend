import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateStudent } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

import { FadeUp } from "@/components/ui/page-transition";
import { CheckCircle2, ChevronRight, User, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  college: z.string().min(2, "College name is required."),
  degree: z.string().min(2, "Branch is required."),
  graduationYear: z.coerce.number().min(2000, "Invalid year").max(2100, "Invalid year"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Register() {
  const [, setLocation] = useLocation();
  const createStudent = useCreateStudent();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      college: "",
      degree: "",
      graduationYear: new Date().getFullYear() + 4,
    },
    mode: "onTouched",
  });

  function onSubmit(values: FormValues) {
    createStudent.mutate(
      {
        data: {
          ...values,
          role: "student",
        },
      },
      {
        onSuccess: () => {
          toast.success("Welcome to RiconTech!", {
            description: "Your account has been created successfully.",
            icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          });
          setTimeout(() => setLocation("/"), 1500);
        },
        onError: () => {
          toast.error("Registration Failed", {
            description: "There was an error creating your account. Please try again.",
          });
        },
      }
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">

      
      <FadeUp className="w-full max-w-xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-xl mb-6 shadow-primary/20">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            Create your account
          </h1>
          <p className="text-muted-foreground text-lg max-w-sm mx-auto">
            Join RiconTech and accelerate your engineering career today.
          </p>
        </div>

        <div className="relative rounded-3xl border border-border/60 bg-card/60 glass-strong shadow-2xl p-6 md:p-10 overflow-hidden">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><User className="h-4 w-4 text-primary" /> Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" className="h-12 bg-background/50 border-border/60 rounded-xl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" className="h-12 bg-background/50 border-border/60 rounded-xl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+91 9876543210" className="h-12 bg-background/50 border-border/60 rounded-xl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="college"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-primary" /> College Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. IIT Bombay" className="h-12 bg-background/50 border-border/60 rounded-xl" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-primary" /> Branch</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Computer Science" className="h-12 bg-background/50 border-border/60 rounded-xl" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="graduationYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Graduation Year</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="2026" className="h-12 bg-background/50 border-border/60 rounded-xl" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-14 text-base font-semibold rounded-xl mt-4 btn-gradient shadow-lg group flex items-center justify-center gap-2"
                disabled={createStudent.isPending}
              >
                {createStudent.isPending ? "Creating Account..." : "Create Account"}
                {!createStudent.isPending && <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />}
              </Button>
            </form>
          </Form>
        </div>
      </FadeUp>
    </div>
  );
}
