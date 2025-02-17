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
    const { searchParams } = new URL(req.url);
    const published = searchParams.get("published") === "true";

    // Fetch courses with their modules and challenges
    const { data: courses, error: coursesError } = await supabase
      .from("courses")
      .select(
        `
        *,
        modules:modules (
          *,
          challenges:challenges (
            id,
            title,
            points,
            difficulty
          )
        )
      `,
      )
      .eq("published", published)
      .order("created_at", { ascending: true });

    if (coursesError) throw coursesError;

    // Fetch user progress for all challenges
    const { data: progress, error: progressError } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", token.sub);

    if (progressError) throw progressError;

    // Calculate progress for each course
    const coursesWithProgress = courses.map((course) => {
      const challenges = course.modules.flatMap(
        (module: { challenges: { id: string }[] }) => module.challenges,
      );
      const totalChallenges = challenges.length;
      const completedChallenges = progress.filter((p) =>
        challenges.some((c) => c.id === p.challenge_id && p.completed),
      ).length;

      return {
        ...course,
        progress: {
          completed: completedChallenges,
          total: totalChallenges,
          percentage:
            totalChallenges > 0
              ? (completedChallenges / totalChallenges) * 100
              : 0,
        },
      };
    });

    return NextResponse.json(coursesWithProgress);
  } catch (error) {
    console.error("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
