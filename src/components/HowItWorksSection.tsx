import { Rocket } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Submit Challenge",
    description: "Complete our form with your problem statement, requirements, and available resources.",
  },
  {
    number: 2,
    title: "Refinement",
    description: "Our team reviews and collaborates with you to optimize your problem statement.",
  },
  {
    number: 3,
    title: "Innovation Sprint",
    description: "Student teams compete to develop innovative solutions during the hackathon event.",
  },
  {
    number: 4,
    title: "Get Solutions",
    description: "Review prototypes, connect with teams, and explore implementation opportunities.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="process" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Badge */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 bg-background border border-border text-foreground px-4 py-2 rounded-full text-sm font-medium">
            <Rocket className="w-4 h-4 text-primary" />
            Simple Process
          </span>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-4 text-foreground">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">
            From problem submission to innovative solutions in four easy steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`bg-background rounded-2xl p-6 shadow-lg border ${
                index === 2 ? "border-primary border-2" : "border-border"
              } hover:shadow-xl transition-all duration-300`}
            >
              <div className="step-badge mb-6 mx-auto">
                {step.number}
              </div>
              <h3 className="text-xl font-heading font-bold text-center mb-3 text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-center text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
