import { Rocket, ArrowRight, ArrowDown } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Industry Problem Statement",
    description: "Industries submit their real-world problem statements through our registration portal.",
    date: "15 FEB 2026",
  },
  {
    number: 2,
    title: "Screening & Shortlisting",
    description: "Problem statements are checked for clarity, completeness, and required structure.",
    date: "28 FEB 2026",
  },
  {
    number: 3,
    title: "Intimation to Industry",
    description: "Shortlisted problem statement details are communicated to participating industries.",
    date: "5 MAR 2026",
  },
  {
    number: 4,
    title: "Open to Students",
    description: "KBT Avinyathon 2026 opens for student participation with all selected problem statements.",
    date: "5 MAR 2026",
  },
  {
    number: 5,
    title: "Solution Submission",
    description: "Student teams develop and submit their innovative solutions for the challenges.",
    date: "30 MAR 2026",
  },
  {
    number: 6,
    title: "Screening of Solutions",
    description: "Expert panel screens and evaluates the best solutions from all submissions.",
    date: "2 APR 2026",
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
  // Get bottom row steps in reverse order (8, 7, 6, 5)
  const bottomRowSteps = [...steps.slice(4, 8)].reverse();

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
            KBT-AVINYATHON 2026 Process Flow
          </h2>
          <p className="text-muted-foreground text-lg">
            From problem statement submission to winner announcement
          </p>
        </div>

        {/* Process Flow Timeline */}
        <div className="max-w-5xl mx-auto">
          {/* Top Row: Steps 1-4 */}
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

                {/* Horizontal Arrow between cards 1-2, 2-3, 3-4 */}
                {index < 3 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20 items-center justify-center w-8">
                    <ArrowRight
                      className="w-6 h-6 text-primary"
                      strokeWidth={3}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Connector Arrow: from step 4 down to step 5 (on the right side) */}
          <div className="hidden md:flex justify-end pr-[calc(12.5%-8px)] my-4">
            <div className="flex flex-col items-center">
              <div className="w-1 h-6 bg-primary rounded-full"></div>
              <ArrowDown className="w-6 h-6 text-primary -mt-1" strokeWidth={3} />
            </div>
          </div>

          {/* Mobile connector */}
          <div className="flex justify-center my-6 md:hidden">
            <div className="flex flex-col items-center">
              <div className="w-1 h-6 bg-primary rounded-full"></div>
              <ArrowDown className="w-6 h-6 text-primary -mt-1" strokeWidth={3} />
            </div>
          </div>

          {/* Bottom Row: Steps 8, 7, 6, 5 (reversed display, so flow is 5→6→7→8 from right to left) */}
          <div className="grid md:grid-cols-4 gap-4">
            {bottomRowSteps.map((step, index) => (
              <div key={index} className="relative">
                <div
                  className={`bg-background rounded-2xl p-5 shadow-lg border ${
                    step.number === 8 ? "border-green-500 border-2" : "border-border"
                  } hover:shadow-xl transition-all duration-300 h-full`}
                >
                  <div
                    className={`step-badge mb-4 mx-auto text-sm ${
                      step.number === 8 ? "!bg-green-500" : ""
                    }`}
                  >
                    {step.number}
                  </div>
                  <h3 className="text-base font-heading font-bold text-center mb-2 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-center text-xs mb-3">
                    {step.description}
                  </p>
                  <div className="text-center">
                    <span
                      className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                        step.number === 8
                          ? "bg-green-500/10 text-green-600"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {step.date}
                    </span>
                  </div>
                </div>

                {/* Arrows pointing LEFT between cards (5←6←7←8) - show between 8-7, 7-6, 6-5 */}
                {index > 0 && (
                  <div className="hidden md:flex absolute top-1/2 -left-4 -translate-y-1/2 z-20 items-center justify-center w-8">
                    <ArrowRight
                      className="w-6 h-6 text-primary rotate-180"
                      strokeWidth={3}
                    />
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
