-- Drop the public_problem_statements view first since it references these columns
DROP VIEW IF EXISTS public.public_problem_statements;

-- Remove unused columns from problem_statements table
ALTER TABLE public.problem_statements 
DROP COLUMN IF EXISTS additional_notes,
DROP COLUMN IF EXISTS prize_contribution,
DROP COLUMN IF EXISTS mentorship_available,
DROP COLUMN IF EXISTS internship_opportunity;

-- Recreate the public view without sensitive data and removed columns
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
FROM public.problem_statements;