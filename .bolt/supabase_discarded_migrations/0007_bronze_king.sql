/*
  # Fix Global Hooks Timestamp Trigger

  1. Changes
    - Creates a dedicated trigger function for global_hooks table
    - Replaces existing trigger with new implementation
    - Ensures proper timestamp handling for updates

  2. Details
    - Drops existing triggers to avoid conflicts
    - Creates new trigger function specific to global_hooks
    - Sets up trigger to update timestamps on row changes
*/

-- Create a dedicated trigger function for global_hooks
CREATE OR REPLACE FUNCTION handle_global_hooks_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    -- Ensure we always use updated_at for timestamp tracking
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_global_hooks_timestamp ON public.global_hooks;
DROP TRIGGER IF EXISTS update_global_hooks_updated_at ON public.global_hooks;

-- Create new trigger with dedicated function
CREATE TRIGGER update_global_hooks_timestamp
    BEFORE UPDATE ON public.global_hooks
    FOR EACH ROW
    EXECUTE FUNCTION handle_global_hooks_timestamp();

-- Add helpful comment
COMMENT ON FUNCTION handle_global_hooks_timestamp IS 'Updates the updated_at timestamp when a global hook is modified';