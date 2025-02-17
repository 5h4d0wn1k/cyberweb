"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, Award } from "lucide-react";

interface UserStats {
  points: number;
  rank: string;
  completionPercentage: number;
}

export function UserProgress() {
  const [stats, setStats] = useState<UserStats>({
    points: 0,
    rank: "Beginner",
    completionPercentage: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/education/stats");
        if (!response.ok) throw new Error("Failed to fetch stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Trophy className="h-5 w-5" />
        <div className="font-semibold">Points: {stats.points}</div>
      </div>

      <div className="flex items-center space-x-2">
        <Award className="h-5 w-5" />
        <div className="font-semibold">Rank: {stats.rank}</div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <div className="text-sm font-medium">Overall Progress</div>
            </div>
            <span className="text-sm font-medium">
              {Math.round(stats.completionPercentage)}%
            </span>
          </div>
          <Progress value={stats.completionPercentage} className="h-2" />
        </CardContent>
      </Card>
    </div>
  );
}
