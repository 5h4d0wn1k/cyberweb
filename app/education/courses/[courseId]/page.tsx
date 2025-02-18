"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Lock, CheckCircle } from "lucide-react";

type CourseWithProgress = {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: string;
  category: string;
  points: number;
  image_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  modules: Array<{
    id: string;
    title: string;
    description: string;
    order_index: number;
    points: number;
    challenges: Array<{
      id: string;
      title: string;
      difficulty: string;
      points: number;
    }>;
    userProgress?: {
      completed: boolean;
      attempts: number;
    };
  }>;
};

export default function CoursePage() {
  const params = useParams();
  const [course, setCourse] = useState<CourseWithProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseData = await api.education.courses.get(
          params.courseId as string,
        );
        setCourse(courseData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [params.courseId]);

  if (loading) {
    return <div>Loading course...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  const calculateModuleProgress = (
    module: CourseWithProgress["modules"][0],
  ) => {
    if (!module.challenges?.length) return 0;
    const completedChallenges = module.challenges.filter((_challenge) => {
      return module.userProgress?.completed;
    }).length;
    return (completedChallenges / module.challenges.length) * 100;
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <p className="text-muted-foreground">{course.description}</p>
      </div>

      <div className="grid gap-6">
        {course.modules?.map((module) => (
          <Card key={module.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{module.title}</span>
                <Progress
                  value={calculateModuleProgress(module)}
                  className="w-32 h-2"
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">{module.description}</p>

              <div className="grid gap-4">
                {module.challenges?.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      {module.userProgress?.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      )}
                      <div>
                        <h3 className="font-medium">{challenge.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Points: {challenge.points} • Difficulty:{" "}
                          {challenge.difficulty}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={
                        module.userProgress?.completed ? "outline" : "default"
                      }
                      size="sm"
                      asChild
                    >
                      <a href={`/education/challenges/${challenge.id}`}>
                        {module.userProgress?.completed ? "Review" : "Start"}
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
