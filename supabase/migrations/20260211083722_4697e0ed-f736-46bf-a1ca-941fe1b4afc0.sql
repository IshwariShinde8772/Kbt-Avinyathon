
-- Add resource file URL column to problem_statements
ALTER TABLE public.problem_statements ADD COLUMN resource_file_url text NULL;

-- Create storage bucket for problem resource files
INSERT INTO storage.buckets (id, name, public) VALUES ('problem-resources', 'problem-resources', false);

-- Allow service role to manage the bucket (edge function uses service role)
CREATE POLICY "Service role can upload problem resources"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'problem-resources');

CREATE POLICY "Service role can read problem resources"
ON storage.objects FOR SELECT
USING (bucket_id = 'problem-resources');
