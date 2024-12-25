/*
  # Create Global Hooks Tables

  1. New Tables
    - `global_hooks`
      - `id` (uuid, primary key)
      - `content` (text)
      - `category` (text)
      - `source` (text, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `global_hooks` table
    - Add policies for authenticated users to view hooks
    - Add policies for admin users to manage hooks

  3. Changes
    - Add updated_at trigger function
    - Add trigger for automatic updated_at updates
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

-- Create global_hooks table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.global_hooks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    source TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.global_hooks ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Everyone can view global hooks" ON public.global_hooks;
    DROP POLICY IF EXISTS "Admins can insert global hooks" ON public.global_hooks;
    DROP POLICY IF EXISTS "Admins can update global hooks" ON public.global_hooks;
    DROP POLICY IF EXISTS "Admins can delete global hooks" ON public.global_hooks;
EXCEPTION
    WHEN undefined_object THEN null;
END $$;

-- Create policies
CREATE POLICY "Everyone can view global hooks"
ON public.global_hooks FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can insert global hooks"
ON public.global_hooks FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IN (SELECT user_id FROM public.admin_users));

CREATE POLICY "Admins can update global hooks"
ON public.global_hooks FOR UPDATE
TO authenticated
USING (auth.uid() IN (SELECT user_id FROM public.admin_users));

CREATE POLICY "Admins can delete global hooks"
ON public.global_hooks FOR DELETE
TO authenticated
USING (auth.uid() IN (SELECT user_id FROM public.admin_users));

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_global_hooks_updated_at ON public.global_hooks;
CREATE TRIGGER update_global_hooks_updated_at
    BEFORE UPDATE ON public.global_hooks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT ALL ON public.global_hooks TO authenticated;

-- Add helpful comments
COMMENT ON TABLE public.global_hooks IS 'Stores globally available content hooks';
COMMENT ON COLUMN public.global_hooks.content IS 'The actual hook content';
COMMENT ON COLUMN public.global_hooks.category IS 'Category of the hook (e.g., curiosity, problem-solution)';
COMMENT ON COLUMN public.global_hooks.source IS 'Optional source reference for the hook';