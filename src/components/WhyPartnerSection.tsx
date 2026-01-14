import { CheckCircle2, Brain, Zap, Users, TrendingUp, Award, Target } from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "Fresh Perspectives",
    description: "Access diverse talent pools bringing unique approaches and innovative thinking that your internal teams might miss.",
    iconBg: "bg-violet-light/20",
    iconColor: "text-primary",
  },
  {
    icon: Zap,
    title: "Rapid Prototyping",
    description: "Get working prototypes and proof-of-concepts developed quickly by motivated student teams.",
    iconBg: "bg-success-bg",
    iconColor: "text-success",
  },
  {
    icon: Users,
    title: "Talent Discovery",
    description: "Identify exceptional talent while they solve your problems. Perfect opportunity for recruiting future employees.",
    iconBg: "bg-accent",
    iconColor: "text-accent-foreground",
  },
  {
    icon: TrendingUp,
    title: "Cost-Effective",
    description: "Explore multiple solution approaches without significant R&D investment or long-term commitments.",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    icon: Award,
    title: "Brand Visibility",
    description: "Position your company as an innovation leader and gain exposure to the tech community.",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    icon: Target,
    title: "Actionable Solutions",
    description: "Receive implementable solutions that can be directly integrated into your business operations.",
    iconBg: "bg-accent",
    iconColor: "text-primary",
  },
];

const WhyPartnerSection = () => {
  return (
    <section id="why-participate" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Badge */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium">
            <Target className="w-4 h-4" />
            Why Partner With Us
          </span>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-6 text-foreground">
            Drive Innovation at Scale
          </h2>
          <p className="text-muted-foreground text-lg mb-6">
            Your organization's participation will be mutually beneficial, offering:
          </p>
          <div className="text-left space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <p>
                <strong className="text-foreground">Innovative & Feasible Prototype Solutions</strong>{" "}
                <span className="text-muted-foreground">Fresh, cost-effective ideas and solutions created by talented student teams.</span>
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <p>
                <strong className="text-foreground">New Perspectives from Young Innovators</strong>{" "}
                <span className="text-muted-foreground">Out-of-the-box thinking for day-to-day operational challenges.</span>
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <p>
                <strong className="text-foreground">Talent Identification Opportunities</strong>{" "}
                <span className="text-muted-foreground">Spot potential candidates for internships, projects, or employment.</span>
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <p>
                <strong className="text-foreground">Strengthened Industry–Academia Collaboration</strong>
                <span className="text-muted-foreground">Build long-term relationships for joint innovation and growth.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="feature-card group"
            >
              <div className={`w-12 h-12 rounded-xl ${benefit.iconBg} flex items-center justify-center mb-4`}>
                <benefit.icon className={`w-6 h-6 ${benefit.iconColor}`} />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2 text-foreground">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyPartnerSection;
