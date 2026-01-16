import { Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Industry Problem Statement",
    description: "Industries submit their real-world problem statements through our registration portal.",
    date: "31 JAN 2026",
  },
  {
    number: 2,
    title: "Screening & Shortlisting",
    description: "Our expert committee reviews and shortlists the most suitable problem statements.",
    date: "8 FEB 2026",
  },
  {
    number: 3,
    title: "Intimation to Industry",
    description: "Shortlisted problem statement details are communicated to participating industries.",
    date: "10 FEB 2026",
  },
  {
    number: 4,
    title: "Open to Students",
    description: "KBT Avinyathon 2026 opens for student participation with all selected problem statements.",
    date: "15 FEB 2026",
  },
  {
    number: 5,
    title: "Solution Submission",
    description: "Student teams develop and submit their innovative solutions for the challenges.",
    date: "12 MAR 2026",
  },
  {
    number: 6,
    title: "Screening of Solutions",
    description: "Expert panel screens and evaluates the best solutions from all submissions.",
    date: "15 MAR 2026",
  },
  {
    number: 7,
    title: "Final Evaluation",
    description: "Shortlisted solutions are presented to industry experts for final evaluation.",
    date: "4 APR 2026",
  },
  {
    number: 8,
    title: "Winner Announcement",
    description: "Winners are announced and prizes are distributed during the valedictory ceremony.",
    date: "4 APR 2026",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="process" className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Badge */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 bg-background border border-border text-foreground px-4 py-2 rounded-full text-sm font-medium">
            <Rocket className="w-4 h-4 text-primary" />
            Process Flow
          </span>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-4 text-foreground">
            KBT-Hackathon 2026 Process Flow
          </h2>
          <p className="text-muted-foreground text-lg">
            From problem statement submission to winner announcement
          </p>
        </div>

        {/* Process Flow Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-4">
            {steps.slice(0, 4).map((step, index) => (
              <div key={index} className="relative">
                <div
                  className={`bg-background rounded-2xl p-5 shadow-lg border ${
                    index === 3 ? "border-primary border-2" : "border-border"
                  } hover:shadow-xl transition-all duration-300 h-full`}
                >
                  <div className="step-badge mb-4 mx-auto text-sm">
                    {step.number}
                  </div>
                  <h3 className="text-base font-heading font-bold text-center mb-2 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-center text-xs mb-3">
                    {step.description}
                  </p>
                  <div className="text-center">
                    <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                      {step.date}
                    </span>
                  </div>
                </div>
                {index < 3 && (
                  <div className="hidden md:flex absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Arrow down for mobile, connecting line for desktop */}
          <div className="flex justify-center my-6">
            <div className="w-0.5 h-8 bg-primary md:hidden"></div>
            <ArrowRight className="hidden md:block w-6 h-6 text-primary rotate-90" />
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {steps.slice(4, 8).map((step, index) => (
              <div key={index} className="relative">
                <div
                  className={`bg-background rounded-2xl p-5 shadow-lg border ${
                    index === 3 ? "border-green-500 border-2" : "border-border"
                  } hover:shadow-xl transition-all duration-300 h-full`}
                >
                  <div className={`step-badge mb-4 mx-auto text-sm ${index === 3 ? "!bg-green-500" : ""}`}>
                    {step.number}
                  </div>
                  <h3 className="text-base font-heading font-bold text-center mb-2 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-center text-xs mb-3">
                    {step.description}
                  </p>
                  <div className="text-center">
                    <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                      index === 3 ? "bg-green-500/10 text-green-600" : "bg-primary/10 text-primary"
                    }`}>
                      {step.date}
                    </span>
                  </div>
                </div>
                {index < 3 && (
                  <div className="hidden md:flex absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
