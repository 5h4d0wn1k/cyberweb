import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const token = await getToken({ req: request });
    if (!token || !token.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("user_achievements")
      .select(
        `
        *,
        achievement:achievements(*)
      `,
      )
      .eq("user_id", token.sub)
      .order("earned_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user achievements" },
      { status: 500 },
    );
  }
}
