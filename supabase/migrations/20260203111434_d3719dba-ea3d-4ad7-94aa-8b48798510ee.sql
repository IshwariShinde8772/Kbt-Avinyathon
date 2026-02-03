-- Add transaction_id column to problem_statements table
ALTER TABLE public.problem_statements 
ADD COLUMN IF NOT EXISTS transaction_id TEXT;

-- Add transaction_id column to sponsorships table
ALTER TABLE public.sponsorships 
ADD COLUMN IF NOT EXISTS transaction_id TEXT;