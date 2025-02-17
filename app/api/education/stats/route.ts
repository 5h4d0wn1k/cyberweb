import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getSupabaseServiceClient } from "@/lib/utils/supabase";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const supabase = getSupabaseServiceClient();

    // Get user's total points
    const { data: pointsData, error: pointsError } = await supabase
      .from("users_profiles")
      .select("points")
      .eq("id", token.sub)
      .single();

    if (pointsError) throw pointsError;

    // Calculate completion percentage
    const { data: challengesData, error: challengesError } = await supabase
      .from("challenges")
      .select("id")
      .eq("published", true);

    if (challengesError) throw challengesError;

    const { data: completedData, error: completedError } = await supabase
      .from("user_progress")
      .select("challenge_id")
      .eq("user_id", token.sub)
      .eq("completed", true);

    if (completedError) throw completedError;

    const totalChallenges = challengesData.length;
    const completedChallenges = completedData.length;
    const completionPercentage =
      totalChallenges > 0 ? (completedChallenges / totalChallenges) * 100 : 0;

    // Determine rank based on points
    const points = pointsData?.points || 0;
    let rank = "Beginner";
    if (points >= 1000) rank = "Expert";
    else if (points >= 500) rank = "Advanced";
    else if (points >= 100) rank = "Intermediate";

    return NextResponse.json({
      points,
      rank,
      completionPercentage,
    });
  } catch (error) {
    console.error("[EDUCATION_STATS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
