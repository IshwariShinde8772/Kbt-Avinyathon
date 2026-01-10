import { Lightbulb, Users, Award, Target, Shield, HeartHandshake } from "lucide-react";

const benefits = [
  {
    icon: Lightbulb,
    title: "Multiple Solution Approaches",
    description: "Receive diverse solutions from different teams tackling your problem from unique angles.",
  },
  {
    icon: Users,
    title: "Direct Team Interaction",
    description: "Communicate directly with teams and provide mentorship throughout development.",
  },
  {
    icon: Award,
    title: "Brand Exposure",
    description: "Featured as a partner throughout the event and in all marketing materials.",
  },
  {
    icon: Target,
    title: "Recruitment Pipeline",
    description: "Identify and connect with top talent who excel at solving your challenges.",
  },
  {
    icon: Shield,
    title: "IP Rights Protection",
    description: "Clear intellectual property agreements ensuring solution implementation rights.",
  },
  {
    icon: HeartHandshake,
    title: "Post-Event Support",
    description: "Continued collaboration opportunities for solution refinement and deployment.",
  },
];

const PartnershipBenefitsSection = () => {
  return (
    <section id="benefits" className="py-20 gradient-benefits">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-4 text-primary-foreground">
            Partnership Benefits
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            Everything you need to drive innovation and solve complex challenges
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="benefit-card group hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold mb-2 text-primary-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-primary-foreground/80 text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipBenefitsSection;
