/*
  # Update Token Limits and Admin Functionality

  1. Changes
    - Update token limits for different plan types
    - Add admin bypass for token limits
    - Add check constraint for plan types
    - Add admin flag to user_plans table

  2. Token Limits
    - Growth: 35,000 tokens
    - Premium: 55,000 tokens
    - Elite: 90,000 tokens
    - Admin: Unlimited (no token tracking)
*/

-- Add admin column to user_plans if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_plans' AND column_name = 'is_admin'
  ) THEN
    ALTER TABLE public.user_plans ADD COLUMN is_admin BOOLEAN DEFAULT false;
  END IF;
END $$;

-- Update plan_type check constraint
ALTER TABLE public.user_plans DROP CONSTRAINT IF EXISTS user_plans_plan_type_check;
ALTER TABLE public.user_plans ADD CONSTRAINT user_plans_plan_type_check 
  CHECK (plan_type IN ('growth', 'premium', 'elite'));

-- Create function to handle token limits
CREATE OR REPLACE FUNCTION check_token_limit()
RETURNS TRIGGER AS $$
BEGIN
  -- Skip check for admin users
  IF NEW.is_admin THEN
    RETURN NEW;
  END IF;

  -- Check token limits based on plan type
  IF NEW.plan_type = 'growth' AND NEW.tokens_used > 35000 THEN
    RAISE EXCEPTION 'Token limit exceeded for Growth plan';
  ELSIF NEW.plan_type = 'premium' AND NEW.tokens_used > 55000 THEN
    RAISE EXCEPTION 'Token limit exceeded for Premium plan';
  ELSIF NEW.plan_type = 'elite' AND NEW.tokens_used > 90000 THEN
    RAISE EXCEPTION 'Token limit exceeded for Elite plan';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create or replace the trigger
DROP TRIGGER IF EXISTS check_token_limit_trigger ON public.user_plans;
CREATE TRIGGER check_token_limit_trigger
  BEFORE INSERT OR UPDATE ON public.user_plans
  FOR EACH ROW
  EXECUTE FUNCTION check_token_limit();

-- Update existing admin users
UPDATE public.user_plans
SET is_admin = true
WHERE user_id IN (
  SELECT id FROM auth.users 
  WHERE email = 'copywritingobsession@gmail.com'
);