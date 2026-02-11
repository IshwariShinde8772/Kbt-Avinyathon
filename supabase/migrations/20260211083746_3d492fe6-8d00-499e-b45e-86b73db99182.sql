
-- Drop the overly permissive storage policies and replace with restrictive ones
DROP POLICY IF EXISTS "Service role can upload problem resources" ON storage.objects;
DROP POLICY IF EXISTS "Service role can read problem resources" ON storage.objects;

-- These policies use false so only service_role (which bypasses RLS) can access
CREATE POLICY "No public upload to problem-resources"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'problem-resources' AND false);

CREATE POLICY "No public read from problem-resources"
ON storage.objects FOR SELECT
USING (bucket_id = 'problem-resources' AND false);
