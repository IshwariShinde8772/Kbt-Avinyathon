-- Add company_website and targeted_audience columns to problem_statements table
ALTER TABLE public.problem_statements
ADD COLUMN company_website text,
ADD COLUMN targeted_audience text;