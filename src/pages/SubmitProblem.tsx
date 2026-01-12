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
import { ArrowLeft, Send } from "lucide-react";

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

const SubmitProblem = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProblemStatementForm>({
    resolver: zodResolver(problemStatementSchema),
  });

  const onSubmit = async (data: ProblemStatementForm) => {
    setIsSubmitting(true);
    
    try {
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
          honeypot: honeypotRef.current?.value || "", // Anti-bot field
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
      // Only log errors in development to prevent exposing details in production
      if (import.meta.env.DEV) {
        console.error("Error submitting:", error);
      }
      toast.error("Failed to submit", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <Navbar />

      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Back Button */}
            <Button
              variant="ghost"
              className="mb-6"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {/* Form Card */}
            <div className="bg-background rounded-2xl shadow-xl p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-heading font-black mb-2 text-foreground">
                Submit Problem Statement
              </h1>
              <p className="text-muted-foreground mb-8">
                Share your industry challenge with us. Our student innovators are ready to develop creative solutions.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Company Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-heading font-bold text-foreground border-b border-border pb-2">
                    Company Information
                  </h3>
                  
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

                {/* Problem Statement */}
                <div className="space-y-4">
                  <h3 className="text-lg font-heading font-bold text-foreground border-b border-border pb-2">
                    Problem Statement Details
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="domain">Problem Domain *</Label>
                    <Select onValueChange={(value) => setValue("domain", value)}>
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
                      rows={6}
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
                      placeholder="Who are the intended users or beneficiaries of this solution? (e.g., factory workers, customers, students, etc.)"
                      rows={3}
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
                      rows={4}
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
                      placeholder="List any data, APIs, documentation, or other resources you can provide to help solve this problem."
                      rows={3}
                      {...register("resources")}
                    />
                  </div>
                </div>

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

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gradient-cta text-primary-foreground font-semibold py-6 text-lg rounded-xl hover:opacity-90 transition-opacity"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        Submit Problem Statement
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

export default SubmitProblem;
