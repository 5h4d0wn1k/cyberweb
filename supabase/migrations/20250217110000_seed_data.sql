-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Core Tables
CREATE TABLE IF NOT EXISTS public.users_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    display_name TEXT,
    bio TEXT,
    points INTEGER DEFAULT 0,
    rank TEXT DEFAULT 'Beginner',
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    difficulty TEXT CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
    category TEXT NOT NULL,
    image_url TEXT,
    points INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    order_index INTEGER NOT NULL,
    points INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID REFERENCES public.modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    difficulty TEXT CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
    points INTEGER DEFAULT 0,
    flag TEXT NOT NULL,
    hints TEXT[] DEFAULT '{}',
    order_index INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users_profiles(id) ON DELETE CASCADE,
    challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
    completed_at TIMESTAMPTZ DEFAULT now(),
    attempts INTEGER DEFAULT 0,
    UNIQUE(user_id, challenge_id)
);

CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users_profiles(id) ON DELETE CASCADE,
    challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
    submission TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    points INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users_profiles(id) ON DELETE CASCADE,
    achievement_id UUID REFERENCES public.achievements(id) ON DELETE CASCADE,
    earned_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, achievement_id)
);

CREATE TABLE IF NOT EXISTS public.discussion_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users_profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users_profiles(id) ON DELETE CASCADE,
    session_token TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    expires_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users_profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Functions
CREATE OR REPLACE FUNCTION public.check_challenge_submission(
    challenge_id UUID,
    submission_text TEXT
) RETURNS BOOLEAN AS $$
DECLARE
    correct_flag TEXT;
BEGIN
    -- Input validation
    IF challenge_id IS NULL THEN
        RAISE EXCEPTION 'challenge_id cannot be null';
    END IF;
    
    IF submission_text IS NULL THEN
        RAISE EXCEPTION 'submission_text cannot be null';
    END IF;

    -- Get the correct flag
    SELECT flag INTO correct_flag
    FROM public.challenges
    WHERE id = challenge_id;
    
    IF correct_flag IS NULL THEN
        RAISE EXCEPTION 'Challenge not found';
    END IF;
    
    RETURN submission_text = correct_flag;
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Error in check_challenge_submission: %', SQLERRM;
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.update_user_points() 
RETURNS TRIGGER AS $$
BEGIN
    IF NEW IS NULL THEN
        RAISE EXCEPTION 'NEW record cannot be null';
    END IF;

    IF NEW.is_correct THEN
        UPDATE public.users_profiles
        SET 
            points = points + COALESCE((
                SELECT points 
                FROM public.challenges 
                WHERE id = NEW.challenge_id
            ), 0),
            updated_at = now()
        WHERE id = NEW.user_id;
    END IF;
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Error in update_user_points: %', SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.check_achievement_eligibility() 
RETURNS TRIGGER AS $$
DECLARE
    user_points INTEGER;
    achievement_record RECORD;
BEGIN
    -- Input validation
    IF NEW.user_id IS NULL THEN
        RAISE EXCEPTION 'user_id cannot be null';
    END IF;

    -- Get user's current points
    SELECT points INTO user_points
    FROM public.users_profiles
    WHERE id = NEW.user_id;

    IF user_points IS NULL THEN
        RAISE EXCEPTION 'User not found';
    END IF;

    -- Award achievements based on points
    FOR achievement_record IN
        SELECT id, points
        FROM public.achievements
        WHERE points <= user_points
        AND NOT EXISTS (
            SELECT 1 FROM public.user_achievements
            WHERE user_id = NEW.user_id
            AND achievement_id = achievements.id
        )
    LOOP
        INSERT INTO public.user_achievements (user_id, achievement_id)
        VALUES (NEW.user_id, achievement_record.id);
    END LOOP;

    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Error in check_achievement_eligibility: %', SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.increment_challenge_attempts(
    p_user_id UUID,
    p_challenge_id UUID
) RETURNS void AS $$
BEGIN
    INSERT INTO public.user_progress (user_id, challenge_id, attempts)
    VALUES (p_user_id, p_challenge_id, 1)
    ON CONFLICT (user_id, challenge_id)
    DO UPDATE SET 
        attempts = public.user_progress.attempts + 1,
        updated_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers
CREATE TRIGGER update_points_on_correct_submission
    AFTER INSERT ON public.submissions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_user_points();

CREATE TRIGGER check_achievements_on_progress
    AFTER INSERT ON public.user_progress
    FOR EACH ROW
    EXECUTE FUNCTION public.check_achievement_eligibility();

CREATE TRIGGER check_achievements_on_points_update
    AFTER UPDATE OF points ON public.users_profiles
    FOR EACH ROW
    WHEN (NEW.points > OLD.points)
    EXECUTE FUNCTION public.check_achievement_eligibility();

-- Enable RLS on all tables
ALTER TABLE public.users_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussion_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own profile"
    ON public.users_profiles FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.users_profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Anyone can read published courses"
    ON public.courses FOR SELECT
    TO authenticated
    USING (is_published = true);

CREATE POLICY "Anyone can read modules of published courses"
    ON public.modules FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.courses 
            WHERE courses.id = modules.course_id 
            AND courses.is_published = true
        )
    );

CREATE POLICY "Anyone can read challenges"
    ON public.challenges FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.modules m
            JOIN public.courses c ON c.id = m.course_id
            WHERE m.id = challenges.module_id 
            AND c.is_published = true
        )
    );

CREATE POLICY "Users can read own progress"
    ON public.user_progress FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create own progress"
    ON public.user_progress FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own submissions"
    ON public.submissions FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create submissions"
    ON public.submissions FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can read achievements"
    ON public.achievements FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can read own achievements"
    ON public.user_achievements FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can read comments on accessible challenges"
    ON public.discussion_comments FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.challenges c
            JOIN public.modules m ON m.id = c.module_id
            JOIN public.courses co ON co.id = m.course_id
            WHERE c.id = discussion_comments.challenge_id 
            AND co.is_published = true
        )
    );

CREATE POLICY "Users can create own comments"
    ON public.discussion_comments FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
    ON public.discussion_comments FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
    ON public.discussion_comments FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Seed Data
INSERT INTO public.courses (id, title, slug, description, difficulty, category, points, is_published)
VALUES
  (
    'c0a80121-7ac0-4e71-a7a5-4371f4268c3f',
    'Web Application Security Fundamentals',
    'web-security-fundamentals',
    'Learn the fundamentals of web application security, including common vulnerabilities, attack vectors, and defense strategies.',
    'Beginner',
    'offensive',
    100,
    true
  ),
  (
    'c0a80121-7ac0-4e71-a7a5-4371f4268c40',
    'Network Security Essentials',
    'network-security-essentials',
    'Master the essentials of network security, including protocols, architecture, and common attack patterns.',
    'Beginner',
    'defensive',
    100,
    true
  ),
  (
    'c0a80121-7ac0-4e71-a7a5-4371f4268c41',
    'Smart Contract Security',
    'smart-contract-security',
    'Learn how to identify and prevent security vulnerabilities in smart contracts and blockchain applications.',
    'Intermediate',
    'web3',
    150,
    true
  );

INSERT INTO public.modules (id, course_id, title, description, order_index, points)
VALUES
  (
    'd1b90121-7ac0-4e71-a7a5-4371f4268c3f',
    'c0a80121-7ac0-4e71-a7a5-4371f4268c3f',
    'Introduction to Web Security',
    'Understanding the basics of web security and the OWASP Top 10.',
    1,
    25
  ),
  (
    'd1b90121-7ac0-4e71-a7a5-4371f4268c40',
    'c0a80121-7ac0-4e71-a7a5-4371f4268c3f',
    'Cross-Site Scripting (XSS)',
    'Learn about XSS vulnerabilities and how to prevent them.',
    2,
    35
  ),
  (
    'd1b90121-7ac0-4e71-a7a5-4371f4268c41',
    'c0a80121-7ac0-4e71-a7a5-4371f4268c3f',
    'SQL Injection',
    'Understanding and preventing SQL injection attacks.',
    3,
    40
  );

INSERT INTO public.challenges (id, module_id, title, description, difficulty, points, flag, hints, order_index)
VALUES
  (
    'e2c90121-7ac0-4e71-a7a5-4371f4268c3f',
    'd1b90121-7ac0-4e71-a7a5-4371f4268c3f',
    'Web Security Basics',
    'Complete this challenge to demonstrate your understanding of basic web security concepts.',
    'Beginner',
    10,
    'FLAG{w3b_s3cur1ty_b4s1cs}',
    ARRAY['Think about the most common web vulnerabilities', 'Review the OWASP Top 10'],
    1
  ),
  (
    'e2c90121-7ac0-4e71-a7a5-4371f4268c40',
    'd1b90121-7ac0-4e71-a7a5-4371f4268c40',
    'Find the XSS',
    'Identify and exploit a cross-site scripting vulnerability in the provided application.',
    'Beginner',
    15,
    'FLAG{xss_m4st3r}',
    ARRAY['Look for user input fields', 'Think about how to inject JavaScript'],
    1
  ),
  (
    'e2c90121-7ac0-4e71-a7a5-4371f4268c41',
    'd1b90121-7ac0-4e71-a7a5-4371f4268c41',
    'SQL Injection 101',
    'Exploit a basic SQL injection vulnerability to access unauthorized data.',
    'Beginner',
    20,
    'FLAG{sql_1nj3ct10n_pr0}',
    ARRAY['Think about how SQL queries are constructed', 'Try manipulating the WHERE clause'],
    1
  );

INSERT INTO public.achievements (id, title, description, image_url, points)
VALUES
  (
    'f3d90121-7ac0-4e71-a7a5-4371f4268c3f',
    'Web Security Novice',
    'Complete your first web security challenge',
    '/achievements/web-security-novice.png',
    50
  ),
  (
    'f3d90121-7ac0-4e71-a7a5-4371f4268c40',
    'XSS Hunter',
    'Successfully identify and exploit an XSS vulnerability',
    '/achievements/xss-hunter.png',
    75
  ),
  (
    'f3d90121-7ac0-4e71-a7a5-4371f4268c41',
    'SQL Master',
    'Complete all SQL injection challenges',
    '/achievements/sql-master.png',
    100
  ); 