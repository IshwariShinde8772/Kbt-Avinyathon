import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  CheckCircle2, 
  Handshake, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Building2,
  ArrowRight 
} from "lucide-react";

const partnershipSteps = [
  {
    icon: MessageSquare,
    title: "Initial Contact",
    description: "Reach out to us through the form below or schedule a call to discuss your requirements.",
  },
  {
    icon: FileText,
    title: "Submit Problem Statement",
    description: "Work with our team to refine and submit your industry problem statement.",
  },
  {
    icon: Calendar,
    title: "Event Participation",
    description: "Join us at the hackathon to interact with teams working on your challenge.",
  },
  {
    icon: Handshake,
    title: "Solution Handover",
    description: "Review and select solutions, connect with winning teams for implementation.",
  },
];

const partnershipBenefits = [
  "Featured branding at the event",
  "Access to all submitted solutions",
  "Direct interaction with student teams",
  "Recruitment opportunities",
  "IP rights to winning solutions",
  "Post-event collaboration support",
  "Certificate of partnership",
  "Media coverage and PR",
];

const PartnerWithUs = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="gradient-benefits py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-heading font-black mb-6 text-primary-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Partner with KBT Avinyathon 2026
              </h1>
              <p className="text-primary-foreground/80 text-lg mb-8">
                Join leading organizations in driving innovation through industry-academia collaboration. 
                Be part of Maharashtra's premier hackathon event.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/submit">
                  <Button size="lg" className="bg-primary-foreground text-secondary font-semibold px-8 py-6 text-lg rounded-xl hover:bg-primary-foreground/90 transition-opacity">
                    Submit Problem Statement
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Process */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-4 text-foreground">
                How to Partner With Us
              </h2>
              <p className="text-muted-foreground">
                A simple four-step process to become an industry partner
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnershipSteps.map((step, index) => (
                <div key={index} className="bg-muted/50 rounded-2xl p-6 text-center">
                  <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-heading font-bold mb-2 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-black mb-6 text-foreground">
                  What You Get as a Partner
                </h2>
                <p className="text-muted-foreground mb-8">
                  Our partnership packages are designed to maximize your return on innovation investment 
                  while providing valuable learning opportunities for students.
                </p>

                <div className="grid sm:grid-cols-2 gap-3">
                  {partnershipBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-background rounded-2xl shadow-xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-foreground">
                    Contact Us
                  </h3>
                </div>

                <div className="space-y-4 text-foreground">
                  <p>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:avinyathon@kbtcoe.org" className="text-primary hover:underline">
                      avinyathon@kbtcoe.org
                    </a>
                  </p>
                  <p>
                    <strong>Location:</strong><br />
                    Karmaveer Adv. Baburao Ganpatrao Thakare College of Engineering<br />
                    Udoji Maratha Boarding Campus<br />
                    Gangapur Road, Nashik, Maharashtra
                  </p>
                  <p>
                    <strong>Website:</strong>{" "}
                    <a href="https://kbtcoe.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      kbtcoe.org
                    </a>
                  </p>
                </div>

                <div className="mt-8">
                  <Link to="/submit">
                    <Button className="w-full gradient-cta text-primary-foreground font-semibold py-6 text-lg rounded-xl hover:opacity-90 transition-opacity">
                      Submit Your Problem Statement
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PartnerWithUs;
