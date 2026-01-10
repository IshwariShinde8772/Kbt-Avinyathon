import { CheckCircle2 } from "lucide-react";
import innovationLightbulb from "@/assets/innovation-lightbulb.jpg";

const TrackRecordSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-background">
              <img
                src={innovationLightbulb}
                alt="Innovation lightbulb with blue energy trails"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-4xl md:text-5xl font-heading font-black text-foreground">
              Proven Track Record of Success
            </h2>
            <p className="text-muted-foreground text-lg">
              Many companies have already transformed their challenges into innovative solutions through our institute. Join the innovation revolution today.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-success-bg rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-foreground">95% Satisfaction Rate</h4>
                  <p className="text-muted-foreground text-sm">
                    Companies consistently rate their experience highly
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-success-bg rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-foreground">Rapid Implementation</h4>
                  <p className="text-muted-foreground text-sm">
                    Many solutions move to production within 3 months
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackRecordSection;
