import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import type { Tables } from '@/lib/supabase';
import { z } from 'zod';

// Validation schemas
const emailSchema = z.string().email('Invalid email address');
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    'Password must contain uppercase, lowercase, number, and special character'
  );
const usernameSchema = z
  .string()
  .min(3, 'Username must be at least 3 characters')
  .max(20, 'Username must be at most 20 characters')
  .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens');

interface SignUpResponse {
  user: User | null;
  error: Error | null;
}

export async function signUp(email: string, password: string, username: string): Promise<SignUpResponse> {
  try {
    // Validate input
    emailSchema.parse(email);
    passwordSchema.parse(password);
    usernameSchema.parse(username);

    // Check if username is taken
    const { data: existingUser } = await supabase
      .from('users_profiles')
      .select('username')
      .eq('username', username)
      .single();

    if (existingUser) {
      throw new Error('Username is already taken');
    }

    // Sign up user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('No user returned from sign up');

    // Create user profile
    const { error: profileError } = await supabase
      .from('users_profiles')
      .insert({
        id: authData.user.id,
        username,
        email,
        points: 0,
        rank: 'Newbie',
      });

    if (profileError) throw profileError;

    return { user: authData.user, error: null };
  } catch (error) {
    console.error('Sign up error:', error);
    return { user: null, error: error instanceof Error ? error : new Error('An unknown error occurred') };
  }
}

export async function signIn(email: string, password: string) {
  try {
    emailSchema.parse(email);
    passwordSchema.parse(password);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Get user profile
    if (data.user) {
      const { data: profile, error: profileError } = await supabase
        .from('users_profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) throw profileError;
      if (!profile) throw new Error('Profile not found');

      // Update last login timestamp
      await supabase
        .from('users_profiles')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', data.user.id);

      return {
        ...data,
        profile,
      };
    }

    return data;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error instanceof Error ? error : new Error('An unknown error occurred');
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Sign out error:', error);
    throw error instanceof Error ? error : new Error('An unknown error occurred');
  }
}

export async function getCurrentUser() {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session?.user) return null;

    const { data: profile, error: profileError } = await supabase
      .from('users_profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (profileError) throw profileError;
    if (!profile) return null;

    return {
      ...session.user,
      profile,
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

export async function resetPassword(email: string) {
  try {
    emailSchema.parse(email);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
    });

    if (error) throw error;
  } catch (error) {
    console.error('Reset password error:', error);
    throw error instanceof Error ? error : new Error('An unknown error occurred');
  }
}

export async function updateUserProfile(userId: string, updates: Partial<Tables['users_profiles']['Update']>) {
  try {
    if (updates.username) {
      usernameSchema.parse(updates.username);
      
      // Check if username is taken
      const { data: existing } = await supabase
        .from('users_profiles')
        .select('id')
        .eq('username', updates.username)
        .neq('id', userId)
        .single();

      if (existing) {
        throw new Error('Username is already taken');
      }
    }

    const { data, error } = await supabase
      .from('users_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Profile update failed');

    return data;
  } catch (error) {
    console.error('Update user profile error:', error);
    throw error instanceof Error ? error : new Error('An unknown error occurred');
  }
}