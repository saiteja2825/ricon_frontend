import { useGetCourse, getGetCourseQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Clock, Users, ArrowLeft, CheckCircle2, IndianRupee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const courseId = parseInt(id || "0", 10);
  const { toast } = useToast();

  const { data: course, isLoading } = useGetCourse(courseId, { 
    query: { 
      enabled: !!courseId,
      queryKey: getGetCourseQueryKey(courseId)
    }
  });

  const handleEnroll = () => {
    toast({
      title: "Enrollment Successful",
      description: `You have successfully enrolled in ${course?.title}`,
    });
  };

  if (isLoading) {
    return (
      <div className="container py-10 px-4 md:px-8 max-w-4xl mx-auto">
        <Skeleton className="h-8 w-24 mb-6" />
        <div className="space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <div className="flex gap-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-[400px] w-full rounded-xl" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
        <p className="text-muted-foreground mb-6">The course you are looking for does not exist or has been removed.</p>
        <Link href="/courses">
          <Button>Browse All Courses</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-10 px-4 md:px-8 max-w-5xl mx-auto">
      <Link href="/courses" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Courses
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                {course.category}
              </Badge>
              <Badge variant="outline" className="capitalize">{course.level}</Badge>
              <Badge variant={course.status === "ongoing" ? "default" : "secondary"}>
                {course.status}
              </Badge>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">{course.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {course.description}
            </p>
          </div>

          {course.imageUrl && (
            <div className="rounded-xl overflow-hidden aspect-video bg-muted border shadow-sm">
              <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">What you'll learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Industry-standard best practices and patterns",
                "Real-world project implementation",
                "Advanced techniques used by senior engineers",
                "Interview preparation and portfolio building"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-6">
            <div className="text-3xl font-bold">
              {course.price === 0 ? "Free" : (
                <div className="flex items-center">
                  <IndianRupee className="h-6 w-6 mr-1 text-muted-foreground" />
                  {course.price.toLocaleString()}
                </div>
              )}
            </div>
            
            <Button size="lg" className="w-full text-base h-12" onClick={handleEnroll}>
              Enroll Now
            </Button>
            <p className="text-xs text-center text-muted-foreground">30-day money-back guarantee</p>
            
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Duration</span>
                </div>
                <span className="font-medium">{course.duration}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>Level</span>
                </div>
                <span className="font-medium capitalize">{course.level}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Enrolled</span>
                </div>
                <span className="font-medium">{course.enrollmentCount} students</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
