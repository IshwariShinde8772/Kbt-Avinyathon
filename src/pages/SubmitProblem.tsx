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
import { ArrowLeft, ArrowRight, Send, CheckCircle2, Building2, FileText, CreditCard, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const problemStatementSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters").max(100),
  contactName: z.string().min(2, "Contact name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address").max(255),
  phone: z.string().min(10, "Please enter a valid phone number").max(15),
  companyWebsite: z.string().url("Please enter a valid URL").max(255).optional().or(z.literal("")),
  domain: z.string().min(1, "Please select a domain"),
  problemTitle: z.string().min(5, "Problem title must be at least 5 characters").max(200),
  problemDescription: z.string().min(50, "Problem description must be at least 50 characters").max(2000),
  targetedAudience: z.string().min(10, "Targeted audience must be at least 10 characters").max(500),
  expectedOutcome: z.string().min(20, "Expected outcome must be at least 20 characters").max(1000),
  resources: z.string().max(1000).optional(),
});

type ProblemStatementForm = z.infer<typeof problemStatementSchema>;

const domains = [
  "Process Optimization",
  "Automation & Productivity",
  "Quality Improvement",
  "Data Analytics & AI/ML",
  "Safety & Monitoring Systems",
  "Sustainable & Green Solutions",
  "Digital Transformation",
  "Other",
];

const steps = [
  { id: 1, title: "Company Details", icon: Building2 },
  { id: 2, title: "Problem Statement", icon: FileText },
  { id: 3, title: "Payment", icon: CreditCard },
];

const SubmitProblem = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null);
  const [paymentProofPreview, setPaymentProofPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm<ProblemStatementForm>({
    resolver: zodResolver(problemStatementSchema),
  });

  const watchedDomain = watch("domain");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file type", {
          description: "Please upload a JPG, PNG, WebP, or PDF file.",
        });
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File too large", {
          description: "Please upload a file smaller than 5MB.",
        });
        return;
      }
      setPaymentProofFile(file);
      
      // Create preview for images
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

  const validateStep = async (step: number): Promise<boolean> => {
    if (step === 1) {
      const result = await trigger(["companyName", "contactName", "email", "phone", "companyWebsite"]);
      return result;
    } else if (step === 2) {
      const result = await trigger(["domain", "problemTitle", "problemDescription", "targetedAudience", "expectedOutcome", "resources"]);
      return result;
    }
    return true;
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: ProblemStatementForm) => {
    if (!paymentProofFile) {
      toast.error("Payment proof required", {
        description: "Please upload a screenshot or PDF of your payment.",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Upload payment proof to storage
      setIsUploading(true);
      const fileExt = paymentProofFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('payment-proofs')
        .upload(fileName, paymentProofFile);

      if (uploadError) {
        throw new Error("Failed to upload payment proof");
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('payment-proofs')
        .getPublicUrl(fileName);

      setIsUploading(false);

      // Get Supabase URL from environment
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      
      // Call the edge function with rate limiting instead of direct insert
      const response = await fetch(`${supabaseUrl}/functions/v1/submit-problem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_name: data.companyName,
          contact_person: data.contactName,
          email: data.email,
          phone: data.phone,
          company_website: data.companyWebsite || undefined,
          problem_title: data.problemTitle,
          problem_description: data.problemDescription,
          domain: data.domain,
          targeted_audience: data.targetedAudience,
          expected_outcome: data.expectedOutcome,
          resources_provided: data.resources || undefined,
          payment_proof_url: publicUrl,
          honeypot: honeypotRef.current?.value || "",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          toast.error("Too many submissions", {
            description: "Please wait before submitting another problem statement.",
          });
          return;
        }
        throw new Error(result.error || "Submission failed");
      }

      toast.success("Problem statement submitted successfully!", {
        description: "We will review your submission and get back to you soon.",
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
          <div className="max-w-3xl mx-auto">
            {/* Back Button */}
            <Button
              variant="ghost"
              className="mb-4"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {/* Step Indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        currentStep >= step.id 
                          ? 'gradient-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {currentStep > step.id ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <step.icon className="w-6 h-6" />
                        )}
                      </div>
                      <span className={`text-sm mt-2 font-medium ${
                        currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-1 mx-4 rounded ${
                        currentStep > step.id ? 'gradient-primary' : 'bg-muted'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-background rounded-2xl shadow-xl p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-heading font-black mb-2 text-foreground">
                {steps[currentStep - 1].title}
              </h1>
              <p className="text-muted-foreground mb-6 text-sm">
                {currentStep === 1 && "Enter your company and contact information."}
                {currentStep === 2 && "Describe your industry problem statement."}
                {currentStep === 3 && "Complete your payment and upload proof."}
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Step 1: Company Information */}
                {currentStep === 1 && (
                  <div className="space-y-4">
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
                  </div>
                )}

                {/* Step 2: Problem Statement */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="domain">Problem Domain *</Label>
                      <Select 
                        value={watchedDomain} 
                        onValueChange={(value) => setValue("domain", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a domain" />
                        </SelectTrigger>
                        <SelectContent>
                          {domains.map((domain) => (
                            <SelectItem key={domain} value={domain}>
                              {domain}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.domain && (
                        <p className="text-destructive text-sm">{errors.domain.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="problemTitle">Problem Title *</Label>
                      <Input
                        id="problemTitle"
                        placeholder="Enter a concise title for your problem"
                        {...register("problemTitle")}
                      />
                      {errors.problemTitle && (
                        <p className="text-destructive text-sm">{errors.problemTitle.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="problemDescription">Problem Description *</Label>
                      <Textarea
                        id="problemDescription"
                        placeholder="Describe your problem in detail. Include current challenges, pain points, and any relevant context."
                        rows={4}
                        {...register("problemDescription")}
                      />
                      {errors.problemDescription && (
                        <p className="text-destructive text-sm">{errors.problemDescription.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="targetedAudience">Targeted Audience / Users *</Label>
                      <Textarea
                        id="targetedAudience"
                        placeholder="Who are the intended users or beneficiaries of this solution?"
                        rows={2}
                        {...register("targetedAudience")}
                      />
                      {errors.targetedAudience && (
                        <p className="text-destructive text-sm">{errors.targetedAudience.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expectedOutcome">Expected Outcome *</Label>
                      <Textarea
                        id="expectedOutcome"
                        placeholder="What kind of solution are you looking for? What would success look like?"
                        rows={3}
                        {...register("expectedOutcome")}
                      />
                      {errors.expectedOutcome && (
                        <p className="text-destructive text-sm">{errors.expectedOutcome.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="resources">Available Resources (Optional)</Label>
                      <Textarea
                        id="resources"
                        placeholder="List any data, APIs, documentation, or other resources you can provide."
                        rows={2}
                        {...register("resources")}
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    {/* QR Code Placeholder */}
                    <div className="bg-muted/50 rounded-xl p-6 text-center">
                      <h3 className="text-lg font-heading font-bold mb-4 text-foreground">
                        Scan QR Code to Pay
                      </h3>
                      <div className="w-48 h-48 bg-muted rounded-lg mx-auto flex items-center justify-center border-2 border-dashed border-border">
                        <p className="text-muted-foreground text-sm">
                          QR Code<br />Coming Soon
                        </p>
                      </div>
                      <p className="text-muted-foreground mt-4 text-sm">
                        Registration Fee: ₹XXXX (To be announced)
                      </p>
                    </div>

                    {/* Upload Payment Proof */}
                    <div className="space-y-4">
                      <Label>Upload Payment Proof *</Label>
                      <p className="text-muted-foreground text-sm">
                        After payment, upload a screenshot or PDF of your payment confirmation.
                      </p>
                      
                      <div 
                        className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary transition-colors"
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
                          <div className="space-y-3">
                            {paymentProofPreview ? (
                              <img 
                                src={paymentProofPreview} 
                                alt="Payment proof preview" 
                                className="max-h-40 mx-auto rounded-lg"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-primary/10 rounded-lg mx-auto flex items-center justify-center">
                                <FileText className="w-8 h-8 text-primary" />
                              </div>
                            )}
                            <p className="text-foreground font-medium">{paymentProofFile.name}</p>
                            <p className="text-muted-foreground text-sm">Click to change file</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                            <p className="text-muted-foreground">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-muted-foreground text-sm">
                              JPG, PNG, WebP, or PDF (max 5MB)
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Honeypot field - hidden from users, bots fill it */}
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

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4">
                  {currentStep > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="gradient-cta text-primary-foreground"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="gradient-cta text-primary-foreground font-semibold px-8"
                      disabled={isSubmitting || isUploading}
                    >
                      {isSubmitting || isUploading ? (
                        "Submitting..."
                      ) : (
                        <>
                          Submit
                          <Send className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                  )}
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

export default SubmitProblem;