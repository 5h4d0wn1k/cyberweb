"use client";

import { useEffect, useState } from "react";
import {
  Shield,
  Lock,
  Code,
  Terminal,
  Target,
  Award,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { api } from "@/lib/api-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Course } from "@/types/education";

export default function EducationPage() {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await api.education.courses.list(true);
        setCourses(coursesData);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const calculateOverallProgress = () => {
    if (!courses.length) return 0;
    const totalProgress = courses.reduce((acc, course) => {
      const completedChallenges =
        course.modules?.reduce(
          (sum, module) =>
            sum +
            (module.userProgress?.completed ? module.challenges.length : 0),
          0,
        ) || 0;
      const totalChallenges =
        course.modules?.reduce(
          (sum, module) => sum + module.challenges.length,
          0,
        ) || 0;
      const percentage =
        totalChallenges > 0 ? (completedChallenges / totalChallenges) * 100 : 0;
      return acc + percentage;
    }, 0);
    return Math.round(totalProgress / courses.length);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold gradient-text">
              {session?.user?.profile?.points || 0}
            </h3>
            <p className="text-muted-foreground">Total Points</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold gradient-text">
              {session?.user?.profile?.rank || "Beginner"}
            </h3>
            <p className="text-muted-foreground">Current Rank</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold gradient-text">
              {calculateOverallProgress()}%
            </h3>
            <p className="text-muted-foreground">Course Completion</p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Learning Paths</h2>
        <Tabs defaultValue="offensive" className="space-y-8">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 gap-4">
            <TabsTrigger
              value="offensive"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Shield className="mr-2 h-4 w-4" />
              Offensive Security
            </TabsTrigger>
            <TabsTrigger
              value="defensive"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Lock className="mr-2 h-4 w-4" />
              Defensive Security
            </TabsTrigger>
            <TabsTrigger
              value="web3"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Code className="mr-2 h-4 w-4" />
              Web3 Security
            </TabsTrigger>
          </TabsList>

          {["offensive", "defensive", "web3"].map((category) => (
            <TabsContent key={category} value={category} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {courses
                  .filter((course) => course.category === category)
                  .map((course) => (
                    <Card key={course.id} className="card-hover">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Terminal className="h-5 w-5 mr-2 text-primary" />
                          {course.title}
                        </CardTitle>
                        <Progress
                          value={calculateOverallProgress()}
                          className="h-2"
                        />
                        <CardDescription>
                          {calculateOverallProgress()}% Complete
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          {course.description}
                        </p>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href={`/education/courses/${course.id}`}>
                            {course.modules?.some(
                              (m) => m.userProgress?.completed,
                            )
                              ? "Continue"
                              : "Start Path"}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="glass-effect rounded-xl p-8">
          <Terminal className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Interactive Labs</h3>
          <p className="text-muted-foreground">
            Practice in real-world environments with our browser-based virtual
            labs
          </p>
        </div>

        <div className="glass-effect rounded-xl p-8">
          <Target className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Guided Challenges</h3>
          <p className="text-muted-foreground">
            Progress through increasingly difficult challenges to test your
            skills
          </p>
        </div>

        <div className="glass-effect rounded-xl p-8">
          <Award className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Certifications</h3>
          <p className="text-muted-foreground">
            Earn industry-recognized certifications as you complete learning
            paths
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="glass-effect rounded-2xl p-12 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 gradient-text">
          Ready to Start Your Security Journey?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of security professionals and begin your learning
          journey today
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg" asChild>
            <Link href="/auth/register">
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="text-lg" asChild>
            <Link href="/pricing">View Enterprise Plans</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
