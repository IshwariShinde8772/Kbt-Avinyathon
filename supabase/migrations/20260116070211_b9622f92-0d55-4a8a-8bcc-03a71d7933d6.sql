-- Make the payment-proofs bucket private and update policies
UPDATE storage.buckets 
SET public = false 
WHERE id = 'payment-proofs';

-- Drop the public SELECT policy (anyone can view)
DROP POLICY IF EXISTS "Anyone can view payment proofs" ON storage.objects;

-- Drop the public INSERT policy (anyone can upload)
DROP POLICY IF EXISTS "Anyone can upload payment proofs" ON storage.objects;

-- Create a policy that only allows service role to manage payment proofs
-- This ensures uploads go through the edge function which uses service role
CREATE POLICY "Service role can manage payment proofs"
ON storage.objects
FOR ALL
USING (bucket_id = 'payment-proofs' AND (auth.role() = 'service_role'))
WITH CHECK (bucket_id = 'payment-proofs' AND (auth.role() = 'service_role'));