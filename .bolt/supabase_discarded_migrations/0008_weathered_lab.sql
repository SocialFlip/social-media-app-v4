/*
  # Fix Global Hooks Policies and Access Control

  1. Changes
    - Drops and recreates policies to ensure proper access
    - Adds indexes for better query performance
    - Updates table and column comments

  2. Security
    - All authenticated users can read hooks
    - All authenticated users can create/update/delete hooks
*/

-- Drop existing policies safely
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Global hooks viewable by all" ON public.global_hooks;
    DROP POLICY IF EXISTS "Users can create hooks" ON public.global_hooks;
    DROP POLICY IF EXISTS "Users can update hooks" ON public.global_hooks;
    DROP POLICY IF EXISTS "Users can delete hooks" ON public.global_hooks;
    DROP POLICY IF EXISTS "Enable read access for all authenticated users" ON public.global_hooks;
    DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON public.global_hooks;
    DROP POLICY IF EXISTS "Enable update access for authenticated users" ON public.global_hooks;
    DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON public.global_hooks;
EXCEPTION
    WHEN undefined_object THEN null;
END $$;

-- Create new policies with clear names and permissions
CREATE POLICY "Enable read access for all authenticated users"
ON public.global_hooks FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert access for authenticated users"
ON public.global_hooks FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users"
ON public.global_hooks FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Enable delete access for authenticated users"
ON public.global_hooks FOR DELETE
TO authenticated
USING (true);

-- Ensure proper indexes exist
CREATE INDEX IF NOT EXISTS idx_global_hooks_category ON public.global_hooks(category);
CREATE INDEX IF NOT EXISTS idx_global_hooks_created_at ON public.global_hooks(created_at DESC);

-- Update comments
COMMENT ON TABLE public.global_hooks IS 'Stores globally available content hooks accessible to all authenticated users';
COMMENT ON COLUMN public.global_hooks.content IS 'The actual hook content';
COMMENT ON COLUMN public.global_hooks.category IS 'Category of the hook (e.g., curiosity, problem-solution)';
COMMENT ON COLUMN public.global_hooks.source IS 'Optional source reference for the hook';