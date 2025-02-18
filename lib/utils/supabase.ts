import { createClient } from "@supabase/supabase-js";

function validateEnvVars() {
  const requiredVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  } as const;

  const missingVars = Object.entries(requiredVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`,
    );
  }

  return requiredVars as Record<keyof typeof requiredVars, string>;
}

export function getSupabaseClient() {
  const vars = validateEnvVars();
  return createClient(
    vars.NEXT_PUBLIC_SUPABASE_URL,
    vars.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
      },
    },
  );
}

export function getSupabaseServiceClient() {
  const vars = validateEnvVars();
  return createClient(
    vars.NEXT_PUBLIC_SUPABASE_URL,
    vars.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
