import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getSupabaseServiceClient } from "@/lib/utils/supabase";
import { z } from "zod";

const submitSchema = z.object({
  flag: z.string().min(1),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { challengeId: string } },
) {
  try {
    const token = await getToken({ req: request });
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { flag } = submitSchema.parse(body);
    const supabase = getSupabaseServiceClient();

    // Check if the challenge exists and get its details
    const { data: challenge, error: challengeError } = await supabase
      .from("challenges")
      .select("*")
      .eq("id", params.challengeId)
      .single();

    if (challengeError || !challenge) {
      return new NextResponse(
        JSON.stringify({ error: "Challenge not found" }),
        { status: 404 },
      );
    }

    // Check if the flag is correct using our database function
    const { data: result, error: checkError } = await supabase.rpc(
      "check_challenge_submission",
      {
        challenge_id: params.challengeId,
        submission_text: flag,
      },
    );

    if (checkError) throw checkError;

    // Record the submission
    const { error: submissionError } = await supabase
      .from("submissions")
      .insert({
        user_id: token.sub,
        challenge_id: params.challengeId,
        submission: flag,
        is_correct: result,
      });

    if (submissionError) throw submissionError;

    // If the submission is correct and the user hasn't completed this challenge before,
    // update their progress
    if (result) {
      const { error: progressError } = await supabase
        .from("user_progress")
        .upsert(
          {
            user_id: token.sub,
            challenge_id: params.challengeId,
            completed_at: new Date().toISOString(),
            attempts: 1,
          },
          {
            onConflict: "user_id,challenge_id",
            ignoreDuplicates: false,
          },
        );

      if (progressError) throw progressError;
    } else {
      // If incorrect, increment the attempts counter
      const { error: updateError } = await supabase.rpc(
        "increment_challenge_attempts",
        {
          p_user_id: token.sub,
          p_challenge_id: params.challengeId,
        },
      );

      if (updateError) throw updateError;
    }

    return NextResponse.json({ isCorrect: result });
  } catch (error) {
    console.error("Error processing submission:", error);
    if (error instanceof z.ZodError) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid submission data" }),
        { status: 400 },
      );
    }
    return new NextResponse(
      JSON.stringify({ error: "Failed to process submission" }),
      { status: 500 },
    );
  }
}
