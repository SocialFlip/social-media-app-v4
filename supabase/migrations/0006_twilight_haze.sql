/*
  # Create Global Hooks Table

  1. New Tables
    - `global_hooks` table for storing shared hook content
      - `id` (uuid, primary key)
      - `content` (text, required)
      - `category` (text, required, with validation)
      - `source` (text, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for authenticated users
    - Grant necessary permissions
*/

-- Create updated_at trigger function if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_updated_at_column') THEN
    CREATE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $func$
    BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
    END;
    $func$ language 'plpgsql';
  END IF;
END $$;

-- Drop existing table and recreate
DROP TABLE IF EXISTS public.global_hooks;

CREATE TABLE public.global_hooks (
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
CREATE POLICY "Global hooks viewable by all"
ON public.global_hooks FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can create hooks"
ON public.global_hooks FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Users can update hooks"
ON public.global_hooks FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Users can delete hooks"
ON public.global_hooks FOR DELETE
TO authenticated
USING (true);

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_global_hooks_updated_at ON public.global_hooks;
CREATE TRIGGER update_global_hooks_updated_at
    BEFORE UPDATE ON public.global_hooks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_global_hooks_category ON public.global_hooks(category);
CREATE INDEX idx_global_hooks_created_at ON public.global_hooks(created_at DESC);

-- Grant permissions
GRANT ALL ON public.global_hooks TO authenticated;

-- Add helpful comments
COMMENT ON TABLE public.global_hooks IS 'Stores globally available content hooks';
COMMENT ON COLUMN public.global_hooks.content IS 'The actual hook content';
COMMENT ON COLUMN public.global_hooks.category IS 'Category of the hook (e.g., curiosity, problem-solution)';
COMMENT ON COLUMN public.global_hooks.source IS 'Optional source reference for the hook';