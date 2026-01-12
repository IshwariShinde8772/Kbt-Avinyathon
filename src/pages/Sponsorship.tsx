import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Send, Upload, FileText, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const sponsorshipSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters").max(100),
  contactName: z.string().min(2, "Contact name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address").max(255),
  phone: z.string().min(10, "Please enter a valid phone number").max(15),
  companyWebsite: z.string().url("Please enter a valid URL").max(255).optional().or(z.literal("")),
  sponsorshipType: z.string().min(1, "Please select a sponsorship type"),
  sponsorshipAmount: z.string().max(100).optional(),
  additionalNotes: z.string().max(1000).optional(),
});

type SponsorshipForm = z.infer<typeof sponsorshipSchema>;

const sponsorshipTypes = [
  "Title Sponsorship",
  "Event Sponsorship",
  "Problem Statement Sponsor",
  "Prize Sponsor",
  "Media Partner",
  "Technology Partner",
  "Other",
];

const Sponsorship = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null);
  const [paymentProofPreview, setPaymentProofPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SponsorshipForm>({
    resolver: zodResolver(sponsorshipSchema),
  });

  const watchedType = watch("sponsorshipType");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file type", {
          description: "Please upload a JPG, PNG, WebP, or PDF file.",
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File too large", {
          description: "Please upload a file smaller than 5MB.",
        });
        return;
      }
      setPaymentProofFile(file);
      
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPaymentProofPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPaymentProofPreview(null);
      }
    }
  };

  const onSubmit = async (data: SponsorshipForm) => {
    setIsSubmitting(true);
    
    try {
      let paymentProofUrl: string | undefined;

      // Upload payment proof if provided
      if (paymentProofFile) {
        setIsUploading(true);
        const fileExt = paymentProofFile.name.split('.').pop();
        const fileName = `sponsorship-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('payment-proofs')
          .upload(fileName, paymentProofFile);

        if (uploadError) {
          throw new Error("Failed to upload payment proof");
        }

        const { data: { publicUrl } } = supabase.storage
          .from('payment-proofs')
          .getPublicUrl(fileName);

        paymentProofUrl = publicUrl;
        setIsUploading(false);
      }

      // Get Supabase URL from environment
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      
      // Call the edge function
      const response = await fetch(`${supabaseUrl}/functions/v1/submit-problem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "sponsorship",
          company_name: data.companyName,
          contact_person: data.contactName,
          email: data.email,
          phone: data.phone,
          company_website: data.companyWebsite || undefined,
          sponsorship_type: data.sponsorshipType,
          sponsorship_amount: data.sponsorshipAmount || undefined,
          additional_notes: data.additionalNotes || undefined,
          payment_proof_url: paymentProofUrl,
          honeypot: honeypotRef.current?.value || "",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          toast.error("Too many submissions", {
            description: "Please wait before submitting another form.",
          });
          return;
        }
        throw new Error(result.error || "Submission failed");
      }

      toast.success("Sponsorship inquiry submitted successfully!", {
        description: "Our team will contact you shortly to discuss the partnership.",
      });
      navigate("/");
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error submitting:", error);
      }
      toast.error("Failed to submit", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <Navbar />

      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Back Button */}
            <Button
              variant="ghost"
              className="mb-4"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {/* Form Card */}
            <div className="bg-background rounded-2xl shadow-xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-heading font-black text-foreground">
                    Become a Sponsor
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    Partner with KBT Avinyathon 2026
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Company Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      placeholder="Enter company name"
                      {...register("companyName")}
                    />
                    {errors.companyName && (
                      <p className="text-destructive text-sm">{errors.companyName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Person *</Label>
                    <Input
                      id="contactName"
                      placeholder="Enter contact name"
                      {...register("contactName")}
                    />
                    {errors.contactName && (
                      <p className="text-destructive text-sm">{errors.contactName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      placeholder="Enter phone number"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="text-destructive text-sm">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyWebsite">Company Website (Optional)</Label>
                  <Input
                    id="companyWebsite"
                    type="url"
                    placeholder="https://www.yourcompany.com"
                    {...register("companyWebsite")}
                  />
                  {errors.companyWebsite && (
                    <p className="text-destructive text-sm">{errors.companyWebsite.message}</p>
                  )}
                </div>

                {/* Sponsorship Details */}
                <div className="space-y-2">
                  <Label htmlFor="sponsorshipType">Sponsorship Type *</Label>
                  <Select 
                    value={watchedType}
                    onValueChange={(value) => setValue("sponsorshipType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select sponsorship type" />
                    </SelectTrigger>
                    <SelectContent>
                      {sponsorshipTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.sponsorshipType && (
                    <p className="text-destructive text-sm">{errors.sponsorshipType.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sponsorshipAmount">Proposed Sponsorship Amount (Optional)</Label>
                  <Input
                    id="sponsorshipAmount"
                    placeholder="e.g., ₹50,000 or discuss"
                    {...register("sponsorshipAmount")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="additionalNotes"
                    placeholder="Any specific requirements, expectations, or questions..."
                    rows={3}
                    {...register("additionalNotes")}
                  />
                </div>

                {/* Upload Payment Proof (Optional) */}
                <div className="space-y-4">
                  <Label>Upload Payment Proof (Optional)</Label>
                  <p className="text-muted-foreground text-sm">
                    If you've already made a payment, upload the proof here.
                  </p>
                  
                  <div 
                    className="border-2 border-dashed border-border rounded-xl p-4 text-center cursor-pointer hover:border-primary transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/jpeg,image/png,image/webp,application/pdf"
                      className="hidden"
                    />
                    
                    {paymentProofFile ? (
                      <div className="space-y-2">
                        {paymentProofPreview ? (
                          <img 
                            src={paymentProofPreview} 
                            alt="Payment proof preview" 
                            className="max-h-32 mx-auto rounded-lg"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto flex items-center justify-center">
                            <FileText className="w-6 h-6 text-primary" />
                          </div>
                        )}
                        <p className="text-foreground font-medium text-sm">{paymentProofFile.name}</p>
                        <p className="text-muted-foreground text-xs">Click to change</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
                        <p className="text-muted-foreground text-sm">
                          Click to upload (JPG, PNG, WebP, PDF - max 5MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Honeypot */}
                <input
                  type="text"
                  name="website_url"
                  ref={honeypotRef}
                  tabIndex={-1}
                  autoComplete="off"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    opacity: 0,
                    height: 0,
                    width: 0,
                    overflow: "hidden",
                  }}
                  aria-hidden="true"
                />

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gradient-cta text-primary-foreground font-semibold py-6 text-lg rounded-xl hover:opacity-90 transition-opacity"
                    disabled={isSubmitting || isUploading}
                  >
                    {isSubmitting || isUploading ? (
                      "Submitting..."
                    ) : (
                      <>
                        Submit Sponsorship Inquiry
                        <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sponsorship;