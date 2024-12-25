/*
  # Fix Global Hooks Trigger and Policies

  1. Changes
    - Creates a dedicated trigger function for global_hooks
    - Updates trigger to handle updated_at correctly
    - Ensures proper timestamp handling
    - Consolidates policies for clarity

  2. Security
    - Maintains existing RLS policies
    - Ensures proper access control
*/

-- Create a dedicated trigger function for global_hooks
CREATE OR REPLACE FUNCTION handle_global_hooks_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    -- Always use updated_at for global_hooks table
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_global_hooks_timestamp ON public.global_hooks;

-- Create new trigger with dedicated function
CREATE TRIGGER update_global_hooks_timestamp
    BEFORE UPDATE ON public.global_hooks
    FOR EACH ROW
    EXECUTE FUNCTION handle_global_hooks_timestamp();

-- Ensure policies exist with clear names
DO $$ 
BEGIN
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Enable read access for all authenticated users" ON public.global_hooks;
    DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON public.global_hooks;
    DROP POLICY IF EXISTS "Enable update access for authenticated users" ON public.global_hooks;
    DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON public.global_hooks;
EXCEPTION
    WHEN undefined_object THEN null;
END $$;

-- Create clear, well-defined policies
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

-- Add helpful comments
COMMENT ON FUNCTION handle_global_hooks_timestamp IS 'Updates the updated_at timestamp when a global hook is modified';
COMMENT ON TABLE public.global_hooks IS 'Stores globally available content hooks accessible to all authenticated users';