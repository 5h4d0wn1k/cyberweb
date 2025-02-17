import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

interface Params {
  params: {
    challengeId: string;
  };
}

export async function POST(
  request: NextRequest,
  { params }: Params
): Promise<NextResponse> {
  try {
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { flag } = body;

    if (!flag) {
      return NextResponse.json(
        { error: 'Flag is required' },
        { status: 400 }
      );
    }

    // Check the submission
    const { data: isCorrect } = await supabase
      .rpc('check_challenge_submission', {
        challenge_id: params.challengeId,
        submission_text: flag,
      });

    // Record the submission
    const { error: submissionError } = await supabase
      .from('submissions')
      .insert({
        user_id: token.sub,
        challenge_id: params.challengeId,
        submission: flag,
        is_correct: isCorrect,
      });

    if (submissionError) throw submissionError;

    // If correct, update user progress
    if (isCorrect) {
      const { error: progressError } = await supabase
        .from('user_progress')
        .upsert({
          user_id: token.sub,
          challenge_id: params.challengeId,
          completed_at: new Date().toISOString(),
        });

      if (progressError) throw progressError;
    }

    return NextResponse.json({ isCorrect });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit challenge' },
      { status: 500 }
    );
  }
}