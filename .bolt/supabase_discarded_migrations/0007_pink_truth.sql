-- Create hooks table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.hooks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    source TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_category CHECK (
        category IN (
            'curiosity', 'problem-solution', 'story', 'statistic',
            'questions', 'education', 'myths', 'step-by-step',
            'common-mistakes', 'authority'
        )
    )
);

-- Enable RLS
ALTER TABLE public.hooks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own hooks"
ON public.hooks FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own hooks"
ON public.hooks FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own hooks"
ON public.hooks FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own hooks"
ON public.hooks FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_hooks_user_id ON public.hooks(user_id);
CREATE INDEX IF NOT EXISTS idx_hooks_category ON public.hooks(category);
CREATE INDEX IF NOT EXISTS idx_hooks_created_at ON public.hooks(created_at DESC);