import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { FadeUp } from "@/components/ui/page-transition";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <FadeUp className="relative z-10 w-full max-w-lg mx-4 text-center">
        <div className="mb-8 relative inline-block">
          <div className="text-[150px] font-extrabold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary/80 to-accent/40 opacity-20 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-20 w-20 rounded-3xl bg-background border border-border/50 shadow-xl flex items-center justify-center rotate-12">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Page not found
        </h1>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto rounded-xl border-border/60"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto rounded-xl btn-gradient shadow-md">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </FadeUp>
    </div>
  );
}
