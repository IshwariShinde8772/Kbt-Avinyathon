import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import hackathonHero from "@/assets/hackathon-hero.jpg";

const HeroSection = () => {
  return (
    <section className="gradient-hero-bg py-8">
      {/* Event Title Banner - Centered with Bold Styling */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex justify-center">
          <div className="bg-[#1a1a1a] rounded-2xl px-8 py-6 shadow-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-[#ff6b00] text-center tracking-wide">
              KBT AVINYATHON 2026
            </h2>
          </div>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black leading-tight">
              <span className="text-foreground">Transform Your</span>
              <br />
              <span className="text-gradient">Business</span>
              <br />
              <span className="text-gradient">Challenges</span>
              <br />
              <span className="text-foreground">Into Solutions</span>
            </h1>

            <p className="text-foreground text-lg">
              <strong>KBTCOE</strong> is organizing a{" "}
              <strong>State-Level Hackathon in March 2026</strong> designed to bring
              together innovative young minds to solve real-world industry problems.
            </p>

            <div className="space-y-2">
              <p className="font-semibold text-foreground">The event aims to:</p>
              <ol className="space-y-1 text-foreground">
                <li>1. Encourage application of technical knowledge</li>
                <li>2. Promote creativity and problem-solving</li>
                <li>3. Connect students with industrial challenges</li>
                <li>4. Build a strong industry–academia ecosystem</li>
              </ol>
            </div>

            <p className="text-muted-foreground">
              Connect with brilliant innovators ready to tackle your toughest problems.
              Get breakthrough solutions in just few hours.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/submit">
                <Button size="lg" className="gradient-cta text-primary-foreground font-semibold px-8 py-6 text-lg rounded-xl hover:opacity-90 transition-opacity">
                  Submit Problem Statement
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-6 text-lg rounded-xl border-2 border-foreground text-foreground hover:bg-muted"
                onClick={() => {
                  const element = document.getElementById("process");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Learn How It Works
              </Button>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative animate-slide-in-right">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={hackathonHero}
                alt="Students collaborating at hackathon"
                className="w-full h-auto object-cover"
              />
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 glass-card rounded-xl px-4 py-3 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-success" />
                <span className="font-medium text-foreground">Rapid Solutions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
