/*
  # Fix Global Hooks Update Trigger

  1. Changes
    - Updates trigger function to correctly handle updated_at column
    - Ensures consistent timestamp handling across the table

  2. Security
    - No security changes, maintains existing policies
*/

-- Create a specific trigger function for global_hooks
CREATE OR REPLACE FUNCTION update_global_hooks_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_global_hooks_updated_at ON public.global_hooks;

-- Create new trigger with correct function
CREATE TRIGGER update_global_hooks_updated_at
    BEFORE UPDATE ON public.global_hooks
    FOR EACH ROW
    EXECUTE FUNCTION update_global_hooks_timestamp();

-- Add helpful comment
COMMENT ON FUNCTION update_global_hooks_timestamp IS 'Updates the updated_at timestamp when a global hook is modified';