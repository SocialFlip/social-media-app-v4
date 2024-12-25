-- Create global_hooks table
CREATE TABLE IF NOT EXISTS public.global_hooks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    source TEXT,
    date_created TIMESTAMPTZ DEFAULT NOW(),
    last_modified TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.global_hooks ENABLE ROW LEVEL SECURITY;

-- Create policies for global hooks
CREATE POLICY "Everyone can view global hooks"
ON public.global_hooks FOR SELECT
TO authenticated
USING (true);

-- Only admins can modify global hooks
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

-- Grant permissions
GRANT SELECT ON public.global_hooks TO authenticated;
GRANT ALL ON public.global_hooks TO authenticated;