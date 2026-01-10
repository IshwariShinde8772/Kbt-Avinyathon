import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  BookOpen, 
  Clock, 
  FileText, 
  Shield, 
  Wrench, 
  Lightbulb, 
  AlertTriangle, 
  Users, 
  Send, 
  Phone 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const rules = [
  {
    number: 1,
    title: "Complexity Level",
    icon: BookOpen,
    content: [
      "Problem statements must be Basic to Moderate in complexity.",
      "They should be solvable using the knowledge level of SE, TE & BE students.",
      "Avoid advanced topics that require specialized industrial expertise or high-end research."
    ]
  },
  {
    number: 2,
    title: "Feasibility Within Hackathon Duration",
    icon: Clock,
    content: [
      "The solution should be realistically achievable within 15-20 days.",
      "Problems should allow students to create:",
      "• A conceptual/working prototype",
      "• A simulation",
      "• A logic flow or basic model",
      "• A simple software or hardware proof-of-concept"
    ]
  },
  {
    number: 3,
    title: "Clear & Defined Scope",
    icon: FileText,
    content: [
      "Every problem statement should include:",
      "• Problem Title",
      "• Background / Context",
      "• Problem Description",
      "• Objectives",
      "• Expected Output (Prototype / Logic / Model)",
      "• Constraints (if any)",
      "• Preferred tools/technologies (optional)"
    ]
  },
  {
    number: 4,
    title: "No Sensitive or Confidential Information",
    icon: Shield,
    content: [
      "Industries must not share confidential processes, sensitive data, or restricted documentation.",
      "Only open and safe-to-share information is allowed."
    ]
  },
  {
    number: 5,
    title: "Suitable Technology Requirements",
    icon: Wrench,
    content: [
      "Solutions should be implementable using commonly available and free tools:",
      "• Open-source software",
      "• Free student editions",
      "• Basic programming tools",
      "• Simple microcontroller platforms",
      "• Freely available simulation tools",
      "• Standard college laboratory resources",
      "No specialized paid software or proprietary industrial tools should be required."
    ]
  },
  {
    number: 6,
    title: "Realistic & Practical Challenges",
    icon: Lightbulb,
    content: [
      "Industries may propose problems related to:",
      "• Process automation",
      "• Energy or resource monitoring",
      "• Productivity or efficiency improvements",
      "• Quality inspection",
      "• Safety and alert systems",
      "• Cost reduction",
      "• Data logging or basic analytics",
      "• Sustainability and green solutions"
    ]
  },
  {
    number: 7,
    title: "No Safety or Ethical Risks",
    icon: AlertTriangle,
    content: [
      "Problem statements must not involve:",
      "• Hazardous materials",
      "• Unsafe experiments",
      "• Bio-risk requirements",
      "• Ethical concerns",
      "Solutions should be safe to design and test in a college environment."
    ]
  },
  {
    number: 8,
    title: "Industry Participation in Evaluation",
    icon: Users,
    content: [
      "Industries may nominate a technical expert to guide or evaluate the solutions.",
      "Judges may work jointly with the academic committee for fair assessment."
    ]
  },
  {
    number: 9,
    title: "Multiple Submissions Allowed",
    icon: Send,
    content: [
      "Industries may submit one or more problem statements.",
      "Each problem may optionally carry its own sponsorship support for prizes."
    ]
  },
  {
    number: 10,
    title: "Contact & Clarifications",
    icon: Phone,
    content: [
      "Each industry should provide:",
      "• Contact Person Name",
      "• Designation",
      "• Email",
      "• Mobile Number"
    ]
  }
];

const Rules = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="py-8 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-flex items-center gap-2 bg-background border border-border text-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4 text-primary" />
              Guidelines
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-black mb-4 text-foreground">
              Rules & Regulations
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              For Submitting Industry Problem Statements (KBT–Hackathon 2026)
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-muted-foreground">
                To ensure meaningful and feasible outcomes from student participants, 
                industries are requested to follow the guidelines below while submitting problem statements.
              </p>
            </div>
          </div>
        </section>

        {/* Rules Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {rules.map((rule) => (
                <Card 
                  key={rule.number} 
                  className="hover:shadow-lg transition-all duration-300 border-border"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <rule.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-primary">Rule {rule.number}</span>
                        <CardTitle className="text-xl font-heading font-bold text-foreground mt-1">
                          {rule.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {rule.content.map((item, index) => (
                        <li 
                          key={index} 
                          className={`text-muted-foreground ${
                            item.startsWith("•") ? "pl-4" : ""
                          }`}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Note Section */}
        <section className="py-12 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <AlertTriangle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                Important Note
              </h3>
              <p className="text-muted-foreground">
                In case of any dispute, the college reserves the full authority to take the 
                final decision and resolve the matter.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Rules;
