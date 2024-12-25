/*
  # Fix Trigger Function

  1. Changes
    - Updates the trigger function to handle updated_at column correctly
    - Preserves existing triggers that depend on the function
    - Maintains backward compatibility

  2. Details
    - Modifies function behavior without dropping it
    - Ensures all dependent triggers continue working
*/

-- Update the trigger function without dropping it
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    -- Handle both updated_at and last_updated columns
    IF TG_TABLE_NAME = 'user_plans' THEN
        NEW.last_updated = NOW();
    ELSE
        NEW.updated_at = NOW();
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop and recreate only the specific trigger we want to modify
DROP TRIGGER IF EXISTS update_global_hooks_updated_at ON public.global_hooks;

CREATE TRIGGER update_global_hooks_updated_at
    BEFORE UPDATE ON public.global_hooks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add helpful comment
COMMENT ON FUNCTION update_updated_at_column IS 'Automatically updates timestamp columns when a row is modified';