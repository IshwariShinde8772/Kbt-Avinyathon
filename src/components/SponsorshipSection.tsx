import { Award, Gift, Star, Building2, CheckCircle2, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const sponsorshipTiers = [
  {
    title: "Event Sponsorship",
    amount: "₹75,000+",
    icon: Star,
    color: "text-yellow-500",
    benefits: [
      "Prominent mention on the Hackathon website",
      "Logo display on banners, standees & all promotional material",
      "Appreciation certificate & Acknowledgment during ceremonies",
      "Opportunity to interact with shortlisted teams",
      "Display company products/technologies at a kiosk",
      "Exclusive Mention in Newsletter",
      "Invitation as Chief Guest or Special Guest"
    ]
  },
  {
    title: "Title Sponsorship",
    amount: "₹50,000+",
    icon: Award,
    color: "text-primary",
    benefits: [
      "Prominent mention on the Hackathon website",
      "Appreciation certificate & stage acknowledgment",
      "Company logo on banners & publicity material",
      "Exclusive Mention in Newsletter"
    ]
  },
  {
    title: "Problem Statement Sponsor",
    amount: "₹10,000 - ₹50,000",
    icon: Gift,
    color: "text-green-500",
    benefits: [
      "Support First, Second, or Third prizes",
      "60% for student prize distribution",
      "40% for event organization",
      "Public acknowledgment during ceremonies"
    ]
  }
];

const fundingInfo = [
  {
    title: "Industry Registration Fee",
    description: "₹5,000 (non-refundable) for industries submitting problem statements"
  },
  {
    title: "Prize Funding",
    description: "Recommended ₹10,000 – ₹50,000 per problem statement"
  },
  {
    title: "Transparent Distribution",
    description: "All prizes distributed through official college procedures"
  }
];

const contactPersons = [
  {
    name: "Mr. Ajit Shiralkar",
    phone: "9096394159"
  },
  {
    name: "Mrs. Tejaswini Deshmukh",
    phone: "9403498919"
  },
  {
    name: "Mr. Pritesh Aher",
    phone: "7588833992"
  }
];

const SponsorshipSection = () => {
  return (
    <section id="sponsorship" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Badge */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 bg-background border border-border text-foreground px-4 py-2 rounded-full text-sm font-medium">
            <Building2 className="w-4 h-4 text-primary" />
            Funding & Sponsorship
          </span>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-4 text-foreground">
            Sponsorship Opportunities
          </h2>
          <p className="text-muted-foreground text-lg">
            Partner with us and gain visibility while supporting innovation
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/30 rounded-2xl p-6 mb-12 max-w-3xl mx-auto">
          <div className="text-center mb-4">
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">
              For More Information Regarding Sponsorship
            </h3>
            <p className="text-muted-foreground">Contact our sponsorship coordinators</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {contactPersons.map((person, index) => (
              <div 
                key={index} 
                className="bg-background rounded-xl p-4 text-center shadow-sm border border-border"
              >
                <p className="font-semibold text-foreground mb-2">{person.name}</p>
                <a 
                  href={`tel:${person.phone}`} 
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                >
                  <Phone className="w-4 h-4" />
                  {person.phone}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsorship Tiers */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {sponsorshipTiers.map((tier, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden hover:shadow-xl transition-all duration-300 ${
                index === 0 ? "border-2 border-yellow-500" : "border-border"
              }`}
            >
              {index === 0 && (
                <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  PREMIUM
                </div>
              )}
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-full bg-muted ${tier.color}`}>
                    <tier.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-foreground">
                      {tier.title}
                    </h3>
                    <p className="text-primary font-semibold">{tier.amount}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Funding Info Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {fundingInfo.map((info, index) => (
            <div
              key={index}
              className="bg-background rounded-xl p-6 border border-border text-center"
            >
              <h4 className="font-heading font-bold text-foreground mb-2">
                {info.title}
              </h4>
              <p className="text-sm text-muted-foreground">{info.description}</p>
            </div>
          ))}
        </div>

        {/* Transparency Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            <strong>Transparency & Accountability:</strong> A signed fund utilization report / acknowledgment 
            can be provided upon request. The institute ensures fair evaluation, proper documentation, 
            and transparent distribution.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SponsorshipSection;
