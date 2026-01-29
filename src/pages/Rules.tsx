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
    title: "Feasibility Within KBT-AVINYATHON Duration",
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
        {/* Hero Section - Compact */}
        <section className="py-6 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-heading font-black mb-2 text-foreground">
              Rules & Regulations
            </h1>
            <p className="text-muted-foreground text-base">
              For Submitting Industry Problem Statements (KBT-AVINYATHON 2026)
            </p>
          </div>
        </section>

        {/* Rules Grid - Compact cards */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
              {rules.map((rule) => (
                <Card 
                  key={rule.number} 
                  className="hover:shadow-lg transition-all duration-300 border-border"
                >
                  <CardHeader className="pb-2 pt-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <rule.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-medium text-primary">Rule {rule.number}</span>
                        <CardTitle className="text-base font-heading font-bold text-foreground">
                          {rule.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 pb-4 px-4">
                    <ul className="space-y-1">
                      {rule.content.map((item, index) => (
                        <li 
                          key={index} 
                          className={`text-muted-foreground text-sm ${
                            item.startsWith("•") ? "pl-3" : ""
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

        {/* Note Section - Compact */}
        <section className="py-6 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center flex items-center justify-center gap-4">
              <AlertTriangle className="w-8 h-8 text-primary flex-shrink-0" />
              <div className="text-left">
                <h3 className="text-lg font-heading font-bold text-foreground">
                  Important Note
                </h3>
                <p className="text-muted-foreground text-sm">
                  In case of any dispute, the college reserves the full authority to take the 
                  final decision and resolve the matter.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Rules;
