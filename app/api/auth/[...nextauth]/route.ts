import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing credentials");
          }

          // Validate credentials
          const validatedCredentials = loginSchema.parse(credentials);

          // Sign in with Supabase Auth
          const { data: authData, error: authError } =
            await supabase.auth.signInWithPassword({
              email: validatedCredentials.email,
              password: validatedCredentials.password,
            });

          if (authError) throw authError;
          if (!authData.user) throw new Error("No user returned");

          // Get user profile
          const { data: profile, error: profileError } = await supabase
            .from("users_profiles")
            .select("*")
            .eq("id", authData.user.id)
            .maybeSingle();

          if (profileError) throw profileError;
          if (!profile) {
            // Create profile if it doesn't exist
            const { data: newProfile, error: createError } = await supabase
              .from("users_profiles")
              .insert({
                id: authData.user.id,
                email: authData.user.email,
                username: authData.user.email?.split("@")[0],
                role: "user",
                points: 0,
                rank: "Beginner",
              })
              .select()
              .single();

            if (createError) throw createError;
            if (!newProfile) throw new Error("Failed to create profile");

            return {
              id: authData.user.id,
              email: authData.user.email,
              name: newProfile.username,
              role: newProfile.role,
              profile: newProfile,
            };
          }

          return {
            id: authData.user.id,
            email: authData.user.email,
            name: profile.username,
            role: profile.role,
            profile,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.profile = user.profile;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.profile = token.profile;
      }
      return session;
    },
  },
  events: {
    async signOut({ token }) {
      if (token) {
        await supabase.auth.signOut();
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
