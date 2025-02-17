import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { withAuth } from "@/lib/api-middleware";
import { getSupabaseServiceClient } from "@/lib/utils/supabase";
import type { SubmissionResponse } from "@/types/education";
import type { AuthToken } from "@/types/auth";

const submitSchema = z.object({
  challengeId: z.string().uuid(),
  flag: z.string().min(1),
});

async function handler(
  req: NextRequest,
  { token }: { token: AuthToken },
): Promise<NextResponse<SubmissionResponse>> {
  try {
    const json = await req.json();
    const body = submitSchema.parse(json);
    const supabase = getSupabaseServiceClient();

    // Check if challenge exists and is published
    const { data: challenge, error: challengeError } = await supabase
      .from("challenges")
      .select("*")
      .eq("id", body.challengeId)
      .eq("published", true)
      .single();

    if (challengeError) throw challengeError;
    if (!challenge) {
      return new NextResponse(
        JSON.stringify({ error: "Challenge not found or not published" }),
        { status: 404 },
      );
    }

    // Submit flag using improved database function
    const { data: result, error: submitError } = await supabase.rpc(
      "check_challenge_submission",
      {
        p_user_id: token.sub,
        p_challenge_id: body.challengeId,
        p_flag: body.flag,
      },
    );

    if (submitError) throw submitError;

    if (result.error) {
      return new NextResponse(
        JSON.stringify({
          error: result.error,
          message: result.message,
        }),
        { status: 500 },
      );
    }

    // Return appropriate response based on submission result
    return NextResponse.json({
      correct: result.correct,
      message: result.message,
      points: result.points || 0,
      firstCompletion: result.firstCompletion || false,
      attempts: result.attempts,
    });
  } catch (error) {
    console.error("Error in submission handler:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to process submission" }),
      { status: 500 },
    );
  }
}

export const POST = withAuth(handler);
