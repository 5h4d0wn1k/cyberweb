import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { getSupabaseServiceClient } from "@/lib/utils/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: { challengeId: string } },
) {
  try {
    const token = await getToken({ req: request });
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const supabase = getSupabaseServiceClient();

    // Fetch challenge with module and course info
    const { data: challenge, error: challengeError } = await supabase
      .from("challenges")
      .select(
        `
        *,
        module:modules (
          *,
          course:courses (
            id,
            title,
            slug
          )
        )
      `,
      )
      .eq("id", params.challengeId)
      .single();

    if (challengeError) throw challengeError;
    if (!challenge) {
      return new NextResponse("Challenge not found", { status: 404 });
    }

    // Fetch user progress for this challenge
    const { data: progress, error: progressError } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", token.sub)
      .eq("challenge_id", params.challengeId)
      .single();

    if (progressError && progressError.code !== "PGRST116") {
      throw progressError;
    }

    return NextResponse.json({
      ...challenge,
      progress: progress || {
        completed: false,
        attempts: 0,
      },
    });
  } catch (error) {
    console.error("[CHALLENGE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
