import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { getSupabaseClient } from "@/lib/utils/supabase";
import { z } from "zod";

const courseSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  category: z.string(),
  points: z.number().optional(),
  is_published: z.boolean().optional(),
});

type ModuleWithChallenges = {
  id: string;
  challenges?: { id: string }[];
};

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ req: request });
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const supabase = getSupabaseClient();
    const searchParams = request.nextUrl.searchParams;
    const publishedOnly = searchParams.get("published") === "true";

    // Fetch courses
    let query = supabase.from("courses").select(`
        *,
        modules:modules (
          id,
          challenges:challenges (
            id
          )
        )
      `);

    if (publishedOnly) {
      query = query.eq("is_published", true);
    }

    const { data: courses, error: coursesError } = await query;

    if (coursesError) throw coursesError;

    // Fetch user progress for each course
    const { data: progress, error: progressError } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", token.sub);

    if (progressError) throw progressError;

    // Calculate progress for each course
    const coursesWithProgress = courses.map((course) => {
      const totalChallenges =
        course.modules?.reduce(
          (acc: number, module: ModuleWithChallenges) =>
            acc + (module.challenges?.length || 0),
          0,
        ) || 0;

      const completedChallenges = progress.filter((p) =>
        course.modules?.some((m: ModuleWithChallenges) =>
          m.challenges?.some((c) => c.id === p.challenge_id),
        ),
      ).length;

      const progressPercentage =
        totalChallenges > 0
          ? Math.round((completedChallenges / totalChallenges) * 100)
          : 0;

      return {
        ...course,
        progress: progressPercentage,
        moduleCount: course.modules?.length || 0,
        completedModules:
          course.modules?.filter((m: ModuleWithChallenges) =>
            m.challenges?.every((c: { id: string }) =>
              progress.some((p) => p.challenge_id === c.id),
            ),
          ).length || 0,
      };
    });

    return NextResponse.json(coursesWithProgress);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch courses" }),
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const validatedData = courseSchema.parse(body);

    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("courses")
      .insert(validatedData)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 },
    );
  }
}
