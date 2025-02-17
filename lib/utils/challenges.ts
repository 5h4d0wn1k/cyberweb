import { supabase } from "@/lib/supabase";
import type { TableRow } from "@/lib/supabase";

interface SubmissionResult {
  isCorrect: boolean;
  submission: TableRow<"submissions">;
}

export async function submitChallenge(
  challengeId: string,
  flag: string,
): Promise<SubmissionResult> {
  try {
    const { data: challenge, error: challengeError } = await supabase
      .from("challenges")
      .select("flag, points")
      .eq("id", challengeId)
      .single();

    if (challengeError) throw challengeError;
    if (!challenge) throw new Error("Challenge not found");

    const isCorrect = challenge.flag === flag;
    const { data: user } = await supabase.auth.getUser();

    if (!user.user) throw new Error("User not authenticated");

    const { data: submission, error: submissionError } = await supabase
      .from("submissions")
      .insert({
        challenge_id: challengeId,
        user_id: user.user.id,
        submission: flag,
        is_correct: isCorrect,
      })
      .select()
      .single();

    if (submissionError) throw submissionError;
    if (!submission) throw new Error("Failed to create submission");

    if (isCorrect) {
      const { error: progressError } = await supabase
        .from("user_progress")
        .upsert({
          user_id: user.user.id,
          challenge_id: challengeId,
          completed_at: new Date().toISOString(),
        });

      if (progressError) throw progressError;
    }

    return {
      isCorrect,
      submission,
    };
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Failed to submit challenge");
  }
}

interface ChallengeProgress extends TableRow<"user_progress"> {
  challenge: {
    id: string;
    title: string;
    points: number;
    module: {
      id: string;
      title: string;
      course: {
        id: string;
        title: string;
      };
    };
  };
}

export async function getChallengeProgress(
  userId: string,
): Promise<ChallengeProgress[]> {
  const { data, error } = await supabase
    .from("user_progress")
    .select(
      `
      *,
      challenge:challenges(
        id,
        title,
        points,
        module:modules(
          id,
          title,
          course:courses(
            id,
            title
          )
        )
      )
    `,
    )
    .eq("user_id", userId);

  if (error) throw error;
  if (!data) return [];

  return data as ChallengeProgress[];
}

interface LeaderboardEntry {
  id: string;
  username: string;
  display_name: string | null;
  points: number;
  rank: string;
}

export async function getLeaderboard(limit = 100): Promise<LeaderboardEntry[]> {
  const { data, error } = await supabase
    .from("users_profiles")
    .select("id, username, display_name, points, rank")
    .order("points", { ascending: false })
    .limit(limit);

  if (error) throw error;
  if (!data) return [];

  return data;
}

export async function getCompletedChallenges(
  userId: string,
): Promise<string[]> {
  const { data, error } = await supabase
    .from("user_progress")
    .select("challenge_id")
    .eq("user_id", userId);

  if (error) throw error;
  if (!data) return [];

  return data.map((progress) => progress.challenge_id);
}

export async function getChallengeStats(challengeId: string) {
  const { data, error } = await supabase
    .from("submissions")
    .select("is_correct")
    .eq("challenge_id", challengeId);

  if (error) throw error;
  if (!data) return { totalAttempts: 0, successRate: 0 };

  const totalAttempts = data.length;
  const successfulAttempts = data.filter((s) => s.is_correct).length;
  const successRate =
    totalAttempts > 0 ? (successfulAttempts / totalAttempts) * 100 : 0;

  return {
    totalAttempts,
    successRate: Math.round(successRate * 100) / 100,
  };
}
