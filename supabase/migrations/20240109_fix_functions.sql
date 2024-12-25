-- Create the update_updated_at_column function first
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create user_plans table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_plans (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id),
    plan_type TEXT NOT NULL DEFAULT 'growth' CHECK (plan_type IN ('growth', 'premium', 'elite')),
    tokens_used INTEGER NOT NULL DEFAULT 0 CHECK (tokens_used >= 0),
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_plans ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own plan" ON public.user_plans;
DROP POLICY IF EXISTS "Users can update own plan" ON public.user_plans;
DROP POLICY IF EXISTS "Users can insert own plan" ON public.user_plans;

-- Create policies
CREATE POLICY "Users can view own plan"
ON public.user_plans FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own plan"
ON public.user_plans FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own plan"
ON public.user_plans FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create trigger for last_updated
DROP TRIGGER IF EXISTS update_user_plans_last_updated ON public.user_plans;

CREATE TRIGGER update_user_plans_last_updated
    BEFORE UPDATE ON public.user_plans
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT ALL ON public.user_plans TO authenticated;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_plans_user_id ON public.user_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_user_plans_plan_type ON public.user_plans(plan_type);

-- Add helpful comments
COMMENT ON TABLE public.user_plans IS 'Stores user plan types and token usage';
COMMENT ON COLUMN public.user_plans.plan_type IS 'User plan type: growth, premium, or elite';
COMMENT ON COLUMN public.user_plans.tokens_used IS 'Number of tokens used by the user';