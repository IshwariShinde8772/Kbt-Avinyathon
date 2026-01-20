-- Fix: Add SELECT policy for approved submissions on problem_statements table
-- This enables the public_problem_statements view to work properly
CREATE POLICY "Allow select for approved submissions"
ON public.problem_statements
FOR SELECT
USING (status = 'approved');

-- Fix: Recreate the public_problem_statements view with proper filtering
DROP VIEW IF EXISTS public.public_problem_statements;

CREATE VIEW public.public_problem_statements
WITH (security_invoker=on) AS
SELECT 
  id,
  problem_title,
  problem_description,
  domain,
  expected_outcome,
  targeted_audience,
  resources_provided,
  status,
  created_at
FROM public.problem_statements
WHERE status = 'approved';

-- Grant public access to the view
GRANT SELECT ON public.public_problem_statements TO anon;
GRANT SELECT ON public.public_problem_statements TO authenticated;