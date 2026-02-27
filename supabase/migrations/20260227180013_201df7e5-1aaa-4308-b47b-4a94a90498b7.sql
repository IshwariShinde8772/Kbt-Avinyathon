
-- Ensure buckets are public
UPDATE storage.buckets SET public = true WHERE id IN ('payment-proofs', 'problem-resources');

-- Allow public read access to files in both buckets
CREATE POLICY "Public read access for payment-proofs"
ON storage.objects FOR SELECT
USING (bucket_id = 'payment-proofs');

CREATE POLICY "Public read access for problem-resources"
ON storage.objects FOR SELECT
USING (bucket_id = 'problem-resources');
