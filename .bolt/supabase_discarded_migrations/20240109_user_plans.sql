-- Create user_plans table
CREATE TABLE IF NOT EXISTS public.user_plans (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id),
    plan_type TEXT NOT NULL DEFAULT 'growth',
    tokens_used INTEGER NOT NULL DEFAULT 0,
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_plans ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own plan"
ON public.user_plans FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own plan"
ON public.user_plans FOR UPDATE
USING (auth.uid() = user_id);

-- Create trigger for last_updated
CREATE TRIGGER update_user_plans_last_updated
    BEFORE UPDATE ON public.user_plans
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT ALL ON public.user_plans TO authenticated;