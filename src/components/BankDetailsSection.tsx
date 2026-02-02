import { CreditCard, Building2 } from "lucide-react";

const BankDetailsSection = () => {
  return (
    <section id="bank-details" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Badge */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 bg-muted border border-border text-foreground px-4 py-2 rounded-full text-sm font-medium">
            <CreditCard className="w-4 h-4 text-primary" />
            Payment Information
          </span>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-heading font-black mb-3 text-foreground">
            Bank Transfer Details
          </h2>
          <p className="text-muted-foreground text-lg">
            For registration fee payment of ₹5,000 (flat fee for one or multiple problem statements)
          </p>
        </div>

        {/* Bank Details Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-primary/5 to-accent/10 rounded-2xl p-8 border border-primary/20 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-primary/10">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-foreground">
                  HDFC Bank Account
                </h3>
                <p className="text-muted-foreground text-sm">Transfer your registration fee here</p>
              </div>
            </div>

            <div className="bg-background rounded-xl p-6 border border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Account Number</p>
                  <p className="font-semibold text-foreground font-mono text-lg">99907771230011</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Customer Name</p>
                  <p className="font-semibold text-foreground">PRIN MVPS KBGT COLLEGE OF ENGINEERING</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">IFSC Code</p>
                  <p className="font-semibold text-foreground font-mono text-lg">HDFC0001241</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Branch Name</p>
                  <p className="font-semibold text-foreground">PRODUCTIVITY HOUSE</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Branch Code</p>
                  <p className="font-semibold text-foreground font-mono">1241</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Type of Account</p>
                  <p className="font-semibold text-foreground">SAVINGS ACCOUNT - TRUST</p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                <strong>Registration Fee:</strong> ₹5,000 (covers one or multiple problem statements)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BankDetailsSection;
