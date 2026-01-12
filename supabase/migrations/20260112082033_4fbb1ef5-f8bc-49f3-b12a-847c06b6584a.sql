-- Drop the existing public SELECT policy that exposes all data
DROP POLICY IF EXISTS "Public can view all submissions" ON public.problem_statements;

-- Create a sanitized public view without sensitive contact information
CREATE OR REPLACE VIEW public.public_problem_statements AS
SELECT 
  id,
  problem_title,
  problem_description,
  domain,
  expected_outcome,
  targeted_audience,
  resources_provided,
  mentorship_available,
  internship_opportunity,
  status,
  created_at
FROM public.problem_statements
WHERE status = 'approved';

-- Grant public access to the sanitized view only
GRANT SELECT ON public.public_problem_statements TO anon;
GRANT SELECT ON public.public_problem_statements TO authenticated;