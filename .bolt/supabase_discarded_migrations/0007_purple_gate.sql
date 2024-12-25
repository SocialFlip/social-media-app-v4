-- Drop existing policies
DROP POLICY IF EXISTS "Global hooks viewable by all" ON public.global_hooks;
DROP POLICY IF EXISTS "Admin can insert global hooks" ON public.global_hooks;
DROP POLICY IF EXISTS "Admin can update global hooks" ON public.global_hooks;
DROP POLICY IF EXISTS "Admin can delete global hooks" ON public.global_hooks;

-- Create simpler policies using direct email check
CREATE POLICY "Global hooks viewable by all"
ON public.global_hooks FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admin can insert global hooks"
ON public.global_hooks FOR INSERT
TO authenticated
WITH CHECK (auth.email() = 'copywritingobsession@gmail.com');

CREATE POLICY "Admin can update global hooks"
ON public.global_hooks FOR UPDATE
TO authenticated
USING (auth.email() = 'copywritingobsession@gmail.com');

CREATE POLICY "Admin can delete global hooks"
ON public.global_hooks FOR DELETE
TO authenticated
USING (auth.email() = 'copywritingobsession@gmail.com');

-- Add helpful comments
COMMENT ON TABLE public.global_hooks IS 'Stores globally available content hooks';
COMMENT ON COLUMN public.global_hooks.content IS 'The actual hook content';
COMMENT ON COLUMN public.global_hooks.category IS 'Category of the hook (e.g., curiosity, problem-solution)';
COMMENT ON COLUMN public.global_hooks.source IS 'Optional source reference for the hook';