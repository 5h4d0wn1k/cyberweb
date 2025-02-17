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
      .eq("user_id", token.sub)
      .order("completed_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user progress" },
      { status: 500 },
    );
  }
}
