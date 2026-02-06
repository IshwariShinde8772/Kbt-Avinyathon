-- Add source of information fields to problem_statements table
ALTER TABLE public.problem_statements 
ADD COLUMN source_of_info text,
ADD COLUMN source_of_info_detail text;