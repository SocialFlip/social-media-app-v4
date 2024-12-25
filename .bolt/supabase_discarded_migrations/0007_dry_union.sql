/*
  # Create hooks table

  1. New Tables
    - `hooks`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `content` (text)
      - `category` (text)
      - `source` (text, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for authenticated users to manage their own hooks
*/

-- Create hooks table
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

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER hooks_updated_at
    BEFORE UPDATE ON public.hooks
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

-- Create indexes
CREATE INDEX idx_hooks_user_id ON public.hooks(user_id);
CREATE INDEX idx_hooks_category ON public.hooks(category);
CREATE INDEX idx_hooks_created_at ON public.hooks(created_at DESC);

-- Grant permissions
GRANT ALL ON public.hooks TO authenticated;

-- Add helpful comments
COMMENT ON TABLE public.hooks IS 'Stores user content hooks';
COMMENT ON COLUMN public.hooks.content IS 'The actual hook content';
COMMENT ON COLUMN public.hooks.category IS 'Category of the hook (e.g., curiosity, problem-solution)';
COMMENT ON COLUMN public.hooks.source IS 'Optional source reference for the hook';