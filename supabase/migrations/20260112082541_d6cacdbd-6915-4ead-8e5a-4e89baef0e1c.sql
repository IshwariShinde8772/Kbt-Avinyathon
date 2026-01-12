-- Drop and recreate the view with SECURITY INVOKER to prevent security definer issues
DROP VIEW IF EXISTS public.public_problem_statements;

CREATE VIEW public.public_problem_statements 
WITH (security_invoker = true) AS
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