import type { DefaultSession } from "next-auth";

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  display_name?: string;
  bio?: string;
  role: "user" | "admin";
  points: number;
  rank: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  role: "user" | "admin";
  profile: UserProfile;
}

export interface AuthToken {
  sub: string;
  email: string;
  role: "user" | "admin";
  profile: UserProfile;
  iat: number;
  exp: number;
  jti: string;
}

declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User {
    role: "user" | "admin";
    profile: UserProfile;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends AuthToken {}
}
