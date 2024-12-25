-- Drop existing policies
DROP POLICY IF EXISTS "Global hooks viewable by all" ON public.global_hooks;
DROP POLICY IF EXISTS "Admin can insert global hooks" ON public.global_hooks;
DROP POLICY IF EXISTS "Admin can update global hooks" ON public.global_hooks;
DROP POLICY IF EXISTS "Admin can delete global hooks" ON public.global_hooks;

-- Create new policies with admin permissions
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