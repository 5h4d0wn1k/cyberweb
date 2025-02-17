/*
  # Initial Database Schema

  1. New Tables
    - users_profiles: Extended user profile information
    - courses: Training courses/learning paths
    - modules: Course modules
    - challenges: Security challenges within modules
    - user_progress: Track user progress through challenges
    - submissions: Challenge submission history
    - achievements: User achievements/badges
    - user_achievements: Track earned achievements

  2. Security
    - Enable RLS on all tables
    - Add policies for user data protection
    - Set up secure submission checking

  3. Functions
    - Challenge submission verification
    - User points calculation
    - Achievement tracking
*/

-- Users Profile Extension
CREATE TABLE public.users_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  bio TEXT,
  points INTEGER DEFAULT 0,
  rank TEXT DEFAULT 'Newbie',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Courses/Learning Paths
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  points INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Course Modules
CREATE TABLE public.modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Challenges
CREATE TABLE public.challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES public.modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  points INTEGER DEFAULT 0,
  flag TEXT NOT NULL,
  hints TEXT[] DEFAULT '{}',
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User Progress
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users_profiles(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ DEFAULT now(),
  attempts INTEGER DEFAULT 0,
  UNIQUE(user_id, challenge_id)
);

-- Challenge Submissions
CREATE TABLE public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users_profiles(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
  submission TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Achievements
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- User Achievements
CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users_profiles(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- User Sessions
CREATE TABLE public.user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users_profiles(id) ON DELETE CASCADE,
  session_token TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL
);

-- Notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users_profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.users_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON public.users_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.users_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Published courses are readable by all authenticated users
CREATE POLICY "Anyone can read published courses"
  ON public.courses
  FOR SELECT
  TO authenticated
  USING (is_published = true);

-- Modules of published courses are readable
CREATE POLICY "Anyone can read modules of published courses"
  ON public.modules
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.courses 
      WHERE public.courses.id = public.modules.course_id 
      AND public.courses.is_published = true
    )
  );

-- Challenges of published courses are readable
CREATE POLICY "Anyone can read challenges"
  ON public.challenges
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.modules 
      JOIN public.courses ON public.courses.id = public.modules.course_id
      WHERE public.modules.id = public.challenges.module_id 
      AND public.courses.is_published = true
    )
  );

-- Users can read their own progress
CREATE POLICY "Users can read own progress"
  ON public.user_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can create their own progress
CREATE POLICY "Users can create own progress"
  ON public.user_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can read their own submissions
CREATE POLICY "Users can read own submissions"
  ON public.submissions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can create their own submissions
CREATE POLICY "Users can create submissions"
  ON public.submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Achievements are readable by all authenticated users
CREATE POLICY "Anyone can read achievements"
  ON public.achievements
  FOR SELECT
  TO authenticated
  USING (true);

-- Users can read their own achievements
CREATE POLICY "Users can read own achievements"
  ON public.user_achievements
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can read their own sessions
CREATE POLICY "Users can read own sessions"
  ON public.user_sessions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can create their own sessions
CREATE POLICY "Users can create own sessions"
  ON public.user_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can read their own notifications
CREATE POLICY "Users can read own notifications"
  ON public.notifications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can create their own notifications
CREATE POLICY "Users can create notifications"
  ON public.notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create functions

-- Function to check challenge submission
CREATE OR REPLACE FUNCTION check_challenge_submission(
  challenge_id UUID,
  submission_text TEXT
) RETURNS BOOLEAN AS $$
DECLARE
  correct_flag TEXT;
BEGIN
  -- Get the correct flag
  SELECT flag INTO correct_flag
  FROM public.challenges
  WHERE id = challenge_id;
  
  -- Compare submission with flag
  RETURN submission_text = correct_flag;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update user points
CREATE OR REPLACE FUNCTION update_user_points() RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_correct THEN
    UPDATE public.users_profiles
    SET points = points + (
      SELECT points 
      FROM public.challenges 
      WHERE id = NEW.challenge_id
    )
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for updating points
CREATE TRIGGER update_points_on_correct_submission
  AFTER INSERT ON public.submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_user_points();