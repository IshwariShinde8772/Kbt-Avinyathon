import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Phone, User } from "lucide-react";

const contacts = [
  { name: "Mrs. Tejaswini Deshmukh", phone: "9403498919" },
  { name: "Dr S. B. Sonawane", phone: "91670 04398" },
  { name: "Mr. Pritesh Aher", phone: "7588833992" },
];

const CTASection = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Curves */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/10 to-transparent rounded-r-full" />
      <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary/10 to-transparent rounded-l-full" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-6 text-foreground">
            Ready to Find Innovative Solutions?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join leading companies leveraging KBT-AVINYATHON to drive innovation and solve complex challenges.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/submit">
              <Button size="lg" className="gradient-cta text-primary-foreground font-semibold px-8 py-6 text-lg rounded-xl hover:opacity-90 transition-opacity">
                Submit Problem Statement
              </Button>
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-xl border-2 border-foreground text-foreground hover:bg-muted">
                  Schedule a Call
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-heading">Contact Us</DialogTitle>
                  <DialogDescription>
                    Reach out to our team for partnership inquiries
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  {contacts.map((contact) => (
                    <div
                      key={contact.phone}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium">{contact.name}</span>
                      </div>
                      <a
                        href={`tel:${contact.phone}`}
                        className="flex items-center gap-2 text-primary hover:underline font-semibold"
                      >
                        <Phone className="w-4 h-4" />
                        {contact.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
