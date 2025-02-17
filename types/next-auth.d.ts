import 'next-auth';
import type { Tables } from '@/lib/supabase';

declare module 'next-auth' {
  interface User {
    role: string;
    profile: Tables['users_profiles']['Row'];
  }

  interface Session {
    user: User & {
      role: string;
      profile: Tables['users_profiles']['Row'];
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string;
    profile: Tables['users_profiles']['Row'];
  }
}