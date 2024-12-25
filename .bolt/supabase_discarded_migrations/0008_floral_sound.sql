-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create hooks table if it doesn't exist (with new column names)
CREATE TABLE IF NOT EXISTS public.hooks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    source TEXT,
    is_global BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create global_hooks table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.global_hooks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    source TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for both tables
ALTER TABLE public.hooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.global_hooks ENABLE ROW LEVEL SECURITY;

-- Create policies for hooks
CREATE POLICY "Users can view own hooks and global hooks"
ON public.hooks FOR SELECT
USING (auth.uid() = user_id OR is_global = true);

CREATE POLICY "Users can insert own hooks"
ON public.hooks FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own hooks"
ON public.hooks FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own hooks"
ON public.hooks FOR DELETE
USING (auth.uid() = user_id);

-- Create policies for global_hooks
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

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_hooks_updated_at ON public.hooks;
CREATE TRIGGER update_hooks_updated_at
    BEFORE UPDATE ON public.hooks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_global_hooks_updated_at ON public.global_hooks;
CREATE TRIGGER update_global_hooks_updated_at
    BEFORE UPDATE ON public.global_hooks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT ALL ON public.hooks TO authenticated;
GRANT ALL ON public.global_hooks TO authenticated;

-- Add helpful comments
COMMENT ON TABLE public.hooks IS 'Stores user-specific content hooks';
COMMENT ON TABLE public.global_hooks IS 'Stores globally available content hooks';