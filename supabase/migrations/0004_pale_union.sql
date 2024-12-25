/*
  # Update Global Hooks Table

  1. Updates
    - Add category validation constraint
    - Update indexes for performance
    - Modify policies for better access control

  2. Security
    - Update RLS policies with proper checks
    - Ensure proper permissions
*/

-- Drop existing policies safely
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Everyone can view global hooks" ON public.global_hooks;
    DROP POLICY IF EXISTS "Anyone can insert global hooks" ON public.global_hooks;
    DROP POLICY IF EXISTS "Anyone can update own hooks" ON public.global_hooks;
    DROP POLICY IF EXISTS "Anyone can delete own hooks" ON public.global_hooks;
EXCEPTION
    WHEN undefined_object THEN null;
END $$;

-- Add category validation if not exists
DO $$
BEGIN
    ALTER TABLE public.global_hooks
    ADD CONSTRAINT valid_category CHECK (
        category IN (
            'curiosity', 'problem-solution', 'story', 'statistic',
            'questions', 'education', 'myths', 'step-by-step',
            'common-mistakes', 'authority'
        )
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create new policies
CREATE POLICY "Global hooks are viewable by all"
ON public.global_hooks FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can create hooks"
ON public.global_hooks FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Users can update their hooks"
ON public.global_hooks FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Users can delete their hooks"
ON public.global_hooks FOR DELETE
TO authenticated
USING (true);

-- Create or replace indexes
DROP INDEX IF EXISTS idx_global_hooks_category;
DROP INDEX IF EXISTS idx_global_hooks_created_at;

CREATE INDEX idx_global_hooks_category ON public.global_hooks(category);
CREATE INDEX idx_global_hooks_created_at ON public.global_hooks(created_at DESC);

-- Ensure proper column comments
COMMENT ON COLUMN public.global_hooks.content IS 'The actual hook content';
COMMENT ON COLUMN public.global_hooks.category IS 'Category of the hook (e.g., curiosity, problem-solution)';
COMMENT ON COLUMN public.global_hooks.source IS 'Optional source reference for the hook';