import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServiceClient } from "@/lib/utils/supabase";
import { z } from "zod";

const registerSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_\-]+$/),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, lowercase letter, number, and special character",
    ),
});

export async function POST(req: NextRequest) {
  try {
    // Verify environment variables are available
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase environment variables:", {
        url: !!supabaseUrl,
        serviceKey: !!supabaseServiceKey,
      });
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    const body = await req.json();
    const { username, email, password } = registerSchema.parse(body);

    const supabase = getSupabaseServiceClient();

    // Check if username already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("users_profiles")
      .select("username")
      .eq("username", username)
      .single();

    if (checkError) {
      console.error("Error checking existing user:", checkError);
      return NextResponse.json(
        { error: "Error checking username availability" },
        { status: 500 },
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 400 },
      );
    }

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${req.nextUrl.origin}/auth/callback`,
        data: { username },
      },
    });

    if (authError) {
      console.error("Auth error:", authError);
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: "No user returned from signup" },
        { status: 400 },
      );
    }

    // Create user profile
    const { error: profileError } = await supabase
      .from("users_profiles")
      .insert([
        {
          id: authData.user.id,
          username,
          email,
          role: "user",
          display_name: username,
          points: 0,
          rank: "Beginner",
        },
      ]);

    if (profileError) {
      console.error("Profile creation error:", profileError);
      return NextResponse.json(
        { error: profileError.message },
        { status: 400 },
      );
    }

    return NextResponse.json({
      message: "Account created successfully",
    });
  } catch (error) {
    console.error("Registration failed:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create account",
      },
      { status: 400 },
    );
  }
}
