/*
  # Global Hooks Setup

  1. Tables
    - `global_hooks` table for storing admin-created hooks
      - `id` (uuid, primary key)
      - `content` (text)
      - `category` (text)
      - `source` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policies for admin and user access
*/

-- Create global_hooks table
CREATE TABLE IF NOT EXISTS public.global_hooks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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
ALTER TABLE public.global_hooks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Global hooks are viewable by all authenticated users"
ON public.global_hooks FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Only admin can insert global hooks"
ON public.global_hooks FOR INSERT
TO authenticated
WITH CHECK (auth.email() = 'copywritingobsession@gmail.com');

CREATE POLICY "Only admin can update global hooks"
ON public.global_hooks FOR UPDATE
TO authenticated
USING (auth.email() = 'copywritingobsession@gmail.com');

CREATE POLICY "Only admin can delete global hooks"
ON public.global_hooks FOR DELETE
TO authenticated
USING (auth.email() = 'copywritingobsession@gmail.com');

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_global_hooks_category ON public.global_hooks(category);
CREATE INDEX IF NOT EXISTS idx_global_hooks_created_at ON public.global_hooks(created_at DESC);

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_global_hooks_updated_at ON public.global_hooks;
CREATE TRIGGER update_global_hooks_updated_at
    BEFORE UPDATE ON public.global_hooks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT ALL ON public.global_hooks TO authenticated;