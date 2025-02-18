"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Flag,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Target,
  Award,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import type { Tables } from "@/lib/supabase";

type ChallengeWithDetails = Tables["challenges"]["Row"] & {
  module: Tables["modules"]["Row"] & {
    course: Tables["courses"]["Row"];
  };
  userProgress?: {
    completed: boolean;
    attempts: number;
  };
};

export default function ChallengePage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [challenge, setChallenge] = useState<ChallengeWithDetails | null>(null);
  const [flag, setFlag] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await fetch(`/api/challenges/${params.challengeId}`);
        if (!response.ok) throw new Error("Failed to fetch challenge");
        const data = await response.json();
        setChallenge(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load challenge",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [params.challengeId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const result = await api.education.challenges.submit(
        params.challengeId as string,
        flag,
      );

      if (result.correct) {
        setSuccess(true);
        toast({
          title: "Congratulations!",
          description: "You've successfully completed this challenge!",
        });
      } else {
        setError("Incorrect flag. Try again!");
        toast({
          variant: "destructive",
          title: "Incorrect flag",
          description: "The submitted flag is not correct. Please try again.",
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit flag");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit flag. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto py-8">Loading challenge...</div>;
  }

  if (error && !challenge) {
    return <div className="container mx-auto py-8">Error: {error}</div>;
  }

  if (!challenge) {
    return <div className="container mx-auto py-8">Challenge not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() =>
          router.push(`/education/courses/${challenge.module.course.id}`)
        }
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Course
      </Button>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{challenge.title}</CardTitle>
                  <CardDescription>
                    Module: {challenge.module.title}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>{challenge.points} Points</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <div
                  dangerouslySetInnerHTML={{ __html: challenge.description }}
                />
              </div>

              <Separator className="my-6" />

              {success ? (
                <Alert className="bg-green-500/15">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Challenge Completed!</AlertTitle>
                  <AlertDescription>
                    Congratulations! You've successfully solved this challenge.
                  </AlertDescription>
                </Alert>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex gap-4">
                    <Input
                      type="text"
                      placeholder="Enter flag here..."
                      value={flag}
                      onChange={(e) => setFlag(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" disabled={submitting}>
                      <Flag className="mr-2 h-4 w-4" />
                      {submitting ? "Submitting..." : "Submit Flag"}
                    </Button>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Challenge Info</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-muted-foreground">Difficulty</dt>
                  <dd className="text-lg font-medium">
                    {challenge.difficulty}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Points</dt>
                  <dd className="text-lg font-medium">{challenge.points}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Attempts</dt>
                  <dd className="text-lg font-medium">
                    {challenge.userProgress?.attempts || 0}
                  </dd>
                </div>
                {challenge.hints && challenge.hints.length > 0 && (
                  <div>
                    <dt className="text-sm text-muted-foreground mb-2">
                      Hints
                    </dt>
                    <dd>
                      <ul className="list-disc pl-4 space-y-2">
                        {challenge.hints.map((hint) => (
                          <li
                            key={`hint-${challenge.id}-${hint.substring(0, 32)}`}
                            className="text-sm"
                          >
                            {hint}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>

          {success && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-primary" />
                  Completion Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Target className="h-4 w-4 mr-2 text-primary" />
                    {challenge.points} Points Earned
                  </li>
                  {/* Add more rewards here */}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
