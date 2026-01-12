-- Add payment_proof_url column to problem_statements table
ALTER TABLE public.problem_statements 
ADD COLUMN payment_proof_url TEXT;

-- Create sponsorships table for separate sponsorship submissions
CREATE TABLE public.sponsorships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_website TEXT,
  sponsorship_type TEXT NOT NULL,
  sponsorship_amount TEXT,
  additional_notes TEXT,
  payment_proof_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on sponsorships table
ALTER TABLE public.sponsorships ENABLE ROW LEVEL SECURITY;

-- Create policy for service role to insert sponsorships (same pattern as problem_statements)
CREATE POLICY "Service role can insert sponsorships"
ON public.sponsorships
FOR INSERT
WITH CHECK (false);

-- Create storage bucket for payment proofs
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment-proofs', 'payment-proofs', true);

-- Allow anyone to upload payment proofs
CREATE POLICY "Anyone can upload payment proofs"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'payment-proofs');

-- Allow anyone to view payment proofs
CREATE POLICY "Anyone can view payment proofs"
ON storage.objects
FOR SELECT
USING (bucket_id = 'payment-proofs');

-- Create trigger for sponsorships updated_at
CREATE TRIGGER update_sponsorships_updated_at
BEFORE UPDATE ON public.sponsorships
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();