-- Improved challenge submission function
CREATE OR REPLACE FUNCTION public.check_challenge_submission(
    p_user_id UUID,
    p_challenge_id UUID,
    p_flag TEXT
) RETURNS JSONB AS $$
DECLARE
    v_challenge RECORD;
    v_user RECORD;
    v_progress RECORD;
    v_result JSONB;
BEGIN
    -- Input validation
    IF p_user_id IS NULL OR p_challenge_id IS NULL OR p_flag IS NULL THEN
        RAISE EXCEPTION 'Missing required parameters';
    END IF;

    -- Get challenge details
    SELECT * INTO v_challenge
    FROM public.challenges
    WHERE id = p_challenge_id AND published = true;
    
    IF v_challenge IS NULL THEN
        RAISE EXCEPTION 'Challenge not found or not published';
    END IF;

    -- Get user details
    SELECT * INTO v_user
    FROM public.users_profiles
    WHERE id = p_user_id;
    
    IF v_user IS NULL THEN
        RAISE EXCEPTION 'User not found';
    END IF;

    -- Check if challenge is already completed
    SELECT * INTO v_progress
    FROM public.user_progress
    WHERE user_id = p_user_id AND challenge_id = p_challenge_id;

    -- Verify flag
    IF v_challenge.flag = p_flag THEN
        -- Challenge completed successfully
        IF v_progress IS NULL THEN
            -- First completion
            INSERT INTO public.user_progress (
                user_id,
                challenge_id,
                completed_at,
                attempts
            ) VALUES (
                p_user_id,
                p_challenge_id,
                NOW(),
                1
            );

            -- Award points
            UPDATE public.users_profiles
            SET 
                points = points + v_challenge.points,
                updated_at = NOW()
            WHERE id = p_user_id;

            v_result = jsonb_build_object(
                'correct', true,
                'firstCompletion', true,
                'points', v_challenge.points,
                'message', 'Congratulations! You''ve completed this challenge!'
            );
        ELSE
            -- Already completed
            UPDATE public.user_progress
            SET attempts = attempts + 1
            WHERE user_id = p_user_id AND challenge_id = p_challenge_id;

            v_result = jsonb_build_object(
                'correct', true,
                'firstCompletion', false,
                'points', 0,
                'message', 'Correct flag! You''ve already completed this challenge.'
            );
        END IF;
    ELSE
        -- Incorrect submission
        IF v_progress IS NULL THEN
            INSERT INTO public.user_progress (
                user_id,
                challenge_id,
                attempts
            ) VALUES (
                p_user_id,
                p_challenge_id,
                1
            );
        ELSE
            UPDATE public.user_progress
            SET attempts = attempts + 1
            WHERE user_id = p_user_id AND challenge_id = p_challenge_id;
        END IF;

        v_result = jsonb_build_object(
            'correct', false,
            'attempts', COALESCE(v_progress.attempts, 0) + 1,
            'message', 'Incorrect flag. Try again!'
        );
    END IF;

    RETURN v_result;
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Error in check_challenge_submission: %', SQLERRM;
        RETURN jsonb_build_object(
            'error', SQLERRM,
            'correct', false,
            'message', 'An error occurred while processing your submission'
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update user rank based on points
CREATE OR REPLACE FUNCTION public.update_user_rank()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.users_profiles
    SET rank = 
        CASE
            WHEN NEW.points >= 1000 THEN 'Expert'
            WHEN NEW.points >= 500 THEN 'Advanced'
            WHEN NEW.points >= 100 THEN 'Intermediate'
            ELSE 'Beginner'
        END
    WHERE id = NEW.id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for rank updates
DROP TRIGGER IF EXISTS update_rank_on_points_change ON public.users_profiles;
CREATE TRIGGER update_rank_on_points_change
    AFTER UPDATE OF points ON public.users_profiles
    FOR EACH ROW
    WHEN (NEW.points IS DISTINCT FROM OLD.points)
    EXECUTE FUNCTION public.update_user_rank();

-- Add policy for user profile creation
CREATE POLICY "Enable insert for users creating their own profile"
    ON public.users_profiles
    FOR INSERT
    WITH CHECK (auth.uid() = id); 