-- Templates Table
CREATE TABLE IF NOT EXISTS public.templates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    platform TEXT NOT NULL,
    structure TEXT NOT NULL,
    original_content TEXT,
    category TEXT,
    date_created TIMESTAMPTZ DEFAULT NOW(),
    last_modified TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own templates"
ON public.templates FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own templates"
ON public.templates FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own templates"
ON public.templates FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own templates"
ON public.templates FOR DELETE
USING (auth.uid() = user_id);

-- Hooks Table
CREATE TABLE IF NOT EXISTS public.hooks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    source TEXT,
    is_global BOOLEAN DEFAULT false,
    date_created TIMESTAMPTZ DEFAULT NOW(),
    last_modified TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.hooks ENABLE ROW LEVEL SECURITY;

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

-- Brand Voice Table
CREATE TABLE IF NOT EXISTS public.brand_voice (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    problem TEXT,
    solution TEXT,
    results TEXT,
    impact TEXT,
    analyzed_statement TEXT,
    date_created TIMESTAMPTZ DEFAULT NOW(),
    last_modified TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

ALTER TABLE public.brand_voice ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own brand voice"
ON public.brand_voice FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own brand voice"
ON public.brand_voice FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own brand voice"
ON public.brand_voice FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own brand voice"
ON public.brand_voice FOR DELETE
USING (auth.uid() = user_id);

-- Grant permissions
GRANT ALL ON public.templates TO authenticated;
GRANT ALL ON public.hooks TO authenticated;
GRANT ALL ON public.brand_voice TO authenticated;