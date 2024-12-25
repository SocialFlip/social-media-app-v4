-- Create the saved_content table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.saved_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    content TEXT NOT NULL,
    platform TEXT NOT NULL,
    category TEXT,
    metrics JSONB DEFAULT '{"likes": 0, "comments": 0, "shares": 0}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE TRIGGER update_saved_content_updated_at
    BEFORE UPDATE ON public.saved_content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE public.saved_content ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own content" ON public.saved_content;
DROP POLICY IF EXISTS "Users can insert own content" ON public.saved_content;
DROP POLICY IF EXISTS "Users can update own content" ON public.saved_content;
DROP POLICY IF EXISTS "Users can delete own content" ON public.saved_content;

-- Create policies
CREATE POLICY "Users can view own content"
ON public.saved_content
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own content"
ON public.saved_content
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own content"
ON public.saved_content
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own content"
ON public.saved_content
FOR DELETE
USING (auth.uid() = user_id);

-- Grant necessary permissions
GRANT ALL ON public.saved_content TO authenticated;