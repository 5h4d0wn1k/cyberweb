-- Fix schema inconsistencies
ALTER TABLE public.challenges
ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT true;

-- Fix function parameters
CREATE OR REPLACE FUNCTION public.check_challenge_submission(
    p_user_id UUID,
    p_challenge_id UUID,
    p_flag TEXT
) RETURNS BOOLEAN AS $$
DECLARE
    correct_flag TEXT;
BEGIN
    -- Input validation
    IF p_challenge_id IS NULL THEN
        RAISE EXCEPTION 'challenge_id cannot be null';
    END IF;
    
    IF p_flag IS NULL THEN
        RAISE EXCEPTION 'flag cannot be null';
    END IF;

    -- Get the correct flag
    SELECT flag INTO correct_flag
    FROM public.challenges
    WHERE id = p_challenge_id;
    
    IF correct_flag IS NULL THEN
        RAISE EXCEPTION 'Challenge not found';
    END IF;
    
    RETURN p_flag = correct_flag;
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Error in check_challenge_submission: %', SQLERRM;
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add missing RLS policies for admin access
CREATE POLICY "Admins can access all courses"
    ON public.courses FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.users_profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

CREATE POLICY "Admins can access all challenges"
    ON public.challenges FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.users_profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

CREATE POLICY "Admins can access all modules"
    ON public.modules FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.users_profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    ); 