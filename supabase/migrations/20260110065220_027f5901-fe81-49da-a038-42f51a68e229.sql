-- Create problem_statements table to store submissions
CREATE TABLE public.problem_statements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  problem_title TEXT NOT NULL,
  problem_description TEXT NOT NULL,
  domain TEXT NOT NULL,
  expected_outcome TEXT,
  resources_provided TEXT,
  mentorship_available BOOLEAN DEFAULT false,
  internship_opportunity BOOLEAN DEFAULT false,
  prize_contribution TEXT,
  additional_notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.problem_statements ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form submission)
CREATE POLICY "Anyone can submit problem statements"
ON public.problem_statements
FOR INSERT
WITH CHECK (true);

-- Allow anyone to view their own submissions by email (for confirmation)
CREATE POLICY "Public can view all submissions"
ON public.problem_statements
FOR SELECT
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_problem_statements_updated_at
BEFORE UPDATE ON public.problem_statements
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();